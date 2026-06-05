'use client';
import { useEffect, useState, useRef } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#c4a97a;--gold-h:#d4b98a;
  --g20:rgba(196,169,122,0.2);--g12:rgba(196,169,122,0.12);
  --g08:rgba(196,169,122,0.08);--g04:rgba(196,169,122,0.04);
  --cream:#f5f2ea;--c70:rgba(245,242,234,0.7);--c40:rgba(245,242,234,0.4);--c20:rgba(245,242,234,0.2);
  --bg:#070707;--bg2:#0d0d0d;--bg3:#121212;
  --border:rgba(196,169,122,0.1);
  --red:rgba(200,70,55,0.92);
  --green:rgba(90,190,110,0.9);
  --serif:'Cormorant Garamond',Georgia,serif;
  --sans:'DM Sans','Helvetica Neue',sans-serif;
  --ease:.4s cubic-bezier(.25,.46,.45,.94);
  --shadow:0 32px 80px rgba(0,0,0,0.7);
  --r:16px;
}
html{background:var(--bg);color:var(--cream);font-family:var(--sans);overflow-x:hidden;scroll-behavior:smooth}
body{background:var(--bg)}
img{display:block}
button{font-family:var(--sans);cursor:pointer}
::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:var(--g20);border-radius:2px}

.btn-gold{display:inline-flex;align-items:center;gap:.55rem;background:var(--gold);color:#070707;border:none;border-radius:100px;padding:.9rem 2.2rem;font:500 10px var(--sans);letter-spacing:.14em;text-transform:uppercase;transition:all var(--ease);white-space:nowrap}
.btn-gold:hover{background:var(--gold-h);transform:translateY(-2px);box-shadow:0 14px 36px rgba(196,169,122,.28)}
.btn-gold svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.2}
.btn-outline{display:inline-flex;align-items:center;gap:.55rem;background:transparent;color:var(--gold);border:1px solid var(--g20);border-radius:100px;padding:.9rem 2.2rem;font:400 10px var(--sans);letter-spacing:.14em;text-transform:uppercase;transition:all var(--ease);white-space:nowrap}
.btn-outline:hover{border-color:var(--gold);background:var(--g08);transform:translateY(-2px)}

/* HERO */
.of-hero{position:relative;height:68vh;min-height:460px;display:flex;align-items:flex-end;overflow:hidden}
.of-hero-bg{position:absolute;inset:0}
.of-hero-bg img{width:100%;height:100%;object-fit:cover;filter:saturate(0.38) brightness(0.42);transform:scale(1.05);transition:transform 10s ease}
.of-hero.loaded .of-hero-bg img{transform:scale(1)}
.of-vb{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,7,1) 0%,rgba(7,7,7,.6) 40%,rgba(7,7,7,.12) 100%)}
.of-vl{position:absolute;inset:0;background:linear-gradient(105deg,rgba(7,7,7,.75) 0%,transparent 65%)}
.of-hero-inner{position:relative;z-index:2;padding:0 clamp(1.5rem,6vw,5.5rem) clamp(3.5rem,7vh,6rem);max-width:780px}

.of-pill{display:inline-flex;align-items:center;gap:.5rem;background:var(--g12);border:1px solid var(--g20);border-radius:100px;padding:.35rem .9rem;font:500 9px var(--sans);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:1.6rem}
.of-pill-dot{width:4px;height:4px;border-radius:50%;background:var(--gold);animation:pdot 2.2s ease infinite}
@keyframes pdot{0%,100%{opacity:1}50%{opacity:.35}}

.of-hero-h{font:300 clamp(3.2rem,8.5vw,6.5rem) var(--serif);color:var(--cream);letter-spacing:.04em;line-height:.88;margin-bottom:1.3rem}
.of-hero-h em{color:var(--gold);font-style:italic}
.of-hero-p{font:300 15px var(--sans);color:var(--c70);line-height:1.85;max-width:440px;margin-bottom:2.6rem}
.of-hero-btns{display:flex;gap:1rem;flex-wrap:wrap}

