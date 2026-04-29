"use client";

import Image from "next/image";
import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";

export default function AboutSection() {
  const loginModal    = useLoginModel();
  const registerModal = useRegisterModal();

  const images = [
    "/images/4323/IMG-20251125-WA0012.jpg",
    "/images/RameshNagar/IMG-20251223-WA0064.jpg",
    "/images/3815/IMG_1159.webp",
    "/images/DLFMotinagar/IMG-20251117-WA0025.jpg",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lato:wght@300;400;700&display=swap');

        .ab-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 13px 36px;
          cursor: pointer;
          border: none;
          transition: all 0.25s ease;
          text-decoration: none;
        }
        .ab-btn-primary {
          background: #8c7a4a;
          color: #f2ede4;
        }
        .ab-btn-primary:hover { background: #6b5734; }

        .ab-btn-outline {
          background: transparent;
          color: #c4a97a;
          border: 1px solid rgba(140,122,74,0.5);
        }
        .ab-btn-outline:hover {
          background: rgba(140,122,74,0.12);
          border-color: #8c7a4a;
          color: #f2ede4;
        }

        /* image grid hover */
        .ab-img-wrap { overflow: hidden; border-radius: 12px; }
        .ab-img-wrap img { transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94); }
        .ab-img-wrap:hover img { transform: scale(1.06); }

        /* stat hover */
        .ab-stat:hover { background: rgba(140,122,74,0.08); }

        /* ornament wave */
        .ab-wave {
          display: flex; align-items: center; justify-content: center; gap: 12px;
          margin: 16px 0 22px;
        }
        .ab-wave::before, .ab-wave::after {
          content: ''; height: 1px; width: 52px;
          background: linear-gradient(to right, transparent, #6b5734);
        }
        .ab-wave::after { background: linear-gradient(to left, transparent, #6b5734); }
      `}</style>

      <section style={{
        width: "100vw",
        position: "relative",
        left: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        background: "#1c1a14",
        overflow: "hidden",
      }}>

        {/* Olive top band */}
        <div style={{ height: "3px", background: "linear-gradient(to right, #4a4028, #8c7a4a, #6b5734)" }} />

        {/* ── LAYOUT: text left + image grid right on desktop ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 32px",
          gap: "60px",
          alignItems: "center",
        }}
          className="ab-grid"
        >
          {/* ── LEFT: Text ── */}
          <div>
            <p style={{
              fontFamily: "'Lato', sans-serif", fontSize: "10px",
              letterSpacing: "0.4em", textTransform: "uppercase",
              color: "#8c7a4a", marginBottom: "12px",
            }}>
              Membership
            </p>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 52px)", color: "#f2ede4",
              lineHeight: 1.1, marginBottom: "0",
            }}>
              Loyalty &amp;
              <br />
              <span style={{ fontStyle: "italic", color: "#c4a97a" }}>Rewards</span>
            </h2>

            <div className="ab-wave">
              <svg width="44" height="18" viewBox="0 0 48 20" fill="none">
                <path d="M0 10 Q6 2 12 10 Q18 18 24 10 Q30 2 36 10 Q42 18 48 10" stroke="#6b5734" strokeWidth="1.2" fill="none"/>
              </svg>
            </div>

            <p style={{
              fontFamily: "'Lato', sans-serif", fontWeight: 300,
              fontSize: "14px", lineHeight: 1.9, color: "rgba(242,237,228,0.6)",
              marginBottom: "12px",
            }}>
              Elevating relationships with extraordinary benefits. As a{" "}
              <span style={{ color: "#c4a97a", fontWeight: 400 }}>Tripleone</span>{" "}
              DISCOVERY member, enjoy up to 20% savings, complimentary breakfast,
              and DISCOVERY Dollars Rewards.
            </p>

            <p style={{
              fontFamily: "'Lato', sans-serif", fontWeight: 300,
              fontSize: "13px", lineHeight: 1.8, color: "rgba(242,237,228,0.4)",
              marginBottom: "36px",
            }}>
              Available across all Tripleone properties — Spira Supernova Noida,
              DLF Motinagar, Ramesh Nagar, and Subhash Nagar.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={loginModal.onOpen}
                className="ab-btn ab-btn-primary"
              >
                Sign In
              </button>
              <button
                onClick={registerModal.onOpen}
                className="ab-btn ab-btn-outline"
              >
                Enrol Now
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0", marginTop: "48px",
              borderTop: "1px solid rgba(140,122,74,0.2)",
            }}>
              {[
                { num: "20%", label: "Member Savings" },
                { num: "∞",   label: "Discovery Dollars" },
                { num: "9+",  label: "Luxury Properties" },
              ].map(({ num, label }, i) => (
                <div
                  key={label}
                  className="ab-stat"
                  style={{
                    padding: "22px 16px 22px 0",
                    borderRight: i < 2 ? "1px solid rgba(140,122,74,0.15)" : "none",
                    paddingLeft: i > 0 ? "16px" : "0",
                    transition: "background 0.2s",
                    borderRadius: "4px",
                  }}
                >
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                    fontSize: "clamp(24px, 3vw, 34px)", color: "#8c7a4a",
                    lineHeight: 1, marginBottom: "5px",
                  }}>{num}</p>
                  <p style={{
                    fontFamily: "'Lato', sans-serif", fontSize: "8px",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "rgba(242,237,228,0.35)",
                  }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: 2x2 image grid ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "10px",
            height: "520px",
          }}>
            {images.map((src, i) => (
              <div
                key={i}
                className="ab-img-wrap"
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  /* First image taller on left */
                  ...(i === 0 ? { gridRow: "1 / 2" } : {}),
                }}
              >
                <Image
                  src={src}
                  alt={`Tripleone property ${i + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Dark overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(14,11,6,0.55) 0%, transparent 60%)",
                  borderRadius: "12px",
                }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: stack layout ── */}
        <style>{`
          @media (max-width: 767px) {
            .ab-grid {
              grid-template-columns: 1fr !important;
              padding: 44px 20px !important;
              gap: 36px !important;
            }
          }
        `}</style>

        {/* Floating quote bar */}
        <div style={{
          background: "rgba(107,87,52,0.12)",
          borderTop: "1px solid rgba(140,122,74,0.2)",
          borderBottom: "1px solid rgba(140,122,74,0.2)",
          padding: "20px 24px",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(196,169,122,0.75)",
            letterSpacing: "0.04em",
          }}>
            &ldquo;Where Every Stay Becomes a Story&rdquo; — <span style={{ color: "#8c7a4a" }}>Tripleone</span>
          </p>
        </div>

        {/* Olive bottom band */}
        <div style={{ height: "3px", background: "linear-gradient(to right, #6b5734, #8c7a4a, #4a4028)" }} />
      </section>
    </>
  );
}