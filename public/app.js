/* EthioParks SPA — hash-routed, no framework. */

const app = document.getElementById("app");

// ---------------- i18n ----------------

const STRINGS = {
  en: {
    "nav.parks": "Parks",
    "nav.my": "My Bookings",
    "nav.admin": "Dashboard",
    "footer.tag": "One app for every park in Ethiopia — book courts, pitches and tickets from your phone.",
    "hero.title": "Every Ethiopian park. One app.",
    "hero.sub": "Book soccer pitches, basketball, tennis and pickleball courts, or buy entrance tickets — no call center needed.",
    "filter.allCities": "All cities",
    "filter.allSports": "All sports",
    "park.entrance": "Entrance",
    "park.adult": "adult",
    "park.child": "child",
    "park.hours": "Open",
    "park.facilities": "Bookable facilities",
    "park.noFacilities": "This park currently offers entrance tickets only.",
    "park.buyTicket": "Buy entrance ticket",
    "book.title": "Book",
    "book.date": "Date",
    "book.slots": "Available time slots",
    "book.duration": "Duration (hours)",
    "book.name": "Full name",
    "book.phone": "Mobile number (09… / 07…)",
    "book.payment": "Payment method",
    "book.pay.telebirr": "Telebirr",
    "book.pay.cbe": "CBE Birr",
    "book.pay.chapa": "Chapa (card)",
    "book.pay.park": "Pay at park",
    "book.total": "Total",
    "book.confirm": "Confirm booking",
    "book.pickSlot": "Pick a start time above.",
    "ticket.title": "Entrance tickets",
    "ticket.adults": "Adults",
    "ticket.children": "Children",
    "ticket.confirm": "Buy tickets",
    "confirm.booked": "Booking confirmed!",
    "confirm.ticket": "Tickets confirmed!",
    "confirm.keep": "Save this code — you'll show it at the park gate. We matched it to your phone number.",
    "confirm.another": "Back to parks",
    "my.title": "Find my booking",
    "my.sub": "Enter your confirmation code and the phone number you booked with.",
    "my.code": "Confirmation code",
    "my.find": "Find",
    "my.cancel": "Cancel booking",
    "my.cancelled": "This booking is cancelled.",
    "my.notFound": "Nothing found for that code and phone.",
    "admin.title": "Park operations dashboard",
    "admin.sub": "Live bookings, ticket sales and revenue across all connected parks.",
    "admin.park": "Park",
    "admin.city": "City",
    "admin.bookings": "Bookings",
    "admin.tickets": "Ticket visitors",
    "admin.revenue": "Revenue (ETB)",
    "common.perHour": "ETB/hr",
    "common.loading": "Loading…",
    "common.back": "← Back",
    "common.date": "Date",
    "common.time": "Time",
    "common.status": "Status",
    "err.generic": "Something went wrong. Please try again."
  },
  am: {
    "nav.parks": "ፓርኮች",
    "nav.my": "ቦታ ማስያዣዎቼ",
    "nav.admin": "ዳሽቦርድ",
    "footer.tag": "ለሁሉም የኢትዮጵያ ፓርኮች አንድ መተግበሪያ — ሜዳዎችን እና ትኬቶችን በስልክዎ ያስይዙ።",
    "hero.title": "ሁሉም የኢትዮጵያ ፓርኮች። አንድ መተግበሪያ።",
    "hero.sub": "የእግር ኳስ፣ ቅርጫት ኳስ፣ ቴኒስ እና ፒክልቦል ሜዳዎችን ያስይዙ ወይም የመግቢያ ትኬት ይግዙ — የጥሪ ማዕከል መደወል አያስፈልግም።",
    "filter.allCities": "ሁሉም ከተሞች",
    "filter.allSports": "ሁሉም ስፖርቶች",
    "park.entrance": "መግቢያ",
    "park.adult": "አዋቂ",
    "park.child": "ልጅ",
    "park.hours": "ክፍት",
    "park.facilities": "የሚያዙ ሜዳዎች",
    "park.noFacilities": "ይህ ፓርክ በአሁኑ ጊዜ የመግቢያ ትኬት ብቻ ይሰጣል።",
    "park.buyTicket": "የመግቢያ ትኬት ይግዙ",
    "book.title": "ያስይዙ",
    "book.date": "ቀን",
    "book.slots": "ክፍት ሰዓቶች",
    "book.duration": "ቆይታ (ሰዓት)",
    "book.name": "ሙሉ ስም",
    "book.phone": "ስልክ ቁጥር (09… / 07…)",
    "book.payment": "የክፍያ ዘዴ",
    "book.pay.telebirr": "ቴሌብር",
    "book.pay.cbe": "ሲቢኢ ብር",
    "book.pay.chapa": "ቻፓ (ካርድ)",
    "book.pay.park": "በፓርክ ይክፈሉ",
    "book.total": "ጠቅላላ",
    "book.confirm": "ማስያዣውን ያረጋግጡ",
    "book.pickSlot": "ከላይ የመጀመሪያ ሰዓት ይምረጡ።",
    "ticket.title": "የመግቢያ ትኬቶች",
    "ticket.adults": "አዋቂዎች",
    "ticket.children": "ልጆች",
    "ticket.confirm": "ትኬት ይግዙ",
    "confirm.booked": "ማስያዣው ተረጋግጧል!",
    "confirm.ticket": "ትኬቶቹ ተረጋግጠዋል!",
    "confirm.keep": "ይህን ኮድ ያስቀምጡ — በፓርኩ በር ላይ ያሳዩታል። ከስልክ ቁጥርዎ ጋር ተመዝግቧል።",
    "confirm.another": "ወደ ፓርኮች ተመለስ",
    "my.title": "ማስያዣዬን ፈልግ",
    "my.sub": "የማረጋገጫ ኮድዎን እና ያስያዙበትን ስልክ ቁጥር ያስገቡ።",
    "my.code": "የማረጋገጫ ኮድ",
    "my.find": "ፈልግ",
    "my.cancel": "ማስያዣውን ሰርዝ",
    "my.cancelled": "ይህ ማስያዣ ተሰርዟል።",
    "my.notFound": "በዚያ ኮድ እና ስልክ ምንም አልተገኘም።",
    "admin.title": "የፓርክ ሥራ ዳሽቦርድ",
    "admin.sub": "በሁሉም ፓርኮች ላይ የቀጥታ ማስያዣዎች፣ የትኬት ሽያጭ እና ገቢ።",
    "admin.park": "ፓርክ",
    "admin.city": "ከተማ",
    "admin.bookings": "ማስያዣዎች",
    "admin.tickets": "የትኬት ጎብኚዎች",
    "admin.revenue": "ገቢ (ብር)",
    "common.perHour": "ብር/ሰዓት",
    "common.loading": "በመጫን ላይ…",
    "common.back": "← ተመለስ",
    "common.date": "ቀን",
    "common.time": "ሰዓት",
    "common.status": "ሁኔታ",
    "err.generic": "የሆነ ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።"
  }
};

