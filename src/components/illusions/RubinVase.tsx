import React, { useState } from 'react';

interface Props {
  inverted?: boolean;
}

export const RubinVase: React.FC<Props> = ({ inverted = false }) => {
  const [focusMode, setFocusMode] = useState<'both' | 'vase' | 'faces'>('both');

  // SVG path creating the classic profile silhouette on both sides
  // Left profile outline
  const leftProfile = "M 30,20 C 60,20 80,30 80,50 C 80,65 65,70 65,80 C 65,90 75,95 85,100 C 95,105 85,115 70,120 C 65,123 60,130 65,140 C 70,150 85,155 85,165 C 85,180 65,190 30,200 Z";
  // Right profile outline (mirrored across center x=120)
  const rightProfile = "M 210,20 C 180,20 160,30 160,50 C 160,65 175,70 175,80 C 175,90 165,95 155,100 C 145,105 155,115 170,120 C 175,123 180,130 175,140 C 170,150 155,155 155,165 C 155,180 175,190 210,200 Z";

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[280px] h-[280px] rounded-2xl bg-[#0a0c13] border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 240 220" className="w-[240px] h-[220px]">
          {/* Background: If focusing vase, subtle glow */}
          <rect
            x="0"
            y="0"
            width="240"
            height="220"
            fill={focusMode === 'vase' ? '#0d1322' : (inverted ? '#ffffff' : '#090a10')}
          />

          {/* Left Profile Silhouette */}
          <path
            d={leftProfile}
            fill={focusMode === 'faces' ? '#00f5d4' : (inverted ? '#090a10' : '#e2e8f0')}
            className="transition-colors duration-300"
          />

          {/* Right Profile Silhouette */}
          <path
            d={rightProfile}
            fill={focusMode === 'faces' ? '#00f5d4' : (inverted ? '#090a10' : '#e2e8f0')}
            className="transition-colors duration-300"
          />

          {/* Base and rim borders to clarify vase structure */}
          <ellipse cx="120" cy="20" rx="40" ry="6" fill={focusMode === 'vase' ? '#38bdf8' : '#64748b'} opacity="0.3" />
          <ellipse cx="120" cy="200" rx="55" ry="8" fill={focusMode === 'vase' ? '#38bdf8' : '#64748b'} opacity="0.3" />
        </svg>

        <div className="absolute top-2.5 right-2.5 flex gap-1">
          <button
            type="button"
            onClick={() => setFocusMode(m => m === 'vase' ? 'both' : 'vase')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              focusMode === 'vase'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Focar Vaso
          </button>
          <button
            type="button"
            onClick={() => setFocusMode(m => m === 'faces' ? 'both' : 'faces')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              focusMode === 'faces'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Focar Rostos
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Seu cérebro alterna entre atribuir a borda ao vaso ou aos rostos.
      </p>
    </div>
  );
};
