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
    "nav.staff": "Park Staff",
    "nav.addPark": "+ Add Park",
    "onboard.title": "Add your park to EthioParks",
    "onboard.sub": "Register your park once and start taking digital bookings — no call center needed.",
    "onboard.nameEn": "Park name (English)",
    "onboard.nameAm": "Park name (Amharic, optional)",
    "onboard.city": "City",
    "onboard.region": "Region",
    "onboard.desc": "Short description",
    "onboard.open": "Opens at",
    "onboard.close": "Closes at",
    "onboard.adultFee": "Adult entrance fee (ETB)",
    "onboard.childFee": "Child entrance fee (ETB)",
    "onboard.facilities": "Bookable facilities",
    "onboard.sport": "Sport",
    "onboard.addFacility": "+ Add facility",
    "onboard.facilityName": "Facility name",
    "onboard.price": "Price (ETB/hr)",
    "onboard.capacity": "Capacity",
    "onboard.remove": "Remove",
    "onboard.submit": "Register park",
    "onboard.done": "Park registered!",
    "onboard.keyNote": "This is your staff admin key. Save it somewhere safe — you'll need it to open the Park Staff portal. It will not be shown again.",
    "onboard.goStaff": "Open staff portal",
    "manage.title": "Park staff portal",
    "manage.sub": "Sign in with your park and admin key to see bookings and manage settings. Demo key for seeded parks: demo-<park-id>.",
    "manage.park": "Park",
    "manage.key": "Admin key",
    "manage.signIn": "Open portal",
    "manage.bookingsFor": "Bookings",
    "manage.ticketsFor": "Ticket sales",
    "manage.allDates": "All dates",
    "manage.facility": "Facility",
    "manage.customer": "Customer",
    "manage.phone": "Phone",
    "manage.amount": "Amount (ETB)",
    "manage.none": "Nothing yet for this date.",
    "manage.settings": "Park settings",
    "manage.save": "Save settings",
    "manage.saved": "Saved.",
    "manage.newFacility": "Add a facility",
    "manage.added": "Facility added.",
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
    "nav.staff": "የፓርክ ሰራተኞች",
    "nav.addPark": "+ ፓርክ ጨምር",
    "onboard.title": "ፓርክዎን ወደ ኢትዮፓርክስ ይጨምሩ",
    "onboard.sub": "ፓርክዎን አንድ ጊዜ ይመዝግቡ እና ዲጂታል ማስያዣ መቀበል ይጀምሩ — የጥሪ ማዕከል አያስፈልግም።",
    "onboard.nameEn": "የፓርክ ስም (እንግሊዝኛ)",
    "onboard.nameAm": "የፓርክ ስም (አማርኛ፣ አማራጭ)",
    "onboard.city": "ከተማ",
    "onboard.region": "ክልል",
    "onboard.desc": "አጭር መግለጫ",
    "onboard.open": "የሚከፈትበት ሰዓት",
    "onboard.close": "የሚዘጋበት ሰዓት",
    "onboard.adultFee": "የአዋቂ መግቢያ ክፍያ (ብር)",
    "onboard.childFee": "የልጅ መግቢያ ክፍያ (ብር)",
    "onboard.facilities": "የሚያዙ ሜዳዎች",
    "onboard.sport": "ስፖርት",
    "onboard.addFacility": "+ ሜዳ ጨምር",
    "onboard.facilityName": "የሜዳ ስም",
    "onboard.price": "ዋጋ (ብር/ሰዓት)",
    "onboard.capacity": "አቅም",
    "onboard.remove": "አስወግድ",
    "onboard.submit": "ፓርኩን መዝግብ",
    "onboard.done": "ፓርኩ ተመዝግቧል!",
    "onboard.keyNote": "ይህ የሰራተኞች አስተዳደር ቁልፍዎ ነው። ደህንነቱ በተጠበቀ ቦታ ያስቀምጡት — የፓርክ ሰራተኞች ፖርታልን ለመክፈት ያስፈልጋል። ዳግም አይታይም።",
    "onboard.goStaff": "የሰራተኞች ፖርታል ክፈት",
    "manage.title": "የፓርክ ሰራተኞች ፖርታል",
    "manage.sub": "ማስያዣዎችን ለማየት እና ቅንብሮችን ለማስተዳደር በፓርክዎ እና በአስተዳደር ቁልፍዎ ይግቡ። ለናሙና ፓርኮች ቁልፍ፦ demo-<park-id>።",
    "manage.park": "ፓርክ",
    "manage.key": "የአስተዳደር ቁልፍ",
    "manage.signIn": "ፖርታል ክፈት",
    "manage.bookingsFor": "ማስያዣዎች",
    "manage.ticketsFor": "የትኬት ሽያጭ",
    "manage.allDates": "ሁሉም ቀናት",
    "manage.facility": "ሜዳ",
    "manage.customer": "ደንበኛ",
    "manage.phone": "ስልክ",
    "manage.amount": "መጠን (ብር)",
    "manage.none": "ለዚህ ቀን እስካሁን ምንም የለም።",
    "manage.settings": "የፓርክ ቅንብሮች",
    "manage.save": "ቅንብሮችን አስቀምጥ",
    "manage.saved": "ተቀምጧል።",
    "manage.newFacility": "ሜዳ ጨምር",
    "manage.added": "ሜዳው ተጨምሯል።",
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

