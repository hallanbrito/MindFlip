import React, { useState } from 'react';

interface Props {
  bridgeWidth?: number;
}

export const CheckerShadow: React.FC<Props> = ({ bridgeWidth: initialBridge = 0 }) => {
  const [bridge, setBridge] = useState(initialBridge > 0);
  const [isolated, setIsolated] = useState(false);

  // Exact Adelson tile colors
  // Tile A: Light tile in direct light -> #787878 (120,120,120)
  // Tile B: Dark tile in shadow -> #787878 (120,120,120)
  // Surrounding illuminated light tiles: #b5b5b5
  // Surrounding illuminated dark tiles: #404040
  // Surrounding shadowed light tiles: #787878
  // Surrounding shadowed dark tiles: #262626

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[300px] rounded-2xl bg-[#090b11] border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 300 300" className="w-[280px] h-[280px]">
          <defs>
            {/* Soft shadow cast by the green cylinder from top right across bottom left */}
            <radialGradient id="cylinderShadow" cx="70%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#000000" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Cylinder 3D gradient */}
            <linearGradient id="cylinderBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="35%" stopColor="#10b981" />
              <stop offset="70%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <ellipse id="cylinderTop" cx="230" cy="50" rx="28" ry="12" fill="#34d399" />
          </defs>

          {/* Perspective Checkerboard */}
          <g transform="translate(150, 150) scale(1, 0.6) rotate(45) translate(-150, -150)">
            {/* 5x5 Grid */}
            {[0, 1, 2, 3, 4].map(r =>
              [0, 1, 2, 3, 4].map(c => {
                const isLight = (r + c) % 2 === 0;
                const isTileA = r === 1 && c === 2;
                const isTileB = r === 3 && c === 2;

                // Base colors before shadow
                let fill = isLight ? '#b8b8b8' : '#3d3d3d';

                // Both Tile A and Tile B are mathematically #787878
                if (isTileA || isTileB) {
                  fill = '#787878';
                }

                if (isolated) {
                  if (!isTileA && !isTileB) {
                    fill = '#111827';
                  }
                }

                return (
                  <rect
                    key={`${r}-${c}`}
                    x={c * 50 + 25}
                    y={r * 50 + 25}
                    width="50"
                    height="50"
                    fill={fill}
                    stroke="#1e293b"
                    strokeWidth="0.5"
                  />
                );
              })
            )}

            {/* Shadow Overlay */}
            {!isolated && (
              <polygon
                points="170,40 270,120 180,270 90,210"
                fill="url(#cylinderShadow)"
                opacity="0.75"
                style={{ mixBlendMode: 'multiply' }}
              />
            )}

            {/* Bridge strip connecting Tile A (r=1,c=2) and Tile B (r=3,c=2) */}
            {bridge && (
              <rect
                x="135"
                y="90"
                width="30"
                height="120"
                fill="#787878"
                stroke="#00f5d4"
                strokeWidth="1.5"
                className="transition-all duration-300 shadow-lg"
              />
            )}
          </g>

          {/* Green Cylinder Casting Shadow */}
          {!isolated && (
            <g>
              <ellipse cx="230" cy="120" rx="28" ry="12" fill="#022c22" opacity="0.6" />
              <path d="M 202,50 L 202,115 A 28 12 0 0 0 258 115 L 258,50 Z" fill="url(#cylinderBody)" />
              <ellipse cx="230" cy="50" rx="28" ry="12" fill="#34d399" />
            </g>
          )}

          {/* Labels A and B */}
          <g>
            <circle cx="150" cy="115" r="12" fill="rgba(0,0,0,0.6)" />
            <text x="150" y="120" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              A
            </text>

            <circle cx="150" cy="185" r="12" fill="rgba(0,0,0,0.6)" />
            <text x="150" y="190" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              B
            </text>
          </g>
        </svg>

        {/* Color picker confirmation pill */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded border border-slate-600 bg-[#787878]" />
            <span className="font-mono text-slate-300 text-[11px]">Cor exata: #787878</span>
          </div>
          <span className="text-[11px] font-semibold text-cyan-400">100% IDÊNTICOS</span>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={() => {
            setBridge(!bridge);
            setIsolated(false);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            bridge
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          {bridge ? 'Ocultar Ponte de Cor' : 'Ligar A e B com Ponte'}
        </button>

        <button
          type="button"
          onClick={() => {
            setIsolated(!isolated);
            setBridge(false);
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            isolated
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/60'
              : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
          }`}
        >
          {isolated ? 'Restaurar Fundo' : 'Isolar Apenas A e B'}
        </button>
      </div>
    </div>
  );
};
