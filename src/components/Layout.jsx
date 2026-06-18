import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../config';

const navLinks = [
  { name: 'Home', path: '/', ar: 'الرئيسية' },
  { name: 'Gallery', path: '/gallery', ar: 'المعرض' },
  { name: 'Commission', path: '/custom-calligraphy', ar: 'الطلبات' },
];

function Wordmark({ onClick }) {
  return (
    <Link
      id="brand-logo"
      to="/"
      onClick={onClick}
      className="group flex items-baseline gap-3"
      aria-label="Shaarts Calligraphy — home"
    >
      <span className="font-display text-2xl md:text-[1.7rem] font-light tracking-tight text-parchment group-hover:text-gold-glow transition-colors duration-500">
        Shaarts
      </span>
      <span className="hidden sm:inline font-mono text-[0.62rem] tracking-[0.34em] uppercase text-parchment-dim group-hover:text-gold transition-colors duration-500">
        Calligraphy
      </span>
    </Link>
  );
}

function SocialLinks({ className = '' }) {
  return (
    <div className={className}>
      <a
        href={`https://www.instagram.com/${CONFIG.INSTAGRAM_USERNAME}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-parchment-dim hover:text-gold transition-colors duration-300"
        aria-label="Instagram"
      >
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      </a>
      <a
        href={CONFIG.FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-parchment-dim hover:text-gold transition-colors duration-300"
        aria-label="Facebook"
      >
        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  );
}

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Initialize Google Analytics on mount
  useEffect(() => {
    if (!CONFIG.GOOGLE_ANALYTICS_ID || CONFIG.GOOGLE_ANALYTICS_ID === 'G-XXXXXXXXXX') return;

    if (!document.getElementById('google-analytics-script')) {
      const script = document.createElement('script');
      script.id = 'google-analytics-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GOOGLE_ANALYTICS_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', CONFIG.GOOGLE_ANALYTICS_ID);
    }
  }, []);

  // Scroll to top, track page views, and update dynamic SEO meta tags on route change
  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.gtag && CONFIG.GOOGLE_ANALYTICS_ID && CONFIG.GOOGLE_ANALYTICS_ID !== 'G-XXXXXXXXXX') {
      window.gtag('config', CONFIG.GOOGLE_ANALYTICS_ID, {
        page_path: location.pathname,
      });
    }

    let title = 'Shaarts Calligraphy | Luxury Arabic Calligraphy & Islamic Fine Art';
    let description = 'Explore the luxury Arabic calligraphy portfolio of Shaarts. Discover bespoke Quranic verses, concentric Asmaul Husna, and modern Islamic art masterpieces.';
    const siteUrl = 'https://shaarts.com';
    const path = location.pathname;

    if (path === '/') {
      title = 'Shaarts Calligraphy | Luxury Arabic Calligraphy & Islamic Fine Art';
      description = 'Explore the luxury Arabic calligraphy portfolio of Shaarts. Discover bespoke Quranic verses, concentric Asmaul Husna, and modern Islamic art masterpieces.';
    } else if (path === '/gallery') {
      title = 'Art Gallery | Shaarts Calligraphy Masterpieces';
      description = 'Browse a curated selection of exquisite Arabic calligraphy paintings by Shaarts, from classical Thuluth and concentric Asmaul Husna to modern square Kufic script sets.';
    } else if (path === '/custom-calligraphy') {
      title = 'Custom Calligraphy Commissions | Shaarts Fine Art';
      description = 'Inquire about custom Arabic calligraphy commissions for private collectors and institutions worldwide. Bring your favorite Quranic verses to life in a bespoke painting.';
    } else if (path === '/privacy') {
      title = 'Privacy Policy | Shaarts Calligraphy';
      description = 'Read our Privacy Policy to understand how we protect and handle your personal data at Shaarts Calligraphy.';
    }

    document.title = title;

    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', title);

    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.setAttribute('content', description);

    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.getElementById('og-description');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.getElementById('og-url');
    if (ogUrl) ogUrl.setAttribute('content', `${siteUrl}${path}`);

    const twitterTitle = document.getElementById('twitter-title');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.getElementById('twitter-description');
    if (twitterDesc) twitterDesc.setAttribute('content', description);

    const twitterUrl = document.getElementById('twitter-url');
    if (twitterUrl) twitterUrl.setAttribute('content', `${siteUrl}${path}`);
  }, [location.pathname]);

  // Header condenses after scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="manuscript-frame" aria-hidden="true" />

      {/* Header */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-ink border-b ${
          isScrolled
            ? 'bg-ink/85 backdrop-blur-xl py-3 border-line/70'
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Wordmark onClick={() => setIsMenuOpen(false)} />

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={`nav-link-${link.name.toLowerCase()}`}
                to={link.path}
                className={`font-mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-gold'
                    : 'text-parchment-dim hover:text-parchment'
                }`}
              >
                <span className={isActive(link.path) ? 'text-gold/60 mr-1.5' : 'text-gold/40 mr-1.5'}>/</span>
                {link.name}
              </Link>
            ))}
            <a
              id="nav-inquire"
              href={CONFIG.INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink bg-gold px-4 py-2 hover:bg-gold-glow transition-colors duration-300"
            >
              Inquire
            </a>
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 -mr-2 text-parchment hover:text-gold transition-colors duration-300"
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-[1.7rem]">menu</span>
          </button>
        </nav>
      </header>

      {/* Drawer */}
      <div
        id="side-drawer"
        className={`fixed inset-y-0 right-0 w-full sm:w-[26rem] bg-ink-2/95 backdrop-blur-xl border-l border-line z-50 transition-transform duration-500 ease-ink ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="flex justify-between items-center px-8 py-6 border-b border-line">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-parchment-dim">Menu — القائمة</span>
          <button
            id="close-drawer"
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 text-parchment-dim hover:text-gold transition-colors duration-300"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-[1.7rem]">close</span>
          </button>
        </div>

        <div className="flex flex-col px-8 py-10 gap-7">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              id={`drawer-link-${link.name.toLowerCase()}`}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="group flex items-baseline justify-between border-b border-line/60 pb-5"
            >
              <span className={`font-display text-4xl font-light tracking-tight transition-colors duration-300 ${
                isActive(link.path) ? 'text-gold' : 'text-parchment group-hover:text-gold-glow'
              }`}>
                {link.name}
              </span>
              <span className="font-arabic text-2xl text-parchment-dim group-hover:text-gold transition-colors duration-300" dir="rtl">
                {link.ar}
              </span>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-10 left-8 right-8">
          <div className="kashida mb-6"><span className="kashida__dot" /></div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-parchment-dim mb-4">Connect</p>
          <SocialLinks className="flex gap-6 mb-6" />
          <p className="font-mono text-[0.62rem] text-parchment-dim/70">© 2026 Shaarts Calligraphy</p>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="drawer-backdrop"
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-40"
          aria-hidden="true"
        />
      )}

      <main className="flex-grow min-h-screen">{children}</main>

      {/* Footer */}
      <footer id="main-footer" className="relative w-full border-t border-line bg-ink-2/40">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <Link to="/" className="font-display text-3xl font-light text-parchment hover:text-gold-glow transition-colors duration-300">
                Shaarts Calligraphy
              </Link>
              <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-parchment-dim">
                Bespoke Arabic calligraphy and limited-edition Islamic fine art — written as an act of dhikr, from the studio in Saudi Arabia.
              </p>
              <p className="mt-5 font-arabic text-xl text-gold/80" dir="rtl">بسم الله الرحمن الرحيم</p>
            </div>

            <nav className="md:col-span-3 md:col-start-7 flex flex-col gap-3">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-gold/70 mb-2">Index</p>
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="font-sans text-sm text-parchment-dim hover:text-parchment transition-colors duration-300 w-fit">
                  {link.name}
                </Link>
              ))}
              <Link to="/privacy" className="font-sans text-sm text-parchment-dim hover:text-parchment transition-colors duration-300 w-fit">Privacy</Link>
            </nav>

            <div className="md:col-span-3 flex flex-col gap-4">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-gold/70">Connect</p>
              <a href={`mailto:${CONFIG.EMAIL}`} className="font-sans text-sm text-parchment-dim hover:text-parchment transition-colors duration-300 w-fit">
                {CONFIG.EMAIL}
              </a>
              <SocialLinks className="flex gap-5 mt-1" />
            </div>
          </div>

          <div className="kashida mt-14 mb-6"><span className="kashida__dot" /></div>
          <p className="font-mono text-[0.62rem] tracking-[0.18em] text-parchment-dim/70">
            © 2026 SHAARTS CALLIGRAPHY — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}
