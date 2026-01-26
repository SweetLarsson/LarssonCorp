
import React, { useState } from 'react';
import { ServiceCategory } from '../types';

const categories: ServiceCategory[] = [
  {
    id: 'design',
    title: 'Graphic Design Services',
    color: 'border-larsson-accent',
    items: [
      { title: 'Brand Identity & Logo Design', description: 'Architecting authoritative visual symbols for visionary brands. We focus on longevity and recognition through deep strategic analysis.' },
      { title: 'Social Media Graphics', description: 'Engagement-driven assets with cinematic edge designed for maximum conversion and brand presence across global networks.' },
      { title: 'Corporate & Church Designs', description: 'Professional, mission-aligned branding that communicates authority and inspires your community to act with purpose.' },
      { title: 'Print & Digital Media', description: 'High-end publications and digital experiences that bridged the gap between physical and digital touchpoints seamlessly.' },
      { title: 'Motion Graphics', description: 'Daring motion assets for the modern era, bringing static designs to life with fluid visual storytelling and impact.' },
    ]
  },
  {
    id: 'courses',
    title: 'Graphic Design Courses',
    color: 'border-white/20',
    items: [
      { title: 'Beginner Canva Masterclass', description: 'Empowering novices with design fundamentals and effective tool mastery for immediate professional impact.' },
      { title: 'Professional Design Systems', description: 'Advanced workflows in industry-leading software for those seeking to master corporate-grade assets and workflows.' },
      { title: 'Visual Storytelling', description: 'Mastering the art of emotional resonance through color, composition, and psychological triggers in every frame.' },
      { title: 'Practical Certification', description: 'Real-world portfolio building for aspiring creatives ready to enter the professional arena with total confidence.' },
    ]
  },
  {
    id: 'consulting',
    title: 'Media Consulting',
    color: 'border-white',
    items: [
      { title: 'Brand Strategy & Positioning', description: 'Insight-driven roadmaps for market dominance. We help you find your unique space in the creative ecosystem.' },
      { title: 'Visual Audits', description: 'Deep-dive analysis for asset optimization, ensuring every brand touchpoint is working at maximum efficiency.' },
      { title: 'Workflow Optimization', description: 'Strategic streamlining of creative production to reduce waste and maximize output quality and speed.' },
      { title: 'Creative Direction', description: 'Authoritative oversight for major campaigns, events, and institutional transformations on a global scale.' },
    ]
  }
];

const Services: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('design');

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <div className="max-w-7xl mx-auto px-10 md:px-16">
      <div className="mb-24 reveal text-center">
        <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-larsson-accent mb-8">Expertise</h2>
        <h3 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter text-white uppercase">Business <span className="text-larsson-accent">Units</span></h3>
        <p className="text-white/40 text-base md:text-lg max-w-3xl mx-auto font-light text-justify-custom leading-relaxed">
          Select a business vertical to explore our specialized solutions and creative offerings. Each unit is built on the pillar of distinction, visionary growth, and corporate excellence.
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.id} className="reveal group">
            <button
              onClick={() => toggle(cat.id)}
              className={`w-full flex items-center justify-between p-8 md:p-14 transition-all duration-700 border rounded-[2.5rem] ${
                openId === cat.id 
                  ? 'bg-larsson-accent/5 border-larsson-accent/30 shadow-2xl' 
                  : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className={`text-2xl md:text-5xl font-black opacity-10 transition-opacity group-hover:opacity-40 ${openId === cat.id ? 'text-larsson-accent opacity-50' : 'text-white'}`}>
                  {cat.id === 'design' ? '01' : cat.id === 'courses' ? '02' : '03'}
                </span>
                <h4 className={`text-lg md:text-3xl font-black uppercase tracking-tighter text-left leading-tight ${openId === cat.id ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                  {cat.title}
                </h4>
              </div>
              <div className={`p-2.5 rounded-full border transition-all duration-500 ${openId === cat.id ? 'rotate-180 border-larsson-accent bg-larsson-accent text-white' : 'border-white/10 text-white/30 group-hover:border-white/40'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openId === cat.id ? 'max-h-[1500px] opacity-100 pt-10 pb-16 md:py-16' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 px-4 md:px-12">
                {cat.items.map((item, i) => (
                  <div key={i} className="group p-8 md:p-10 border border-white/5 bg-white/[0.03] rounded-[2rem] hover:bg-larsson-accent/5 transition-all hover:border-larsson-accent/20">
                    <h5 className="text-xl font-bold mb-4 text-white tracking-tight group-hover:text-larsson-accent transition-colors uppercase">{item.title}</h5>
                    <p className="text-white/50 leading-relaxed font-light text-justify-custom text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
