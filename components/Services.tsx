
import React, { useState } from 'react';
import { ServiceCategory } from '../types';

const categories: ServiceCategory[] = [
  {
    id: 'design',
    title: 'Graphic Design Services',
    color: 'border-larsson-accent',
    items: [
      { title: 'Brand Identity & Logo Design', description: 'Architecting authoritative visual symbols for visionary brands.' },
      { title: 'Social Media Graphics', description: 'Engagement-driven assets with cinematic edge.' },
      { title: 'Corporate & Church Designs', description: 'Professional, mission-aligned branding for institutions.' },
      { title: 'Print & Digital Media', description: 'High-end publications and digital experiences.' },
      { title: 'Motion Graphics', description: 'Daring motion assets for the modern era.' },
    ]
  },
  {
    id: 'courses',
    title: 'Graphic Design Courses',
    color: 'border-white/20',
    items: [
      { title: 'Beginner Canva Masterclass', description: 'Empowering novices with design fundamentals.' },
      { title: 'Professional Design Systems', description: 'Advanced workflows in industry-leading software.' },
      { title: 'Visual Storytelling', description: 'Mastering the art of emotional resonance.' },
      { title: 'Practical Certification', description: 'Real-world portfolios for aspiring creatives.' },
    ]
  },
  {
    id: 'consulting',
    title: 'Media Consulting',
    color: 'border-white',
    items: [
      { title: 'Brand Strategy & Positioning', description: 'Insight-driven roadmaps for market dominance.' },
      { title: 'Visual Audits', description: 'Deep-dive analysis for asset optimization.' },
      { title: 'Workflow Optimization', description: 'Strategic streamlining of creative production.' },
      { title: 'Creative Direction', description: 'Authoritative oversight for major campaigns.' },
    ]
  }
];

const Services: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('design');

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-24 reveal text-center">
        <h2 className="text-xs uppercase tracking-[0.6em] font-black text-larsson-accent mb-6">Expertise</h2>
        <h3 className="text-4xl md:text-8xl font-black mb-8 tracking-tighter text-white">Business <span className="text-larsson-accent">Units</span></h3>
        <p className="text-larsson-light/40 text-lg max-w-2xl mx-auto font-medium font-ios">
          Select a business vertical to explore our specialized solutions and creative offerings.
        </p>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.id} className="reveal group">
            <button
              onClick={() => toggle(cat.id)}
              className={`w-full flex items-center justify-between p-10 md:p-14 transition-all duration-700 border-2 rounded-3xl ${
                openId === cat.id 
                  ? 'bg-larsson-accent/5 border-larsson-accent shadow-[0_30px_60px_-15px_rgba(0,122,255,0.15)]' 
                  : 'bg-white/5 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-10">
                <span className={`text-5xl font-black opacity-10 transition-opacity group-hover:opacity-40 ${openId === cat.id ? 'text-larsson-accent opacity-50' : 'text-white'}`}>
                  {cat.id === 'design' ? '01' : cat.id === 'courses' ? '02' : '03'}
                </span>
                <h4 className={`text-xl md:text-4xl font-black uppercase tracking-tighter text-left ${openId === cat.id ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}>
                  {cat.title}
                </h4>
              </div>
              <div className={`p-3 rounded-full border-2 transition-all duration-500 ${openId === cat.id ? 'rotate-180 border-larsson-accent bg-larsson-accent text-white' : 'border-white/10 text-white/30 group-hover:border-white/40'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openId === cat.id ? 'max-h-[1200px] opacity-100 py-16' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12">
                {cat.items.map((item, i) => (
                  <div key={i} className="group p-10 border border-white/5 bg-white/[0.02] rounded-3xl hover:bg-larsson-accent/5 transition-all hover:border-larsson-accent/30">
                    <h5 className="text-xl font-bold mb-4 text-larsson-accent group-hover:text-white transition-colors">{item.title}</h5>
                    <p className="text-larsson-light/50 leading-relaxed font-medium font-ios">{item.description}</p>
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
