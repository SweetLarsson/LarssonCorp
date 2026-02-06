
import React, { useState } from 'react';
import { Testimonial } from '../types';

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, TechGrowth",
    content: "Larsson Corp didn't just give us a logo; they gave us a pulse. Our brand visibility skyrocketed beyond our projections within months.",
    avatar: "https://picsum.photos/200/200?random=1"
  },
  {
    id: 2,
    name: "Sarah King",
    role: "Lead Pastor, Zion Ministries",
    content: "The professionalism and spiritual alignment of their creative work for our summit was unmatched and inspiring to our global audience.",
    avatar: "https://picsum.photos/200/200?random=2"
  },
  {
    id: 3,
    name: "David Adeleke",
    role: "Creative Director",
    content: "Their Design Systems course changed my career trajectory. The practical projects are high-level and pure gold for real industry work.",
    avatar: "https://picsum.photos/200/200?random=3"
  },
  {
    id: 4,
    name: "Maria Uzoma",
    role: "Event Organizer",
    content: "Media consulting helped us streamline our production workflow, saving us weeks of effort and thousands in potential budget waste.",
    avatar: "https://picsum.photos/200/200?random=4"
  }
];

interface TestimonialsProps {
  theme?: 'dark' | 'light';
}

const Testimonials: React.FC<TestimonialsProps> = ({ theme = 'dark' }) => {
  const [isPaused, setIsPaused] = useState(false);
  const isDark = theme === 'dark';
  const list = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <div 
      className={`relative py-40 overflow-hidden border-y transition-colors duration-700 ${isDark ? 'bg-larsson-black border-white/5' : 'bg-white border-black/5'}`}
      onClick={() => setIsPaused(!isPaused)}
    >
      <div className="max-w-7xl mx-auto px-10 md:px-16 text-center mb-24 reveal">
        <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-larsson-accent mb-8">Social Proof</h2>
        <h3 className={`text-4xl md:text-7xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>Trusted by <span className="text-gradient">Leaders</span></h3>
        <p className={`mt-6 text-[9px] font-black tracking-[0.3em] uppercase opacity-40 ${isDark ? 'text-white' : 'text-larsson-black'}`}>
          {isPaused ? 'Click to resume movement' : 'Click to pause reading'}
        </p>
      </div>

      <div 
        className={`flex animate-marquee w-max transition-all duration-300 ${isPaused ? '[animation-play-state:paused]' : ''}`}
      >
        {list.map((t, i) => (
          <div 
            key={i} 
            className={`w-[340px] md:w-[420px] aspect-[4/5] mx-8 flex-shrink-0 p-12 md:p-16 border hover:border-larsson-accent transition-all duration-700 rounded-[2.5rem] flex flex-col justify-between ${isDark ? 'bg-larsson-grey/30 border-white/5' : 'bg-black/[0.03] border-black/5'}`}
          >
            <div>
              <div className="flex gap-1.5 mb-10">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-larsson-accent text-xl">★</span>
                ))}
              </div>
              <p className={`text-lg md:text-xl font-light italic leading-relaxed mb-12 text-justify-custom ${isDark ? 'text-white/80' : 'text-larsson-black'}`}>
                "{t.content}"
              </p>
            </div>
            <div className={`flex items-center gap-6 pt-10 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
              <img src={t.avatar} alt={t.name} className={`w-16 h-16 rounded-full grayscale hover:grayscale-0 transition-all border p-1 ${isDark ? 'border-white/10' : 'border-black/10'}`} />
              <div>
                <h4 className={`font-black uppercase tracking-wider text-sm ${isDark ? 'text-white' : 'text-larsson-black'}`}>{t.name}</h4>
                <p className="text-[9px] uppercase text-larsson-accent font-black tracking-[0.2em] mt-2">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
