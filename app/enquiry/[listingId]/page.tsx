import prisma from "@/lib/prismadb";
import EnquiryClient from "./EnquiryClient";

interface Params {
  listingId: string;
}

export default async function EnquiryPage({ params }: { params: Params }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.listingId },
  });

  if (!listing) {
    return <div className="p-10 text-center">Listing not found</div>;
  }

  return <EnquiryClient listing={listing} />;
}