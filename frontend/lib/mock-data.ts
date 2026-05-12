// Static mock data for the visual prototype. No backend, no API.

export type PrayerRow = {
  name: "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Maghrib" | "Isha" | "Jummah";
  begins: string;
  adhan?: string;
  jamat?: string;
  minutes: number; // minutes since midnight, for "next prayer" highlight
};

export const prayerTimes: PrayerRow[] = [
  { name: "Fajr",    begins: "4:30 AM", adhan: "5:35 AM", jamat: "5:45 AM", minutes: 270 },
  { name: "Sunrise", begins: "6:26 AM", minutes: 386 },
  { name: "Dhuhr",   begins: "1:15 PM", adhan: "1:25 PM", jamat: "1:35 PM", minutes: 795 },
  { name: "Asr",     begins: "5:03 PM", adhan: "6:05 PM", jamat: "6:15 PM", minutes: 1023 },
  { name: "Maghrib", begins: "8:04 PM", adhan: "8:07 PM", jamat: "8:10 PM", minutes: 1204 },
  { name: "Isha",    begins: "9:31 PM", adhan: "9:35 PM", jamat: "9:45 PM", minutes: 1291 },
  { name: "Jummah",  begins: "1:14 PM", adhan: "1:30 PM", jamat: "2:00 PM", minutes: 794 },
];

export const hijriDate = "01 Qi'dah 1447";
export const gregorianDate = "19 April 2026";

export type Campaign = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  image: string;
  unitLabel: string;
  unitPrice: number; // cents
  targetUnits: number;
  soldUnits: number;
  raisedAmount: number; // cents
  goalAmount: number;   // cents
  donors: number;
  daysLeft: number;
};

export const campaigns: Campaign[] = [
  {
    id: "c1",
    slug: "masjid-al-ummah",
    title: "Masjid Al-Ummah — Oshawa, ON",
    tagline:
      "If 850 people buy one musalla each, we'll break ground in the Summer of 2026, Insha'Allah.",
    image: "/masjid-render-front.png",
    unitLabel: "Musalla",
    unitPrice: 1_000_000, // $10,000 in cents
    targetUnits: 850,
    soldUnits: 173,
    raisedAmount: 353_000_000, // $1.8M land + 173 × $10,000 = $3.53M in cents
    goalAmount: 1_000_000_000, // $10M projected cost in cents
    donors: 412,
    daysLeft: 96,
  },
  {
    id: "c2",
    slug: "ramadan-iftar-2026",
    title: "Ramadan Iftar Drive",
    tagline: "Sponsor a full iftar for 50 families every night.",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1400&q=80",
    unitLabel: "Iftar Plate",
    unitPrice: 1500,
    targetUnits: 5000,
    soldUnits: 3420,
    raisedAmount: 51_300_00,
    goalAmount: 75_000_00,
    donors: 812,
    daysLeft: 12,
  },
  {
    id: "c3",
    slug: "orphan-support",
    title: "Orphan Monthly Support",
    tagline: "Cover food, education, and healthcare for one orphan.",
    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1400&q=80",
    unitLabel: "Month",
    unitPrice: 7500,
    targetUnits: 200,
    soldUnits: 128,
    raisedAmount: 96_000_00,
    goalAmount: 150_000_00,
    donors: 94,
    daysLeft: 200,
  },
];

export type Program = {
  id: string;
  title: string;
  description: string;
  icon: "book" | "users" | "calendar" | "heart" | "graduation" | "sparkles";
  schedule: string;
  ageRange: string;
  accent: "green" | "gold";
};

export const programs: Program[] = [
  {
    id: "p1",
    title: "Full-Time Hifz Class",
    description:
      "Full-time Qur'anic memorization programme run through Darul-Uloom UFD.",
    icon: "sparkles",
    schedule: "Mon–Fri · 8 AM–7 PM",
    ageRange: "Males 10+",
    accent: "green",
  },
  {
    id: "p2",
    title: "Full-Time English-Medium Aalim Class",
    description:
      "Bachelor of Higher Islamic Education, taught in English through Darul-Uloom UFD.",
    icon: "graduation",
    schedule: "Mon–Fri · 8 AM–7 PM",
    ageRange: "Males 15+",
    accent: "gold",
  },
  {
    id: "p3",
    title: "Evening Maktab",
    description:
      "Qaida, Nazira and part-time Hifz for all levels — our children's madrasah.",
    icon: "book",
    schedule: "Mon–Thu · 5:00–7:00 PM",
    ageRange: "Ages 6+",
    accent: "green",
  },
  {
    id: "p4",
    title: "Summer Camp Program",
    description:
      "A seasonal programme combining Qur'anic learning, Islamic character, and activity.",
    icon: "users",
    schedule: "Summer sessions",
    ageRange: "Children",
    accent: "gold",
  },
];

