
import React, { useState } from 'react';
import { PortfolioProject } from '../types';

const projects: PortfolioProject[] = [
  { id: 1, title: 'Lumina Brand Identity', category: 'Design', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800', description: 'Clean, minimal corporate branding for a tech startup seeking market distinction.' },
  { id: 2, title: 'Church Growth Summit', category: 'Events', image: 'https://images.unsplash.com/photo-1475721027187-402ad2989a38?auto=format&fit=crop&q=80&w=800', description: 'Comprehensive event branding and digital marketing assets for institutional growth.' },
  { id: 3, title: 'Art of Typography', category: 'Courses', image: 'https://images.unsplash.com/photo-1561070791-26c11d6996ad?auto=format&fit=crop&q=80&w=800', description: 'Student project showcase from our Masterclass series, demonstrating design mastery.' },
  { id: 4, title: 'Velocity Motion Assets', category: 'Motion', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', description: 'High-energy visuals for a sports streaming platform demanding fluid motion.' },
  { id: 5, title: 'The Royal Foundation', category: 'Design', image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?auto=format&fit=crop&q=80&w=800', description: 'Logo and stationery design for a non-profit organization focused on legacy and impact.' },
  { id: 6, title: 'Creative Workflow Audit', category: 'Consulting', image: 'https://images.unsplash.com/photo-1454165833767-02a6ed30cc6d?auto=format&fit=crop&q=80&w=800', description: 'Strategic analysis resulting in significant efficiency boost for creative teams.' },
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
    : projects.filter(p => p.category === filter || (filter === 'Events' && (p.category === 'Events' || p.category === 'Motion')));

  return (
    <div className="max-w-7xl mx-auto px-10 md:px-16">
      <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12 reveal">
        <div className="max-w-2xl">
          <h2 className="text-[10px] uppercase tracking-[0.5em] font-black text-larsson-accent mb-8">Our Work</h2>
          <h3 className={`text-4xl md:text-7xl font-black mb-10 tracking-tighter uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>Selected <span className="text-gradient">Works</span></h3>
          <p className={`text-lg font-light leading-relaxed text-justify-custom ${isDark ? 'text-white/40' : 'text-larsson-black'}`}>
            A curated glimpse into our portfolio of excellence and innovation. Each project represents a unique challenge met with strategic creative leadership.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 text-[9px] uppercase font-black tracking-widest transition-all rounded-full border ${
                filter === cat ? 'bg-larsson-accent border-larsson-accent text-white shadow-lg' : (isDark ? 'border-white/10 hover:border-white/30 text-white/40' : 'border-black/10 hover:border-black/30 text-larsson-black/40')
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className={`group relative overflow-hidden reveal transition-all duration-700 ease-out hover:-translate-y-4 rounded-[2rem] ${isDark ? 'bg-larsson-grey' : 'bg-white shadow-xl border border-black/5'}`}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0 group-hover:brightness-100"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-larsson-black via-larsson-black/60 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
              <span className="text-larsson-accent text-[9px] uppercase font-black tracking-[0.5em] mb-4">{project.category}</span>
              <h3 className="text-2xl font-black mb-4 tracking-tighter text-white">{project.title}</h3>
              <p className="text-xs text-white/70 mb-10 font-light leading-relaxed text-justify-custom">{project.description}</p>
              <button className="text-[9px] uppercase font-black tracking-[0.5em] flex items-center gap-4 text-larsson-accent hover:text-white transition-colors">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
