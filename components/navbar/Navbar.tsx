"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { SafeUser, SafeListing } from "../../app/types";
import Logo from "./Logo";
import { AnimatePresence, motion } from "framer-motion";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";
import qs from "query-string";
import Calendar from "../inputs/Calendar";
import { signOut } from "next-auth/react";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import useRentModal from "@/hook/useRentModal";
import useContactModal from "@/hook/useContactModal";

// ── OLIVE PALETTE ──
const OL = {
  900: "#1a2210", 800: "#243018", 700: "#2e3d1e",
  600: "#3d5228", 500: "#556b35", 400: "#6b8540",
  gold: "#c4a97a", goldLight: "rgba(196,169,122,0.35)",
  cream: "#f5f2ea", muted: "rgba(245,242,234,0.6)",
};

const announcements = [
  "🌿 Use code TRIPLE20 · 20% off your first booking",
  "⚡ Flash Deal — Book today, save 20% · Limited rooms",
  "🏷️ Coupon STAY20 · Valid this weekend only",
  "🎁 Refer a friend · Both get ₹500 off",
  "✨ New property in Noida — Book now",
];

const stayTypes = [
  { icon: "🌅", label: "Day Stay",       value: "day",       sub: "8 AM – 8 PM" },
  { icon: "🌙", label: "Night Stay",      value: "night",     sub: "Check-in after 10 PM" },
  { icon: "⏰", label: "Hourly Booking",  value: "hourly",    sub: "Min 3 hours" },
  { icon: "💑", label: "Couples",         value: "couple",    sub: "Private & discreet" },
  { icon: "💼", label: "Corporate",       value: "corporate", sub: "GST invoices" },
  { icon: "🎂", label: "Celebration",     value: "occasion",  sub: "Decor on request" },
];

const LOCATIONS = [
  { label: "Noida",         value: "Noida, Uttar Pradesh, India" },
  { label: "Delhi",         value: "delhi" },
  { label: "Ramesh Nagar",  value: "ramesh nagar" },
  { label: "Subhash Nagar", value: "subhash nagar" },
  { label: "DLF Motinagar", value: "dlf motinagar" },
];

interface Props {
  currentUser?: SafeUser | null;
  images?: string[];
  locationValue?: string;
  title?: string;
  variant?: "hero" | "blog";
  listing?: SafeListing & { user: SafeUser }; // ✅ optional — not required on home page
  listingId?: string;
}

