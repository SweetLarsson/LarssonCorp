
import React from 'react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
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

const Testimonials: React.FC = () => {
  const list = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative py-40 bg-larsson-black overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-10 md:px-16 text-center mb-24 reveal">
        <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-larsson-accent mb-8">Social Proof</h2>
        <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter">Trusted by <span className="text-gradient">Leaders</span></h3>
      </div>

      <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
        {list.map((t, i) => (
          <div 
            key={i} 
            className="w-[340px] md:w-[420px] aspect-[4/5] mx-8 flex-shrink-0 bg-larsson-grey/30 p-12 md:p-16 border border-white/5 hover:border-larsson-accent transition-all duration-700 rounded-[2.5rem] flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-1.5 mb-10">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-larsson-accent text-xl">★</span>
                ))}
              </div>
              <p className="text-lg md:text-xl font-light italic text-white/80 leading-relaxed mb-12 text-justify-custom">
                "{t.content}"
              </p>
            </div>
            <div className="flex items-center gap-6 pt-10 border-t border-white/5">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full grayscale hover:grayscale-0 transition-all border border-white/10 p-1" />
              <div>
                <h4 className="font-black text-white uppercase tracking-wider text-sm">{t.name}</h4>
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