// Masjid Al-Ummah — real construction plan from ummahfoundation.ca
export const masjidProject = {
  location: "Oshawa, ON",
  positioning: "The first Green Mosque in North America",
  landAcres: 6,
  landYear: 2013,
  landCost: 1_800_000,
  projectedCost: 11_864_000, // $207k spent + $265k permits + $642k city fees + $10.75M construction
  raised: 3_530_000,
  menCapacity: 500,
  womenCapacity: 350,
  parkingSpaces: 147,
  usableSqft: 35_000,
  floors: 2,
  features: [
    "Men's prayer area for 500 musallis",
    "Women's prayer area for 350 musallis",
    "Classrooms for Qur'anic lessons",
    "Library, kitchen, cafeteria, and funeral facility",
    "147 parking spaces",
  ],
  greenFeatures: [
    "Rainwater cisterns and permeable paving",
    "LED lighting with motion sensors",
    "Water-saving fixtures and storm-water pond",
    "Electric-vehicle chargers and carpool parking",
  ],
  costBreakdown: [
    { label: "Spent to date · engineering & city fees", amount: 207_165 },
    { label: "Building permits & engineering", amount: 265_000 },
    { label: "City fees & development charges", amount: 642_000 },
    { label: "Construction phase", amount: 10_750_000 },
  ],
  milestones: [
    { year: "2013", label: "6 acre land purchased" },
    { year: "2020", label: "Land fully paid off" },
    { year: "2026", label: "Groundbreaking — Insha'Allah" },
  ],
};

// Canadian charity registration — confirm with client before go-live
export const CHARITY_BN = "892899303RR0001"; // placeholder — update with real BN

export const contact = {
  name: "Ummah Foundation of Durham",
  shortName: "Ummah Foundation",
  address: {
    line1: "1423 Thornton Rd North",
    line2: "Oshawa, Ontario, Canada L1L 0P6",
  },
  masjidPhone: "(289) 893-1248",
  masjidPhoneHref: "tel:+12898931248",
  moulana: {
    name: "Moulana Aamir Bhayat",
    phone: "(647) 333-6965",
    phoneHref: "tel:+16473336965",
    role: "Programs & Admissions",
  },
  email: "info@ummahfoundation.ca",
  registrationEmail: "ibaidfadl@yahoo.ca",
  website: "ummahfoundation.ca",
  websiteHref: "https://ummahfoundation.ca",
  etransfer: "info@ummahfoundation.ca",
  tagline: "Guiding Hearts · Enlightening Minds · Inspiring Futures",
};

// Long-form detail used on /programs/[slug] and feature sections.
// Keys must match `programs[].title` exactly.
export const programDetails = {
  "Full-Time Hifz Class": {
    subtitle: "Memorisation of the Holy Qur'an",
    presenter: "Darul-Uloom UFD",
    intake: "2026 admissions open",
    body:
      "Full-time Qur'anic memorisation programme in a focused environment with skilled teachers guiding students in correct tajweed, pronunciation, and memorisation — with a strong emphasis on revision.",
    badge: "Admissions Open",
  },
  "Full-Time English-Medium Aalim Class": {
    subtitle: "Bachelor of Higher Islamic Education",
    presenter: "Darul-Uloom UFD",
    intake: "Starts every September",
    body:
      "English-medium Aalim programme covering Islamic theology, Qur'anic exegesis, Prophetic sciences, Arabic proficiency, and character development — preparing scholars, community leaders, and model citizens.",
    badge: "Admissions Open",
  },
  "Evening Maktab": {
    subtitle: "Qaida, Nazira & Part-Time Hifz",
    presenter: "Masjid Al-Ummah",
    intake: "Rolling registration",
    body:
      "Evening Maktab covers Qaida fundamentals, Nazira recitation, and part-time Hifz for students age 6 and up.",
    badge: "Ages 6+",
  },
  "Summer Camp Program": {
    subtitle: "A seasonal Qur'anic & character programme",
    presenter: "Masjid Al-Ummah",
    intake: "Summer intake",
    body: "Summer programme combining Qur'anic learning, Islamic character, and activity for children.",
    badge: "Seasonal",
  },
} as const;

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO
  time: string;
  location: string;
  tag: string;
  image: string;
};

