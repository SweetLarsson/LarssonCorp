
import React from 'react';

interface MotionBackgroundProps {
  theme?: 'dark' | 'light';
}

const MotionBackground: React.FC<MotionBackgroundProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000">
      {/* Clean base layer */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-larsson-black' : 'bg-[#F8F9FA]'}`} />
      
      {/* Subtle ambient glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] transition-all duration-1000 animate-float-slow ${
            isDark ? 'bg-larsson-accent/5' : 'bg-larsson-accent/10'
          }`} 
        />
        <div 
          className={`absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] transition-all duration-1000 animate-float-slow-reverse ${
            isDark ? 'bg-larsson-navy/20' : 'bg-blue-100/50'
          }`} 
        />
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.05); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-5%, -5%) scale(1.1); }
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MotionBackground;
