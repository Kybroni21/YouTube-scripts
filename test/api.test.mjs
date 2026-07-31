import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
process.env.DATA_DIR = mkdtempSync(path.join(tmpdir(), "ethioparks-test-"));

const { server } = await import("../server.js");
const { normalizePhone } = await import("../server.js");

let base;

before(async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => {
  server.close();
  rmSync(process.env.DATA_DIR, { recursive: true, force: true });
});

const get = async (p) => {
  const res = await fetch(base + p);
  return { status: res.status, body: await res.json() };
};
const post = async (p, data) => {
  const res = await fetch(base + p, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return { status: res.status, body: await res.json() };
};

const today = new Date().toISOString().slice(0, 10);

test("normalizePhone accepts Ethiopian formats", () => {
  assert.equal(normalizePhone("0911234567"), "0911234567");
  assert.equal(normalizePhone("+251911234567"), "0911234567");
  assert.equal(normalizePhone("251 911 234 567"), "0911234567");
  assert.equal(normalizePhone("0711234567"), "0711234567");
  assert.equal(normalizePhone("12345"), null);
  assert.equal(normalizePhone("0811234567"), null);
});

test("lists parks and filters by city and sport", async () => {
  const all = await get("/api/parks");
  assert.equal(all.status, 200);
  assert.ok(all.body.parks.length >= 5);

  const hawassa = await get("/api/parks?city=Hawassa");
  assert.ok(hawassa.body.parks.every((p) => p.city === "Hawassa"));

  const pickleball = await get("/api/parks?sport=pickleball");
  assert.ok(pickleball.body.parks.length >= 2);
  assert.ok(
    pickleball.body.parks.every((p) => p.facilities.some((f) => f.type === "pickleball"))
  );
});

test("returns availability for a facility", async () => {
  const { status, body } = await get(
    `/api/parks/addis-sport-park/availability?facilityId=asp-soccer-1&date=${today}`
  );
  assert.equal(status, 200);
  assert.ok(body.slots.length > 0);
  assert.ok(body.slots.every((s) => s.available));
});

test("books a slot, blocks double-booking, and cancels", async () => {
  const payload = {
    facilityId: "asp-tennis-1",
    date: today,
    hour: 10,
    durationHours: 2,
    name: "Abebe Bikila",
    phone: "+251911234567",
    paymentMethod: "telebirr"
  };
  const created = await post("/api/bookings", payload);
  assert.equal(created.status, 201);
  const booking = created.body.booking;
  assert.match(booking.code, /^ETP-[A-Z0-9]{6}$/);
  assert.equal(booking.amountETB, 1200);
  assert.equal(booking.phone, "0911234567");

  // Digital payments start pending; the checkout confirms them.
  assert.equal(booking.status, "pending-payment");
  const declined = await post(`/api/payments/${booking.code}/confirm`, { pin: "0000" });
  assert.equal(declined.status, 402);
  const paid = await post(`/api/payments/${booking.code}/confirm`, { pin: "1234" });
  assert.equal(paid.status, 200);
  assert.equal(paid.body.booking.status, "confirmed");

  // Overlapping hour is now taken.
  const avail = await get(
    `/api/parks/addis-sport-park/availability?facilityId=asp-tennis-1&date=${today}`
  );
  assert.equal(avail.body.slots.find((s) => s.hour === 11).available, false);

  const conflict = await post("/api/bookings", { ...payload, hour: 11, durationHours: 1 });
  assert.equal(conflict.status, 409);

  // Lookup requires the matching phone.
  const wrongPhone = await get(`/api/bookings/lookup?code=${booking.code}&phone=0922000000`);
  assert.equal(wrongPhone.status, 404);
  const found = await get(`/api/bookings/lookup?code=${booking.code}&phone=0911234567`);
  assert.equal(found.status, 200);

  const cancelled = await post(`/api/bookings/${booking.code}/cancel`, { phone: "0911234567" });
  assert.equal(cancelled.body.booking.status, "cancelled");

  // Slot frees up after cancellation.
  const after = await get(
    `/api/parks/addis-sport-park/availability?facilityId=asp-tennis-1&date=${today}`
  );
  assert.equal(after.body.slots.find((s) => s.hour === 10).available, true);
});

test("rejects invalid booking requests", async () => {
  const valid = {
    facilityId: "asp-basketball-1",
    date: today,
    hour: 9,
    durationHours: 1,
    name: "Tirunesh",
    phone: "0912345678",
    paymentMethod: "chapa"
  };
  assert.equal((await post("/api/bookings", { ...valid, facilityId: "nope" })).status, 400);
  assert.equal((await post("/api/bookings", { ...valid, date: "2020-01-01" })).status, 400);
  assert.equal((await post("/api/bookings", { ...valid, hour: 23 })).status, 400);
  assert.equal((await post("/api/bookings", { ...valid, phone: "12345" })).status, 400);
  assert.equal((await post("/api/bookings", { ...valid, paymentMethod: "cash" })).status, 400);
  assert.equal((await post("/api/bookings", { ...valid, durationHours: 9 })).status, 400);
});

test("sells entrance tickets and computes totals", async () => {
  const { status, body } = await post("/api/tickets", {
    parkId: "unity-park",
    date: today,
    adults: 2,
    children: 3,
    name: "Meseret Defar",
    phone: "0987654321",
    paymentMethod: "cbe-birr"
  });
  assert.equal(status, 201);
  assert.match(body.ticket.code, /^TKT-[A-Z0-9]{6}$/);
  assert.equal(body.ticket.amountETB, 2 * 300 + 3 * 150);
  assert.equal(body.ticket.status, "pending-payment");

  const paid = await post(`/api/payments/${body.ticket.code}/confirm`, { pin: "4321" });
  assert.equal(paid.status, 200);
  assert.equal(paid.body.ticket.status, "confirmed");

  const found = await get(`/api/tickets/lookup?code=${body.ticket.code}&phone=0987654321`);
  assert.equal(found.status, 200);
});

test("pay-at-park bookings are confirmed immediately, pending ones hold the slot", async () => {
  const atPark = await post("/api/bookings", {
    facilityId: "asp-padel-1",
    date: today,
    hour: 8,
    durationHours: 1,
    name: "Kenenisa",
    phone: "0913333333",
    paymentMethod: "pay-at-park"
  });
  assert.equal(atPark.status, 201);
  assert.equal(atPark.body.booking.status, "confirmed");

  const pending = await post("/api/bookings", {
    facilityId: "asp-padel-1",
    date: today,
    hour: 9,
    durationHours: 1,
    name: "Haile",
    phone: "0914444444",
    paymentMethod: "chapa"
  });
  assert.equal(pending.body.booking.status, "pending-payment");

  // An unpaid reservation still blocks the slot until it expires.
  const avail = await get(
    `/api/parks/addis-sport-park/availability?facilityId=asp-padel-1&date=${today}`
  );
  assert.equal(avail.body.slots.find((s) => s.hour === 9).available, false);

  // Unknown payment refs and bad PINs are rejected.
  assert.equal((await post("/api/payments/ETP-NOPE00/confirm", { pin: "1234" })).status, 404);
  assert.equal(
    (await post(`/api/payments/${pending.body.booking.code}/confirm`, { pin: "abc" })).status,
    400
  );
});

test("admin summary aggregates bookings and revenue", async () => {
  const { status, body } = await get("/api/admin/summary");
  assert.equal(status, 200);
  const unity = body.summary.find((r) => r.parkId === "unity-park");
  assert.ok(unity.tickets >= 5);
  assert.ok(unity.revenueETB >= 1050);
});

test("serves the SPA shell for app routes", async () => {
  const res = await fetch(base + "/");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("EthioParks"));
});
