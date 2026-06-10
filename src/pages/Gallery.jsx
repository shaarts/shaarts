import { useState, useEffect } from 'react';
import Lightbox from '../components/Lightbox';

// Import local image assets
import pieceAyatulKursiSilver from '../assets/artwork/piece-ayatul-kursi-silver.jpg';
import pieceFourQuls from '../assets/artwork/piece-four-quls.jpg';
import pieceNamesOfAllahRed from '../assets/artwork/piece-names-of-allah-red.jpg';
import pieceStainedGlassBlue from '../assets/artwork/piece-stained-glass-blue.jpg';
import pieceCircularRed from '../assets/artwork/piece-circular-red.jpg';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const artworks = [
    {
      title: 'Ayatul Kursi (Verse of the Throne)',
      category: 'Throne Verse Series',
      filterKey: 'CLASSICAL',
      medium: 'Acrylic, Ink & Silver Leaf on Canvas',
      dimensions: '80x120cm',
      description: 'A majestic rendering of the Throne Verse (Ayatul Kursi) in elegant Thuluth script, featuring a vibrant red circular centerpiece set against a textured silver-metallic background.',
      src: pieceAyatulKursiSilver,
    },
    {
      title: 'The Four Quls (Square Kufic Set)',
      category: 'Geometric Kufic',
      filterKey: 'MODERN',
      medium: 'Mixed Media & Gold Acrylic on Canvas (Set of 4)',
      dimensions: '50x50cm each',
      description: 'A modern, geometric square Kufic script rendering of the Four Quls (Surah Al-Kafirun, Al-Ikhlas, Al-Falaq, and An-Nas) in red, blue, green, and charcoal canvas blocks.',
      src: pieceFourQuls,
    },
    {
      title: 'Asmaul Husna (Concentric Circles)',
      category: 'Concentric Series',
      filterKey: 'CLASSICAL',
      medium: 'Textured Ink & Gold Paint on Crimson Velvet Board',
      dimensions: '90x90cm',
      description: 'The 99 Beautiful Names of Allah meticulously written in concentric circular layers in elegant Thuluth script surrounding the central name of Allah.',
      src: pieceNamesOfAllahRed,
    },
    {
      title: 'Stained Glass Mihrab',
      category: 'Bespoke Arch Series',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Gold Leaf & Acrylic on Wood Arch Panel',
      dimensions: '100x150cm',
      description: 'A stunning bespoke arch design reminiscent of Islamic stained-glass windows, featuring intricate gold leaf floral patterns and Quranic script bordering the blue arch.',
      src: pieceStainedGlassBlue,
    },
    {
      title: 'Surah Al-Fatiha Circular Medallion',
      category: 'Custom Radial Series',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Gold Ink & Acrylic Spray on Circular Wood Panel',
      dimensions: '80cm Diameter',
      description: 'A circular wooden masterpiece displaying Surah Al-Fatiha in a radial gold calligraphic border surrounding a red and white floral damask pattern.',
      src: pieceCircularRed,
    },
  ];

  // Filter artworks
  const filteredArtworks =
    activeFilter === 'ALL'
      ? artworks
      : artworks.filter((art) => art.filterKey === activeFilter);

  // Scroll reveal transitions
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('.art-card');
    cards.forEach((card) => {
      // Set initial styles for animation
      card.classList.add('transition-all', 'duration-[1000ms]', 'opacity-0', 'translate-y-10');
      observer.observe(card);
    });

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [activeFilter]); // Trigger animations again when filter changes!

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const filters = ['ALL', 'CLASSICAL', 'MODERN', 'CUSTOM_CALLIGRAPHY'];

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 lg:py-section-gap">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
        <div className="max-w-2xl">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
            Selected Works
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            A curated selection of Arabic calligraphy explorations, spanning the rigidity of classical scripts to the fluid freedom of contemporary abstract art.
          </p>
        </div>

        {/* Discreet Filter System */}
        <div className="flex flex-wrap gap-8 items-center border-b border-primary/10 pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              id={`filter-btn-${filter.toLowerCase()}`}
              onClick={() => setActiveFilter(filter)}
              className={`font-label-md text-label-md tracking-widest pb-1 transition-all duration-300 focus:outline-none ${
                activeFilter === filter
                  ? 'text-secondary border-b-2 border-secondary'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              {filter.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetrical Masonry Grid */}
      <div className="masonry-grid" id="masonry-grid">
        {filteredArtworks.map((artwork, index) => (
          <div
            key={artwork.title}
            onClick={() => openLightbox(index)}
            className="masonry-item art-card group cursor-pointer relative overflow-hidden bg-surface-container-low border border-primary/5"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openLightbox(index);
              }
            }}
          >
            <div className="relative overflow-hidden">
              <img
                src={artwork.src}
                alt={artwork.title}
                className="w-full h-auto transition-transform duration-[800ms] ease-out"
              />
              <div className="art-hover-overlay absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex flex-col justify-end p-8">
                <span className="font-label-md text-label-md text-surface uppercase tracking-widest mb-2">
                  {artwork.category}
                </span>
                <h3 className="font-headline-md text-headline-md text-surface">
                  {artwork.title}
                </h3>
                <p className="font-label-md text-label-md text-surface/80 mt-4">
                  {artwork.medium}, {artwork.dimensions}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Immersive Lightbox */}
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