export default function Navbar({ currentUser, images, locationValue, title, listing,  listingId,  }: Props) {
  const router        = useRouter();
  const loginModal    = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal     = useRentModal();
  const contactModal  = useContactModal();
  const dropdownRef   = useRef<HTMLDivElement>(null);

  const [index, setIndex]           = useState(0);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [scrolled, setScrolled]     = useState(false);
  const [annIdx, setAnnIdx]         = useState(0);
  const [isMobile, setIsMobile]     = useState(false);

  // Search state
  const [selectedType, setSelectedType] = useState("");
  const [selectedLoc, setSelectedLoc]   = useState<{ label: string; value: string } | null>(null);
  const [dateRange, setDateRange]       = useState<Range>({ startDate: undefined, endDate: undefined, key: "selection" });
  const [openDrop, setOpenDrop]         = useState<"type" | "loc" | "cal" | null>(null);
  const [locSearch, setLocSearch]       = useState("");

  const defaultImages = [
    "/images/nav/f65d07fe-ad59-43c3-b0f7-530637d494c9.jpg",
    "/images/nav/09900089-1312-4ec5-8e13-af2870af5514.jpg",
    "/images/nav/8282f4bb-f803-47c3-85bb-9111a97e1077.jpg",
    "/images/nav/1f5f1fe2-9eb0-489b-ab26-347324eebd0f.jpg",
  ];

  const displayImages = images && images.length > 0 ? images : defaultImages;
  // ✅ listing page = images passed from ListingClient
  const isListingPage = !!(images && images.length > 0);
  const filteredLocs  = LOCATIONS.filter(l => l.label.toLowerCase().includes(locSearch.toLowerCase()));

  useEffect(() => { setIndex(0); }, [images]);

  useEffect(() => {
    const r = () => setIsMobile(window.innerWidth < 768);
    r(); window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p + 1) % displayImages.length), 5000);
    return () => clearInterval(t);
  }, [displayImages.length]);

  useEffect(() => {
    const t = setInterval(() => setAnnIdx(p => (p + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
const listingIds = [
  "6877f83f233e5dc43231089e",
  "6889ed5f545d937d8360bf93",
  "69ef460da5be5a76eeacb871"
];

  const handleSearch = useCallback(() => {
    const query: Record<string, any> = {};
    if (selectedLoc)         query.locationValue = selectedLoc.value;
    if (selectedType)        query.stayType      = selectedType;
    if (dateRange.startDate) query.startDate     = formatISO(dateRange.startDate);
    if (dateRange.endDate)   query.endDate       = formatISO(dateRange.endDate);
    router.push(qs.stringifyUrl({ url: "/", query }, { skipNull: true }));
    setOpenDrop(null);
  }, [selectedLoc, selectedType, dateRange, router]);

  // ✅ Enquire — only works on listing page (listing prop available)
const handleEnquire = () => {
  console.log("ENQUIRE CLICKED", listingId);

  const id =
    listingId ||
    listingIds[Math.floor(Math.random() * listingIds.length)];

  router.push(`/enquiry/${id}?success=true`);
};
  // ✅ Become a host
  const handleBecomeHost = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    if (currentUser.role === "host" || currentUser.role === "admin") return rentModal.onOpen();
    contactModal.onOpen();
  }, [currentUser, loginModal, rentModal, contactModal]);

  const formatDate = (d?: Date) => d
    ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    : null;

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd   = (e: React.TouchEvent) => {
    if (e.changedTouches[0].clientX - touchStart < -50) setMenuOpen(false);
  };

  // ── DROPUP COMPONENT ──
  const DropUp = ({ children, minW = "220px" }: { children: React.ReactNode; minW?: string }) => (
    <div
      ref={dropdownRef}
      onClick={e => e.stopPropagation()}
      style={{
        position: "absolute",
        bottom: "calc(100% + 10px)",
        left: 0,
        minWidth: minW,
        background: OL[800],
        border: `1px solid ${OL.goldLight}`,
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 200,
        boxShadow: "0 -16px 48px rgba(0,0,0,0.55)",
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Lato:wght@300;400;700&display=swap');
        @keyframes marquee-ol { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ol-marquee { animation: marquee-ol 32s linear infinite; display: flex; white-space: nowrap; }

        .sr-field {
          flex: 1; min-width: 0; display: flex; flex-direction: column;
          padding: 10px 12px; cursor: pointer;
          border-right: 1px solid rgba(196,169,122,0.15);
          transition: background 0.2s; position: relative;
        }
        .sr-field:hover { background: rgba(196,169,122,0.07); }
        .sr-label {
          font-family: 'Lato', sans-serif; font-size: 9px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(196,169,122,0.7); margin-bottom: 3px;
        }
        .sr-val {
          font-family: 'Lato', sans-serif; font-size: 13px;
          color: #f5f2ea; font-weight: 400; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis;
        }
        .sr-placeholder { color: rgba(245,242,234,0.3); }

        .st-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 50px; cursor: pointer;
          border: 1px solid rgba(196,169,122,0.28);
          background: rgba(45,58,30,0.55); backdrop-filter: blur(8px);
          transition: all 0.25s; font-family: 'Lato', sans-serif;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(245,242,234,0.7);
        }
        .st-pill.active, .st-pill:hover {
          background: rgba(196,169,122,0.22);
          border-color: rgba(196,169,122,0.65);
          color: #f5f2ea;
        }

        .menu-item {
          font-family: 'Lato', sans-serif; font-size: 12px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #f5f2ea; padding: 14px 0;
          border-bottom: 1px solid rgba(196,169,122,0.1);
          cursor: pointer; transition: color 0.2s; display: block;
        }
        .menu-item:hover { color: #c4a97a; }

        .rdrCalendarWrapper { background: #243018 !important; }
        .rdrDayNumber span { color: #f5f2ea !important; }
        .rdrMonthAndYearPickers select { color: #f5f2ea !important; background: #2e3d1e !important; }
        .rdrDayToday .rdrDayNumber span:after { background: #c4a97a !important; }
        .rdrSelected, .rdrStartEdge, .rdrEndEdge { background: #556b35 !important; }
        .rdrInRange { background: rgba(85,107,53,0.35) !important; }
        .rdrDay:not(.rdrDayPassive) .rdrDayNumber span { color: #f5f2ea !important; }
        .rdrNextPrevButton { background: rgba(196,169,122,0.15) !important; }
        .rdrPprevButton i { border-color: transparent #c4a97a transparent transparent !important; }
        .rdrNextButton i { border-color: transparent transparent transparent #c4a97a !important; }
      `}</style>

      {/* ══ ANNOUNCEMENT BAR ══ */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 3100,
        height: "32px",
        background: `linear-gradient(90deg, ${OL[900]} 0%, ${OL[800]} 50%, ${OL[900]} 100%)`,
        borderBottom: `1px solid ${OL.goldLight}`,
        overflow: "hidden", display: "flex", alignItems: "center",
      }}>
        <div className="ol-marquee">
          {[...announcements, ...announcements].map((a, i) => (
            <span key={i} style={{
              fontFamily: "'Lato', sans-serif", fontSize: "10px",
              letterSpacing: "0.2em", color: OL.cream, paddingRight: "60px",
            }}>
              <span style={{ color: OL.gold, marginRight: "10px" }}>✦</span>{a}
            </span>
          ))}
        </div>
        <div style={{
          position: "absolute", left: "14px", color: OL.gold,
          fontSize: "9px", letterSpacing: "0.3em",
          background: OL[900], paddingRight: "8px",
        }}>TRIPLEONE</div>
      </div>

      {/* ══ NAVBAR ══ */}
      <motion.div
        style={{ position: "fixed", top: "32px", left: 0, right: 0, zIndex: 2500 }}
        animate={{
          backgroundColor: scrolled ? "rgba(26,34,16,0.97)" : "rgba(0,0,0,0)",
          backdropFilter:  scrolled ? "blur(14px)" : "blur(0px)",
          boxShadow:       scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
        }}
        transition={{ duration: 0.28 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px" }}>

          {/* Logo */}
          <div style={{
            filter: scrolled
              ? "brightness(1.1)"
              : "drop-shadow(0 2px 8px rgba(0,0,0,0.9)) brightness(0) invert(1)",
            transition: "filter 0.3s",
          }}>
            <Logo />
          </div>

          {/* Phone desktop */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "6px", color: scrolled ? OL.gold : "rgba(245,242,234,0.85)", fontSize: "13px" }}>
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/>
            </svg>
            +91 9876543210
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

            {/* Phone mobile */}
            <a href="tel:+919876543210" className="md:hidden" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(196,169,122,0.15)", color: OL.gold,
            }}>
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/>
              </svg>
            </a>

            {/* ENQUIRE button */}
            <motion.button whileTap={{ scale: 0.95 }}  onClick={() => handleEnquire()}
              style={{
                background: `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`,
                color: OL.cream, border: `1px solid ${OL.goldLight}`,
                fontSize: "11px", fontWeight: 700, fontFamily: "'Lato', sans-serif",
                letterSpacing: "0.15em", padding: "8px 16px",
                cursor: "pointer", borderRadius: "4px",
              }}>
              ENQUIRE
            </motion.button>

            {/* Avatar if logged in */}
            {currentUser && (
              <div onClick={() => setMenuOpen(true)} style={{ cursor: "pointer" }}>
                <Image
                  src={currentUser.image || "/assets/avatar.png"}
                  alt="avatar" width={32} height={32}
                  style={{ borderRadius: "50%", objectFit: "cover", border: `2px solid ${OL.gold}` }}
                />
              </div>
            )}

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(true)}
              style={{ display: "flex", flexDirection: "column", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: "block", width: "22px", height: "2px", borderRadius: "2px",
                  background: scrolled ? OL.gold : "rgba(245,242,234,0.9)",
                  transition: "background 0.3s",
                }} />
              ))}
            </button>
          </div>
        </div>
      </motion.div>

      {/* ══ HERO ══ */}
      <div style={{
        position: "relative", width: "100vw", overflow: "hidden",
        height: "100vh",
        marginLeft: "calc(-50vw + 50%)", marginRight: "calc(-50vw + 50%)",
        marginTop: "32px",
      }}>
        <AnimatePresence mode="wait">
          <motion.div key={displayImages[index]}
            style={{ position: "absolute", inset: 0, zIndex: 0 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}>
            <Image
  src={displayImages[index]}
  alt="hero"
  fill
  priority
  quality={100}
  sizes="100vw"
  style={{ objectFit: "cover" }}
/>
          </motion.div>
        </AnimatePresence>

        <div style={{
            position: "absolute",
  left: 0,
  right: 0,
  bottom: isMobile ? "40px" : "80px",
  zIndex: 20,
  background: "transparent",
        }} />

        {/* ══ SEARCH + PILLS — only on HOME PAGE ══ */}
        {!isListingPage && (
          <div style={{
            position: "absolute", left: 0, right: 0,
            bottom: isMobile ? "clamp(32px, 6vh, 60px)" : "80px",
            zIndex: 20,
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "18px", padding: "0 16px",
          }}>

            {/* USP BAR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{
                display: "flex", alignItems: "center",
                background: "rgba(26,34,16,0.6)", backdropFilter: "blur(10px)",
                border: `1px solid rgba(196,169,122,0.18)`, borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {[
                { icon: "✦", text: "Verified Properties" },
                { icon: "🔒", text: "Private & Secure" },
                { icon: "📞", text: "24/7 Support" },
                { icon: "🧾", text: "GST Invoices" },
              ].map((u, i, arr) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "7px 12px",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(196,169,122,0.12)" : "none",
                }}>
                  <span style={{ color: OL.gold, fontSize: "10px" }}>{u.icon}</span>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "0.1em", color: "rgba(245,242,234,0.6)", whiteSpace: "nowrap" }}>
                    {u.text}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* STAY TYPE PILLS */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", justifyContent: "center" }}>
              {stayTypes.map((st, i) => (
                <motion.button key={st.value}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                  onClick={() => setSelectedType(selectedType === st.value ? "" : st.value)}
                  className={`st-pill ${selectedType === st.value ? "active" : ""}`}
                >
                  <span style={{ fontSize: "12px" }}>{st.icon}</span>
                  {st.label}
                </motion.button>
              ))}
            </div>

            {/* 20% OFF PILL */}
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              onClick={() => router.push("/offers")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "rgba(45,58,30,0.7)", backdropFilter: "blur(12px)",
                border: `1px solid ${OL.goldLight}`, borderRadius: "50px",
                padding: "7px 18px", cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "14px" }}>🏷️</span>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", color: OL.cream }}>
                20% Off · Code <span style={{ color: OL.gold, fontWeight: 700 }}>TRIPLE20</span>
              </span>
              <span style={{ background: OL[500], color: OL.cream, fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", padding: "2px 10px", borderRadius: "50px" }}>
                CLAIM
              </span>
            </motion.div>

            {/* SEARCH ROW */}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: "780px",
                background: "rgba(26,34,16,0.75)", backdropFilter: "blur(20px)",
                border: `1px solid ${OL.goldLight}`, borderRadius: "12px",
                overflow: "visible", position: "relative",
                display: "flex", alignItems: "stretch",
              }}
            >
              {/* Stay Type */}
              <div className="sr-field"
                style={{ minWidth: isMobile ? "110px" : "150px", position: "relative" }}
                onClick={() => setOpenDrop(openDrop === "type" ? null : "type")}>
                <div className="sr-label">Stay Type</div>
                <div className={`sr-val ${!selectedType ? "sr-placeholder" : ""}`}>
                  {selectedType ? stayTypes.find(s => s.value === selectedType)?.label : "Select type"}
                </div>
                {openDrop === "type" && (
                  <DropUp>
                    {stayTypes.map(st => (
                      <div key={st.value}
                        onClick={() => { setSelectedType(st.value); setOpenDrop(null); }}
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "11px 16px", cursor: "pointer",
                          borderBottom: "1px solid rgba(196,169,122,0.08)",
                          background: selectedType === st.value ? "rgba(196,169,122,0.1)" : "transparent",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,169,122,0.1)")}
                        onMouseLeave={e => (e.currentTarget.style.background = selectedType === st.value ? "rgba(196,169,122,0.1)" : "transparent")}
                      >
                        <span style={{ fontSize: "16px" }}>{st.icon}</span>
                        <div>
                          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: OL.cream, fontWeight: 600 }}>{st.label}</p>
                          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", color: OL.gold, marginTop: "1px" }}>{st.sub}</p>
                        </div>
                        {selectedType === st.value && <span style={{ marginLeft: "auto", color: OL.gold }}>✓</span>}
                      </div>
                    ))}
                  </DropUp>
                )}
              </div>

              {/* Location */}
              <div className="sr-field" style={{ position: "relative" }}
                onClick={() => setOpenDrop(openDrop === "loc" ? null : "loc")}>
                <div className="sr-label">Location</div>
                <div className={`sr-val ${!selectedLoc ? "sr-placeholder" : ""}`}>
                  {selectedLoc?.label || "Where?"}
                </div>
                {openDrop === "loc" && (
                  <DropUp minW="200px">
                    <div style={{ padding: "10px 12px", borderBottom: `1px solid ${OL.goldLight}` }}
                      onClick={e => e.stopPropagation()}>
                      <input autoFocus value={locSearch} onChange={e => setLocSearch(e.target.value)}
                        placeholder="Search city..."
                        style={{
                          width: "100%", background: "rgba(61,82,40,0.5)",
                          border: `1px solid ${OL.goldLight}`, borderRadius: "8px",
                          padding: "8px 12px", color: OL.cream,
                          fontFamily: "'Lato', sans-serif", fontSize: "12px", outline: "none",
                        }}
                      />
                    </div>
                    {filteredLocs.map(loc => (
                      <div key={loc.value}
                        onClick={() => { setSelectedLoc(loc); setOpenDrop(null); setLocSearch(""); }}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "11px 16px", cursor: "pointer",
                          borderBottom: "1px solid rgba(196,169,122,0.08)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,169,122,0.1)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ color: OL.gold, fontSize: "12px" }}>📍</span>
                        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: OL.cream }}>{loc.label}</span>
                        {selectedLoc?.value === loc.value && <span style={{ marginLeft: "auto", color: OL.gold }}>✓</span>}
                      </div>
                    ))}
                  </DropUp>
                )}
              </div>

              {/* Check In */}
              <div className="sr-field" style={{ position: "relative" }}
                onClick={() => setOpenDrop(openDrop === "cal" ? null : "cal")}>
                <div className="sr-label">Check In</div>
                <div className={`sr-val ${!dateRange.startDate ? "sr-placeholder" : ""}`}>
                  {formatDate(dateRange.startDate) || "Add date"}
                </div>
              </div>

              {/* Check Out — desktop */}
              <div className="sr-field hidden md:flex" style={{ flexDirection: "column" }}
                onClick={() => setOpenDrop(openDrop === "cal" ? null : "cal")}>
                <div className="sr-label">Check Out</div>
                <div className={`sr-val ${!dateRange.endDate ? "sr-placeholder" : ""}`}>
                  {formatDate(dateRange.endDate) || "Add date"}
                </div>
              </div>

              {/* Calendar dropup */}
              {openDrop === "cal" && (
                <div ref={dropdownRef} onClick={e => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 10px)",
                    left: isMobile ? "-16px" : "30%",
                    zIndex: 200,
                    background: OL[800],
                    border: `1px solid ${OL.goldLight}`,
                    borderRadius: "12px", overflow: "hidden",
                    boxShadow: "0 -16px 48px rgba(0,0,0,0.55)",
                  }}>
                  <Calendar
                    value={dateRange}
                    onChange={({ selection }: any) => {
                      setDateRange(selection);
                      if (selection.startDate && selection.endDate &&
                          selection.startDate.getTime() !== selection.endDate.getTime()) {
                        setTimeout(() => setOpenDrop(null), 300);
                      }
                    }}
                  />
                </div>
              )}

              {/* Search Button */}
              <button onClick={handleSearch}
                style={{
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`,
                  border: "none", cursor: "pointer",
                  padding: isMobile ? "0 14px" : "0 24px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: "6px", borderRadius: "0 10px 10px 0",
                  transition: "all 0.2s", minHeight: "52px",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = `linear-gradient(135deg, ${OL[400]}, ${OL[500]})`)}
                onMouseLeave={e => (e.currentTarget.style.background = `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`)}
              >
                <svg width="15" height="15" fill="none" stroke={OL.cream} strokeWidth={2.5} viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <span className="hidden md:block" style={{
                  fontFamily: "'Lato', sans-serif", fontSize: "10px",
                  fontWeight: 700, letterSpacing: "0.18em", color: OL.cream,
                }}>SEARCH</span>
              </button>
            </div>
          </div>
        )}

        {/* Listing title + location — only on listing page */}
        {isListingPage && (
          <div style={{ position: "absolute", bottom: "9rem", left: 0, right: 0, zIndex: 20, textAlign: "center", padding: "0 16px" }}>
            {title && (
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 5vw, 52px)",
                fontWeight: 400, color: "#fff", letterSpacing: "0.05em", marginBottom: "12px",
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}>{title}</h1>
            )}
            {locationValue && (
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(26,34,16,0.6)", backdropFilter: "blur(8px)",
                border: `1px solid ${OL.goldLight}`, color: OL.cream,
                padding: "6px 18px", borderRadius: "50px",
                fontSize: "13px", fontFamily: "'Lato', sans-serif",
              }}>
                <svg width="12" height="12" fill={OL.gold} viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {locationValue}, India
              </div>
            )}
          </div>
        )}

        {/* Slide dots */}
        {displayImages.length > 1 && (
          <div style={{
            position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
            zIndex: 20, display: "flex", flexDirection: "column", gap: "6px",
          }}>
            {displayImages.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} style={{
                width: i === index ? "6px" : "5px",
                height: i === index ? "22px" : "5px",
                borderRadius: "3px",
                background: i === index ? OL.gold : "rgba(255,255,255,0.22)",
                border: "none", padding: 0, cursor: "pointer", transition: "all 0.3s",
              }} />
            ))}
          </div>
        )}
      </div>

      {/* ══ SLIDE-IN MENU ══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={{ position: "fixed", inset: 0, zIndex: 3200, background: "rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              style={{
                background: OL[800], width: "280px", height: "100%",
                padding: "24px", display: "flex", flexDirection: "column",
                borderRight: `1px solid ${OL.goldLight}`,
                boxShadow: "4px 0 40px rgba(0,0,0,0.5)",
                overflowY: "auto",
              }}
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.26 }}
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button onClick={() => setMenuOpen(false)}
                style={{ alignSelf: "flex-end", background: "none", border: "none", color: OL.gold, fontSize: "20px", cursor: "pointer" }}>
                ✕
              </button>

              <div style={{ height: "1px", background: `linear-gradient(to right, ${OL.gold}, transparent)`, margin: "10px 0 18px" }} />
              <Logo />
              <div style={{ height: "1px", background: `linear-gradient(to right, ${OL.gold}, transparent)`, margin: "18px 0" }} />

              {/* Nav links */}
              {["Hotels", "Experiences", "Offers", "About"].map(item => (
                <span key={item} className="menu-item" onClick={() => setMenuOpen(false)}>{item}</span>
              ))}

              {/* ✅ Become a Host — always visible */}
              <span className="menu-item" onClick={() => { handleBecomeHost(); setMenuOpen(false); }}
                style={{ color: OL.gold }}>
                🏡 Become a Host
              </span>

              {/* Account section */}
              <div style={{ height: "1px", background: "rgba(196,169,122,0.2)", margin: "16px 0" }} />
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: OL.gold, textTransform: "uppercase", marginBottom: "10px" }}>
                Account
              </p>

              {!currentUser ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button onClick={() => { loginModal.onOpen(); setMenuOpen(false); }}
                    style={{
                      width: "100%", padding: "12px",
                      background: `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`,
                      border: `1px solid ${OL.goldLight}`, color: OL.cream,
                      fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      cursor: "pointer", borderRadius: "4px",
                    }}>
                    Login
                  </button>
                  <button onClick={() => { registerModal.onOpen(); setMenuOpen(false); }}
                    style={{
                      width: "100%", padding: "12px", background: "transparent",
                      border: `1px solid ${OL.goldLight}`, color: OL.gold,
                      fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.15em", textTransform: "uppercase",
                      cursor: "pointer", borderRadius: "4px",
                    }}>
                    Sign Up
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* User info */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <Image
                      src={currentUser.image || "/assets/avatar.png"}
                      alt="avatar" width={36} height={36}
                      style={{ borderRadius: "50%", border: `2px solid ${OL.gold}` }}
                    />
                    <div>
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: OL.cream, fontWeight: 600 }}>
                        {currentUser.name}
                      </p>
                      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", color: OL.gold }}>
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  {/* Menu items */}
                  {[
                    { icon: "🧳", label: "My Trips",      path: "/trips" },
                    { icon: "📆", label: "Reservations",  path: "/reservations" },
                    { icon: "❤️", label: "Favourites",    path: "/favorites" },
                    { icon: "🏡", label: "My Properties", path: "/properties" },
                    ...(currentUser.role === "admin" ? [{ icon: "🛠", label: "Admin Panel", path: "/admin" }] : []),
                  ].map(({ icon, label, path }) => (
                    <div key={label}
                      onClick={() => { router.push(path); setMenuOpen(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "12px 0", cursor: "pointer",
                        borderBottom: "1px solid rgba(196,169,122,0.08)",
                        fontFamily: "'Lato', sans-serif", fontSize: "12px",
                        color: OL.cream, letterSpacing: "0.05em",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = OL.gold)}
                      onMouseLeave={e => (e.currentTarget.style.color = OL.cream)}
                    >
                      <span style={{ fontSize: "14px" }}>{icon}</span> {label}
                    </div>
                  ))}

                  <button onClick={() => { signOut(); setMenuOpen(false); }}
                    style={{
                      marginTop: "12px", width: "100%", padding: "10px",
                      background: "transparent", border: "1px solid rgba(192,57,43,0.4)",
                      color: "#e74c3c", fontFamily: "'Lato', sans-serif",
                      fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
                      cursor: "pointer", borderRadius: "4px",
                    }}>
                    🚪 Logout
                  </button>
                </div>
              )}

              {/* Phone bottom */}
              <div style={{ marginTop: "auto", paddingTop: "20px", borderTop: `1px solid ${OL.goldLight}` }}>
                <a href="tel:+919876543210"
                  style={{ display: "flex", alignItems: "center", gap: "8px", color: OL.gold, fontSize: "12px", fontFamily: "'Lato', sans-serif", textDecoration: "none" }}>
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.01l-2.2 2.2z"/>
                  </svg>
                  +91 9876543210
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}