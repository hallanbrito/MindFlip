import React, { useEffect, useRef, useState } from 'react';
import { playCountdownTick } from '../../utils/audio';

interface Props {
  spiralSpeed?: number;
  reducedMotion?: boolean;
}

export const MotionAftereffect: React.FC<Props> = ({
  spiralSpeed = 2.5,
  reducedMotion = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'animating' | 'static_reveal'>('animating');
  const [countdown, setCountdown] = useState(15);
  const [isRunning, setIsRunning] = useState(false);

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
            setPhase('static_reveal');
            setIsRunning(false);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, countdown]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rot = 0;
    let animId: number;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (phase === 'static_reveal') {
        // Draw static grid / textured surface to observe expansion aftereffect
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;

        // Concentric squares with radial rays
        for (let r = 15; r < 140; r += 18) {
          ctx.strokeRect(cx - r, cy - r, r * 2, r * 2);
        }

        for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(a) * 140, cy + Math.sin(a) * 140);
          ctx.stroke();
        }

        // Center dot
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();

        return; // Don't animate in static reveal
      }

      // Rotating Archimedian/Logarithmic spiral
      ctx.fillStyle = '#090a10';
      ctx.fillRect(0, 0, w, h);

      const arms = 6;
      ctx.lineWidth = 12;

      for (let arm = 0; arm < arms; arm++) {
        const offset = (arm * Math.PI * 2) / arms;
        ctx.strokeStyle = arm % 2 === 0 ? '#00f5d4' : '#7928ca';
        ctx.beginPath();

        for (let t = 0; t < 18; t += 0.1) {
          const r = t * 7.5;
          const a = t + offset + rot;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Central fixation bullseye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      if (isRunning && !reducedMotion) {
        rot += 0.05 * spiralSpeed;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [phase, isRunning, spiralSpeed, reducedMotion]);

  const startTest = () => {
    setCountdown(15);
    setPhase('animating');
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[300px] rounded-2xl bg-[#090b12] border border-slate-800 flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="w-full h-full cursor-pointer"
          onClick={() => {
            if (phase === 'static_reveal') startTest();
          }}
        />

        {phase === 'animating' && isRunning && (
          <div className="absolute top-3 inset-x-0 flex justify-center">
            <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-500/50 text-cyan-300 font-mono text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>FIXE O CENTRO: {countdown}s</span>
            </div>
          </div>
        )}

        {phase === 'static_reveal' && (
          <div className="absolute top-3 inset-x-0 flex justify-center">
            <div className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-mono text-xs animate-bounce shadow-lg">
              ✨ OLHE O CENTRO: A TELA ESTÁ SE EXPANDINDO!
            </div>
          </div>
        )}

        {!isRunning && phase === 'animating' && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4">
            <button
              type="button"
              onClick={startTest}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              ▶ Iniciar Fixação (15s)
            </button>
            <span className="text-[11px] text-slate-400 mt-2 text-center">
              Você observará a imagem estática se expandir sozinha.
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        {phase === 'static_reveal' && (
          <button
            type="button"
            onClick={startTest}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
          >
            Repetir Experiência
          </button>
        )}
      </div>
    </div>
  );
};
