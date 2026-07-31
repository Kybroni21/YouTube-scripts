// EthioParks — unified booking API + web app for Ethiopian parks.
// Zero-dependency Node.js server: `npm start` and open http://localhost:3000

import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sportTypes } from "./lib/seed.js";
import { parksStore, bookings, tickets, makeCode } from "./lib/db.js";

const PORT = process.env.PORT || 3000;
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(ROOT, "public");

const PAYMENT_METHODS = ["telebirr", "cbe-birr", "chapa", "pay-at-park"];
// Digital methods go through a (simulated) checkout; the reservation is held
// for PAYMENT_WINDOW_MIN minutes and expires if it isn't paid.
const DIGITAL_METHODS = ["telebirr", "cbe-birr", "chapa"];
const PAYMENT_WINDOW_MIN = 10;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};

// ---------- helpers ----------

function json(res, status, body) {
  const data = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data)
  });
  res.end(data);
}

function badRequest(res, message) {
  json(res, 400, { error: message });
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 64 * 1024) throw new Error("payload too large");
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

// Ethiopian mobile numbers: 09XXXXXXXX / 07XXXXXXXX, with or without +251/251 prefix.
export function normalizePhone(raw) {
  if (typeof raw !== "string") return null;
  const digits = raw.replace(/[\s\-()]/g, "");
  let m = digits.match(/^(?:\+?251|0)([79]\d{8})$/);
  return m ? "0" + m[1] : null;
}

function isValidDate(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + "T00:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(s);
}

function findPark(parkId) {
  return parksStore.find(parkId);
}

function findFacility(facilityId) {
  for (const park of parksStore.all()) {
    const facility = park.facilities.find((f) => f.id === facilityId);
    if (facility) return { park, facility };
  }
  return null;
}

// Public views of a park never include its staff admin key.
function publicPark(park) {
  const { adminKey, ...pub } = park;
  return pub;
}

