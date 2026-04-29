"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { SafeListing, SafeUser } from "@/app/types";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

type Props = {
  title: string;
  listings: SafeListing[];
  currentUser?: SafeUser | null;
};

export default function HorizontalListingRow({ title, listings }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = () =>
    scrollRef.current?.scrollBy({ left: 700, behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Lato:wght@300;400;700&display=swap');

        .hlr-scroll::-webkit-scrollbar { display: none; }
        .hlr-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .hlr-card .hlr-img { transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94); }
        .hlr-card:hover .hlr-img { transform: scale(1.04); }
        .hlr-card:hover .hlr-tint { opacity: 1; }
        .hlr-card:hover .hlr-cta { opacity: 1; transform: translateY(0); }
      `}</style>

      {/*
        Full-bleed section — breaks out of any parent padding.
        Same trick as LuxuryShowcase.
      */}
      <section style={{
        width: "100vw",
        position: "relative",
        left: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        overflow: "hidden",
        background: "#fff",
        paddingTop: "0",
      }}>

        {/* ── HEADER ── */}
        <div style={{ padding: "0 24px 20px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <p style={{
              fontFamily: "'Lato', sans-serif", fontSize: "10px",
              letterSpacing: "0.35em", textTransform: "uppercase",
              color: "#9e7d4b", marginBottom: "8px",
            }}>
              Curated For You
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(22px, 2.8vw, 38px)", color: "#1a0f00",
              lineHeight: 1.15,
            }}>
              {title}
            </h2>
          </div>

          {/* Arrow */}
          <button
            onClick={scroll}
            style={{
              flexShrink: 0,
              width: "44px", height: "44px",
              borderRadius: "50%",
              background: "#fff",
              border: "1px solid #e0cfb8",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "4px",
            }}
          >
            <ChevronRight size={18} strokeWidth={1.4} color="#9e7d4b" />
          </button>
        </div>



        {/* ── SCROLL TRACK ── */}
        <div
          ref={scrollRef}
          className="hlr-scroll"
          style={{ display: "flex", overflowX: "auto", scrollBehavior: "smooth" }}
        >
          {listings.map((listing) => {
            const image      = listing.imageSrc?.[0] || "/placeholder.jpg";
            const fakeRating = (Math.random() * 1.2 + 3.8).toFixed(1);
            const rating     = (listing as any).rating || fakeRating;

            return (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="hlr-card"
                style={{
                  flexShrink: 0,
                  display: "block",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  /* ~2.6 cards visible on desktop, ~1.1 on mobile */
                  width: "clamp(280px, 38vw, 580px)",
                  height: "clamp(340px, 44vw, 600px)",
                  /* Gold divider between cards */
                  borderRight: "1px solid rgba(196,169,122,0.3)",
                }}
              >
                {/* Image */}
                <Image
                  src={image}
                  alt={listing.title}
                  fill
                  className="hlr-img"
                  style={{ objectFit: "cover" }}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
                />

                {/* Permanent gradient */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(to top, rgba(8,4,0,0.88) 0%, rgba(8,4,0,0.15) 48%, transparent 68%)",
                }} />

                {/* Hover tint */}
                <div className="hlr-tint" style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "rgba(8,4,0,0.2)", opacity: 0, transition: "opacity 0.4s",
                }} />

                {/* Top badges */}
                <div style={{
                  position: "absolute", top: "16px", left: "16px", right: "16px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  zIndex: 10,
                }}>
                  {(listing as any).isFavorite ? (
                    <span style={{
                      fontFamily: "'Lato', sans-serif", fontSize: "9px",
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      background: "rgba(255,255,255,0.92)", color: "#4a3020",
                      padding: "4px 10px", backdropFilter: "blur(4px)",
                    }}>
                      Guest Favourite
                    </span>
                  ) : <span />}

                  <button
                    onClick={(e) => e.preventDefault()}
                    style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      backdropFilter: "blur(4px)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Heart size={13} color="white" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Bottom content */}
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "0 22px 24px", zIndex: 10,
                }}>
                  <p style={{
                    fontFamily: "'Lato', sans-serif", fontSize: "9px",
                    letterSpacing: "0.24em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)", marginBottom: "5px",
                  }}>
                    {listing.locationValue}
                  </p>

                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                    fontSize: "clamp(16px, 1.6vw, 22px)", color: "#fff",
                    lineHeight: 1.2, marginBottom: "10px",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {listing.title || listing.category}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.88)" }}>
                      <strong style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
                        ₹{listing.price.toLocaleString("en-IN")}
                      </strong>
                      <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}> / night</span>
                    </p>
                    <span style={{
                      fontFamily: "'Lato', sans-serif", fontSize: "11px",
                      color: "#c4a97a", display: "flex", alignItems: "center", gap: "3px",
                    }}>
                      ★ {parseFloat(rating).toFixed(1)}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="hlr-cta" style={{
                    opacity: 0, transform: "translateY(8px)", transition: "all 0.3s ease",
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontFamily: "'Lato', sans-serif", fontSize: "9px",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "white", padding: "8px 18px",
                    border: "1px solid rgba(255,255,255,0.4)",
                    background: "rgba(158,125,75,0.38)",
                  }}>
                    View Property <span style={{ fontSize: "12px" }}>→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>



      </section>
    </>
  );
}