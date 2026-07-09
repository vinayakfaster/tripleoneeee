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
    bullets?: string[];
    numbered?: string[];
    quote?: string;
    tip?: string;
    didYouKnow?: string;
    infoBox?: {
      title: string;
      content: string;
    };
    warning?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  highlights: string[];
  amenities: { icon: string; label: string }[];
  nearbyAttractions: string[];
  bestTimeToVisit: string;
  priceRange: string;
  author: string;
  authorRole: string;
  isBestSeller?: boolean;
  faq?: {
    question: string;
    answer: string;
  }[];
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
  {
    slug: "supernova-noida-complete-guide",
    title: "Supernova Noida: The Complete Guide to Staying in Sector 94's Tallest Tower",
    location: "Spira Supernova, Sector 94",
    image: "https://res.cloudinary.com/dks9pirsf/image/upload/v1783588270/IMG_9473_2_xzqkmq.jpg",
    category: "Travel Guide",
    tagline: "Sector 94's Tallest Tower BnB",
    readTime: "6 min read",
    publishedAt: "July 2025",
    heroQuote: "A view that's genuinely hard to book anywhere else in the city at this price point.",
    intro: "If you're searching for a place to stay in Supernova Noida, you've probably already noticed it's hard to miss — literally. Rising over Sector 94 on the Noida-Greater Noida Expressway, Supernova is home to Supernova Spira, the tallest building in Noida, and it's quickly become one of the most talked-about places to book a short stay in the city. This guide covers everything a first-time guest wants to know: what Supernova actually is, why upper-floor units here make such a memorable BnB stay, and how to get there — whether you're visiting for a weekend, a work trip, or just want a skyline you won't find anywhere else in Delhi-NCR.",
    sections: [
      {
        heading: "What Is Supernova, Exactly?",
        body: "Supernova is a large mixed-use development in Sector 94, Noida — spread across residential towers, serviced suites, office space, and a mall, all in one complex. The development sits directly opposite the Okhla Bird Sanctuary, one of the few stretches of protected wetland left in the NCR region, and it's connected straight to the Supernova metro station, so you can step out of a train and be home (or checked in) in minutes. The tallest tower in the complex, Spira, is where most of the premium BnB-style stays are located. Upper floors here — units on the 30th floor and above — look out over the Yamuna floodplain on one side and the Delhi-NCR skyline on the other. It's a view that's genuinely hard to book anywhere else in the city at this price point.",
        didYouKnow: "Supernova Spira is the tallest building in Noida, connected directly to its own metro station.",
      },
      {
        heading: "Why Guests Choose a Supernova Stay Over a Hotel",
        body: "The view is the experience — a high-floor apartment gives you uninterrupted sightlines over a protected wetland on one side, something no hotel room in central Noida or Delhi can offer.",
        bullets: [
          "Full living areas, kitchens, and building amenities like pools and gyms",
          "Direct metro access and expressway connectivity to South Delhi via the DND Flyway",
          "Calmer surroundings than most parts of central Noida, despite the scale of the development",
        ],
      },
      {
        heading: "Getting There",
        body: "Supernova sits right on the Noida-Greater Noida Expressway in Sector 94, with its own metro connectivity, which makes arrival simple regardless of how you're traveling.",
        numbered: [
          "By metro — the complex connects directly to Supernova metro station, no taxi or auto needed for the last mile",
          "By road — direct expressway access from South Delhi via the DND Flyway, or from Greater Noida along the expressway",
          "From the airport — Indira Gandhi International Airport is a manageable drive via the Delhi-Noida road network",
        ],
      },
      {
        heading: "What's Right Next Door",
        body: "One of the most underrated parts of staying at Supernova is what's across the street. The Okhla Bird Sanctuary is home to over 300 recorded bird species and is a designated Important Bird Area — a rare patch of wetland habitat in an otherwise dense urban stretch of the NCR.",
        tip: "If you're an early riser, check the sanctuary's official visitor information for current entry fees and timings before heading over, since these are occasionally updated.",
        infoBox: {
          title: "Beyond the Sanctuary",
          content: "Sector 94's mall and commercial spaces mean you don't have to go far for food, shopping, or basic errands — everything is within walking distance or a short ride.",
        },
      },
      {
        heading: "Who Is a Supernova BnB Stay Best For?",
        body: "Couples or small groups wanting a memorable, view-led stay rather than a generic hotel room. Business travelers who need space to work and a fast commute to South Delhi. Weekend visitors from Delhi looking for an easy, short getaway that still feels like a destination. Birdwatchers and nature lovers who want to be steps from the Okhla Bird Sanctuary.",
        table: {
          headers: ["Traveller Type", "What They Come For"],
          rows: [
            ["Couples & small groups", "A view-led stay, not a generic hotel room"],
            ["Business travellers", "Workspace and a fast commute to South Delhi"],
            ["Weekend visitors", "An easy getaway that still feels like a destination"],
            ["Birdwatchers", "Proximity to the Okhla Bird Sanctuary"],
          ],
        },
      },
      {
        heading: "Frequently Asked Questions",
        body: "Is Supernova in Noida good for a short stay? Yes — its combination of direct metro access, expressway connectivity, and unit-level amenities (pools, gyms, full kitchens) makes it well-suited for stays ranging from a single weekend to a longer work trip. How far is Supernova from Delhi? Supernova is connected to South Delhi via the DND Flyway, making it a quick and direct route for most Delhi-based travellers. Can I see the Okhla Bird Sanctuary from a Supernova apartment? Many upper-floor units face the sanctuary directly, offering sweeping views over the wetland and the Yamuna floodplain — this is one of the most requested views among our guests.",
      },
    ],
    highlights: [
      "Supernova Spira — tallest building in Noida",
      "30th floor and above skyline views",
      "Directly opposite Okhla Bird Sanctuary",
      "300+ bird species across the road",
      "Direct Supernova metro connectivity",
      "South Delhi via DND Flyway — minutes away",
      "Full living areas, kitchens & building amenities",
      "Quieter surroundings vs central Noida",
    ],
    amenities: [
      { icon: "🚇", label: "Metro Access" },
      { icon: "🌆", label: "Skyline Views" },
      { icon: "🐦", label: "Bird Sanctuary" },
      { icon: "🏊", label: "Pool" },
      { icon: "🏋️", label: "Gym" },
      { icon: "🍳", label: "Full Kitchen" },
      { icon: "🛣️", label: "Expressway" },
      { icon: "📶", label: "Fibre WiFi" },
    ],
    nearbyAttractions: [
      "Okhla Bird Sanctuary — 0.1 km",
      "Supernova Metro Station — 0 km",
      "Sector 94 Mall — walking distance",
      "South Delhi via DND Flyway — 15 min",
      "Greater Noida Expressway — 0 km",
      "IGI Airport — manageable drive",
    ],
    bestTimeToVisit: "October to March — clear skies, cool evenings, best birdwatching season at Okhla",
    priceRange: "₹6,500 – ₹55,000 per night",
    author: "Aryan Kapoor",
    authorRole: "Senior Travel Editor",
    faq: [
      {
        question: "Is Supernova in Noida good for a short stay?",
        answer: "Yes — its combination of direct metro access, expressway connectivity, and unit-level amenities (pools, gyms, full kitchens) makes it well-suited for stays ranging from a single weekend to a longer work trip.",
      },
      {
        question: "How far is Supernova from Delhi?",
        answer: "Supernova is connected to South Delhi via the DND Flyway, making it a quick and direct route for most Delhi-based travellers.",
      },
      {
        question: "Can I see the Okhla Bird Sanctuary from a Supernova apartment?",
        answer: "Many upper-floor units face the sanctuary directly, offering sweeping views over the wetland and the Yamuna floodplain — this is one of the most requested views among our guests.",
      },
    ],
  },

];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogData.find((b) => b.slug === slug);
}
