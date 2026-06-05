'use client';
import { useEffect, useState } from 'react';

const CSS = `
.ab-page{
  background:#050505;
  color:#f5f2ea;
  min-height:100vh;
  width:100%;
  isolation:isolate;
}
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#D4AF7A;
  --gold-h:#E5C99A;

  --cream:#FFFFFF;
  --text:#F8FAFC;
  --text-secondary:#E2E8F0;
  --text-muted:#CBD5E1;

  --c55:rgba(255,255,255,.55);
  --c65:rgba(255,255,255,.65);

  --bg:#050505;
  --bg2:#0B0B0B;
  --bg3:#111111;

  --g20:rgba(212,175,122,.25);
  --g12:rgba(212,175,122,.15);
  --g08:rgba(212,175,122,.08);

  --border:rgba(255,255,255,.08);
  --border-light:rgba(255,255,255,.05);

  --shadow:
    0 10px 40px rgba(0,0,0,.35),
    0 30px 80px rgba(0,0,0,.25);

  --serif:'Cormorant Garamond',Georgia,serif;
  --sans:'DM Sans','Helvetica Neue',sans-serif;
}
html,body{background:var(--bg);color:var(--cream);font-family:var(--sans);overflow-x:hidden;scroll-behavior:smooth}
::-webkit-scrollbar{width:2px}::-webkit-scrollbar-thumb{background:var(--g20);border-radius:2px}
img{display:block}
button{font-family:var(--sans);cursor:pointer}

/* HERO */
.ab-hero{position:relative;height:65vh;min-height:480px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.ab-hero-veil{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(5,5,5,.4) 0%,rgba(5,5,5,.95) 100%)}
.ab-hero-content{position:relative;z-index:2;text-align:center;padding:0 2rem;max-width:680px}
.ab-eyebrow{font:400 9px var(--sans);letter-spacing:.5em;text-transform:uppercase;color:var(--c55);margin-bottom:1.4rem}
.ab-hero-rule{width:38px;height:1px;background:var(--gold);margin:0 auto 1.4rem}
.ab-hero-title{font:300 clamp(3.5rem,9vw,7rem) var(--serif);color:var(--gold);letter-spacing:.18em;line-height:.88;margin-bottom:1.6rem}
.ab-hero-quote{font:300 italic clamp(1rem,2.2vw,1.4rem) var(--serif);color:var(--c55);letter-spacing:.08em;max-width:560px;margin:0 auto;line-height:1.7}
.ab-hero-line{position:absolute;bottom:0;left:4rem;right:4rem;height:1px;background:linear-gradient(90deg,transparent 0%,var(--gold) 50%,transparent 100%)}

/* STORY SPLIT */
.ab-story{display:grid;grid-template-columns:1fr;min-height:auto;border-bottom:1px solid var(--border)}
.ab-story-body{padding:clamp(2.5rem,5vw,4rem) clamp(2rem,5vw,4.5rem);display:flex;flex-direction:column;justify-content:center;text-align:center;max-width:800px;margin:0 auto}
.ab-story-rule{width:36px;height:1px;background:var(--gold);margin:0 auto 1.2rem}
.ab-story-label{font:400 9px var(--sans);letter-spacing:.4em;text-transform:uppercase;color:var(--c55);margin-bottom:.8rem}
.ab-story-title{font:300 clamp(1.9rem,3.8vw,3.2rem) var(--serif);color:var(--cream);letter-spacing:.05em;line-height:1.1;margin-bottom:1.4rem}
.ab-story-text{font:300 14px var(--sans);color:var(--c65);line-height:1.85;margin-bottom:.8rem}

/* NUMBERS */
.ab-numbers{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--border)}
.ab-num{padding:2.4rem 1.2rem;text-align:center;border-right:1px solid var(--border)}
.ab-num:last-child{border-right:none}
.ab-num-val{font:300 2.8rem var(--serif);color:var(--gold);letter-spacing:.06em;line-height:1}
.ab-num-label{font:400 8px var(--sans);letter-spacing:.32em;text-transform:uppercase;color:var(--c55);margin-top:.6rem}

/* PHILOSOPHY */
.ab-phil{padding:clamp(3.5rem,6vw,5rem) clamp(1.5rem,5vw,4.5rem);border-bottom:1px solid var(--border)}
.ab-phil-hd{text-align:center;max-width:580px;margin:0 auto 3.5rem}
.ab-phil-rule{width:36px;height:1px;background:var(--gold);margin:0 auto 1.2rem}
.ab-phil-title{font:300 clamp(1.9rem,3.8vw,2.8rem) var(--serif);color:var(--cream);letter-spacing:.08em;margin-bottom:.5rem}
.ab-phil-sub{font:400 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--c55)}
.ab-phil-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;background:transparent}
.ab-phil-card{background:transparent;padding:2rem 1.5rem;border:1px solid var(--border);border-radius:8px;transition:all .3s;cursor:pointer}
.ab-phil-card:hover{border-color:var(--gold);background:rgba(196,169,122,0.04);transform:translateY(-4px)}
.ab-phil-num{font:300 3rem var(--serif);color:rgba(196,169,122,.12);letter-spacing:.12em;margin-bottom:-.4rem}
.ab-phil-card-title{font:300 1.2rem var(--serif);color:var(--gold);letter-spacing:.06em;margin-bottom:.7rem}
.ab-phil-card-text{font:300 13px var(--sans);color:var(--c65);line-height:1.75}

/* TEAM */
.ab-team{padding:clamp(3.5rem,6vw,5rem) clamp(1.5rem,5vw,4.5rem);border-bottom:1px solid var(--border)}
.ab-team-hd{text-align:center;margin-bottom:3rem}
.ab-team-rule{width:36px;height:1px;background:var(--gold);margin:0 auto 1.2rem}
.ab-team-title{font:300 clamp(1.7rem,3.2vw,2.4rem) var(--serif);color:var(--cream);letter-spacing:.08em;margin-bottom:.4rem}
.ab-team-sub{font:400 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--c55)}
.ab-team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;background:transparent}
.ab-team-card{background:transparent;overflow:hidden;transition:all .3s;border-radius:8px;cursor:pointer}
.ab-team-card:hover{transform:translateY(-4px)}
.ab-team-card img{width:100%;height:240px;object-fit:cover;display:block;opacity:.85;transition:opacity .4s;border-radius:8px}
.ab-team-card:hover img{opacity:1}
.ab-team-body{padding:1.2rem 0;text-align:center}
.ab-team-name{font:300 1.1rem var(--serif);color:var(--cream);letter-spacing:.05em;margin-bottom:.2rem}
.ab-team-role{font:400 8px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--c55)}

/* PROPERTIES */
.ab-props{padding:clamp(3.5rem,6vw,5rem) clamp(1.5rem,5vw,4.5rem);border-bottom:1px solid var(--border)}
.ab-props-hd{text-align:center;margin-bottom:2.5rem}
.ab-props-rule{width:36px;height:1px;background:var(--gold);margin:0 auto 1.2rem}
.ab-props-title{font:300 clamp(1.7rem,3.2vw,2.4rem) var(--serif);color:var(--cream);letter-spacing:.08em;margin-bottom:.4rem}
.ab-props-sub{font:400 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--c55)}
.ab-prop-item{display:flex;align-items:center;justify-content:space-between;padding:1.2rem 1rem;border-bottom:1px solid var(--border-light);cursor:pointer;transition:all .25s;border-radius:4px;margin-bottom:.4rem}
.ab-prop-item:hover{padding-left:1.4rem;background:rgba(196,169,122,0.04);border-color:rgba(196,169,122,.2)}
.ab-prop-item:last-child{border-bottom:none}
.ab-prop-left{display:flex;align-items:center;gap:1.5rem}
.ab-prop-num{font:300 1rem var(--serif);color:rgba(196,169,122,.25);letter-spacing:.12em;min-width:2rem}
.ab-prop-city{font:300 1.15rem var(--serif);color:var(--cream);letter-spacing:.06em}
.ab-prop-addr{font:400 11px var(--sans);color:var(--c65);letter-spacing:.08em;margin-top:.2rem}
.ab-prop-right{font:400 9px var(--sans);letter-spacing:.22em;text-transform:uppercase;color:var(--c55);transition:color .22s;white-space:nowrap}
.ab-prop-item:hover .ab-prop-right{color:var(--gold)}

/* CONTACT */
.ab-contact{padding:clamp(3.5rem,6vw,5rem) clamp(1.5rem,5vw,4.5rem);text-align:center;background:linear-gradient(135deg,rgba(196,169,122,.05) 0%,rgba(196,169,122,.02) 100%);border-radius:12px;margin:clamp(1.5rem,4vw,3rem)}
.ab-contact-rule{width:36px;height:1px;background:var(--gold);margin:0 auto 1.4rem}
.ab-contact-title{font:300 clamp(2rem,4vw,3rem) var(--serif);color:var(--cream);letter-spacing:.08em;margin-bottom:.6rem}
.ab-contact-sub{font:300 italic 1rem var(--serif);color:var(--c65);letter-spacing:.1em;margin-bottom:2rem}
.ab-contact-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.ab-btn-primary{font:400 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;padding:14px 34px;background:var(--gold);color:#050505;border:none;transition:all .25s;border-radius:100px;box-shadow:0 8px 24px rgba(196,169,122,.2)}
.ab-btn-primary:hover{background:var(--gold-h);transform:translateY(-3px);box-shadow:0 12px 36px rgba(196,169,122,.3)}
.ab-btn-secondary{font:400 9px var(--sans);letter-spacing:.28em;text-transform:uppercase;padding:14px 34px;background:none;color:var(--gold);border:1.5px solid var(--gold);transition:all .25s;border-radius:100px}
.ab-btn-secondary:hover{background:rgba(196,169,122,.1);transform:translateY(-3px);box-shadow:0 8px 24px rgba(196,169,122,.15)}

.ab-footer{text-align:center;padding:2rem 1.5rem;font:400 8px var(--sans);letter-spacing:.28em;text-transform:uppercase;color:var(--c55);border-top:1px solid var(--border)}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fu{opacity:0;animation:fadeUp .7s ease forwards}
.fu1{animation-delay:.1s}.fu2{animation-delay:.22s}.fu3{animation-delay:.36s}

@media(max-width:860px){
  .ab-numbers{grid-template-columns:1fr 1fr}
  .ab-num{border-bottom:1px solid var(--border);border-right:none}
  .ab-num:nth-child(even){border-right:none}
  .ab-phil-grid{grid-template-columns:1fr}
  .ab-team-grid{grid-template-columns:1fr}
  .ab-hero-line{left:1.5rem;right:1.5rem}
  .ab-contact{margin:1.5rem}
}

@media(max-width:480px){
  .ab-numbers{grid-template-columns:1fr}
  .ab-numbers .ab-num{border-bottom:1px solid var(--border);border-right:none}
  .ab-prop-item{flex-direction:column;align-items:flex-start}
  .ab-prop-right{width:100%;margin-top:.6rem}
  .ab-contact-btns{flex-direction:column}
  .ab-contact-btns button{width:100%}
  .ab-hero-title{letter-spacing:.1em}
}
`;