let lang = localStorage.getItem("ethioparks-lang") || "en";
const t = (key) => STRINGS[lang][key] || STRINGS.en[key] || key;
const localName = (obj) => (obj && (obj[lang] || obj.en)) || "";

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.getElementById("langToggle").textContent = lang === "en" ? "አማ" : "EN";
  document.documentElement.lang = lang === "en" ? "en" : "am";
}

document.getElementById("langToggle").addEventListener("click", () => {
  lang = lang === "en" ? "am" : "en";
  localStorage.setItem("ethioparks-lang", lang);
  applyStaticI18n();
  route();
});

// ---------------- helpers ----------------

const fmtETB = (n) => `${n.toLocaleString()} ETB`;
const fmtHour = (h) => `${String(h).padStart(2, "0")}:00`;
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

async function api(path, options) {
  const res = await fetch(path, options);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || t("err.generic"));
  return body;
}

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

const PAYMENTS = [
  ["telebirr", "book.pay.telebirr"],
  ["cbe-birr", "book.pay.cbe"],
  ["chapa", "book.pay.chapa"],
  ["pay-at-park", "book.pay.park"]
];

function paymentOptions() {
  return PAYMENTS.map(([v, key]) => `<option value="${v}">${t(key)}</option>`).join("");
}

function contactFields() {
  return `
    <div class="field"><label>${t("book.name")}</label>
      <input name="name" required minlength="2" autocomplete="name"></div>
    <div class="field"><label>${t("book.phone")}</label>
      <input name="phone" required inputmode="tel" placeholder="0911 234 567"></div>
    <div class="field"><label>${t("book.payment")}</label>
      <select name="paymentMethod">${paymentOptions()}</select></div>`;
}

