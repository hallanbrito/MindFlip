import React, { useState } from 'react';

interface Props {
  arrowAngle?: number;
}

export const MullerLyer: React.FC<Props> = ({ arrowAngle = 45 }) => {
  const [showRuler, setShowRuler] = useState(false);

  // Both shafts have exact length = 170px
  const startX = 65;
  const endX = 235;
  const shaftLength = endX - startX; // 170

  const finLength = 22;
  const rad = (arrowAngle * Math.PI) / 180;
  const dx = Math.cos(rad) * finLength;
  const dy = Math.sin(rad) * finLength;

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[280px] rounded-2xl bg-[#090b12] border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 300 280" className="w-full h-full">
          {/* Shaft 1 (Inward tails >—<): looks shorter */}
          <g transform="translate(0, 85)">
            <line x1={startX} y1="0" x2={endX} y2="0" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
            {/* Left fin (pointing inward) */}
            <line x1={startX} y1="0" x2={startX + dx} y2={-dy} stroke="#00f5d4" strokeWidth="3" strokeLinecap="round" />
            <line x1={startX} y1="0" x2={startX + dx} y2={dy} stroke="#00f5d4" strokeWidth="3" strokeLinecap="round" />
            {/* Right fin (pointing inward) */}
            <line x1={endX} y1="0" x2={endX - dx} y2={-dy} stroke="#00f5d4" strokeWidth="3" strokeLinecap="round" />
            <line x1={endX} y1="0" x2={endX - dx} y2={dy} stroke="#00f5d4" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Shaft 2 (Outward tails <—>): looks much longer */}
          <g transform="translate(0, 185)">
            <line x1={startX} y1="0" x2={endX} y2="0" stroke="#f8fafc" strokeWidth="3.5" strokeLinecap="round" />
            {/* Left fin (pointing outward) */}
            <line x1={startX} y1="0" x2={startX - dx} y2={-dy} stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            <line x1={startX} y1="0" x2={startX - dx} y2={dy} stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            {/* Right fin (pointing outward) */}
            <line x1={endX} y1="0" x2={endX + dx} y2={-dy} stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            <line x1={endX} y1="0" x2={endX + dx} y2={dy} stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Vertical Precision Ruler Guide Lines */}
          {showRuler && (
            <g stroke="#f59e0b" strokeWidth="1.5">
              {/* Left guide */}
              <line x1={startX} y1="45" x2={startX} y2="225" strokeDasharray="4 4" />
              {/* Right guide */}
              <line x1={endX} y1="45" x2={endX} y2="225" strokeDasharray="4 4" />

              {/* Dimension label */}
              <line x1={startX} y1="135" x2={endX} y2="135" />
              <circle cx={startX} cy="135" r="3" fill="#f59e0b" />
              <circle cx={endX} cy="135" r="3" fill="#f59e0b" />
              <rect x="115" y="125" width="70" height="20" rx="4" fill="#1e293b" />
              <text x="150" y="139" fill="#fbbf24" fontSize="11" textAnchor="middle" fontFamily="monospace">
                170 px
              </text>
            </g>
          )}
        </svg>

        <button
          type="button"
          onClick={() => setShowRuler(!showRuler)}
          className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded text-[11px] font-mono border transition-colors ${
            showRuler
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
        >
          {showRuler ? 'Ocultar Réguas' : 'Baixar Réguas'}
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        As asas abertas fazem a mente interpretar uma linha tridimensional mais profunda e distante, expandindo seu tamanho.
      </p>
    </div>
  );
};
