"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { blogData } from "@/app/blog/blogData";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function CityShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "right" ? 480 : -480, behavior: "smooth" });

  const cityData = blogData.filter(b => b.location !== "Spira Supernova");
  const PREVIEW = 4;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Lato:wght@300;400;700&display=swap');
        .cy-scroll::-webkit-scrollbar { display: none; }
        .cy-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .cy-card .cy-img { transition: transform 1s cubic-bezier(0.25,0.46,0.45,0.94); }
        .cy-card:hover .cy-img { transform: scale(1.06); }
        .cy-card .cy-tint { opacity: 0; transition: opacity 0.4s; }
        .cy-card:hover .cy-tint { opacity: 1; }
        .cy-card .cy-cta { opacity: 0; transform: translateY(12px); transition: all 0.35s; }
        .cy-card:hover .cy-cta { opacity: 1; transform: translateY(0); }

        .cy-desktop-scroll { display: block; }
        .cy-mobile-section { display: none; }
        @media (max-width: 767px) {
          .cy-desktop-scroll { display: none; }
          .cy-mobile-section { display: block; }
        }

        .cy-mob-card {
          position: relative; overflow: hidden; cursor: pointer;
          aspect-ratio: 3/4; border-radius: 14px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.28);
          transition: transform 0.3s ease;
        }
        .cy-mob-card:active { transform: scale(0.97); }
        .cy-mob-card .mob-img { transition: transform 0.8s ease; }
        .cy-mob-card:active .mob-img { transform: scale(1.05); }

        .cy-grid-all {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 0 12px;
        }

        .cy-show-all-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin: 16px auto 0; padding: 11px 28px;
          background: rgba(107,87,52,0.1);
          border: 1px solid rgba(107,87,52,0.3);
          border-radius: 50px; cursor: pointer;
          font-family: 'Lato', sans-serif; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; color: #6b5734;
          transition: all 0.2s;
        }
        .cy-show-all-btn:hover { background: rgba(107,87,52,0.18); }

        /* Location name animated underline on hover */
        .cy-loc-name {
          position: relative;
          display: inline-block;
        }
        .cy-loc-name::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1px;
          background: #8c7a4a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .cy-card:hover .cy-loc-name::after { transform: scaleX(1); }
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
        <div style={{ padding: "52px 20px 32px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#8c7a4a", marginBottom: "10px" }}>
            Tripleone Delhi NCR
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(28px, 3.5vw, 48px)", color: "#f2ede4", lineHeight: 1.1, marginBottom: "8px" }}>
            City Luxury Escapes
          </h2>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(14px, 1.8vw, 20px)", color: "#8c7a4a", marginBottom: "20px" }}>
            Noida · Delhi · Ramesh Nagar · Subhash Nagar · DLF Motinagar
          </h3>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px" }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #8c7a4a)" }} />
            <span style={{ color: "#8c7a4a", fontSize: "16px" }}>✦</span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #8c7a4a)" }} />
          </div>
        </div>

        {/* ── DESKTOP scroll ── */}
        <div className="cy-desktop-scroll" style={{ position: "relative" }}>
          <button onClick={() => scroll("left")} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 30, width: "44px", height: "44px", background: "rgba(28,26,20,0.92)", border: "1px solid rgba(140,122,74,0.4)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            <ChevronLeft size={18} strokeWidth={1.2} color="#8c7a4a" />
          </button>
          <button onClick={() => scroll("right")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", zIndex: 30, width: "44px", height: "44px", background: "rgba(28,26,20,0.92)", border: "1px solid rgba(140,122,74,0.4)", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            <ChevronRight size={18} strokeWidth={1.2} color="#8c7a4a" />
          </button>

          <div ref={scrollRef} className="cy-scroll" style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth", gap: "16px", padding: "8px 60px 28px" }}>
            {cityData.map((item, i) => (
              <Link key={i} href={`/blog/${item.slug}`} style={{ display: "block", flexShrink: 0 }}>
                <div className="cy-card" style={{ width: "clamp(260px, 30vw, 460px)", height: "clamp(340px, 40vw, 560px)", position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: "18px", boxShadow: "0 12px 40px rgba(0,0,0,0.38)" }}>
                  <Image src={item.image} alt={item.title} fill className="cy-img" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(6,5,2,0.95) 0%, rgba(6,5,2,0.2) 50%, transparent 72%)" }} />
                  <div className="cy-tint" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "rgba(6,5,2,0.28)" }} />

                  {/* Tripleone badge */}
                  <div style={{ position: "absolute", top: "16px", left: "16px", zIndex: 20, background: "rgba(20,18,12,0.82)", backdropFilter: "blur(10px)", border: "1px solid rgba(140,122,74,0.4)", borderRadius: "50px", padding: "5px 14px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ color: "#8c7a4a", fontSize: "7px" }}>✦</span>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "9px", color: "#c4a97a", letterSpacing: "0.2em", textTransform: "uppercase" }}>Tripleone</span>
                  </div>

                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 22px 26px", zIndex: 10 }}>
                    {/* Location — big, attractive */}
                    <p className="cy-loc-name" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "clamp(13px, 1.4vw, 17px)", letterSpacing: "0.04em", color: "rgba(196,169,122,0.85)", marginBottom: "4px" }}>
                      {item.location}
                    </p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(18px, 1.8vw, 24px)", color: "#fff", lineHeight: 1.15, marginBottom: "7px" }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, fontWeight: 300, marginBottom: "14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.tagline}</p>
                    <div className="cy-cta">
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "9px", letterSpacing: "0.24em", textTransform: "uppercase", padding: "9px 20px", color: "#f2ede4", border: "1px solid rgba(140,122,74,0.5)", background: "rgba(107,87,52,0.3)", fontFamily: "'Lato', sans-serif", backdropFilter: "blur(4px)", borderRadius: "4px" }}>
                        Discover <span style={{ fontSize: "13px" }}>→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── MOBILE grid ── */}
        <div className="cy-mobile-section">
          <div className="cy-grid-all">
            {(showAll ? cityData : cityData.slice(0, PREVIEW)).map((item, i) => (
              <Link key={i} href={`/blog/${item.slug}`} style={{ display: "block" }}>
                <div className="cy-mob-card">
                  <Image src={item.image} alt={item.title} fill className="mob-img" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to top, rgba(6,5,2,0.94) 0%, rgba(6,5,2,0.08) 58%, transparent 78%)", borderRadius: "14px" }} />
                  <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 20, background: "rgba(20,18,12,0.8)", backdropFilter: "blur(6px)", border: "1px solid rgba(140,122,74,0.35)", borderRadius: "50px", padding: "3px 10px" }}>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "7px", color: "#c4a97a", letterSpacing: "0.12em" }}>✦ Tripleone</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 11px 14px", zIndex: 10 }}>
                    {/* Location name big on mobile */}
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "12px", color: "rgba(196,169,122,0.85)", marginBottom: "2px" }}>{item.location}</p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "14px", color: "#f2ede4", lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "8px", color: "rgba(255,255,255,0.4)", marginTop: "3px", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.priceRange}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {cityData.length > PREVIEW && (
            <button className="cy-show-all-btn" onClick={() => setShowAll(v => !v)}>
              {showAll ? "Show Less ↑" : `Show All ${cityData.length} Properties ↓`}
            </button>
          )}
          <div style={{ height: "20px" }} />
        </div>

        <div style={{ height: "3px", background: "linear-gradient(to right, #6b5734, #8c7a4a, #4a4028)" }} />
      </section>
    </>
  );
}