import { useState } from 'react';
import commissionShowcase from '../assets/artwork/commission-showcase.png';

const steps = [
  ['Share', 'Tell us the verse, the space and the story behind it.'],
  ['Sketch', 'We return a composition and quote for your approval.'],
  ['Write', 'The piece is lettered, gilded and finished by hand.'],
];

export default function CustomCalligraphy() {
  const [formData, setFormData] = useState({ name: '', email: '', size: '', description: '' });
  const [formStatus, setFormStatus] = useState('IDLE'); // IDLE | SENDING | SUCCESS | ERROR

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setFormStatus('ERROR');
      return;
    }
    setFormStatus('SENDING');
    setTimeout(() => {
      setFormStatus('SUCCESS');
      setFormData({ name: '', email: '', size: '', description: '' });
    }, 1200);
  };

  const fieldClass =
    'bg-transparent border-b border-line focus:border-gold py-2.5 font-sans text-base text-parchment placeholder:text-parchment-dim/50 transition-colors duration-300';
  const labelClass =
    'font-mono text-[0.62rem] uppercase tracking-[0.22em] text-parchment-dim group-focus-within:text-gold transition-colors duration-300';

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-36 pb-24 md:pb-section-gap">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <p className="font-mono text-eyebrow uppercase text-gold mb-6">Commission · الطلبات</p>
        <h1 className="font-display text-display-sm font-light text-parchment leading-[1.02] mb-6">
          Custom calligraphy
        </h1>
        <p className="font-sans text-lg leading-relaxed text-parchment-dim">
          Collaborate on a piece tailored to your space and story. Send the details below, or reach
          out on Instagram to begin. A limited number of commissions are accepted each year.
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
              src={commissionShowcase}
              alt="A finished commissioned calligraphy piece"
              className="w-full object-cover"
            />
          </div>
          <div className="mt-6">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-gold mb-2">Recent Project</p>
            <p className="font-sans text-sm leading-relaxed text-parchment-dim">
              Surah Al-Ikhlas · Traditional Thuluth · Ink on Ahar paper · 120 × 80 cm.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7 order-1 lg:order-2 bg-ink-2/60 border border-line p-7 md:p-12">
          {formStatus === 'SUCCESS' ? (
            <div className="flex flex-col items-center justify-center text-center py-20 space-y-6">
              <span className="material-symbols-outlined text-gold text-6xl">check_circle</span>
              <h3 className="font-display text-2xl font-light text-parchment">Inquiry received</h3>
              <p className="font-sans text-base text-parchment-dim max-w-sm leading-relaxed">
                Thank you for sharing your project. We’ll review the details and reply within
                2–3 business days.
              </p>
              <button
                onClick={() => setFormStatus('IDLE')}
                className="mt-2 border border-line px-8 py-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-parchment hover:border-gold hover:text-gold transition-colors duration-300"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-9" id="customCalligraphyForm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                <div className="flex flex-col gap-2 group">
                  <label className={labelClass} htmlFor="name">Name</label>
                  <input
                    className={fieldClass}
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    type="text"
                    disabled={formStatus === 'SENDING'}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 group">
                  <label className={labelClass} htmlFor="email">Email</label>
                  <input
                    className={fieldClass}
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    type="email"
                    disabled={formStatus === 'SENDING'}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 group">
                <label className={labelClass} htmlFor="size">Size / Medium</label>
                <input
                  className={fieldClass}
                  id="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 100 × 100 cm, canvas"
                  type="text"
                  disabled={formStatus === 'SENDING'}
                />
              </div>

              <div className="flex flex-col gap-2 group">
                <label className={labelClass} htmlFor="description">Project description</label>
                <textarea
                  className={`${fieldClass} resize-none`}
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="The verse, the space, the story this piece is meant for…"
                  rows="4"
                  disabled={formStatus === 'SENDING'}
                />
              </div>

              {formStatus === 'ERROR' && (
                <p className="font-sans text-sm text-cinnabar">Please add your name and email so we can reply.</p>
              )}

              <div className="flex flex-col md:flex-row md:items-center gap-5 pt-1">
                <button
                  className="group inline-flex items-center justify-center gap-3 bg-gold px-10 py-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:bg-gold-glow transition-colors duration-300 disabled:opacity-50"
                  type="submit"
                  disabled={formStatus === 'SENDING'}
                >
                  {formStatus === 'SENDING' ? 'Sending…' : 'Submit inquiry'}
                  {formStatus !== 'SENDING' && (
                    <span className="material-symbols-outlined text-[1.1rem] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                  )}
                </button>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-parchment-dim">
                  Reply within 2–3 business days
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
