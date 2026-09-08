import React, { useState } from 'react';

interface Props {
  gridSize?: number;
  gutterWidth?: number;
}

export const HermannGrid: React.FC<Props> = ({
  gridSize = 4,
  gutterWidth = 14
}) => {
  const [size, setSize] = useState(gridSize);
  const [invert, setInvert] = useState(false);

  // Total container size: 280 x 280
  const containerSize = 270;
  const squareSize = (containerSize - (size - 1) * gutterWidth) / size;

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div
        className="relative w-[300px] h-[300px] rounded-2xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl p-4 transition-colors"
        style={{ backgroundColor: invert ? '#000000' : '#ffffff' }}
      >
        <div
          className="grid gap-x-3 gap-y-3"
          style={{
            gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            width: `${containerSize}px`,
            height: `${containerSize}px`,
            gap: `${gutterWidth}px`
          }}
        >
          {Array.from({ length: size * size }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-full transition-colors"
              style={{
                backgroundColor: invert ? '#ffffff' : '#090a0f',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>

        <div className="absolute top-2.5 right-2.5 flex gap-1">
          <button
            type="button"
            onClick={() => setInvert(!invert)}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/70 border border-white/20 text-white hover:bg-black"
          >
            {invert ? 'Fundo Branco' : 'Inverter'}
          </button>
          <button
            type="button"
            onClick={() => setSize(s => s === 4 ? 5 : 4)}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/70 border border-white/20 text-white hover:bg-black"
          >
            {size}x{size}
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Note as manchas cinzas piscando nas encruzilhadas brancas. Quando você foca diretamente em uma, ela some na hora!
      </p>
    </div>
  );
};
