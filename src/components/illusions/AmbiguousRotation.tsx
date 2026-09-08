import React, { useEffect, useRef, useState } from 'react';

interface Props {
  speed?: number;
  showGuidelines?: boolean;
  isFlippedGuide?: boolean;
  reducedMotion?: boolean;
}

export const AmbiguousRotation: React.FC<Props> = ({
  speed = 1,
  showGuidelines = false,
  isFlippedGuide = false,
  reducedMotion = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animationId: number;

    // 3D wireframe / silhouette of kinetic rotating figure (spinning dancer / abstract kinetic acrobat)
    // Mathematically projected without perspective (orthographic projection Z -> 0)
    // This creates genuine mathematical bistability: either clockwise or counter-clockwise is equally valid!
    const keypoints3D: { x: number; y: number; z: number; r: number; group?: string }[] = [
      // Head & Torso
      { x: 0, y: -90, z: 0, r: 12 }, // Head
      { x: 0, y: -65, z: 0, r: 8 },  // Neck
      { x: 0, y: -40, z: 0, r: 14 }, // Chest
      { x: 0, y: -10, z: 0, r: 12 }, // Waist
      { x: 0, y: 15, z: 0, r: 15 },  // Hips
      // Left Arm (fixed / posed)
      { x: -18, y: -50, z: 5, r: 6 },
      { x: -35, y: -30, z: 12, r: 5 },
      { x: -45, y: -60, z: 18, r: 5 }, // Hand raised
      // Right Arm (extended outward gracefully)
      { x: 18, y: -50, z: -5, r: 6 },
      { x: 38, y: -45, z: -15, r: 5 },
      { x: 55, y: -55, z: -25, r: 5 },
      // Standing Leg (centered supporting axis)
      { x: -6, y: 40, z: 0, r: 9 },
      { x: -4, y: 75, z: 0, r: 7 },
      { x: -2, y: 110, z: 0, r: 6 },  // Standing foot on ground
      // Extended Leg (rotating in circle around center)
      { x: 10, y: 35, z: 10, r: 8 },
      { x: 35, y: 55, z: 30, r: 7 },
      { x: 60, y: 80, z: 50, r: 6 },  // Extended rotating foot
    ];

    // Connections between joints
    const bones = [
      [0, 1], [1, 2], [2, 3], [3, 4], // Spine
      [2, 5], [5, 6], [6, 7],         // Left Arm
      [2, 8], [8, 9], [9, 10],        // Right Arm
      [4, 11], [11, 12], [12, 13],    // Standing leg
      [4, 14], [14, 15], [15, 16]     // Extended leg
    ];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2 - 10;

      ctx.clearRect(0, 0, width, height);

      // Subtle background radar/grid floor
      ctx.strokeStyle = '#1e2638';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 115, 75, 20, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy + 115, 40, 10, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Ambient shadow on ground
      const shadowGradient = ctx.createRadialGradient(cx, cy + 115, 5, cx, cy + 115, 50);
      shadowGradient.addColorStop(0, 'rgba(0, 245, 212, 0.25)');
      shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGradient;
      ctx.beginPath();
      ctx.ellipse(cx, cy + 115, 55, 15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Calculate 3D rotation: Orthographic projection (no Z scaling, creating pure ambiguity)
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const projected = keypoints3D.map(pt => {
        // Rotate around Y axis
        const xRot = pt.x * cosA - pt.z * sinA;
        const zRot = pt.x * sinA + pt.z * cosA;
        return {
          px: cx + xRot,
          py: cy + pt.y,
          pz: zRot,
          r: pt.r
        };
      });

      // Draw bones (limbs)
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw connecting limbs as silhouette
      bones.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);

        // Pure silhouette: solid uniform dark cyan-neon or white
        ctx.strokeStyle = showGuidelines 
          ? (p1.pz + p2.pz > 0 ? '#00f5d4' : '#7928ca') 
          : '#e6edf8';
        ctx.lineWidth = 10;
        ctx.stroke();

        // Inner core
        ctx.strokeStyle = showGuidelines ? '#ffffff' : '#090a10';
        ctx.lineWidth = 4;
        ctx.stroke();
      });

      // Draw joint circles
      projected.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, pt.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = showGuidelines 
          ? (pt.pz > 0 ? '#00f5d4' : '#7928ca') 
          : '#e6edf8';
        ctx.fill();
      });

      // Extended rotating foot indicator dot (helpful for focusing)
      const foot = projected[16];
      ctx.beginPath();
      ctx.arc(foot.px, foot.py, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00f5d4';
      ctx.shadowColor = '#00f5d4';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Optional axis guideline
      if (showGuidelines) {
        ctx.strokeStyle = 'rgba(0, 245, 212, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, cy - 110);
        ctx.lineTo(cx, cy + 120);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (!isPaused && !reducedMotion) {
        angle += 0.035 * speed;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed, showGuidelines, isFlippedGuide, isPaused, reducedMotion]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[340px] rounded-2xl bg-gradient-to-b from-[#0f131d] to-[#0a0c13] border border-slate-800/80 shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <canvas
          ref={canvasRef}
          width={300}
          height={340}
          className="relative z-10 w-full h-full cursor-pointer"
          onClick={() => setIsPaused(!isPaused)}
          title="Clique para pausar / continuar"
        />

        {/* Ambient indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-cyan-400 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          {isPaused ? 'PAUSADO' : 'PROJEÇÃO AMBÍGUA'}
        </div>

        {reducedMotion && (
          <div className="absolute bottom-3 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs px-2.5 py-1 rounded z-20">
            Movimento reduzido ativo
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Dica: A silhueta não tem frente nem trás. Piscar enquanto olha para o pé ajuda seu cérebro a inverter.
      </p>
    </div>
  );
};
