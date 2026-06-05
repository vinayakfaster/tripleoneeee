'use client';
import { useEffect, useState, useRef } from 'react';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#c4a97a;
  --gold-hover:#d4b98a;
  --g20:rgba(196,169,122,0.2);
  --g12:rgba(196,169,122,0.12);
  --g08:rgba(196,169,122,0.08);
  --g04:rgba(196,169,122,0.04);
  --cream:#f5f2ea;
  --c70:rgba(245,242,234,0.7);
  --c40:rgba(245,242,234,0.4);
  --c20:rgba(245,242,234,0.2);
  --bg:#070707;
  --bg2:#0d0d0d;
  --bg3:#121212;
  --border:rgba(196,169,122,0.1);
  --serif:'Cormorant Garamond',Georgia,serif;
  --sans:'DM Sans','Helvetica Neue',sans-serif;
  --ease:.4s cubic-bezier(.25,.46,.45,.94);
  --shadow:0 32px 80px rgba(0,0,0,0.7);
  --r:16px;
}

html{background:var(--bg);color:var(--cream);font-family:var(--sans);overflow-x:hidden;scroll-behavior:smooth}
body{background:var(--bg)}
img{display:block;max-width:100%}
button{font-family:var(--sans);cursor:pointer}
::-webkit-scrollbar{width:2px}
::-webkit-scrollbar-thumb{background:var(--g20);border-radius:2px}

/* ─── HERO ─── */
.ex-hero{
  position:relative;height:100svh;min-height:640px;
  display:flex;align-items:flex-end;overflow:hidden;
}
.ex-hero-bg{position:absolute;inset:0}
.ex-hero-bg img{
  width:100%;height:100%;object-fit:cover;
  filter:saturate(0.45) brightness(0.45);
  transform:scale(1.06);transition:transform 10s ease;
}
.ex-hero.loaded .ex-hero-bg img{transform:scale(1)}
.ex-veil-b{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,7,1) 0%,rgba(7,7,7,0.65) 35%,rgba(7,7,7,0.15) 75%,transparent 100%)}
.ex-veil-l{position:absolute;inset:0;background:linear-gradient(105deg,rgba(7,7,7,0.75) 0%,transparent 65%)}

.ex-hero-inner{
  position:relative;z-index:2;
  padding:0 clamp(1.5rem,6vw,5.5rem) clamp(3.5rem,7vh,6rem);
  max-width:820px;width:100%;
}

.ex-eyebrow{
  display:inline-flex;align-items:center;gap:.55rem;
  font:500 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--gold);
  margin-bottom:1.6rem;
}
.ex-eyebrow-dot{
  width:4px;height:4px;border-radius:50%;background:var(--gold);
  animation:dotpulse 2.2s ease infinite;
}
@keyframes dotpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}

.ex-hero-h{
  font:300 clamp(3.8rem,9.5vw,7.5rem) var(--serif);
  color:var(--cream);letter-spacing:.03em;line-height:.88;
  margin-bottom:1.6rem;
}
.ex-hero-h em{color:var(--gold);font-style:italic}

.ex-hero-p{
  font:300 15px var(--sans);color:var(--c70);
  line-height:1.85;max-width:480px;margin-bottom:2.8rem;
  letter-spacing:.01em;
}

.ex-hero-btns{display:flex;gap:1rem;flex-wrap:wrap}

.btn-gold{
  display:inline-flex;align-items:center;gap:.55rem;
  background:var(--gold);color:#070707;border:none;
  border-radius:100px;padding:.9rem 2.2rem;
  font:500 10px var(--sans);letter-spacing:.14em;text-transform:uppercase;
  transition:all var(--ease);white-space:nowrap;
}
.btn-gold:hover{background:var(--gold-hover);transform:translateY(-2px);box-shadow:0 14px 36px rgba(196,169,122,0.28)}
.btn-gold svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2.2}

.btn-outline{
  display:inline-flex;align-items:center;gap:.55rem;
  background:transparent;color:var(--cream);
  border:1px solid rgba(245,242,234,0.22);
  border-radius:100px;padding:.9rem 2.2rem;
  font:400 10px var(--sans);letter-spacing:.14em;text-transform:uppercase;
  transition:all var(--ease);white-space:nowrap;
}
.btn-outline:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-2px)}

