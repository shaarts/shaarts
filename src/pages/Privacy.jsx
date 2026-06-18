import { CONFIG } from '../config';

const sections = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    body: (
      <>
        <p className="font-sans text-base leading-relaxed text-parchment-dim">
          We collect personal information you voluntarily provide when inquiring about a custom
          calligraphy or commission project, including:
        </p>
        <ul className="list-none space-y-2 font-sans text-base leading-relaxed text-parchment-dim">
          <li><span className="text-parchment">Contact information</span> — your name and email address.</li>
          <li><span className="text-parchment">Project specifications</span> — dimensions, medium, script styles and descriptions you supply.</li>
          <li><span className="text-parchment">Interaction details</span> — messages and context shared during the commission process.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'information-use',
    title: 'How We Use Your Information',
    body: (
      <>
        <p className="font-sans text-base leading-relaxed text-parchment-dim">
          Your information is used solely to deliver bespoke artwork services:
        </p>
        <ul className="list-none space-y-2 font-sans text-base leading-relaxed text-parchment-dim">
          <li>Reviewing and responding to your commission proposals.</li>
          <li>Communicating project updates, revisions and billing milestones.</li>
          <li>Analysing site performance to refine navigation and experience.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    body: (
      <p className="font-sans text-base leading-relaxed text-parchment-dim">
        We never sell, rent, lease or trade your personal information. We share it only with trusted
        services necessary to operate the site or complete a transaction, and only where those
        parties agree to keep it confidential.
      </p>
    ),
  },
  {
    id: 'analytics-cookies',
    title: 'Cookies & Analytics',
    body: (
      <p className="font-sans text-base leading-relaxed text-parchment-dim">
        We use standard cookies and Google Analytics to understand how visitors use the site. This
        compiles anonymous traffic reports — pages visited, region, referral source — to help us
        improve. You can disable cookies in your browser without losing access to the site.
      </p>
    ),
  },
  {
    id: 'data-security',
    title: 'Data Security',
    body: (
      <p className="font-sans text-base leading-relaxed text-parchment-dim">
        We use security measures including SSL encryption to protect your form details. No internet
        transmission is ever completely secure, so while we take extensive precautions we cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    id: 'your-rights',
    title: 'Your Legal Rights',
    body: (
      <p className="font-sans text-base leading-relaxed text-parchment-dim">
        Depending on your location, you may request access to, correction of, or deletion of the
        personal information we hold. To request deletion of inquiry records, contact us using the
        address below.
      </p>
    ),
  },
  {
    id: 'contact-us',
    title: 'Contact Information',
    body: (
      <>
        <p className="font-sans text-base leading-relaxed text-parchment-dim">
          For questions about this policy, or to request data updates or deletion, reach us at:
        </p>
        <a
          href={`mailto:${CONFIG.EMAIL}`}
          className="inline-flex items-center gap-3 mt-2 bg-gold px-8 py-3.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink hover:bg-gold-glow transition-colors duration-300"
        >
          Email us · {CONFIG.EMAIL}
        </a>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-36 pb-24 md:pb-section-gap">
      <div className="max-w-3xl mb-14">
        <p className="font-mono text-eyebrow uppercase text-gold mb-6">Legal</p>
        <h1 className="font-display text-display-sm font-light text-parchment leading-[1.02] mb-6">
          Privacy policy
        </h1>
        <p className="font-sans text-lg leading-relaxed text-parchment-dim">
          Last updated 10 June 2026. This policy explains how Shaarts Calligraphy handles and protects
          information collected from visitors to this site.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Index */}
        <nav className="lg:col-span-4 sticky top-32 hidden lg:block border-l border-line pl-6">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-gold/70 mb-5">Sections</p>
          <ol className="space-y-3">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline gap-3 font-sans text-sm text-parchment-dim hover:text-parchment transition-colors duration-300"
                >
                  <span className="font-mono text-[0.65rem] text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content */}
        <div className="lg:col-span-8 space-y-px bg-line border border-line">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="bg-ink-2/60 p-8 md:p-10 space-y-4 scroll-mt-32">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.7rem] text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="font-display text-xl md:text-2xl font-light text-parchment">{s.title}</h2>
              </div>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
