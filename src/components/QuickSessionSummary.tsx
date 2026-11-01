import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, CheckCircle, RotateCcw, Calendar, Award, Clock, ArrowLeft } from 'lucide-react';
import type { QuickSessionSummaryData } from '../utils/quickSession';
import { playClickTone, playSuccessTone } from '../utils/audio';

interface Props {
  summary: QuickSessionSummaryData;
  onPlayAgain: () => void;
  onExit: () => void;
  reducedMotion?: boolean;
}

export const QuickSessionSummary: React.FC<Props> = ({
  summary,
  onPlayAgain,
  onExit,
  reducedMotion = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playSuccessTone();

    if (!reducedMotion) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f5d4', '#7928ca', '#38bdf8', '#fbbf24']
        });
      } catch {}
    }

    containerRef.current?.focus();
  }, [reducedMotion]);

  const handlePlayAgain = () => {
    playClickTone();
    onPlayAgain();
  };

  const handleExit = () => {
    playClickTone();
    onExit();
  };

  return (
    <section
      ref={containerRef}
      tabIndex={-1}
      aria-labelledby="session-summary-heading"
      className="w-full min-w-0 max-w-md mx-auto bg-[#0a0d16] border border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-cyan-500/15 via-purple-500/10 to-transparent pointer-events-none" />

      {/* Celebration Header */}
      <div className="w-full flex flex-col items-center text-center z-10 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-cyan-500/20 border border-amber-400/30 flex items-center justify-center mb-3 text-amber-400 shadow-lg shadow-amber-500/10">
          <Trophy className="w-7 h-7" aria-hidden="true" />
        </div>

        <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider mb-2">
          Sessão Rápida Concluída
        </span>

        <h2
          id="session-summary-heading"
          className="text-2xl sm:text-3xl font-black text-white tracking-tight"
        >
          Excelente Percepção!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xs">
          Você completou todos os {summary.totalChallenges} desafios desta sessão e exercitou sua flexibilidade cognitiva.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div
        className={`w-full grid gap-2.5 mb-5 z-10 ${
          summary.bestTime !== null ? 'grid-cols-3' : 'grid-cols-2'
        }`}
      >
        {/* Completed Challenges */}
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center">
          <CheckCircle className="w-4 h-4 text-emerald-400 mb-1" aria-hidden="true" />
          <span className="text-xs text-slate-400 font-medium">Desafios</span>
          <span className="text-base sm:text-lg font-black text-white font-mono mt-0.5">
            {summary.totalCompleted}/{summary.totalChallenges}
          </span>
        </div>

        {/* Score Earned in Session */}
        <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center">
          <Award className="w-4 h-4 text-cyan-400 mb-1" aria-hidden="true" />
          <span className="text-xs text-slate-400 font-medium">Pontos</span>
          <span className="text-base sm:text-lg font-black text-cyan-300 font-mono mt-0.5">
            +{summary.totalScore}
          </span>
        </div>

        {/* Best Time (ONLY rendered when reliable data exists) */}
        {summary.bestTime !== null && (
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center">
            <Clock className="w-4 h-4 text-amber-400 mb-1" aria-hidden="true" />
            <span className="text-xs text-slate-400 font-medium">Melhor Tempo</span>
            <span className="text-base sm:text-lg font-black text-amber-300 font-mono mt-0.5">
              {summary.bestTime}s
            </span>
          </div>
        )}
      </div>

      {/* List of Challenges in this Session */}
      <div className="w-full bg-[#0d111d] rounded-2xl border border-slate-800/80 p-3 mb-5 z-10">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>Desafios Concluídos</span>
          <span className="text-[11px] font-mono text-cyan-400 font-normal">
            {summary.totalCompleted} de {summary.totalChallenges}
          </span>
        </h3>

        <ul className="space-y-1.5" role="list">
          {summary.challenges.map(({ illusion, result }, idx) => (
            <li
              key={illusion.id}
              className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 font-mono text-[10px] font-bold">
                  ✓
                </span>
                <span className="text-slate-200 font-medium truncate">
                  {idx + 1}. {illusion.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                {result?.timeElapsed && result.timeElapsed > 0 ? (
                  <span className="text-amber-400/90">
                    {result.timeElapsed}s
                  </span>
                ) : null}
                <span className="text-cyan-400 font-semibold">
                  +{result?.scoreEarned ?? 0}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-2.5 z-10">
        <button
          type="button"
          onClick={handlePlayAgain}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:brightness-110 active:scale-98 transition-all uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>Jogar novamente</span>
        </button>

        <button
          type="button"
          onClick={handleExit}
          className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
          <span>Voltar amanhã</span>
        </button>
      </div>
    </section>
  );
};
