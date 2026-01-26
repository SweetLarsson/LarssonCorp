
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onBookingClick: () => void;
}

const LarssonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
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
    { name: 'Home', href: 'home' },
    { name: 'Services', href: 'services' },
    { name: 'About', href: 'about' },
    { name: 'Founder', href: 'founder' },
    { name: 'Portfolio', href: 'portfolio' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-larsson-black/98 py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-10 md:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-9 h-9 text-white group-hover:text-larsson-accent transition-colors">
            <LarssonLogo className="w-full h-full" />
          </div>
          <span className="text-base font-black tracking-tighter uppercase text-white">Larsson <span className="text-larsson-accent">Corp</span></span>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="nav-link-underline text-[10px] font-light tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={onBookingClick}
            className="px-8 py-3 bg-larsson-accent text-white hover:bg-white hover:text-larsson-black transition-all text-[9px] font-bold uppercase tracking-widest rounded shadow-xl"
          >
            Initiate Project
          </button>
        </div>

        <button 
          className="lg:hidden text-white z-50 p-2 hover:text-larsson-accent transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer - Right Side, Fit Content Height, Opaque Background */}
      <div className={`lg:hidden fixed right-6 w-72 h-auto max-h-[85vh] bg-larsson-black border border-white/10 transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'} top-24 flex flex-col p-8 rounded-3xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] z-50`}>
        <div className="flex flex-col space-y-5">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="text-sm font-light tracking-[0.2em] uppercase text-white/50 hover:text-larsson-accent transition-colors border-b border-white/5 pb-4 text-left w-full"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => {
              onBookingClick();
              setMobileMenuOpen(false);
            }}
            className="mt-4 w-full py-5 bg-larsson-accent text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-2xl hover:bg-white hover:text-larsson-black transition-all"
          >
            Initiate Project
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
