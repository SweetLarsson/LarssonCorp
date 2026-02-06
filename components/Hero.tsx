
import React, { useState, useEffect } from 'react';

const words = ["brilliance", "mastery", "distinction", "precision", "authority"];

interface HeroProps {
  theme?: 'dark' | 'light';
}

const Hero: React.FC<HeroProps> = ({ theme = 'dark' }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setTimeout(() => {
      const fullWord = words[wordIndex];
      if (!isDeleting) {
        setCurrentWord(fullWord.substring(0, currentWord.length + 1));
        if (currentWord === fullWord) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setCurrentWord(fullWord.substring(0, currentWord.length - 1));
        if (currentWord === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 100 : 150);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-700 ${isDark ? 'bg-larsson-black' : 'bg-white'}`}>
      {/* AI Generated Motion Background - Ambient Forest */}
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline className={`w-full h-full object-cover transition-opacity duration-1000 ${isDark ? 'opacity-30' : 'opacity-10'}`}>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-sunlight-on-fern-leaves-in-a-forest-42862-large.mp4" type="video/mp4" />
        </video>
        <div className={`absolute inset-0 ${isDark ? 'bg-larsson-black/60' : 'bg-white/40'}`} />
      </div>

      <div className="relative z-10 text-center px-8 sm:px-12 lg:px-[20%] w-full pt-32">
        <h2 className="text-larsson-accent uppercase tracking-[0.5em] text-[10px] md:text-[12px] font-black mb-8">Visionary • Creative • Authoritative</h2>
        
        <h1 className={`text-5xl sm:text-7xl md:text-[7vw] lg:text-[6.5vw] font-black leading-[1.05] mb-12 tracking-tighter uppercase transition-colors duration-700 ${isDark ? 'text-white' : 'text-larsson-black'}`}>
          When elegance meets <br/>
          <span className="text-gradient">Creative {currentWord}</span>
        </h1>

        <p className={`text-base md:text-xl lg:text-[1.2vw] max-w-4xl mx-auto mb-16 font-light leading-relaxed text-justify-custom transition-colors duration-700 ${isDark ? 'text-white/50' : 'text-larsson-black/70'}`}>
          Larsson Corp is a creative force shaping modern media. We provide corporate polish fused with a daring creative edge, architecting the visual language of distinction.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => scrollToSection('services')}
            className={`px-12 py-6 font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl text-[10px] md:text-[11px] ${isDark ? 'bg-white text-larsson-black hover:bg-larsson-accent hover:text-white' : 'bg-larsson-black text-white hover:bg-larsson-accent'}`}
          >
            Explore Services
          </button>
          <button 
            onClick={() => scrollToSection('booking')}
            className={`px-12 py-6 border font-black uppercase tracking-widest rounded-2xl transition-all text-[10px] md:text-[11px] ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/10 text-larsson-black hover:bg-black/5'}`}
          >
            Start Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
