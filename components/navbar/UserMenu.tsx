"use client";

import useLoginModel from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import useRentModal from "@/hook/useRentModal";
import useContactModal from "@/hook/useContactModal";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SafeUser } from "../../app/types";
import { signOut } from "next-auth/react";
import { useCallback, useState } from "react";
import { FaHome } from "react-icons/fa";

type Props = {
  currentUser?: SafeUser | null;
  scrolled?: boolean; // passed from Navbar — controls text/icon color on hero
};

function UserMenu({ currentUser, scrolled = true }: Props) {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal    = useLoginModel();
  const rentModal     = useRentModal();
  const contactModal  = useContactModal();

  const [open, setOpen] = useState(false);

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    if (currentUser.role === "host" || currentUser.role === "admin") {
      return rentModal.onOpen();
    }
    contactModal.onOpen();
  }, [currentUser, loginModal, rentModal, contactModal]);

  // Color based on hero (transparent) vs scrolled (white bg)
  const textColor   = scrolled ? "#1a0f00"             : "rgba(255,255,255,0.92)";
  const borderColor = scrolled ? "rgba(196,169,122,0.5)" : "rgba(255,255,255,0.35)";
  const bgHover     = scrolled ? "rgba(196,169,122,0.08)" : "rgba(255,255,255,0.12)";

  return (
    <div className="relative flex items-center gap-2">

      {/* ── MAIN BAR ── */}
      <div
        className="flex items-center gap-3 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
        style={{ border: `1px solid ${borderColor}` }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
      >
        {/* Become a host — only when logged in */}
        {currentUser && (
          <div
            onClick={(e) => { e.stopPropagation(); onRent(); }}
            className="flex items-center gap-1.5 text-xs font-medium cursor-pointer transition"
            style={{ color: textColor }}
            title="Become a host"
          >
            <FaHome size={14} style={{ color: scrolled ? "#9e7d4b" : "rgba(255,255,255,0.8)" }} />
            <span className="hidden md:block" style={{ letterSpacing: "0.04em" }}>Host</span>
          </div>
        )}

        {/* Divider */}
        {currentUser && (
          <div style={{ width: "1px", height: "16px", background: borderColor }} />
        )}

        {/* NOT logged in: Login + Sign up */}
        {!currentUser && (
          <div className="flex items-center gap-2">
            <span
              onClick={(e) => { e.stopPropagation(); loginModal.onOpen(); }}
              className="text-xs font-semibold cursor-pointer transition hover:opacity-70"
              style={{ color: textColor, letterSpacing: "0.04em" }}
            >
              Login
            </span>
            <span style={{ color: borderColor }}>·</span>
            <span
              onClick={(e) => { e.stopPropagation(); registerModal.onOpen(); }}
              className="hidden md:block text-xs font-semibold cursor-pointer transition hover:opacity-70"
              style={{ color: textColor, letterSpacing: "0.04em" }}
            >
              Sign up
            </span>
          </div>
        )}

        {/* Logged in: Avatar */}
        {currentUser && (
          <Image
            className="rounded-full object-cover"
            height={30}
            width={30}
            alt="Avatar"
            src={currentUser?.image || "/assets/avatar.png"}
            style={{
              border: `2px solid ${scrolled ? "#c4a97a" : "rgba(255,255,255,0.5)"}`,
            }}
          />
        )}

        {/* Hamburger lines (menu indicator) */}
        <div className="flex flex-col gap-[3px]">
          {[0,1,2].map(i => (
            <span
              key={i}
              style={{
                display: "block", width: "14px", height: "1.5px",
                borderRadius: "2px",
                background: scrolled ? "#6b5744" : "rgba(255,255,255,0.75)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── DROPDOWN — logged in ── */}
      {currentUser && open && (
        <div
          className="absolute top-12 right-0 z-[9999] rounded-sm shadow-2xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid #e8dfd0",
            minWidth: "200px",
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* Gold top accent */}
          <div style={{ height: "2px", background: "linear-gradient(to right, #9e7d4b, #c4a97a)" }} />

          <div style={{ padding: "8px 0" }}>
            {[
              { icon: "🧳", label: "My Trips",       path: "/trips" },
              { icon: "📆", label: "Reservations",   path: "/reservations" },
              { icon: "❤️", label: "Favourites",     path: "/favorites" },
              { icon: "🏡", label: "My Properties",  path: "/properties" },
            ].map(({ icon, label, path }) => (
              <div
                key={label}
                onClick={() => { router.push(path); setOpen(false); }}
                className="flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors"
                style={{
                  fontFamily: "'Lato', sans-serif", fontSize: "13px",
                  color: "#2a1a0a", letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#faf7f2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontSize: "15px" }}>{icon}</span>
                {label}
              </div>
            ))}

            {currentUser.role === "admin" && (
              <div
                onClick={() => { router.push("/admin"); setOpen(false); }}
                className="flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors"
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#9e7d4b" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#faf7f2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span>🛠</span> Admin Panel
              </div>
            )}

            {/* Divider */}
            <div style={{ height: "1px", background: "#f0e8da", margin: "6px 0" }} />

            {/* Logout */}
            <div
              onClick={() => { signOut(); setOpen(false); }}
              className="flex items-center gap-3 px-5 py-2.5 cursor-pointer transition-colors"
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#c0392b" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span>🚪</span> Logout
            </div>
          </div>
        </div>
      )}

      {/* ── DROPDOWN — not logged in ── */}
      {!currentUser && open && (
        <div
          className="absolute top-12 right-0 z-[9999] rounded-sm shadow-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #e8dfd0", minWidth: "180px" }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div style={{ height: "2px", background: "linear-gradient(to right, #9e7d4b, #c4a97a)" }} />
          <div style={{ padding: "8px 0" }}>
            <div
              onClick={() => { loginModal.onOpen(); setOpen(false); }}
              className="flex items-center gap-3 px-5 py-2.5 cursor-pointer"
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#2a1a0a", fontWeight: 600 }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#faf7f2")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Login
            </div>
            <div
              onClick={() => { registerModal.onOpen(); setOpen(false); }}
              className="flex items-center gap-3 px-5 py-2.5 cursor-pointer"
              style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#2a1a0a" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#faf7f2")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Sign up
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;