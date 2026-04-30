"use client";

import { SafeReservation, SafeUser } from "../../app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import Container from "@/components/Container";
import ListingCard from "@/components/listing/ListingCard";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  guestCount?: number | null;
  needStay?: string | null;
  startDate?: string | null;    // ✅ string, not Date
  endDate?: string | null;      // ✅ string, not Date
  listingId?: string | null;
  listingTitle?: string | null;
  listingImage?: string | null;
  userId?: string | null;
  guestId?: string | null;
  status?: string | null;
  checkedInAt?: string | null;  // ✅ string, not Date
  checkedOutAt?: string | null; // ✅ string, not Date
  createdAt: string;            // ✅ string, not Date
}

type Props = {
  reservations: SafeReservation[];
  enquiries: Enquiry[];
  currentUser?: SafeUser | null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

// ── Palette ───────────────────────────────────────────────────────────────────
const OL = {
  900: "#1a2210", 600: "#3d5228", 500: "#556b35", 400: "#6b8540",
  gold: "#c4a97a", goldLight: "rgba(196,169,122,0.25)", cream: "#f5f2ea",
};

// ── Enquiry card ──────────────────────────────────────────────────────────────
function EnquiryCard({
  e, loadingId, onUpdate,
}: {
  e: Enquiry;
  loadingId: string;
  onUpdate: (id: string, status: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const busy = loadingId === e.id;

  const statusColor: Record<string, string> = {
    pending:     "#d97706",
    checked_in:  "#16a34a",
    checked_out: "#6b7280",
    rejected:    "#dc2626",
  };
  const status = e.status ?? "pending";

  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${OL.goldLight}`,
      borderLeft: `3px solid ${statusColor[status] ?? OL[400]}`,
      padding: "16px 18px",
      transition: "box-shadow 0.2s",
    }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 400, color: OL[900] }}>
              {e.name}
            </span>
            <span style={{
              fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
              padding: "2px 8px", fontFamily: "'Lato', sans-serif",
              background: `${statusColor[status]}18`,
              color: statusColor[status] ?? OL[400],
              border: `1px solid ${statusColor[status]}40`,
            }}>
              {status.replace("_", " ")}
            </span>
          </div>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#6b7060", marginTop: 3 }}>
            📞 {e.phone}
            {e.email && <> · ✉️ {e.email}</>}
          </p>
          {e.listingTitle && (
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: OL[500], marginTop: 2 }}>
              🏠 {e.listingTitle}
            </p>
          )}
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, color: OL.gold, letterSpacing: "1px" }}>
            {timeAgo(e.createdAt)}
          </p>
          {e.startDate && (
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, color: "#6b7060", marginTop: 2 }}>
              📅 {fmt(e.startDate)}
            </p>
          )}
          {e.guestCount && (
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, color: "#6b7060", marginTop: 2 }}>
              👥 {e.guestCount} guests
            </p>
          )}
        </div>
      </div>

      {/* Expand details */}
      {e.message && (
        <button
          onClick={() => setExpanded(v => !v)}
          style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "1.5px",
            textTransform: "uppercase", color: OL[400], background: "none",
            border: "none", cursor: "pointer", marginTop: 8, padding: 0 }}
        >
          {expanded ? "▲ Hide details" : "▼ Show message"}
        </button>
      )}
      {expanded && e.message && (
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#5a5a4a",
          background: OL.cream, padding: "10px 12px", marginTop: 8,
          borderLeft: `2px solid ${OL.goldLight}`, lineHeight: 1.6 }}>
          {e.message}
        </p>
      )}

      {/* Check-in/out timestamps */}
      {(e.checkedInAt || e.checkedOutAt) && (
        <div style={{ marginTop: 10, fontFamily: "'Lato', sans-serif", fontSize: 10,
          color: "#6b7060", display: "flex", gap: 16, flexWrap: "wrap" }}>
          {e.checkedInAt  && <span>✅ In: {fmt(e.checkedInAt)}</span>}
          {e.checkedOutAt && <span>🚪 Out: {fmt(e.checkedOutAt)}</span>}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {status === "pending" && (
          <>
            <button disabled={busy} onClick={() => onUpdate(e.id, "checked_in")}
              style={{ padding: "7px 14px", background: `linear-gradient(135deg, ${OL[500]}, ${OL[600]})`,
                color: OL.cream, border: "none", fontFamily: "'Lato', sans-serif",
                fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase",
                cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.6 : 1 }}>
              ✅ Check In
            </button>
            <button disabled={busy} onClick={() => onUpdate(e.id, "rejected")}
              style={{ padding: "7px 14px", background: "rgba(220,53,69,0.08)",
                color: "#dc2626", border: "1px solid rgba(220,53,69,0.25)",
                fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "1.5px",
                textTransform: "uppercase", cursor: busy ? "not-allowed" : "pointer",
                opacity: busy ? 0.6 : 1 }}>
              ✕ Reject
            </button>
          </>
        )}
        {status === "checked_in" && (
          <button disabled={busy} onClick={() => onUpdate(e.id, "checked_out")}
            style={{ padding: "7px 16px", background: "rgba(37,99,235,0.08)",
              color: "#2563eb", border: "1px solid rgba(37,99,235,0.25)",
              fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "1.5px",
              textTransform: "uppercase", cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.6 : 1 }}>
            🚪 Check Out
          </button>
        )}
        {/* WhatsApp quick contact */}
        <a
          href={`https://wa.me/${e.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(e.name)}%2C%20this%20is%20TripleOne%20regarding%20your%20enquiry.`}
          target="_blank" rel="noreferrer"
          style={{ padding: "7px 14px", background: "rgba(37,211,102,0.08)",
            color: "#16a34a", border: "1px solid rgba(37,211,102,0.3)",
            fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "1.5px",
            textTransform: "uppercase", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 4 }}>
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHead({ title, count }: { title: string; count: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "40px 0 16px" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${OL.goldLight})` }} />
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
        fontSize: "clamp(18px,2.2vw,24px)", color: OL[900], whiteSpace: "nowrap",
        margin: 0 }}>
        {title}
        <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 11,
          letterSpacing: "2px", color: OL.gold, marginLeft: 10 }}>
          ({count})
        </span>
      </h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${OL.goldLight})` }} />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function AdminReservationsClient({ reservations, enquiries = [], currentUser }: Props) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setLoadingId(id);
    axios.delete(`/api/reservations/${id}`)
      .then(() => { toast.success("Reservation cancelled"); router.refresh(); })
      .catch(() => toast.error("Something went wrong."))
      .finally(() => setLoadingId(""));
  }, [router]);

  const updateStatus = async (id: string, status: string) => {
    setLoadingId(id);
    try {
      await axios.patch(`/api/enquiries/${id}`, { status });
      toast.success("Updated");
      router.refresh();
    } catch {
      toast.error("Error updating");
    } finally {
      setLoadingId("");
    }
  };

  const pending    = enquiries.filter(e => !e.status || e.status === "pending");
  const checkedIn  = enquiries.filter(e => e.status === "checked_in");
  const checkedOut = enquiries.filter(e => e.status === "checked_out");
  const rejected   = enquiries.filter(e => e.status === "rejected");

  return (
    <div style={{ minHeight: "100vh", background: OL.cream, paddingBottom: 60 }}>

      {/* ── Page header ── */}
      <div style={{ background: OL[900], padding: "32px 24px 28px" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 9,
            letterSpacing: "5px", textTransform: "uppercase",
            color: OL.gold, marginBottom: 8 }}>
            TripleOne · Admin
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(28px,3.5vw,42px)", color: "#fff",
            margin: 0, letterSpacing: "1px" }}>
            Dashboard
          </h1>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
            {[
              { label: "Total Enquiries", val: enquiries.length },
              { label: "Pending",         val: pending.length,   accent: "#d97706" },
              { label: "Checked In",      val: checkedIn.length, accent: "#16a34a" },
              { label: "Checked Out",     val: checkedOut.length },
              { label: "Reservations",    val: reservations.length },
            ].map(s => (
              <div key={s.label} style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${s.accent ? `${s.accent}40` : "rgba(196,169,122,0.15)"}`,
                padding: "12px 20px", minWidth: 90,
              }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 28, fontWeight: 300, color: s.accent ?? OL.gold,
                  margin: 0, lineHeight: 1 }}>
                  {s.val}
                </p>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 9,
                  letterSpacing: "2px", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)", margin: "4px 0 0" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container>

        {/* ══ ENQUIRIES ══ */}

        {/* Pending */}
        <SectionHead title="Pending Enquiries" count={pending.length} />
        {pending.length === 0
          ? <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#a09080" }}>No pending enquiries</p>
          : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {pending.map(e => <EnquiryCard key={e.id} e={e} loadingId={loadingId} onUpdate={updateStatus} />)}
            </div>
        }

        {/* Checked In */}
        <SectionHead title="Checked In" count={checkedIn.length} />
        {checkedIn.length === 0
          ? <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#a09080" }}>No active guests</p>
          : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {checkedIn.map(e => <EnquiryCard key={e.id} e={e} loadingId={loadingId} onUpdate={updateStatus} />)}
            </div>
        }

        {/* Checked Out */}
        <SectionHead title="Checked Out" count={checkedOut.length} />
        {checkedOut.length === 0
          ? <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#a09080" }}>No completed stays</p>
          : <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {checkedOut.map(e => <EnquiryCard key={e.id} e={e} loadingId={loadingId} onUpdate={updateStatus} />)}
            </div>
        }

        {/* Rejected (collapsible) */}
        {rejected.length > 0 && (
          <>
            <SectionHead title="Rejected" count={rejected.length} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10, opacity: 0.65 }}>
              {rejected.map(e => <EnquiryCard key={e.id} e={e} loadingId={loadingId} onUpdate={updateStatus} />)}
            </div>
          </>
        )}

        {/* ══ RESERVATIONS ══ */}
        {reservations.length > 0 && (
          <>
            <SectionHead title="Reservations" count={reservations.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {reservations.map((reservation) => {
                const now   = new Date();
                const start = new Date(reservation.startDate);
                const end   = new Date(reservation.endDate);
                const isUpcoming = start > now;
                const isOngoing  = start <= now && end >= now;
                const statusLabel = isUpcoming ? "Upcoming" : isOngoing ? "Ongoing" : "Completed";
                const statusColor = isUpcoming ? "#d97706" : isOngoing ? "#2563eb" : "#6b7280";

                return (
                  <div key={reservation.id}
                    style={{ border: `1px solid ${OL.goldLight}`,
                      background: "#fff", overflow: "hidden" }}>
                    <ListingCard
                      data={reservation.listing}
                      reservation={reservation}
                      actionId={reservation.id}
                      onAction={onCancel}
                      disabled={loadingId === reservation.id}
                      actionLabel="Cancel"
                      currentUser={currentUser}
                    />
                    <div style={{ padding: "12px 16px",
                      background: OL.cream, fontFamily: "'Lato', sans-serif",
                      fontSize: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                      <p><b style={{ color: OL[600] }}>Host:</b> {reservation.listing.user?.name}</p>
                      <p><b style={{ color: OL[600] }}>Guest:</b> {reservation.user?.name}</p>
                      <p><b style={{ color: OL[600] }}>Guests:</b> {reservation.guestCount}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                        <span style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase",
                          padding: "2px 8px", color: statusColor,
                          background: `${statusColor}14`,
                          border: `1px solid ${statusColor}35` }}>
                          {statusLabel}
                        </span>
                        <span style={{ fontSize: 9, letterSpacing: "1px", textTransform: "uppercase",
                          color: reservation.paymentId ? "#16a34a" : "#dc2626" }}>
                          {reservation.paymentId ? "✅ Paid" : "⚠ Unpaid"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

      </Container>
    </div>
  );
}