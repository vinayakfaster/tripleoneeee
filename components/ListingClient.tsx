"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Range } from "react-date-range";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "react-toastify";

import ListingInfo from "./listing/ListingInfo";
import ListingReservation from "./listing/ListingReservation";
import useLoginModel from "@/hook/useLoginModal";
import { SafeReservation, SafeUser, SafeListing, Review } from "@/app/types";
import { categories } from "./navbar/Categories";
import Navbar from "./navbar/Navbar";

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: tomorrow,
  key: "selection",
};

type Props = {
  reservations?: SafeReservation[];
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  listingId?: string; 
};

export default function ListingClient({ reservations = [], listing, currentUser }: Props) {
  const router = useRouter();
  const loginModal = useLoginModel();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReserve, setShowReserve] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);

  const disableDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((r) => {
      const range = eachDayOfInterval({ start: new Date(r.startDate), end: new Date(r.endDate) });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  useEffect(() => {
    axios.get(`/api/reviews?listingId=${listing.id}`).then((res) => setReviews(res.data));
  }, [listing.id]);

  const onCreateReservation = useCallback(
    (guestData: { adults: number; children: number; infants: number; pets: number }) => {
      if (!currentUser) return loginModal.onOpen();
      const guestCount = guestData.adults + guestData.children + guestData.infants + guestData.pets;
      setIsLoading(true);
      axios.post("/api/reservations", {
        totalPrice, startDate: dateRange.startDate, endDate: dateRange.endDate,
        listingId: listing?.id, guestCount,
      })
        .then(() => { toast.success("Reservation successful!"); setDateRange(initialDateRange); router.push("/trips"); })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => setIsLoading(false));
    },
    [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
      setTotalPrice(dayCount && listing.price ? dayCount * listing.price : listing.price);
    }
  }, [dateRange, listing.price]);

  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  );

