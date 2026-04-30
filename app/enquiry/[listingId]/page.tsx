import prisma from "@/lib/prismadb";
import EnquiryClient from "./EnquiryClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Params {
  listingId: string;
}

export default async function EnquiryPage({ params }: { params: Params }) {
  const id = params.listingId;

  if (!id || id.includes("%")) {
    return <div className="p-10 text-center">Invalid Listing ID</div>;
  }

const listingRaw = await prisma.listing.findUnique({
  where: { id },
});

const listing = listingRaw
  ? JSON.parse(JSON.stringify(listingRaw))
  : null;

  const currentUser = await getCurrentUser();

  if (!listing) {
    return <div className="p-10 text-center">Listing not found</div>;
  }

  return (
   <EnquiryClient
  listing={{
    ...listing,
    id: listing.id,
    createdAt: typeof listing.createdAt === 'string' 
      ? listing.createdAt 
      : listing.createdAt.toISOString(),
  }}
  currentUser={currentUser}
/>
  );
}