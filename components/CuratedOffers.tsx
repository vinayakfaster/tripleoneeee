"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// ── Column groups: alternating tall singles + stacked pairs ───────────────────
// Total column height = TALL_H = 520px always
// Stacked pair: each card = (520 - 10gap) / 2 = 255px
const columnGroups = [
  [{ label:"Staycation",  title:"Stay. Savour.",  subtitle:"The Perfect Escape",   tag:"MOST LOVED", image:"/images/3509/IMG_1239.webp",            meta:"2 Nights from ₹14,000",      tall:true  }],
  [{ label:"For Couples", title:"Romantic",       subtitle:"Getaways",             tag:"SIGNATURE",  image:"/images/3815/IMG_1115.webp",            meta:"Includes dinner + spa",       tall:false },
   { label:"Weekend",     title:"City Escape",    subtitle:"Fri – Sun Special",    tag:"WEEKEND",    image:"/images/3509/IMG_1242.webp",            meta:"From ₹8,000 / night",         tall:false }],
  [{ label:"Limited Offer",title:"Pay 2,",        subtitle:"Stay 3 Nights",        tag:"OFFER",      image:"/images/3312/IMG-20251126-WA0008(1).jpg",meta:"Valid till June 30",         tall:true  }],
  [{ label:"Anniversary", title:"Celebrate",      subtitle:"In Style",             tag:"EXCLUSIVE",  image:"/images/3815/IMG_1163.webp",            meta:"Champagne on arrival",        tall:false },
   { label:"Night Stay",  title:"One Perfect",    subtitle:"Night",                tag:"POPULAR",    image:"/images/3312/IMG-20251126-WA0006(1).jpg",meta:"Late checkout 2 PM",         tall:false }],
  [{ label:"Wellness",    title:"Restore.",       subtitle:"Retreat & Renew",      tag:"NEW",        image:"/images/3509/IMG_1231.webp",            meta:"Ayurvedic package",           tall:true  }],
  [{ label:"Spa & Stay",  title:"Unwind.",        subtitle:"Body & Mind",          tag:"WELLNESS",   image:"/images/3509/IMG_1267.webp",            meta:"60-min massage included",     tall:false },
   { label:"Early Bird",  title:"Book Early,",    subtitle:"Save 30%",             tag:"DEAL",       image:"/images/3312/IMG-20251126-WA0007(1).jpg",meta:"Non-refundable rate",        tall:false }],
  [{ label:"Pool Villa",  title:"Private",        subtitle:"Pool Experience",      tag:"LUXURY",     image:"/images/3815/IMG_1087.webp",            meta:"Heated pool · Chef on call",  tall:true  }],
  [{ label:"Royal Suite", title:"Summer",         subtitle:"Royal Retreat",        tag:"PREMIUM",    image:"/images/3815/IMG_1159.webp",            meta:"Butler service included",     tall:false },
   { label:"Group",       title:"Celebrations",   subtitle:"Made Bespoke",         tag:"EVENTS",     image:"/images/3509/IMG_1239.webp",            meta:"10+ rooms · Event spaces",    tall:false }],
];

const tagStyles: Record<string, { bg: string; color: string }> = {
  "MOST LOVED": { bg:"#c4a97a",            color:"#fff"     },
  OFFER:        { bg:"#1c3a2e",            color:"#d4a843"  },
  SIGNATURE:    { bg:"#2c1810",            color:"#e8c87a"  },
  NEW:          { bg:"#d4a843",            color:"#1a0f00"  },
  WEEKEND:      { bg:"rgba(0,0,0,0.52)",  color:"#fff"     },
  PREMIUM:      { bg:"#0a1628",            color:"#c4a97a"  },
  EXCLUSIVE:    { bg:"#8b1a1a",            color:"#f5e6d3"  },
  WELLNESS:     { bg:"#1e3a28",            color:"#a8d5a2"  },
  POPULAR:      { bg:"rgba(0,0,0,0.52)",  color:"#fff"     },
  LUXURY:       { bg:"#1a0f00",            color:"#c4a97a"  },
  DEAL:         { bg:"#b83232",            color:"#fff"     },
  EVENTS:       { bg:"#2c2460",            color:"#c4a97a"  },
};

type Card = typeof columnGroups[0][0];

