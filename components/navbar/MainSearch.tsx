"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import qs from "query-string";
import { formatISO } from "date-fns";
import { Range } from "react-date-range";

import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

type MainSearchProps = {
  isCompact?: boolean;
};

const LOCATIONS = [
  { label: "Noida", value: "Noida, Uttar Pradesh, India" },
  { label: "Delhi", value: "delhi" },
  { label: "Manali", value: "manali" },
  { label: "Kashmir", value: "kashmir" },
  { label: "Dubai", value: "dubai" },
];

const MainSearch = ({ isCompact = false }: MainSearchProps) => {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<"location" | "date" | "guests" | null>(null);
  const [dropdownPos, setDropdownPos] = useState<"down" | "up">("down");

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState<{ label: string; value: string } | null>(null);
  const [dateRange, setDateRange] = useState<Range>({ startDate: undefined, endDate: undefined, key: "selection" });
  const [guestCount, setGuestCount] = useState(1);

  // ── Calculate whether dropdown should open UP or DOWN ──
  const calcDropdownDir = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    // If less than 380px below, open upward
    setDropdownPos(spaceBelow < 380 && spaceAbove > spaceBelow ? "up" : "down");
  }, []);

  const openSection = useCallback((section: "location" | "date" | "guests") => {
    calcDropdownDir();
    setIsOpen(true);
    setActiveSection(section);
  }, [calcDropdownDir]);

