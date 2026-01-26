
import React from 'react';

const LarssonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 12L12 88H32L45 62L38 62L28 82L22 82L50 26L78 82L72 82L62 62L55 62L68 88H88L50 12Z" />
  </svg>
);

const MotionBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Floating Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-larsson-accent/5 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-larsson-navy/20 blur-[100px] rounded-full animate-float-delayed" />
      
      {/* Moving Geometric Icons */}
      <div className="absolute top-[15%] right-[10%] opacity-[0.03] animate-spin-slow">
        <LarssonIcon className="w-64 h-64 text-white" />
      </div>
      <div className="absolute bottom-[20%] left-[5%] opacity-[0.02] animate-float">
        <LarssonIcon className="w-96 h-96 text-white" />
      </div>
      <div className="absolute top-[60%] right-[30%] opacity-[0.05] animate-float-delayed scale-50">
        <LarssonIcon className="w-48 h-48 text-larsson-accent" />
      </div>

      {/* Subtle Noise/Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default MotionBackground;
