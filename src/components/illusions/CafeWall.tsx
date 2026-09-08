import React, { useState } from 'react';

interface Props {
  offset?: number;
  mortarWidth?: number;
  showGuides?: boolean;
}

export const CafeWall: React.FC<Props> = ({
  offset: externalOffset = 20,
  mortarWidth = 3,
  showGuides: externalGuides = false
}) => {
  const [guides, setGuides] = useState(externalGuides);
  const [offset, setOffset] = useState(externalOffset);

  const rowOffsets = [0, offset, 0, offset, 0, offset, 0];
  const tileSize = 36;
  const numTiles = 10;

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[280px] rounded-2xl bg-[#090b12] border border-slate-800 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 300 280" className="w-full h-full">
          {/* Base background mortar color */}
          <rect x="0" y="0" width="300" height="280" fill="#6b7280" />

          {/* Staggered Rows */}
          {rowOffsets.map((shift, rowIndex) => {
            const y = 35 + rowIndex * (tileSize + mortarWidth);
            return (
              <g key={rowIndex} transform={`translate(${shift - 30}, ${y})`}>
                {Array.from({ length: numTiles }).map((_, colIndex) => (
                  <rect
                    key={colIndex}
                    x={colIndex * tileSize}
                    y={0}
                    width={tileSize}
                    height={tileSize}
                    fill={colIndex % 2 === 0 ? '#000000' : '#ffffff'}
                  />
                ))}
              </g>
            );
          })}

          {/* Mortar Lines */}
          {rowOffsets.map((_, rowIndex) => {
            const y = 35 + rowIndex * (tileSize + mortarWidth) - mortarWidth / 2;
            return (
              <line
                key={`mortar-${rowIndex}`}
                x1="0"
                y1={y}
                x2="300"
                y2={y}
                stroke={guides ? '#00f5d4' : '#6b7280'}
                strokeWidth={guides ? 2 : mortarWidth}
                strokeDasharray={guides ? '4 4' : 'none'}
              />
            );
          })}

          {/* Guide Overlay for indisputable proof */}
          {guides && (
            <g stroke="#00f5d4" strokeWidth="1.5">
              <text x="150" y="24" fill="#00f5d4" fontSize="11" textAnchor="middle" fontFamily="monospace">
                Linhas retas e 100% paralelas
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
            {guides ? 'Ocultar Guias' : 'Linhas Guias'}
          </button>
          <button
            type="button"
            onClick={() => setOffset(o => o === 0 ? 20 : 0)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              offset === 0
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {offset === 0 ? 'Desalinhar' : 'Alinhar'}
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        As linhas horizontais parecem tortas em cunha, mas são absolutamente retas e paralelas entre si.
      </p>
    </div>
  );
};