const handleEnquiry = () => {
  router.push(`/enquiry/${listing.id}?success=true`);
};

  return (
    <>
      {/* ── HERO NAVBAR ── */}
      <Navbar
        currentUser={currentUser}
        images={listing.imageSrc}
        locationValue={listing.locationValue}
        title={listing.title}
        listingId={listing.id}
      />

      {/* ── STICKY NAV TABS (Leela style) ── */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#e5d3b3]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-between h-12 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 md:gap-10 text-xs md:text-sm font-medium tracking-widest uppercase text-neutral-400 whitespace-nowrap">
            {["Overview", "Amenities", "About", "Location"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  document.getElementById(tab.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-[#b89b72] transition border-b-2 border-transparent hover:border-[#b89b72] pb-1"
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Price on nav */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0 ml-6">
            <span className="text-lg font-bold text-neutral-900">₹{listing.price.toLocaleString("en-IN")}</span>
            <span className="text-xs text-neutral-400">/ night</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="bg-[#FAF8F4] w-full">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-10 md:py-14">

          {/* ── OVERVIEW SECTION ── */}
          <div id="overview" className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

            {/* LEFT COLUMN */}
            <div className="w-full lg:flex-1 min-w-0">

              {/* Gold title block */}
              <div className="mb-8">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
                  {listing.locationValue}, India · Entire Rental Unit
                </p>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight mb-4"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {listing.title}
                </h1>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-neutral-500">
                  <span className="flex items-center gap-1 font-semibold text-[#b89b72]">★ 4.95</span>
                  <span className="text-neutral-200">|</span>
                  <span>{reviews.length} reviews</span>
                  <span className="text-neutral-200">|</span>
                  <span>{listing.guestCount} guests</span>
                  <span className="text-neutral-200">|</span>
                  <span>{listing.roomCount} bed{listing.roomCount > 1 ? "s" : ""}</span>
                  <span className="text-neutral-200">|</span>
                  <span>{listing.bathroomCount} bath{listing.bathroomCount > 1 ? "s" : ""}</span>
                </div>

                {/* Gold divider */}
                <div className="flex items-center gap-3 mt-6">
                  <div className="h-px bg-[#b89b72] w-16" />
                  <div className="text-[#b89b72] text-lg">✦</div>
                  <div className="h-px bg-[#b89b72] w-16" />
                </div>
              </div>

              {/* LISTING INFO */}
              <ListingInfo
                user={listing.user}
                category={category}
                description={listing.description}
                roomCount={listing.roomCount}
                guestCount={listing.guestCount}
                bathroomCount={listing.bathroomCount}
                locationValue={listing.locationValue}
                images={listing.imageSrc.map((url, i) => ({ url, label: `Photo ${i + 1}` }))}
              />
            </div>

            {/* RIGHT: RESERVATION CARD — desktop only, sticky */}
            <div className="hidden lg:block w-[380px] flex-shrink-0">
              <div className="sticky top-20">
                <div className="bg-white border border-[#e5d3b3] rounded-none shadow-lg overflow-hidden">
                  {/* Gold top bar */}
                  <div className="h-1 bg-gradient-to-r from-[#b89b72] via-[#d4b896] to-[#b89b72]" />
                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#b89b72] mb-1">Starting from</p>
                    <p className="text-3xl font-bold text-neutral-900 mb-1">
                      ₹{listing.price.toLocaleString("en-IN")}
                      <span className="text-sm font-normal text-neutral-400 ml-2">/ night</span>
                    </p>
                    <p className="text-xs text-neutral-400 mb-6">Taxes & fees applicable</p>

                    {/* Enquire Now — primary CTA */}
                    <button
                      onClick={handleEnquiry}
                      disabled={enquirySent}
                      className="w-full py-3.5 bg-[#1a1a1a] hover:bg-[#b89b72] text-white text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300 mb-3"
                    >
                      {enquirySent ? "✓ Enquiry Sent" : "Enquire Now"}
                    </button>

                    {/* Reserve — secondary */}
                    <button
                      onClick={() => setShowReserve(!showReserve)}
                      className="w-full py-3 border border-[#b89b72] text-[#b89b72] hover:bg-[#b89b72] hover:text-white text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300"
                    >
                      {showReserve ? "Hide Booking" : "Book Directly"}
                    </button>

                    {showReserve && (
                      <div className="mt-4 border-t border-neutral-100 pt-4">
                        <ListingReservation
                          currentUser={currentUser}
                          price={listing.price}
                          totalPrice={totalPrice}
                          onChangeDate={(value) => setDateRange(value)}
                          dateRange={dateRange}
                          onSubmit={onCreateReservation}
                          disabled={isLoading}
                          disabledDates={disableDates}
                          listingId={listing.id}
                        />
                      </div>
                    )}
                  </div>

                  {/* Address block — Leela style */}
                  <div className="bg-[#1a1a1a] px-6 py-4">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#b89b72] mb-1">Location</p>
                    <p className="text-white text-sm font-medium">{listing.title}</p>
                    <p className="text-neutral-400 text-xs mt-1">{listing.locationValue}, India</p>
                    <a
                      href={`https://maps.google.com/?q=${listing.locationValue}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-[#b89b72] hover:underline"
                    >
                      View on map →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── STICKY BOTTOM BAR — mobile + desktop ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a] border-t border-[#b89b72]/30">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-3 flex items-center justify-between gap-3">

          {/* Left: price + location */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base md:text-lg leading-none">
              ₹{listing.price.toLocaleString("en-IN")}
              <span className="text-xs text-neutral-400 font-normal ml-1">/ night</span>
            </p>
            <p className="text-neutral-400 text-xs truncate mt-0.5">{listing.locationValue}, India</p>
          </div>

          {/* Right: CTAs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleEnquiry}
              disabled={enquirySent}
              className="px-4 md:px-6 py-2.5 bg-[#b89b72] hover:bg-[#a08762] text-white text-xs md:text-sm font-semibold tracking-widest uppercase transition whitespace-nowrap"
            >
              {enquirySent ? "✓ Sent" : "Enquire Now"}
            </button>
            <button
              onClick={() => {
                setShowReserve(true);
                // On mobile, scroll to reservation section
                document.getElementById("reserve-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden md:block px-5 py-2.5 border border-[#b89b72]/50 text-[#b89b72] hover:border-[#b89b72] text-xs font-semibold tracking-widest uppercase transition whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE: Reserve section (shown when Book Now tapped) ── */}
      {showReserve && (
        <div id="reserve-section" className="lg:hidden fixed inset-0 z-[60] bg-black/60 flex items-end">
          <div className="bg-white w-full rounded-t-2xl max-h-[90vh] overflow-y-auto">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-neutral-200 rounded-full" />
            </div>
            <div className="px-5 pb-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold text-neutral-900">Book Your Stay</p>
                <button onClick={() => setShowReserve(false)} className="text-neutral-400 text-xl">✕</button>
              </div>
              {/* Gold accent */}
              <div className="h-px bg-gradient-to-r from-[#b89b72] via-[#d4b896] to-transparent mb-5" />
              <ListingReservation
                currentUser={currentUser}
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disableDates}
                listingId={listing.id}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom padding so sticky bar doesn't cover content */}
      {/* ── POPULAR BOOKING OPTIONS ── */}
<div className="bg-[#0f0f0f] py-10 px-4 md:px-10">
  <p className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] text-center mb-2">Quick Book</p>
  <h2 className="text-white text-center text-xl font-semibold mb-6" style={{ fontFamily: "Georgia, serif" }}>
    Popular Booking Options
  </h2>
  <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
    {[
      { icon: "🌅", label: "Day Stay",       sub: "8 AM – 8 PM" },
      { icon: "🌙", label: "Night Stay",      sub: "10 PM onwards" },
      { icon: "⏰", label: "Hourly Booking",  sub: "Min 3 hours" },
      { icon: "💑", label: "Couples",         sub: "Private & discreet" },
      { icon: "💼", label: "Corporate",       sub: "GST invoice" },
      { icon: "🎂", label: "Celebration",     sub: "Decor on request" },
    ].map((opt) => (
      <button
        key={opt.label}
        onClick={handleEnquiry}
        className="flex flex-col items-center gap-1 px-5 py-3 rounded-xl border border-[#b89b72]/30 hover:border-[#b89b72] hover:bg-[#b89b72]/10 transition group"
      >
        <span className="text-2xl">{opt.icon}</span>
        <span className="text-white text-xs font-semibold tracking-wider uppercase">{opt.label}</span>
        <span className="text-[#b89b72] text-[10px]">{opt.sub}</span>
      </button>
    ))}
  </div>
</div>

{/* ── PROPERTIES BY LOCATION ── */}
<div className="bg-[#FAF8F4] py-10 px-4 md:px-10">
  <p className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] text-center mb-2">Our Properties</p>
  <h2 className="text-neutral-900 text-center text-xl font-semibold mb-6" style={{ fontFamily: "Georgia, serif" }}>
    TripleOne Across India
  </h2>
  <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
    {[
      { city: "Noida",         icon: "🏙️" },
     { city: "Delhi",         icon: "🕌" },
     { city: "Gurugram",         icon: "🏙️" },
      { city: "Ramesh Nagar",  icon: "🏘️" },
      { city: "Subhash Nagar", icon: "🏢" },
      { city: "DLF Motinagar", icon: "🌆" },
    ].map((loc) => (
      <button
        key={loc.city}
        onClick={() => router.push(`/?locationValue=${loc.city}`)}
        className="flex items-center gap-3 px-5 py-3 bg-white border border-[#e5d3b3] hover:border-[#b89b72] hover:shadow-md rounded-xl transition group"
      >
        {/* TripleOne logo favicon style */}
        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
          <span className="text-[#b89b72] text-[10px] font-bold">T1</span>
        </div>
        <div className="text-left">
          <p className="text-xs font-semibold text-neutral-800 tracking-wide">{loc.city}</p>
          <p className="text-[10px] text-neutral-400">View properties</p>
        </div>
        <span className="text-[#b89b72] ml-1 group-hover:translate-x-1 transition-transform">→</span>
      </button>
    ))}
  </div>
</div>
      <div className="h-20" />
    </>
  );
}