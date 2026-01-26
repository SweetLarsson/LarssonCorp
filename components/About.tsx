
import React from 'react';

interface AboutProps {
  theme?: 'dark' | 'light';
}

const About: React.FC<AboutProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative py-40 px-10 md:px-16 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br opacity-95 -z-10 ${isDark ? 'from-larsson-black via-larsson-navy to-larsson-black' : 'from-white via-[#F1F1F1] to-white'}`} />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="reveal order-2 sm:order-1">
          <span className="text-larsson-accent font-black uppercase tracking-[0.5em] block mb-8 text-[11px]">Our Legacy</span>
          <h2 className={`text-3xl md:text-7xl font-black mb-12 leading-[1.1] tracking-tighter ${isDark ? 'text-white' : 'text-larsson-black'}`}>
            Visionary Strategy. <br/>
            <span className="text-gradient">Creative Edge.</span>
          </h2>
          <div className={`space-y-8 text-base md:text-lg leading-relaxed font-light text-justify-custom ${isDark ? 'text-white/60' : 'text-larsson-black'}`}>
            <p>
              Founded with a singular vision to redefine the boundaries of visual communication, Larsson Corp emerged as a response to a market saturated with stagnant design. What began as a boutique design studio in Port Harcourt has evolved into a global authority in media and creative services.
            </p>
            <p>
              Our history is marked by strategic shifts—from purely graphic execution to comprehensive media consulting and specialized training. We have architected the visual identities of industry titans, churches, and emerging startups, always adhering to our core philosophy: *Corporate polish must never extinguish creative soul.*
            </p>
            <p>
              Today, Larsson Corp serves as a lighthouse for aspiring designers through our masterclasses and a strategic partner for businesses seeking to communicate with distinction in an increasingly noisy digital landscape.
            </p>
          </div>
          
          <div className={`grid grid-cols-2 gap-12 border-t mt-16 pt-16 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <div>
              <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tighter ${isDark ? 'text-white' : 'text-larsson-black'}`}>500+</div>
              <div className="text-[10px] uppercase tracking-[0.4em] font-black text-larsson-accent">Global Projects</div>
            </div>
            <div>
              <div className={`text-4xl md:text-5xl font-black mb-2 tracking-tighter ${isDark ? 'text-white' : 'text-larsson-black'}`}>1.2k+</div>
              <div className="text-[10px] uppercase tracking-[0.4em] font-black text-larsson-accent">Design Graduates</div>
            </div>
          </div>
        </div>

        <div className="relative reveal group order-1 sm:order-2">
          <div className={`relative z-10 aspect-[4/5] sm:aspect-auto sm:h-full md:h-[600px] overflow-hidden rounded-3xl shadow-2xl ${isDark ? 'bg-larsson-navy' : 'bg-larsson-grey'}`}>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
              alt="Creative Strategy" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
            />
          </div>
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-larsson-accent/15 blur-3xl rounded-full" />
          <div className="absolute -bottom-8 -left-8 w-full h-full border border-larsson-accent/20 -z-0 rounded-3xl" />
        </div>
      </div>
    </div>
  );
};

export default About;