.ex-scroll-ind{
  position:absolute;right:clamp(1.5rem,4vw,3.5rem);bottom:clamp(2.5rem,5vh,5rem);
  display:flex;flex-direction:column;align-items:center;gap:.7rem;z-index:2;
}
.ex-scroll-line{
  width:1px;height:56px;
  background:linear-gradient(to bottom,transparent,var(--gold));
  animation:scrollbar 2.2s ease infinite;
}
@keyframes scrollbar{
  0%{transform:scaleY(0);transform-origin:top}
  50%{transform:scaleY(1);transform-origin:top}
  51%{transform:scaleY(1);transform-origin:bottom}
  100%{transform:scaleY(0);transform-origin:bottom}
}
.ex-scroll-lbl{font:400 8px var(--sans);letter-spacing:.35em;text-transform:uppercase;color:rgba(196,169,122,.35);writing-mode:vertical-rl}

/* ─── STATS ─── */
.ex-stats{
  display:grid;grid-template-columns:repeat(3,1fr);
  background:var(--bg2);
  border-bottom:1px solid var(--border);
}
.ex-stat{
  padding:2.2rem 1.5rem;text-align:center;
  position:relative;
}
.ex-stat+.ex-stat::before{
  content:'';position:absolute;left:0;top:22%;bottom:22%;
  width:1px;background:var(--border);
}
.ex-stat-n{font:300 2.6rem var(--serif);color:var(--gold);letter-spacing:.04em;line-height:1}
.ex-stat-l{font:400 8px var(--sans);letter-spacing:.3em;text-transform:uppercase;color:rgba(196,169,122,.38);margin-top:.5rem}

/* ─── SECTION WRAPPER ─── */
.ex-sec{padding:clamp(3.5rem,7vw,6.5rem) clamp(1.5rem,6vw,5rem)}

.ex-sec-hd{
  display:flex;align-items:flex-end;justify-content:space-between;
  margin-bottom:3rem;gap:2rem;flex-wrap:wrap;
}
.ex-sec-eyebrow{font:500 9px var(--sans);letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:.8rem}
.ex-sec-title{font:300 clamp(2rem,4.5vw,3.2rem) var(--serif);color:var(--cream);letter-spacing:.04em;line-height:1.05}
.ex-sec-title em{color:var(--gold);font-style:italic}
.ex-sec-sub{font:300 13px var(--sans);color:var(--c40);margin-top:.4rem;letter-spacing:.01em}

.ex-link-btn{
  font:400 10px var(--sans);letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold);background:none;border:none;
  border-bottom:1px solid var(--g20);padding-bottom:.25rem;
  white-space:nowrap;transition:border-color .22s;
}
.ex-link-btn:hover{border-color:var(--gold)}

/* ─── FEATURED SPLIT ─── */
.ex-featured{
  display:grid;grid-template-columns:1.15fr 1fr;
  border-radius:var(--r);overflow:hidden;
  border:1px solid var(--border);
  box-shadow:var(--shadow);
}
.ex-feat-media{position:relative;overflow:hidden;min-height:560px}
.ex-feat-media img{
  width:100%;height:100%;object-fit:cover;
  filter:saturate(0.6);
  transition:transform 1.1s var(--ease),filter .9s;
}
.ex-featured:hover .ex-feat-media img{transform:scale(1.05);filter:saturate(0.9)}
.ex-feat-veil{position:absolute;inset:0;background:linear-gradient(135deg,rgba(7,7,7,.45) 0%,transparent 55%)}
.ex-feat-badge{
  position:absolute;top:1.4rem;left:1.4rem;
  width:42px;height:42px;border-radius:50%;
  border:1px solid var(--g20);background:rgba(7,7,7,.65);backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;
  font:300 11px var(--serif);color:var(--gold);letter-spacing:.04em;
}
.ex-feat-body{
  padding:clamp(2rem,4.5vw,4rem);
  background:var(--bg2);
  display:flex;flex-direction:column;justify-content:center;
}
.ex-feat-tag{
  display:inline-flex;align-items:center;gap:.5rem;
  font:500 9px var(--sans);letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:1.4rem;
}
.ex-feat-tag::before{content:'';width:22px;height:1px;background:var(--gold)}
.ex-feat-title{font:300 clamp(1.7rem,3.2vw,2.6rem) var(--serif);color:var(--cream);letter-spacing:.04em;line-height:1.12;margin-bottom:1.1rem}
.ex-feat-desc{font:300 13px var(--sans);color:var(--c70);line-height:1.95;margin-bottom:2rem}
.ex-feat-list{list-style:none;margin-bottom:2.8rem}
.ex-feat-li{
  display:flex;align-items:center;gap:.9rem;
  font:300 12px var(--sans);color:rgba(245,242,234,.55);
  padding:.6rem 0;border-bottom:1px solid var(--g08);
}
.ex-feat-li:last-child{border-bottom:none}
.ex-feat-li-icon{
  width:18px;height:18px;border-radius:50%;flex-shrink:0;
  border:1px solid var(--g20);
  display:flex;align-items:center;justify-content:center;
}
.ex-feat-li-icon svg{width:9px;height:9px;stroke:var(--gold);fill:none;stroke-width:2.2}

