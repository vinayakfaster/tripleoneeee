import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const {
    listingId,
    name,
    phone,
    email,
    message,
    startDate,
    endDate,
    guestCount,
    listingTitle,
    listingImage,
  } = body;

  if (!listingId || !name || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const enquiry = await prisma.enquiry.create({
    data: {
      listingId,
      userId: currentUser?.id,
      name,
      phone,
      email,
      message,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      guestCount,
      listingTitle,
      listingImage,
    },
  });

  return NextResponse.json(enquiry);
}