/* STICKY FILTER */
.of-sticky{position:sticky;top:0;z-index:30;background:rgba(7,7,7,.93);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border-bottom:1px solid var(--border)}
.of-sticky-inner{display:flex;align-items:center;justify-content:space-between;padding:0 clamp(1.5rem,5vw,4.5rem);gap:1rem}
.of-tabs{display:flex;overflow-x:auto;scrollbar-width:none;gap:0}
.of-tabs::-webkit-scrollbar{display:none}
.of-tab{flex-shrink:0;background:none;border:none;border-bottom:2px solid transparent;color:rgba(196,169,122,.32);font:400 10px var(--sans);letter-spacing:.2em;text-transform:uppercase;padding:1.1rem 1.2rem;white-space:nowrap;transition:all .22s}
.of-tab:hover{color:rgba(196,169,122,.65)}
.of-tab.active{color:var(--gold);border-bottom-color:var(--gold)}
.of-cnt{flex-shrink:0;background:var(--g08);border:1px solid var(--g20);border-radius:100px;font:500 9px var(--sans);letter-spacing:.14em;color:var(--gold);padding:.3rem .9rem;white-space:nowrap}

/* FEATURED BANNER */
.of-banner{position:relative;border-radius:calc(var(--r)*1.25);overflow:hidden;min-height:480px;display:flex;align-items:center;cursor:pointer;border:1px solid var(--border)}
.of-banner img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(0.42) brightness(0.48);transition:filter .95s var(--ease),transform 1.2s var(--ease)}
.of-banner:hover img{filter:saturate(0.72) brightness(0.6);transform:scale(1.04)}
.of-banner-veil{position:absolute;inset:0;background:linear-gradient(95deg,rgba(7,7,7,.96) 0%,rgba(7,7,7,.55) 55%,rgba(7,7,7,.12) 100%)}
.of-banner-body{position:relative;z-index:2;padding:clamp(2.5rem,5.5vw,5rem);max-width:580px}
.of-banner-badge{display:inline-flex;align-items:center;gap:.45rem;background:var(--g12);border:1px solid var(--g20);border-radius:100px;font:500 9px var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--gold);padding:.35rem .9rem;margin-bottom:1.6rem}
.of-banner-title{font:300 clamp(2.2rem,4.8vw,3.8rem) var(--serif);color:var(--cream);letter-spacing:.04em;line-height:1.05;margin-bottom:.9rem}
.of-banner-desc{font:300 13px var(--sans);color:var(--c70);line-height:1.92;margin-bottom:2.2rem}
.of-banner-stats{display:flex;gap:2.8rem;margin-bottom:2.5rem;flex-wrap:wrap}
.of-bstat-label{font:400 8px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:rgba(196,169,122,.38);margin-bottom:.28rem}
.of-bstat-val{font:300 1.25rem var(--serif);color:var(--gold)}
.of-banner-exp{position:absolute;top:1.5rem;right:1.5rem;background:rgba(7,7,7,.72);backdrop-filter:blur(8px);border:1px solid var(--border);border-radius:100px;font:400 9px var(--sans);letter-spacing:.14em;color:rgba(196,169,122,.45);padding:.35rem .9rem}

/* SECTION */
.of-sec{padding:clamp(2.5rem,5.5vw,5rem) clamp(1.5rem,6vw,5rem)}
.of-sec-hd{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:2.5rem;gap:1.5rem;flex-wrap:wrap}
.of-eyebrow{font:500 9px var(--sans);letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:.8rem}
.of-sec-title{font:300 clamp(1.9rem,3.8vw,2.8rem) var(--serif);color:var(--cream);letter-spacing:.04em}
.of-sec-title em{color:var(--gold);font-style:italic}

