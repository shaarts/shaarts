import React, { useEffect } from 'react';

export default function Lightbox({
  isOpen,
  onClose,
  artworks,
  currentIndex,
  setCurrentIndex,
}) {
  // Keypress event listener for navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen || !artworks || artworks.length === 0) return null;

  const currentArtwork = artworks[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + artworks.length) % artworks.length);
  };

  return (
    <div
      id="gallery-lightbox"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between"
      role="dialog"
      aria-modal="true"
    >
      {/* Lightbox Header */}
      <div className="flex justify-between items-center px-6 py-4 text-white z-10">
        <span className="font-label-md text-xs md:text-sm tracking-widest text-secondary-fixed">
          {currentIndex + 1} / {artworks.length}
        </span>
        <button
          id="lightbox-close"
          onClick={onClose}
          className="p-2 text-white/75 hover:text-white hover:scale-110 transition-all duration-300 focus:outline-none"
          aria-label="Close lightbox"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      {/* Main View Area */}
      <div className="relative flex-grow flex items-center justify-center px-4 md:px-16">
        {/* Previous Button */}
        <button
          id="lightbox-prev"
          onClick={handlePrev}
          className="absolute left-4 md:left-8 p-3 text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-full z-10 focus:outline-none"
          aria-label="Previous image"
        >
          <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_left</span>
        </button>

        {/* Artwork Image Container */}
        <div className="max-w-4xl max-h-[70vh] flex items-center justify-center overflow-hidden">
          <img
            key={currentArtwork.src}
            src={currentArtwork.src}
            alt={currentArtwork.title}
            className="max-w-full max-h-[70vh] object-contain select-none animate-fadeIn duration-500"
          />
        </div>

        {/* Next Button */}
        <button
          id="lightbox-next"
          onClick={handleNext}
          className="absolute right-4 md:right-8 p-3 text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-full z-10 focus:outline-none"
          aria-label="Next image"
        >
          <span className="material-symbols-outlined text-3xl md:text-4xl">chevron_right</span>
        </button>
      </div>

      {/* Artwork Plaque / Description Pane */}
      <div className="w-full bg-black/80 text-white border-t border-white/5 py-8 px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div className="space-y-2">
            <span className="font-label-md text-xs md:text-sm text-secondary tracking-[0.2em] uppercase">
              {currentArtwork.category}
            </span>
            <h2 className="font-headline-lg text-2xl md:text-3xl tracking-tight italic">
              {currentArtwork.title}
            </h2>
            <p className="font-body-md text-sm md:text-base text-white/70 max-w-xl">
              {currentArtwork.description}
            </p>
          </div>
          <div className="border-l border-white/10 pl-6 space-y-1 text-left">
            <p className="font-label-md text-xs text-white/50 tracking-wider">DETAILS</p>
            <p className="font-body-md text-sm text-white/80">{currentArtwork.medium}</p>
            <p className="font-body-md text-xs text-white/60">{currentArtwork.dimensions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
