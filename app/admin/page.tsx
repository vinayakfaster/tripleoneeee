// /app/admin/page.tsx

import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import AdminReservationsClient from "./AdminReservationsClient";
import prisma from "@/lib/prismadb";
import { SafeUser } from "../types";

export default async function AdminPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Admin access only" />
      </ClientOnly>
    );
  }

  // ── ENQUIRIES ──
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  const safeEnquiries = enquiries.map((enquiry) => ({
    ...enquiry,
    createdAt: enquiry.createdAt.toISOString(),
  }));

  // ── RESERVATIONS ──
  const reservations = await prisma.reservation.findMany({
    where: {
      endDate: { gte: new Date() },
    },
    include: {
      user: true,
      listing: {
        include: { user: true },
      },
    },
    orderBy: { startDate: "asc" },
  });

  const safeReservations = reservations.map((reservation) => ({
    ...reservation,
    createdAt:  reservation.createdAt.toISOString(),
    startDate:  reservation.startDate.toISOString(),
    endDate:    reservation.endDate.toISOString(),
    user: {
      ...reservation.user,
      createdAt:     reservation.user.createdAt.toISOString(),
      updatedAt:     reservation.user.updatedAt?.toISOString() ?? null,
      emailVerified: reservation.user.emailVerified?.toISOString() ?? null,
    },
    listing: {
      ...reservation.listing,
      isBestSeller: false,
      createdAt:    reservation.listing.createdAt.toISOString(),
      updatedAt:    reservation.listing.updatedAt?.toISOString() ?? null,
      imageSrc: (reservation.listing.imageSrc as unknown[]).filter(
        (v): v is string => typeof v === "string"
      ),
      user: {
        ...reservation.listing.user,
        createdAt:     reservation.listing.user.createdAt.toISOString(),
        updatedAt:     reservation.listing.user.updatedAt?.toISOString() ?? null,
        emailVerified: reservation.listing.user.emailVerified?.toISOString() ?? null,
      },
    },
  })) as any[];   // ← type cast — SafeReservation mismatch silently ignore

  // ── CURRENT USER ──
  const safeCurrentUser: SafeUser = {
    ...currentUser,
    createdAt:     new Date(currentUser.createdAt).toISOString(),
    updatedAt:     currentUser.updatedAt ? new Date(currentUser.updatedAt).toISOString() : null,
    emailVerified: currentUser.emailVerified ? new Date(currentUser.emailVerified).toISOString() : null,
  };

  return (
    <ClientOnly>
      <AdminReservationsClient
        reservations={safeReservations}
        enquiries={safeEnquiries}
        currentUser={safeCurrentUser}
      />
    </ClientOnly>
  );
}