
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-larsson-black via-larsson-navy to-larsson-black opacity-95 -z-10" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="reveal">
          <span className="text-larsson-accent font-bold uppercase tracking-[0.4em] block mb-6">Our Legacy</span>
          <h2 className="text-4xl md:text-7xl font-display font-black mb-10 leading-[1.1] text-white tracking-tighter">
            Visionary Strategy. <br/>
            <span className="text-gradient">Creative Edge.</span>
          </h2>
          <div className="space-y-6 text-white/60 text-lg leading-relaxed font-medium">
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
          
          <div className="grid grid-cols-2 gap-12 border-t border-white/10 mt-12 pt-12">
            <div>
              <div className="text-5xl font-display font-black text-white mb-2">500+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-larsson-accent">Global Projects</div>
            </div>
            <div>
              <div className="text-5xl font-display font-black text-white mb-2">1.2k+</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-larsson-accent">Design Graduates</div>
            </div>
          </div>
        </div>

        <div className="relative reveal group">
          <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl bg-larsson-navy shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
              alt="Creative Strategy" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
            />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-larsson-accent/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-larsson-accent/30 -z-0 rounded-2xl" />
          
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 bg-larsson-black/80 backdrop-blur-xl p-10 border border-white/10 hidden xl:block max-w-[280px] rounded-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-larsson-accent mb-4">Our Purpose</p>
            <p className="text-lg text-white font-display font-bold leading-tight">
              Empowering brands to lead through visual distinction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
