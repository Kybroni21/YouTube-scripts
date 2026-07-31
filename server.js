// EthioParks — unified booking API + web app for Ethiopian parks.
// Zero-dependency Node.js server: `npm start` and open http://localhost:3000

import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parks, sportTypes } from "./lib/seed.js";
import { bookings, tickets, makeCode } from "./lib/db.js";

const PORT = process.env.PORT || 3000;
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(ROOT, "public");

const PAYMENT_METHODS = ["telebirr", "cbe-birr", "chapa", "pay-at-park"];

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
  return parks.find((p) => p.id === parkId);
}

function findFacility(facilityId) {
  for (const park of parks) {
    const facility = park.facilities.find((f) => f.id === facilityId);
    if (facility) return { park, facility };
  }
  return null;
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
      let result = parks;
      if (city) result = result.filter((p) => p.city.toLowerCase() === city.toLowerCase());
      if (sport) result = result.filter((p) => p.facilities.some((f) => f.type === sport));
      json(res, 200, { parks: result, sportTypes });
    }
  },
  {
    method: "GET",
    pattern: /^\/api\/parks\/([\w-]+)$/,
    handler(req, res, [, parkId]) {
      const park = findPark(parkId);
      if (!park) return json(res, 404, { error: "park not found" });
      json(res, 200, { park, sportTypes });
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
        status: "confirmed",
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
      if (booking.status === "cancelled") return json(res, 200, { booking });
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
        status: "confirmed",
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
      const summary = parks.map((park) => {
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
