'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

interface GalleryImage {
  src:    string;
  thumb:  string;
  label:  string;
  folder: string;
  tag:    string;
}
interface FolderData {
  folder: string;
  tag:    string;
  images: GalleryImage[];
}

// ── Design tokens ──────────────────────────────────────────────────────────
const T = {
  gold:       '#c4a97a',
  goldDim:    'rgba(196,169,122,0.35)',
  goldMuted:  'rgba(196,169,122,0.13)',
  goldGlow:   'rgba(196,169,122,0.06)',
  cream:      '#f5f2ea',
  bg:         '#070707',
  panel:      '#0e0e0e',
  border:     'rgba(196,169,122,0.13)',
  serif:      '"Georgia", "Times New Roman", serif',
  sans:       '"Helvetica Neue", Arial, sans-serif',
};

// ── Global styles injected once ────────────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Lato:wght@300;400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --gold: #c4a97a;
  --gold-dim: rgba(196,169,122,0.35);
  --gold-muted: rgba(196,169,122,0.13);
  --gold-glow: rgba(196,169,122,0.06);
  --cream: #f5f2ea;
  --bg: #070707;
  --panel: #0e0e0e;
  --border: rgba(196,169,122,0.13);
  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans: 'Lato', 'Helvetica Neue', sans-serif;
}

html, body { background: var(--bg); color: var(--cream); font-family: var(--sans); }

/* scrollbars */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--gold-muted); border-radius: 2px; }