// ---------------- views ----------------

let catalog = null; // { parks, sportTypes } cached

async function loadCatalog() {
  if (!catalog) catalog = await api("/api/parks");
  return catalog;
}

async function homeView() {
  const { parks, sportTypes } = await loadCatalog();
  const cities = [...new Set(parks.map((p) => p.city))];
  const sports = [...new Set(parks.flatMap((p) => p.facilities.map((f) => f.type)))];

  app.innerHTML = `
    <section class="hero">
      <h1>${t("hero.title")}</h1>
      <p>${t("hero.sub")}</p>
    </section>
    <div class="filters">
      <select id="cityFilter">
        <option value="">${t("filter.allCities")}</option>
        ${cities.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join("")}
      </select>
      <select id="sportFilter">
        <option value="">${t("filter.allSports")}</option>
        ${sports
          .map((s) => `<option value="${s}">${sportTypes[s].emoji} ${localName(sportTypes[s])}</option>`)
          .join("")}
      </select>
    </div>
    <div class="grid" id="parkGrid"></div>`;

  const render = () => {
    const city = document.getElementById("cityFilter").value;
    const sport = document.getElementById("sportFilter").value;
    const list = parks.filter(
      (p) =>
        (!city || p.city === city) && (!sport || p.facilities.some((f) => f.type === sport))
    );
    document.getElementById("parkGrid").innerHTML = list
      .map(
        (p) => `
      <a class="card" href="#/park/${p.id}" data-nav>
        <div class="card-banner" style="background:${p.theme}">${p.emoji}</div>
        <div class="card-body">
          <h3>${esc(localName(p.name))}</h3>
          <p class="card-city">📍 ${esc(p.city)} · ${t("park.hours")} ${fmtHour(p.openHour)}–${fmtHour(p.closeHour)}</p>
          <p class="card-desc">${esc(localName(p.description))}</p>
          <div class="chips">
            ${[...new Set(p.facilities.map((f) => f.type))]
              .map((s) => `<span class="chip">${sportTypes[s].emoji} ${localName(sportTypes[s])}</span>`)
              .join("")}
            <span class="chip">🎟️ ${t("park.entrance")}</span>
          </div>
        </div>
      </a>`
      )
      .join("");
  };
  document.getElementById("cityFilter").addEventListener("change", render);
  document.getElementById("sportFilter").addEventListener("change", render);
  render();
}