export const events: EventItem[] = [
  {
    id: "e1",
    title: "Ramadan Family Iftar",
    date: "2026-04-22",
    time: "7:30 PM",
    location: "Masjid Al-Ummah Main Hall",
    tag: "Community",
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "e2",
    title: "Seerah Night with Shaykh Yusuf",
    date: "2026-04-27",
    time: "8:00 PM",
    location: "Main Prayer Hall",
    tag: "Lecture",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "e3",
    title: "Youth Leadership Camp",
    date: "2026-05-10",
    time: "9:00 AM",
    location: "Ummah Community Centre",
    tag: "Youth",
    image:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "e4",
    title: "Quran Memorization Graduation",
    date: "2026-05-18",
    time: "6:00 PM",
    location: "Masjid Al-Ummah",
    tag: "Celebration",
    image:
      "https://images.unsplash.com/photo-1590076215667-875d4ef2f7d7?auto=format&fit=crop&w=1000&q=80",
  },
];

// Verifiable project facts — no invented stats.
export const impactStats = [
  { label: "Years serving Durham", value: 13 },
  { label: "Acres of land, paid off", value: 6 },
  { label: "Prayer capacity planned", value: 850 },
  { label: "Sq ft planned", value: 35_000, compact: true },
] as const;

export const pearls = [
  {
    arabic: "مَنْ بَنَىٰ مَسْجِدًۭا للَّهِ بَنَى ٱللَّهُ لَهُ بَيْتًۭا فِى ٱلْجَنَّةِ",
    text: "Whoever builds a masjid for Allah, Allah will build for him a house in Paradise.",
    source: "Prophet Muhammad ﷺ — Sahih Muslim 533",
  },
  {
    arabic: "خَيْرُكُمْ مَنْ تَعَلَّمَ ٱلْقُرْآنَ وَعَلَّمَهُ",
    text: "The best of you are those who learn the Qur'an and teach it.",
    source: "Prophet Muhammad ﷺ — Sahih al-Bukhari 5027",
  },
  {
    arabic: "إِنَّمَا ٱلْمُؤْمِنُونَ إِخْوَة",
    text: "The believers are but one brotherhood.",
    source: "Al-Qur'an — Al-Hujurat 49:10",
  },
  {
    arabic: "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًۭا",
    text: "Verily, with every hardship comes ease.",
    source: "Al-Qur'an — Al-Inshirah 94:6",
  },
  {
    arabic: "ٱلطُّهُورُ شَطْرُ ٱلْإِيمَانِ",
    text: "Cleanliness is half of faith.",
    source: "Prophet Muhammad ﷺ — Sahih Muslim 223",
  },
  {
    arabic: "ٱلرَّاحِمُونَ يَرْحَمُهُمُ ٱلرَّحْمَنُ",
    text: "Those who show mercy will be shown mercy by the Most Merciful. Be merciful to those on earth and the One in the heavens will have mercy on you.",
    source: "Prophet Muhammad ﷺ — Tirmidhi 1924",
  },
  {
    arabic: "مَنْ لَا يَرْحَمُ لَا يُرْحَمُ",
    text: "He who does not show mercy will not be shown mercy.",
    source: "Prophet Muhammad ﷺ — Sahih al-Bukhari 5997",
  },
  {
    arabic: "اتَّقِ ٱللَّهَ حَيْثُمَا كُنْتَ",
    text: "Fear Allah wherever you are, and follow a bad deed with a good deed, and treat people with good character.",
    source: "Prophet Muhammad ﷺ — Tirmidhi 1987",
  },
];

