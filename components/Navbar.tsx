
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onBookingClick: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const LarssonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 12L12 88H32L45 62L38 62L28 82L22 82L50 26L78 82L72 82L62 62L55 62L68 88H88L50 12Z" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ onBookingClick, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

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
    { name: 'Contact', href: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Click-outside Overlay for Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[55] bg-transparent cursor-default md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="fixed top-0 left-0 w-full z-[60] pt-6 px-4 flex justify-center pointer-events-none">
        <nav className={`pointer-events-auto transition-all duration-700 ease-in-out rounded-[1.5rem] border overflow-visible max-w-4xl w-full flex items-center justify-between px-6 md:px-8 py-3 shadow-2xl relative ${
          isDark 
          ? 'bg-gradient-to-r from-larsson-black/80 via-larsson-grey/80 to-larsson-black/80 backdrop-blur-xl border-white/10' 
          : 'bg-gradient-to-r from-white/90 via-[#E5E5E5]/90 to-white/90 backdrop-blur-xl border-black/5'
        } ${scrolled ? 'translate-y-0 scale-95' : 'translate-y-2'}`}>
          
          {/* Silver/White Transition Light Stroke */}
          <div className={`absolute inset-0 pointer-events-none opacity-30 border-[1px] rounded-[1.5rem] ${isDark ? 'border-white/40' : 'border-black/10'}`} />

          <div className="flex items-center gap-3 group cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`w-6 h-6 transition-colors ${isDark ? 'text-white' : 'text-larsson-black'}`}>
              <LarssonLogo className="w-full h-full" />
            </div>
            <span className={`text-[10px] font-black tracking-widest uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>Larsson <span className="text-larsson-accent">Corp</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`text-[10px] font-bold tracking-tight transition-all hover:text-larsson-accent ${isDark ? 'text-white/60' : 'text-larsson-black/60'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4 z-50">
            <button onClick={toggleTheme} className={`p-1.5 rounded-full transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-larsson-black hover:bg-black/5'}`}>
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.242 16.242l.707.707M7.758 7.758l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              )}
            </button>
            
            <button
              onClick={onBookingClick}
              className="hidden sm:block px-6 py-2 bg-larsson-accent text-white hover:bg-white hover:text-larsson-black transition-all text-[9px] font-black uppercase tracking-widest rounded-lg shadow-lg"
            >
              Initiate
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1.5 rounded-full transition-colors ${isDark ? 'text-white hover:bg-white/10' : 'text-larsson-black hover:bg-black/5'}`}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/></svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Dialog - Width 35%, Dynamic Height, Capped at 50px bottom */}
          <div 
            style={{ 
              maxHeight: mobileMenuOpen ? 'calc(100vh - 150px)' : '0',
              width: 'calc(max(280px, 35vw))',
              right: 0,
              overflowY: 'auto'
            }}
            className={`absolute top-full mt-4 transition-all duration-500 ease-in-out z-40 rounded-[2.5rem] shadow-3xl md:hidden scrollbar-hide ${
              mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            } ${isDark ? 'bg-larsson-grey/95 border border-white/10' : 'bg-white/95 border border-black/10'} backdrop-blur-2xl`}
          >
            <div className="p-10 flex flex-col">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`block w-full text-left text-base font-bold tracking-tight transition-all border-b pb-4 ${isDark ? 'text-white/60 border-white/5 hover:text-larsson-accent' : 'text-larsson-black/60 border-black/5 hover:text-larsson-accent'}`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  onBookingClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-larsson-accent text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] mt-8 shadow-lg shadow-larsson-accent/30 hover:scale-105 active:scale-95 transition-all"
              >
                Start Project
              </button>
            </div>
          </div>
        </nav>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Navbar;
