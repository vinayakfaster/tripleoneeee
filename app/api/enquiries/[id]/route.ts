import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
 
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const { id } = params;
 
    const updateData: Record<string, unknown> = { status };
 
    if (status === "checked_in")  updateData.checkedInAt  = new Date();
    if (status === "checked_out") updateData.checkedOutAt = new Date();
 
    const updated = await prisma.enquiry.update({
      where: { id },
      data: updateData,
    });
 
    return NextResponse.json(updated);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}