// Community announcements — visible on homepage
export type Announcement = {
  id: string;
  title: string;
  body: string;
  date: string; // ISO
  priority: "normal" | "urgent";
  tag: string;
};

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Eid al-Adha Prayer — Masjid Al-Ummah",
    body: "Eid prayer will be held at 8:00 AM and 9:30 AM. All musallis are requested to bring their own prayer mats. Parking available on site.",
    date: "2026-06-16",
    priority: "urgent",
    tag: "Eid",
  },
  {
    id: "a2",
    title: "Zakat al-Fitr 2026 — $15 per person",
    body: "The Zakat al-Fitr amount for 2026 has been set at $15 per person. Please pay before Eid prayer. E-Transfer to info@ummahfoundation.ca.",
    date: "2026-06-10",
    priority: "urgent",
    tag: "Zakat",
  },
  {
    id: "a3",
    title: "Jummah Khutbah — New Time",
    body: "Effective immediately, Jummah Khutbah begins at 1:15 PM with Iqamah at 1:30 PM. Please arrive early.",
    date: "2026-04-20",
    priority: "normal",
    tag: "Jummah",
  },
  {
    id: "a4",
    title: "Evening Maktab — 2026 Enrolment Open",
    body: "Registration for the 2026–2027 Evening Maktab session is now open. Contact Moulana Aamir Bhayat to enrol your child.",
    date: "2026-04-15",
    priority: "normal",
    tag: "Education",
  },
];

// Community services — displayed in ServicesSection
export type CommunityService = {
  id: string;
  title: string;
  description: string;
  icon: "heart" | "book-open" | "users" | "star" | "hands-helping" | "moon";
  ctaLabel: string;
  ctaHref: string;
};

export const communityServices: CommunityService[] = [
  {
    id: "s1",
    title: "Marriage & Nikah",
    description:
      "Islamic marriage ceremonies conducted by our qualified Imam. Pre-marriage counselling available for couples.",
    icon: "heart",
    ctaLabel: "Enquire",
    ctaHref: "#contact",
  },
  {
    id: "s2",
    title: "Funeral & Janazah",
    description:
      "Complete funeral rites — ghusl, kafan, salah al-Janazah, and burial coordination — available 24 hours.",
    icon: "moon",
    ctaLabel: "Contact us",
    ctaHref: "#contact",
  },
  {
    id: "s3",
    title: "Islam 101",
    description:
      "Free introductory sessions for new Muslims and anyone curious about Islam. Open to all ages and backgrounds.",
    icon: "book-open",
    ctaLabel: "Learn more",
    ctaHref: "#contact",
  },
  {
    id: "s4",
    title: "New Muslim Support",
    description:
      "Dedicated support for those who have recently taken their Shahada — mentoring, resources, and community connection.",
    icon: "star",
    ctaLabel: "Get support",
    ctaHref: "#contact",
  },
  {
    id: "s5",
    title: "Youth & Sports",
    description:
      "Weekly sports sessions, leadership workshops, and halal social activities for Muslim youth aged 13–25.",
    icon: "users",
    ctaLabel: "Join us",
    ctaHref: "#contact",
  },
  {
    id: "s6",
    title: "Community Support",
    description:
      "Food bank access, referrals for housing and mental health, and a listening ear for families in need.",
    icon: "hands-helping",
    ctaLabel: "Reach out",
    ctaHref: "#contact",
  },
];

// Volunteer roles
export const volunteerRoles = [
  {
    title: "Masjid Operations",
    desc: "Cleaning, setup, and maintenance of the prayer space.",
    image: "https://alrayanislamiccentre.org/storage/galleries/oEn2glkoegkclFXxXtFqhFXqhDGhhN0BfnPl1dvx.jpg",
  },
  {
    title: "Events & Hospitality",
    desc: "Help organise iftars, Eid events, and community dinners.",
    image: "https://alrayanislamiccentre.org/storage/galleries/tLeRzjBVpgFMaNm0kIPkma5U6kuQwvnn8eQSMoSX.jpg",
  },
  {
    title: "Education Support",
    desc: "Assist teachers in Evening Maktab and Hifz classes.",
    image: "https://alrayanislamiccentre.org/storage/galleries/xYDhNuLLxHteQCyBzh64pu4wMAPlRIUvgtURxNQL.jpg",
  },
  {
    title: "Fundraising",
    desc: "Door-to-door campaigns, online drives, and donor outreach.",
    image: "https://alrayanislamiccentre.org/storage/galleries/oryLUfCelz0Ic224TnEaSC42rSUSW1g0LXRUqEaz.jpg",
  },
];

