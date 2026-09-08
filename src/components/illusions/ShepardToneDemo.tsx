import React, { useState, useEffect } from 'react';
import { startShepardTone, stopShepardTone } from '../../utils/audio';

export const ShepardToneDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      stopShepardTone();
    };
  }, []);

  const toggleTone = () => {
    if (isPlaying) {
      stopShepardTone();
      setIsPlaying(false);
    } else {
      const ok = startShepardTone();
      if (ok) setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[260px] rounded-2xl bg-gradient-to-b from-[#111827] to-[#0a0c13] border border-slate-800 flex flex-col items-center justify-center p-4 overflow-hidden shadow-2xl">
        {/* Animated wave spectrum */}
        <div className="flex items-center gap-1.5 h-24 mb-4">
          {[12, 28, 45, 70, 90, 65, 40, 25, 15].map((h, i) => (
            <div
              key={i}
              className={`w-3 rounded-full bg-cyan-400 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : 'opacity-30'
              }`}
              style={{
                height: isPlaying ? `${h}px` : '15px',
                animationDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={toggleTone}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
            isPlaying
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
          }`}
        >
          {isPlaying ? '⏹ Parar Ilusão Sonora' : '▶ Tocar Tom Shepard Infinito'}
        </button>

        <p className="text-[11px] text-slate-400 mt-3 text-center max-w-[240px]">
          Esta escala sonora parece subir infinitamente sem nunca atingir uma nota mais alta!
        </p>
      </div>
    </div>
  );
};
