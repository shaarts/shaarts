import { useEffect, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';

const HeroStroke = lazy(() => import('../components/HeroStroke'));

// The flat draw-on stroke — load fallback and reduced-motion / no-WebGL fallback.
function SvgStroke() {
  return (
    <svg
      className="qalam-stroke pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[1200px] opacity-70"
      viewBox="0 0 1200 220"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 165 C 220 55, 360 45, 520 120 S 770 215, 905 125 C 1000 65, 1110 70, 1162 122"
        pathLength="1"
        stroke="#EBCB6B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="1162" cy="122" r="5" fill="#EBCB6B" className="opacity-90" />
    </svg>
  );
}

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

import heroBismillah from '../assets/artwork/hero-bg.jpg';
import aboutArtist from '../assets/artwork/about-artist.png';
import scriptThuluth from '../assets/artwork/script-thuluth.jpg';
import scriptDiwani from '../assets/artwork/script-diwani.jpg';
import scriptNaskh from '../assets/artwork/script-naskh.jpg';
import artAyatulKursiGold from '../assets/artwork/art-ayatul-kursi-gold.jpg';
import artAsmaulHusnaWheel from '../assets/artwork/art-asmaul-husna-wheel.jpg';
import artAsmaulHusnaMosaic from '../assets/artwork/art-asmaul-husna-mosaic.jpg';
import artMihrabOfLight from '../assets/artwork/art-mihrab-of-light.jpg';
import artAllahAzure from '../assets/artwork/art-allah-azure.jpg';
import pieceGoldenBreath from '../assets/artwork/piece-golden-breath.jpg';
import pieceManifestation from '../assets/artwork/piece-manifestation.jpg';
import pieceGoldLeaf from '../assets/artwork/piece-gold-leaf.jpg';

// Move a card's spotlight to follow the cursor
const handleSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

const scripts = [
  {
    name: 'Thuluth',
    ar: 'ثُلُث',
    img: scriptThuluth,
    note: 'The monumental hand of the mosque. Tall verticals, deep curves — reserved for verse.',
  },
  {
    name: 'Diwani',
    ar: 'ديواني',
    img: scriptDiwani,
    note: 'The ornamental court script. Dense, interlocking, almost musical in its flourish.',
  },
  {
    name: 'Naskh',
    ar: 'نَسْخ',
    img: scriptNaskh,
    note: 'The clear, readable hand of the manuscript — the script the Qur’an is copied in.',
  },
];

const works = [
  {
    title: 'Ayatul Kursi',
    series: 'Throne Verse',
    medium: 'Gold Leaf & Ink on Black Canvas',
    dimensions: '80 × 120 cm',
    src: artAyatulKursiGold,
    span: 'lg:col-span-7 lg:row-span-2',
  },
  {
    title: 'Asmaul Husna',
    series: 'Radial Kufic',
    medium: 'Ink & Acrylic on Canvas',
    dimensions: '90 × 90 cm',
    src: artAsmaulHusnaWheel,
    span: 'lg:col-span-5',
  },
  {
    title: 'The Ninety-Nine',
    series: 'Mosaic Names',
    medium: 'Acrylic & Gold on Canvas',
    dimensions: '100 × 100 cm',
    src: artAsmaulHusnaMosaic,
    span: 'lg:col-span-5',
  },
  {
    title: 'Mihrab of Light',
    series: 'Bespoke Panel',
    medium: 'Gold Leaf & Acrylic on Canvas',
    dimensions: '100 × 150 cm',
    src: artMihrabOfLight,
    span: 'lg:col-span-7',
  },
  {
    title: 'Allah',
    series: 'The Divine Name',
    medium: 'Acrylic & Ink on Canvas',
    dimensions: '70 × 90 cm',
    src: artAllahAzure,
    span: 'lg:col-span-5',
  },
];

const feed = [pieceGoldenBreath, pieceManifestation, pieceGoldLeaf];

export default function Home() {
  // Only mount the WebGL hero when it's welcome: motion allowed + WebGL present.
  const [enable3D, setEnable3D] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && supportsWebGL()) setEnable3D(true);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    const els = document.querySelectorAll('.reveal-on-scroll');
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="w-full overflow-x-clip">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-margin-mobile pt-32 pb-24">
        {/* the qalam writes itself — in 3D where supported, flat where not */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          {enable3D ? (
            <Suspense fallback={<SvgStroke />}>
              <HeroStroke />
            </Suspense>
          ) : (
            <SvgStroke />
          )}
        </div>

        {/* Soft scrim keeps the headline crisp wherever the stroke drifts */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_52%_46%_at_50%_54%,rgba(11,13,22,0.74),transparent_72%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl">
          <p className="rise rise-1 font-mono text-eyebrow uppercase text-gold mb-7">
            Arabic Calligraphy · Islamic Fine Art
          </p>

          <p className="rise rise-2 font-arabic text-3xl md:text-4xl text-glow-gold gold-shimmer mb-8" dir="rtl">
            بسم الله الرحمن الرحيم
          </p>

          <h1 className="rise rise-3 font-display text-display font-light text-parchment leading-[0.98]">
            The soul<br />
            of the <span className="italic text-gold-glow">script.</span>
          </h1>

          <p className="rise rise-4 mx-auto mt-8 max-w-xl font-sans text-lg leading-relaxed text-parchment-dim">
            Quranic verses and the names of Allah, written by hand as an act of remembrance —
            beautiful reminders made to outlive the maker.
          </p>

          <div className="rise rise-4 mt-11 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              id="hero-view-collection"
              to="/gallery"
              className="group inline-flex items-center gap-3 bg-gold px-9 py-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:bg-gold-glow transition-colors duration-300"
            >
              View the collection
              <span className="material-symbols-outlined text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </Link>
            <Link
              id="hero-commission"
              to="/custom-calligraphy"
              className="inline-flex items-center gap-3 border border-line px-9 py-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-parchment hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Commission a piece
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-parchment-dim">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
          <span className="material-symbols-outlined text-lg animate-bounce">expand_more</span>
        </div>
      </section>

      {/* ──────────────── STATEMENT / FAITH ──────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24 md:py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Framed Bismillah plate */}
          <div className="lg:col-span-6 reveal-on-scroll">
            <figure className="relative">
              <div className="absolute -inset-3 border border-gold/20 pointer-events-none" aria-hidden="true" />
              <div className="bg-parchment p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
                <img src={heroBismillah} alt="In the name of God, the Most Gracious, the Most Merciful — rendered by hand" className="w-full object-cover" />
              </div>
              <figcaption className="mt-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-parchment-dim">
                Bismillah · hand-carved reed on Ahar paper
              </figcaption>
            </figure>
          </div>

          {/* Statement */}
          <div className="lg:col-span-6 reveal-on-scroll">
            <p className="font-mono text-eyebrow uppercase text-gold mb-7">The Intention</p>
            <blockquote className="font-display text-title font-light text-parchment leading-[1.25]">
              “When you create with the sole intention of serving Him, He puts
              <span className="text-gold-glow italic"> barakah</span> in every brushstroke.”
            </blockquote>
            <div className="kashida my-9"><span className="kashida__dot" /></div>
            <p className="font-sans text-base leading-relaxed text-parchment-dim max-w-md">
              After a creative block that nearly ended the practice for good, the artist returned to
              the qalam through faith. What was once only craft became <span className="text-parchment">dhikr</span> —
              remembrance worked patiently into ink, gold and pigment.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────── ABOUT THE ARTIST ──────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24 md:py-section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1 reveal-on-scroll">
            <p className="font-mono text-eyebrow uppercase text-gold mb-7">The Artist · شعارتس</p>
            <h2 className="font-display text-display-sm font-light text-parchment mb-8 leading-[1.05]">
              A reed pen,<br />a pot of ink, a purpose.
            </h2>
            <div className="space-y-6 max-w-xl">
              <p className="font-sans text-lg leading-relaxed text-parchment">
                Based in Saudi Arabia, Shaarts Calligraphy makes custom Arabic calligraphy and
                luxury, limited-edition Islamic art — each piece composed letter by letter, then
                gilded and finished by hand.
              </p>
              <p className="font-sans text-base leading-relaxed text-parchment-dim">
                Writing the words of the Qur’an is treated as worship, not decoration. The aim is
                simple: leave behind something beautiful and true, a reminder that keeps speaking
                long after the studio lights go out.
              </p>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-line pt-8">
              {[
                ['Est.', 'Saudi Arabia'],
                ['Practice', 'Qur’anic verse'],
                ['Editions', 'Strictly limited'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-gold/70 mb-2">{k}</dt>
                  <dd className="font-display text-lg font-light text-parchment">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 reveal-on-scroll">
            <div className="relative">
              <div className="absolute -inset-3 border border-line pointer-events-none" aria-hidden="true" />
              <img
                src={aboutArtist}
                alt="Reed pens, an ink pot and rolled scrolls on the studio table"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SCRIPT FAMILIES ──────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24 md:py-section-gap">
        <div className="reveal-on-scroll mb-14">
          <p className="font-mono text-eyebrow uppercase text-gold mb-5">The Hands · الخطوط</p>
          <h2 className="font-display text-display-sm font-light text-parchment max-w-2xl leading-[1.05]">
            Three classical scripts, each with its own voice.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {scripts.map((s) => (
            <article
              key={s.name}
              onMouseMove={handleSpotlight}
              className="specimen reveal-on-scroll group p-6 flex flex-col"
            >
              <div className="overflow-hidden mb-6">
                <img src={s.img} alt={`${s.name} script specimen`} className="w-full aspect-[5/4] object-cover" />
              </div>
              <div className="relative z-[3] flex items-baseline justify-between mb-3">
                <h3 className="font-display text-2xl font-light text-parchment">{s.name}</h3>
                <span className="font-arabic text-2xl text-gold" dir="rtl">{s.ar}</span>
              </div>
              <p className="relative z-[3] font-sans text-sm leading-relaxed text-parchment-dim">{s.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ──────────────── SELECTED WORKS ──────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24 md:py-section-gap">
        <div className="reveal-on-scroll flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-eyebrow uppercase text-gold mb-5">Selected Works · مختارات</p>
            <h2 className="font-display text-display-sm font-light text-parchment leading-[1.05]">
              Verse, gilded and framed.
            </h2>
          </div>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-parchment-dim hover:text-gold transition-colors duration-300 whitespace-nowrap"
          >
            Full gallery
            <span className="material-symbols-outlined text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[260px] gap-7">
          {works.map((w) => (
            <Link
              key={w.title}
              to="/gallery"
              onMouseMove={handleSpotlight}
              className={`specimen reveal-on-scroll group relative overflow-hidden ${w.span}`}
            >
              <img src={w.src} alt={w.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 z-[3] p-6 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold mb-2">{w.series}</p>
                  <h3 className="font-display text-xl md:text-2xl font-light text-parchment">{w.title}</h3>
                </div>
                <div className="text-right shrink-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-parchment-dim">{w.medium}</p>
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.15em] text-parchment-dim">{w.dimensions}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ──────────────── COMMISSION CTA ──────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24 md:py-section-gap">
        <div className="reveal-on-scroll relative overflow-hidden border border-gold/25 bg-ink-2/60 px-8 md:px-16 py-16 md:py-24 text-center">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[120%] bg-[radial-gradient(closest-side,rgba(201,162,39,0.14),transparent)] pointer-events-none" aria-hidden="true" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="font-arabic text-2xl text-gold/80 mb-6" dir="rtl">على البركة</p>
            <h2 className="font-display text-display-sm font-light text-parchment mb-6 leading-[1.05]">
              Commission a verse of your own.
            </h2>
            <p className="font-sans text-lg leading-relaxed text-parchment-dim mb-10">
              A limited number of custom pieces are accepted each year for collectors and institutions
              worldwide. Bring a verse, a name, or a story — and we’ll shape it in ink and gold.
            </p>
            <Link
              id="cta-inquire"
              to="/custom-calligraphy"
              className="group inline-flex items-center gap-3 bg-gold px-10 py-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:bg-gold-glow transition-colors duration-300"
            >
              Begin an inquiry
              <span className="material-symbols-outlined text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────────── INSTAGRAM ──────────────── */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pb-24 md:pb-section-gap reveal-on-scroll">
        <div className="kashida mb-14"><span className="kashida__dot" /></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-eyebrow uppercase text-gold mb-4">Follow the Journey</p>
            <a
              href={`https://www.instagram.com/${CONFIG.INSTAGRAM_USERNAME}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-3xl font-light text-parchment hover:text-gold-glow transition-colors duration-300"
            >
              @{CONFIG.INSTAGRAM_USERNAME}
            </a>
          </div>
          <a
            href={`https://www.instagram.com/${CONFIG.INSTAGRAM_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-line px-7 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-parchment hover:border-gold hover:text-gold transition-colors duration-300 self-start md:self-auto"
          >
            Follow on Instagram
            <span className="material-symbols-outlined text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1">arrow_outward</span>
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3 md:gap-7">
          {feed.map((img, i) => (
            <a
              key={i}
              href={`https://www.instagram.com/${CONFIG.INSTAGRAM_USERNAME}/`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleSpotlight}
              className="specimen group relative overflow-hidden aspect-square"
            >
              <img src={img} alt="Recent work on Instagram" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-[3]">
                <span className="material-symbols-outlined text-gold text-3xl">photo_camera</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
