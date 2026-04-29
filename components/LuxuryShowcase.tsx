"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const categories = ["All Hotels", "Villas", "City Stays", "Luxury Suites"];

export const slugMap: Record<string, string> = {
  "Luxury Night Stay in Noida":          "supernova-2512",
  "Romantic Stay in Ramesh Nagar":       "ramesh-nagar",
  "Premium Night Stay in Subhash Nagar": "subhash-nagar",
  "Exclusive Stay in DLF Motinagar":     "dlf-motinagar",
  "Private Villa Stay in 4308":          "supernova-4308",
  "Luxury Stay in 3815 Noida":           "supernova-3815",
  "Premium Night Stay in 3509":          "supernova-3509",
};

const data = [
  { title: "Luxury Night Stay in Noida",          location: "Noida",         image: "/images/4323/IMG-20251125-WA0012.jpg",          desc: "An elegant escape designed for unforgettable nights." },
  { title: "Romantic Stay in Ramesh Nagar",        location: "Ramesh Nagar",  image: "/images/RameshNagar/IMG-20251223-WA0064.jpg",   desc: "A cozy retreat perfect for couples seeking privacy and warmth." },
  { title: "Premium Night Stay in Subhash Nagar",  location: "Subhash Nagar", image: "/images/SubhashNagar/IMG-20251117-WA0027.jpg",  desc: "Modern luxury blended with a peaceful vibe." },
  { title: "Exclusive Stay in DLF Motinagar",      location: "DLF Motinagar", image: "/images/DLFMotinagar/IMG-20251117-WA0025.jpg",  desc: "Serene and private — crafted for unforgettable evenings." },
  { title: "Private Villa Stay in 4308",           location: "Delhi",         image: "/images/4308/IMG_1286.webp",                   desc: "A calm villa space for a peaceful luxurious night." },
  { title: "Luxury Stay in 3815 Noida",            location: "Noida",         image: "/images/3815/IMG_1159.webp",                   desc: "Refined comfort for a special getaway." },
  { title: "Premium Night Stay in 3509",           location: "Delhi",         image: "/images/3509/IMG_1242.webp",                   desc: "Privacy, comfort, and a hint of indulgence." },
];

