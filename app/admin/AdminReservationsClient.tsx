"use client";

import { SafeReservation, SafeUser } from "../../app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listing/ListingCard";

type Props = {
  reservations: SafeReservation[];
  enquiries: any[];
  currentUser?: SafeUser | null;
};

function AdminReservationsClient({
  reservations,
  enquiries = [],
  currentUser,
}: Props) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");

  // 🟢 Reservation cancel
  const onCancel = useCallback(
    (id: string) => {
      setLoadingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setLoadingId("");
        });
    },
    [router]
  );

  // 🟣 Enquiry status update
  const updateStatus = async (id: string, status: string) => {
    try {
      setLoadingId(id);

      await axios.patch(`/api/enquiries/${id}`, { status });

      toast.success("Updated successfully");
      router.refresh();
    } catch {
      toast.error("Error updating");
    } finally {
      setLoadingId("");
    }
  };

  // 🔥 Split enquiry data
  const pending = enquiries.filter((e) => e.status === "pending" || !e.status);
  const checkedIn = enquiries.filter((e) => e.status === "checked_in");
  const checkedOut = enquiries.filter((e) => e.status === "checked_out");

  return (
    <Container>
      <Heading
        title="Admin Dashboard"
        subtitle="Reservations & Guest Flow Management"
      />

      {/* ================= RESERVATIONS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 px-4 sm:px-6 md:px-8">
        {reservations.map((reservation) => {
          const host = reservation.listing.user;
          const guest = reservation.user;

          const now = new Date();
          const start = new Date(reservation.startDate);
          const end = new Date(reservation.endDate);

          const isUpcoming = start > now;
          const isOngoing = start <= now && end >= now;

          let statusLabel = "";
          let statusClass = "";

          if (isUpcoming) {
            statusLabel = "Upcoming";
            statusClass = "bg-yellow-100 text-yellow-800";
          } else if (isOngoing) {
            statusLabel = "Ongoing";
            statusClass = "bg-blue-100 text-blue-800";
          } else {
            statusLabel = "Completed";
            statusClass = "bg-gray-100 text-gray-800";
          }

          return (
            <div
              key={reservation.id}
              className="flex flex-col border rounded-xl overflow-hidden bg-white"
            >
              <ListingCard
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={loadingId === reservation.id}
                actionLabel="Cancel"
                currentUser={currentUser}
              />

              <div className="text-sm p-4 bg-gray-50 space-y-1">
                <p>
                  <b>Host:</b> {host?.name}
                </p>
                <p>
                  <b>Guest:</b> {guest?.name}
                </p>
                <p>
                  <b>Guests:</b> {reservation.guestCount}
                </p>

                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`px-2 py-1 text-xs rounded ${statusClass}`}
                  >
                    {statusLabel}
                  </span>
                </p>

                <p>
                  <b>Payment:</b>{" "}
                  {reservation.paymentId ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Unpaid</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= ENQUIRIES ================= */}

      {/* 🟡 Pending */}
      <h2 className="text-2xl font-bold mt-12 mb-4">
        Pending Enquiries
      </h2>

      {pending.length === 0 && (
        <p className="text-gray-500">No pending enquiries</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {pending.map((e) => (
          <div
            key={e.id}
            className="border rounded-xl p-4 flex justify-between items-center bg-white"
          >
            <div>
              <p className="font-semibold">{e.listingTitle}</p>
              <p className="text-sm text-gray-500">
                {e.name} • {e.phone}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(e.id, "rejected")}
                disabled={loadingId === e.id}
                className="bg-red-100 text-red-600 px-3 py-1 rounded"
              >
                ❌
              </button>

              <button
                onClick={() => updateStatus(e.id, "checked_in")}
                disabled={loadingId === e.id}
                className="bg-green-100 text-green-600 px-3 py-1 rounded"
              >
                ✅
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🟢 Checked In */}
      <h2 className="text-2xl font-bold mt-12 mb-4">
        Checked In
      </h2>

      {checkedIn.length === 0 && (
        <p className="text-gray-500">No active guests</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {checkedIn.map((e) => (
          <div
            key={e.id}
            className="border rounded-xl p-4 flex justify-between items-center bg-white"
          >
            <div>
              <p className="font-semibold">{e.listingTitle}</p>
              <p className="text-sm text-gray-500">
                {e.name} • In:{" "}
                {e.checkedInAt
                  ? new Date(e.checkedInAt).toLocaleString()
                  : "—"}
              </p>
            </div>

            <button
              onClick={() => updateStatus(e.id, "checked_out")}
              disabled={loadingId === e.id}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded"
            >
              Checkout
            </button>
          </div>
        ))}
      </div>

      {/* ⚫ Checked Out */}
      <h2 className="text-2xl font-bold mt-12 mb-4">
        Checked Out
      </h2>

      {checkedOut.length === 0 && (
        <p className="text-gray-500">No completed stays</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {checkedOut.map((e) => (
          <div key={e.id} className="border rounded-xl p-4 bg-white">
            <p className="font-semibold">{e.listingTitle}</p>
            <p className="text-sm text-gray-500">
              {e.name}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              In:{" "}
              {e.checkedInAt
                ? new Date(e.checkedInAt).toLocaleString()
                : "-"}
              <br />
              Out:{" "}
              {e.checkedOutAt
                ? new Date(e.checkedOutAt).toLocaleString()
                : "-"}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AdminReservationsClient;