/* ─── CARDS GRID ─── */
.ex-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}
.ex-card{
  background:var(--bg2);border-radius:var(--r);overflow:hidden;
  border:1px solid var(--border);
  transition:transform var(--ease),border-color var(--ease),box-shadow var(--ease);
}
.ex-card:hover{transform:translateY(-7px);border-color:var(--g20);box-shadow:var(--shadow)}

.ex-card-media{position:relative;overflow:hidden;height:248px}
.ex-card-img{
  width:100%;height:100%;object-fit:cover;filter:saturate(0.55);
  transition:transform .95s var(--ease),filter .65s;
}
.ex-card:hover .ex-card-img{transform:scale(1.08);filter:saturate(1)}
.ex-card-label{
  position:absolute;top:.85rem;left:.85rem;
  background:rgba(7,7,7,.78);backdrop-filter:blur(10px);
  border:1px solid var(--g20);border-radius:100px;
  font:500 8px var(--sans);letter-spacing:.18em;text-transform:uppercase;color:var(--gold);
  padding:.32rem .8rem;
}
.ex-card-dur{
  position:absolute;bottom:.85rem;right:.85rem;
  background:rgba(7,7,7,.78);backdrop-filter:blur(10px);
  border:1px solid var(--border);border-radius:100px;
  font:400 9px var(--sans);letter-spacing:.1em;color:var(--c70);
  padding:.32rem .8rem;
  display:flex;align-items:center;gap:.4rem;
}
.ex-card-dur svg{width:10px;height:10px;stroke:var(--gold);fill:none;stroke-width:2}

.ex-card-body{padding:1.5rem}
.ex-card-tag{font:500 8px var(--sans);letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:.55rem}
.ex-card-title{font:300 1.3rem var(--serif);color:var(--cream);letter-spacing:.03em;margin-bottom:.5rem;line-height:1.3}
.ex-card-desc{font:300 12px var(--sans);color:var(--c40);line-height:1.75;margin-bottom:1.3rem}
.ex-card-footer{
  display:flex;align-items:center;justify-content:space-between;
  padding-top:1rem;border-top:1px solid var(--g08);
}
.ex-card-cta{
  font:500 9px var(--sans);letter-spacing:.15em;text-transform:uppercase;
  color:var(--gold);background:none;border:none;
  display:flex;align-items:center;gap:.45rem;
  transition:gap .22s;padding:0;
}
.ex-card-cta:hover{gap:.75rem}
.ex-card-cta svg{width:12px;height:12px;stroke:var(--gold);fill:none;stroke-width:2.2}

