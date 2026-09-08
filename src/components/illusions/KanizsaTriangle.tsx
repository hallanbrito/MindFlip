import React, { useState } from 'react';

interface Props {
  pacmanRotation?: number;
  showVirtualLines?: boolean;
}

export const KanizsaTriangle: React.FC<Props> = ({
  pacmanRotation: initialRot = 0,
  showVirtualLines = false
}) => {
  const [rotation, setRotation] = useState(initialRot);
  const [showGuides, setShowGuides] = useState(showVirtualLines);

  // Top disc at (140, 50)
  // Bottom-Left disc at (60, 190)
  // Bottom-Right disc at (220, 190)

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[280px] rounded-2xl bg-[#f1f5f9] border border-slate-400 flex items-center justify-center overflow-hidden shadow-2xl">
        <svg viewBox="0 0 280 260" className="w-full h-full">
          {/* Background inverted boundary triangle (with thin dark lines) */}
          <polygon
            points="140,210 50,70 230,70"
            fill="none"
            stroke="#64748b"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Top Pac-Man disc at (140, 60), mouth pointing down (60 degrees wedge) */}
          <g transform={`translate(140, 60) rotate(${rotation})`}>
            {/* Draw 300 deg circle with 60 deg mouth opening down */}
            <path
              d="M 0,0 L 25,15 A 30,30 0 1,1 -25,15 Z"
              fill="#0f172a"
              transform="rotate(90)"
            />
          </g>

          {/* Bottom-Left Pac-Man disc at (70, 180), mouth pointing up-right */}
          <g transform={`translate(70, 180) rotate(${rotation})`}>
            <path
              d="M 0,0 L 25,15 A 30,30 0 1,1 -25,15 Z"
              fill="#0f172a"
              transform="rotate(-30)"
            />
          </g>

          {/* Bottom-Right Pac-Man disc at (210, 180), mouth pointing up-left */}
          <g transform={`translate(210, 180) rotate(${rotation})`}>
            <path
              d="M 0,0 L 25,15 A 30,30 0 1,1 -25,15 Z"
              fill="#0f172a"
              transform="rotate(-150)"
            />
          </g>

          {/* The Illusory Kanizsa Triangle sits between (140, 60), (70, 180), (210, 180) */}
          {/* Notice it has NO FILL AND NO STROKE normally, but looks brighter! */}
          {showGuides && (
            <polygon
              points="140,60 70,180 210,180"
              fill="rgba(0, 245, 212, 0.15)"
              stroke="#00f5d4"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
        </svg>

        <div className="absolute top-2.5 right-2.5 flex gap-1">
          <button
            type="button"
            onClick={() => setShowGuides(!showGuides)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              showGuides
                ? 'bg-slate-900 text-cyan-400 border-cyan-500'
                : 'bg-white/80 text-slate-800 border-slate-300 hover:bg-white'
            }`}
          >
            {showGuides ? 'Ocultar Contorno' : 'Contorno Fantasma'}
          </button>
          <button
            type="button"
            onClick={() => setRotation(r => r === 0 ? 45 : 0)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
              rotation !== 0
                ? 'bg-purple-900 text-purple-200 border-purple-500'
                : 'bg-white/80 text-slate-800 border-slate-300 hover:bg-white'
            }`}
          >
            {rotation === 0 ? 'Desalinhar' : 'Alinhar'}
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Não há nenhum triângulo desenhado na frente. Seu cérebro inventa as bordas e o brilho para fazer sentido do estímulo.
      </p>
    </div>
  );
};
