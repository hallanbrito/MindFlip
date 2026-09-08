import React, { useState } from 'react';

interface Props {
  surroundSize?: number;
  showGuides?: boolean;
}

export const EbbinghausCircles: React.FC<Props> = ({
  surroundSize = 1,
  showGuides: externalGuides = false
}) => {
  const [guides, setGuides] = useState(externalGuides);
  const [overlay, setOverlay] = useState(false);

  const centerRadius = 18;
  const leftSurroundRadius = 32 * surroundSize;
  const rightSurroundRadius = 9 * surroundSize;

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[280px] rounded-2xl bg-[#090b12] border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 320 280" className="w-full h-full">
          <defs>
            <linearGradient id="ebbingOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          {/* Left Cluster (Surrounded by giant circles) */}
          <g transform={`translate(${overlay ? 160 : 85}, 140)`} className="transition-transform duration-500">
            {!overlay &&
              [0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const dist = 54;
                const cx = Math.cos(rad) * dist;
                const cy = Math.sin(rad) * dist;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={leftSurroundRadius}
                    fill="#334155"
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                );
              })}

            {/* Left Center Circle */}
            <circle
              cx={0}
              cy={0}
              r={centerRadius}
              fill="url(#ebbingOrange)"
              stroke="#fed7aa"
              strokeWidth="2"
              className="filter drop-shadow-[0_0_8px_rgba(234,88,12,0.4)]"
            />
            {!overlay && (
              <text x="0" y="32" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                Parece MENOR
              </text>
            )}
          </g>

          {/* Right Cluster (Surrounded by tiny circles) */}
          <g transform={`translate(${overlay ? 160 : 235}, 140)`} className="transition-transform duration-500">
            {!overlay &&
              [0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const dist = 32;
                const cx = Math.cos(rad) * dist;
                const cy = Math.sin(rad) * dist;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={rightSurroundRadius}
                    fill="#334155"
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                );
              })}

            {/* Right Center Circle */}
            <circle
              cx={0}
              cy={0}
              r={centerRadius}
              fill="url(#ebbingOrange)"
              stroke="#fed7aa"
              strokeWidth="2"
              opacity={overlay ? 0.6 : 1}
              className="filter drop-shadow-[0_0_8px_rgba(234,88,12,0.4)]"
            />
            {!overlay && (
              <text x="0" y="32" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="monospace">
                Parece MAIOR
              </text>
            )}
          </g>

          {/* Caliper Measurement Guides */}
          {(guides || externalGuides) && (
            <g stroke="#00f5d4" strokeWidth="1.5" strokeDasharray="3 3">
              {/* Top tangent guide */}
              <line x1="40" y1={140 - centerRadius} x2="280" y2={140 - centerRadius} />
              {/* Bottom tangent guide */}
              <line x1="40" y1={140 + centerRadius} x2="280" y2={140 + centerRadius} />
              <text x="160" y={140 - centerRadius - 6} fill="#00f5d4" fontSize="11" textAnchor="middle" fontFamily="monospace">
                Calibre Exato: 36px
              </text>
            </g>
          )}
        </svg>

        <div className="absolute top-2.5 right-2.5 flex gap-1">
          <button
            type="button"
            onClick={() => setGuides(!guides)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              guides
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {guides ? 'Ocultar Calibre' : 'Traçar Calibre'}
          </button>
          <button
            type="button"
            onClick={() => setOverlay(!overlay)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              overlay
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {overlay ? 'Separar' : 'Sobrepor'}
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Os dois círculos laranjas são rigorosamente idênticos. O tamanho dos círculos vizinhos engana sua escala.
      </p>
    </div>
  );
};
