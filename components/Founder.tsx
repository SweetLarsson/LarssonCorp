
import React from 'react';

const Founder: React.FC = () => {
  return (
    <div className="relative py-40 px-10 md:px-16 bg-larsson-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-10 md:gap-24">
        {/* Responsive Image Container - Side by side from 'sm' breakpoint */}
        <div className="w-full sm:w-[45%] md:w-[40%] reveal">
          <div className="relative group">
            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-larsson-grey border border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200" 
                alt="Founder of Larsson Corp" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
              />
            </div>
            <div className="absolute -inset-4 border border-larsson-accent/20 rounded-[3rem] -z-10 group-hover:rotate-2 transition-transform duration-700"></div>
          </div>
        </div>
        
        <div className="w-full sm:w-[55%] md:w-[60%] reveal text-left">
          <span className="text-larsson-accent font-black uppercase tracking-[0.5em] block mb-8 text-[11px]">The Visionary</span>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-10 tracking-tighter leading-tight">
            Architect of <br/><span className="text-gradient">Distinction.</span>
          </h2>
          <div className="space-y-8 text-white/50 text-base md:text-lg leading-relaxed font-light text-justify-custom">
            <p>
              "Larsson Corp was born from a simple belief: Excellence isn't an option, it's a standard. We don't just design; we define how the world perceives the visions of our clients."
            </p>
            <p>
              As the lead Creative Director, I personally oversee our strategic partnerships, ensuring that every pixel emitted from our studio carries the weight of authority and the spark of innovation. Our mission remains clear—to empower the next generation of creatives and the current generation of leaders.
            </p>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5">
            <h4 className="text-white font-black text-2xl mb-1 tracking-tight uppercase">Utibeabasi Essien</h4>
            <p className="text-larsson-accent font-black uppercase tracking-widest text-[9px]">Founder & Lead Creative Strategist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
