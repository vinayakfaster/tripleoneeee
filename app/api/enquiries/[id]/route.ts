import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "Status required" },
        { status: 400 }
      );
    }

    let data: any = { status };

    if (status === "checked_in") {
      data.checkedInAt = new Date();
    }

    if (status === "checked_out") {
      data.checkedOutAt = new Date();
    }

    if (status === "rejected") {
      data.checkedInAt = null;
      data.checkedOutAt = null;
    }

    const enquiry = await prisma.enquiry.update({
      where: {
        id: params.id, // Mongo works fine with string ObjectId
      },
      data,
    });

    return NextResponse.json(enquiry);
  } catch (error) {
    console.error("ENQUIRY PATCH ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}