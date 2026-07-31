// Tiny JSON-file datastore for bookings and tickets.
// Good enough for an MVP/pilot; swap for Postgres/SQLite in production.

import { readFileSync, writeFileSync, renameSync, mkdirSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parks as seedParks } from "./seed.js";

const DATA_DIR = process.env.DATA_DIR ||
  path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

let state = { parks: [], bookings: [], tickets: [] };

export function load() {
  if (existsSync(DB_FILE)) {
    try {
      state = JSON.parse(readFileSync(DB_FILE, "utf8"));
      state.parks ??= [];
      state.bookings ??= [];
      state.tickets ??= [];
    } catch {
      // Corrupt file: start fresh rather than crash the service.
      state = { parks: [], bookings: [], tickets: [] };
    }
  }
  if (!state.parks.length) {
    // First run: load the catalogue. Seeded parks get a predictable demo
    // admin key ("demo-<park-id>") so the staff portal can be tried out;
    // onboarded parks get a random one.
    state.parks = seedParks.map((p) => ({ ...p, adminKey: "demo-" + p.id }));
    persist();
  }
  return state;
}

function persist() {
  mkdirSync(DATA_DIR, { recursive: true });
  const tmp = DB_FILE + ".tmp";
  writeFileSync(tmp, JSON.stringify(state, null, 2));
  renameSync(tmp, DB_FILE);
}

// Confirmation codes like "ETP-7K2M9Q" — unambiguous alphabet, easy to read over the phone.
const CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
export function makeCode(prefix = "ETP") {
  let code = "";
  const bytes = randomBytes(6);
  for (const b of bytes) code += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return `${prefix}-${code}`;
}

export const parksStore = {
  all: () => state.parks,
  find: (id) => state.parks.find((p) => p.id === id),
  add(park) {
    state.parks.push(park);
    persist();
    return park;
  },
  update(park) {
    persist();
    return park;
  }
};

export const bookings = {
  all: () => state.bookings,
  find: (code) => state.bookings.find((b) => b.code === code),
  // Pending-payment bookings hold their slot until they're paid or expire.
  forSlot: (facilityId, date) =>
    state.bookings.filter(
      (b) =>
        b.facilityId === facilityId &&
        b.date === date &&
        (b.status === "confirmed" || b.status === "pending-payment")
    ),
  add(booking) {
    state.bookings.push(booking);
    persist();
    return booking;
  },
  update(booking) {
    persist();
    return booking;
  }
};

export const tickets = {
  all: () => state.tickets,
  find: (code) => state.tickets.find((t) => t.code === code),
  add(ticket) {
    state.tickets.push(ticket);
    persist();
    return ticket;
  },
  update(ticket) {
    persist();
    return ticket;
  }
};

load();
