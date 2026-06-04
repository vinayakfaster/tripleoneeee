// ✅ Save this file at: app/gallery/page.tsx
// This is the MISSING file that was causing 404

import GalleryPage from "@/components/GalleryPage";

export const metadata = {
  title: "Gallery | TripleOne",
  description: "Explore our premium properties",
};

export default function GalleryRoute() {
  // No onClose prop — standalone page mode
  return <GalleryPage />;
}