async function parkView(parkId) {
  const { park, sportTypes } = await api(`/api/parks/${parkId}`);
  app.innerHTML = `
    <a class="back-link" href="#/" data-nav>${t("common.back")}</a>
    <section class="park-head" style="background:${park.theme}">
      <h1>${park.emoji} ${esc(localName(park.name))}</h1>
      <div class="meta">📍 ${esc(park.city)}, ${esc(park.region)} · ${t("park.hours")} ${fmtHour(park.openHour)}–${fmtHour(park.closeHour)}</div>
      <p>${esc(localName(park.description))}</p>
    </section>

    <div class="facility">
      <div class="facility-info">
        <span class="facility-emoji">🎟️</span>
        <div>
          <div class="facility-name">${t("park.entrance")}</div>
          <div class="facility-price">${fmtETB(park.entrance.adultETB)} / ${t("park.adult")} · ${fmtETB(park.entrance.childETB)} / ${t("park.child")}</div>
        </div>
      </div>
      <a class="btn btn-primary" href="#/tickets/${park.id}" data-nav>${t("park.buyTicket")}</a>
    </div>

    <h2 class="section-title">${t("park.facilities")}</h2>
    ${
      park.facilities.length
        ? park.facilities
            .map(
              (f) => `
      <div class="facility">
        <div class="facility-info">
          <span class="facility-emoji">${sportTypes[f.type].emoji}</span>
          <div>
            <div class="facility-name">${esc(localName(f.name))}</div>
            <div class="facility-price">${f.pricePerHourETB.toLocaleString()} ${t("common.perHour")} · 👥 ${f.capacity}</div>
          </div>
        </div>
        <a class="btn btn-primary" href="#/book/${f.id}" data-nav>${t("book.title")}</a>
      </div>`
            )
            .join("")
        : `<p class="notice">${t("park.noFacilities")}</p>`
    }`;
}

async function bookView(facilityId) {
  const { parks } = await loadCatalog();
  let park, facility;
  for (const p of parks) {
    const f = p.facilities.find((x) => x.id === facilityId);
    if (f) { park = p; facility = f; break; }
  }
  if (!facility) return homeView();

  let selectedHour = null;
  let duration = 1;

  app.innerHTML = `
    <a class="back-link" href="#/park/${park.id}" data-nav>${t("common.back")}</a>
    <div class="panel">
      <h2>${t("book.title")}: ${esc(localName(facility.name))}</h2>
      <p class="notice">${park.emoji} ${esc(localName(park.name))} · ${facility.pricePerHourETB.toLocaleString()} ${t("common.perHour")}</p>
      <form id="bookForm">
        <div class="field"><label>${t("book.date")}</label>
          <input type="date" name="date" min="${todayISO()}" max="${todayISO(60)}" value="${todayISO()}"></div>
        <div class="field"><label>${t("book.slots")}</label>
          <div class="slot-grid" id="slotGrid">${t("common.loading")}</div></div>
        <div class="field"><label>${t("book.duration")}</label>
          <select name="duration">${[1, 2, 3, 4]
            .map((d) => `<option value="${d}">${d}</option>`)
            .join("")}</select></div>
        ${contactFields()}
        <div class="total-line">${t("book.total")}: <span id="total">${fmtETB(facility.pricePerHourETB)}</span></div>
        <div class="error-msg" id="err"></div>
        <button class="btn btn-primary" id="submitBtn" disabled>${t("book.confirm")}</button>
      </form>
    </div>`;

  const form = document.getElementById("bookForm");
  const slotGrid = document.getElementById("slotGrid");
  const errBox = document.getElementById("err");
  const submitBtn = document.getElementById("submitBtn");

  const updateTotal = () => {
    duration = Number(form.duration.value);
    document.getElementById("total").textContent = fmtETB(facility.pricePerHourETB * duration);
    submitBtn.disabled = selectedHour === null;
  };

  async function loadSlots() {
    selectedHour = null;
    slotGrid.textContent = t("common.loading");
    try {
      const { slots } = await api(
        `/api/parks/${park.id}/availability?facilityId=${facility.id}&date=${form.date.value}`
      );
      slotGrid.innerHTML = slots
        .map(
          (s) =>
            `<button type="button" class="slot ${s.available ? "" : "taken"}" data-hour="${s.hour}" ${s.available ? "" : "disabled"}>${fmtHour(s.hour)}</button>`
        )
        .join("");
      slotGrid.querySelectorAll(".slot:not(.taken)").forEach((btn) =>
        btn.addEventListener("click", () => {
          slotGrid.querySelectorAll(".slot").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
          selectedHour = Number(btn.dataset.hour);
          updateTotal();
        })
      );
    } catch (e) {
      slotGrid.innerHTML = `<span class="error-msg">${esc(e.message)}</span>`;
    }
    updateTotal();
  }

  form.date.addEventListener("change", loadSlots);
  form.duration.addEventListener("change", updateTotal);
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (selectedHour === null) return (errBox.textContent = t("book.pickSlot"));
    errBox.textContent = "";
    submitBtn.disabled = true;
    try {
      const { booking } = await api("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilityId: facility.id,
          date: form.date.value,
          hour: selectedHour,
          durationHours: Number(form.duration.value),
          name: form.name.value,
          phone: form.phone.value,
          paymentMethod: form.paymentMethod.value
        })
      });
      confirmationView(t("confirm.booked"), booking.code, [
        `${park.emoji} ${localName(park.name)} — ${localName(facility.name)}`,
        `${booking.date} · ${fmtHour(booking.hour)}–${fmtHour(booking.hour + booking.durationHours)}`,
        `${t("book.total")}: ${fmtETB(booking.amountETB)}`
      ]);
    } catch (e) {
      errBox.textContent = e.message;
      submitBtn.disabled = false;
      loadSlots();
    }
  });

  loadSlots();
}

