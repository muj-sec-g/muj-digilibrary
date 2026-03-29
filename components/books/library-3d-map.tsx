'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

interface Library3DMapProps {
  location: string | null;
}

export const Library3DMap: React.FC<Library3DMapProps> = ({ location }) => {

  // Fallback if no location is provided
  if (!location) {
    return (
      <div className="w-full h-[300px] rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200 border-dashed">
        <p className="text-sm text-slate-400">Location layout not available</p>
      </div>
    );
  }

  // Stable public Spline scene (Mini Room)
  // When you create yours, paste the link here!
  const SPLINE_SCENE = "https://prod.spline.design/ATV3Nf9uY1f8wA5Z/scene.splinecode"; 

  // We rely strictly on the native <spline-viewer> web component.
  // We use next/script to load the module.
  return (
    <>
      <Script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.9.32/build/spline-viewer.js" 
        strategy="afterInteractive" 
      />
      
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden bg-slate-900/10 border border-slate-200 shadow-inner group">
        
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-[1.02]">
          {/* @ts-ignore - custom web component */}
          <spline-viewer url={SPLINE_SCENE} loading-anim-type="spinner"></spline-viewer>
        </div>

        {/* Location Badge Overlay */}
        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md border border-orange-100 rounded-full shadow-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Target: {location}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
