
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
      {/* Floating Randomly Flying Logos - Blurred */}
      <div className={`absolute top-[15%] left-[10%] animate-float opacity-[0.03] transition-colors duration-700 ${isDark ? 'text-white' : 'text-larsson-black'}`}>
        <LarssonIcon className="w-64 h-64 blur-2xl rotate-12" />
      </div>
      <div className={`absolute bottom-[20%] right-[10%] animate-float-delayed opacity-[0.02] transition-colors duration-700 ${isDark ? 'text-white' : 'text-larsson-black'}`}>
        <LarssonIcon className="w-80 h-80 blur-[80px] -rotate-45" />
      </div>

      {/* Sound Waves Moving L to R */}
      <div className="absolute top-1/2 left-0 w-full h-[300px] -translate-y-1/2 opacity-[0.05] flex items-center">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-larsson-accent to-transparent animate-wave" />
        <div className="absolute top-10 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent animate-wave opacity-50" style={{ animationDelay: '1s' }} />
      </div>

      {/* Light Globs */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] blur-[150px] rounded-full transition-all duration-1000 ${isDark ? 'bg-larsson-accent/10' : 'bg-larsson-accent/15'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] blur-[120px] rounded-full transition-all duration-1000 ${isDark ? 'bg-larsson-navy/20' : 'bg-larsson-accent/5'}`} />
    </div>
  );
};

export default MotionBackground;