function hourOptions(from, to, selected) {
  let out = "";
  for (let h = from; h <= to; h++)
    out += `<option value="${h}" ${h === selected ? "selected" : ""}>${fmtHour(h)}</option>`;
  return out;
}

async function onboardView() {
  const { sportTypes } = await loadCatalog();
  const sportOpts = Object.entries(sportTypes)
    .map(([k, v]) => `<option value="${k}">${v.emoji} ${localName(v)}</option>`)
    .join("");

  const facilityRow = () => `
    <div class="facility" data-facility-row>
      <div style="flex:1;min-width:220px">
        <div class="field"><label>${t("onboard.sport")}</label>
          <select name="ftype">${sportOpts}</select></div>
        <div class="field"><label>${t("onboard.facilityName")}</label>
          <input name="fname" required minlength="2"></div>
        <div class="field"><label>${t("onboard.price")}</label>
          <input name="fprice" type="number" min="1" value="500" required></div>
        <div class="field"><label>${t("onboard.capacity")}</label>
          <input name="fcapacity" type="number" min="1" value="10" required></div>
      </div>
      <button type="button" class="btn btn-secondary" data-remove-row>${t("onboard.remove")}</button>
    </div>`;

  app.innerHTML = `
    <div class="panel">
      <h2>${t("onboard.title")}</h2>
      <p class="notice">${t("onboard.sub")}</p>
      <form id="onboardForm">
        <div class="field"><label>${t("onboard.nameEn")}</label><input name="nameEn" required minlength="3"></div>
        <div class="field"><label>${t("onboard.nameAm")}</label><input name="nameAm"></div>
        <div class="field"><label>${t("onboard.city")}</label><input name="city" required minlength="2"></div>
        <div class="field"><label>${t("onboard.region")}</label><input name="region"></div>
        <div class="field"><label>${t("onboard.desc")}</label><input name="desc"></div>
        <div class="field"><label>${t("onboard.open")}</label>
          <select name="openHour">${hourOptions(0, 23, 8)}</select></div>
        <div class="field"><label>${t("onboard.close")}</label>
          <select name="closeHour">${hourOptions(1, 24, 20)}</select></div>
        <div class="field"><label>${t("onboard.adultFee")}</label>
          <input name="adultFee" type="number" min="0" value="100" required></div>
        <div class="field"><label>${t("onboard.childFee")}</label>
          <input name="childFee" type="number" min="0" value="50" required></div>
        <h3>${t("onboard.facilities")}</h3>
        <div id="facilityRows"></div>
        <p><button type="button" class="btn btn-secondary" id="addRow">${t("onboard.addFacility")}</button></p>
        <div class="error-msg" id="err"></div>
        <button class="btn btn-primary">${t("onboard.submit")}</button>
      </form>
    </div>`;

  const rows = document.getElementById("facilityRows");
  const addRow = () => {
    rows.insertAdjacentHTML("beforeend", facilityRow());
    rows.querySelectorAll("[data-remove-row]").forEach((btn) => {
      btn.onclick = () => btn.closest("[data-facility-row]").remove();
    });
  };
  document.getElementById("addRow").addEventListener("click", addRow);
  addRow();

  document.getElementById("onboardForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const errBox = document.getElementById("err");
    errBox.textContent = "";
    const facilities = [...rows.querySelectorAll("[data-facility-row]")].map((row) => ({
      type: row.querySelector("[name=ftype]").value,
      name: row.querySelector("[name=fname]").value,
      pricePerHourETB: Number(row.querySelector("[name=fprice]").value),
      capacity: Number(row.querySelector("[name=fcapacity]").value)
    }));
    try {
      const { park, adminKey } = await api("/api/parks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: { en: form.nameEn.value, am: form.nameAm.value || undefined },
          city: form.city.value,
          region: form.region.value || undefined,
          description: form.desc.value || undefined,
          openHour: Number(form.openHour.value),
          closeHour: Number(form.closeHour.value),
          entrance: { adultETB: Number(form.adultFee.value), childETB: Number(form.childFee.value) },
          facilities
        })
      });
      catalog = null; // new park should appear in the directory
      sessionStorage.setItem("ethioparks-staff", JSON.stringify({ parkId: park.id, key: adminKey }));
      app.innerHTML = `
        <div class="confirm-box">
          <h2>✅ ${t("onboard.done")}</h2>
          <p>${park.emoji} ${esc(localName(park.name))} — ${esc(park.city)}</p>
          <div class="confirm-code">${adminKey}</div>
          <p class="notice">${t("onboard.keyNote")}</p>
          <a class="btn btn-primary" href="#/manage" data-nav>${t("onboard.goStaff")}</a>
          <a class="btn btn-secondary" href="#/park/${park.id}" data-nav>${t("confirm.another")}</a>
        </div>`;
    } catch (e) {
      errBox.textContent = e.message;
    }
  });
}