async function ticketView(parkId) {
  const { park } = await api(`/api/parks/${parkId}`);
  app.innerHTML = `
    <a class="back-link" href="#/park/${park.id}" data-nav>${t("common.back")}</a>
    <div class="panel">
      <h2>🎟️ ${t("ticket.title")} — ${esc(localName(park.name))}</h2>
      <p class="notice">${fmtETB(park.entrance.adultETB)} / ${t("park.adult")} · ${fmtETB(park.entrance.childETB)} / ${t("park.child")}</p>
      <form id="ticketForm">
        <div class="field"><label>${t("book.date")}</label>
          <input type="date" name="date" min="${todayISO()}" max="${todayISO(60)}" value="${todayISO()}"></div>
        <div class="field"><label>${t("ticket.adults")}</label>
          <input type="number" name="adults" min="0" max="50" value="1"></div>
        <div class="field"><label>${t("ticket.children")}</label>
          <input type="number" name="children" min="0" max="50" value="0"></div>
        ${contactFields()}
        <div class="total-line">${t("book.total")}: <span id="total">${fmtETB(park.entrance.adultETB)}</span></div>
        <div class="error-msg" id="err"></div>
        <button class="btn btn-primary">${t("ticket.confirm")}</button>
      </form>
    </div>`;

  const form = document.getElementById("ticketForm");
  const updateTotal = () => {
    const total =
      Number(form.adults.value || 0) * park.entrance.adultETB +
      Number(form.children.value || 0) * park.entrance.childETB;
    document.getElementById("total").textContent = fmtETB(total);
  };
  form.adults.addEventListener("input", updateTotal);
  form.children.addEventListener("input", updateTotal);

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const errBox = document.getElementById("err");
    errBox.textContent = "";
    try {
      const { ticket } = await api("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parkId: park.id,
          date: form.date.value,
          adults: Number(form.adults.value || 0),
          children: Number(form.children.value || 0),
          name: form.name.value,
          phone: form.phone.value,
          paymentMethod: form.paymentMethod.value
        })
      });
      confirmationView(t("confirm.ticket"), ticket.code, [
        `${park.emoji} ${localName(park.name)}`,
        `${ticket.date} · ${ticket.adults} ${t("ticket.adults").toLowerCase()}, ${ticket.children} ${t("ticket.children").toLowerCase()}`,
        `${t("book.total")}: ${fmtETB(ticket.amountETB)}`
      ]);
    } catch (e) {
      errBox.textContent = e.message;
    }
  });
}

function confirmationView(title, code, lines) {
  app.innerHTML = `
    <div class="confirm-box">
      <h2>✅ ${title}</h2>
      <div class="confirm-code">${code}</div>
      ${lines.map((l) => `<p>${esc(l)}</p>`).join("")}
      <p class="notice">${t("confirm.keep")}</p>
      <a class="btn btn-primary" href="#/" data-nav>${t("confirm.another")}</a>
    </div>`;
}

