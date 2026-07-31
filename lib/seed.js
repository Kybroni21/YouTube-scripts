// Seed catalogue of Ethiopian parks and their bookable facilities.
// Prices are in Ethiopian Birr (ETB). Hours use 24h local time (EAT).

export const parks = [
  {
    id: "addis-sport-park",
    name: { en: "Addis Sport Park", am: "አዲስ ስፖርት ፓርክ" },
    city: "Addis Ababa",
    region: "Addis Ababa",
    description: {
      en: "Multi-sport complex in Bole with floodlit courts and pitches for soccer, basketball, tennis, pickleball and more.",
      am: "በቦሌ የሚገኝ ባለብዙ ስፖርት ማዕከል — እግር ኳስ፣ ቅርጫት ኳስ፣ ቴኒስ፣ ፒክልቦል እና ሌሎችም።"
    },
    emoji: "⚽",
    theme: "#1a7a4c",
    openHour: 6,
    closeHour: 22,
    entrance: { adultETB: 100, childETB: 50 },
    facilities: [
      { id: "asp-soccer-1", type: "soccer", name: { en: "Soccer Field A (11-a-side)", am: "የእግር ኳስ ሜዳ A" }, pricePerHourETB: 3000, capacity: 22 },
      { id: "asp-soccer-2", type: "soccer", name: { en: "Soccer Field B (5-a-side)", am: "የእግር ኳስ ሜዳ B (5v5)" }, pricePerHourETB: 1500, capacity: 10 },
      { id: "asp-basketball-1", type: "basketball", name: { en: "Basketball Court 1", am: "የቅርጫት ኳስ ሜዳ 1" }, pricePerHourETB: 800, capacity: 10 },
      { id: "asp-tennis-1", type: "tennis", name: { en: "Tennis Court 1", am: "የቴኒስ ሜዳ 1" }, pricePerHourETB: 600, capacity: 4 },
      { id: "asp-tennis-2", type: "tennis", name: { en: "Tennis Court 2", am: "የቴኒስ ሜዳ 2" }, pricePerHourETB: 600, capacity: 4 },
      { id: "asp-pickleball-1", type: "pickleball", name: { en: "Pickleball Court", am: "የፒክልቦል ሜዳ" }, pricePerHourETB: 500, capacity: 4 },
      { id: "asp-padel-1", type: "padel", name: { en: "Padel Court", am: "የፓደል ሜዳ" }, pricePerHourETB: 900, capacity: 4 },
      { id: "asp-volleyball-1", type: "volleyball", name: { en: "Volleyball Court", am: "የመረብ ኳስ ሜዳ" }, pricePerHourETB: 700, capacity: 12 }
    ]
  },
  {
    id: "entoto-park",
    name: { en: "Entoto Park", am: "እንጦጦ ፓርክ" },
    city: "Addis Ababa",
    region: "Addis Ababa",
    description: {
      en: "Forest park on the Entoto mountains with sports courts, cycling, horse riding and adventure activities.",
      am: "በእንጦጦ ተራሮች ላይ የሚገኝ ደን ፓርክ — የስፖርት ሜዳዎች፣ ብስክሌት፣ ፈረስ ግልቢያ እና ጀብዱ እንቅስቃሴዎች።"
    },
    emoji: "🌲",
    theme: "#2d6a4f",
    openHour: 7,
    closeHour: 19,
    entrance: { adultETB: 200, childETB: 100 },
    facilities: [
      { id: "ent-basketball-1", type: "basketball", name: { en: "Basketball Court", am: "የቅርጫት ኳስ ሜዳ" }, pricePerHourETB: 600, capacity: 10 },
      { id: "ent-tennis-1", type: "tennis", name: { en: "Tennis Court", am: "የቴኒስ ሜዳ" }, pricePerHourETB: 500, capacity: 4 },
      { id: "ent-cycling-1", type: "cycling", name: { en: "Cycling Track (bike incl.)", am: "የብስክሌት ትራክ" }, pricePerHourETB: 400, capacity: 1 },
      { id: "ent-horse-1", type: "horse-riding", name: { en: "Horse Riding Session", am: "የፈረስ ግልቢያ" }, pricePerHourETB: 800, capacity: 1 }
    ]
  },
  {
    id: "friendship-park",
    name: { en: "Friendship Park", am: "ወዳጅነት ፓርክ" },
    city: "Addis Ababa",
    region: "Addis Ababa",
    description: {
      en: "Riverside park at Sheger with green lawns, amphitheatre, fountains and recreational courts.",
      am: "በሸገር ዳርቻ የሚገኝ ፓርክ — አረንጓዴ ሜዳዎች፣ አምፊቲያትር፣ ፏፏቴዎች እና የመዝናኛ ሜዳዎች።"
    },
    emoji: "⛲",
    theme: "#1d6fa5",
    openHour: 8,
    closeHour: 20,
    entrance: { adultETB: 150, childETB: 70 },
    facilities: [
      { id: "fsp-volleyball-1", type: "volleyball", name: { en: "Volleyball Court", am: "የመረብ ኳስ ሜዳ" }, pricePerHourETB: 500, capacity: 12 },
      { id: "fsp-basketball-1", type: "basketball", name: { en: "Basketball Court", am: "የቅርጫት ኳስ ሜዳ" }, pricePerHourETB: 600, capacity: 10 },
      { id: "fsp-tabletennis-1", type: "table-tennis", name: { en: "Table Tennis Pavilion", am: "የጠረጴዛ ቴኒስ" }, pricePerHourETB: 200, capacity: 4 }
    ]
  },
  {
    id: "unity-park",
    name: { en: "Unity Park", am: "አንድነት ፓርክ" },
    city: "Addis Ababa",
    region: "Addis Ababa",
    description: {
      en: "Historic palace grounds with gardens, a zoo and cultural pavilions. Entrance tickets bookable in advance.",
      am: "ታሪካዊ ቤተ መንግሥት ግቢ — የአትክልት ስፍራዎች፣ የእንስሳት መካነ አራዊት እና የባህል ድንኳኖች።"
    },
    emoji: "🏛️",
    theme: "#9a6a1f",
    openHour: 9,
    closeHour: 18,
    entrance: { adultETB: 300, childETB: 150 },
    facilities: []
  },
  {
    id: "gulele-botanic",
    name: { en: "Gulele Botanic Garden", am: "ጉለሌ የዕፅዋት ማዕከል" },
    city: "Addis Ababa",
    region: "Addis Ababa",
    description: {
      en: "Botanical garden and nature reserve with trails, picnic sites and open-air sports lawns.",
      am: "የዕፅዋት ማዕከል እና የተፈጥሮ ጥብቅ ስፍራ — መንገዶች፣ የሽርሽር ቦታዎች እና ክፍት ሜዳዎች።"
    },
    emoji: "🌿",
    theme: "#40916c",
    openHour: 8,
    closeHour: 18,
    entrance: { adultETB: 100, childETB: 50 },
    facilities: [
      { id: "gul-lawn-1", type: "multi-sport", name: { en: "Sports Lawn (group games)", am: "የስፖርት ሜዳ" }, pricePerHourETB: 700, capacity: 30 }
    ]
  },
  {
    id: "amora-gedel",
    name: { en: "Amora Gedel Park", am: "አሞራ ገደል ፓርክ" },
    city: "Hawassa",
    region: "Sidama",
    description: {
      en: "Lakeside park on Lake Hawassa famous for its fish market, birdlife and shore-side recreation grounds.",
      am: "በሐዋሳ ሐይቅ ዳርቻ የሚገኝ ፓርክ — በአሣ ገበያው፣ በአዕዋፍ እና በመዝናኛ ስፍራዎቹ የታወቀ።"
    },
    emoji: "🦩",
    theme: "#0d7a8a",
    openHour: 7,
    closeHour: 19,
    entrance: { adultETB: 80, childETB: 40 },
    facilities: [
      { id: "amg-volleyball-1", type: "volleyball", name: { en: "Beach Volleyball Court", am: "የባህር ዳርቻ መረብ ኳስ" }, pricePerHourETB: 400, capacity: 12 },
      { id: "amg-soccer-1", type: "soccer", name: { en: "Lakeside Mini Pitch", am: "የሐይቅ ዳርቻ ሚኒ ሜዳ" }, pricePerHourETB: 900, capacity: 10 }
    ]
  },
  {
    id: "bahirdar-riverside",
    name: { en: "Bahir Dar Riverside Park", am: "ባሕር ዳር የወንዝ ዳርቻ ፓርክ" },
    city: "Bahir Dar",
    region: "Amhara",
    description: {
      en: "Promenade park along the Blue Nile with courts, jogging paths and boat launch points.",
      am: "በአባይ ወንዝ ዳርቻ የሚገኝ ፓርክ — ሜዳዎች፣ የሩጫ መንገዶች እና የጀልባ መነሻዎች።"
    },
    emoji: "🚣",
    theme: "#1e5f8a",
    openHour: 7,
    closeHour: 20,
    entrance: { adultETB: 60, childETB: 30 },
    facilities: [
      { id: "bdr-basketball-1", type: "basketball", name: { en: "Basketball Court", am: "የቅርጫት ኳስ ሜዳ" }, pricePerHourETB: 500, capacity: 10 },
      { id: "bdr-tennis-1", type: "tennis", name: { en: "Tennis Court", am: "የቴኒስ ሜዳ" }, pricePerHourETB: 450, capacity: 4 }
    ]
  },
  {
    id: "adama-city-park",
    name: { en: "Adama City Park", am: "አዳማ ከተማ ፓርክ" },
    city: "Adama",
    region: "Oromia",
    description: {
      en: "Urban park in Adama with shaded courts and family recreation areas.",
      am: "በአዳማ የሚገኝ የከተማ ፓርክ — ጥላ ያላቸው ሜዳዎች እና የቤተሰብ መዝናኛ ስፍራዎች።"
    },
    emoji: "🌳",
    theme: "#52796f",
    openHour: 6,
    closeHour: 21,
    entrance: { adultETB: 50, childETB: 25 },
    facilities: [
      { id: "adm-soccer-1", type: "soccer", name: { en: "5-a-side Pitch", am: "5v5 ሜዳ" }, pricePerHourETB: 1000, capacity: 10 },
      { id: "adm-basketball-1", type: "basketball", name: { en: "Basketball Court", am: "የቅርጫት ኳስ ሜዳ" }, pricePerHourETB: 500, capacity: 10 },
      { id: "adm-pickleball-1", type: "pickleball", name: { en: "Pickleball Court", am: "የፒክልቦል ሜዳ" }, pricePerHourETB: 350, capacity: 4 }
    ]
  }
];

export const sportTypes = {
  soccer: { en: "Soccer", am: "እግር ኳስ", emoji: "⚽" },
  basketball: { en: "Basketball", am: "ቅርጫት ኳስ", emoji: "🏀" },
  tennis: { en: "Tennis", am: "ቴኒስ", emoji: "🎾" },
  pickleball: { en: "Pickleball", am: "ፒክልቦል", emoji: "🏓" },
  padel: { en: "Padel", am: "ፓደል", emoji: "🎾" },
  volleyball: { en: "Volleyball", am: "መረብ ኳስ", emoji: "🏐" },
  "table-tennis": { en: "Table Tennis", am: "ጠረጴዛ ቴኒስ", emoji: "🏓" },
  cycling: { en: "Cycling", am: "ብስክሌት", emoji: "🚴" },
  "horse-riding": { en: "Horse Riding", am: "ፈረስ ግልቢያ", emoji: "🐎" },
  "multi-sport": { en: "Multi-sport", am: "ባለብዙ ስፖርት", emoji: "🤸" }
};
