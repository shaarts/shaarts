import React, { useState, useEffect } from 'react';
import Lightbox from '../components/Lightbox';

// Import local image assets
import pieceFatiha from '../assets/artwork/piece-fatiha.jpg';
import pieceGoldenBreath from '../assets/artwork/piece-golden-breath.jpg';
import pieceLineageStudy from '../assets/artwork/piece-lineage-study.jpg';
import pieceSilentPath from '../assets/artwork/piece-silent-path.jpg';
import pieceOceanicRhythms from '../assets/artwork/piece-oceanic-rhythms.jpg';
import pieceManifestation from '../assets/artwork/piece-manifestation.jpg';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const artworks = [
    {
      title: 'Ayatul Kursi (Verse of the Throne)',
      category: 'Throne Verse Series',
      filterKey: 'CLASSICAL',
      medium: 'Textured Acrylic & Gold Leaf on Canvas',
      dimensions: '100x100cm',
      description: 'The monumental Throne Verse (Quran 2:255) rendered in classic proportions over an earthy, textured acrylic background with hand-applied gold strokes.',
      src: pieceFatiha,
    },
    {
      title: 'Tawakkul (Divine Trust)',
      category: 'Modern Abstract',
      filterKey: 'MODERN',
      medium: 'Acrylic Pour & Gold Leaf on Canvas',
      dimensions: '80x80cm',
      description: 'An abstract visual representation of Tawakkul—having complete trust in the Divine path. Features fluid pouring paint with sweeping gold leaf scripts.',
      src: pieceGoldenBreath,
    },
    {
      title: 'Sabr & Shukr (Patience & Gratitude)',
      category: 'Commissioned Diptych',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Acrylic & Gold Foil on Wood Panel',
      dimensions: '60x60cm each',
      description: 'A custom double panel design rendering the concepts of Sabr (Patience) and Shukr (Gratitude) in interlocking Diwani script.',
      src: pieceLineageStudy,
    },
    {
      title: 'Al-Hadi (The Guide - Quran 26:62)',
      category: 'Spiritual Reminders',
      filterKey: 'CLASSICAL',
      medium: 'Fluid Art & Gold Script on Canvas',
      dimensions: '40x120cm',
      description: 'An elongated, peaceful scroll featuring the Quranic verse: "Indeed, my Lord is with me, He will guide me" rendered in gold leaf over deep charcoal washes.',
      src: pieceSilentPath,
    },
    {
      title: 'The City of Light (Madina Silhouette)',
      category: 'Typographical Maps',
      filterKey: 'MODERN',
      medium: 'Mixed Media Acrylic on Canvas',
      dimensions: '90x120cm',
      description: 'An experimental silhouette structure of the city of Madina built entirely out of layered calligraphy letters of blessings and guidance.',
      src: pieceOceanicRhythms,
    },
    {
      title: 'Asmaul Husna (The 99 Beautiful Names)',
      category: 'Geometric Showcase',
      filterKey: 'CLASSICAL',
      medium: 'Carbon Ink & Gold Accents on Ahar Paper',
      dimensions: '80x80cm',
      description: 'A structured, geometric Kufic rendering of the 99 Beautiful Names of Allah, balance-scaled in a museum-quality layout.',
      src: pieceManifestation,
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
