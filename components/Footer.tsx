
import React from 'react';

const LarssonLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 12L12 88H32L45 62L38 62L28 82L22 82L50 26L78 82L72 82L62 62L55 62L68 88H88L50 12Z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-larsson-black border-t border-white/5 pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 text-larsson-accent group-hover:text-white transition-colors">
              <LarssonLogo className="w-full h-full" />
            </div>
            <span className="text-xl font-display font-black tracking-tighter uppercase text-white">Larsson <span className="text-larsson-accent">Corp</span></span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
            The creative authority for brands that demand distinction. Visionary media solutions designed for the future of global commerce.
          </p>
          <div className="flex gap-4">
            {/* Social Icons */}
            <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 rounded-lg flex items-center justify-center text-white/50 hover:bg-larsson-accent hover:text-white transition-all" title="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c.796 0 1.441.645 1.441 1.44s-.645 1.44-1.441 1.44c-.795 0-1.439-.645-1.439-1.44s.644-1.44 1.439-1.44z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 rounded-lg flex items-center justify-center text-white/50 hover:bg-larsson-accent hover:text-white transition-all" title="X (Twitter)">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 border border-white/10 bg-white/5 rounded-lg flex items-center justify-center text-white/50 hover:bg-larsson-accent hover:text-white transition-all" title="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.91 1.777-4.496 4.375-4.496 1.244 0 2.313.092 2.624.134v3.042l-1.802.001c-1.412 0-1.686.671-1.686 1.656v2.174h3.368l-.439 3.403h-2.929v8.74h6.088c.731 0 1.325-.593 1.325-1.324v-21.351c0-.732-.594-1.325-1.325-1.325z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Navigation</h4>
          <ul className="space-y-4 text-white/40 text-xs font-medium">
            <li><a href="#home" className="hover:text-larsson-accent transition-colors">Home</a></li>
            <li><a href="#services" className="hover:text-larsson-accent transition-colors">Services</a></li>
            <li><a href="#about" className="hover:text-larsson-accent transition-colors">Vision</a></li>
            <li><a href="#founder" className="hover:text-larsson-accent transition-colors">Founder</a></li>
            <li><a href="#portfolio" className="hover:text-larsson-accent transition-colors">Portfolio</a></li>
            <li><a href="#booking" className="hover:text-larsson-accent transition-colors">Start Project</a></li>
          </ul>
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Presence</h4>
          <ul className="space-y-6 text-white/50 text-sm font-normal tracking-tight">
            <li className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-full bg-larsson-accent/10 flex items-center justify-center text-larsson-accent">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <span className="group-hover:text-white transition-colors">larssoncorporation@gmail.com</span>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-full bg-larsson-accent/10 flex items-center justify-center text-larsson-accent">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <span className="group-hover:text-white transition-colors">+234 806 459 9545</span>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="w-8 h-8 rounded-full bg-larsson-accent/10 flex items-center justify-center text-larsson-accent">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <span className="group-hover:text-white transition-colors leading-tight">Port Harcourt, Nigeria | Remote Worldwide</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Newsletter</h4>
          <p className="text-white/30 text-xs mb-6 font-medium">Get our strategic design insights.</p>
          <div className="flex flex-col gap-2.5">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[10px] font-bold uppercase tracking-widest focus:border-larsson-accent outline-none text-white transition-all"
            />
            <button className="bg-white text-larsson-black px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-larsson-accent hover:text-white transition-all">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
          &copy; {new Date().getFullYear()} Larsson Corporation.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-white/20">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