async function myView() {
  app.innerHTML = `
    <div class="panel">
      <h2>${t("my.title")}</h2>
      <p class="notice">${t("my.sub")}</p>
      <form id="lookupForm">
        <div class="field"><label>${t("my.code")}</label>
          <input name="code" required placeholder="ETP-XXXXXX / TKT-XXXXXX"></div>
        <div class="field"><label>${t("book.phone")}</label>
          <input name="phone" required inputmode="tel"></div>
        <div class="error-msg" id="err"></div>
        <button class="btn btn-primary">${t("my.find")}</button>
      </form>
      <div id="result"></div>
    </div>`;

  const form = document.getElementById("lookupForm");
  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const errBox = document.getElementById("err");
    const resultBox = document.getElementById("result");
    errBox.textContent = "";
    resultBox.innerHTML = "";
    const code = form.code.value.trim().toUpperCase();
    const phone = form.phone.value.trim();
    const isTicket = code.startsWith("TKT");
    try {
      const params = `code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phone)}`;
      const data = await api(`/api/${isTicket ? "tickets" : "bookings"}/lookup?${params}`);
      const item = data.booking || data.ticket;
      const { parks } = await loadCatalog();
      const park = parks.find((p) => p.id === item.parkId);
      const detail = isTicket
        ? `${item.adults} ${t("ticket.adults")}, ${item.children} ${t("ticket.children")}`
        : `${fmtHour(item.hour)}–${fmtHour(item.hour + item.durationHours)}`;
      resultBox.innerHTML = `
        <div class="facility" style="margin-top:1rem">
          <div>
            <div class="facility-name">${park ? park.emoji + " " + esc(localName(park.name)) : esc(item.parkId)}</div>
            <div class="facility-price">${item.date} · ${detail} · ${fmtETB(item.amountETB)}</div>
            <div class="status-${item.status}">${item.status === "confirmed" ? "✅" : "❌"} ${item.status}</div>
          </div>
          ${
            !isTicket && item.status === "confirmed"
              ? `<button class="btn btn-danger" id="cancelBtn">${t("my.cancel")}</button>`
              : ""
          }
        </div>`;
      const cancelBtn = document.getElementById("cancelBtn");
      if (cancelBtn)
        cancelBtn.addEventListener("click", async () => {
          try {
            await api(`/api/bookings/${item.code}/cancel`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ phone })
            });
            form.dispatchEvent(new Event("submit"));
          } catch (e) {
            errBox.textContent = e.message;
          }
        });
    } catch {
      errBox.textContent = t("my.notFound");
    }
  });
}

async function adminView() {
  const { summary } = await api("/api/admin/summary");
  app.innerHTML = `
    <h2>${t("admin.title")}</h2>
    <p class="notice">${t("admin.sub")}</p>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th>${t("admin.park")}</th><th>${t("admin.city")}</th>
          <th>${t("admin.bookings")}</th><th>${t("admin.tickets")}</th>
          <th>${t("admin.revenue")}</th>
        </tr></thead>
        <tbody>
          ${summary
            .map(
              (row) => `<tr>
            <td>${esc(localName(row.name))}</td>
            <td>${esc(row.city)}</td>
            <td>${row.bookings}</td>
            <td>${row.tickets}</td>
            <td>${row.revenueETB.toLocaleString()}</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
}

// ---------------- router ----------------

async function route() {
  const hash = location.hash || "#/";
  app.innerHTML = `<p class="notice">${t("common.loading")}</p>`;
  try {
    let m;
    if ((m = hash.match(/^#\/park\/([\w-]+)$/))) await parkView(m[1]);
    else if ((m = hash.match(/^#\/book\/([\w-]+)$/))) await bookView(m[1]);
    else if ((m = hash.match(/^#\/tickets\/([\w-]+)$/))) await ticketView(m[1]);
    else if (hash === "#/my") await myView();
    else if (hash === "#/admin") await adminView();
    else await homeView();
  } catch (e) {
    app.innerHTML = `<p class="error-msg">${esc(e.message)}</p>`;
  }
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
applyStaticI18n();
route();
