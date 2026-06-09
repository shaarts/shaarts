import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import local image assets
import craftHero from '../assets/artwork/craft-hero.jpg';
import craftInk from '../assets/artwork/craft-ink.jpg';
import craftPaper from '../assets/artwork/craft-paper.jpg';
import scriptThuluth from '../assets/artwork/script-thuluth.jpg';
import scriptDiwani from '../assets/artwork/script-diwani.jpg';
import scriptNaskh from '../assets/artwork/script-naskh.jpg';

export default function Craft() {
  // Intersection Observer for scroll-reveal logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('stagger-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.style.opacity = '0';
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Parallax Scroll Effect for Hero Image
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const heroImage = document.getElementById('craft-hero-image');
          if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.25}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-end overflow-hidden -mt-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            id="craft-hero-image"
            src={craftHero}
            alt="The Art of the Qalam"
            className="w-full h-full object-cover grayscale-[20%] contrast-[110%] brightness-[70%] will-change-transform"
          />
        </div>
        <div className="relative z-10 px-margin-desktop pb-24 max-w-container-max mx-auto w-full">
          <p className="font-label-md text-label-md text-secondary-fixed mb-4 uppercase tracking-[0.3em]">
            The Foundation
          </p>
          <h1 className="font-display-lg text-display-lg text-white max-w-3xl leading-none">
            The Art of the Qalam
          </h1>
          <div className="h-1 w-24 bg-secondary mt-8"></div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto transition-all duration-[800ms] ease-out">
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
            <h2 className="font-headline-lg text-headline-lg mb-8 italic">
              Sacred proportions, centuries in the making.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Arabic calligraphy is more than written word; it is a spiritual geometry. At Shaarts, we honor the ancient lineage of master calligraphers by strictly adhering to the tools and methods passed down through generations. Each stroke is a meditation on balance, requiring absolute precision and a lifetime of devotion.
            </p>
          </div>
        </div>
      </section>

      {/* The Ink */}
      <section className="py-section-gap bg-surface-container-low relative overflow-hidden transition-all duration-[800ms] ease-out">
        <div className="px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-24">
          <div className="order-2 md:order-1">
            <div className="art-frame aspect-[4/5] bg-neutral-900 overflow-hidden relative group">
              <img
                src={craftInk}
                alt="Ink No. 04 / Soot & Alum"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 text-white/80 font-label-md text-label-md">
                INK NO. 04 / SOOT &amp; ALUM
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">
              The Mediums
            </p>
            <h2 className="font-headline-lg text-headline-lg">Ink &amp; Acrylics</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              While rooted in traditional carbon-soot inks, gum arabic, and hand-carved qalam pens, our contemporary work merges these ancient mediums with modern acrylic fluid pouring. This technique introduces rich, layered organic textures underneath brilliant hand-applied gold leaf.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant italic">
              "The deep charcoal absorbs the light, while the gold strokes reflect the divine."
            </p>
            <div className="pt-4">
              <a
                href="#scripts-section"
                className="inline-block px-8 py-3 border border-primary text-primary font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
              >
                Explore Materials
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Paper */}
      <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto transition-all duration-[800ms] ease-out">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 space-y-6">
            <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">
              The Canvas
            </p>
            <h2 className="font-headline-lg text-headline-lg">Substrates</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Every masterpiece starts on a custom canvas—ranging from silk-smooth, hand-burnished Ahar paper for pure ink writing, to heavy gallery-grade cotton canvas stretched for thick acrylic textures and gold leaf overlays.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-4 text-on-surface-variant">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                <span className="font-label-md text-label-md">HAND-BURNISHED SILK TEXTURES</span>
              </li>
              <li className="flex items-center gap-4 text-on-surface-variant">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                <span className="font-label-md text-label-md">GALLERY-GRADE STRETCHED CANVAS</span>
              </li>
              <li className="flex items-center gap-4 text-on-surface-variant">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                <span className="font-label-md text-label-md">HEAVY GOLD LEAF METALLIC ACCENTS</span>
              </li>
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="art-frame aspect-video overflow-hidden">
              <img
                src={craftPaper}
                alt="Agate stone burnishing Ahar paper"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Script */}
      <section
        id="scripts-section"
        className="py-section-gap bg-primary text-white overflow-hidden transition-all duration-[800ms] ease-out"
      >
        <div className="px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="font-label-md text-label-md text-secondary-fixed mb-4 tracking-widest uppercase">
                The Discipline
              </p>
              <h2 className="font-display-lg text-display-lg text-white">The Script</h2>
            </div>
            <p className="font-body-lg text-body-lg text-inverse-primary/70 md:max-w-xs border-l border-white/20 pl-8 mb-4">
              From the monumental Thuluth to the poetic Diwani, every style carries its own rhythm and weight.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Script Card 1 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-square art-frame border-white/10">
                <img
                  src={scriptThuluth}
                  alt="Thuluth Calligraphy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Thuluth</h3>
              <p className="font-label-md text-label-md text-secondary-fixed mb-4">THE KING OF SCRIPTS</p>
              <p className="font-body-md text-body-md text-white/60">
                Known for its clear structure and monumental elegance, Thuluth is the cornerstone of architectural calligraphy.
              </p>
            </div>
            {/* Script Card 2 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-square art-frame border-white/10">
                <img
                  src={scriptDiwani}
                  alt="Diwani Calligraphy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Diwani</h3>
              <p className="font-label-md text-label-md text-secondary-fixed mb-4">THE CHANCELLERY STYLE</p>
              <p className="font-body-md text-body-md text-white/60">
                Characterized by its cursive flow and tight, interlocking letterforms, Diwani was once a secret script for royalty.
              </p>
            </div>
            {/* Script Card 3 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-square art-frame border-white/10">
                <img
                  src={scriptNaskh}
                  alt="Naskh Calligraphy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">Naskh</h3>
              <p className="font-label-md text-label-md text-secondary-fixed mb-4">THE SCRIBAL STANDARD</p>
              <p className="font-body-md text-body-md text-white/60">
                The most widely used script for Quranic texts, Naskh focuses on perfect legibility and graceful rhythmic balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Divider */}
      <div className="w-full h-px bg-primary/10 max-w-container-max mx-auto my-12"></div>

      {/* CTA Section */}
      <section className="py-section-gap px-margin-desktop max-w-container-max mx-auto text-center transition-all duration-[800ms] ease-out">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="font-headline-lg text-headline-lg italic">Experience the stroke of the Qalam.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            We invite you to view our latest collection or request a custom commission created with these ancient techniques.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Link
              id="craft-view-collection"
              to="/gallery"
              className="px-10 py-4 bg-primary text-white font-label-md text-label-md uppercase tracking-widest hover:bg-gold-leaf transition-colors duration-500 text-center"
            >
              View Collection
            </Link>
            <Link
              id="craft-commission-piece"
              to="/custom-calligraphy"
              className="px-10 py-4 border border-primary text-primary font-label-md text-label-md uppercase tracking-widest hover:border-secondary hover:text-secondary transition-colors duration-500 text-center"
            >
              Order Custom Art
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
