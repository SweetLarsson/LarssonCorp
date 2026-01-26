
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onBookingClick: () => void;
}

// SVG recreation of the provided Larsson Corp geometric triangle logo
const LarssonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 15L15 85H35L50 55L65 85H85L50 15ZM50 35L62 60H38L50 35Z" fillOpacity="0.2" />
    <path d="M50 10L10 90H30L50 50L70 90H90L50 10ZM50 30L65 65H35L50 30Z" />
    {/* Geometric shape reconstruction based on the provided image */}
    <path d="M50 12L12 88H32L45 62L38 62L28 82L22 82L50 26L78 82L72 82L62 62L55 62L68 88H88L50 12Z" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ onBookingClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Founder', href: '#founder' },
    { name: 'Portfolio', href: '#portfolio' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-larsson-black/80 backdrop-blur-2xl py-2 border-b border-white/5' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo with the provided icon */}
        <div className="flex items-center gap-3 group cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-9 h-9 text-white group-hover:text-larsson-accent transition-colors">
            <LarssonLogo className="w-full h-full" />
          </div>
          <span className="text-base font-display font-black tracking-tighter uppercase text-white">Larsson <span className="text-larsson-accent">Corp</span></span>
        </div>

        {/* Desktop Links (Hidden on small screens) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link-underline text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onBookingClick}
            className="px-6 py-2 bg-larsson-accent text-white hover:bg-white hover:text-larsson-black transition-all text-[9px] font-black uppercase tracking-widest rounded shadow-xl"
          >
            Initiate Project
          </button>
        </div>

        {/* Hamburger Menu Icon (Always visible on mobile/tablet) */}
        <button 
          className="lg:hidden text-white z-50 p-2 hover:text-larsson-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu: Right-aligned, translucent, right below the nav bar */}
      <div className={`lg:hidden fixed right-0 w-64 md:w-72 h-[calc(100vh-56px)] bg-black/40 backdrop-blur-2xl border-l border-white/5 transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} top-[56px] flex flex-col p-8 space-y-6 shadow-2xl`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={handleLinkClick}
            className="text-sm font-sans font-medium tracking-widest uppercase text-white/70 hover:text-larsson-accent transition-colors border-b border-white/5 pb-3"
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={() => {
            onBookingClick();
            handleLinkClick();
          }}
          className="mt-4 w-full py-4 bg-larsson-accent text-white text-[9px] font-black uppercase tracking-widest rounded shadow-2xl hover:bg-white hover:text-larsson-black transition-all"
        >
          Initiate Project
        </button>
        
        <div className="pt-10 mt-auto opacity-40">
          <p className="text-[8px] text-white uppercase tracking-[0.3em] font-black mb-3">Presence</p>
          <p className="text-[9px] text-white font-medium leading-relaxed">
            Port Harcourt, Nigeria <br/>
            Remote Worldwide
          </p>
        </div>
      </div>
      
      {/* Dimmed overlay when menu is open */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 top-[56px]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