// --- Admin mock data ---
export const adminStats = {
  totalDonations: 124_350_00,
  donationsChangePct: 18,
  activeCampaigns: 3,
  newRegistrations: 42,
  newRegistrationsChange: 6,
  monthlyRecurring: 38_200_00,
};

export const donationChart = [
  { month: "Oct", value: 18000 },
  { month: "Nov", value: 22500 },
  { month: "Dec", value: 31000 },
  { month: "Jan", value: 27400 },
  { month: "Feb", value: 33800 },
  { month: "Mar", value: 41200 },
  { month: "Apr", value: 48900 },
];

export type Donation = {
  id: string;
  donor: string;
  email: string;
  campaign: string;
  amount: number;
  method: "Stripe" | "E-Transfer" | "Cash";
  date: string;
};

export const recentDonations: Donation[] = [
  { id: "d1", donor: "Aisha R.", email: "a***@gmail.com", campaign: "Musalla Project", amount: 100000, method: "Stripe", date: "2026-04-19" },
  { id: "d2", donor: "Anonymous", email: "—", campaign: "Ramadan Iftar", amount: 15000, method: "E-Transfer", date: "2026-04-19" },
  { id: "d3", donor: "Mohammed K.", email: "m***@outlook.com", campaign: "Orphan Support", amount: 7500, method: "Stripe", date: "2026-04-18" },
  { id: "d4", donor: "Fatima S.", email: "f***@yahoo.com", campaign: "Musalla Project", amount: 500000, method: "Stripe", date: "2026-04-18" },
  { id: "d5", donor: "Yusuf A.", email: "y***@gmail.com", campaign: "Ramadan Iftar", amount: 30000, method: "E-Transfer", date: "2026-04-17" },
  { id: "d6", donor: "Khadijah M.", email: "k***@gmail.com", campaign: "Musalla Project", amount: 200000, method: "Stripe", date: "2026-04-17" },
];

// Community gallery — proof of activity, not aesthetics.
// PRODUCTION: replace with CMS-managed media gallery.
export const galleryImages = [
  {
    src: "/masjid-render-front.png",
    alt: "Masjid Al-Ummah — architectural rendering, front view · Oshawa, Ontario",
    caption: "Front elevation — rendering",
  },
  {
    src: "/masjid-render-angle.png",
    alt: "Masjid Al-Ummah — architectural rendering, aerial view · Oshawa, Ontario",
    caption: "Aerial view — rendering",
  },
  {
    src: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
    alt: "Prophet's Mosque — Madinah al-Munawwarah at golden hour",
    caption: "Madinah al-Munawwarah",
  },
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    alt: "Grand mosque architecture — marble courtyard and minarets",
    caption: "Islamic architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80",
    alt: "Mosque at dusk — golden light on the minarets",
    caption: "Evening at the masjid",
  },
  {
    src: "https://images.unsplash.com/photo-1590076215667-875d4ef2f7d7?auto=format&fit=crop&w=800&q=80",
    alt: "Mosque exterior — Islamic architecture",
    caption: "Our vision for Oshawa",
  },
] as const;

// Ticker messages — shown in the AnnouncementTicker marquee bar.
// PRODUCTION: replace this array with a fetch from GET /api/v1/settings (Setting.announcements[])
// Admin can add/remove/reorder via /admin/settings → Announcements panel.
// Keep to 5–7 items. Order: urgent first, then general.
export const tickerMessages: string[] = [
  "Jumu'ah: Khutbah 1:14 PM · Iqamah 1:30 PM — every Friday at Masjid Al-Ummah",
  "Buy a Musalla — 173 sold, 677 remaining. Help us break ground Summer 2026, Insha'Allah!",
  "Zakat al-Fitr 2026: $15 per person — E-Transfer to info@ummahfoundation.ca",
  "Eid al-Adha Salah: 8:00 AM & 9:30 AM — bring your own prayer mat",
  "Evening Maktab 2026–27 enrolment now open — contact Moulana Aamir Bhayat to register",
  "Darul-Uloom UFD: Hifz & Aalim programme admissions open for September 2026",
];

export function nextPrayerIndex(nowMinutes: number): number {
  const core = prayerTimes.filter((p) => p.name !== "Jummah");
  const idx = core.findIndex((p) => p.minutes > nowMinutes);
  return idx === -1 ? 0 : idx;
}
