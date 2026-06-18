import { useState, useEffect } from 'react';
import Lightbox from '../components/Lightbox';

import artAyatulKursiGold from '../assets/artwork/art-ayatul-kursi-gold.jpg';
import artAllahAzure from '../assets/artwork/art-allah-azure.jpg';
import artAyatulKursiRoundel from '../assets/artwork/art-ayatul-kursi-roundel.jpg';
import artAsmaulHusnaMosaic from '../assets/artwork/art-asmaul-husna-mosaic.jpg';
import artAsmaulHusnaWheel from '../assets/artwork/art-asmaul-husna-wheel.jpg';
import artMuhammadGold from '../assets/artwork/art-muhammad-gold.jpg';
import artCarvedVerse from '../assets/artwork/art-carved-verse.jpg';
import artAlAqsa from '../assets/artwork/art-al-aqsa.jpg';
import artDomeOfTheRock from '../assets/artwork/art-dome-of-the-rock.jpg';
import artMihrabOfLight from '../assets/artwork/art-mihrab-of-light.jpg';
import artNamesMandala from '../assets/artwork/art-names-mandala.jpg';
import artThronePanel from '../assets/artwork/art-throne-panel.jpg';

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
      medium: 'Gold Leaf & Ink on Black Canvas',
      dimensions: '80 × 120 cm',
      description:
        'The Throne Verse rendered in flowing gold Thuluth on a deep black ground — light drawn out of darkness, letter by letter.',
      src: artAyatulKursiGold,
    },
    {
      title: 'Allah',
      category: 'The Divine Name',
      filterKey: 'CLASSICAL',
      medium: 'Acrylic & Ink on Canvas',
      dimensions: '70 × 90 cm',
      description:
        'The name of Allah set in luminous Thuluth above a sky-washed field, framed in dark wood.',
      src: artAllahAzure,
    },
    {
      title: 'Ayatul Kursi Roundel',
      category: 'Concentric Series',
      filterKey: 'CLASSICAL',
      medium: 'Ink & Silver on Circular Canvas',
      dimensions: '90 cm ⌀',
      description:
        'The Throne Verse spiralling inward through concentric rings of script around a central medallion, set on a turquoise disc.',
      src: artAyatulKursiRoundel,
    },
    {
      title: 'The Ninety-Nine',
      category: 'Mosaic Names',
      filterKey: 'MODERN',
      medium: 'Acrylic & Gold on Canvas',
      dimensions: '100 × 100 cm',
      description:
        'The ninety-nine Names of Allah held in a grid of jewel-toned discs — a mosaic of remembrance against gold.',
      src: artAsmaulHusnaMosaic,
    },
    {
      title: 'Asmaul Husna Wheel',
      category: 'Radial Kufic',
      filterKey: 'MODERN',
      medium: 'Ink & Acrylic on Canvas',
      dimensions: '100 × 150 cm',
      description:
        'The Names radiating from a central rose in interlocking Kufic, woven into a geometric wheel of crimson and gold.',
      src: artAsmaulHusnaWheel,
    },
    {
      title: 'Muhammad ﷺ',
      category: 'The Blessed Name',
      filterKey: 'CLASSICAL',
      medium: 'Gold Acrylic & Ink on Canvas',
      dimensions: '70 × 90 cm',
      description:
        'The blessed name of the Prophet ﷺ in gilded Thuluth, rising over a soft wash of sky.',
      src: artMuhammadGold,
    },
    {
      title: 'Carved Verse',
      category: 'Relief Series',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Raised Gold Script on Black Panel',
      dimensions: '60 × 100 cm',
      description:
        'A teardrop panel of Quranic verse built up in raised gold lettering, catching the light like carved relief.',
      src: artCarvedVerse,
    },
    {
      title: 'Al-Aqsa',
      category: 'Sanctuary Series',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Acrylic on Canvas, Framed',
      dimensions: '60 × 80 cm',
      description:
        'The golden dome of the noble sanctuary at dawn, painted in warm light and framed for a quiet wall.',
      src: artAlAqsa,
    },
    {
      title: 'Qubbat as-Sakhra',
      category: 'Sanctuary Series',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Acrylic on Canvas',
      dimensions: '80 × 120 cm',
      description:
        'The Dome of the Rock rendered in gold and stone, its arches and tilework carried in patient detail.',
      src: artDomeOfTheRock,
    },
    {
      title: 'Mihrab of Light',
      category: 'Bespoke Panel',
      filterKey: 'CUSTOM_CALLIGRAPHY',
      medium: 'Gold Leaf & Acrylic on Canvas',
      dimensions: '100 × 150 cm',
      description:
        'A towering panel of Quranic script in gold over deep lapis — a niche of light to anchor a room.',
      src: artMihrabOfLight,
    },
    {
      title: 'Names in Colour',
      category: 'Radial Kufic',
      filterKey: 'MODERN',
      medium: 'Mixed Media on Canvas',
      dimensions: '90 cm ⌀',
      description:
        'A circular mandala of the Names in interlocking colour, geometry and script turning together as one wheel.',
      src: artNamesMandala,
    },
    {
      title: 'Throne Verse Panel',
      category: 'Throne Verse Series',
      filterKey: 'CLASSICAL',
      medium: 'Gold Leaf & Ink on Black Canvas',
      dimensions: '60 × 120 cm',
      description:
        'A tall column of the Throne Verse in gold Thuluth on black — a vertical reading of the same eternal words.',
      src: artThronePanel,
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
