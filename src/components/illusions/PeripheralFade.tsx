import React, { useEffect, useState } from 'react';

interface Props {
  blurAmount?: number;
  opacity?: number;
}

export const PeripheralFade: React.FC<Props> = ({
  blurAmount = 20,
  opacity = 0.6
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive) {
      interval = window.setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[300px] rounded-2xl bg-[#9ca3af] border border-slate-600 flex items-center justify-center overflow-hidden">
        {/* Peripheral colored hazy clouds */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity }}
        >
          {/* Cyan spot top-left */}
          <div
            className="absolute top-8 left-8 w-24 h-24 rounded-full bg-[#38bdf8]"
            style={{ filter: `blur(${blurAmount}px)` }}
          />
          {/* Amber spot top-right */}
          <div
            className="absolute top-8 right-8 w-24 h-24 rounded-full bg-[#fbbf24]"
            style={{ filter: `blur(${blurAmount}px)` }}
          />
          {/* Fuchsia spot bottom-left */}
          <div
            className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-[#f472b6]"
            style={{ filter: `blur(${blurAmount}px)` }}
          />
          {/* Emerald spot bottom-right */}
          <div
            className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-[#34d399]"
            style={{ filter: `blur(${blurAmount}px)` }}
          />
        </div>

        {/* Central Fixation Anchor */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-black border-2 border-white shadow-md flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-red-500" />
          </div>
          <span className="text-[10px] font-mono text-black font-bold mt-1 bg-white/70 px-1.5 py-0.5 rounded">
            FIXE AQUI
          </span>
        </div>

        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] font-mono text-white">
          Foco: {seconds}s
        </div>

        <button
          type="button"
          onClick={() => {
            setIsActive(!isActive);
            setSeconds(0);
          }}
          className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-black/60 hover:bg-black/80 text-[11px] font-mono text-white transition-colors"
        >
          {isActive ? 'Resetar' : 'Iniciar'}
        </button>

        {seconds >= 6 && (
          <div className="absolute bottom-2.5 px-3 py-1 rounded-full bg-slate-900/90 text-cyan-300 text-xs font-semibold shadow-lg animate-fade-in border border-cyan-500/40">
            As 4 manchas de cor sumiram?
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Mantenha os olhos travados no ponto central sem piscar. Em ~6 segundos a tela parecerá uniformemente cinza.
      </p>
    </div>
  );
};