/* URGENCY */
.of-urgency{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:1.1rem 1.7rem;display:flex;align-items:center;gap:1rem;margin-bottom:2rem}
.of-urgency-dot{width:7px;height:7px;border-radius:50%;background:#e07070;flex-shrink:0;animation:udot 1.6s ease infinite}
@keyframes udot{0%,100%{opacity:1}50%{opacity:.28}}
.of-urgency-txt{font:300 12px var(--sans);color:var(--c70)}
.of-urgency-txt strong{color:var(--cream);font-weight:500}

/* GRID */
.of-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem}
.of-card{background:var(--bg2);border-radius:var(--r);overflow:hidden;border:1px solid var(--border);display:flex;flex-direction:column;transition:transform var(--ease),border-color var(--ease),box-shadow var(--ease)}
.of-card:hover{transform:translateY(-7px);border-color:var(--g20);box-shadow:var(--shadow)}
.of-card-media{position:relative;overflow:hidden;height:228px}
.of-card-img{width:100%;height:100%;object-fit:cover;filter:saturate(0.52);transition:transform .95s var(--ease),filter .65s}
.of-card:hover .of-card-img{transform:scale(1.08);filter:saturate(.98)}
.of-ribbon{position:absolute;top:.9rem;left:.9rem;border-radius:100px;font:600 8px var(--sans);letter-spacing:.14em;text-transform:uppercase;padding:.3rem .85rem}
.of-ribbon.normal{background:var(--gold);color:#070707}
.of-ribbon.hot{background:var(--red);color:#fff}
.of-saving{position:absolute;top:.9rem;right:.9rem;background:rgba(7,7,7,.82);backdrop-filter:blur(8px);border:1px solid rgba(90,190,110,.22);border-radius:100px;font:500 9px var(--sans);letter-spacing:.1em;color:var(--green);padding:.3rem .8rem}

.of-card-body{padding:1.5rem;flex:1;display:flex;flex-direction:column}
.of-card-tag{font:500 8px var(--sans);letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:.55rem}
.of-card-title{font:300 1.3rem var(--serif);color:var(--cream);letter-spacing:.03em;margin-bottom:.5rem;line-height:1.25}
.of-card-desc{font:300 12px var(--sans);color:var(--c40);line-height:1.75;margin-bottom:1.3rem;flex:1}
.of-card-footer{border-top:1px solid var(--g08);padding-top:1rem;display:flex;align-items:flex-end;justify-content:space-between;gap:1rem}
.of-price-lbl{font:400 8px var(--sans);letter-spacing:.22em;text-transform:uppercase;color:rgba(196,169,122,.32);margin-bottom:.2rem}
.of-price{font:300 1.6rem var(--serif);color:var(--gold);letter-spacing:.02em;line-height:1}
.of-price-orig{font:400 10px var(--sans);color:rgba(196,169,122,.28);text-decoration:line-through;margin-top:.15rem}
.of-book-btn{flex-shrink:0;font:500 9px var(--sans);letter-spacing:.14em;text-transform:uppercase;color:#070707;background:var(--gold);border:none;border-radius:100px;padding:.65rem 1.3rem;transition:all .22s;white-space:nowrap}
.of-book-btn:hover{background:var(--gold-h);transform:translateY(-1px)}
.of-expire{font:400 9px var(--sans);letter-spacing:.1em;color:rgba(196,169,122,.28);margin-top:.5rem}

/* PERKS */
.of-perks{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:var(--r);overflow:hidden}
.of-perk{background:var(--bg2);padding:2rem 1.5rem;text-align:center}
.of-perk-icon{width:42px;height:42px;border-radius:50%;border:1px solid var(--g20);background:var(--g08);display:flex;align-items:center;justify-content:center;margin:0 auto .9rem}
.of-perk-icon svg{width:18px;height:18px;stroke:var(--gold);fill:none;stroke-width:1.6}
.of-perk-title{font:500 10px var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--cream);margin-bottom:.4rem}
.of-perk-desc{font:300 11px var(--sans);color:var(--c40);line-height:1.65}

/* TERMS */
.of-terms{background:var(--bg2);border-radius:var(--r);padding:1.6rem 2rem;border:1px solid var(--g08)}
.of-terms-title{font:500 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:rgba(196,169,122,.35);margin-bottom:.8rem}
.of-terms-text{font:300 11px var(--sans);color:rgba(196,169,122,.22);line-height:1.85}

/* FOOTER */
.of-footer{text-align:center;padding:1.6rem;font:400 8px var(--sans);letter-spacing:.3em;text-transform:uppercase;color:rgba(196,169,122,.18);border-top:1px solid var(--border)}

/* ANIMS */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fu{opacity:0;animation:fadeUp .65s ease forwards}
.fu1{animation-delay:.1s}.fu2{animation-delay:.22s}.fu3{animation-delay:.32s}

@media(max-width:640px){
  .of-perks{grid-template-columns:1fr 1fr}
  .of-hero-btns{flex-direction:column}
  .btn-gold,.btn-outline{width:100%;justify-content:center}
  .of-banner-stats{gap:1.5rem}
  .of-sticky-inner{flex-direction:column;align-items:flex-start;padding:.6rem 1.5rem}
}
`;

const OFFERS = [
  { tag:'Stay Longer',title:'The 3-Night Ritual',ribbon:'Save 25%',hot:false,desc:'Stay three nights, pay for two. Includes daily breakfast, a complimentary spa session, and a curated city guide personalised to your interests.',price:'₹18,500',orig:'₹24,600',label:'per night',expire:'Valid till 31 Aug 2025',saving:'Save ₹6,100',img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700',category:'stays' },
  { tag:'Honeymoon',title:'Romantic Escape Package',ribbon:'Most Loved',hot:true,desc:'Petal-strewn suite on arrival, private terrace dinner, couples spa ritual, and a vintage champagne bottle — crafted for two.',price:'₹32,000',orig:'₹41,000',label:'per couple / night',expire:'Year-round offer',saving:'Save ₹9,000',img:'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=700',category:'packages' },
  { tag:'Early Bird',title:'Book 30 Days Ahead',ribbon:'Save 20%',hot:false,desc:'Reserve your suite 30 days in advance and receive 20% off the nightly rate plus complimentary early check-in from 10 AM.',price:'₹14,800',orig:'₹18,500',label:'per night',expire:'No blackout dates',saving:'Save ₹3,700',img:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=700',category:'stays' },
  { tag:'Weekend',title:'The City Weekend',ribbon:'New',hot:false,desc:'Arrive Friday, leave Sunday refreshed. Two nights, welcome cocktails, rooftop breakfast, and Sunday late checkout at 2 PM.',price:'₹22,000',orig:'₹27,500',label:'for 2 nights',expire:'Fri – Sun only',saving:'Save ₹5,500',img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700',category:'packages' },
  { tag:'Culinary',title:"Chef's Table Dinner Add-On",ribbon:'Popular',hot:false,desc:"Add the private chef experience to any stay at a 30% discount. Seven courses, paired wines, in the intimacy of your suite.",price:'₹8,500',orig:'₹12,000',label:'per couple',expire:'Subject to availability',saving:'Save ₹3,500',img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700',category:'experiences' },
  { tag:'Wellness',title:'Spa & Stay Bundle',ribbon:'Save 30%',hot:false,desc:'Two spa sessions included per night of your stay. Choose from our signature rituals — each 90 minutes, fully bespoke.',price:'₹19,500',orig:'₹27,800',label:'per night',expire:'Valid till 31 Dec 2025',saving:'Save ₹8,300',img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700',category:'experiences' },
];

const TABS = ['All Offers','Stays','Packages','Experiences'];

const PERKS = [
  { title:'Free Cancellation',desc:'Cancel up to 48 hours before check-in at no charge',icon:<><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></> },
  { title:'Best Rate Guarantee',desc:"Book direct and we'll match any lower price you find",icon:<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 8v8m-3-4h6"/></> },
  { title:'24hr Concierge',desc:'Our team is available around the clock for any request',icon:<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> },
  { title:'No Hidden Fees',desc:'The price you see is the price you pay — always',icon:<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> },
];

const Arr = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

export default function OffersPage() {
  const [vis, setVis] = useState(false);
  const [tab, setTab] = useState('All Offers');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('of-css')) {
      const s = document.createElement('style'); s.id = 'of-css'; s.textContent = CSS;
      document.head.appendChild(s);
    }
    setTimeout(() => setVis(true), 50);
    setTimeout(() => heroRef.current?.classList.add('loaded'), 180);
  }, []);

  const filtered = tab === 'All Offers' ? OFFERS : OFFERS.filter(o => o.category === tab.toLowerCase());

  return (
    <div style={{ opacity: vis ? 1 : 0, transition: 'opacity .5s ease', background: '#070707', minHeight: '100vh' }}>

      {/* HERO */}
      <div className="of-hero" ref={heroRef}>
        <div className="of-hero-bg"><img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800" alt=""/></div>
        <div className="of-vb"/><div className="of-vl"/>
        <div className="of-hero-inner">
          <div className="of-pill fu fu1"><span className="of-pill-dot"/>TRIPLEONE · Limited Time</div>
          <h1 className="of-hero-h fu fu2">Exclusive<br/><em>Offers</em></h1>
          <p className="of-hero-p fu fu3">Curated privileges for the discerning traveller. Each offer is designed to elevate your stay — never to compromise it.</p>
          <div className="of-hero-btns fu">
            <button className="btn-gold"><Arr/> See All Offers</button>
            <button className="btn-outline">Book Direct</button>
          </div>
        </div>
      </div>

      {/* STICKY TABS */}
      <div className="of-sticky">
        <div className="of-sticky-inner">
          <div className="of-tabs">
            {TABS.map(t => <button key={t} className={`of-tab${tab===t?' active':''}`} onClick={() => setTab(t)}>{t}</button>)}
          </div>
          <span className="of-cnt">{filtered.length} Offer{filtered.length!==1?'s':''}</span>
        </div>
      </div>

      {/* FEATURED BANNER */}
      <div className="of-sec">
        <div className="of-banner">
          <img src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600" alt="Featured Offer" loading="lazy"/>
          <div className="of-banner-veil"/>
          <div className="of-banner-body">
            <div className="of-banner-badge">⭐ Featured · Most Popular</div>
            <h2 className="of-banner-title">The 3-Night Ritual</h2>
            <p className="of-banner-desc">Stay three nights, pay for two. Our most celebrated offer — includes breakfast, spa, and a bespoke city guide. Available at all TRIPLEONE properties.</p>
            <div className="of-banner-stats">
              <div><div className="of-bstat-label">From</div><div className="of-bstat-val">₹18,500 / night</div></div>
              <div><div className="of-bstat-label">Saving</div><div className="of-bstat-val">Up to 25%</div></div>
              <div><div className="of-bstat-label">Properties</div><div className="of-bstat-val">All Cities</div></div>
            </div>
            <button className="btn-gold"><Arr/> Book This Offer</button>
          </div>
          <div className="of-banner-exp">Valid till 31 Aug 2025</div>
        </div>
      </div>

      {/* OFFERS GRID */}
      <div className="of-sec" style={{ paddingTop:0 }}>
        <div className="of-sec-hd">
          <div>
            <div className="of-eyebrow">Collection</div>
            <h2 className="of-sec-title"><em>{tab}</em></h2>
          </div>
        </div>
        <div className="of-urgency">
          <div className="of-urgency-dot"/>
          <p className="of-urgency-txt"><strong>3 guests</strong> are viewing offers right now — rates may change. Book direct for the best price.</p>
        </div>
        <div className="of-grid">
          {filtered.map((o,i) => (
            <div className="of-card" key={i}>
              <div className="of-card-media">
                <img className="of-card-img" src={o.img} alt={o.title} loading="lazy"/>
                <span className={`of-ribbon ${o.hot?'hot':'normal'}`}>{o.ribbon}</span>
                <span className="of-saving">{o.saving}</span>
              </div>
              <div className="of-card-body">
                <div className="of-card-tag">{o.tag}</div>
                <h3 className="of-card-title">{o.title}</h3>
                <p className="of-card-desc">{o.desc}</p>
                <div className="of-card-footer">
                  <div>
                    <div className="of-price-lbl">{o.label}</div>
                    <div className="of-price">{o.price}</div>
                    <div className="of-price-orig">{o.orig}</div>
                  </div>
                  <button className="of-book-btn">Book Now</button>
                </div>
                <div className="of-expire">{o.expire}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PERKS */}
      <div className="of-sec" style={{ paddingTop:0 }}>
        <div className="of-sec-hd">
          <div>
            <div className="of-eyebrow">Why Book Direct</div>
            <h2 className="of-sec-title">Always <em>Better</em> With Us</h2>
          </div>
        </div>
        <div className="of-perks">
          {PERKS.map((p,i) => (
            <div className="of-perk" key={i}>
              <div className="of-perk-icon"><svg viewBox="0 0 24 24">{p.icon}</svg></div>
              <div className="of-perk-title">{p.title}</div>
              <div className="of-perk-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TERMS */}
      <div className="of-sec" style={{ paddingTop:0 }}>
        <div className="of-terms">
          <div className="of-terms-title">Terms & Conditions</div>
          <div className="of-terms-text">All offers are subject to availability and may be withdrawn at any time without notice. Prices are per night unless stated otherwise, exclusive of applicable taxes. Offers cannot be combined unless explicitly stated. TRIPLEONE reserves the right to modify terms at its discretion. For assistance, contact our concierge team directly.</div>
        </div>
      </div>

      <div className="of-footer">TRIPLEONE · EXCLUSIVE OFFERS · INDIA</div>
    </div>
  );
}