/* ─── CITIES ─── */
.ex-cities{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:1rem}
.ex-city{
  position:relative;border-radius:var(--r);height:310px;
  overflow:hidden;cursor:pointer;border:1px solid var(--border);
  transition:transform var(--ease),box-shadow var(--ease);
}
.ex-city:hover{transform:translateY(-5px);box-shadow:var(--shadow)}
.ex-city img{
  width:100%;height:100%;object-fit:cover;
  filter:saturate(0.28) brightness(0.5);
  transition:all .9s var(--ease);
}
.ex-city:hover img{filter:saturate(0.8) brightness(0.65);transform:scale(1.08)}
.ex-city-overlay{
  position:absolute;inset:0;
  background:linear-gradient(to top,rgba(7,7,7,.95) 0%,rgba(7,7,7,.18) 60%,transparent 100%);
  display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;
  padding:1.6rem;
}
.ex-city-bar{width:22px;height:1px;background:var(--gold);margin-bottom:.85rem;transition:width .4s}
.ex-city:hover .ex-city-bar{width:42px}
.ex-city-name{font:300 1.45rem var(--serif);color:var(--cream);letter-spacing:.08em;margin-bottom:.3rem}
.ex-city-count{font:400 9px var(--sans);letter-spacing:.22em;text-transform:uppercase;color:rgba(196,169,122,.5)}
.ex-city-arr{
  position:absolute;top:1rem;right:1rem;
  width:34px;height:34px;border-radius:50%;
  border:1px solid var(--border);background:rgba(7,7,7,.6);backdrop-filter:blur(6px);
  display:flex;align-items:center;justify-content:center;
  opacity:0;transition:opacity .3s;
}
.ex-city:hover .ex-city-arr{opacity:1}
.ex-city-arr svg{width:12px;height:12px;stroke:var(--gold);fill:none;stroke-width:2}

/* ─── TESTIMONIAL ─── */
.ex-testimonial{
  background:var(--bg2);border:1px solid var(--border);
  border-radius:calc(var(--r)*1.5);
  padding:clamp(2.5rem,5vw,4.5rem);
  text-align:center;position:relative;overflow:hidden;
}
.ex-testimonial::before{
  content:'center';position:absolute;top:-1.5rem;left:2rem;
  font:300 9rem var(--serif);color:rgba(196,169,122,.05);line-height:1;
}
.ex-stars{display:flex;justify-content:center;gap:.35rem;margin-bottom:1.6rem}
.ex-star{color:var(--gold);font-size:15px}
.ex-test-q{
  font:300 italic clamp(1.1rem,2.8vw,1.6rem) var(--serif);
  color:var(--c70);line-height:1.75;max-width:660px;margin:0 auto 1.6rem;
  letter-spacing:.02em;
}
.ex-test-author{font:500 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:rgba(196,169,122,.45)}

/* ─── CTA BANNER ─── */
.ex-cta{
  position:relative;border-radius:calc(var(--r)*1.5);overflow:hidden;
  min-height:340px;display:flex;align-items:center;
}
.ex-cta img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(0.35) brightness(0.38)}
.ex-cta-veil{position:absolute;inset:0;background:rgba(7,7,7,.68)}
.ex-cta-body{position:relative;z-index:2;padding:clamp(2.5rem,5.5vw,5rem);max-width:580px}
.ex-cta-title{font:300 clamp(2rem,4.5vw,3.2rem) var(--serif);color:var(--cream);letter-spacing:.04em;margin-bottom:.9rem;line-height:1.1}
.ex-cta-sub{font:300 13px var(--sans);color:var(--c70);line-height:1.85;margin-bottom:2.2rem}

/* ─── FOOTER ─── */
.ex-footer{
  text-align:center;padding:1.6rem;
  font:400 8px var(--sans);letter-spacing:.3em;text-transform:uppercase;
  color:rgba(196,169,122,.18);border-top:1px solid var(--border);
}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.fu{opacity:0;animation:fadeUp .7s ease forwards}
.fu1{animation-delay:.1s}.fu2{animation-delay:.22s}.fu3{animation-delay:.34s}.fu4{animation-delay:.46s}

