import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { UserProgress } from '../types';
import { getDailyChallenge } from '../data/illusions';
import { IllusionEngine } from './illusions/IllusionEngine';
import { playClickTone, playSuccessTone } from '../utils/audio';
import { recordAttempt } from '../utils/storage';
import {
  X,
  Flame,
  Clock,
  Award,
  Share2,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onShare: (text: string) => void;
  reducedMotion?: boolean;
}

export const DailyChallengeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userProgress,
  onProgressUpdate,
  onShare,
  reducedMotion = false
}) => {
  const [stage, setStage] = useState<'intro' | 'timing' | 'completed'>('intro');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);

  if (!isOpen) return null;

  const daily = getDailyChallenge();
  const todayFormatted = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const startDailyTimer = () => {
    playClickTone();
    setStage('timing');
    setTimerRunning(true);
    setTimerSeconds(0);
    const start = performance.now();
    setStartTime(start);

    const interval = window.setInterval(() => {
      setTimerSeconds((performance.now() - start) / 1000);
    }, 100);

    (window as any)._dailyInterval = interval;
  };

  const finishDaily = () => {
    if ((window as any)._dailyInterval) {
      clearInterval((window as any)._dailyInterval);
    }
    setTimerRunning(false);
    setStage('completed');
    playSuccessTone();

    if (!reducedMotion) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }

    const finalTime = Number(timerSeconds.toFixed(1));
    const { updated } = recordAttempt(userProgress, {
      illusionId: daily.illusion.id,
      timestamp: Date.now(),
      timeElapsed: finalTime,
      completed: true,
      flipped: true,
      scoreEarned: 150
    }, 100);

    onProgressUpdate(updated);
  };

  const handleShareResult = () => {
    const text = `🔥 Concluí o Desafio Impossível do Dia no MindFlip em ${timerSeconds.toFixed(1)} segundos! Você consegue virar a ilusão "${daily.illusion.title}" mais rápido?`;
    onShare(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#0a0d16] border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden flex flex-col items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="daily-title"
      >
        {/* Glow accent */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span className="capitalize">{todayFormatted}</span>
        </div>

        <h2 id="daily-title" className="text-xl sm:text-2xl font-black text-white text-center">
          Desafio Impossível do Dia
        </h2>

        <p className="text-xs text-amber-200/90 font-medium text-center mt-1">
          Meta: {daily.goal}
        </p>

        {/* Illusion Stage */}
        <div className="w-full my-4 flex items-center justify-center">
          <IllusionEngine
            illusion={daily.illusion}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Interaction Controller */}
        {stage === 'intro' && (
          <div className="w-full flex flex-col items-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center w-full mb-3 text-xs text-slate-300">
              {daily.illusion.instructions}
            </div>

            <button
              type="button"
              onClick={startDailyTimer}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-98 transition-all uppercase tracking-wide"
            >
              <Clock className="w-4 h-4" />
              <span>INICIAR CRONÔMETRO DO DESAFIO</span>
            </button>
          </div>
        )}

        {stage === 'timing' && (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3 px-5 py-2 rounded-full bg-slate-900 border border-amber-500/50 text-amber-300 font-mono text-xl font-black shadow-inner">
              <Clock className="w-5 h-5 animate-spin" />
              <span>{timerSeconds.toFixed(1)}s</span>
            </div>

            <button
              type="button"
              onClick={finishDaily}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 hover:brightness-110 active:scale-98 transition-all uppercase tracking-wide"
            >
              <CheckCircle className="w-5 h-5" />
              <span>CONSEGUI INVERTER!</span>
            </button>
          </div>
        )}

        {stage === 'completed' && (
          <div className="w-full flex flex-col items-center text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 text-2xl font-bold mb-2">
              🏆
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Desafio Diário Concluído!
            </h3>

            <p className="text-2xl font-black font-mono text-cyan-400 mb-2">
              {timerSeconds.toFixed(1)} segundos
            </p>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>+250 Pontos Mentais • Sequência de {userProgress.streak} Dias</span>
            </div>

            <div className="flex gap-2 w-full">
              <button
                type="button"
                onClick={handleShareResult}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow hover:bg-cyan-400 active:scale-95 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Desafiar Amigos</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-all"
              >
                Voltar aos Desafios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
