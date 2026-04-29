"use client";

import useCountries from "@/hook/useCountries";
import { SafeUser } from "../../app/types";
import React, { useState } from "react";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Offers from "../Offers";
import TripShieldModal from "../models/TripShieldModal";
import FormattedDescription from "@/components/FormattedDescription";
import Image from "next/image";

type Props = {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: { icon: IconType; label: string; description: string } | undefined;
  locationValue: string;
  images: { url: string; label: string }[];
};

const highlights = [
  ["🌀", "Designed for staying cool", "Beat the heat with the A/C and ceiling fan."],
  ["🚪", "Self check-in", "You can check in with the building staff."],
  ["📅", "Free cancellation", "Get a full refund if you change your mind."],
  ["📶", "Fast Wi-Fi", "Stream, work, or game with high-speed internet."],
  ["🛏️", "Premium bedding", "Enjoy extra-comfy pillows and fresh linens."],
  ["🍳", "Fully-equipped kitchen", "Cook your favorite meals with all the essentials."],
  ["🧼", "Sparkling clean", "Rated 5 stars for cleanliness by recent guests."],
  ["🚿", "Modern bathroom", "Spacious shower with luxury toiletries."],
  ["🧳", "Luggage drop-off", "Convenient for early arrivals or late departures."],
  ["🎧", "Quiet space", "Perfect for remote work or undisturbed rest."],
  ["🌇", "Great view", "Overlooks the city skyline or lush garden."],
  ["🚗", "Easy parking", "Paid parking available right on premises."],
  ["☕", "Coffee & tea station", "Complimentary beverages for your stay."],
  ["📺", "Streaming-ready TV", "Watch Netflix, YouTube, and more."],
  ["🧯", "Safety equipped", "Fire extinguisher, first aid, and smart lock."],
  ["🔑", "24/7 access", "Check-in any time with a secure smart lock."],
  ["📍", "Prime location", "Walkable to top cafes, shops, and transit."],
];

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#b89b72]/40" />
      <div className="text-[#b89b72] text-sm">✦</div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#b89b72]/40" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-5">
      {children}
    </p>
  );
}

