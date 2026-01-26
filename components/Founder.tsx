
import React from 'react';

const Founder: React.FC = () => {
  return (
    <div className="relative py-32 px-6 bg-larsson-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 reveal">
          <div className="relative group">
            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-[4rem] bg-larsson-grey border border-white/5 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200" 
                alt="Founder of Larsson Corp" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
              />
            </div>
            <div className="absolute -inset-4 border border-larsson-accent/30 rounded-[4.5rem] -z-10 group-hover:rotate-3 transition-transform duration-700"></div>
          </div>
        </div>
        
        <div className="lg:w-1/2 reveal">
          <span className="text-larsson-accent font-bold uppercase tracking-[0.4em] block mb-6">The Visionary</span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter">
            Architect of <br/><span className="text-gradient">Distinction.</span>
          </h2>
          <div className="space-y-6 text-white/50 text-lg leading-relaxed font-medium">
            <p>
              "Larsson Corp was born from a simple belief: Excellence isn't an option, it's a standard. We don't just design; we define how the world perceives the visions of our clients."
            </p>
            <p>
              As the lead Creative Director, I personally oversee our strategic partnerships, ensuring that every pixel emitted from our studio carries the weight of authority and the spark of innovation. Our mission remains clear—to empower the next generation of creatives and the current generation of leaders.
            </p>
          </div>
          <div className="mt-12">
            <h4 className="text-white font-display font-black text-2xl mb-1 tracking-tight">Adeola Larsson</h4>
            <p className="text-larsson-accent font-bold uppercase tracking-widest text-[10px]">Founder & Lead Creative Strategist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