const onSearch = useCallback(() => {
  const query = {
    locationValue: location?.value,
    guestCount,
    startDate: dateRange.startDate
      ? formatISO(dateRange.startDate)
      : undefined,
    endDate: dateRange.endDate
      ? formatISO(dateRange.endDate)
      : undefined,
    scrollTo: "results",
  };

  const url = qs.stringifyUrl({ url: "/", query }, { skipNull: true });

  router.replace(url);   // ✅ IMPORTANT (not push)
  router.refresh();      // ✅ FORCE re-render + effect

  setIsOpen(false);
  setActiveSection(null);
}, [location, guestCount, dateRange, router]);

  const handleDateSelect = (range: any) => {
    const { startDate, endDate } = range.selection;
    setDateRange(range.selection);
    if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
      setTimeout(() => setActiveSection("guests"), 200);
    }
  };

  const handleGuestChange = (val: number) => {
    setGuestCount(val);
    setTimeout(() => onSearch(), 300);
  };

  const filteredLocations = LOCATIONS.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSection(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile search event
  useEffect(() => {
    const openHandler = () => openSection("location");
    window.addEventListener("openMobileSearch", openHandler);
    return () => window.removeEventListener("openMobileSearch", openHandler);
  }, [openSection]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-6xl mx-auto z-[1000]">

      {/* ── SEARCH BAR ── */}
      <div
        className="bg-black/40 backdrop-blur-2xl text-white flex items-center w-full px-2 md:px-10 py-0 rounded-2xl shadow-2xl border border-white/10 hover:bg-black/50 transition-all duration-300 cursor-pointer"
        onClick={() => openSection("location")}
      >
        {/* HOTEL / LOCATION */}
        <div
          className="flex-1 px-4 md:px-6 py-3 border-r border-white/20 cursor-pointer hover:bg-white/10 rounded-l-2xl transition-colors"
          onClick={(e) => { e.stopPropagation(); openSection("location"); }}
        >
          <div className="text-[10px] tracking-widest text-white/50 uppercase">Hotel</div>
          <div className="text-base md:text-lg font-medium mt-0.5 truncate">
            {location?.label || "Where ?"}
          </div>
        </div>

        {/* CHECK IN */}
        <div
          className="flex-1 px-4 md:px-6 py-3 border-r border-white/20 cursor-pointer hover:bg-white/10 transition-colors"
          onClick={(e) => { e.stopPropagation(); openSection("date"); }}
        >
          <div className="text-[10px] tracking-widest text-white/70 uppercase">Check In</div>
          <div className="text-base md:text-lg font-medium mt-0.5">
            {dateRange.startDate ? dateRange.startDate.toDateString().slice(4, 10) : "Add date"}
          </div>
        </div>

        {/* CHECK OUT */}
        <div
          className="flex-1 px-4 md:px-6 py-3 border-r border-white/20 cursor-pointer hover:bg-white/10 transition-colors"
          onClick={(e) => { e.stopPropagation(); openSection("date"); }}
        >
          <div className="text-[10px] tracking-widest text-white/70 uppercase">Check Out</div>
          <div className="text-base md:text-lg font-medium mt-0.5">
            {dateRange.endDate ? dateRange.endDate.toDateString().slice(4, 10) : "Add date"}
          </div>
        </div>

        {/* GUESTS */}
        <div
          className="flex-1 px-4 md:px-6 py-3 border-r border-white/20 cursor-pointer hover:bg-white/10 transition-colors"
          onClick={(e) => { e.stopPropagation(); openSection("guests"); }}
        >
          <div className="text-[10px] tracking-widest text-white/70 uppercase">Guests</div>
          <div className="text-base md:text-lg font-medium mt-0.5">
            {guestCount} Guest{guestCount > 1 ? "s" : ""}
          </div>
        </div>

        {/* BOOK BUTTON */}
        <div className="pl-3 md:pl-4 flex-shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onSearch(); }}
            className="bg-[#d4af77] hover:bg-[#c9a46b] text-black font-semibold px-6 md:px-10 py-3 md:py-4 rounded-2xl transition-all duration-300 text-sm md:text-lg tracking-wider whitespace-nowrap"
          >
            BOOK
          </button>
        </div>
      </div>

      {/* ── DROPDOWN — themed dark gold, opens up OR down based on space ── */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${dropdownPos === "up" ? "bottom-full mb-3" : "top-full mt-3"} left-0 w-full z-[2000] overflow-hidden`}
          style={{
            background: "linear-gradient(135deg, #0f0d0a 0%, #1c1810 60%, #221e15 100%)",
            border: "1px solid rgba(196,169,122,0.25)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,169,122,0.1)",
            borderRadius: "16px",
          }}
        >
          {/* Gold top accent line */}
          <div style={{ height: "2px", background: "linear-gradient(to right, transparent, #c4a97a, transparent)" }} />

          {/* Header row with tabs */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <div className="flex gap-1">
              {(["location", "date", "guests"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className="px-4 py-1.5 text-[10px] uppercase tracking-widest font-medium transition-all rounded-full"
                  style={{
                    color: activeSection === tab ? "#1a1610" : "rgba(196,169,122,0.6)",
                    background: activeSection === tab ? "#c4a97a" : "transparent",
                    border: activeSection === tab ? "none" : "1px solid rgba(196,169,122,0.2)",
                  }}
                >
                  {tab === "location" ? "Destination" : tab === "date" ? "Dates" : "Guests"}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setIsOpen(false); setActiveSection(null); }}
              className="text-lg transition"
              style={{ color: "rgba(196,169,122,0.5)", lineHeight: 1 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c4a97a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(196,169,122,0.5)")}
            >
              ✕
            </button>
          </div>

          <div style={{ borderTop: "1px solid rgba(196,169,122,0.12)", margin: "0 20px" }} />

          <div className="p-4">

            {/* ── LOCATION ── */}
            {activeSection === "location" && (
              <div>
                {/* Search input */}
                <div className="relative mb-3">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c4a97a] text-sm">🔍</span>
                  <input
                    autoFocus
                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl"
                    placeholder="Search destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      background: "rgba(196,169,122,0.08)",
                      border: "1px solid rgba(196,169,122,0.2)",
                      color: "#f0e6d0",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(196,169,122,0.5)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(196,169,122,0.2)")}
                  />
                </div>

                {/* Location list */}
                <div className="space-y-0.5 max-h-[240px] overflow-y-auto">
                  {filteredLocations.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setLocation(item);
                        setTimeout(() => setActiveSection("date"), 150);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all group"
                      style={{ color: "rgba(240,230,208,0.85)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(196,169,122,0.12)";
                        e.currentTarget.style.color = "#c4a97a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(240,230,208,0.85)";
                      }}
                    >
                      <span style={{ color: "#c4a97a", fontSize: "14px" }}>📍</span>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-[10px]" style={{ color: "rgba(196,169,122,0.5)" }}>India</p>
                      </div>
                      {location?.value === item.value && (
                        <span className="ml-auto text-xs" style={{ color: "#c4a97a" }}>✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── DATES ── */}
            {activeSection === "date" && (
              <div className="overflow-hidden rounded-xl" style={{ background: "rgba(196,169,122,0.05)" }}>
                <Calendar value={dateRange} onChange={handleDateSelect} />
              </div>
            )}

            {/* ── GUESTS ── */}
            {activeSection === "guests" && (
              <div>
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(196,169,122,0.06)", border: "1px solid rgba(196,169,122,0.12)" }}
                >
                  <Counter
                    title="Guests"
                    subtitle="How many guests?"
                    value={guestCount}
                    onChange={handleGuestChange}
                  />
                </div>

                {/* Manual search button */}
                <button
                  onClick={onSearch}
                  className="w-full mt-3 py-3 text-sm font-bold tracking-widest uppercase transition-all"
                  style={{
                    background: "linear-gradient(135deg, #c4a97a, #a08558)",
                    color: "#0f0d0a",
                    border: "none",
                    borderRadius: "10px",
                  }}
                >
                  Search
                </button>
              </div>
            )}
          </div>

          {/* Gold bottom line */}
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(196,169,122,0.3), transparent)" }} />
        </div>
      )}
    </div>
  );
};

export default MainSearch;