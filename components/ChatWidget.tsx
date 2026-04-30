use client";

import { useState, useEffect, useRef } from "react";

type Role = "bot" | "user";

interface Message {
  role: Role;
  text: string;
}

interface Option {
  label: string;
  next: string;
}

interface FlowStep {
  msgs: string[];
  options: Option[];
}

const FLOW: Record<string, FlowStep> = {
  start: {
    msgs: [
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
    msgs: [
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
    msgs: [
      "Great! 👨‍👩‍👧 We have spacious rooms perfect for families & groups.",
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
    msgs: [
      "Great choice! 🏙️ Beautiful couple-friendly stays in Noida.",
      "🛏️ Sector 18, 62, 63 areas\n💰 Starting ₹499/3hrs · ₹999/night\n🔒 Fully private & secure",
      "Ready to book? Our team confirms your room in minutes! ⚡",
    ],
    options: [
      { label: "📞 Book Now — Call / WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "couple" },
    ],
  },
  delhi_couple: {
    msgs: [
      "Excellent! 🏘️ Ramesh Nagar & Subhash Nagar — most popular couple stays.",
      "🛏️ Walking distance from Metro\n💰 Starting ₹399/3hrs · ₹899/night\n🔒 Discreet & Private entry",
      "Ready to book? Our team confirms your room in minutes! ⚡",
    ],
    options: [
      { label: "📞 Book Now — Call / WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "couple" },
    ],
  },
  gurugram_couple: {
    msgs: [
      "Nice! 🌆 Gurugram stays are premium & fully couple-friendly.",
      "🛏️ DLF, Sector 14, 29 areas\n💰 Starting ₹599/3hrs · ₹1199/night\n🔒 100% Privacy guaranteed",
      "Ready to book? Our team confirms your room in minutes! ⚡",
    ],
    options: [
      { label: "📞 Book Now — Call / WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "couple" },
    ],
  },
  noida_family: {
    msgs: [
      "Perfect! 🏙️ Noida has great family stays for you.",
      "🛏️ Sector 18, 62, 63 areas\n💰 Starting ₹1499/night\n🛁 2–3 BHK options available",
      "Our team will find the best match for your group! 😊",
    ],
    options: [
      { label: "📞 Book Now — Call / WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "family" },
    ],
  },
  delhi_family: {
    msgs: [
      "Great! 🏘️ Ramesh Nagar & Subhash Nagar — central location, metro nearby!",
      "🛏️ Spacious rooms & flats\n💰 Starting ₹1199/night\n🛁 Kitchen available on request",
      "Our team will find the best match for your group! 😊",
    ],
    options: [
      { label: "📞 Book Now — Call / WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "family" },
    ],
  },
  gurugram_family: {
    msgs: [
      "Awesome! 🌆 Gurugram has premium family-friendly stays.",
      "🛏️ DLF, Sector 14, 29 areas\n💰 Starting ₹1799/night\n🛁 Fully furnished flats available",
      "Our team will find the best match for your group! 😊",
    ],
    options: [
      { label: "📞 Book Now — Call / WhatsApp", next: "contact" },
      { label: "🔙 Change Location", next: "family" },
    ],
  },
  all_locations: {
    msgs: [
      "Here are all our locations! 📍",
      "🏙️ Noida — Sector 18, 62, 63\n🏘️ Delhi — Ramesh Nagar, Subhash Nagar\n🌆 Gurugram — DLF, Sector 14, 29\n🏠 + More nearby areas",
      "Who is staying?",
    ],
    options: [
      { label: "💑 Couple Stay", next: "couple" },
      { label: "👨‍👩‍👧 Family / Group Stay", next: "family" },
    ],
  },
  contact: {
    msgs: [
      "You are one step away from your perfect stay! 🎉",
      "📲 Call or WhatsApp us right now:\n\n+91 8448-811165",
      "⏱️ Available 24/7 — We confirm FAST!\n\nJust tell us:\n• Location preference\n• Check-in date & time\n• Number of guests",
      "See you soon! 🏠✨",
    ],
    options: [{ label: "🔄 Start Over", next: "start" }],
  },
};

// ── Olive Green Color Palette ──
const C = {
  oliveDark:    "#3a4a1e",
  oliveMid:     "#556b2f",   // classic olive green
  oliveLight:   "#6b8c3a",
  oliveBright:  "#7aab3f",
  bgDark:       "#0e1208",
  bgMid:        "#161d0a",
  bgPanel:      "#1c2610",
  textLight:    "#e8f0d0",
  textMuted:    "rgba(232,240,208,0.45)",
  border:       "rgba(107,140,58,0.35)",
  borderFaint:  "rgba(107,140,58,0.15)",
};

const TYPING_DELAY = 950;

export default function ChatWidget() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, options]);

  useEffect(() => {
    if (open && !started) {
      setStarted(true);
      triggerFlow("start");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const addBotMessage = (text: string): Promise<void> =>
    new Promise((resolve) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text }]);
        resolve();
      }, TYPING_DELAY);
    });

  const triggerFlow = async (key: string): Promise<void> => {
    const step = FLOW[key];
    if (!step) return;
    setOptions([]);
    setIsTyping(true);
    for (const msg of step.msgs) {
      await addBotMessage(msg);
    }
    setIsTyping(false);
    setOptions(step.options);
  };

  const handleOption = (opt: Option): void => {
    setMessages((prev) => [...prev, { role: "user", text: opt.label }]);
    setOptions([]);
    triggerFlow(opt.next);
  };

  return (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform:translateY(20px) scale(0.95); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes fadeInMsg {
          from { opacity:0; transform:translateY(6px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes typingDot {
          0%,60%,100% { transform:translateY(0); opacity:0.4; }
          30%          { transform:translateY(-5px); opacity:1; }
        }
        @keyframes pulseBtn {
          0%,100% { box-shadow:0 8px 32px rgba(85,107,47,0.55),0 0 0 0 rgba(85,107,47,0.5); }
          50%      { box-shadow:0 8px 32px rgba(85,107,47,0.55),0 0 0 14px rgba(85,107,47,0); }
        }
        @keyframes blinkDot {
          0%,100% { opacity:1; }
          50%      { opacity:0.3; }
        }
        .opt-btn:hover {
          background: rgba(107,140,58,0.22) !important;
          border-color: rgba(107,140,58,0.7) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 16px rgba(85,107,47,0.25) !important;
        }
        #chat-messages::-webkit-scrollbar { width: 4px; }
        #chat-messages::-webkit-scrollbar-track { background: transparent; }
        #chat-messages::-webkit-scrollbar-thumb { background: rgba(107,140,58,0.25); border-radius:4px; }
      `}</style>

      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle chat"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.oliveBright}, ${C.oliveDark})`,
          color: "white",
          border: "none",
          cursor: "pointer",
          zIndex: 9999,
          fontSize: "26px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 32px rgba(85,107,47,0.55)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          animation: pulse ? "pulseBtn 1.5s ease-in-out infinite" : "none",
        }}
      >
        {open ? "✕" : "🏠"}
      </button>

      {/* ── Chat Box ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "340px",
            maxHeight: "540px",
            background: `linear-gradient(160deg, ${C.bgDark}, ${C.bgMid})`,
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9998,
            border: `1px solid ${C.border}`,
            boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
            animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 16px",
              background: `linear-gradient(90deg, ${C.bgPanel}, ${C.bgMid})`,
              borderBottom: `1px solid ${C.borderFaint}`,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${C.oliveBright}, ${C.oliveDark})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flexShrink: 0,
                boxShadow: `0 0 16px rgba(85,107,47,0.4)`,
              }}
            >
              🏠
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: C.textLight,
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.3px",
                }}
              >
                StayEasy — Book Your Stay
              </div>
              <div
                style={{
                  color: C.oliveLight,
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#6abf5e",
                    display: "inline-block",
                    boxShadow: "0 0 6px #6abf5e",
                    animation: "blinkDot 1.5s ease-in-out infinite",
                  }}
                />
                Online 24/7 · Noida · Delhi · Gurugram
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            id="chat-messages"
            style={{
              flex: 1,
              padding: "14px 12px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  animation: "fadeInMsg 0.25s ease",
                }}
              >
                {msg.role === "bot" && (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: `linear-gradient(135deg, ${C.oliveBright}, ${C.oliveDark})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      marginRight: "7px",
                      flexShrink: 0,
                      marginTop: "2px",
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
                        ? `linear-gradient(135deg, ${C.oliveMid}, ${C.oliveDark})`
                        : "rgba(255,255,255,0.06)",
                    color: C.textLight,
                    fontSize: "13px",
                    lineHeight: "1.6",
                    whiteSpace: "pre-line",
                    border:
                      msg.role === "bot"
                        ? `1px solid ${C.borderFaint}`
                        : "none",
                    boxShadow:
                      msg.role === "user"
                        ? "0 4px 16px rgba(85,107,47,0.35)"
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
                  gap: "7px",
                  animation: "fadeInMsg 0.25s ease",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: `linear-gradient(135deg, ${C.oliveBright}, ${C.oliveDark})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                  }}
                >
                  🏠
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${C.borderFaint}`,
                    borderRadius: "4px 16px 16px 16px",
                    padding: "10px 14px",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: C.oliveLight,
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
                gap: "7px",
                borderTop: `1px solid ${C.borderFaint}`,
                background: "rgba(0,0,0,0.2)",
                animation: "fadeInMsg 0.3s ease",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: C.textMuted,
                  textAlign: "center",
                  marginBottom: "2px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Choose an option
              </div>
              {options.map((opt, i) => (
                <button
                  key={i}
                  className="opt-btn"
                  onClick={() => handleOption(opt)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: `1px solid ${C.border}`,
                    background: "rgba(107,140,58,0.08)",
                    color: C.textLight,
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.18s ease",
                    letterSpacing: "0.2px",
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
              fontSize: "10px",
              color: C.textMuted,
              background: "rgba(0,0,0,0.15)",
              letterSpacing: "0.3px",
            }}
          >
            🔒 Safe · Private · Instant Booking
          </div>
        </div>
      )}
    </>
  );
}