/* ─── RESPONSIVE ─── */
@media(max-width:960px){
  .ex-featured{grid-template-columns:1fr}
  .ex-feat-media{min-height:300px}
}
@media(max-width:640px){
  .ex-stats{grid-template-columns:1fr 1fr}
  .ex-stat:nth-child(3){grid-column:1/-1}
  .ex-stat:nth-child(2)+.ex-stat::before,.ex-stat:last-child::before{display:none}
  .ex-stat{padding:1.6rem 1rem}
  .ex-cities{grid-template-columns:1fr 1fr}
  .ex-hero-btns{flex-direction:column}
  .btn-gold,.btn-outline{width:100%;justify-content:center}
  .ex-sec-hd{flex-direction:column;align-items:flex-start}
}
`;

const EXPERIENCES = [
  { tag:'Culinary', title:'Private Chef Dining', desc:'An intimate multi-course dinner crafted by our Michelin-trained resident chef, served in your suite or on the terrace under the stars.', duration:'3–4 hrs', badge:'Exclusive', img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700' },
  { tag:'Wellness', title:'Rooftop Spa Ritual', desc:'Ancient healing traditions meet modern luxury. Customised treatments using rare botanical extracts sourced from across the subcontinent.', duration:'2 hrs', badge:'Popular', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=700' },
  { tag:'Culture', title:'City After Dark Tour', desc:"A curated evening through the city's hidden gems — galleries, heritage lanes, and rooftop bars only locals know.", duration:'4–5 hrs', badge:'Curated', img:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700' },
  { tag:'Adventure', title:'Sunrise Helicopter Ride', desc:'Watch the city wake from above. A perspective of iconic skylines that no other vantage point can match.', duration:'90 min', badge:'Signature', img:'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=700' },
  { tag:'Leisure', title:'Private Pool Evening', desc:'Your plunge pool set with candles, a chilled vintage champagne, and a curated playlist — reserved exclusively for you.', duration:'All evening', badge:'Romantic', img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700' },
  { tag:'Culinary', title:'Sunrise Breakfast Ritual', desc:'A hand-prepared breakfast spread on your private terrace. Freshly pressed juices, artisan breads, and seasonal fruits.', duration:'1.5 hrs', badge:'Daily', img:'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=700' },
];

const CITIES = [
  { name:'Delhi',     count:'3 Experiences', img:'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500' },
  { name:'Noida',     count:'2 Experiences', img:'https://images.unsplash.com/photo-1596178060810-72f53ce9a65c?w=500' },
  { name:'Gurugram',  count:'3 Experiences', img:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500' },
  { name:'Goa',       count:'5 Experiences', img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500' },
  { name:'Jaipur',    count:'3 Experiences', img:'https://images.unsplash.com/photo-1477587458883-47145ed31e0e?w=500' },
  { name:'Udaipur',   count:'4 Experiences', img:'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=500' },
];

const Arr = () => <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Check = () => <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const Clock = () => <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

export default function ExperiencesPage() {
  const [vis, setVis] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('ex-css')) {
      const s = document.createElement('style');
      s.id = 'ex-css'; s.textContent = CSS;
      document.head.appendChild(s);
    }
    setTimeout(() => setVis(true), 50);
    setTimeout(() => heroRef.current?.classList.add('loaded'), 180);
  }, []);

  return (
    <div style={{ opacity: vis ? 1 : 0, transition: 'opacity .5s ease', background: '#070707', minHeight: '100vh' }}>

      {/* HERO */}
      <div className="ex-hero" ref={heroRef}>
        <div className="ex-hero-bg">
          <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1800" alt="" />
        </div>
        <div className="ex-veil-b"/><div className="ex-veil-l"/>
        <div className="ex-hero-inner">
          <div className="ex-eyebrow fu fu1"><span className="ex-eyebrow-dot"/>TRIPLEONE · Curated Journeys</div>
          <h1 className="ex-hero-h fu fu2">Beyond<br/><em>The Room</em></h1>
          <p className="ex-hero-p fu fu3">Extraordinary experiences crafted for those who seek more than a stay. Each moment, designed to become a memory you will return to.</p>
          <div className="ex-hero-btns fu fu4">
            <button className="btn-gold"><Arr/> Explore All</button>
            <button className="btn-outline">View by City</button>
          </div>
        </div>
        <div className="ex-scroll-ind">
          <div className="ex-scroll-line"/>
          <span className="ex-scroll-lbl">Scroll</span>
        </div>
      </div>

      {/* STATS */}
      <div className="ex-stats">
        {[
          { n:'24+', l:'Curated Experiences' },
          { n:'6',   l:'Cities' },
          { n:'100%',l:'Private & Exclusive' },
        ].map((s,i) => (
          <div className="ex-stat" key={i}>
            <div className="ex-stat-n">{s.n}</div>
            <div className="ex-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* FEATURED */}
      <div className="ex-sec">
        <div className="ex-sec-hd">
          <div>
            <div className="ex-sec-eyebrow">Signature Experience</div>
            <h2 className="ex-sec-title">The <em>Chef&apos;s Table</em></h2>
            <p className="ex-sec-sub">The one everyone talks about</p>
          </div>
        </div>
        <div className="ex-featured">
          <div className="ex-feat-media">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000" alt="Private Chef" loading="lazy"/>
            <div className="ex-feat-veil"/>
            <div className="ex-feat-badge">01</div>
          </div>
          <div className="ex-feat-body">
            <div className="ex-feat-tag">Culinary · Exclusive</div>
            <h3 className="ex-feat-title">The Private Chef&apos;s Table</h3>
            <p className="ex-feat-desc">A fully bespoke dining journey inside your suite. Our Michelin-trained chef arrives with seasonal produce, crafts a menu around your palate, and delivers an evening you will genuinely miss.</p>
            <ul className="ex-feat-list">
              {['7-course tasting menu, fully personalised','Sommelier-paired wine or mocktail flight','Available in-suite, terrace, or rooftop','Complimentary for stays of 3+ nights'].map((item,i) => (
                <li className="ex-feat-li" key={i}>
                  <span className="ex-feat-li-icon"><Check/></span>{item}
                </li>
              ))}
            </ul>
            <button className="btn-gold" style={{ alignSelf:'flex-start' }}><Arr/> Enquire Now</button>
          </div>
        </div>
      </div>

      {/* ALL EXPERIENCES */}
      <div className="ex-sec" style={{ paddingTop:0 }}>
        <div className="ex-sec-hd">
          <div>
            <div className="ex-sec-eyebrow">Collection</div>
            <h2 className="ex-sec-title">All <em>Experiences</em></h2>
            <p className="ex-sec-sub">Tailored to your stay</p>
          </div>
          <button className="ex-link-btn">View Calendar →</button>
        </div>
        <div className="ex-grid">
          {EXPERIENCES.map((e,i) => (
            <div className="ex-card" key={i}>
              <div className="ex-card-media">
                <img className="ex-card-img" src={e.img} alt={e.title} loading="lazy"/>
                <span className="ex-card-label">{e.badge}</span>
                <span className="ex-card-dur"><Clock/>{e.duration}</span>
              </div>
              <div className="ex-card-body">
                <div className="ex-card-tag">{e.tag}</div>
                <h3 className="ex-card-title">{e.title}</h3>
                <p className="ex-card-desc">{e.desc}</p>
                <div className="ex-card-footer">
                  <button className="ex-card-cta">Reserve <Arr/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div className="ex-sec" style={{ paddingTop:0 }}>
        <div className="ex-testimonial">
          <div className="ex-stars">{'★★★★★'.split('').map((s,i) => <span key={i} className="ex-star">{s}</span>)}</div>
          <p className="ex-test-q">&ldquo;The private chef dinner on our terrace was genuinely the finest meal we have had — anywhere. TRIPLEONE understands what luxury actually means.&rdquo;</p>
          <div className="ex-test-author">Priya & Arjun S. · Gurugram · Stayed May 2025</div>
        </div>
      </div>

      {/* CITIES */}
      <div className="ex-sec" style={{ paddingTop:0 }}>
        <div className="ex-sec-hd">
          <div>
            <div className="ex-sec-eyebrow">Locations</div>
            <h2 className="ex-sec-title">By <em>City</em></h2>
            <p className="ex-sec-sub">Experiences across all our properties</p>
          </div>
        </div>
        <div className="ex-cities">
          {CITIES.map((c,i) => (
            <div className="ex-city" key={i}>
              <img src={c.img} alt={c.name} loading="lazy"/>
              <div className="ex-city-overlay">
                <div className="ex-city-bar"/>
                <div className="ex-city-name">{c.name}</div>
                <div className="ex-city-count">{c.count}</div>
              </div>
              <div className="ex-city-arr"><Arr/></div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ex-sec" style={{ paddingTop:0 }}>
        <div className="ex-cta">
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600" alt="" loading="lazy"/>
          <div className="ex-cta-veil"/>
          <div className="ex-cta-body">
            <h3 className="ex-cta-title">Ready to craft your experience?</h3>
            <p className="ex-cta-sub">Our concierge team is available 24 hours. Tell us what you have in mind and we will handle the rest.</p>
            <button className="btn-gold"><Arr/> Speak to Concierge</button>
          </div>
        </div>
      </div>

      <div className="ex-footer">TRIPLEONE · CURATED EXPERIENCES · INDIA</div>
    </div>
  );
}