async function manageView() {
  const { parks } = await loadCatalog();
  const saved = JSON.parse(sessionStorage.getItem("ethioparks-staff") || "null");

  app.innerHTML = `
    <div class="panel">
      <h2>${t("manage.title")}</h2>
      <p class="notice">${t("manage.sub")}</p>
      <form id="staffLogin">
        <div class="field"><label>${t("manage.park")}</label>
          <select name="parkId">${parks
            .map(
              (p) =>
                `<option value="${p.id}" ${saved?.parkId === p.id ? "selected" : ""}>${p.emoji} ${esc(localName(p.name))}</option>`
            )
            .join("")}</select></div>
        <div class="field"><label>${t("manage.key")}</label>
          <input name="key" required value="${saved ? esc(saved.key) : ""}"></div>
        <div class="error-msg" id="err"></div>
        <button class="btn btn-primary">${t("manage.signIn")}</button>
      </form>
    </div>
    <div id="portal"></div>`;

  document.getElementById("staffLogin").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const parkId = ev.target.parkId.value;
    const key = ev.target.key.value.trim();
    sessionStorage.setItem("ethioparks-staff", JSON.stringify({ parkId, key }));
    renderPortal(parkId, key);
  });

  async function renderPortal(parkId, key) {
    const errBox = document.getElementById("err");
    const portal = document.getElementById("portal");
    errBox.textContent = "";
    const park = parks.find((p) => p.id === parkId);
    const headers = { "X-Admin-Key": key };
    let date = todayISO();
    let allDates = false;

    async function loadData() {
      const q = allDates ? "" : `?date=${date}`;
      return api(`/api/parks/${parkId}/manage/bookings${q}`, { headers });
    }

    let data;
    try {
      data = await loadData();
    } catch (e) {
      errBox.textContent = e.message;
      portal.innerHTML = "";
      return;
    }

    const facilityName = (id) => {
      const f = park.facilities.find((x) => x.id === id);
      return f ? localName(f.name) : id;
    };

    const renderTables = () => {
      const rows = (items, cols) =>
        items.length
          ? items.map((x) => `<tr>${cols(x)}</tr>`).join("")
          : `<tr><td colspan="6" class="notice">${t("manage.none")}</td></tr>`;
      document.getElementById("staffTables").innerHTML = `
        <h3 class="section-title">${t("manage.bookingsFor")}</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>${t("common.date")}</th><th>${t("common.time")}</th><th>${t("manage.facility")}</th>
          <th>${t("manage.customer")}</th><th>${t("manage.phone")}</th><th>${t("manage.amount")}</th><th>${t("common.status")}</th></tr></thead>
          <tbody>${rows(data.bookings, (b) => `
            <td>${b.date}</td><td>${fmtHour(b.hour)}–${fmtHour(b.hour + b.durationHours)}</td>
            <td>${esc(facilityName(b.facilityId))}</td><td>${esc(b.name)}</td><td>${esc(b.phone)}</td>
            <td>${b.amountETB.toLocaleString()}</td><td class="status-${b.status}">${b.status}</td>`)}</tbody>
        </table></div>
        <h3 class="section-title">${t("manage.ticketsFor")}</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>${t("common.date")}</th><th>${t("manage.customer")}</th><th>${t("manage.phone")}</th>
          <th>${t("ticket.adults")}</th><th>${t("ticket.children")}</th><th>${t("manage.amount")}</th></tr></thead>
          <tbody>${rows(data.tickets, (x) => `
            <td>${x.date}</td><td>${esc(x.name)}</td><td>${esc(x.phone)}</td>
            <td>${x.adults}</td><td>${x.children}</td><td>${x.amountETB.toLocaleString()}</td>`)}</tbody>
        </table></div>`;
    };

    const sportOpts = Object.entries(catalog.sportTypes)
      .map(([k, v]) => `<option value="${k}">${v.emoji} ${localName(v)}</option>`)
      .join("");

    portal.innerHTML = `
      <div class="filters" style="margin-top:1.1rem">
        <input type="date" id="staffDate" value="${date}">
        <label style="display:flex;align-items:center;gap:0.4rem;flex:0">
          <input type="checkbox" id="staffAll"> ${t("manage.allDates")}</label>
      </div>
      <div id="staffTables"></div>
      <h3 class="section-title">${t("manage.settings")}</h3>
      <div class="panel">
        <form id="settingsForm">
          <div class="field"><label>${t("onboard.open")}</label>
            <select name="openHour">${hourOptions(0, 23, park.openHour)}</select></div>
          <div class="field"><label>${t("onboard.close")}</label>
            <select name="closeHour">${hourOptions(1, 24, park.closeHour)}</select></div>
          <div class="field"><label>${t("onboard.adultFee")}</label>
            <input name="adultFee" type="number" min="0" value="${park.entrance.adultETB}"></div>
          <div class="field"><label>${t("onboard.childFee")}</label>
            <input name="childFee" type="number" min="0" value="${park.entrance.childETB}"></div>
          <div class="error-msg" id="settingsErr"></div>
          <button class="btn btn-primary">${t("manage.save")}</button>
          <span class="notice" id="settingsOk"></span>
        </form>
      </div>
      <h3 class="section-title">${t("manage.newFacility")}</h3>
      <div class="panel">
        <form id="newFacilityForm">
          <div class="field"><select name="ftype">${sportOpts}</select></div>
          <div class="field"><label>${t("onboard.facilityName")}</label>
            <input name="fname" required minlength="2"></div>
          <div class="field"><label>${t("onboard.price")}</label>
            <input name="fprice" type="number" min="1" value="500" required></div>
          <div class="field"><label>${t("onboard.capacity")}</label>
            <input name="fcapacity" type="number" min="1" value="10" required></div>
          <div class="error-msg" id="facilityErr"></div>
          <button class="btn btn-primary">${t("onboard.addFacility")}</button>
          <span class="notice" id="facilityOk"></span>
        </form>
      </div>`;

    renderTables();

    const refresh = async () => {
      try {
        data = await loadData();
        renderTables();
      } catch (e) {
        errBox.textContent = e.message;
      }
    };
    document.getElementById("staffDate").addEventListener("change", (ev) => {
      date = ev.target.value;
      refresh();
    });
    document.getElementById("staffAll").addEventListener("change", (ev) => {
      allDates = ev.target.checked;
      refresh();
    });

    document.getElementById("settingsForm").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const f = ev.target;
      const errEl = document.getElementById("settingsErr");
      const okEl = document.getElementById("settingsOk");
      errEl.textContent = "";
      okEl.textContent = "";
      try {
        const { park: updated } = await api(`/api/parks/${parkId}`, {
          method: "PATCH",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            openHour: Number(f.openHour.value),
            closeHour: Number(f.closeHour.value),
            entrance: { adultETB: Number(f.adultFee.value), childETB: Number(f.childFee.value) }
          })
        });
        Object.assign(park, updated);
        catalog = null;
        okEl.textContent = t("manage.saved");
      } catch (e) {
        errEl.textContent = e.message;
      }
    });

    document.getElementById("newFacilityForm").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const f = ev.target;
      const errEl = document.getElementById("facilityErr");
      const okEl = document.getElementById("facilityOk");
      errEl.textContent = "";
      okEl.textContent = "";
      try {
        const { facility } = await api(`/api/parks/${parkId}/facilities`, {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({
            type: f.ftype.value,
            name: f.fname.value,
            pricePerHourETB: Number(f.fprice.value),
            capacity: Number(f.fcapacity.value)
          })
        });
        park.facilities.push(facility);
        catalog = null;
        okEl.textContent = t("manage.added");
        f.fname.value = "";
      } catch (e) {
        errEl.textContent = e.message;
      }
    });
  }

  if (saved?.parkId && saved?.key && parks.some((p) => p.id === saved.parkId)) {
    renderPortal(saved.parkId, saved.key);
  }
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
    else if (hash === "#/onboard") await onboardView();
    else if (hash === "#/manage") await manageView();
    else await homeView();
  } catch (e) {
    app.innerHTML = `<p class="error-msg">${esc(e.message)}</p>`;
  }
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);
applyStaticI18n();
route();
