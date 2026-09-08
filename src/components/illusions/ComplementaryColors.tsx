import React, { useEffect, useState } from 'react';
import { playCountdownTick, playSuccessTone } from '../../utils/audio';

interface Props {
  timerDuration?: number;
}

export const ComplementaryColors: React.FC<Props> = ({ timerDuration = 15 }) => {
  const [countdown, setCountdown] = useState(timerDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<'inverted' | 'white_screen'>('inverted');

  useEffect(() => {
    let timer: number;
    if (isRunning && countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(c => {
          if (c <= 4 && c > 1) {
            playCountdownTick(false);
          } else if (c === 1) {
            playCountdownTick(true);
          }
          if (c <= 1) {
            setPhase('white_screen');
            setIsRunning(false);
            playSuccessTone();
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, countdown]);

  const startTest = () => {
    setCountdown(timerDuration);
    setPhase('inverted');
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[240px] rounded-2xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl transition-colors duration-200">
        {phase === 'inverted' ? (
          // Inverted Flag:
          // Inverted of Green (#009b3a) is Red/Magenta (#ff64c5)
          // Inverted of Yellow (#fedf00) is Deep Cyan/Blue (#0120ff)
          // Inverted of Blue (#002776) is Yellow/Orange (#ffd889)
          <div className="relative w-full h-full bg-[#ec4899] flex items-center justify-center">
            {/* Inverted Rhombus (Cyan) */}
            <div className="w-[230px] h-[150px] bg-[#0284c7] transform rotate-45 scale-y-75 flex items-center justify-center shadow-lg">
              {/* Inverted Circle (Amber) */}
              <div className="w-16 h-16 rounded-full bg-[#f59e0b] flex items-center justify-center">
                {/* Central Fixation Dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md" />
              </div>
            </div>

            {isRunning && (
              <div className="absolute top-2.5 inset-x-0 flex justify-center">
                <div className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-mono text-xs flex items-center gap-2 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>FIXE O PONTO BRANCO: {countdown}s</span>
                </div>
              </div>
            )}

            {!isRunning && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
                <button
                  type="button"
                  onClick={startTest}
                  className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  ▶ Iniciar Fixação ({timerDuration}s)
                </button>
                <span className="text-[11px] text-white/90 mt-1.5 font-medium">
                  Depois a tela ficará branca e você verá a bandeira real!
                </span>
              </div>
            )}
          </div>
        ) : (
          // Pure White Canvas to manifest the complementary afterimage!
          <div className="relative w-full h-full bg-white flex flex-col items-center justify-center p-4">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <div className="absolute bottom-3 px-3 py-1 rounded-full bg-slate-900/90 text-emerald-400 text-xs font-semibold shadow-lg animate-bounce">
              🇧🇷 Pisque suavemente: vê verde, amarelo e azul?
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        {phase === 'white_screen' && (
          <button
            type="button"
            onClick={startTest}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
          >
            Fixar Novamente
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        A fadiga seletiva dos cones retinianos faz o cérebro projetar as cores opostas quando a tela fica branca.
      </p>
    </div>
  );
};
