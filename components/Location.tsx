
import React, { useState } from 'react';

interface LocationProps {
  theme?: 'dark' | 'light';
}

const Location: React.FC<LocationProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const address = "Port Harcourt, Nigeria";
  const coordinates = "4.8156° N, 7.0498° E";
  const DEFAULT_ZOOM = 13;
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [recenterKey, setRecenterKey] = useState(0);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 1, 19));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 1, 1));
  const handleRecenter = () => {
    setZoom(DEFAULT_ZOOM);
    setRecenterKey(prev => prev + 1); // Forces iframe refresh to center
  };

  return (
    <div className="relative py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 md:px-16 text-center mb-20 reveal">
        <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-larsson-accent mb-8">Strategic Presence</h2>
        <h3 className={`text-4xl md:text-7xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-larsson-black'}`}>Global <span className="text-gradient">Headquarters</span></h3>
        <p className={`mt-6 text-[10px] font-black tracking-[0.3em] uppercase opacity-40 ${isDark ? 'text-white' : 'text-larsson-black'}`}>
          {address} • {coordinates}
        </p>
      </div>

      <div className="relative w-full h-[500px] md:h-[600px] reveal">
        {/* The Map Embed */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            key={`map-state-${zoom}-${recenterKey}`}
            title="Larsson Corp HQ"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={`https://maps.google.com/maps?q=Port%20Harcourt%2C%20Nigeria&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`}
            style={{ 
              filter: isDark ? 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.7)' : 'grayscale(1) contrast(1.1) brightness(1.1)',
            }}
          />
        </div>

        {/* Simplified Vignette Overlay - Set to pointer-events-none to allow clicking map */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, transparent 0%, ${isDark ? '#020202' : '#F8F9FA'} 85%)`
          }}
        />

        {/* HUD UI Elements */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {/* Target Reticle */}
            <div className={`w-24 h-24 border border-larsson-accent/30 rounded-full flex items-center justify-center`}>
              <div className="w-1.5 h-1.5 bg-larsson-accent rounded-full shadow-[0_0_10px_#007AFF]" />
            </div>

            {/* Functional Map UI Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-4 pointer-events-auto">
              <button 
                onClick={handleZoomOut}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
                title="Zoom Out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4"/></svg>
              </button>

              <button 
                onClick={handleRecenter}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 flex flex-col items-center justify-center backdrop-blur-xl transition-all active:scale-95 shadow-2xl ${isDark ? 'bg-larsson-accent border-larsson-accent text-white hover:bg-white hover:text-larsson-accent hover:border-white' : 'bg-larsson-black border-larsson-black text-white hover:bg-larsson-accent hover:border-larsson-accent'}`}
                title="Recenter Headquarters"
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="text-[7px] font-black uppercase tracking-tighter">HQ</span>
              </button>

              <button 
                onClick={handleZoomIn}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center backdrop-blur-md transition-all active:scale-90 ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'}`}
                title="Zoom In"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>

            {/* Corner Markers */}
            <div className="absolute top-20 left-10 text-larsson-accent font-black text-[8px] tracking-widest uppercase hidden lg:block">
              <div className="opacity-40 animate-pulse">SYSTEM_ONLINE</div>
            </div>
            <div className="absolute bottom-20 right-10 text-right text-larsson-accent font-black text-[8px] tracking-widest uppercase hidden lg:block">
              <div className="opacity-40 animate-pulse">COORDINATES_LOCKED</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
