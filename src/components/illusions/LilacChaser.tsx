import React, { useEffect, useState } from 'react';

interface Props {
  speed?: number;
  reducedMotion?: boolean;
}

export const LilacChaser: React.FC<Props> = ({ speed = 120, reducedMotion = false }) => {
  const [activeGapIndex, setActiveGapIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [secondsFocused, setSecondsFocused] = useState(0);

  const numDots = 12;
  const radius = 95;
  const dotRadius = 14;

  useEffect(() => {
    if (!isRunning || reducedMotion) return;

    const interval = setInterval(() => {
      setActiveGapIndex(prev => (prev + 1) % numDots);
    }, speed);

    return () => clearInterval(interval);
  }, [isRunning, speed, reducedMotion, numDots]);

  useEffect(() => {
    let focusTimer: number;
    if (isRunning && !reducedMotion) {
      focusTimer = window.setInterval(() => {
        setSecondsFocused(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(focusTimer);
  }, [isRunning, reducedMotion]);

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[300px] rounded-2xl bg-[#bfbfbf] border border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          {/* 12 Lilac/Magenta circles in a ring */}
          {Array.from({ length: numDots }).map((_, i) => {
            const angle = (i * (360 / numDots) * Math.PI) / 180;
            const cx = 150 + Math.cos(angle) * radius;
            const cy = 150 + Math.sin(angle) * radius;
            const isHidden = isRunning && i === activeGapIndex;

            if (isHidden) return null;

            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={dotRadius}
                fill="#d946ef"
                opacity="0.8"
                style={{
                  filter: 'blur(3px)'
                }}
              />
            );
          })}

          {/* Central Black Fixation Cross */}
          <g stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round">
            <line x1="142" y1="150" x2="158" y2="150" />
            <line x1="150" y1="142" x2="150" y2="158" />
          </g>
        </svg>

        {/* Live focus timer indicator */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm text-[11px] font-mono text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          <span>Foco: {secondsFocused}s</span>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsRunning(!isRunning);
            setSecondsFocused(0);
          }}
          className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-black/60 hover:bg-black/80 text-[11px] font-mono text-white transition-colors"
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>

        {secondsFocused >= 8 && (
          <div className="absolute bottom-2.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-fade-in shadow-lg">
            ✨ Os círculos sumiram e você vê o feixe verde?
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Fixe os olhos estritamente na cruz preta central. Em cerca de 8 segundos os pontos lilás somem e surge um ponto verde.
      </p>
    </div>
  );
};
