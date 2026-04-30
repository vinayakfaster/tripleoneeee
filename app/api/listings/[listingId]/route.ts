import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

// ── DELETE listing ────────────────────────────────────────────────────────────
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing || listing.userId !== currentUser.id) {
    return NextResponse.json(
      { error: "Unauthorized or listing not found" },
      { status: 403 }
    );
  }

  await prisma.listing.delete({
    where: { id: listingId },
  });

  return NextResponse.json({ success: true });
}

// ── PATCH listing ─────────────────────────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
  }

  const body = await req.json();
  const { newTitle, newPrice } = body;

  if (!newTitle || typeof newPrice !== "number" || isNaN(newPrice)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existingListing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!existingListing || existingListing.userId !== currentUser.id) {
    return NextResponse.json(
      { error: "Unauthorized or listing not found" },
      { status: 403 }
    );
  }

  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data: {
      title: newTitle,
      price: newPrice,
    },
  });

  return NextResponse.json(updatedListing);
}