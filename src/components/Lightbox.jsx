import { useEffect } from 'react';

export default function Lightbox({ isOpen, onClose, artworks, currentIndex, setCurrentIndex }) {
  const handleNext = () => setCurrentIndex((i) => (i + 1) % artworks.length);
  const handlePrev = () => setCurrentIndex((i) => (i - 1 + artworks.length) % artworks.length);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex, artworks.length]);

  if (!isOpen || !artworks || artworks.length === 0) return null;

  const art = artworks[currentIndex];

  return (
    <div
      id="gallery-lightbox"
      className="fixed inset-0 z-[60] bg-ink/97 backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={art.title}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-10 py-5 z-10">
        <span className="font-mono text-[0.72rem] tracking-[0.3em] text-gold">
          {String(currentIndex + 1).padStart(2, '0')} <span className="text-parchment-dim">/ {String(artworks.length).padStart(2, '0')}</span>
        </span>
        <button
          id="lightbox-close"
          onClick={onClose}
          className="p-2 text-parchment-dim hover:text-gold transition-colors duration-300"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      {/* Stage */}
      <div className="relative flex-grow flex items-center justify-center px-4 md:px-20 min-h-0">
        <button
          id="lightbox-prev"
          onClick={handlePrev}
          className="absolute left-3 md:left-8 z-10 p-3 text-parchment-dim hover:text-gold transition-colors duration-300"
          aria-label="Previous"
        >
          <span className="material-symbols-outlined text-4xl">chevron_left</span>
        </button>

        <div className="flex items-center justify-center max-h-full">
          <img
            key={art.src}
            src={art.src}
            alt={art.title}
            className="max-w-full max-h-[68vh] object-contain select-none animate-fadeIn shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          />
        </div>

        <button
          id="lightbox-next"
          onClick={handleNext}
          className="absolute right-3 md:right-8 z-10 p-3 text-parchment-dim hover:text-gold transition-colors duration-300"
          aria-label="Next"
        >
          <span className="material-symbols-outlined text-4xl">chevron_right</span>
        </button>
      </div>

      {/* Plaque */}
      <div className="w-full border-t border-line bg-ink-2/80 backdrop-blur-sm py-7 px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="space-y-2">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-gold">{art.category}</p>
            <h2 className="font-display text-2xl md:text-3xl font-light text-parchment">{art.title}</h2>
            <p className="font-sans text-sm text-parchment-dim max-w-xl leading-relaxed">{art.description}</p>
          </div>
          <div className="border-l border-line pl-6 space-y-1 shrink-0">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-parchment-dim/70">Details</p>
            <p className="font-sans text-sm text-parchment">{art.medium}</p>
            <p className="font-mono text-[0.62rem] tracking-[0.1em] text-parchment-dim">{art.dimensions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