function ListingInfo({
  user, description, guestCount, roomCount, bathroomCount,
  category, locationValue, images,
}: Props) {
  const { getByValue } = useCountries();
  const [showAll, setShowAll] = useState(false);
  const [isTripShieldOpen, setIsTripShieldOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const visibleItems = showAll ? highlights : highlights.slice(0, 6);

  return (
    <div className="flex flex-col">

      {/* ── HOST ROW ── */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#b89b72]">
            <Avatar src="/images/tripleone-avatar.png" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-0.5">Hosted & managed by</p>
          <p className="text-base font-semibold text-neutral-800" style={{ fontFamily: "Georgia, serif" }}>
            <span className="text-[#b89b72]">TripleOne</span> Stays
          </p>
        </div>
        {/* Verified badge */}
        <div className="ml-auto flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
          <span className="text-green-500 text-xs">✓</span>
          <span className="text-xs text-green-700 font-medium">Verified</span>
        </div>
      </div>

      <GoldDivider />

      {/* ── PHOTO GRID (Leela style) ── */}
      {images.length > 0 && (
        <div id="gallery" className="mb-2">
          <SectionTitle>Gallery</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.slice(0, 6).map((img, i) => (
              <div
                key={i}
                onClick={() => setLightboxIdx(i)}
                className={`relative overflow-hidden cursor-pointer group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                style={{ height: i === 0 ? "320px" : "155px" }}
              >
                <Image
                  src={img.url}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                {/* Last image: show all */}
                {i === 5 && images.length > 6 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <p className="text-white text-sm font-semibold">+{images.length - 6} more</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxIdx(null)}
        >
          <button className="absolute top-5 right-5 text-white text-3xl">✕</button>
          <button
            className="absolute left-5 text-white text-4xl px-3"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + images.length) % images.length); }}
          >‹</button>
          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[lightboxIdx].url} alt="" fill className="object-contain" />
          </div>
          <button
            className="absolute right-5 text-white text-4xl px-3"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % images.length); }}
          >›</button>
          <p className="absolute bottom-5 text-white/60 text-sm">{lightboxIdx + 1} / {images.length}</p>
        </div>
      )}

      <GoldDivider />

      {/* ── CATEGORY ── */}
      {category && (
        <>
          <ListingCategory icon={category.icon} label={category.label} description={category.description} />
          <GoldDivider />
        </>
      )}

      {/* ── GUEST FAVOURITE ── */}
      <div id="overview" className="bg-[#1a1a1a] rounded-none p-6 md:p-8 mb-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] mb-2">Recognition</p>
            <p className="text-white text-lg font-semibold" style={{ fontFamily: "Georgia, serif" }}>
              Guest Favourite
            </p>
            <p className="text-neutral-400 text-sm mt-1 max-w-[200px]">
              One of the most loved stays on our platform
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center border-r border-neutral-700 pr-6">
              <p className="text-3xl font-bold text-white">4.88</p>
              <p className="text-[#b89b72] text-xs mt-1">★★★★★</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">52</p>
              <p className="text-xs text-neutral-400 mt-1">Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <GoldDivider />

      {/* ── ABOUT ── */}
      <div id="about">
        <SectionTitle>About this stay</SectionTitle>
        <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed">
          <FormattedDescription description={description} />
        </div>
      </div>

      <GoldDivider />

      {/* ── TRIPSHIELD ── */}
      <div className="relative overflow-hidden border border-[#b89b72]/30 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] p-6 md:p-8">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#b89b72]/10 blur-3xl pointer-events-none" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] mb-3">Protection</p>
        <p className="text-2xl font-black text-white tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
          Trip<span className="text-[#b89b72]">Shield</span>
        </p>
        <p className="text-sm text-neutral-300 mt-2 leading-relaxed max-w-sm">
          Every booking includes free protection from host cancellations,
          inaccurate listings, and check-in issues.
        </p>
        <button
          onClick={() => setIsTripShieldOpen(true)}
          className="mt-4 text-xs uppercase tracking-widest text-[#b89b72] hover:text-white transition font-semibold border-b border-[#b89b72]/50 hover:border-white pb-0.5"
        >
          Learn more →
        </button>
      </div>

      <TripShieldModal isOpen={isTripShieldOpen} onClose={() => setIsTripShieldOpen(false)} />

      <GoldDivider />

      {/* ── AMENITIES ── */}
      <div id="amenities">
        <SectionTitle>What this place offers</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {visibleItems.map(([icon, title, desc], i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 border border-[#e5d3b3]/60 bg-white hover:border-[#b89b72] hover:shadow-sm transition group"
            >
              <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform">{icon}</span>
              <div>
                <p className="font-semibold text-sm text-neutral-800">{title}</p>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 text-xs uppercase tracking-widest font-semibold text-[#b89b72] hover:text-neutral-900 transition border-b border-[#b89b72]/50 pb-0.5"
        >
          {showAll ? "Show less ↑" : `Show all ${highlights.length} amenities ↓`}
        </button>
      </div>

      <GoldDivider />

      {/* ── OFFERS ── */}
      <Offers />

      <GoldDivider />

      {/* ── LOCATION BLOCK ── */}
      <div id="location">
        <SectionTitle>Location</SectionTitle>
        <div className="bg-[#1a1a1a] p-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-[#b89b72] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <p className="text-white font-medium text-sm">{locationValue}, India</p>
              <p className="text-neutral-400 text-xs mt-1">Exact address shared after confirmation</p>
              <a
                href={`https://maps.google.com/?q=${locationValue}+India`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs text-[#b89b72] uppercase tracking-widest hover:underline font-semibold"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>

      <GoldDivider />

    </div>
  );
}

export default ListingInfo;