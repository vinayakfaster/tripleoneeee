// /app/api/listings/route.ts

import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue,
      price,
      contactPhone,
    } = body;

    // ── Validate required fields ──
    const missing: string[] = [];
    if (!title)         missing.push("title");
    if (!description)   missing.push("description");
    if (!category)      missing.push("category");
    if (!locationValue) missing.push("locationValue");
    if (!price)         missing.push("price");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // ── Validate imageSrc ──
    const images = Array.isArray(imageSrc) ? imageSrc : (imageSrc ? [imageSrc] : []);
    if (images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc:      images,       // Json[] in schema
        category,
        roomCount:     Number(roomCount)     || 1,
        bathroomCount: Number(bathroomCount) || 1,
        guestCount:    Number(guestCount)    || 1,
        locationValue,
        price:         Number(price),
        contactPhone:  contactPhone || null,
        userId:        currentUser.id,
      },
    });

    return NextResponse.json(listing, { status: 201 });

  } catch (error: any) {
    console.error("LISTING CREATE ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId       = searchParams.get("userId");
    const locationValue = searchParams.get("locationValue");
    const category     = searchParams.get("category");
    const guestCount   = searchParams.get("guestCount");

    const where: any = {};
    if (userId)        where.userId = userId;
    if (locationValue) where.locationValue = { contains: locationValue, mode: "insensitive" };
    if (category)      where.category = category;
    if (guestCount)    where.guestCount = { gte: Number(guestCount) };

    const listings = await prisma.listing.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    // Serialize dates
    const safe = listings.map((l) => ({
      ...l,
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt ? l.updatedAt.toISOString() : null,
      imageSrc: (l.imageSrc as unknown as string[]).filter(
        (v): v is string => typeof v === "string"
      ),
      user: {
        ...l.user,
        createdAt:     l.user.createdAt.toISOString(),
        updatedAt:     l.user.updatedAt ? l.user.updatedAt.toISOString() : null,
        emailVerified: l.user.emailVerified ? l.user.emailVerified.toISOString() : null,
      },
    }));

    return NextResponse.json(safe);
  } catch (error: any) {
    console.error("LISTING GET ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}