function OfferCard({ card, height }: { card: Card; height: string | number }) {
  const [hov, setHov] = useState(false);
  const ts = tagStyles[card.tag] ?? { bg:"rgba(0,0,0,0.5)", color:"#fff" };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:"relative", width:"100%", height,
        overflow:"hidden", cursor:"pointer", flexShrink:0,
        transform: hov ? "scale(1.013)" : "scale(1)",
        transition:"transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s",
        boxShadow: hov ? "0 22px 52px rgba(0,0,0,0.36)" : "0 3px 16px rgba(0,0,0,0.13)",
      }}
    >
      <Image src={card.image} alt={card.title} fill
        style={{ objectFit:"cover",
          transform: hov ? "scale(1.07)" : "scale(1)",
          transition:"transform 0.85s cubic-bezier(0.23,1,0.32,1)" }} />

      {/* Bottom gradient */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"linear-gradient(to top,rgba(4,1,0,0.88) 0%,rgba(4,1,0,0.28) 44%,transparent 64%)" }} />

      {/* Hover warm wash */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:"rgba(196,169,122,0.07)", opacity:hov?1:0, transition:"opacity 0.4s" }} />

      {/* Animated corner lines — top right */}
      <div style={{ position:"absolute", top:0, right:0,
        width: hov ? 44 : 0, height:1, background:"#c4a97a",
        transition:"width 0.35s ease" }} />
      <div style={{ position:"absolute", top:0, right:0,
        height: hov ? 44 : 0, width:1, background:"#c4a97a",
        transition:"height 0.35s ease 0.08s" }} />

      {/* Tag + label */}
      <div style={{ position:"absolute", top:13, left:13, display:"flex", flexDirection:"column", gap:5 }}>
        <span style={{ fontFamily:"'Lato',sans-serif", fontSize:7.5, letterSpacing:"2.5px",
          textTransform:"uppercase", padding:"3px 9px",
          background:ts.bg, color:ts.color, fontWeight:700,
          backdropFilter:"blur(6px)", alignSelf:"flex-start" }}>
          {card.tag}
        </span>
        <span style={{ fontFamily:"'Lato',sans-serif", fontSize:8.5, letterSpacing:"2px",
          textTransform:"uppercase", color:"rgba(255,255,255,0.48)", fontWeight:300 }}>
          {card.label}
        </span>
      </div>

      {/* Bottom text */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 16px 16px" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
          fontSize: card.tall ? "clamp(19px,1.7vw,24px)" : "clamp(15px,1.3vw,19px)",
          color:"#fff", lineHeight:1.1, margin:0 }}>
          {card.title}
        </p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontWeight:300,
          fontSize: card.tall ? "clamp(14px,1.3vw,18px)" : "clamp(12px,1.1vw,15px)",
          color:"#c4a97a", margin:"2px 0 9px" }}>
          {card.subtitle}
        </p>

        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:7 }}>
          <div style={{ flex:1, height:1, background:"rgba(196,169,122,0.28)" }} />
          <span style={{ color:"rgba(196,169,122,0.4)", fontSize:7 }}>✦</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'Lato',sans-serif", fontSize:8.5,
            color:"rgba(255,255,255,0.45)", letterSpacing:"0.8px", fontWeight:300 }}>
            {card.meta}
          </span>
          <span style={{ fontFamily:"'Lato',sans-serif", fontSize:7.5, letterSpacing:"2px",
            textTransform:"uppercase",
            color: hov ? "#c4a97a" : "rgba(255,255,255,0.35)",
            borderBottom:`1px solid ${hov ? "#c4a97a" : "transparent"}`,
            paddingBottom:1, transition:"color 0.3s, border-color 0.3s" }}>
            EXPLORE →
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function CuratedOffers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag]     = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setSS] = useState(0);

  const onDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setDrag(true); setStartX(e.pageX - scrollRef.current.offsetLeft);
    setSS(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drag || !scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft = scrollStart - (e.pageX - scrollRef.current.offsetLeft - startX) * 1.6;
  };
  const onUp = () => {
    setDrag(false);
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const pan = (d:"l"|"r") =>
    scrollRef.current?.scrollBy({ left: d==="r" ? 420 : -420, behavior:"smooth" });

  const COL_W  = 260;   // px — each column width
  const TALL_H = 520;   // px — total column height (tall single fills this)
  const GAP    = 10;    // px — gap between stacked cards
  const SHORT_H = (TALL_H - GAP) / 2;  // 255px each

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
        .co-track::-webkit-scrollbar{display:none}
        .co-track{-ms-overflow-style:none;scrollbar-width:none}
        .co-arrow{transition:background 0.2s,transform 0.15s}
        .co-arrow:hover{background:#fff!important;transform:translateY(-50%) scale(1.08)!important}
      `}</style>

      <section style={{
        width:"100vw", position:"relative", left:"50%",
        marginLeft:"-50vw", marginRight:"-50vw",
        background:"#faf7f2", paddingTop:64, overflow:"hidden",
      }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign:"center", padding:"0 24px 48px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:16 }}>
            <div style={{ height:1, width:44, background:"linear-gradient(to right,transparent,#c4a97a)" }} />
            <span style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"5px", textTransform:"uppercase", color:"#9e7d4b" }}>
              TripleOne · Exclusive
            </span>
            <div style={{ height:1, width:44, background:"linear-gradient(to left,transparent,#c4a97a)" }} />
          </div>

          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300,
            fontSize:"clamp(36px,4.5vw,60px)", color:"#1a0f00",
            lineHeight:1.05, margin:"0 0 6px", letterSpacing:"1px" }}>
            Curated Offers
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
            fontWeight:300, fontSize:"clamp(15px,1.8vw,21px)", color:"#9e7d4b", margin:"0 0 20px" }}>
            Crafted for those who expect more
          </p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <div style={{ height:1, width:28, background:"linear-gradient(to right,transparent,#c4a97a)" }} />
            <span style={{ color:"#c4a97a", fontSize:7, letterSpacing:"7px" }}>◆ ◆ ◆</span>
            <div style={{ height:1, width:28, background:"linear-gradient(to left,transparent,#c4a97a)" }} />
          </div>
        </div>

        {/* ── SCROLL AREA ── */}
        <div style={{ position:"relative" }}>

          {/* Fade edges */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:70, zIndex:20, pointerEvents:"none",
            background:"linear-gradient(to right,#faf7f2 25%,transparent)" }} />
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:70, zIndex:20, pointerEvents:"none",
            background:"linear-gradient(to left,#faf7f2 25%,transparent)" }} />

          {/* Arrows */}
          <button className="co-arrow" onClick={() => pan("l")} style={{
            position:"absolute", left:14, top:"50%", transform:"translateY(-50%)",
            zIndex:30, width:40, height:40, background:"rgba(255,255,255,0.95)",
            border:"1px solid rgba(196,169,122,0.4)", borderRadius:"50%",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:15, color:"#9e7d4b", boxShadow:"0 4px 14px rgba(0,0,0,0.1)" }}>
            ←
          </button>
          <button className="co-arrow" onClick={() => pan("r")} style={{
            position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
            zIndex:30, width:40, height:40, background:"rgba(255,255,255,0.95)",
            border:"1px solid rgba(196,169,122,0.4)", borderRadius:"50%",
            cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:15, color:"#9e7d4b", boxShadow:"0 4px 14px rgba(0,0,0,0.1)" }}>
            →
          </button>

          {/* ── TRACK ── */}
          <div
            ref={scrollRef}
            className="co-track"
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            style={{
              display:"flex",
              alignItems:"flex-end",   // bottom-align columns so they all sit on same baseline
              gap:GAP,
              overflowX:"auto",
              cursor:"grab",
              userSelect:"none",
              padding:`0 70px ${GAP * 4}px`,
            }}
          >
            {columnGroups.map((group, gi) => (
              <div key={gi} style={{
                display:"flex",
                flexDirection:"column",
                gap:GAP,
                flexShrink:0,
                width:COL_W,
                height:TALL_H,
              }}>
                {group.map((card, ci) => (
                  <OfferCard
                    key={ci}
                    card={card}
                    height={group.length === 1 ? "100%" : SHORT_H}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          borderTop:"1px solid rgba(196,169,122,0.15)",
          padding:"18px 32px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:12, background:"#f5f0e8",
        }}>
          <p style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"2px",
            textTransform:"uppercase", color:"#a89060", margin:0, fontWeight:300 }}>
            Prices per night · Subject to availability · T&amp;C apply
          </p>
          <button
            style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:"3px",
              textTransform:"uppercase", color:"#9e7d4b", background:"none",
              border:"1px solid rgba(158,125,75,0.4)", padding:"8px 20px", cursor:"pointer" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#9e7d4b"; (e.currentTarget as HTMLElement).style.color="#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="none";    (e.currentTarget as HTMLElement).style.color="#9e7d4b"; }}
          >
            View All Offers →
          </button>
        </div>

      </section>
    </>
  );
}