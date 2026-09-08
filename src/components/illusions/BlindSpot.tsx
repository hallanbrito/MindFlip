import React, { useState } from 'react';

interface Props {
  targetDistance?: number;
  dotSize?: number;
}

export const BlindSpot: React.FC<Props> = ({
  targetDistance = 180,
  dotSize = 22
}) => {
  const [distance, setDistance] = useState(targetDistance);
  const [guideStep, setGuideStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[310px] h-[260px] rounded-2xl bg-[#0b0e17] border border-slate-800 flex flex-col items-center justify-center overflow-hidden p-4">
        {/* Step Guide Banner */}
        <div className="w-full bg-cyan-950/60 border border-cyan-500/30 rounded-lg p-2 mb-4 text-center">
          <p className="text-xs text-cyan-300 font-medium">
            {guideStep === 1 && '1. Cubra seu olho ESQUERDO com a mão.'}
            {guideStep === 2 && '2. Olhe FIXO para a cruz (+) com o olho direito.'}
            {guideStep === 3 && '3. Aproxime a cabeça devagar até a bolinha (•) sumir!'}
          </p>
        </div>

        {/* Experiment Stage */}
        <div className="relative w-full h-24 bg-slate-900/80 rounded-xl border border-slate-700/80 flex items-center justify-center px-4">
          {/* Left Cross Anchor (+) */}
          <div className="absolute left-8 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-cyan-500/60 flex items-center justify-center text-cyan-400 font-bold text-xl">
              +
            </div>
            <span className="text-[10px] font-mono text-cyan-400/80 mt-1">OLHE AQUI</span>
          </div>

          {/* Right Target Dot (•) placed dynamically */}
          <div
            className="absolute flex flex-col items-center transition-all duration-150"
            style={{ left: `${distance}px` }}
          >
            <div
              className="rounded-full bg-red-500 border-2 border-white shadow-lg"
              style={{ width: `${dotSize}px`, height: `${dotSize}px` }}
            />
            <span className="text-[10px] font-mono text-red-400 mt-1">ALVO</span>
          </div>
        </div>

        {/* Distance calibration slider */}
        <div className="w-full mt-4 flex items-center justify-between gap-3 px-2">
          <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">Distância Alvo</span>
          <input
            type="range"
            min={120}
            max={240}
            value={distance}
            onChange={e => setDistance(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-[11px] text-cyan-400 font-mono">{distance}px</span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            type="button"
            onClick={() => setGuideStep(s => (s % 3) + 1)}
            className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium border border-slate-700"
          >
            Próximo Passo ({guideStep}/3)
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Com o olho esquerdo tapado, foque apenas na cruz. A cerca de 25cm da tela, o alvo vermelho sumirá na papila óptica da retina.
      </p>
    </div>
  );
};
