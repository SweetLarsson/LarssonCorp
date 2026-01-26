
import React from 'react';

const LarssonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 12L12 88H32L45 62L38 62L28 82L22 82L50 26L78 82L72 82L62 62L55 62L68 88H88L50 12Z" />
  </svg>
);

interface MotionBackgroundProps {
  theme?: 'dark' | 'light';
}

const MotionBackground: React.FC<MotionBackgroundProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-700">
      {/* Dynamic Grid */}
      <div className={`absolute inset-0 grid-bg transition-opacity duration-700 ${isDark ? 'opacity-40' : 'opacity-10'}`} />
      
      {/* Floating Blobs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] blur-[120px] rounded-full animate-float transition-all duration-1000 ${isDark ? 'bg-larsson-accent/5' : 'bg-larsson-accent/10'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] blur-[100px] rounded-full animate-float-delayed transition-all duration-1000 ${isDark ? 'bg-larsson-navy/20' : 'bg-larsson-accent/5'}`} />
      
      {/* Moving Geometric Icons */}
      <div className={`absolute top-[15%] right-[10%] animate-spin-slow transition-opacity duration-700 ${isDark ? 'opacity-[0.03] text-white' : 'opacity-[0.05] text-larsson-black'}`}>
        <LarssonIcon className="w-64 h-64" />
      </div>
      <div className={`absolute bottom-[20%] left-[5%] animate-float transition-opacity duration-700 ${isDark ? 'opacity-[0.02] text-white' : 'opacity-[0.04] text-larsson-black'}`}>
        <LarssonIcon className="w-96 h-96" />
      </div>
      <div className={`absolute top-[60%] right-[30%] animate-float-delayed scale-50 transition-opacity duration-700 ${isDark ? 'opacity-[0.05]' : 'opacity-[0.1]'}`}>
        <LarssonIcon className="w-48 h-48 text-larsson-accent" />
      </div>

      {/* Subtle Noise/Overlay */}
      <div className={`absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-700 ${!isDark && 'opacity-[0.05]'}`} />
    </div>
  );
};

export default MotionBackground;
