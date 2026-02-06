
import React from 'react';

interface AboutProps {
  theme?: 'dark' | 'light';
}

const About: React.FC<AboutProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative py-40 px-10 md:px-16 overflow-hidden">
      {/* Compelling Ultra Sound Wave Motion */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover grayscale brightness-50">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-waves-of-moving-particles-in-blue-24959-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-larsson-accent/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center relative z-10">
        <div className="reveal">
          <span className="text-larsson-accent font-black uppercase tracking-[0.5em] block mb-8 text-[11px]">Visionary Strategy</span>
          <h2 className={`text-3xl md:text-7xl font-black mb-12 leading-[1.1] tracking-tighter uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>
            Strategic <br/>
            <span className="text-gradient">Moves.</span>
          </h2>
          <div className={`space-y-8 text-base md:text-lg leading-relaxed font-light text-justify-custom ${isDark ? 'text-white/60' : 'text-larsson-black/70'}`}>
            <p>We redefine visual communication through deep-rooted strategic analysis. Every pixel is a calculated move toward market distinction.</p>
            <p>Our history is marked by strategic shifts—from execution to comprehensive media consulting. We architect the visual identities of industry titans.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-10 mt-16 pt-16 border-t border-white/10">
            {[
              { val: '500+', label: 'Global Projects' },
              { val: '1.2k+', label: 'Design Graduates' },
              { val: '50+', label: 'Brand Identities' },
              { val: '15+', label: 'Global Partners' }
            ].map((stat, i) => (
              <div key={i}>
                <div className={`text-4xl md:text-5xl font-black mb-1 tracking-tighter ${isDark ? 'text-white' : 'text-larsson-black'}`}>{stat.val}</div>
                <div className="text-[9px] uppercase tracking-[0.3em] font-black text-larsson-accent">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative reveal group">
          <div className={`relative z-10 aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl ${isDark ? 'bg-larsson-grey' : 'bg-white'}`}>
            <img 
              src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&q=80&w=1200" 
              alt="Strategic Chess Move" 
              className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-larsson-black/80 to-transparent" />
          </div>
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-larsson-accent/20 blur-[100px] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default About;
