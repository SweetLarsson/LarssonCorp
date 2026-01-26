
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

  const isDark = theme === 'dark';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${scrolled || mobileMenuOpen ? (isDark ? 'bg-larsson-black/80 backdrop-blur-xl border-white/5' : 'bg-white/80 backdrop-blur-xl border-black/5') : 'bg-transparent'} py-4 border-b`}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer z-50" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className={`w-8 h-8 transition-colors ${isDark ? 'text-white group-hover:text-larsson-accent' : 'text-larsson-black group-hover:text-larsson-accent'}`}>
              <LarssonLogo className="w-full h-full" />
            </div>
            <span className={`text-sm font-black tracking-tighter uppercase transition-colors ${isDark ? 'text-white' : 'text-larsson-black'}`}>Larsson <span className="text-larsson-accent">Corp</span></span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`nav-link-underline text-[8px] font-bold tracking-[0.25em] uppercase transition-colors cursor-pointer ${isDark ? 'text-white/50 hover:text-white' : 'text-larsson-black/50 hover:text-larsson-black'}`}
              >
                {link.name}
              </button>
            ))}
            
            <div className="h-4 w-[1px] bg-larsson-accent/20 mx-2" />
            
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all hover:scale-110 active:scale-90 ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-black/5 text-larsson-black hover:bg-black/10'}`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.242 16.242l.707.707M7.758 7.758l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={onBookingClick}
              className="px-6 py-2.5 bg-larsson-accent text-white hover:bg-white hover:text-larsson-black transition-all text-[8px] font-black uppercase tracking-widest rounded-lg shadow-xl"
            >
              Initiate Project
            </button>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDark ? 'text-white' : 'text-larsson-black'}`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.242 16.242l.707.707M7.758 7.758l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <button 
              className={`z-50 p-2 transition-colors flex items-center justify-center w-10 h-10 ${isDark ? 'text-white' : 'text-larsson-black'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={`lg:hidden fixed right-6 w-64 h-auto max-h-[85vh] transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95 pointer-events-none'} top-20 flex flex-col p-6 rounded-2xl shadow-2xl z-50 ${isDark ? 'bg-larsson-black border-white/10' : 'bg-white border-black/10'}`}>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors border-b pb-3 text-left w-full ${isDark ? 'text-white/50 hover:text-larsson-accent border-white/5' : 'text-larsson-black/50 hover:text-larsson-accent border-black/5'}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                onBookingClick();
                setMobileMenuOpen(false);
              }}
              className="mt-2 w-full py-4 bg-larsson-accent text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-2xl hover:bg-larsson-black hover:text-white transition-all"
            >
              Initiate Project
            </button>
          </div>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
