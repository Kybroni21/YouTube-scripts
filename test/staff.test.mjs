import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
process.env.DATA_DIR = mkdtempSync(path.join(tmpdir(), "ethioparks-staff-test-"));

const { server } = await import("../server.js");

let base;

before(async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => {
  server.close();
  rmSync(process.env.DATA_DIR, { recursive: true, force: true });
});

const req = async (method, p, data, headers = {}) => {
  const res = await fetch(base + p, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: data === undefined ? undefined : JSON.stringify(data)
  });
  return { status: res.status, body: await res.json() };
};

const today = new Date().toISOString().slice(0, 10);

test("public park responses never expose admin keys", async () => {
  const list = await req("GET", "/api/parks");
  assert.ok(list.body.parks.length > 0);
  for (const p of list.body.parks) assert.equal(p.adminKey, undefined);
  const one = await req("GET", "/api/parks/entoto-park");
  assert.equal(one.body.park.adminKey, undefined);
});

test("onboards a new park and books one of its facilities", async () => {
  const created = await req("POST", "/api/parks", {
    name: { en: "Jimma Green Park", am: "ጅማ አረንጓዴ ፓርክ" },
    city: "Jimma",
    region: "Oromia",
    description: "Community park in Jimma",
    openHour: 7,
    closeHour: 21,
    entrance: { adultETB: 40, childETB: 20 },
    facilities: [
      { type: "soccer", name: "Main Pitch", pricePerHourETB: 800, capacity: 14 },
      { type: "pickleball", name: "Court 1", pricePerHourETB: 300, capacity: 4 }
    ]
  });
  assert.equal(created.status, 201);
  const { park, adminKey } = created.body;
  assert.equal(park.id, "jimma-green-park");
  assert.match(adminKey, /^KEY-[A-Z0-9]{6}$/);
  assert.equal(park.adminKey, undefined);
  assert.equal(park.facilities.length, 2);

  // The new park is publicly listed and bookable.
  const list = await req("GET", "/api/parks?city=Jimma");
  assert.equal(list.body.parks.length, 1);

  const facilityId = park.facilities[0].id;
  const booked = await req("POST", "/api/bookings", {
    facilityId,
    date: today,
    hour: 9,
    durationHours: 1,
    name: "Derartu",
    phone: "0910000001",
    paymentMethod: "telebirr"
  });
  assert.equal(booked.status, 201);

  // Staff endpoint requires the admin key and shows the booking.
  const denied = await req("GET", `/api/parks/${park.id}/manage/bookings?date=${today}`);
  assert.equal(denied.status, 401);
  const wrongKey = await req("GET", `/api/parks/${park.id}/manage/bookings?date=${today}`, undefined, {
    "X-Admin-Key": "KEY-WRONG1"
  });
  assert.equal(wrongKey.status, 401);
  const manage = await req("GET", `/api/parks/${park.id}/manage/bookings?date=${today}`, undefined, {
    "X-Admin-Key": adminKey
  });
  assert.equal(manage.status, 200);
  assert.equal(manage.body.bookings.length, 1);
  assert.equal(manage.body.bookings[0].name, "Derartu");
});

test("rejects invalid onboarding payloads", async () => {
  const valid = {
    name: "Test Park",
    city: "Adama",
    openHour: 8,
    closeHour: 18,
    entrance: { adultETB: 10, childETB: 5 }
  };
  assert.equal((await req("POST", "/api/parks", { ...valid, name: "x" })).status, 400);
  assert.equal((await req("POST", "/api/parks", { ...valid, city: "" })).status, 400);
  assert.equal((await req("POST", "/api/parks", { ...valid, openHour: 20, closeHour: 8 })).status, 400);
  assert.equal((await req("POST", "/api/parks", { ...valid, entrance: { adultETB: -1, childETB: 0 } })).status, 400);
  assert.equal(
    (await req("POST", "/api/parks", {
      ...valid,
      facilities: [{ type: "quidditch", name: "Pitch", pricePerHourETB: 100 }]
    })).status,
    400
  );
});

test("duplicate park names get unique ids", async () => {
  const a = await req("POST", "/api/parks", {
    name: "Twin Park", city: "Mekelle", openHour: 8, closeHour: 18,
    entrance: { adultETB: 10, childETB: 5 }
  });
  const b = await req("POST", "/api/parks", {
    name: "Twin Park", city: "Mekelle", openHour: 8, closeHour: 18,
    entrance: { adultETB: 10, childETB: 5 }
  });
  assert.equal(a.body.park.id, "twin-park");
  assert.equal(b.body.park.id, "twin-park-2");
});

test("staff can update hours/fees and add facilities with their key", async () => {
  // Seeded parks use predictable demo keys.
  const key = { "X-Admin-Key": "demo-entoto-park" };

  const noKey = await req("PATCH", "/api/parks/entoto-park", { openHour: 6 });
  assert.equal(noKey.status, 401);

  const updated = await req("PATCH", "/api/parks/entoto-park", {
    openHour: 6,
    entrance: { adultETB: 250 }
  }, key);
  assert.equal(updated.status, 200);
  assert.equal(updated.body.park.openHour, 6);
  assert.equal(updated.body.park.entrance.adultETB, 250);
  assert.equal(updated.body.park.entrance.childETB, 100); // unchanged

  const badHours = await req("PATCH", "/api/parks/entoto-park", { closeHour: 5 }, key);
  assert.equal(badHours.status, 400);

  const facility = await req("POST", "/api/parks/entoto-park/facilities", {
    type: "pickleball", name: "New Pickleball Court", pricePerHourETB: 450, capacity: 4
  }, key);
  assert.equal(facility.status, 201);
  assert.match(facility.body.facility.id, /^entoto-park-pickleball-\d+$/);

  const detail = await req("GET", "/api/parks/entoto-park");
  assert.ok(detail.body.park.facilities.some((f) => f.id === facility.body.facility.id));
});