const PHILOSOPHY = [
  { title:'Space as Sanctuary', text:'We believe a room should do more than shelter. Every TRIPLEONE property is designed to be a retreat — where light, material, and silence are as deliberate as the view.' },
  { title:'Privacy is Luxury',  text:"True luxury is being left alone in the most beautiful way possible. No intrusions, no scripts — just attentive service that appears exactly when you need it and disappears when you don't." },
  { title:'The City, Curated',  text:"We position every property so the best of the city is accessible but never intrusive. You're always at the centre of everything — and always able to retreat from it." },
];

const TEAM = [
  { name:'Swapnil Pandey',  role:'Founder & CEO', img:'' }
];

const PROPERTIES = [
  { num:'01', city:'Noida',     address:'Sector 18 & 62, Noida, Uttar Pradesh',     tag:'20+ Properties' },
  { num:'02', city:'Delhi',     address:'Aerocity & Lutyens\' Zone, New Delhi',      tag:'10+ Properties' },
  { num:'03', city:'Gurugram',  address:'DLF Cyber City & Golf Course Road',         tag:'28+ Properties' },
  { num:'04', city:'Goa',       address:'Vagator & Assagao, North Goa',              tag:'13+ Properties' },
  { num:'05', city:'Jaipur',    address:'Civil Lines, Jaipur 302006',                tag:'11+ Property' },
  { num:'06', city:'Udaipur',   address:'Fateh Sagar Lake Road, Udaipur',            tag:'3+ Properties' },
  { num:'07', city:'Dubai',     address:'Downtown Dubai, United Arab Emirates',      tag:'7+ Properties' },
];

