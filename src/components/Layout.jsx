import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../config';

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);

    // Track Page View with Google Analytics
    if (window.gtag && CONFIG.GOOGLE_ANALYTICS_ID && CONFIG.GOOGLE_ANALYTICS_ID !== 'G-XXXXXXXXXX') {
      window.gtag('config', CONFIG.GOOGLE_ANALYTICS_ID, {
        page_path: location.pathname,
      });
    }

    // Dynamic SEO Configuration mapping
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
    } else if (path === '/craft') {
      title = 'The Craft & Process | Shaarts Calligraphy';
      description = 'Discover the artisanal process behind luxury Arabic calligraphy, detailing traditional reed pens, hand-made soot ink, and burnished vintage paper.';
    }

    // Update document title
    document.title = title;

    // Update meta name="title"
    const metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) metaTitle.setAttribute('content', title);

    // Update meta description
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) metaDesc.setAttribute('content', description);

    // Update Open Graph (Facebook / LinkedIn) tags
    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.getElementById('og-description');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.getElementById('og-url');
    if (ogUrl) ogUrl.setAttribute('content', `${siteUrl}${path}`);

    // Update Twitter Card tags
    const twitterTitle = document.getElementById('twitter-title');
    if (twitterTitle) twitterTitle.setAttribute('content', title);

    const twitterDesc = document.getElementById('twitter-description');
    if (twitterDesc) twitterDesc.setAttribute('content', description);

    const twitterUrl = document.getElementById('twitter-url');
    if (twitterUrl) twitterUrl.setAttribute('content', `${siteUrl}${path}`);
  }, [location.pathname]);

  // Dynamic header transparency logic
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Custom Calligraphy', path: '/custom-calligraphy' },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Top Navbar */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? 'bg-surface/95 dark:bg-surface-container-lowest/95 shadow-sm py-4 border-primary/10'
            : 'bg-surface/90 dark:bg-surface-container-lowest/90 py-6 border-transparent'
        } backdrop-blur-md`}
      >
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-1 max-w-container-max mx-auto">
          {/* Logo / Brand Name */}
          <Link
            id="brand-logo"
            to="/"
            className="font-headline-md text-headline-md font-medium tracking-tighter text-primary dark:text-on-surface hover:text-secondary transition-colors duration-300"
          >
            Shaarts Calligraphy
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                id={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                to={link.path}
                className={`font-label-md text-label-md transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-secondary font-bold border-b-2 border-secondary pb-1'
                    : 'text-on-surface-variant hover:text-secondary pb-1'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Menu Button (for Mobile & Desktop Drawer) */}
          <div className="flex items-center gap-4">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-on-surface-variant hover:text-secondary transition-colors duration-300 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-primary dark:text-on-surface text-2xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Slide-out Sidebar Menu (Drawer) */}
      <div
        id="side-drawer"
        className={`fixed inset-y-0 right-0 w-full sm:w-80 bg-surface dark:bg-surface-container-lowest border-l border-primary/10 shadow-2xl z-50 transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-primary/5">
          <span className="font-headline-md text-headline-md tracking-tighter text-primary">
            Menu
          </span>
          <button
            id="close-drawer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-on-surface-variant hover:text-secondary transition-colors duration-300 focus:outline-none"
          >
            <span className="material-symbols-outlined text-primary text-2xl">close</span>
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex flex-col px-8 py-12 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              id={`drawer-link-${link.name.toLowerCase().replace(' ', '-')}`}
              to={link.path}
              className={`font-headline-md text-3xl tracking-tight transition-colors ${
                isActive(link.path) ? 'text-secondary' : 'text-primary hover:text-secondary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Drawer Footer info */}
        <div className="absolute bottom-8 left-8 right-8 text-on-surface-variant opacity-75">
          <div className="w-full h-px bg-primary/10 mb-6"></div>
          <p className="font-label-md text-xs tracking-wider mb-2">CONNECT</p>
          <div className="flex gap-4 mb-6 text-sm">
            <a href="https://www.instagram.com/shaarts_calligraphy/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors font-medium">Instagram</a>
          </div>
          <p className="font-body-md text-xs">© 2026 Shaarts Calligraphy.</p>
        </div>
      </div>

      {/* Overlay backdrop when Mobile Drawer is Open */}
      {isMobileMenuOpen && (
        <div
          id="drawer-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40 transition-opacity duration-500"
        />
      )}

      {/* Main Content Pages */}
      <main className="flex-grow pt-24 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer id="main-footer" className="w-full py-12 border-t border-primary/10 bg-surface dark:bg-surface-container-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="font-headline-md text-headline-md text-primary">
              Shaarts Calligraphy
            </Link>
            <p className="font-label-md text-label-md text-on-surface-variant text-xs md:text-sm">
              © 2026 Shaarts Calligraphy. All Rights Reserved.
            </p>
          </div>
          <div className="flex gap-8">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300" href="https://www.instagram.com/shaarts_calligraphy/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300" href="#">Privacy</a>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I am interested in inquiring about a custom Arabic calligraphy commission.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-30 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-white/10"
        style={{ borderRadius: '50%' }}
        aria-label="Inquire on WhatsApp"
        id="whatsapp-floating-button"
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.579 1.966 14.12 1.01 11.5 1.01c-5.45 0-9.88 4.379-9.884 9.822-.001 1.778.475 3.51 1.378 5.061L1.93 21.03l5.314-1.393c.002.001 0 0 0 0z" />
          <path d="M15.97 12.922c-.28-.14-1.654-.816-1.91-.908-.255-.093-.44-.139-.626.139-.185.28-.717.907-.88 1.093-.162.186-.325.21-.605.07-.28-.14-1.18-.435-2.25-1.39-.83-.74-1.39-1.655-1.55-1.93-.163-.28-.018-.431.122-.571.125-.125.28-.326.42-.489.14-.163.186-.28.28-.466.093-.186.046-.35-.023-.49-.07-.14-.626-1.507-.857-2.07-.225-.54-.452-.466-.626-.475-.162-.007-.35-.01-.537-.01-.186 0-.49.07-.746.35-.256.28-1.045 1.026-1.045 2.502 0 1.477 1.07 2.9 1.218 3.1.149.2 2.106 3.216 5.1 4.51.714.309 1.272.493 1.707.632.716.228 1.368.196 1.883.119.575-.085 1.654-.675 1.886-1.326.23-.65.23-1.21.162-1.326-.07-.11-.256-.205-.536-.346z" />
        </svg>
      </a>
    </div>
  );
}
