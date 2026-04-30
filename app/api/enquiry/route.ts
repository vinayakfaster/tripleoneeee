import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name, phone, email, message,
      purposeOfStay, guestCount, needStay,
      startDate, endDate,
      listingId, listingTitle, listingImage,
      userId, guestId,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const fullMessage = [
      message       ? `Message: ${message}`             : null,
      purposeOfStay ? `Purpose: ${purposeOfStay}`       : null,
      needStay      ? `Need accommodation: ${needStay}` : null,
    ]
      .filter(Boolean)
      .join("\n") || null;

    const enquiry = await prisma.enquiry.create({
      data: {
        name:  String(name),
        phone: String(phone),
        email: email ? String(email) : "",

        message:      fullMessage,
        guestCount:   guestCount ? Number(guestCount) : null,
        startDate:    startDate  ? new Date(startDate) : null,
        endDate:      endDate    ? new Date(endDate)   : null,
        listingTitle: listingTitle ? String(listingTitle) : null,
        listingImage: listingImage ? String(listingImage) : null,
        guestId:      guestId      ? String(guestId)      : null,
        status:       "pending",
        listingId:    listingId    ? String(listingId)    : "",
        ...(userId ? { userId: String(userId) } : {}),
      },
    });

    return NextResponse.json(enquiry, { status: 201 });
  } catch (error: unknown) {
    console.error("ENQUIRY POST ERROR:", error);
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(enquiries);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}