/* ── INTRO SPLASH ── */
@keyframes splashFadeOut {
  0%   { opacity: 1; }
  70%  { opacity: 1; }
  100% { opacity: 0; pointer-events: none; }
}
@keyframes splashWord {
  from { opacity: 0; transform: scale(0.92) translateY(8px); letter-spacing: .08em; }
  60%  { opacity: 1; transform: scale(1) translateY(0); letter-spacing: .2em; }
  100% { opacity: 0.7; }
}
@keyframes splashSub {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.gl-splash {
  position: fixed; inset: 0; z-index: 99999;
  background: var(--bg);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  animation: splashFadeOut 2s ease forwards;
  pointer-events: none;
}
.gl-splash-word {
  font-family: var(--serif); font-size: clamp(2.2rem, 8vw, 4rem);
  font-weight: 300; color: var(--gold); letter-spacing: .2em;
  animation: splashWord 1.5s ease forwards;
}
.gl-splash-line {
  width: 60px; height: 1px; background: var(--gold); margin: 1.2rem 0;
  animation: splashSub 0.8s 0.6s ease both; opacity: 0;
}
.gl-splash-sub {
  font-family: var(--sans); font-size: 9px; letter-spacing: .45em;
  color: rgba(196,169,122,0.45); text-transform: uppercase;
  animation: splashSub 0.8s 0.8s ease both; opacity: 0;
}

/* ── HERO ── */
.gl-hero {
  position: relative; min-height: 200px;
  display: flex; align-items: flex-end;
  border-bottom: 1px solid var(--border);
  overflow: hidden; background: var(--bg);
}
.gl-hero-grid {
  position: absolute; inset: 0; overflow: hidden; opacity: 0.06;
}
.gl-hero-content {
  position: relative; z-index: 2;
  padding: 0 1.8rem 1.8rem; width: 100%;
  display: flex; flex-direction: column;
}
  .gl-lb-meta-label {
  display: none;
}
.gl-hero-eyebrow {
  font-family: var(--sans); font-size: 8px; letter-spacing: .4em;
  text-transform: uppercase; color: var(--gold-dim); margin-bottom: .6rem;
}
.gl-hero-title {
  font-family: var(--serif); font-size: clamp(2.4rem, 9vw, 3.8rem);
  font-weight: 300; letter-spacing: .15em; color: var(--gold); line-height: 0.95;
}
.gl-hero-sub {
  font-family: var(--serif); font-style: italic; font-size: 11px;
  letter-spacing: .3em; color: rgba(196,169,122,0.4); margin-top: .5rem;
}
.gl-hero-count {
  position: absolute; right: 1.8rem; bottom: 1.8rem;
  font-size: 8px; letter-spacing: .22em; color: rgba(196,169,122,0.3);
  font-family: var(--sans);
}
.gl-hero-gold-line {
  position: absolute; bottom: 0; left: 1.8rem; right: 1.8rem;
  height: 1px;
  background: linear-gradient(90deg, var(--gold) 0%, rgba(196,169,122,0.2) 60%, transparent 100%);
}

/* ── FILTER BAR ── */
.gl-filterbar {
  display: flex; overflow-x: auto; scrollbar-width: none;
  padding: 0 1rem; border-bottom: 1px solid var(--border);
  background: rgba(7,7,7,0.95); position: sticky; top: 0; z-index: 20;
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  gap: 0;
}
.gl-filterbar::-webkit-scrollbar { display: none; }
.gl-ftab {
  flex-shrink: 0; background: none;
  border: none; border-bottom: 1px solid transparent;
  color: rgba(196,169,122,0.3); font-size: 8px; letter-spacing: .25em;
  text-transform: uppercase; padding: .9rem 1rem;
  cursor: pointer; white-space: nowrap; transition: all .22s;
  font-family: var(--sans); position: relative;
}
.gl-ftab:hover { color: rgba(196,169,122,0.6); }
.gl-ftab.active {
  color: var(--gold);
  border-bottom-color: var(--gold);
}

/* ── GRID WRAP ── */
.gl-gridwrap {
  flex: 1; padding: 1rem; overflow-y: auto;
  scrollbar-width: thin; scrollbar-color: var(--gold-muted) transparent;
}

/* ── MASONRY ── */
.gl-masonry { columns: 2; column-gap: 8px; }
@media (min-width: 600px)  { .gl-masonry { columns: 3; } }
@media (min-width: 900px)  { .gl-masonry { columns: 4; } }

/* ── CARD ── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.gl-card {
  break-inside: avoid; margin-bottom: 8px;
  position: relative; overflow: hidden; border-radius: 2px;
  cursor: pointer; border: 1px solid transparent;
  transition: border-color .3s;
  animation: cardIn .5s ease both;
}
.gl-card:hover { border-color: var(--gold-muted); }
.gl-card img {
  width: 100%; display: block;
  transition: transform .9s cubic-bezier(.25,.46,.45,.94);
}
.gl-card:hover img { transform: scale(1.07); }
.gl-card-ovl {
  position: absolute; inset: 0; opacity: 0;
  background: linear-gradient(to top, rgba(0,0,0,.92) 0%, rgba(0,0,0,.25) 55%, transparent 100%);
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: .85rem; transition: opacity .32s;
}
.gl-card:hover .gl-card-ovl { opacity: 1; }
.gl-card-tag {
  font-family: var(--sans); font-size: 7px; letter-spacing: .3em;
  text-transform: uppercase; color: var(--gold); opacity: .8;
}
.gl-card-rule { width: 16px; height: 1px; background: var(--gold); margin: 5px 0; }
.gl-card-label {
  font-family: var(--serif); font-size: .95rem;
  font-weight: 300; color: var(--cream); line-height: 1.2;
}
.gl-card-num {
  position: absolute; top: 8px; left: 10px; opacity: 0;
  font-size: 8px; letter-spacing: .15em; color: rgba(196,169,122,.5);
  transition: opacity .32s; font-family: var(--sans);
}
.gl-card:hover .gl-card-num { opacity: 1; }
.gl-card-badge {
  position: absolute; top: 8px; right: 8px; opacity: 0;
  border: 1px solid rgba(196,169,122,.25);
  background: rgba(0,0,0,.55); backdrop-filter: blur(6px);
  padding: 3px 9px; font-size: 7px; letter-spacing: .22em;
  text-transform: uppercase; color: var(--gold); border-radius: 2px;
  transition: opacity .32s; font-family: var(--sans);
}
.gl-card:hover .gl-card-badge { opacity: 1; }

/* ── SKELETON ── */
@keyframes shimmer {
  0%, 100% { opacity: .35; }
  50%       { opacity: .75; }
}
.gl-skel {
  break-inside: avoid; margin-bottom: 8px;
  border-radius: 2px; background: rgba(196,169,122,0.05);
  animation: shimmer 1.6s ease infinite;
}

/* ── FOOTER ── */
.gl-footer {
  text-align: center; padding: .7rem;
  font-size: 8px; letter-spacing: .25em;
  color: rgba(196,169,122,.2);
  border-top: 1px solid var(--border);
  font-family: var(--sans);
}

/* ── LIGHTBOX ── */
@keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes lbImgIn  {
  from { opacity: 0; transform: scale(.95); }
  to   { opacity: 1; transform: scale(1); }
}
.gl-lb {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,.97);
  display: flex; align-items: center; justify-content: center;
  animation: lbFadeIn .25s ease;
}
.gl-lb-img {
  max-height: 78vh; max-width: 86vw; object-fit: contain;
  border: 1px solid var(--border);
  animation: lbImgIn .4s cubic-bezier(.25,.46,.45,.94);
}
.gl-lb-close {
  position: fixed; top: 1rem; right: 1rem;
  background: none; border: 1px solid var(--border);
  color: var(--gold); padding: 6px 18px;
  font-size: 8px; letter-spacing: .22em; cursor: pointer;
  border-radius: 2px; font-family: var(--sans); z-index: 2;
  transition: border-color .2s;
}
.gl-lb-close:hover { border-color: var(--gold); }
.gl-lb-nav {
  position: fixed; top: 50%; transform: translateY(-50%);
  background: rgba(0,0,0,.5); border: 1px solid rgba(196,169,122,.2);
  color: var(--gold); width: 44px; height: 44px; font-size: 1.1rem;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  z-index: 2; transition: border-color .2s; border-radius: 2px; flex-shrink: 0;
}
.gl-lb-nav:hover { border-color: var(--gold); }
.gl-lb-prev { left: .8rem; }
.gl-lb-next { right: .8rem; }
.gl-lb-meta {
  position: fixed; bottom: 4rem; left: 50%; transform: translateX(-50%);
  text-align: center; z-index: 2; pointer-events: none;
}
.gl-lb-meta-label {
  font-family: var(--serif); font-size: 1.05rem;
  font-weight: 300; color: var(--cream); margin-bottom: .3rem;
  letter-spacing: .05em;
}
.gl-lb-meta-count {
  font-size: 8px; letter-spacing: .28em; color: rgba(196,169,122,.35);
  font-family: var(--sans);
}
.gl-lb-progress {
  position: fixed; bottom: 0; left: 0; height: 1px;
  background: var(--gold); transition: width .35s ease; z-index: 2;
}
.gl-lb-thumbstrip {
  position: fixed; bottom: 1rem; left: 50%; transform: translateX(-50%);
  display: flex; gap: 4px; max-width: 90vw; overflow-x: auto;
  scrollbar-width: none; padding: .3rem;
}
.gl-lb-thumbstrip::-webkit-scrollbar { display: none; }
.gl-lb-thumb {
  width: 38px; height: 38px; object-fit: cover;
  opacity: .3; cursor: pointer;
  border: 1px solid transparent; border-radius: 2px;
  flex-shrink: 0; transition: opacity .2s, border-color .2s;
}
.gl-lb-thumb.active { opacity: 1; border-color: var(--gold); }
`;

// ── Inject global styles once ─────────────────────────────────────────────
function useGlobalStyles() {
  useEffect(() => {
    if (document.getElementById('gl-styles')) return;
    const el = document.createElement('style');
    el.id = 'gl-styles';
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { /* keep styles mounted */ };
  }, []);
}

// ── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose, onNav }: {
  images:  GalleryImage[];
  index:   number;
  onClose: () => void;
  onNav:   (d: number) => void;
}) {
  const img = images[index];
  const touchRef = useRef(0);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft')  onNav(-1);
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose, onNav]);

  if (!img) return null;

  const thumbStart = Math.max(0, index - 4);
  const thumbEnd   = Math.min(images.length - 1, index + 5);
  const thumbs     = images.slice(thumbStart, thumbEnd + 1);

  return (
    <div
      className="gl-lb"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onTouchStart={(e) => { touchRef.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchRef.current;
        if (Math.abs(dx) > 48) onNav(dx < 0 ? 1 : -1);
      }}
    >
      <button className="gl-lb-close" onClick={onClose}>✕ CLOSE</button>
      <button className="gl-lb-nav gl-lb-prev" onClick={() => onNav(-1)} aria-label="Previous">←</button>

      <img
        key={img.src}
        className="gl-lb-img"
        src={img.src}
        alt={img.label}
      />

      <button className="gl-lb-nav gl-lb-next" onClick={() => onNav(1)} aria-label="Next">→</button>

      <div className="gl-lb-meta">
        {/* <div className="gl-lb-meta-label">{img.label}</div> */}
        <div className="gl-lb-meta-count">{index + 1} &nbsp;/&nbsp; {images.length}</div>
      </div>

      {images.length > 1 && (
        <div className="gl-lb-thumbstrip">
          {thumbs.map((t, i) => {
            const realIdx = thumbStart + i;
            return (
              <img
                key={t.thumb + realIdx}
                className={`gl-lb-thumb${realIdx === index ? ' active' : ''}`}
                src={t.thumb}
                alt={t.label}
                onClick={() => onNav(realIdx - index)}
              />
            );
          })}
        </div>
      )}

      <div
        className="gl-lb-progress"
        style={{ width: `${((index + 1) / images.length) * 100}%` }}
      />
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────
function Card({ img, index, delay, onClick }: {
  img:     GalleryImage;
  index:   number;
  delay:   number;
  onClick: () => void;
}) {
  return (
    <div
      className="gl-card"
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
    >
      <img src={img.thumb} alt={img.label} loading="lazy" />
      <span className="gl-card-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="gl-card-badge">View</span>
      <div className="gl-card-ovl">
        <span className="gl-card-tag">{img.tag}</span>
        <div className="gl-card-rule" />
        <span className="gl-card-label"></span>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────
const SKEL_HEIGHTS = [220, 165, 280, 200, 245, 180, 260, 150, 235, 195, 270, 170];
function Skeleton() {
  return (
    <div className="gl-masonry">
      {SKEL_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className="gl-skel"
          style={{ height: `${h}px`, animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

// ── HeroBgGrid ─────────────────────────────────────────────────────────────
function HeroBgGrid() {
  return (
    <svg className="gl-hero-grid" viewBox="0 0 400 200" preserveAspectRatio="none">
      {[35, 80, 130, 170].map(y => (
        <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#c4a97a" strokeWidth=".5" />
      ))}
      {[55, 155, 255, 355].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="#c4a97a" strokeWidth=".4" />
      ))}
      <rect x="135" y="50" width="130" height="80" fill="none" stroke="#c4a97a" strokeWidth=".4" />
      <rect x="148" y="63" width="104" height="54" fill="none" stroke="#c4a97a" strokeWidth=".2" />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function GalleryPage({ onClose }: { onClose?: () => void }) {
  useGlobalStyles();

  const [folders, setFolders]     = useState<FolderData[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [activeFilter, setFilter] = useState('All Spaces');
  const [lbIndex, setLbIndex]     = useState<number | null>(null);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 2100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetch('/api/gallery', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError('Server error: ' + data.error); setLoading(false); return; }
        setFolders(data.folders || []);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'unknown error';
        setError('Could not reach API: ' + msg);
        setLoading(false);
      });
  }, []);

  const allImages = folders.flatMap(f => f.images);
  const folderNames = folders.map(f => f.folder);
  const filterTabs = ['All Spaces', 'Property', 'Suite', ...folderNames];

  const filtered =
    activeFilter === 'All Spaces' ? allImages :
    activeFilter === 'Property'   ? allImages.filter(i => i.tag === 'Property') :
    activeFilter === 'Suite'      ? allImages.filter(i => i.tag === 'Suite') :
    allImages.filter(i => i.folder === activeFilter);

  const openLb  = (i: number) => setLbIndex(i);
  const closeLb = () => setLbIndex(null);
  const navLb   = useCallback((dir: number) => {
    setLbIndex(p => p === null ? null : (p + dir + filtered.length) % filtered.length);
  }, [filtered.length]);

  return (
    <>
      {/* ── Intro Splash ── */}
      {!splashDone && (
        <div className="gl-splash">
          <div className="gl-splash-word">TRIPLEONE</div>
          <div className="gl-splash-line" />
          <div className="gl-splash-sub">Visual Gallery</div>
        </div>
      )}

      {/* ── Page ── */}
      <div style={{ minHeight: '100vh', background: T.bg, display: 'flex', flexDirection: 'column' }}>

        {/* HERO */}
        <div className="gl-hero">
          <HeroBgGrid />
          <div className="gl-hero-content">
            <div className="gl-hero-eyebrow">Curated interiors</div>
            <div className="gl-hero-title">TRIPLEONE</div>
            <div className="gl-hero-sub">Visual Gallery · Premium Collection</div>
          </div>
          <div className="gl-hero-count">
            {!loading && `${filtered.length} images`}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'none', border: `1px solid ${T.border}`, color: T.gold,
                padding: '6px 16px', fontSize: '8px', letterSpacing: '.22em',
                cursor: 'pointer', borderRadius: '2px', fontFamily: T.sans,
              }}
            >
              ✕ CLOSE
            </button>
          )}
          <div className="gl-hero-gold-line" />
        </div>

        {/* FILTER BAR */}
        <div className="gl-filterbar">
          {filterTabs.map(f => (
            <button
              key={f}
              className={`gl-ftab${f === activeFilter ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="gl-gridwrap">
          {loading && <Skeleton />}

          {error && (
            <div style={{ textAlign: 'center', marginTop: '5rem', color: '#444' }}>
              <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</p>
              <p style={{ fontSize: '9px', letterSpacing: '.22em' }}>{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: '5rem', color: '#2a2a2a', fontSize: '9px', letterSpacing: '.3em' }}>
              NO IMAGES FOUND
            </p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="gl-masonry">
              {filtered.map((img, i) => (
                <Card
                  key={img.src + i}
                  img={img}
                  index={i}
                  delay={Math.min(i * 55, 600)}
                  onClick={() => openLb(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {!loading && (
          <div className="gl-footer">
            {filtered.length} IMAGES IN COLLECTION
          </div>
        )}
      </div>

      {/* LIGHTBOX */}
      {lbIndex !== null && (
        <Lightbox
          images={filtered}
          index={lbIndex}
          onClose={closeLb}
          onNav={navLb}
        />
      )}
    </>
  );
}