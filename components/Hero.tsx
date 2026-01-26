
import React, { useState, useEffect, useRef } from 'react';

const words = ["brilliance", "mastery", "distinction", "precision", "authority", "craftsmanship", "leadership"];

const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Typing Effect
  useEffect(() => {
    const handleType = () => {
      const fullWord = words[wordIndex];
      
      if (!isDeleting) {
        setCurrentWord(fullWord.substring(0, currentWord.length + 1));
        if (currentWord === fullWord) {
          setTimeout(() => setIsDeleting(true), 2000);
          setTypeSpeed(150);
        }
      } else {
        setCurrentWord(fullWord.substring(0, currentWord.length - 1));
        if (currentWord === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
        setTypeSpeed(100);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentWord, isDeleting, wordIndex, typeSpeed]);

  // Mouse Movement Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20; 
      const y = (clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-larsson-black">
      {/* Blurred Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover scale-110 blur-3xl opacity-30 grayscale"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-geometric-design-background-302-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-larsson-black/40" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out opacity-20"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] border-[1px] border-larsson-accent/20 rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-larsson-accent/10 blur-[180px] rounded-full" />
        </div>
      </div>

      {/* Tighter top padding: from pt-20/pt-28 to pt-12/pt-16 */}
      <div className="relative z-10 text-center px-6 max-w-6xl pt-12 pb-20 md:pt-16 md:pb-24">
        <h2 className="text-larsson-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 animate-fade-in-down">
          Visionary • Creative • Authoritative
        </h2>
        
        <h1 className="text-3xl sm:text-5xl md:text-[6rem] font-display font-black leading-[0.95] mb-10 tracking-tighter">
          <span className="text-white">When elegance </span> <br className="hidden md:block"/> 
          <span className="text-white">meets </span> 
          <span className="text-gradient">Creative </span> <br className="hidden md:block"/>
          <span className="text-larsson-accent inline-block min-w-[180px] border-r-4 border-white pr-2 transition-all">{currentWord}</span>
        </h1>

        <p className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto mb-12 font-medium leading-relaxed tracking-tight">
          Larsson Corp is a creative force shaping modern media. We provide corporate polish 
          fused with a daring creative edge.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 reveal">
          <button 
            onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}
            className="group relative px-8 py-3.5 md:px-10 md:py-4 bg-white text-larsson-black font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl rounded w-full sm:w-auto text-[10px]"
          >
            <span className="relative z-10">Explore Services</span>
            <div className="absolute inset-0 bg-larsson-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-10" />
          </button>
          <button 
             onClick={() => document.getElementById('booking')?.scrollIntoView({behavior:'smooth'})}
             className="px-8 py-3.5 md:px-10 md:py-4 border border-white/10 text-white bg-white/5 hover:bg-larsson-accent hover:border-larsson-accent transition-all font-bold uppercase tracking-widest shadow-2xl rounded w-full sm:w-auto text-[10px]"
          >
            Start Project
          </button>
        </div>
      </div>

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer opacity-20 hover:opacity-100 transition-opacity" 
        onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}
      >
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-larsson-accent to-transparent animate-[scroll-line_2.5s_infinite]" />
      </div>

      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-line {
          0% { transform: scaleY(0); transform-origin: top; }
          40% { transform: scaleY(1); transform-origin: top; }
          60% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default Hero;
