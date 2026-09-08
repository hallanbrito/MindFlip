import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Illusion, UserProgress } from '../types';
import { IllusionEngine } from './illusions/IllusionEngine';
import { getScientificReferences } from '../data/scientificReferences';
import { playClickTone, playFlipWhoosh, playSuccessTone } from '../utils/audio';
import { recordAttempt } from '../utils/storage';
import { trackEvent } from '../utils/analytics';
import {
  Clock,
  Zap,
  HelpCircle,
  Share2,
  ChevronRight,
  BookOpen,
  Award,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface Props {
  illusion: Illusion;
  userProgress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onNextChallenge: () => void;
  onChallengeFriend: (illusion: Illusion, timeElapsed?: number) => void;
  reducedMotion?: boolean;
}

export const ChallengeCard: React.FC<Props> = ({
  illusion,
  userProgress,
  onProgressUpdate,
  onNextChallenge,
  onChallengeFriend,
  reducedMotion = false
}) => {
  // Interaction phase:
  // 'intro' -> user answers initial question or looks at illusion
  // 'timing' -> user attempts to flip perception or observe effect with running timer
  // 'solved' -> user achieved flip / revealed answer
  const [phase, setPhase] = useState<'intro' | 'timing' | 'solved'>('intro');
  const [selectedInitialChoice, setSelectedInitialChoice] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [revealedTipIndex, setRevealedTipIndex] = useState(0);
  const [explanationTab, setExplanationTab] = useState<'quick' | 'deep'>('quick');

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Reset state when illusion changes
  useEffect(() => {
    setPhase('intro');
    setSelectedInitialChoice(null);
    setTimerSeconds(0);
    setTimerRunning(false);
    setRevealedTipIndex(0);
    setExplanationTab('quick');
    if (timerRef.current) clearInterval(timerRef.current);

    trackEvent('challenge_view', {
      illusionId: illusion.id,
      title: illusion.title,
      category: illusion.category
    });
  }, [illusion.id]);

  // Progressive tip auto-reveal timer during timing phase
  useEffect(() => {
    if (phase === 'timing' && timerRunning) {
      if (timerSeconds >= 5 && revealedTipIndex < 1) {
        setRevealedTipIndex(1);
      } else if (timerSeconds >= 10 && revealedTipIndex < 2) {
        setRevealedTipIndex(2);
      } else if (timerSeconds >= 16 && revealedTipIndex < 3) {
        setRevealedTipIndex(3);
      }
    }
  }, [timerSeconds, phase, timerRunning, revealedTipIndex]);

  const startTimer = () => {
    playClickTone();
    setPhase('timing');
    setTimerRunning(true);
    setTimerSeconds(0);
    startTimeRef.current = performance.now();

    trackEvent('challenge_started', {
      illusionId: illusion.id,
      initialChoice: selectedInitialChoice
    });

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      setTimerSeconds(elapsed);
    }, 100);
  };

  const handleCompleteSuccess = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerRunning(false);
    setPhase('solved');

    const finalTime = Number(timerSeconds.toFixed(1));
    playFlipWhoosh();
    playSuccessTone();

    // Trigger celebratory particle burst
    if (!reducedMotion) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#00f5d4', '#7928ca', '#38bdf8', '#fbbf24']
        });
      } catch {}
    }

    // Save attempt to user progress
    const points = finalTime > 0 && finalTime < 5 ? 120 : 80;
    const { updated } = recordAttempt(userProgress, {
      illusionId: illusion.id,
      timestamp: Date.now(),
      timeElapsed: finalTime,
      completed: true,
      initialPerception: selectedInitialChoice || undefined,
      flipped: true,
      scoreEarned: points
    });

    onProgressUpdate(updated);

    trackEvent('challenge_completed', {
      illusionId: illusion.id,
      elapsedTime: finalTime,
      scoreEarned: points
    });
  };

  const handleInitialChoice = (choice: string) => {
    playClickTone();
    setSelectedInitialChoice(choice);

    if (illusion.interactionType === 'flip_timer') {
      startTimer();
    } else {
      setPhase('timing');
      startTimer();
    }
  };

  const personalBest = userProgress.bestTimes[illusion.id];
  const scientificReferences = getScientificReferences(illusion.id);

  return (
    <article
      className="w-full min-w-0 max-w-md mx-auto bg-[#0a0d16] border border-slate-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col items-center"
      aria-labelledby={`heading-${illusion.id}`}
    >
      {/* Subtle background ambient radial gradient */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent pointer-events-none" />

      {/* Header tags: Category & Difficulty */}
      <div className="w-full min-w-0 flex flex-wrap items-center justify-between gap-2 mb-3 z-10">
        <div className="min-w-0 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
            {illusion.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400">
            {illusion.difficulty}
          </span>
        </div>

        {personalBest && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <Award className="w-3 h-3" />
            <span>Recorde: {personalBest}s</span>
          </div>
        )}
      </div>

      {/* Title & Subtitle */}
      <div className="w-full text-left mb-3 z-10">
        <h2 id={`heading-${illusion.id}`} className="text-xl sm:text-2xl font-extrabold text-white tracking-tight break-words flex items-center gap-2">
          {illusion.title}
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          {illusion.subtitle}
        </p>
      </div>

      {/* Motion warning for accessibility */}
      {illusion.motionWarning && (
        <div className="w-full mb-3 flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px]">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Contém movimento contínuo. Pause a qualquer momento se sentir desconforto.</span>
        </div>
      )}

      {/* Interactive Visual Engine */}
      <div className="w-full min-w-0 max-w-full my-2 overflow-hidden flex items-center justify-center">
        <IllusionEngine
          illusion={illusion}
          reducedMotion={reducedMotion}
          onReactionComplete={(score) => {
            handleCompleteSuccess();
          }}
        />
      </div>

      {/* Step Sequence Controller */}
      <div className="w-full mt-4 flex flex-col items-center z-10">
        {/* PHASE 1: Initial Question / Choice */}
        {phase === 'intro' && (
          <div className="w-full flex flex-col items-center">
            {illusion.initialQuestion && (
              <div className="w-full p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center mb-3">
                <p className="text-sm font-semibold text-slate-200">
                  {illusion.initialQuestion}
                </p>
              </div>
            )}

            {illusion.choices && illusion.choices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                {illusion.choices.map((choice, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleInitialChoice(choice)}
                    className="py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 hover:border-cyan-500/50 active:scale-98 text-sm font-bold text-white border border-slate-700/80 transition-all flex items-center justify-center text-center shadow-md"
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={startTimer}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 active:scale-98 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>INICIAR DESAFIO MENTAL</span>
              </button>
            )}
          </div>
        )}

        {/* PHASE 2: Timing / Flip Action in progress */}
        {phase === 'timing' && (
          <div className="w-full flex flex-col items-center">
            {/* Timer Counter */}
            <div className="flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-base font-bold shadow-inner">
              <Clock className="w-4 h-4 animate-spin" />
              <span>{timerSeconds.toFixed(1)}s</span>
            </div>

            {/* Prompt */}
            <div className="w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center mb-3">
              <p className="text-sm font-semibold text-cyan-300">
                {illusion.flipPrompt || 'Concentre-se e observe o fenômeno agir na sua percepção.'}
              </p>
            </div>

            {/* Progressive Tips */}
            {illusion.tips.length > 0 && (
              <div className="w-full mb-3 p-3 rounded-xl bg-[#0e1320] border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Dica para Virar a Percepção</span>
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {revealedTipIndex + 1}/{illusion.tips.length}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic">
                  "{illusion.tips[revealedTipIndex] || illusion.tips[0]}"
                </p>

                {revealedTipIndex < illusion.tips.length - 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      playClickTone();
                      setRevealedTipIndex(r => r + 1);
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 mt-2 font-medium underline"
                  >
                    Ver próxima dica →
                  </button>
                )}
              </div>
            )}

            {/* Success Trigger Button */}
            <button
              type="button"
              onClick={handleCompleteSuccess}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 hover:brightness-110 active:scale-98 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all uppercase tracking-wide"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>CONSEGUI VIRAR A PERCEPÇÃO!</span>
            </button>
          </div>
        )}

        {/* PHASE 3: Solved Result, Explanation & Share */}
        {phase === 'solved' && (
          <div className="w-full flex flex-col items-center animate-fade-in">
            {/* Result Box */}
            <div className="w-full p-4 rounded-2xl bg-gradient-to-br from-[#0c1626] to-[#0d1222] border border-cyan-500/40 text-center mb-4 shadow-xl">
              <div className="flex items-center justify-center gap-2 text-cyan-300 font-bold text-sm mb-1">
                <Sparkles className="w-4 h-4" />
                <span>MIND FLIP CONCLUÍDO!</span>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-white my-1 font-mono">
                {timerSeconds > 0 ? `${timerSeconds.toFixed(1)} segundos` : 'Desvendado!'}
              </div>

              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {personalBest && timerSeconds > 0 && timerSeconds <= personalBest
                  ? '🎉 Novo recorde pessoal de velocidade de percepção!'
                  : 'Você relatou uma mudança na sua percepção da imagem.'}
              </p>

              {/* Action row: Share + Retry */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => onChallengeFriend(illusion, timerSeconds)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow hover:bg-cyan-400 active:scale-95 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Desafiar um Amigo</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickTone();
                    setPhase('intro');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs flex items-center gap-1.5 border border-slate-700 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tentar de Novo</span>
                </button>
              </div>
            </div>

            {/* Explanation with Two Levels: Rápida vs Quero Entender */}
            <div className="w-full bg-[#0d111d] rounded-2xl border border-slate-800 p-4 mb-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Por que isso acontece?</span>
                </span>

                <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      playClickTone();
                      setExplanationTab('quick');
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      explanationTab === 'quick'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Rápida
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playClickTone();
                      setExplanationTab('deep');
                      trackEvent('explanation_read', { illusionId: illusion.id });
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                      explanationTab === 'deep'
                        ? 'bg-purple-500 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Quero Entender
                  </button>
                </div>
              </div>

              {explanationTab === 'quick' ? (
                <p className="text-xs text-slate-300 leading-relaxed">
                  {illusion.explanation}
                </p>
              ) : (
                <div className="text-xs text-slate-300 leading-relaxed space-y-2">
                  <p>{illusion.scienceExplanation}</p>
                  <div className="rounded-lg border border-slate-700/80 bg-slate-950/50 p-2.5">
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-cyan-300">
                      Fontes desta explicação
                    </p>
                    <ul className="space-y-1.5">
                      {scientificReferences.map(reference => (
                        <li key={reference.id}>
                          <a
                            className="text-[11px] text-cyan-400 underline decoration-cyan-700 underline-offset-2 hover:text-cyan-300"
                            href={reference.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {reference.authors} ({reference.year}). {reference.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-[11px] text-purple-300/80 bg-purple-950/40 p-2 rounded-lg border border-purple-800/40">
                    🔬 <strong>Base Científica:</strong> Estes desafios são experiências de percepção e entretenimento, não testes médicos ou diagnósticos clínicos.
                  </div>
                </div>
              )}

              {/* Curiosity nugget */}
              {illusion.curiosity && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-start gap-2">
                  <span className="text-amber-400 text-xs shrink-0">💡</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    <strong className="text-slate-300">Curiosidade:</strong> {illusion.curiosity}
                  </p>
                </div>
              )}
            </div>

            {/* Next Challenge CTA */}
            <div className="w-full flex flex-col items-center">
              <span className="text-[11px] text-slate-400 mb-2 font-medium">
                O próximo desafio costuma surpreender os olhos...
              </span>
              <button
                type="button"
                onClick={() => {
                  playClickTone();
                  onNextChallenge();
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 active:scale-98 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all uppercase tracking-wide"
              >
                <span>PRÓXIMO DESAFIO</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
