import artCarvedVerse from '../assets/artwork/art-carved-verse.jpg';
import { CONFIG } from '../config';

const steps = [
  ['Share', 'Tell us the verse, the space and the story behind it.'],
  ['Sketch', 'We return a composition and quote for your approval.'],
  ['Write', 'The piece is lettered, gilded and finished by hand.'],
];

export default function CustomCalligraphy() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-36 pb-24 md:pb-section-gap">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <p className="font-mono text-eyebrow uppercase text-gold mb-6">Commission · الطلبات</p>
        <h1 className="font-display text-display-sm font-light text-parchment leading-[1.02] mb-6">
          Custom calligraphy
        </h1>
        <p className="font-sans text-lg leading-relaxed text-parchment-dim">
          Collaborate on a piece tailored to your space and story. Inquiries begin with a
          message on Instagram — share the verse, the space and the story behind it, and we’ll
          take it from there. A limited number of commissions are accepted each year.
        </p>
      </div>

      {/* Process steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line mb-16">
        {steps.map(([title, body], i) => (
          <div key={title} className="bg-ink-2/60 p-7">
            <span className="font-mono text-[0.7rem] text-gold/70" dir="rtl">{['أولاً', 'ثانياً', 'ثالثاً'][i]}</span>
            <h3 className="font-display text-xl font-light text-parchment mt-3 mb-2">{title}</h3>
            <p className="font-sans text-sm leading-relaxed text-parchment-dim">{body}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Recent project */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -inset-3 border border-line pointer-events-none" aria-hidden="true" />
            <img
              src={artCarvedVerse}
              alt="Carved Verse — raised gold Quranic script on black canvas"
              className="w-full object-cover"
            />
          </div>
          <div className="mt-6">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold mb-2">Recent Project</p>
            <p className="font-sans text-sm leading-relaxed text-parchment-dim">
              Carved Verse · Raised gold script on black canvas · 60 × 100 cm.
            </p>
          </div>
        </div>

        {/* Instagram DM call to action */}
        <div className="lg:col-span-7 order-1 lg:order-2 bg-ink-2/60 border border-line p-7 md:p-12 flex flex-col justify-center">
          <p className="font-arabic text-2xl text-gold/80 mb-6" dir="rtl">على البركة</p>
          <h2 className="font-display text-3xl font-light text-parchment mb-4 leading-[1.1]">
            Start your commission
          </h2>
          <p className="font-sans text-base leading-relaxed text-parchment-dim mb-10 max-w-md">
            Send a message on Instagram with the verse, the size and the space it’s meant for.
            We reply to every serious inquiry — usually within 2–3 days.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <a
              id="cta-instagram-dm"
              href={CONFIG.INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-gold px-10 py-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:bg-gold-glow transition-colors duration-300"
            >
              Message on Instagram
              <span className="material-symbols-outlined text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </a>
            <a
              href={`https://www.instagram.com/${CONFIG.INSTAGRAM_USERNAME}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-parchment-dim hover:text-gold transition-colors duration-300"
            >
              @{CONFIG.INSTAGRAM_USERNAME}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
