import { useState, useEffect } from 'react';
import Lightbox from '../components/Lightbox';

import pieceAyatulKursiSilver from '../assets/artwork/piece-ayatul-kursi-silver.jpg';
import pieceFourQuls from '../assets/artwork/piece-four-quls.jpg';
import pieceNamesOfAllahRed from '../assets/artwork/piece-names-of-allah-red.jpg';
import pieceStainedGlassBlue from '../assets/artwork/piece-stained-glass-blue.jpg';
import pieceCircularRed from '../assets/artwork/piece-circular-red.jpg';

const handleSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const artworks = [
    {
      title: 'Ayatul Kursi',
      category: 'Throne Verse Series',
      filterKey: 'CLASSICAL',
      medium: 'Acrylic, Ink & Silver Leaf on Canvas',
      dimensions: '80 × 120 cm',
      description:
        'A majestic rendering of the Throne Verse in elegant Thuluth script, with a vivid red circular centerpiece set against a textured silver-metallic ground.',
      src: pieceAyatulKursiSilver,
    },
    {
      title: 'The Four Quls',
      category: 'Geometric Kufic',
      filterKey: 'MODERN',
      medium: 'Mixed Media & Gold Acrylic (Set of 4)',
      dimensions: '50 × 50 cm each',
      description:
        'A modern square Kufic rendering of the Four Quls — Al-Kafirun, Al-Ikhlas, Al-Falaq and An-Nas — across red, blue, green and charcoal blocks.',
      src: pieceFourQuls,
    },
    {
      title: 'Asmaul Husna',
      category: 'Concentric Series',
      filterKey: 'CLASSICAL',
      medium: 'Textured Ink & Gold on Crimson Velvet',
      dimensions: '90 × 90 cm',
      description:
        'The ninety-nine Names of Allah written in concentric circular layers of Thuluth, ringing the central name of Allah.',
      src: pieceNamesOfAllahRed,
    },
    {
      title: 'Stained Glass Mihrab',
      category: 'Bespoke Arch Series',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Gold Leaf & Acrylic on Wood Arch',
      dimensions: '100 × 150 cm',
      description:
        'A bespoke arch echoing Islamic stained glass, with intricate gold-leaf florals and Quranic script bordering the blue mihrab.',
      src: pieceStainedGlassBlue,
    },
    {
      title: 'Surah Al-Fatiha Medallion',
      category: 'Custom Radial Series',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Gold Ink & Acrylic on Circular Wood',
      dimensions: '80 cm ⌀',
      description:
        'A circular wooden piece displaying Surah Al-Fatiha in a radial gold border around a red-and-white floral damask centre.',
      src: pieceCircularRed,
    },
  ];

  const filteredArtworks =
    activeFilter === 'ALL' ? artworks : artworks.filter((art) => art.filterKey === activeFilter);

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const cards = document.querySelectorAll('.reveal-on-scroll');
    cards.forEach((c) => observer.observe(c));
    return () => cards.forEach((c) => observer.unobserve(c));
  }, [activeFilter]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const filters = ['ALL', 'CLASSICAL', 'MODERN', 'CUSTOM_CALLIGRAPHY'];

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-36 pb-24 md:pb-section-gap">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14">
        <div className="max-w-2xl">
          <p className="font-mono text-eyebrow uppercase text-gold mb-6">The Collection · المعرض</p>
          <h1 className="font-display text-display-sm font-light text-parchment leading-[1.02] mb-6">
            Selected works
          </h1>
          <p className="font-sans text-lg leading-relaxed text-parchment-dim">
            A curated set of explorations — from the rigour of classical scripts to the freedom of
            contemporary abstraction. Select any piece to view it full-frame.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-3 lg:justify-end">
          {filters.map((filter) => (
            <button
              key={filter}
              id={`filter-btn-${filter.toLowerCase()}`}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-[0.7rem] uppercase tracking-[0.2em] pb-1.5 border-b transition-colors duration-300 ${
                activeFilter === filter
                  ? 'text-gold border-gold'
                  : 'text-parchment-dim border-transparent hover:text-parchment'
              }`}
            >
              {filter.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="kashida mb-14"><span className="kashida__dot" /></div>

      {/* Masonry of specimens */}
      <div className="masonry-grid">
        {filteredArtworks.map((artwork, index) => (
          <div
            key={artwork.title}
            onClick={() => openLightbox(index)}
            onMouseMove={handleSpotlight}
            className="masonry-item specimen reveal-on-scroll group cursor-pointer relative"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
              }
            }}
          >
            <div className="relative overflow-hidden">
              <img src={artwork.src} alt={artwork.title} className="w-full h-auto block" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 z-[3] p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-gold mb-2">{artwork.category}</p>
                <h3 className="font-display text-2xl font-light text-parchment mb-2">{artwork.title}</h3>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-parchment-dim">
                  {artwork.medium} · {artwork.dimensions}
                </p>
              </div>
              <span className="absolute top-4 right-4 z-[3] flex items-center justify-center w-9 h-9 bg-ink/70 backdrop-blur-sm border border-line text-parchment opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="material-symbols-outlined text-lg">open_in_full</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        artworks={filteredArtworks}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
      />
    </div>
  );
}
