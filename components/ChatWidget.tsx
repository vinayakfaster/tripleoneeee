"use client";

import { useState, useEffect, useRef } from "react";

// ── Types ────────────────────────────────────────────────────────────────────
type Option = {
  label: string;
  next: string;
};

type FlowStep = {
  botMessages: string[];
  options: Option[];
};

type Message = {
  role: "bot" | "user";
  text: string;
};

// ── Color palette ─────────────────────────────────────────────────────────────
const C = {
  600: "rgb(61, 82, 40)",   // darkest green
  500: "#556b35",            // mid green
  400: "#6b8540",            // lighter green
  gold: "#c8a84b",
  goldDark: "#8b6914",
  cream: "#f5e9c8",
  bg: "#0a0f06",
  bgCard: "#111a09",
  bgHeader: "#0d1407",
};

// ── Conversation flow ─────────────────────────────────────────────────────────
const FLOW: Record<string, FlowStep> = {
  start: {
    botMessages: [
      "Hey there! 👋 Welcome!",
      "Looking for a cozy, private & comfortable stay? You're at the right place! 🏠✨",
      "We have premium stays across Delhi NCR — Noida, Gurugram, Ramesh Nagar, Subhash Nagar & nearby areas.",
      "Who's planning the stay?",
    ],
    options: [
      { label: "💑 Couple Stay", next: "couple" },
      { label: "👨‍👩‍👧 Family / Group Stay", next: "family" },
    ],
  },
  couple: {
    botMessages: [
      "Perfect! 💑 We have private, cozy rooms made just for couples.",
      "✅ 100% Privacy\n✅ AC Rooms\n✅ Hourly & Full Night options\n✅ No Questions Asked Policy",
      "Which location do you prefer?",
    ],
    options: [
      { label: "📍 Noida", next: "noida_couple" },
      { label: "📍 Delhi — Ramesh / Subhash Nagar", next: "delhi_couple" },
      { label: "📍 Gurugram", next: "gurugram_couple" },
      { label: "📍 Show All Locations", next: "all_locations" },
    ],
  },
  family: {
    botMessages: [
      "Great! 👨‍👩‍👧 We have spacious, comfortable rooms perfect for families & groups.",
      "✅ Clean & Hygienic\n✅ AC Rooms\n✅ Daily & Weekly bookings\n✅ Affordable pricing",
      "Which location do you prefer?",
    ],
    options: [
      { label: "📍 Noida", next: "noida_family" },
      { label: "📍 Delhi — Ramesh / Subhash Nagar", next: "delhi_family" },
      { label: "📍 Gurugram", next: "gurugram_family" },
      { label: "📍 Show All Locations", next: "all_locations" },
    ],
  },
  noida_couple: {
    botMessages: [
      "Great choice! 🏙️ We have beautiful couple-friendly stays in Noida.",
      "🛏️ Sector 18, 62, 63 areas\n💰 Starting ₹999/3hrs · ₹4500/night\n🔒 Fully private & secure",
      "Ready to book? Our team confirms your room in minutes! ⚡",
    ],
    options: [
      { label: "📞 Book Now — Call/WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "couple" },
    ],
  },
  delhi_couple: {
    botMessages: [
      "Excellent! 🏘️ Ramesh Nagar & Subhash Nagar — some of our most popular couple stays.",
      "🛏️ Walking distance from Metro\n💰 Starting ₹999/3hrs · ₹4500/night\n🔒 Discreet & Private entry",
      "Ready to book? Our team confirms your room in minutes! ⚡",
    ],
    options: [
      { label: "📞 Book Now — Call/WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "couple" },
    ],
  },
  gurugram_couple: {
    botMessages: [
      "Nice! 🌆 Gurugram stays are premium & fully couple-friendly.",
      "🛏️ DLF, Sector 14, 29 areas\n💰 Starting ₹999/3hrs · ₹5500/night\n🔒 100% Privacy guaranteed",
      "Ready to book? Our team confirms your room in minutes! ⚡",
    ],
    options: [
      { label: "📞 Book Now — Call/WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "couple" },
    ],
  },
  noida_family: {
    botMessages: [
      "Perfect! 🏙️ Noida has great family stays for you.",
      "🛏️ Sector 18, 62, 63 areas\n💰 Starting ₹4999/night\n🛁 2–3 BHK options available",
      "Our team will find the best match for your group size! 😊",
    ],
    options: [
      { label: "📞 Book Now — Call/WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "family" },
    ],
  },
  delhi_family: {
    botMessages: [
      "Great! 🏘️ Ramesh Nagar & Subhash Nagar — central location, metro nearby!",
      "🛏️ Spacious rooms & flats\n💰 Starting ₹2999/night\n🛁 Kitchen available on request",
      "Our team will find the best match for your group size! 😊",
    ],
    options: [
      { label: "📞 Book Now — Call/WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "family" },
    ],
  },
  gurugram_family: {
    botMessages: [
      "Awesome! 🌆 Gurugram has premium family-friendly stays.",
      "🛏️ DLF, Sector 14, 29 areas\n💰 Starting ₹4999/night\n🛁 Fully furnished flats available",
      "Our team will find the best match for your group size! 😊",
    ],
    options: [
      { label: "📞 Book Now — Call/WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "family" },
    ],
  },
  all_locations: {
    botMessages: [
      "Here are all our locations! 📍",
      "🏙️ Noida — Sector 18, 62, 63\n🏘️ Delhi — Ramesh Nagar, Subhash Nagar\n🌆 Gurugram — DLF, Sector 14, 29\n🏠 + More nearby areas",
      "Who's staying?",
    ],
    options: [
      { label: "💑 Couple Stay", next: "couple" },
      { label: "👨‍👩‍👧 Family / Group Stay", next: "family" },
    ],
  },
  contact: {
    botMessages: [
      "You're one step away from your perfect stay! 🎉",
      "📲 Call or WhatsApp us right now:\n\n+91 8448-811165",
      "⏱️ Available 24/7 — We confirm FAST!\n\nJust tell us:\n• Location preference\n• Check-in date & time\n• Number of guests",
      "See you soon! 🏠✨",
    ],
    options: [{ label: "🔄 Start Over", next: "start" }],
  },
};

const TYPING_DELAY = 950;

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions]   = useState<Option[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [started, setStarted]   = useState(false);
  const [pulse, setPulse]       = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Stop pulse after 6 s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, options]);

  // Start flow when first opened
  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      triggerFlow("start");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const addBotMessage = (text: string): Promise<void> =>
    new Promise((res) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text }]);
        res();
      }, TYPING_DELAY);
    });

  const triggerFlow = async (key: string) => {
    const flow = FLOW[key];
    if (!flow) return;
    setOptions([]);
    setIsTyping(true);
    for (const msg of flow.botMessages) {
      await addBotMessage(msg);
    }
    setIsTyping(false);
    setOptions(flow.options);
  };

  const handleOption = (opt: Option) => {
    setMessages((prev) => [...prev, { role: "user", text: opt.label }]);
    setOptions([]);
    triggerFlow(opt.next);
  };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 62,
          height: 62,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C[400]} 0%, ${C[600]} 100%)`,
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          fontSize: 26,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 32px rgba(107,133,64,0.55)`,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          animation: pulse ? "pulseBtn 1.5s ease-in-out infinite" : "none",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 12px 40px rgba(107,133,64,0.75)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 8px 32px rgba(107,133,64,0.55)";
        }}
      >
        {open ? "✕" : "🏠"}
      </button>

      {/* ── Chat box ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 100,
            right: 24,
            width: 340,
            maxHeight: 540,
            background: `linear-gradient(160deg, ${C.bg} 0%, ${C.bgCard} 100%)`,
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998,
            border: `1px solid rgba(107,133,64,0.35)`,
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03)",
            animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              background: C.bgHeader,
              borderBottom: `1px solid rgba(107,133,64,0.25)`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${C[400]}, ${C[600]})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                flexShrink: 0,
                boxShadow: `0 0 16px rgba(107,133,64,0.4)`,
              }}
            >
              🏠
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#e8f5e2",
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.3px",
                }}
              >
                TripleOne — Book Your Stay
              </div>
              <div
                style={{
                  color: C[400],
                  fontSize: 11,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4caf50",
                    display: "inline-block",
                    boxShadow: "0 0 6px #4caf50",
                    animation: "blinkDot 1.5s ease-in-out infinite",
                  }}
                />
                Online 24/7 · Noida · Delhi · Gurugram
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "14px 12px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              scrollbarWidth: "thin",
              scrollbarColor: `rgba(107,133,64,0.25) transparent`,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  animation: "fadeIn 0.25s ease",
                }}
              >
                {msg.role === "bot" && (
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: `linear-gradient(135deg, ${C[400]}, ${C[600]})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      marginRight: 7,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    🏠
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "73%",
                    padding: "9px 13px",
                    borderRadius:
                      msg.role === "user"
                        ? "16px 4px 16px 16px"
                        : "4px 16px 16px 16px",
                    background:
                      msg.role === "user"
                        ? `linear-gradient(135deg, ${C[500]}, ${C[600]})`
                        : "rgba(255,255,255,0.06)",
                    color: "#e8f5e2",
                    fontSize: 13,
                    lineHeight: 1.6,
                    whiteSpace: "pre-line",
                    border:
                      msg.role === "bot"
                        ? "1px solid rgba(107,133,64,0.2)"
                        : "none",
                    boxShadow:
                      msg.role === "user"
                        ? `0 4px 16px rgba(85,107,53,0.35)`
                        : "0 2px 8px rgba(0,0,0,0.25)",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  animation: "fadeIn 0.25s ease",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${C[400]}, ${C[600]})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                  }}
                >
                  🏠
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(107,133,64,0.2)",
                    borderRadius: "4px 16px 16px 16px",
                    padding: "10px 14px",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: C[400],
                        display: "inline-block",
                        animation: `typingDot 1.2s ease-in-out ${d * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Options */}
          {options.length > 0 && (
            <div
              style={{
                padding: "10px 12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 7,
                borderTop: "1px solid rgba(107,133,64,0.15)",
                background: "rgba(0,0,0,0.2)",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(232,245,226,0.3)",
                  textAlign: "center",
                  marginBottom: 2,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Choose an option
              </div>
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOption(opt)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: `1px solid rgba(107,133,64,0.4)`,
                    background: "rgba(107,133,64,0.08)",
                    color: "#e8f5e2",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.18s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(107,133,64,0.22)";
                    el.style.borderColor = "rgba(107,133,64,0.65)";
                    el.style.transform = "translateY(-1px)";
                    el.style.boxShadow = "0 4px 16px rgba(107,133,64,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(107,133,64,0.08)";
                    el.style.borderColor = "rgba(107,133,64,0.4)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div
            style={{
              padding: "8px",
              textAlign: "center",
              fontSize: 10,
              color: "rgba(232,245,226,0.25)",
              background: "rgba(0,0,0,0.15)",
              letterSpacing: "0.3px",
            }}
          >
            🔒 Safe · Private · Instant Booking
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
        @keyframes pulseBtn {
          0%,  100% { box-shadow: 0 8px 32px rgba(107,133,64,0.55), 0 0 0  0   rgba(107,133,64,0.5); }
          50%        { box-shadow: 0 8px 32px rgba(107,133,64,0.55), 0 0 0 14px rgba(107,133,64,0);   }
        }
        @keyframes blinkDot {
          0%,  100% { opacity: 1;   }
          50%        { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}