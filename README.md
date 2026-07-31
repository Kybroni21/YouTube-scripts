# 🌳 EthioParks — Every Ethiopian park. One app.

Ethiopian parks today take facility bookings over the phone through call
centers (e.g. [Addis Sport Park](https://addissportpark.com/en)). **EthioParks**
is an MVP that connects all parks on a single digital platform, so customers can
book sports facilities — soccer, basketball, tennis, pickleball, padel,
volleyball and more — and buy entrance tickets straight from their phone.

## Features

- **Park directory** — browse parks across Ethiopia (Addis Ababa, Hawassa,
  Bahir Dar, Adama…) and filter by city or sport.
- **Facility booking** — pick a date, see real-time hourly availability, book
  1–4 hour slots, and get a short confirmation code to show at the gate.
- **Entrance tickets** — buy adult/child entrance tickets for any park.
- **My bookings** — look up or cancel a booking with your code + phone number.
- **Operations dashboard** — live bookings, ticket visitors and revenue per park.
- **Bilingual UI** — full English / Amharic (አማርኛ) toggle.
- **Ethiopian payments** — Telebirr, CBE Birr, Chapa or pay-at-park
  (mocked in this MVP; real gateway integration is the next step).
- **Phone validation** — accepts local numbers in `09…`, `07…`, `+251…` formats.

## Quick start

Requires Node.js 18+. No dependencies to install.

```bash
npm start          # serves http://localhost:3000
npm test           # runs the API test suite (node --test)
```

Bookings persist to `data/db.json` (created on first write).

## Architecture

```
server.js          Zero-dependency Node HTTP server: REST API + static SPA
lib/seed.js        Park & facility catalogue (names in English + Amharic, ETB prices)
lib/db.js          JSON-file datastore with atomic writes + confirmation codes
public/            Single-page app (vanilla JS, hash routing, EN/AM i18n)
test/api.test.mjs  End-to-end API tests via node:test
```

### API overview

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/parks?city=&sport=` | List parks with filters |
| GET | `/api/parks/:id` | Park details + facilities |
| GET | `/api/parks/:id/availability?facilityId=&date=` | Hourly slot availability |
| POST | `/api/bookings` | Book a facility slot |
| GET | `/api/bookings/lookup?code=&phone=` | Find a booking |
| POST | `/api/bookings/:code/cancel` | Cancel a booking |
| POST | `/api/tickets` | Buy entrance tickets |
| GET | `/api/tickets/lookup?code=&phone=` | Find a ticket |
| GET | `/api/admin/summary` | Per-park bookings/revenue summary |

## Roadmap to production

1. **Real payments** — Telebirr H5/SuperApp and Chapa checkout integration.
2. **SMS confirmations** — send the confirmation code via SMS gateway.
3. **Park onboarding portal** — let each park manage its own facilities,
   prices, hours and blackout dates.
4. **Database** — replace the JSON store with Postgres; add auth for park staff.
5. **Native apps** — wrap the mobile-first web app for Android/iOS.
