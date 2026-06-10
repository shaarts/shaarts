import { useState, useEffect } from 'react';
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
            onClick={() => setIsMobileMenuOpen(false)}
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
              onClick={() => setIsMobileMenuOpen(false)}
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
            <span className="text-primary/20">•</span>
            <a href={CONFIG.FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors font-medium">Facebook</a>
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
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300" href={CONFIG.FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors duration-300" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