export default function AboutPage() {
  const [vis, setVis] = useState(false);

  useEffect(() => {
    if (!document.getElementById('ab-css')) {
      const s = document.createElement('style');
      s.id = 'ab-css'; s.textContent = CSS;
      document.head.appendChild(s);
    }
    setTimeout(() => setVis(true), 60);
  }, []);

  return (
    <div className="ab-page">
    <div style={{ opacity: vis ? 1 : 0, transition: 'opacity .6s ease' }}>

      {/* HERO */}
      <div className="ab-hero">
        <div className="ab-hero-veil"/>
        <div className="ab-hero-content">
          <div className="ab-eyebrow fu fu1">Established 2019 · India</div>
          <div className="ab-hero-rule fu fu2"/>
          <div className="ab-hero-title fu fu2">TRIPLEONE</div>
          <div className="ab-hero-quote fu fu3">&ldquo;We did not set out to build hotels. We set out to build the kind of place we always wanted to stay in — and could never find.&rdquo;</div>
        </div>
        <div className="ab-hero-line"/>
      </div>

      {/* STORY */}
      <div className="ab-story">
        <div className="ab-story-body">
          <div className="ab-story-rule"/>
          <div className="ab-story-label">Our Story</div>
          <div className="ab-story-title">Born from a desire for something better</div>
          <div className="ab-story-text">TRIPLEONE began in 2019 with a single penthouse in Noida. The idea was simple: take the most beautifully located spaces in India&apos;s finest cities, furnish them with the precision of a private home, and open them to travellers who had outgrown the hotel experience.</div>
          <div className="ab-story-text">Three years later, we operate across six cities with twelve properties — each one distinct, each one deliberate. We do not replicate. Every TRIPLEONE is a response to its city, its neighbourhood, and the specific quality of light that enters a particular room at a particular time of day.</div>
          <div className="ab-story-text">We are not a hotel chain. We are a collection of places you will genuinely miss when you leave.</div>
        </div>
      </div>

      {/* NUMBERS */}
      <div className="ab-numbers">
        {[
          { val:'111+',   label:'Properties' },
          { val:'7',    label:'Cities' },
          { val:'2019', label:'Founded' },
          { val:'4.9',  label:'Avg. Rating' },
        ].map((n,i) => (
          <div className="ab-num" key={i}>
            <div className="ab-num-val">{n.val}</div>
            <div className="ab-num-label">{n.label}</div>
          </div>
        ))}
      </div>

      {/* PHILOSOPHY */}
      <div className="ab-phil">
        <div className="ab-phil-hd">
          <div className="ab-phil-rule"/>
          <div className="ab-phil-title">Our Philosophy</div>
          <div className="ab-phil-sub">Three principles that guide everything</div>
        </div>
        <div className="ab-phil-grid">
          {PHILOSOPHY.map((p,i) => (
            <div className="ab-phil-card" key={i}>
              <div className="ab-phil-num">0{i+1}</div>
              <div className="ab-phil-card-title">{p.title}</div>
              <div className="ab-phil-card-text">{p.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TEAM */}
      <div className="ab-team">
        <div className="ab-team-hd">
          <div className="ab-team-rule"/>
          <div className="ab-team-title">The People Behind It</div>
          <div className="ab-team-sub">A small team with a strong point of view</div>
        </div>
        <div className="ab-team-grid">
          {TEAM.map((m,i) => (
            <div className="ab-team-card" key={i}>
              <img src={m.img} alt={m.name} loading="lazy"/>
              <div className="ab-team-body">
                <div className="ab-team-name">{m.name}</div>
                <div className="ab-team-role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROPERTIES */}
      <div className="ab-props">
        <div className="ab-props-hd">
          <div className="ab-props-rule"/>
          <div className="ab-props-title">Our Properties</div>
          <div className="ab-props-sub">Where you will find us</div>
        </div>
        <div>
          {PROPERTIES.map((p,i) => (
            <div className="ab-prop-item" key={i}>
              <div className="ab-prop-left">
                <span className="ab-prop-num">{p.num}</span>
                <div>
                  <div className="ab-prop-city">{p.city}</div>
                  <div className="ab-prop-addr">{p.address}</div>
                </div>
              </div>
              <span className="ab-prop-right">{p.tag} →</span>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT */}
      <div className="ab-contact">
        <div className="ab-contact-rule"/>
        <div className="ab-contact-title">Come, Stay With Us</div>
        <div className="ab-contact-sub">We&apos;d love to host you.</div>
        <div className="ab-contact-btns">
          <button className="ab-btn-primary">Browse Properties</button>
          <button className="ab-btn-secondary">Get in Touch</button>
        </div>
      </div>

      <div className="ab-footer">TRIPLEONE · EST. 2019 · INDIA</div>
    </div>
    </div>
  );
}
