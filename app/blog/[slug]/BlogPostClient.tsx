"use client";
// /app/blog/[slug]/BlogPostClient.tsx

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, Key } from "react";
import { BlogPost, blogData } from "../blogData";

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const related = blogData.filter((b) => b.slug !== post.slug).slice(0, 3);
const listingIds = [
  "6877f83f233e5dc43231089e",
  "6889ed5f545d937d8360bf93",
  "69ef460da5be5a76eeacb871"
];const handleEnquire = () => {
  console.log("ENQUIRE CLICKED");

  const id = listingIds[Math.floor(Math.random() * listingIds.length)];

  router.push(`/enquiry/${id}?success=true`);
};
  return (
    <>
    {(post as any).images && (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
    {(post.images as string[]).map((img, i: Key | null | undefined) => (
      <div key={i} className="relative h-[200px]">
        <Image src={img} fill className="object-cover rounded-lg" alt="" />
      </div>
    ))}
  </div>
)}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');

        .blog-body p { 
          font-family: 'Lato', sans-serif; 
          font-size: 17px; 
          line-height: 1.9; 
          color: #2e1f10; 
          margin-bottom: 0;
        }
        .drop-cap::first-letter {
          float: left;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5.5rem;
          line-height: 0.75;
          margin-right: 12px;
          margin-top: 8px;
          color: #9e7d4b;
          font-weight: 300;
        }
        .gold-rule {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, #c4a97a, transparent);
          margin: 48px 0;
        }
        .section-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          color: #1a0f00;
          margin-bottom: 20px;
          font-style: italic;
        }
        .highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f9f4ec;
          border: 1px solid #e0cfb8;
          border-radius: 2px;
          padding: 8px 14px;
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          color: #4a3020;
        }
        .amenity-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 18px 12px;
          background: #fffdf9;
          border: 1px solid #e8dfd0;
          border-radius: 4px;
          font-family: 'Lato', sans-serif;
          font-size: 12px;
          color: #6b5744;
          text-align: center;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .amenity-tile span:first-child { font-size: 22px; }
      `}</style>

      {/* Read Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[9999] h-[3px] transition-all duration-100"
        style={{
          width: `${readProgress}%`,
          background: "linear-gradient(to right, #9e7d4b, #c4a97a)",
        }}
      />

      {/* ── HERO ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "100vh", minHeight: "600px" }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
          style={{ filter: "brightness(0.55)" }}
        />
        TITLE + INTRO

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm transition hover:bg-white/20"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", fontFamily: "'Lato', sans-serif" }}
        >
          ← Back
        </button>

        {/* Category */}
        <div className="absolute top-6 right-6 z-20">
          <span
            className="text-xs tracking-[0.2em] uppercase px-4 py-2"
            style={{ background: "#9e7d4b", color: "white", fontFamily: "'Lato', sans-serif" }}
          >
            {post.category}
          </span>
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 px-4 text-center">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4 text-white/70"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            {post.location} · {post.publishedAt} · {post.readTime}
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1.1 }}
          >
            {post.title}
          </h1>
          <p
            className="text-base md:text-lg text-white/80 max-w-xl"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
          >
            {post.tagline}
          </p>
          {/* Scroll cue */}
          <div className="mt-10 flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "'Lato', sans-serif" }}>Scroll</span>
            <div className="w-[1px] h-8 bg-white/30" style={{ animation: "pulse 2s infinite" }} />
          </div>
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <div style={{ background: "#faf7f2" }}>

        {/* Pull quote */}
        <div className="max-w-2xl mx-auto px-6 pt-16 pb-4 text-center">
          <div className="text-5xl mb-2" style={{ color: "#c4a97a", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }}>&ldquo;</div>
          <blockquote
            className="text-2xl md:text-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2a1a0a", fontWeight: 300, fontStyle: "italic", lineHeight: 1.4 }}
          >
            {post.heroQuote}
          </blockquote>
        </div>

        <hr className="gold-rule max-w-3xl mx-auto" />

        {/* Intro */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="blog-body">
            <p className="drop-cap">{post.intro}</p>
          </div>
        </div>

        {/* Sections */}
        {post.sections.map((section, i) => (
          <div key={i}>
            <hr className="gold-rule max-w-3xl mx-auto" />
            <div className="max-w-3xl mx-auto px-6">
              {/* Section number */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-xs tracking-[0.3em] uppercase"
                  style={{ color: "#c4a97a", fontFamily: "'Lato', sans-serif" }}
                >
                  0{i + 1}
                </span>
                <div className="flex-1 h-[1px]" style={{ background: "#e8dfd0" }} />
              </div>

              <h2 className="section-heading">{section.heading}</h2>

              <div className="blog-body">
                <p>{section.body}</p>
              </div>

              {section.image && (
                <div className="mt-10 -mx-0 md:-mx-16">
                  <div className="relative w-full overflow-hidden rounded-sm" style={{ height: "420px" }}>
                    <Image
                      src={section.image}
                      alt={section.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {section.imageCaption && (
                    <p
                      className="text-center text-xs mt-3 italic"
                      style={{ color: "#a89880", fontFamily: "'Lato', sans-serif" }}
                    >
                      {section.imageCaption}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        <hr className="gold-rule max-w-3xl mx-auto" />

        {/* Highlights */}
        <div className="max-w-3xl mx-auto px-6 mb-16">
          <h2 className="section-heading mb-8">What Makes It Extraordinary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {post.highlights.map((h, i) => (
              <div key={i} className="highlight-pill">
                <span style={{ color: "#9e7d4b" }}>✦</span>
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div style={{ background: "#fffdf9", borderTop: "1px solid #e8dfd0", borderBottom: "1px solid #e8dfd0" }}>
          <div className="max-w-3xl mx-auto px-6 py-14">
            <p className="text-xs tracking-[0.3em] uppercase text-center mb-2" style={{ color: "#9e7d4b", fontFamily: "'Lato', sans-serif" }}>
              Property Amenities
            </p>
            <h2 className="section-heading text-center mb-10">At Your Disposal</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {post.amenities.map((a, i) => (
                <div key={i} className="amenity-tile">
                  <span>{a.icon}</span>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practical info */}
        <div className="max-w-3xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                label: "Best Time to Visit",
                icon: "🌤️",
                value: post.bestTimeToVisit,
              },
              {
                label: "Price Range",
                icon: "💰",
                value: post.priceRange,
              },
              {
                label: "Location",
                icon: "📍",
                value: post.location + ", India",
              },
            ].map(({ label, icon, value }) => (
              <div key={label} className="p-6 rounded-sm" style={{ background: "#fffdf9", border: "1px solid #e8dfd0" }}>
                <p className="text-2xl mb-2">{icon}</p>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#c4a97a", fontFamily: "'Lato', sans-serif" }}>
                  {label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#2a1a0a", fontFamily: "'Lato', sans-serif" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Nearby */}
          <div className="mt-8 p-6 rounded-sm" style={{ background: "#fffdf9", border: "1px solid #e8dfd0" }}>
            <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "#c4a97a", fontFamily: "'Lato', sans-serif" }}>
              📍 Nearby Attractions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.nearbyAttractions.map((a, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "#4a3020", fontFamily: "'Lato', sans-serif" }}>
                  <span style={{ color: "#9e7d4b" }}>→</span>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="py-16 text-center px-4"
          style={{ background: "linear-gradient(135deg, #1a0f00 0%, #2e1a06 100%)" }}
        >
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#c4a97a", fontFamily: "'Lato', sans-serif" }}>
            Ready to Experience It?
          </p>
          <h2
            className="text-3xl md:text-4xl text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            {post.title}, {post.location}
          </h2>
          <p className="text-white/60 mb-8 text-sm" style={{ fontFamily: "'Lato', sans-serif" }}>
            {post.priceRange} · Enquiries responded to within 24 hours
          </p>
<button
  onClick={handleEnquire}
  className="inline-block px-10 py-4 text-white text-sm tracking-[0.25em] uppercase transition hover:opacity-90"
  style={{
    background: "#9e7d4b",
    fontFamily: "'Lato', sans-serif",
    letterSpacing: "0.2em",
  }}
>
  Enquire Now
</button>
        </div>

        {/* Author */}
        <div className="max-w-3xl mx-auto px-6 py-10 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #9e7d4b, #c4a97a)", fontFamily: "'Lato', sans-serif" }}
          >
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-sm" style={{ color: "#1a0f00", fontFamily: "'Lato', sans-serif" }}>
              {post.author}
            </p>
            <p className="text-xs" style={{ color: "#a89880", fontFamily: "'Lato', sans-serif" }}>
              {post.authorRole}
            </p>
          </div>
        </div>

        <hr className="gold-rule max-w-3xl mx-auto" />

        {/* Related posts */}
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-center mb-2" style={{ color: "#9e7d4b", fontFamily: "'Lato', sans-serif" }}>
            Continue Exploring
          </p>
          <h2 className="section-heading text-center mb-10">More Indian Luxury</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link href={`/blog/${r.slug}`} key={r.slug} className="group block">
                <div className="relative overflow-hidden" style={{ height: "220px" }}>
                  <Image
                    src={r.image}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-xs uppercase tracking-wider text-white/70" style={{ fontFamily: "'Lato', sans-serif" }}>
                      {r.location}
                    </p>
                  </div>
                </div>
                <div className="py-4 px-1" style={{ borderBottom: "1px solid #e8dfd0" }}>
                  <h3
                    className="text-lg mb-1 group-hover:text-amber-700 transition"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1a0f00", fontWeight: 400 }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-xs" style={{ color: "#a89880", fontFamily: "'Lato', sans-serif" }}>
                    {r.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}