// Park staff endpoints authenticate with the X-Admin-Key header.
function checkAdminKey(req, res, park) {
  const key = req.headers["x-admin-key"];
  if (!key || key !== park.adminKey) {
    json(res, 401, { error: "invalid admin key for this park" });
    return false;
  }
  return true;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function parseFacilityInput(parkId, input, index, existing) {
  const type = input?.type;
  if (!sportTypes[type]) throw new Error(`facility ${index + 1}: unknown sport type`);
  const nameEn = typeof input.name === "string" ? input.name : input.name?.en;
  if (!nameEn || nameEn.trim().length < 2)
    throw new Error(`facility ${index + 1}: name is required`);
  const price = Number(input.pricePerHourETB);
  const capacity = Number(input.capacity ?? 10);
  if (!Number.isFinite(price) || price <= 0)
    throw new Error(`facility ${index + 1}: pricePerHourETB must be positive`);
  if (!Number.isInteger(capacity) || capacity < 1)
    throw new Error(`facility ${index + 1}: capacity must be a positive integer`);
  let id = `${parkId}-${type}-${index + 1}`;
  let n = index + 1;
  while (existing.some((f) => f.id === id)) id = `${parkId}-${type}-${++n}`;
  return {
    id,
    type,
    name: { en: nameEn.trim(), am: (typeof input.name === "object" && input.name?.am) || nameEn.trim() },
    pricePerHourETB: price,
    capacity
  };
}

const PARK_THEMES = ["#1a7a4c", "#2d6a4f", "#1d6fa5", "#9a6a1f", "#40916c", "#0d7a8a", "#52796f", "#1e5f8a"];

// Lazily expire unpaid reservations whose payment window has passed.
function expirePending() {
  const now = Date.now();
  let changed = false;
  for (const list of [bookings.all(), tickets.all()]) {
    for (const item of list) {
      if (item.status === "pending-payment" && Date.parse(item.paymentExpiresAt) < now) {
        item.status = "expired";
        changed = true;
      }
    }
  }
  if (changed) bookings.update();
}

function availabilityFor(park, facility, date) {
  const taken = new Set();
  for (const b of bookings.forSlot(facility.id, date)) {
    for (let h = b.hour; h < b.hour + b.durationHours; h++) taken.add(h);
  }
  const slots = [];
  for (let hour = park.openHour; hour < park.closeHour; hour++) {
    slots.push({ hour, available: !taken.has(hour) });
  }
  return slots;
}

// ---------- API routes ----------

const routes = [
  {
    method: "GET",
    pattern: /^\/api\/parks$/,
    handler(req, res, _m, url) {
      const city = url.searchParams.get("city");
      const sport = url.searchParams.get("sport");
      let result = parksStore.all();
      if (city) result = result.filter((p) => p.city.toLowerCase() === city.toLowerCase());
      if (sport) result = result.filter((p) => p.facilities.some((f) => f.type === sport));
      json(res, 200, { parks: result.map(publicPark), sportTypes });
    }
  },
  {
    method: "GET",
    pattern: /^\/api\/parks\/([\w-]+)$/,
    handler(req, res, [, parkId]) {
      const park = findPark(parkId);
      if (!park) return json(res, 404, { error: "park not found" });
      json(res, 200, { park: publicPark(park), sportTypes });
    }
  },
  {
    method: "GET",
    pattern: /^\/api\/parks\/([\w-]+)\/availability$/,
    handler(req, res, [, parkId], url) {
      const park = findPark(parkId);
      if (!park) return json(res, 404, { error: "park not found" });
      const facilityId = url.searchParams.get("facilityId");
      const date = url.searchParams.get("date");
      const facility = park.facilities.find((f) => f.id === facilityId);
      if (!facility) return badRequest(res, "unknown facilityId");
      if (!date || !isValidDate(date)) return badRequest(res, "date must be YYYY-MM-DD");
      json(res, 200, { parkId, facilityId, date, slots: availabilityFor(park, facility, date) });
    }
  },
  {
    method: "POST",
    pattern: /^\/api\/bookings$/,
    async handler(req, res) {
      const body = await readBody(req);
      const { facilityId, date, hour, durationHours = 1, name, phone, paymentMethod } = body;

      const found = findFacility(facilityId);
      if (!found) return badRequest(res, "unknown facilityId");
      const { park, facility } = found;

      if (!date || !isValidDate(date)) return badRequest(res, "date must be YYYY-MM-DD");
      const today = new Date().toISOString().slice(0, 10);
      if (date < today) return badRequest(res, "date is in the past");

      const h = Number(hour);
      const dur = Number(durationHours);
      if (!Number.isInteger(h) || !Number.isInteger(dur) || dur < 1 || dur > 4)
        return badRequest(res, "hour must be an integer and duration 1-4 hours");
      if (h < park.openHour || h + dur > park.closeHour)
        return badRequest(res, `park is open ${park.openHour}:00–${park.closeHour}:00`);

      if (typeof name !== "string" || name.trim().length < 2)
        return badRequest(res, "name is required");
      const normPhone = normalizePhone(phone);
      if (!normPhone) return badRequest(res, "valid Ethiopian mobile number required (09.../07...)");
      if (!PAYMENT_METHODS.includes(paymentMethod))
        return badRequest(res, `paymentMethod must be one of: ${PAYMENT_METHODS.join(", ")}`);

      const slots = availabilityFor(park, facility, date);
      for (let x = h; x < h + dur; x++) {
        const slot = slots.find((s) => s.hour === x);
        if (!slot || !slot.available)
          return json(res, 409, { error: "slot no longer available", conflictHour: x });
      }

      const digital = DIGITAL_METHODS.includes(paymentMethod);
      const booking = bookings.add({
        code: makeCode("ETP"),
        parkId: park.id,
        facilityId,
        date,
        hour: h,
        durationHours: dur,
        name: name.trim(),
        phone: normPhone,
        paymentMethod,
        amountETB: facility.pricePerHourETB * dur,
        status: digital ? "pending-payment" : "confirmed",
        ...(digital && {
          paymentExpiresAt: new Date(Date.now() + PAYMENT_WINDOW_MIN * 60_000).toISOString()
        }),
        createdAt: new Date().toISOString()
      });
      json(res, 201, { booking });
    }
  },
  {
    method: "GET",
    pattern: /^\/api\/bookings\/lookup$/,
    handler(req, res, _m, url) {
      const code = (url.searchParams.get("code") || "").trim().toUpperCase();
      const phone = normalizePhone(url.searchParams.get("phone") || "");
      const booking = bookings.find(code);
      if (!booking || !phone || booking.phone !== phone)
        return json(res, 404, { error: "no booking found for that code and phone" });
      json(res, 200, { booking });
    }
  },
  {
    method: "POST",
    pattern: /^\/api\/bookings\/([\w-]+)\/cancel$/,
    async handler(req, res, [, code]) {
      const body = await readBody(req);
      const phone = normalizePhone(body.phone || "");
      const booking = bookings.find(code.toUpperCase());
      if (!booking || !phone || booking.phone !== phone)
        return json(res, 404, { error: "no booking found for that code and phone" });
      if (booking.status === "cancelled" || booking.status === "expired")
        return json(res, 200, { booking });
      booking.status = "cancelled";
      booking.cancelledAt = new Date().toISOString();
      bookings.update(booking);
      json(res, 200, { booking });
    }
  },
  {
    method: "POST",
    pattern: /^\/api\/tickets$/,
    async handler(req, res) {
      const body = await readBody(req);
      const { parkId, date, adults = 1, children = 0, name, phone, paymentMethod } = body;

      const park = findPark(parkId);
      if (!park) return badRequest(res, "unknown parkId");
      if (!date || !isValidDate(date)) return badRequest(res, "date must be YYYY-MM-DD");
      const today = new Date().toISOString().slice(0, 10);
      if (date < today) return badRequest(res, "date is in the past");

      const a = Number(adults);
      const c = Number(children);
      if (!Number.isInteger(a) || !Number.isInteger(c) || a < 0 || c < 0 || a + c < 1 || a + c > 50)
        return badRequest(res, "adults/children must be non-negative integers (1-50 total)");

      if (typeof name !== "string" || name.trim().length < 2)
        return badRequest(res, "name is required");
      const normPhone = normalizePhone(phone);
      if (!normPhone) return badRequest(res, "valid Ethiopian mobile number required (09.../07...)");
      if (!PAYMENT_METHODS.includes(paymentMethod))
        return badRequest(res, `paymentMethod must be one of: ${PAYMENT_METHODS.join(", ")}`);

      const digital = DIGITAL_METHODS.includes(paymentMethod);
      const ticket = tickets.add({
        code: makeCode("TKT"),
        parkId: park.id,
        date,
        adults: a,
        children: c,
        name: name.trim(),
        phone: normPhone,
        paymentMethod,
        amountETB: a * park.entrance.adultETB + c * park.entrance.childETB,
        status: digital ? "pending-payment" : "confirmed",
        ...(digital && {
          paymentExpiresAt: new Date(Date.now() + PAYMENT_WINDOW_MIN * 60_000).toISOString()
        }),
        createdAt: new Date().toISOString()
      });
      json(res, 201, { ticket });
    }
  },
  {
    method: "GET",
    pattern: /^\/api\/tickets\/lookup$/,
    handler(req, res, _m, url) {
      const code = (url.searchParams.get("code") || "").trim().toUpperCase();
      const phone = normalizePhone(url.searchParams.get("phone") || "");
      const ticket = tickets.find(code);
      if (!ticket || !phone || ticket.phone !== phone)
        return json(res, 404, { error: "no ticket found for that code and phone" });
      json(res, 200, { ticket });
    }
  },
  {
    method: "GET",
    pattern: /^\/api\/admin\/summary$/,
    handler(req, res) {
      const summary = parksStore.all().map((park) => {
        const parkBookings = bookings.all().filter((b) => b.parkId === park.id);
        const parkTickets = tickets.all().filter((t) => t.parkId === park.id);
        const confirmed = parkBookings.filter((b) => b.status === "confirmed");
        const confirmedTickets = parkTickets.filter((t) => t.status === "confirmed");
        return {
          parkId: park.id,
          name: park.name,
          city: park.city,
          bookings: confirmed.length,
          cancelled: parkBookings.length - confirmed.length,
          tickets: confirmedTickets.reduce((n, t) => n + t.adults + t.children, 0),
          revenueETB:
            confirmed.reduce((n, b) => n + b.amountETB, 0) +
            confirmedTickets.reduce((n, t) => n + t.amountETB, 0)
        };
      });
      json(res, 200, { summary });
    }
  },
  {
    // Simulated payment provider confirmation (Telebirr / CBE Birr / Chapa).
    // Real integration replaces this with the gateway's server callback.
    method: "POST",
    pattern: /^\/api\/payments\/([\w-]+)\/confirm$/,
    async handler(req, res, [, code]) {
      const body = await readBody(req);
      code = code.toUpperCase();
      const item = bookings.find(code) || tickets.find(code);
      if (!item) return json(res, 404, { error: "unknown payment reference" });
      const kind = code.startsWith("TKT") ? "ticket" : "booking";
      if (item.status === "confirmed") return json(res, 200, { [kind]: item });
      if (item.status === "expired")
        return json(res, 410, { error: "payment window expired — please book again" });
      if (item.status !== "pending-payment")
        return json(res, 409, { error: `cannot pay a ${item.status} ${kind}` });

      const pin = String(body.pin ?? "");
      if (!/^\d{4,6}$/.test(pin)) return badRequest(res, "pin must be 4-6 digits");
      // Demo rule: PIN 0000 simulates a decline from the provider.
      if (pin === "0000")
        return json(res, 402, { error: "payment declined by provider (demo: try any other PIN)" });

      item.status = "confirmed";
      item.paidAt = new Date().toISOString();
      delete item.paymentExpiresAt;
      (kind === "ticket" ? tickets : bookings).update(item);
      json(res, 200, { [kind]: item });
    }
  },
  {
    // Park self-onboarding: register a park and receive its staff admin key.
    method: "POST",
    pattern: /^\/api\/parks$/,
    async handler(req, res) {
      const body = await readBody(req);
      const nameEn = typeof body.name === "string" ? body.name : body.name?.en;
      if (!nameEn || nameEn.trim().length < 3) return badRequest(res, "park name is required");
      if (typeof body.city !== "string" || body.city.trim().length < 2)
        return badRequest(res, "city is required");

      const openHour = Number(body.openHour);
      const closeHour = Number(body.closeHour);
      if (
        !Number.isInteger(openHour) || !Number.isInteger(closeHour) ||
        openHour < 0 || closeHour > 24 || openHour >= closeHour
      )
        return badRequest(res, "openHour/closeHour must be integers with openHour < closeHour (0-24)");

      const adultETB = Number(body.entrance?.adultETB);
      const childETB = Number(body.entrance?.childETB);
      if (!Number.isFinite(adultETB) || adultETB < 0 || !Number.isFinite(childETB) || childETB < 0)
        return badRequest(res, "entrance.adultETB and entrance.childETB must be non-negative");

      const baseId = slugify(nameEn) || "park";
      let id = baseId;
      let n = 1;
      while (parksStore.find(id)) id = `${baseId}-${++n}`;

      let facilities = [];
      try {
        const inputs = Array.isArray(body.facilities) ? body.facilities : [];
        for (const [i, input] of inputs.entries())
          facilities.push(parseFacilityInput(id, input, i, facilities));
      } catch (err) {
        return badRequest(res, err.message);
      }

      const park = parksStore.add({
        id,
        name: { en: nameEn.trim(), am: body.name?.am?.trim() || nameEn.trim() },
        city: body.city.trim(),
        region: (typeof body.region === "string" && body.region.trim()) || body.city.trim(),
        description: {
          en: (typeof body.description === "string" && body.description.trim()) ||
            body.description?.en?.trim() || "",
          am: body.description?.am?.trim() || ""
        },
        emoji: (typeof body.emoji === "string" && body.emoji.trim().slice(0, 4)) || "🌳",
        theme: PARK_THEMES[parksStore.all().length % PARK_THEMES.length],
        openHour,
        closeHour,
        entrance: { adultETB, childETB },
        facilities,
        adminKey: makeCode("KEY"),
        createdAt: new Date().toISOString()
      });
      json(res, 201, { park: publicPark(park), adminKey: park.adminKey });
    }
  },
  {
    // Park staff: update opening hours and entrance fees.
    method: "PATCH",
    pattern: /^\/api\/parks\/([\w-]+)$/,
    async handler(req, res, [, parkId]) {
      const park = findPark(parkId);
      if (!park) return json(res, 404, { error: "park not found" });
      if (!checkAdminKey(req, res, park)) return;
      const body = await readBody(req);

      const openHour = body.openHour !== undefined ? Number(body.openHour) : park.openHour;
      const closeHour = body.closeHour !== undefined ? Number(body.closeHour) : park.closeHour;
      if (
        !Number.isInteger(openHour) || !Number.isInteger(closeHour) ||
        openHour < 0 || closeHour > 24 || openHour >= closeHour
      )
        return badRequest(res, "openHour/closeHour must be integers with openHour < closeHour (0-24)");

      const adultETB =
        body.entrance?.adultETB !== undefined ? Number(body.entrance.adultETB) : park.entrance.adultETB;
      const childETB =
        body.entrance?.childETB !== undefined ? Number(body.entrance.childETB) : park.entrance.childETB;
      if (!Number.isFinite(adultETB) || adultETB < 0 || !Number.isFinite(childETB) || childETB < 0)
        return badRequest(res, "entrance fees must be non-negative");

      park.openHour = openHour;
      park.closeHour = closeHour;
      park.entrance = { adultETB, childETB };
      parksStore.update(park);
      json(res, 200, { park: publicPark(park) });
    }
  },
  {
    // Park staff: add a bookable facility.
    method: "POST",
    pattern: /^\/api\/parks\/([\w-]+)\/facilities$/,
    async handler(req, res, [, parkId]) {
      const park = findPark(parkId);
      if (!park) return json(res, 404, { error: "park not found" });
      if (!checkAdminKey(req, res, park)) return;
      const body = await readBody(req);
      let facility;
      try {
        facility = parseFacilityInput(park.id, body, park.facilities.length, park.facilities);
      } catch (err) {
        return badRequest(res, err.message);
      }
      park.facilities.push(facility);
      parksStore.update(park);
      json(res, 201, { facility });
    }
  },
  {
    // Park staff: today's (or any date's) bookings and ticket sales.
    method: "GET",
    pattern: /^\/api\/parks\/([\w-]+)\/manage\/bookings$/,
    handler(req, res, [, parkId], url) {
      const park = findPark(parkId);
      if (!park) return json(res, 404, { error: "park not found" });
      if (!checkAdminKey(req, res, park)) return;
      const date = url.searchParams.get("date");
      if (date && !isValidDate(date)) return badRequest(res, "date must be YYYY-MM-DD");
      const byDate = (x) => !date || x.date === date;
      json(res, 200, {
        bookings: bookings.all().filter((b) => b.parkId === park.id && byDate(b)),
        tickets: tickets.all().filter((t) => t.parkId === park.id && byDate(t))
      });
    }
  }
];

// ---------- server ----------

async function serveStatic(res, urlPath) {
  let filePath = urlPath === "/" ? "/index.html" : urlPath;
  filePath = path.normalize(filePath).replace(/^(\.\.[/\\])+/, "");
  const abs = path.join(PUBLIC_DIR, filePath);
  if (!abs.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  try {
    const data = await readFile(abs);
    res.writeHead(200, { "Content-Type": MIME[path.extname(abs)] || "application/octet-stream" });
    res.end(data);
  } catch {
    // SPA fallback: unknown non-API paths get the app shell.
    try {
      const index = await readFile(path.join(PUBLIC_DIR, "index.html"));
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(index);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }
}

export const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (url.pathname.startsWith("/api/")) {
    expirePending();
    for (const route of routes) {
      const m = url.pathname.match(route.pattern);
      if (m && req.method === route.method) {
        try {
          await route.handler(req, res, m, url);
        } catch (err) {
          const msg = err instanceof SyntaxError ? "invalid JSON body" : err.message;
          badRequest(res, msg);
        }
        return;
      }
    }
    return json(res, 404, { error: "not found" });
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    return res.end();
  }
  serveStatic(res, url.pathname);
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`EthioParks running at http://localhost:${PORT}`);
  });
}
