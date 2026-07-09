"use client";
// /app/blog/[slug]/BlogPostClient.tsx

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo, Key } from "react";
import { BlogPost, blogData } from "../blogData";

function slugify(text: string, index: number) {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "section"}-${index}`;
}

export default function BlogPostClient({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tocItems = useMemo(
    () => post.sections.map((s, i) => ({ id: slugify(s.heading, i), label: s.heading })),
    [post.sections]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setTocOpen(false);
  };

  const related = blogData.filter((b) => b.slug !== post.slug).slice(0, 3);
  const listingIds = [
    "6877f83f233e5dc43231089e",
    "6889ed5f545d937d8360bf93",
    "69ef460da5be5a76eeacb871",
  ];
  const handleEnquire = () => {
    console.log("ENQUIRE CLICKED");
    const id = listingIds[Math.floor(Math.random() * listingIds.length)];
    router.push(`/enquiry/${id}?success=true`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,700;1,500&display=swap');

        .blog-body p {
          font-family: 'Lato', sans-serif;
          font-size: 17px;
          line-height: 1.9;
          color: #2e1f10;
          margin-bottom: 22px;
        }
        .blog-body p:last-child { margin-bottom: 0; }
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
          scroll-margin-top: 100px;
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
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .highlight-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(158, 125, 75, 0.15);
          border-color: #c4a97a;
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
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .amenity-tile:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(158, 125, 75, 0.14);
        }
        .amenity-tile span:first-child { font-size: 22px; }

        /* ── Table of Contents ── */
        .toc-nav {
          position: sticky;
          top: 110px;
          align-self: start;
        }
        .toc-eyebrow {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9e7d4b;
          margin-bottom: 14px;
          display: block;
        }
        .toc-link {
          display: block;
          font-family: 'Lato', sans-serif;
          font-size: 13.5px;
          line-height: 1.5;
          color: #6b5744;
          padding: 8px 0 8px 16px;
          border-left: 2px solid #e8dfd0;
          transition: color 0.25s ease, border-color 0.25s ease, padding-left 0.25s ease;
          text-decoration: none;
        }
        .toc-link:hover {
          color: #1a0f00;
          border-color: #c4a97a;
          padding-left: 20px;
        }
        .toc-link.active {
          color: #9e7d4b;
          border-color: #9e7d4b;
          font-weight: 700;
        }
        .toc-mobile summary {
          cursor: pointer;
          list-style: none;
          font-family: 'Lato', sans-serif;
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9e7d4b;
          padding: 14px 18px;
          border: 1px solid #e0cfb8;
          background: #fffdf9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .toc-mobile summary::-webkit-details-marker { display: none; }
        .toc-mobile[open] summary { border-bottom: none; }
        .toc-mobile summary::after {
          content: '+';
          font-size: 16px;
          transition: transform 0.25s ease;
        }
        .toc-mobile[open] summary::after { transform: rotate(45deg); }
        .toc-mobile-body {
          border: 1px solid #e0cfb8;
          border-top: none;
          background: #fffdf9;
          padding: 6px 18px 14px;
        }

        /* ── Rich content blocks ── */
        .rich-bullets, .rich-numbered {
          margin: 4px 0 26px 0;
          padding: 0;
          list-style: none;
        }
        .rich-bullets li, .rich-numbered li {
          font-family: 'Lato', sans-serif;
          font-size: 16px;
          line-height: 1.75;
          color: #2e1f10;
          padding-left: 30px;
          position: relative;
          margin-bottom: 12px;
        }
        .rich-bullets li:before {
          content: '✓';
          position: absolute;
          left: 0;
          top: 1px;
          color: #9e7d4b;
          font-weight: 700;
        }
        .rich-numbered { counter-reset: rich-counter; }
        .rich-numbered li { counter-increment: rich-counter; }
        .rich-numbered li:before {
          content: counter(rich-counter);
          position: absolute;
          left: 0;
          top: -1px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #9e7d4b;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .inline-pull-quote {
          margin: 32px 0;
          padding: 4px 0 4px 26px;
          border-left: 3px solid #c4a97a;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-style: italic;
          color: #4a3020;
          line-height: 1.5;
        }
        .info-box, .tip-box, .dyk-box, .warning-box {
          margin: 28px 0;
          padding: 22px 24px;
          border-radius: 6px;
          font-family: 'Lato', sans-serif;
          font-size: 14.5px;
          line-height: 1.75;
          transition: box-shadow 0.3s ease;
        }
        .info-box:hover, .tip-box:hover, .dyk-box:hover, .warning-box:hover {
          box-shadow: 0 10px 30px rgba(74, 48, 32, 0.08);
        }
        .box-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .tip-box {
          background: #f9f4ec;
          border: 1px solid #e0cfb8;
          color: #4a3020;
        }
        .tip-box .box-label { color: #9e7d4b; }
        .dyk-box {
          background: #fffdf9;
          border: 1px dashed #c4a97a;
          color: #4a3020;
        }
        .dyk-box .box-label { color: #9e7d4b; }
        .info-box {
          background: #f6f2ea;
          border: 1px solid #d8c9ac;
          color: #3a2c18;
        }
        .info-box .box-label { color: #7a6035; }
        .warning-box {
          background: #f9f1e6;
          border: 1px solid #d8b98a;
          color: #4a3020;
        }
        .warning-box .box-label { color: #a1702f; }

        .rich-table-wrap {
          margin: 28px 0;
          overflow-x: auto;
          border: 1px solid #e8dfd0;
          border-radius: 6px;
        }
        .rich-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Lato', sans-serif;
          font-size: 14px;
        }
        .rich-table th {
          background: #9e7d4b;
          color: #fff;
          text-align: left;
          padding: 12px 16px;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
        }
        .rich-table td {
          padding: 12px 16px;
          color: #2e1f10;
          border-top: 1px solid #e8dfd0;
        }
        .rich-table tr:nth-child(even) td { background: #faf7f2; }

        /* ── FAQ accordion ── */
        .faq-item {
          border-bottom: 1px solid #e8dfd0;
        }
        .faq-item summary {
          cursor: pointer;
          list-style: none;
          padding: 20px 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #1a0f00;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary .faq-icon {
          flex-shrink: 0;
          font-size: 20px;
          color: #9e7d4b;
          transition: transform 0.3s ease;
        }
        .faq-item[open] summary .faq-icon { transform: rotate(45deg); }
        .faq-item p {
          font-family: 'Lato', sans-serif;
          font-size: 15px;
          line-height: 1.8;
          color: #4a3020;
          padding: 0 4px 22px;
        }

        /* ── Gallery ── */
        .gallery-figure { margin: 0; }
        .gallery-figure figcaption {
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          color: #a89880;
          margin-top: 8px;
          text-align: center;
        }
        .gallery-image-wrap {
          overflow: hidden;
          border-radius: 4px;
        }
        .gallery-image-wrap img {
          transition: transform 0.6s ease;
        }
        .gallery-image-wrap:hover img {
          transform: scale(1.06);
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Read Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[9999] h-[3px] transition-all duration-100"
        style={{
          width: `${readProgress}%`,
          background: "linear-gradient(to right, #9e7d4b, #c4a97a)",
        }}
      />

      <article>
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
            <div className="text-5xl mb-2" style={{ color: "#c4a97a", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1 }} aria-hidden="true">&ldquo;</div>
            <blockquote
              className="text-2xl md:text-3xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2a1a0a", fontWeight: 300, fontStyle: "italic", lineHeight: 1.4 }}
            >
              {post.heroQuote}
            </blockquote>
          </div>

          <hr className="gold-rule max-w-3xl mx-auto" />

          {/* Intro + Table of Contents + Sections */}
          <div className="max-w-6xl mx-auto px-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-14">
            {/* Desktop sticky ToC */}
            {tocItems.length > 1 && (
              <nav className="toc-nav hidden lg:block" aria-label="Table of contents">
                <span className="toc-eyebrow">In This Guide</span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`toc-link ${activeSection === item.id ? "active" : ""}`}
                        aria-current={activeSection === item.id ? "true" : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div>
              {/* Mobile collapsible ToC */}
              {tocItems.length > 1 && (
                <details className="toc-mobile lg:hidden mb-10" open={tocOpen} onToggle={(e) => setTocOpen((e.target as HTMLDetailsElement).open)}>
                  <summary>Table of Contents</summary>
                  <div className="toc-mobile-body">
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`toc-link ${activeSection === item.id ? "active" : ""}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.id);
                            }}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              )}

              {/* Intro */}
              <div className="blog-body">
                <p className="drop-cap">{post.intro}</p>
              </div>

              {/* Sections */}
              {post.sections.map((section, i) => {
                const id = tocItems[i]?.id ?? slugify(section.heading, i);
                return (
                  <section
                    key={i}
                    id={id}
                    aria-labelledby={`${id}-heading`}
                    ref={(el) => {
                      sectionRefs.current[i] = el;
                    }}
                  >
                    <hr className="gold-rule" />

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

                    <h2 id={`${id}-heading`} className="section-heading">{section.heading}</h2>

                    <div className="blog-body">
                      {section.body.split("\n\n").map((para, pi) => (
                        <p key={pi}>{para}</p>
                      ))}
                    </div>

                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="rich-bullets">
                        {section.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    )}

                    {section.numbered && section.numbered.length > 0 && (
                      <ol className="rich-numbered">
                        {section.numbered.map((n, ni) => (
                          <li key={ni}>{n}</li>
                        ))}
                      </ol>
                    )}

                    {section.table && (
                      <div className="rich-table-wrap">
                        <table className="rich-table">
                          <thead>
                            <tr>
                              {section.table.headers.map((h, hi) => (
                                <th key={hi} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.table.rows.map((row, ri) => (
                              <tr key={ri}>
                                {row.map((cell, ci) => (
                                  <td key={ci}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {section.quote && (
                      <blockquote className="inline-pull-quote">{section.quote}</blockquote>
                    )}

                    {section.tip && (
                      <aside className="tip-box" aria-label="Travel tip">
                        <p className="box-label"><span aria-hidden="true">✦</span> Travel Tip</p>
                        {section.tip}
                      </aside>
                    )}

                    {section.didYouKnow && (
                      <aside className="dyk-box" aria-label="Did you know">
                        <p className="box-label"><span aria-hidden="true">◆</span> Did You Know</p>
                        {section.didYouKnow}
                      </aside>
                    )}

                    {section.infoBox && (
                      <div className="info-box">
                        <p className="box-label"><span aria-hidden="true">ℹ</span> {section.infoBox.title}</p>
                        {section.infoBox.content}
                      </div>
                    )}

                    {section.warning && (
                      <div className="warning-box" role="note">
                        <p className="box-label"><span aria-hidden="true">⚠</span> Good to Know</p>
                        {section.warning}
                      </div>
                    )}

                    {section.image && (
                      <figure className="mt-10 -mx-0 md:-mx-16">
                        <div className="relative w-full overflow-hidden rounded-sm" style={{ height: "420px" }}>
                          <Image
                            src={section.image}
                            alt={section.imageCaption || section.heading}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {section.imageCaption && (
                          <figcaption
                            className="text-center text-xs mt-3 italic"
                            style={{ color: "#a89880", fontFamily: "'Lato', sans-serif" }}
                          >
                            {section.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </section>
                );
              })}
            </div>
          </div>

          {/* Gallery */}
          {post.images && post.images.length > 0 && (
            <div className="max-w-3xl mx-auto px-6 mt-16">
              <hr className="gold-rule" style={{ margin: "0 0 48px 0" }} />
              <p className="text-xs tracking-[0.3em] uppercase text-center mb-2" style={{ color: "#9e7d4b", fontFamily: "'Lato', sans-serif" }}>
                In Pictures
              </p>
              <h2 className="section-heading text-center mb-8">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {post.images.map((img, i: Key | null | undefined) => (
                  <figure key={i} className="gallery-figure">
                    <div className="gallery-image-wrap relative h-[200px]">
                      <Image src={img} fill className="object-cover" alt={`${post.title} — additional view`} />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          )}

          <hr className="gold-rule max-w-3xl mx-auto" />

          {/* Highlights */}
          <section className="max-w-3xl mx-auto px-6 mb-16" aria-label="Highlights">
            <h2 className="section-heading mb-8">What Makes It Extraordinary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.highlights.map((h, i) => (
                <div key={i} className="highlight-pill">
                  <span style={{ color: "#9e7d4b" }} aria-hidden="true">✦</span>
                  {h}
                </div>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section style={{ background: "#fffdf9", borderTop: "1px solid #e8dfd0", borderBottom: "1px solid #e8dfd0" }} aria-label="Property amenities">
            <div className="max-w-3xl mx-auto px-6 py-14">
              <p className="text-xs tracking-[0.3em] uppercase text-center mb-2" style={{ color: "#9e7d4b", fontFamily: "'Lato', sans-serif" }}>
                Property Amenities
              </p>
              <h2 className="section-heading text-center mb-10">At Your Disposal</h2>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {post.amenities.map((a, i) => (
                  <div key={i} className="amenity-tile">
                    <span aria-hidden="true">{a.icon}</span>
                    <span>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

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
                  <p className="text-2xl mb-2" aria-hidden="true">{icon}</p>
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
            <aside className="mt-8 p-6 rounded-sm" style={{ background: "#fffdf9", border: "1px solid #e8dfd0" }} aria-label="Nearby attractions">
              <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "#c4a97a", fontFamily: "'Lato', sans-serif" }}>
                📍 Nearby Attractions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.nearbyAttractions.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "#4a3020", fontFamily: "'Lato', sans-serif" }}>
                    <span style={{ color: "#9e7d4b" }} aria-hidden="true">→</span>
                    {a}
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* FAQ */}
          {post.faq && post.faq.length > 0 && (
            <section className="max-w-3xl mx-auto px-6 py-14" aria-label="Frequently asked questions">
              <p className="text-xs tracking-[0.3em] uppercase text-center mb-2" style={{ color: "#9e7d4b", fontFamily: "'Lato', sans-serif" }}>
                Good to Know
              </p>
              <h2 className="section-heading text-center mb-8">Frequently Asked Questions</h2>
              <div>
                {post.faq.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary>
                      <span>{item.question}</span>
                      <span className="faq-icon" aria-hidden="true">+</span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

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
          <section className="max-w-5xl mx-auto px-6 pb-16" aria-label="Related articles">
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
          </section>
        </div>
      </article>
    </>
  );
}
