import React, { useState } from 'react';

interface Props {
  highlight?: boolean;
}

export const NeckerCube: React.FC<Props> = ({ highlight = false }) => {
  const [internalHighlight, setInternalHighlight] = useState<'none' | 'front_left' | 'front_right'>('none');

  const activeHighlight = highlight ? 'front_left' : internalHighlight;

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[280px] h-[280px] rounded-2xl bg-gradient-to-b from-[#0e121c] to-[#090b11] border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 240 240"
          className="w-[220px] h-[220px] filter drop-shadow-[0_0_12px_rgba(0,245,212,0.15)]"
        >
          {/* Shaded helper face for active perspective */}
          {activeHighlight === 'front_left' && (
            <polygon
              points="40,90 140,90 140,190 40,190"
              fill="rgba(0, 245, 212, 0.18)"
              stroke="rgba(0, 245, 212, 0.8)"
              strokeWidth="2"
            />
          )}

          {activeHighlight === 'front_right' && (
            <polygon
              points="100,50 200,50 200,150 100,150"
              fill="rgba(121, 40, 202, 0.22)"
              stroke="rgba(121, 40, 202, 0.8)"
              strokeWidth="2"
            />
          )}

          {/* Connectors (depth edges) */}
          <line x1="40" y1="90" x2="100" y2="50" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <line x1="140" y1="90" x2="200" y2="50" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <line x1="140" y1="190" x2="200" y2="150" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="190" x2="100" y2="150" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />

          {/* Square 1 (Lower-Left face) */}
          <rect
            x="40"
            y="90"
            width="100"
            height="100"
            fill="none"
            stroke={activeHighlight === 'front_left' ? '#00f5d4' : '#e2e8f0'}
            strokeWidth={activeHighlight === 'front_left' ? 4 : 3}
            strokeLinejoin="round"
          />

          {/* Square 2 (Upper-Right face) */}
          <rect
            x="100"
            y="50"
            width="100"
            height="100"
            fill="none"
            stroke={activeHighlight === 'front_right' ? '#a855f7' : '#e2e8f0'}
            strokeWidth={activeHighlight === 'front_right' ? 4 : 3}
            strokeLinejoin="round"
          />

          {/* Corner points */}
          {[[40,90], [140,90], [140,190], [40,190], [100,50], [200,50], [200,150], [100,150]].map(([x, y], idx) => (
            <circle key={idx} cx={x} cy={y} r="4" fill="#38bdf8" />
          ))}
        </svg>

        <div className="absolute top-2.5 right-2.5 flex gap-1">
          <button
            type="button"
            onClick={() => setInternalHighlight(h => h === 'front_left' ? 'none' : 'front_left')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              activeHighlight === 'front_left'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Face A
          </button>
          <button
            type="button"
            onClick={() => setInternalHighlight(h => h === 'front_right' ? 'none' : 'front_right')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              activeHighlight === 'front_right'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            Face B
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Tente ver a Face A mais próxima de você, e depois faça a Face B saltar para frente.
      </p>
    </div>
  );
};