export default function LuxuryShowcase() {
  const router    = useRouter();
  const params    = useSearchParams();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All Hotels");

const handleClick = (cat: string) => {
  setActiveCategory(cat);

  let q: Record<string, string> = {};
  if (params) q = qs.parse(params.toString()) as Record<string, string>;

  const updated: Record<string, string> = { ...q };

  if (params?.get("category") === cat || cat === "All Hotels") {
    delete updated.category; // safe because type is now correct
  } else {
    updated.category = cat;
  }

  router.push(
    qs.stringifyUrl(
      { url: "/", query: updated },
      { skipNull: true }
    )
  );
};;

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "right" ? 480 : -480, behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Lato:wght@300;400;700&display=swap');
        .lux-scroll::-webkit-scrollbar { display: none; }
        .lux-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .lux-card .lux-img { transition: transform 1s cubic-bezier(0.25,0.46,0.45,0.94); }
        .lux-card:hover .lux-img { transform: scale(1.06); }
        .lux-card .lux-overlay { opacity: 0; transition: opacity 0.4s; }
        .lux-card:hover .lux-overlay { opacity: 1; }
        .lux-card .lux-cta { opacity: 0; transform: translateY(12px); transition: all 0.35s; }
        .lux-card:hover .lux-cta { opacity: 1; transform: translateY(0); }

        /* MakeMyTrip-style category tabs */
        .lux-cat-tab {
          padding: 7px 18px;
          border-radius: 50px;
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          border: 1px solid rgba(140,122,74,0.35);
          background: transparent;
          color: rgba(242,237,228,0.55);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .lux-cat-tab:hover { border-color: #8c7a4a; color: #c4a97a; }
        .lux-cat-tab.active {
          background: rgba(140,122,74,0.18);
          border-color: #8c7a4a;
          color: #f2ede4;
        }

        /* mobile */
        .lux-desktop { display: block; }
        .lux-mobile { display: none; }
        @media (max-width: 767px) {
          .lux-desktop { display: none; }
          .lux-mobile { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 0 12px 20px; }
        }
        .lux-mob-card {
          position: relative; overflow: hidden; cursor: pointer;
          aspect-ratio: 3/4; border-radius: 14px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.35);
          transition: transform 0.3s;
        }
        .lux-mob-card:active { transform: scale(0.97); }
      `}</style>

      <section style={{
        width: "100vw", position: "relative",
        left: "50%", marginLeft: "-50vw", marginRight: "-50vw",
        overflow: "hidden",
        background: "#1c1a14",
        borderTop: "1px solid rgba(107,87,52,0.2)",
      }}>
        <div style={{ height: "3px", background: "linear-gradient(to right, #4a4028, #8c7a4a, #6b5734)" }} />

        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", padding: "52px 16px 24px" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8c7a4a", marginBottom: "10px" }}>
            Our Collection
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 48px)", color: "#f2ede4", lineHeight: 1.1, marginBottom: "8px" }}>
            Enter The World Of True Indian Luxury
          </h2>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(14px, 1.8vw, 20px)", color: "#8c7a4a", marginBottom: "24px" }}>
            Curated stays across Delhi NCR
          </h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #8c7a4a)" }} />
            <span style={{ color: "#8c7a4a", fontSize: "16px" }}>✦</span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #8c7a4a)" }} />
          </div>

          {/* MakeMyTrip-style pill category filter */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", padding: "0 16px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleClick(cat)}
                className={`lux-cat-tab${activeCategory === cat ? " active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── DESKTOP scroll ── */}
        <div className="lux-desktop" style={{ position: "relative" }}>
          <button onClick={() => scroll("left")} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 30, width: "44px", height: "44px", background: "rgba(28,26,20,0.92)", border: "1px solid rgba(140,122,74,0.4)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            <ChevronLeft size={18} strokeWidth={1.2} color="#8c7a4a" />
          </button>
          <button onClick={() => scroll("right")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 30, width: "44px", height: "44px", background: "rgba(28,26,20,0.92)", border: "1px solid rgba(140,122,74,0.4)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            <ChevronRight size={18} strokeWidth={1.2} color="#8c7a4a" />
          </button>

          <div ref={scrollRef} className="lux-scroll" style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth", gap: "16px", padding: "8px 60px 28px" }}>
            {data.map((item, i) => {
              const slug     = slugMap[item.title];
              const name     = item.title.split(" in ")[0];
              const location = item.title.split(" in ")[1];
              const card = (
                <div className="lux-card" style={{ width: "clamp(260px, 30vw, 460px)", height: "clamp(340px, 40vw, 560px)", position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: "18px", boxShadow: "0 12px 40px rgba(0,0,0,0.4)" }}>
                  <Image src={item.image} alt={item.title} fill className="lux-img" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(6,5,2,0.95) 0%, rgba(6,5,2,0.2) 50%, transparent 72%)" }} />
                  <div className="lux-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "rgba(6,5,2,0.28)" }} />
                  {/* Tripleone badge */}
                  <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 20, background: "rgba(20,18,12,0.82)", backdropFilter: "blur(10px)", border: "1px solid rgba(140,122,74,0.4)", borderRadius: "50px", padding: "5px 14px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#8c7a4a", fontSize: "7px" }}>✦</span>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", color: "#c4a97a", letterSpacing: "0.2em", textTransform: "uppercase" }}>Tripleone</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 22px 26px", zIndex: 10 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "14px", color: "rgba(196,169,122,0.82)", marginBottom: "4px" }}>{location}</p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(18px, 1.8vw, 24px)", color: "#fff", lineHeight: 1.15, marginBottom: "7px" }}>{name}</h3>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, fontWeight: 300, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.desc}</p>
                    <div className="lux-cta">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase", padding: "9px 20px", color: "#f2ede4", border: "1px solid rgba(140,122,74,0.5)", background: "rgba(107,87,52,0.3)", fontFamily: "'Lato', sans-serif", backdropFilter: "blur(4px)", borderRadius: "4px" }}>
                        Discover <span style={{ fontSize: "13px" }}>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
              return slug ? (
                <Link key={i} href={`/blog/${slug}`} style={{ display: "block", flexShrink: 0 }}>{card}</Link>
              ) : (
                <div key={i} style={{ flexShrink: 0 }}>{card}</div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE 2-col grid ── */}
        <div className="lux-mobile">
          {data.map((item, i) => {
            const slug = slugMap[item.title];
            const name = item.title.split(" in ")[0];
            const location = item.title.split(" in ")[1];
            return (
              <Link key={i} href={slug ? `/blog/${slug}` : "#"} style={{ display: "block" }}>
                <div className="lux-mob-card">
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(6,5,2,0.94) 0%, rgba(6,5,2,0.08) 58%, transparent 78%)", borderRadius: "14px" }} />
                  <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 20, background: "rgba(20,18,12,0.8)", backdropFilter: "blur(6px)", border: "1px solid rgba(140,122,74,0.35)", borderRadius: "50px", padding: "3px 10px" }}>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "7px", color: "#c4a97a", letterSpacing: "0.12em" }}>✦ Tripleone</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 11px 14px", zIndex: 10 }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "11px", color: "rgba(196,169,122,0.82)", marginBottom: "2px" }}>{location}</p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "14px", color: "#f2ede4", lineHeight: 1.2 }}>{name}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ height: "3px", background: "linear-gradient(to right, #6b5734, #8c7a4a, #4a4028)" }} />
      </section>
    </>
  );
}