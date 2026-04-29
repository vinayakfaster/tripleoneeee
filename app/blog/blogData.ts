// /app/blog/blogData.ts

export type BlogPost = {
  slug: string;
  title: string;
  location: string;
  image: string;
  images?: string[]; // for additional images in the post
  category: string;
  tagline: string;
  readTime: string;
  publishedAt: string;
  heroQuote: string;
  intro: string;
  roomNo?: string; // for Supernova rooms
  sections: {
    heading: string;
    body: string;
    image?: string;
    imageCaption?: string;
  }[];
  highlights: string[];
  amenities: { icon: string; label: string }[];
  nearbyAttractions: string[];
  bestTimeToVisit: string;
  priceRange: string;
  author: string;
  authorRole: string;
  isBestSeller?: boolean;
};

export const blogData: BlogPost[] = [

  // ── SUPERNOVA ROOMS ──────────────────────────────────────
  {
    slug: "supernova-2512",
    title: "Room 2512 — Sky Suite",
    location: "Spira Supernova",
    roomNo: "2512",
    image: "/images/4323/IMG-20251125-WA0012.jpg",
    category: "Luxury Suites",
    tagline: "25th Floor. City Panorama. Pure Indulgence.",
    readTime: "4 min read",
    publishedAt: "April 2025",
    heroQuote: "At 25 floors above the city, silence becomes a luxury.",
    intro: "Room 2512 at Spira Supernova sits on the 25th floor with uninterrupted views of the Noida skyline. Designed for those who demand both altitude and elegance, this sky suite redefines what a night stay can feel like.",
    sections: [
      {
        heading: "The Room",
        body: "Floor-to-ceiling glazing frames a living canvas of city lights. A king bed faces east for sunrise views. Bespoke joinery, warm walnut tones, and curated art make every corner intentional.",
        image: "/images/4323/IMG-20251125-WA0012.jpg",
        imageCaption: "Room 2512 — the city at your feet",
      },
      { heading: "Amenities", body: "Jacuzzi, rain shower, smart controls, curated minibar, 65\" OLED, blackout blinds, high-speed fibre." },
      { heading: "The Supernova Experience", body: "24-hour butler, rooftop access, valet parking, in-room dining from our signature kitchen." },
    ],
    highlights: ["25th floor panoramic views", "Private jacuzzi", "King bed facing sunrise", "24-hr butler service", "Smart room controls", "Rooftop access"],
    amenities: [
      { icon: "🌆", label: "City View" }, { icon: "🛁", label: "Jacuzzi" },
      { icon: "📶", label: "Fibre WiFi" }, { icon: "🍸", label: "Minibar" },
      { icon: "🚗", label: "Valet" }, { icon: "🍳", label: "In-Room Dining" },
      { icon: "🎵", label: "Sound System" }, { icon: "🧴", label: "Luxury Toiletries" },
    ],
    nearbyAttractions: ["DLF Mall of India — 3 km", "Sector 18 Market — 2 km", "Botanical Garden — 4 km", "Night Safari — 8 km"],
    bestTimeToVisit: "Year-round — climate controlled, city views best on clear winter nights",
    priceRange: "₹12,000 – ₹22,000 per night",
    author: "Aryan Kapoor",
    authorRole: "Senior Travel Editor",
  },
  {
    slug: "supernova-3312",
    title: "Room 3312 — Premier Suite",
    location: "Spira Supernova",
    roomNo: "3312",
    image: "/images/3815/IMG_1159.webp",
    category: "Luxury Suites",
    tagline: "33rd Floor. Above the Clouds. Beyond Ordinary.",
    readTime: "4 min read",
    publishedAt: "March 2025",
    heroQuote: "Higher floors, quieter nights, sharper stars.",
    intro: "On the 33rd floor of Spira Supernova, Room 3312 offers one of the highest vantage points in the building. The Premier Suite combines raw architectural drama with the softest of comforts.",
    sections: [
      { heading: "The Suite", body: "Open-plan living with a seamless bedroom-to-lounge flow. The terrace-facing window wall turns the city into wallpaper. Hand-stitched leather headboard, Italian marble bathroom.", image: "/images/3815/IMG_1159.webp", imageCaption: "Room 3312 — 33 floors of perspective" },
      { heading: "High-Altitude Comfort", body: "Temperature auto-adjusts for altitude. Pillow menu, noise-cancellation blinds, and a sleep concierge service available on request." },
      { heading: "Dining & Service", body: "Private dining setup on request. Chef curates a 3-course menu based on your preferences, served in-room." },
    ],
    highlights: ["33rd floor views", "Italian marble bathroom", "Sleep concierge", "Private in-room dining", "Leather headboard suite", "Noise-cancellation blinds"],
    amenities: [
      { icon: "🏙️", label: "33F Views" }, { icon: "🛁", label: "Marble Bath" },
      { icon: "🍽️", label: "Private Dining" }, { icon: "😴", label: "Sleep Concierge" },
      { icon: "📶", label: "Fibre WiFi" }, { icon: "🚗", label: "Valet" },
      { icon: "🎵", label: "Sound System" }, { icon: "🧴", label: "Luxury Toiletries" },
    ],
    nearbyAttractions: ["DLF Mall of India — 3 km", "Sector 18 — 2 km", "Golf Course — 5 km", "Okhla Bird Sanctuary — 12 km"],
    bestTimeToVisit: "October to March — clear skies for best night views",
    priceRange: "₹14,000 – ₹26,000 per night",
    author: "Meera Singhania",
    authorRole: "Luxury Travel Correspondent",
  },
  {
    slug: "supernova-3509",
    title: "Room 3509 — Executive Suite",
    location: "Spira Supernova",
    roomNo: "3509",
    image: "/images/3509/IMG_1242.webp",
    category: "Luxury Suites",
    tagline: "Work. Rest. Repeat — at 35 Floors.",
    readTime: "4 min read",
    publishedAt: "April 2025",
    heroQuote: "The best decisions are made from the top.",
    intro: "Room 3509 is Spira Supernova's answer to the modern executive — a suite that works as hard as you do, then switches off completely when you need it to.",
    sections: [
      { heading: "Work Zone", body: "Dedicated standing desk, 500 Mbps fibre, secondary monitor, noise-cancelling headphones on loan, and a printer. Video calls without buffering, guaranteed.", image: "/images/3509/IMG_1242.webp", imageCaption: "The executive workspace — built for focus" },
      { heading: "Rest Zone", body: "Steam shower, soaking tub, blackout blinds, white noise machine. The work desk folds behind a panel when the day ends." },
      { heading: "Evening Ritual", body: "Curated evening minibar — aged whisky, artisan chocolate, cheese board from a local creamery. Delivered at 7 PM without being asked." },
    ],
    highlights: ["500 Mbps fibre internet", "Convertible standing desk", "Steam shower + soaking tub", "Evening minibar service", "Noise-cancelling headphones", "35th floor city views"],
    amenities: [
      { icon: "💻", label: "Work Station" }, { icon: "📡", label: "500 Mbps" },
      { icon: "♨️", label: "Steam Shower" }, { icon: "🧀", label: "Cheese Board" },
      { icon: "🍸", label: "Curated Bar" }, { icon: "🎧", label: "Headphones" },
      { icon: "🛁", label: "Soaking Tub" }, { icon: "🚗", label: "Valet" },
    ],
    nearbyAttractions: ["DLF Mall of India — 3 km", "Sector 18 — 2 km", "Expressway access — 1 km", "Botanical Garden Metro — 4 km"],
    bestTimeToVisit: "Year-round — climate controlled",
    priceRange: "₹11,000 – ₹20,000 per night",
    author: "Sahil Mehrotra",
    authorRole: "Design & Travel Writer",
  },
  {
    slug: "supernova-3815",
    title: "Room 3815 — Penthouse Suite",
    location: "Spira Supernova",
    roomNo: "3815",
    image: "/images/3815/IMG_1159.webp",
    category: "Luxury Suites",
    tagline: "The Highest Standard. Literally.",
    readTime: "5 min read",
    publishedAt: "February 2025",
    heroQuote: "From here, the rest of the city is just a view.",
    intro: "Room 3815 is Spira Supernova's flagship — the penthouse suite on the 38th floor. Two floors below the rooftop, it offers the highest guest room in the building with a private terrace and a 270-degree panorama.",
    sections: [
      { heading: "The Penthouse", body: "Private terrace with outdoor seating and a plunge pool. Double-height living room, spiral staircase to the mezzanine sleeping loft. The entire Noida-Delhi horizon is yours.", image: "/images/3815/IMG_1159.webp", imageCaption: "The private terrace plunge pool — 38 floors up" },
      { heading: "Bespoke Service", body: "Dedicated suite butler, pre-arrival preferences remembered, personal concierge for restaurant bookings, transfers, and experiences in the city." },
      { heading: "The Kitchen", body: "Fully equipped private kitchen if you wish to cook. Or a private chef arranged on request. Breakfast is always complimentary." },
    ],
    highlights: ["38th floor penthouse", "Private terrace plunge pool", "270° panoramic views", "Dedicated suite butler", "Complimentary breakfast", "Private chef on request"],
    amenities: [
      { icon: "🏊", label: "Plunge Pool" }, { icon: "🌅", label: "270° Views" },
      { icon: "👨‍🍳", label: "Private Chef" }, { icon: "🛁", label: "Luxury Bath" },
      { icon: "☕", label: "Butler Service" }, { icon: "🍳", label: "Full Kitchen" },
      { icon: "🚗", label: "Valet" }, { icon: "📶", label: "Fibre WiFi" },
    ],
    nearbyAttractions: ["DLF Mall of India — 3 km", "Sector 18 — 2 km", "Golf Course — 5 km", "Night Safari — 8 km"],
    bestTimeToVisit: "October to March — clear skies, cool terrace evenings",
    priceRange: "₹28,000 – ₹55,000 per night",
    author: "Priya Desai",
    authorRole: "Luxury & Lifestyle Editor",
  },
  {
    slug: "supernova-4308",
    title: "Room 4308 — Signature Suite",
    location: "Spira Supernova",
    roomNo: "4308",
    image: "/images/4308/IMG_1286.webp",
    category: "Luxury Suites",
    tagline: "Signature Style. Signature Views.",
    readTime: "4 min read",
    publishedAt: "January 2025",
    heroQuote: "Some rooms you check into. Others you never want to leave.",
    intro: "Room 4308 earns its signature status through a combination of architectural drama and quiet luxury — a suite that impresses without trying.",
    sections: [
      { heading: "The Design", body: "Conceived around a single material palette — smoked oak, brushed brass, and aged leather. The bathroom is a sanctuary of honed limestone with a freestanding copper tub.", image: "/images/4308/IMG_1286.webp", imageCaption: "The copper freestanding tub — Room 4308" },
      { heading: "The Bed", body: "A custom-made bed with a hand-stitched headboard rising to the ceiling. Natural latex mattress, 800-thread-count linen, seven pillow options." },
      { heading: "Service", body: "Room 4308 guests receive complimentary access to the Supernova spa, rooftop lounge, and a private dining experience on one evening of their stay." },
    ],
    highlights: ["Copper freestanding tub", "Smoked oak interiors", "Complimentary spa access", "Natural latex mattress", "Rooftop lounge access", "Private dining evening"],
    amenities: [
      { icon: "🛁", label: "Copper Tub" }, { icon: "🧖", label: "Spa Access" },
      { icon: "🌆", label: "City Views" }, { icon: "🍽️", label: "Private Dining" },
      { icon: "📶", label: "Fibre WiFi" }, { icon: "🚗", label: "Valet" },
      { icon: "🎵", label: "Sound System" }, { icon: "🧴", label: "Luxury Toiletries" },
    ],
    nearbyAttractions: ["DLF Mall of India — 3 km", "Sector 18 — 2 km", "Botanical Garden — 4 km", "Okhla Sanctuary — 12 km"],
    bestTimeToVisit: "Year-round — best in winter for rooftop evenings",
    priceRange: "₹16,000 – ₹30,000 per night",
    author: "Vikram Anand",
    authorRole: "Architecture & Travel Writer",
  },
  {
    slug: "supernova-4323",
    title: "Room 4323 — Grand Suite",
    location: "Spira Supernova",
    roomNo: "4323",
    image: "/images/4323/IMG-20251125-WA0012.jpg",
    category: "Luxury Suites",
    tagline: "The Grand Statement. The Grand Stay.",
    readTime: "5 min read",
    publishedAt: "March 2025",
    heroQuote: "Grand is not about size. It is about intention.",
    intro: "Room 4323 is the grand suite of Spira Supernova — the largest room in the building, occupying a corner position on the 43rd floor with views in two directions.",
    sections: [
      { heading: "The Scale", body: "At 1,800 sq ft, Room 4323 is twice the size of a standard suite. A separate living room, dining area for six, full kitchen, master bedroom, and a guest room make it ideal for extended stays or entertaining.", image: "/images/4323/IMG-20251125-WA0012.jpg", imageCaption: "The grand living room — corner views" },
      { heading: "Entertaining", body: "The dining table seats six. The kitchen is fully equipped. A private bartender can be arranged for evenings. The suite has hosted quiet celebrations, corporate dinners, and intimate anniversaries." },
      { heading: "Long Stays", body: "For stays of 3 nights or more, the concierge curates a full programme — city experiences, restaurant reservations, and in-suite experiences — tailored entirely to your preferences." },
    ],
    highlights: ["1,800 sq ft corner suite", "43rd floor dual-aspect views", "Dining area for 6", "Full private kitchen", "Guest room included", "Long-stay concierge programme"],
    amenities: [
      { icon: "🏠", label: "1800 sq ft" }, { icon: "🌆", label: "Corner Views" },
      { icon: "🍽️", label: "Dining for 6" }, { icon: "🍳", label: "Full Kitchen" },
      { icon: "🛁", label: "Master Bath" }, { icon: "👨‍🍳", label: "Private Chef" },
      { icon: "🚗", label: "Valet" }, { icon: "📶", label: "Fibre WiFi" },
    ],
    nearbyAttractions: ["DLF Mall of India — 3 km", "Sector 18 — 2 km", "Golf Course — 5 km", "Night Safari — 8 km"],
    bestTimeToVisit: "October to March — corner terrace is magical in winter",
    priceRange: "₹35,000 – ₹70,000 per night",
    author: "Aryan Kapoor",
    authorRole: "Senior Travel Editor",
  },

  // ── CITY PROPERTIES ──────────────────────────────────────
  {
    slug: "dlf-motinagar",
    title: "Exclusive Stay",
    location: "DLF Motinagar",
    image: "/images/DLFMotinagar/IMG-20251117-WA0025.jpg",
    category: "City Stays",
    tagline: "Serene, Private, Unforgettable",
    readTime: "5 min read",
    publishedAt: "February 2025",
    heroQuote: "A private escape is not about distance — it is about feeling entirely unreachable.",
    intro: "In the polished corridors of DLF Motinagar, this exclusive stay carves out an enclave of genuine privacy. One suite. One booking at a time. The entire space is yours.",
    sections: [
      { heading: "One Suite. One Experience.", body: "The property hosts exactly one booking at a time. Every amenity, every staff member, every square foot is dedicated to you alone. Private terrace with plunge pool.", image: "/images/DLFMotinagar/IMG-20251117-WA0025.jpg", imageCaption: "The private terrace plunge pool" },
      { heading: "Bespoke Staff", body: "Three staff — a concierge, cook, and housekeeper. 90-second response guarantee. Cook prepares a bespoke menu based on your preferences filled at check-in." },
      { heading: "Connect or Disconnect", body: "500 Mbps fibre for work mode. Or WiFi withheld on request for a full digital detox. Television hidden behind a panel. Just the view." },
    ],
    highlights: ["Single-suite property", "Private terrace plunge pool", "Bespoke cook", "90-second concierge", "Digital detox mode", "Zero shared spaces"],
    amenities: [
      { icon: "🏊", label: "Plunge Pool" }, { icon: "👨‍🍳", label: "Private Cook" },
      { icon: "🔒", label: "Full Privacy" }, { icon: "🌿", label: "Private Terrace" },
      { icon: "💼", label: "Work Desk" }, { icon: "📵", label: "Detox Mode" },
      { icon: "🧖", label: "In-Suite Spa" }, { icon: "🚗", label: "Chauffeur" },
    ],
    nearbyAttractions: ["DLF Promenade — 1.5 km", "Moti Nagar Metro — 0.5 km", "Kirti Nagar — 2 km", "Birla Mandir — 4 km"],
    bestTimeToVisit: "October to March — cool evenings, ideal for terrace dining",
    priceRange: "₹12,000 – ₹28,000 per night",
    author: "Priya Desai",
    authorRole: "Luxury & Lifestyle Editor",
  },
  {
    slug: "ramesh-nagar",
    title: "Romantic Stay",
    location: "Ramesh Nagar",
    image: "/images/RameshNagar/IMG-20251223-WA0064.jpg",
    category: "Villas",
    tagline: "Privacy, Warmth & Moments That Last",
    readTime: "5 min read",
    publishedAt: "March 2025",
    heroQuote: "The most romantic places are not destinations — they are decisions.",
    intro: "In the quiet lanes of Ramesh Nagar, this romantic retreat exists in deliberate contrast to Delhi's chaos. Built for two. Intimate, warm, and entirely private.",
    sections: [
      { heading: "Intimacy in Every Detail", body: "Rose-gold fixtures, fairy lights, a four-poster bed in blush linen, rose petals on arrival, a fireplace lit on request, and a private courtyard.", image: "/images/RameshNagar/IMG-20251223-WA0064.jpg", imageCaption: "The private courtyard at dusk" },
      { heading: "The Couple's Package", body: "Candlelit courtyard dinner, in-suite Ayurvedic massage for two, champagne on arrival, breakfast hamper at your chosen hour." },
      { heading: "West Delhi's Hidden Side", body: "Old-school kebab restaurants, milk-based sweets since 1962, and a jasmine-scented park on summer evenings." },
    ],
    highlights: ["Private candlelit courtyard dinner", "Couples Ayurvedic massage", "Four-poster bed", "Champagne welcome", "Fireplace suite", "Breakfast hamper"],
    amenities: [
      { icon: "🕯️", label: "Candlelit Dining" }, { icon: "🌹", label: "Rose Petal Setup" },
      { icon: "🍾", label: "Champagne" }, { icon: "🧖", label: "Couples Spa" },
      { icon: "🔥", label: "Fireplace" }, { icon: "🌿", label: "Courtyard" },
      { icon: "🎵", label: "Ambient Music" }, { icon: "🛁", label: "Bubble Bath" },
    ],
    nearbyAttractions: ["Rajouri Garden — 2 km", "Subhash Nagar Metro — 0.8 km", "Tagore Garden — 1.5 km", "Janakpuri — 4 km"],
    bestTimeToVisit: "November to February — cool evenings, perfect for courtyard dining",
    priceRange: "₹7,000 – ₹15,000 per night",
    author: "Meera Singhania",
    authorRole: "Lifestyle Travel Correspondent",
  },
  {
    slug: "subhash-nagar",
    title: "Premium Night Stay",
    location: "Subhash Nagar",
    image: "/images/SubhashNagar/IMG-20251117-WA0027.jpg",
    category: "City Stays",
    tagline: "Modern Luxury. Peaceful Vibe.",
    readTime: "4 min read",
    publishedAt: "April 2025",
    heroQuote: "True comfort is when a space knows what you need before you do.",
    intro: "A study in modern restraint — clean lines, considered materials, and a quietness that feels intentional. For the traveller who has stayed everywhere and now values precision over spectacle.",
    sections: [
      { heading: "The Design", body: "Scandinavian minimalism meets Indian craft. Hand-trowelled lime plaster, handloom khadi furniture, and a single monsoon-cloud photograph above the bed.", image: "/images/SubhashNagar/IMG-20251117-WA0027.jpg", imageCaption: "The main bedroom — limewash walls" },
      { heading: "Sleep Science", body: "Blackout blinds, white noise machine (rain/ocean/silence), auto-temperature control at 19°C midnight, natural latex mattress." },
      { heading: "Morning", body: "Pre-order breakfast the night before — cold brew, fresh juice, South Indian spread, or Continental. Delivered at your chosen time with marigold and morning paper." },
    ],
    highlights: ["Natural latex mattress", "Blackout + white noise system", "Auto-temperature at 19°C", "Pre-ordered breakfast", "Handloom khadi interiors", "Minimalist design"],
    amenities: [
      { icon: "🛏️", label: "Artisan Mattress" }, { icon: "🌙", label: "Sleep System" },
      { icon: "☕", label: "Cold Brew Bar" }, { icon: "📱", label: "Smart Controls" },
      { icon: "🧘", label: "Yoga Mat" }, { icon: "📚", label: "Book Collection" },
      { icon: "🚿", label: "Rain Shower" }, { icon: "🌿", label: "Air Purifier" },
    ],
    nearbyAttractions: ["Subhash Nagar Metro — 0.3 km", "West Gate Mall — 1 km", "Punjabi Bagh — 2 km", "Rajouri Garden — 2.5 km"],
    bestTimeToVisit: "Year-round — sleep environment is climate-controlled",
    priceRange: "₹6,500 – ₹14,000 per night",
    author: "Sahil Mehrotra",
    authorRole: "Design & Travel Writer",
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogData.find((b) => b.slug === slug);
}