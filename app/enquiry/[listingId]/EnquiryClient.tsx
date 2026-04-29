"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import { getGuestId } from "@/lib/guest";
// ── OLIVE PALETTE ──
const OL = {
  900: "#1a2210", 800: "#243018", 600: "#3d5228", 500: "#556b35",
  gold: "#c4a97a", goldLight: "rgba(196,169,122,0.35)",
  cream: "#f5f2ea",
};

export default function EnquiryClient({ listing, currentUser }: any) {
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [email, setEmail]         = useState("");
  const [purpose, setPurpose]     = useState("");
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests]       = useState("");
  const [needStay, setNeedStay]   = useState("Yes");
  const [message, setMessage]     = useState("");
  const [success, setSuccess]     = useState(false);
  const [loading, setLoading]     = useState(false);
const listingIds = [
  "6877f83f233e5dc43231089e",
  "6889ed5f545d937d8360bf93",
  "69ef460da5be5a76eeacb871"
];

const onSubmit = async () => {
  try {
    setLoading(true);

    if (!listing?.id) {
      alert("Invalid listing. Please go back and try again.");
      return;
    }

    const guestId = getGuestId();

    await axios.post("/api/enquiry", {
      listingId: listing.id,
      userId: currentUser?.id || null,
      guestId: currentUser ? null : guestId,

      name,
      phone: `${countryCode}${phone}`,
      email,
      message,
      guestCount: Number(guests),

      listingTitle: listing.title,
      startDate: eventDate || null,
      listingImage: listing.imageSrc?.[0] || null,
    });

    setSuccess(true);
  } catch (err) {
    console.error(err);
    alert("Error sending enquiry");
  } finally {
    setLoading(false);
  }
};

  // ── INPUT STYLE ──
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px",
    background: "#f9f8f4",
    border: "1px solid rgba(196,169,122,0.4)",
    borderRadius: "6px", outline: "none",
    fontFamily: "'Lato', sans-serif", fontSize: "13px",
    color: "#1a2210", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Lato', sans-serif",
    fontSize: "9px", letterSpacing: "0.22em",
    textTransform: "uppercase", color: "#6b7f3f",
    marginBottom: "6px",
  };

  return (
    <>
      <style>{`
        .enq-input:focus { border-color: #6b8540 !important; }
        .enq-input::placeholder { color: rgba(26,34,16,0.35); }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f5f2ea", overflowX: "hidden" }}>

        {/* ══ SUCCESS SCREEN ══ */}
        {success ? (
          <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <div style={{
              background: "#fff", borderRadius: "0",
              border: `1px solid ${OL.goldLight}`,
              boxShadow: "0 12px 48px rgba(0,0,0,0.1)",
              padding: "48px 36px", textAlign: "center",
              maxWidth: "420px", width: "100%",
            }}>
              {/* Gold top bar */}
              <div style={{ height: "3px", background: `linear-gradient(to right, ${OL[500]}, ${OL.gold}, ${OL[500]})`, marginBottom: "32px", marginLeft: "-36px", marginRight: "-36px", marginTop: "-48px", borderRadius: "0" }} />

              <div style={{
                width: "56px", height: "56px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`,
                border: `1px solid ${OL.goldLight}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <span style={{ color: OL.cream, fontSize: "22px" }}>✓</span>
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                fontSize: "26px", color: OL[900], marginBottom: "8px",
              }}>
                Enquiry Received
              </h2>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", margin: "12px 0 16px" }}>
                <div style={{ height: "1px", width: "32px", background: `linear-gradient(to right, transparent, ${OL.gold})` }} />
                <span style={{ color: OL.gold, fontSize: "12px" }}>✦</span>
                <div style={{ height: "1px", width: "32px", background: `linear-gradient(to left, transparent, ${OL.gold})` }} />
              </div>

              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#6b7060", marginBottom: "28px", lineHeight: 1.7 }}>
                Thank you! Our team will contact you within 24 hours.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={() => (window.location.href = "/")}
                  style={{
                    width: "100%", padding: "13px",
                    background: `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`,
                    color: OL.cream, border: `1px solid ${OL.goldLight}`,
                    fontFamily: "'Lato', sans-serif", fontSize: "11px",
                    fontWeight: 700, letterSpacing: "0.18em",
                    textTransform: "uppercase", cursor: "pointer",
                    borderRadius: "4px", transition: "all 0.2s",
                  }}
                >
                  Back to Home
                </button>
                <button
                  onClick={() => setSuccess(false)}
                  style={{
                    width: "100%", padding: "12px",
                    background: "transparent",
                    border: `1px solid ${OL.goldLight}`,
                    color: OL.gold,
                    fontFamily: "'Lato', sans-serif", fontSize: "11px",
                    fontWeight: 700, letterSpacing: "0.18em",
                    textTransform: "uppercase", cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          </div>

        ) : (
          /* ══ FORM SCREEN ══ */
          <div style={{ width: "100%", minHeight: "100vh", background: "#fff" }}>

            {/* HERO IMAGE */}
            {listing?.imageSrc?.[0] && (
              <div style={{ position: "relative", width: "100%", height: "280px" }}>
                <Image
                  src={listing.imageSrc[0]}
                  alt={listing.title || "Property"}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Dark gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(26,34,16,0.8) 0%, rgba(26,34,16,0.1) 60%)",
                }} />
                {/* Title overlay */}
                <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "20px" }}>
                  <p style={{
                    fontFamily: "'Lato', sans-serif", fontSize: "10px",
                    letterSpacing: "0.3em", textTransform: "uppercase",
                    color: OL.gold, marginBottom: "4px",
                  }}>Send Enquiry</p>
                  <h1 style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                    fontSize: "clamp(20px, 4vw, 32px)", color: "#fff",
                    lineHeight: 1.2,
                  }}>
                    {listing.title}
                  </h1>
                </div>
              </div>
            )}

            {/* FORM CONTENT */}
            <div style={{ padding: "32px 20px", maxWidth: "640px", margin: "0 auto" }}>

              {/* Gold divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${OL.gold})` }} />
                <span style={{ color: OL.gold, fontSize: "12px" }}>✦</span>
                <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${OL.gold})` }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                {/* NAME */}
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    placeholder="Your full name"
                    className="enq-input"
                    style={inputStyle}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        ...inputStyle, width: "auto", flexShrink: 0,
                        paddingRight: "8px", cursor: "pointer",
                      }}
                    >
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+971">🇦🇪 +971</option>
                    </select>
                    <input
                      placeholder="Phone number"
                      className="enq-input"
                      style={{ ...inputStyle, flex: 1 }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    placeholder="your@email.com"
                    className="enq-input"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>

                {/* PURPOSE */}
                <div>
                  <label style={labelStyle}>Purpose of Stay</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="enq-input"
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">Select purpose</option>
                    <option>Leisure Stay</option>
                    <option>Business Travel</option>
                    <option>Honeymoon / Anniversary</option>
                    <option>Family Vacation</option>
                    <option>Corporate Event</option>
                    <option>Wedding / Celebration</option>
                    <option>Hourly Booking</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* DATE + GUESTS */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={labelStyle}>Preferred Date</label>
                    <input
                      type="date"
                      className="enq-input"
                      style={inputStyle}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Number of Guests</label>
                    <input
                      type="number"
                      placeholder="e.g. 2"
                      className="enq-input"
                      style={inputStyle}
                      value={guests}
                      min="1"
                      onChange={(e) => setGuests(e.target.value)}
                    />
                  </div>
                </div>

                {/* NEED STAY */}
                <div>
                  <label style={labelStyle}>Need Accommodation?</label>
                  <select
                    value={needStay}
                    onChange={(e) => setNeedStay(e.target.value)}
                    className="enq-input"
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="Yes">Yes, include stay</option>
                    <option value="No">No, just the venue</option>
                    <option value="Maybe">Not sure yet</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label style={labelStyle}>Additional Information</label>
                  <textarea
                    placeholder="Any specific requirements, questions, or requests..."
                    className="enq-input"
                    style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* SUBMIT */}
                <button
                  onClick={onSubmit}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "15px",
                    background: loading
                      ? "rgba(85,107,53,0.5)"
                      : `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`,
                    color: OL.cream,
                    border: `1px solid ${OL.goldLight}`,
                    fontFamily: "'Lato', sans-serif", fontSize: "11px",
                    fontWeight: 700, letterSpacing: "0.22em",
                    textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
                    borderRadius: "4px", transition: "all 0.2s",
                    marginTop: "4px",
                  }}
                >
                  {loading ? "Sending..." : "Enquire Now"}
                </button>

                <p style={{
                  textAlign: "center", fontFamily: "'Lato', sans-serif",
                  fontSize: "11px", color: "rgba(26,34,16,0.4)",
                  letterSpacing: "0.05em",
                }}>
                  Our team responds within 24 hours
                </p>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}