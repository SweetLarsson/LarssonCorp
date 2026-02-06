
import React, { useState } from 'react';
import { PortfolioProject } from '../types';

const projects: PortfolioProject[] = [
  { 
    id: 1, 
    title: 'Teehub Digital Brand', 
    category: 'Design', 
    image: 'https://images.unsplash.com/photo-1621244290494-0130a2109964?auto=format&fit=crop&q=80&w=1200', 
    description: 'A comprehensive digital ecosystem branding for a leading technology aggregator.' 
  },
  { 
    id: 2, 
    title: 'Church Growth Summit', 
    category: 'Events', 
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&q=80&w=1200', 
    description: 'Event branding and digital marketing assets for global institutional engagement.' 
  },
  { 
    id: 3, 
    title: 'Art of Typography', 
    category: 'Courses', 
    image: 'https://images.unsplash.com/photo-1516962080544-eac695c93791?auto=format&fit=crop&q=80&w=1200', 
    description: 'Mastering spatial awareness through professional-grade font architecture.' 
  },
  { 
    id: 4, 
    title: 'Velocity Motion Assets', 
    category: 'Motion', 
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200', 
    description: 'High-energy visuals for cinematic transitions and digital streaming platforms.' 
  },
  { 
    id: 5, 
    title: 'The Royal Foundation', 
    category: 'Design', 
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200', 
    description: 'Logo and stationery design for a legacy non-profit organization.' 
  },
  { 
    id: 6, 
    title: 'Creative Workflow Audit', 
    category: 'Consulting', 
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200', 
    description: 'Strategic analysis and process restructuring for creative team efficiency.' 
  },
];

interface PortfolioProps {
  theme?: 'dark' | 'light';
}

const Portfolio: React.FC<PortfolioProps> = ({ theme = 'dark' }) => {
  const [filter, setFilter] = useState('All');
  const isDark = theme === 'dark';
  const categories = ['All', 'Design', 'Courses', 'Consulting', 'Events'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-10 md:px-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12 reveal">
        <div className="max-w-2xl">
          <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-larsson-accent mb-8">Selected Portfolio</h2>
          <h3 className={`text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>Our <span className="text-gradient">Work</span></h3>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 text-[9px] uppercase font-black tracking-widest transition-all rounded-full border ${
                filter === cat ? 'bg-larsson-accent border-larsson-accent text-white shadow-lg' : (isDark ? 'border-white/10 text-white/40' : 'border-black/10 text-larsson-black/40')
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group relative overflow-hidden reveal rounded-[2rem] shadow-xl">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-larsson-black via-larsson-black/60 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
              <span className="text-larsson-accent text-[9px] uppercase font-black tracking-widest mb-4">{project.category}</span>
              <h3 className="text-2xl font-black mb-4 text-white uppercase">{project.title}</h3>
              <p className="text-xs text-white/70 mb-10 font-light leading-relaxed">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
