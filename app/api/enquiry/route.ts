import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
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
      guestId,
    } = body;

    if (!listingId || !name || !phone) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        listingId,
        userId: currentUser?.id || null,
        name,
        phone,
        email,
        message,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        guestCount: guestCount ? Number(guestCount) : 0,
        listingTitle,
        listingImage,
      },
    });

    return NextResponse.json(enquiry);
  } catch (error: any) {
    console.error("ENQUIRY API ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}