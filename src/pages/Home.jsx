import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import local image assets
import heroBg from '../assets/artwork/hero-bg.jpg';
import aboutArtist from '../assets/artwork/about-artist.png';
import pieceAyatulKursiSilver from '../assets/artwork/piece-ayatul-kursi-silver.jpg';
import pieceFourQuls from '../assets/artwork/piece-four-quls.jpg';
import pieceNamesOfAllahRed from '../assets/artwork/piece-names-of-allah-red.jpg';
import pieceStainedGlassBlue from '../assets/artwork/piece-stained-glass-blue.jpg';
import pieceCircularRed from '../assets/artwork/piece-circular-red.jpg';

export default function Home() {
  // Trigger Instagram embed processing
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    } else {
      const interval = setInterval(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  // Intersection Observer for scroll-reveal logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden -mt-24">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Signature Calligraphy Mural"
            className="w-full h-full object-cover brightness-95"
          />
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile max-w-4xl">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-8 drop-shadow-lg italic">
            The Soul of the Script
          </h1>
          <Link
            id="hero-view-collection"
            to="/gallery"
            className="inline-block px-12 py-4 bg-primary text-white font-label-md text-label-md tracking-widest hover:bg-gold-leaf transition-colors duration-500"
          >
            VIEW COLLECTION
          </Link>
        </div>
      </section>

      {/* Artist Statement Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low/30">
        <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
          <p className="font-headline-md text-headline-md leading-relaxed text-on-surface font-light italic px-4 md:px-12">
            "Bridging the ancient elegance of the Qalam with contemporary abstract form."
          </p>
          <div className="mt-12 w-16 h-px bg-primary/20 mx-auto"></div>
        </div>
      </section>

      {/* Featured Section (About the Artist) */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="reveal-on-scroll">
            <div className="aspect-[4/5] overflow-hidden border border-primary/5 p-4 bg-white/40">
              <img
                src={aboutArtist}
                alt="Artist at Work"
                className="w-full h-full object-cover grayscale-[20%] transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-4 font-label-md text-label-md text-on-surface-variant">
              Studio Process: Hand-carved reed pen on vintage Ahar paper.
            </div>
          </div>
          <div className="reveal-on-scroll space-y-8 md:pl-16">
            <span className="font-label-md text-label-md text-gold-leaf uppercase tracking-[0.2em]">Arabic Calligraphy Artist</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">About the Artist</h2>
            <div className="space-y-6 max-w-md">
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Based in Saudi Arabia, Shaarts Calligraphy specializes in custom Arabic calligraphy and luxury, limited-edition Islamic art masterpieces.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Following a period of severe creative block where the artist almost put down the brush forever, they rediscovered their purpose through faith. Today, writing Quranic verses and names of Allah is not just art, but an act of dhikr (remembrance) and worship—creating beautiful reminders designed to outlive the artist.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant italic font-light">
                "When you create with the sole intention of serving Him — He puts barakah (blessings) in every single brushstroke."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Gallery / Bento Grid Layout */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="font-headline-lg text-headline-lg">Selected Series</h2>
          <div className="w-1/3 h-px bg-primary/10 hidden md:block mb-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[1200px]">
          {/* Item 1: Large Focus Item - Ayatul Kursi */}
          <div className="md:col-span-8 md:row-span-2 reveal-on-scroll overflow-hidden relative group border border-primary/10 p-4">
            <img
              src={pieceAyatulKursiSilver}
              alt="Ayatul Kursi (Verse of the Throne)"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute bottom-8 left-8 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-label-md text-label-md mb-2">Throne Verse Series</p>
              <h3 className="font-headline-md text-headline-md">Ayatul Kursi</h3>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Item 2: Side Item - The Four Quls */}
          <div className="md:col-span-4 reveal-on-scroll overflow-hidden relative group border border-primary/10 p-4">
            <img
              src={pieceFourQuls}
              alt="The Four Quls (Square Kufic Set)"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-label-md text-label-md mb-2">Geometric Kufic</p>
              <h3 className="font-headline-md text-headline-md">The Four Quls</h3>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Item 3: Side Item - Asmaul Husna */}
          <div className="md:col-span-4 reveal-on-scroll overflow-hidden relative group border border-primary/10 p-4">
            <img
              src={pieceNamesOfAllahRed}
              alt="Asmaul Husna (Concentric Circles)"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-label-md text-label-md mb-2">Concentric Series</p>
              <h3 className="font-headline-md text-headline-md">Asmaul Husna</h3>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Item 4: Bottom Left Item - Stained Glass Mihrab */}
          <div className="md:col-span-8 reveal-on-scroll overflow-hidden relative group border border-primary/10 p-4">
            <img
              src={pieceStainedGlassBlue}
              alt="Stained Glass Mihrab"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-label-md text-label-md mb-2">Bespoke Arch Series</p>
              <h3 className="font-headline-md text-headline-md">Stained Glass Mihrab</h3>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Item 5: Bottom Right Item - Surah Al-Fatiha Circular Medallion */}
          <div className="md:col-span-4 reveal-on-scroll overflow-hidden relative group border border-primary/10 p-4">
            <img
              src={pieceCircularRed}
              alt="Surah Al-Fatiha Circular Medallion"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-8 left-8 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="font-label-md text-label-md mb-2">Custom Radial Series</p>
              <h3 className="font-headline-md text-headline-md">Surah Al-Fatiha</h3>
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* Simple Divider */}
      <div className="w-full h-px bg-primary/10 max-w-container-max mx-auto"></div>

      {/* Contact / Custom Calligraphy Teaser */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-2xl mx-auto reveal-on-scroll">
          <h2 className="font-headline-lg text-headline-lg mb-8">Custom Calligraphy</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
            Every piece of calligraphy is a unique conversation. We accept a limited number of custom calligraphy orders each year for collectors and institutions worldwide.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              id="teaser-inquire-now"
              to="/custom-calligraphy"
              className="px-10 py-4 bg-primary text-white font-label-md text-label-md tracking-widest hover:bg-gold-leaf transition-colors duration-300"
            >
              INQUIRE NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Divider */}
      <div className="w-full h-px bg-primary/10 max-w-container-max mx-auto"></div>

      {/* Instagram Embed Section */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal-on-scroll flex flex-col items-center">
        <div className="text-center mb-10">
          <span className="font-label-md text-label-md text-gold-leaf uppercase tracking-[0.2em]">Follow the Journey</span>
          <h2 className="font-headline-lg text-headline-lg mt-2 mb-4">On Instagram</h2>
          <a 
            href="https://www.instagram.com/shaarts_calligraphy/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-label-md text-label-md text-primary hover:text-secondary border-b border-primary hover:border-secondary transition-colors duration-300 pb-1"
          >
            @SHAARTS_CALLIGRAPHY
          </a>
        </div>
        <div className="w-full flex justify-center">
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink="https://www.instagram.com/shaarts_calligraphy/?utm_source=ig_embed&utm_campaign=loading" 
            data-instgrm-version="14" 
            style={{ 
              background: '#FFF', 
              border: '1px solid rgba(0, 0, 0, 0.1)', 
              borderRadius: '0px', 
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', 
              margin: '1px', 
              maxWidth: '658px', 
              minWidth: '326px', 
              padding: 0, 
              width: 'calc(100% - 2px)' 
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href="https://www.instagram.com/shaarts_calligraphy/?utm_source=ig_embed&utm_campaign=loading" 
                style={{ 
                  background: '#FFFFFF', 
                  lineHeight: 0, 
                  padding: '0 0', 
                  textAlign: 'center', 
                  textDecoration: 'none', 
                  width: '100%',
                  display: 'block'
                }} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '0px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '0px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                  </div>
                </div>
                <div style={{ padding: '19% 0' }}></div>
                <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                  <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                        <g>
                          <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div style={{ paddingTop: '8px' }}>
                  <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>
                    View this profile on Instagram
                  </div>
                </div>
                <div style={{ padding: '12.5% 0' }}></div>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '14px', alignItems: 'center' }}>
                  <div>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(0px) translateY(7px)' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', height: '12.5px', transform: 'rotate(-45deg) translateX(3px) translateY(1px)', width: '12.5px', flexGrow: 0, marginRight: '14px', marginLeft: '2px' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', height: '12.5px', width: '12.5px', transform: 'translateX(9px) translateY(-18px)' }}></div>
                  </div>
                  <div style={{ marginLeft: '8px' }}>
                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '20px', width: '20px' }}></div>
                    <div style={{ width: 0, height: 0, borderTop: '2px solid transparent', borderLeft: '6px solid #f4f4f4', borderBottom: '2px solid transparent', transform: 'translateX(16px) translateY(-4px) rotate(30deg)' }}></div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <div style={{ width: '0px', borderTop: '8px solid #F4F4F4', borderRight: '8px solid transparent', transform: 'translateY(16px)' }}></div>
                    <div style={{ backgroundColor: '#F4F4F4', flexGrow: 0, height: '12px', width: '16px', transform: 'translateY(-4px)' }}></div>
                    <div style={{ width: 0, height: 0, borderTop: '8px solid #F4F4F4', borderLeft: '8px solid transparent', transform: 'translateY(-4px) translateX(8px)' }}></div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '0px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                  <div style={{ backgroundColor: '#F4F4F4', borderRadius: '0px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                </div>
              </a>
            </div>
          </blockquote>
        </div>
      </section>
    </div>
  );
}
