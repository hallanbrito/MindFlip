import React, { useState, useEffect, useRef } from 'react';
import { Illusion, UserProgress, ChallengeAttempt } from '../types';
import { ILLUSIONS_DATA, CATEGORIES_LIST } from '../data/illusions';
import { ChallengeCard } from './ChallengeCard';
import { QuickSessionSummary } from './QuickSessionSummary';
import { AdSlot } from './AdSlot';
import { playClickTone } from '../utils/audio';
import {
  createQuickSession,
  getSessionProgress,
  recordSessionChallengeCompletion,
  advanceSession,
  previousSessionChallenge,
  calculateSessionSummary,
  restartQuickSession,
  canAdvanceSession,
  isChallengeCompletedInSession,
  QuickSessionState
} from '../utils/quickSession';
import {
  Shuffle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  CheckCircle,
  Eye,
  LogOut
} from 'lucide-react';

interface Props {
  userProgress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onChallengeFriend: (illusion: Illusion, timeElapsed?: number) => void;
  reducedMotion?: boolean;
}

export const FeedView: React.FC<Props> = ({
  userProgress,
  onProgressUpdate,
  onChallengeFriend,
  reducedMotion = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasStartedPlaying, setHasStartedPlaying] = useState<boolean>(false);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);

  // Quick Session state
  const [isSessionActive, setIsSessionActive] = useState<boolean>(false);
  const [session, setSession] = useState<QuickSessionState>(() => createQuickSession(ILLUSIONS_DATA));

  const containerRef = useRef<HTMLDivElement>(null);

  // Filtered illusions list for catalog browsing
  const filteredIllusions = React.useMemo(() => {
    let list = selectedCategory === 'todos'
      ? [...ILLUSIONS_DATA]
      : ILLUSIONS_DATA.filter(i => i.category === selectedCategory);

    if (isShuffled) {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [selectedCategory, isShuffled]);

  // Keep index in bound for catalog view
  useEffect(() => {
    if (!isSessionActive && currentIndex >= filteredIllusions.length) {
      setCurrentIndex(0);
    }
  }, [isSessionActive, filteredIllusions.length, currentIndex]);

  // Start Quick Session handler
  const handleStartSession = () => {
    playClickTone();
    const sourceList = filteredIllusions.length >= 5 ? filteredIllusions : ILLUSIONS_DATA;
    const newSession = createQuickSession(sourceList);
    setSession(newSession);
    setIsSessionActive(true);
    setHasStartedPlaying(true);

    const el = document.getElementById('active-challenge');
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const goToNext = () => {
    if (isSessionActive) {
      // Block advancement if current challenge has not been completed
      if (!canAdvanceSession(session)) {
        return;
      }
      playClickTone();
      setSession(prev => advanceSession(prev));
    } else {
      playClickTone();
      setCurrentIndex(i => (i + 1) % filteredIllusions.length);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const goToPrev = () => {
    playClickTone();
    if (isSessionActive) {
      setSession(prev => previousSessionChallenge(prev));
    } else {
      setCurrentIndex(i => (i - 1 + filteredIllusions.length) % filteredIllusions.length);
    }
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // Keyboard navigation support: ArrowUp/ArrowDown, or W/S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSessionActive, session, currentIndex, filteredIllusions.length]);

  // Record completion for active session
  const handleAttemptCompleted = (attempt: ChallengeAttempt, scoreAwarded: number) => {
    if (isSessionActive) {
      setSession(prev =>
        recordSessionChallengeCompletion(prev, prev.currentIndex, {
          illusionId: attempt.illusionId,
          scoreEarned: scoreAwarded,
          timeElapsed: attempt.timeElapsed
        })
      );
    }
  };

  // Restart session with fresh reset and state
  const handlePlayAgain = () => {
    const fresh = restartQuickSession(ILLUSIONS_DATA, session);
    setSession(fresh);
    setIsSessionActive(true);
    setHasStartedPlaying(true);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  // Clean exit from session (preserves early exit)
  const handleExitSession = () => {
    setIsSessionActive(false);
    setHasStartedPlaying(false);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const sessionProgress = getSessionProgress(session);
  const currentIllusion = isSessionActive
    ? session.illusions[session.currentIndex] || ILLUSIONS_DATA[0]
    : filteredIllusions[currentIndex] || ILLUSIONS_DATA[0];

  const cardKey = isSessionActive
    ? `session-${session.sessionNumber}-${session.currentIndex}-${currentIllusion.id}`
    : `catalog-${currentIllusion.id}`;

  const isCurrentCompleted = isSessionActive && isChallengeCompletedInSession(session, session.currentIndex);

  return (
    <div ref={containerRef} className="w-full min-w-0 max-w-full overflow-x-clip flex flex-col items-center pb-16">
      {/* Game-like Hero Section (shows when first landing) */}
      {!hasStartedPlaying && (
        <section className="w-full max-w-4xl mx-auto px-4 pt-4 pb-8 sm:pt-8 sm:pb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Laboratório de Percepção & Ilusões Biestáveis</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-3xl leading-[1.15]">
            VOCÊ CONSEGUE ENGANAR O <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">PRÓPRIO CÉREBRO?</span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Teste ilusões ópticas e fenômenos visuais que desafiam movimento, cores, profundidade e atenção. Inicie uma sessão rápida de 5 desafios para treinar sua percepção.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleStartSession}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-cyan-500/25 hover:brightness-110 active:scale-98 transition-all flex items-center gap-2.5 uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Zap className="w-5 h-5 fill-current" aria-hidden="true" />
              <span>COMEÇAR O DESAFIO</span>
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            <span>Sessão rápida de 5 desafios • Grátis e sem cadastro</span>
          </div>
        </section>
      )}

      {/* Case 1: Session Completed -> Render Summary */}
      {isSessionActive && session.isCompleted ? (
        <div id="session-summary" className="w-full min-w-0 max-w-full px-3 sm:px-4 flex justify-center mt-4">
          <QuickSessionSummary
            summary={calculateSessionSummary(session)}
            onPlayAgain={handlePlayAgain}
            onExit={handleExitSession}
            reducedMotion={reducedMotion}
          />
        </div>
      ) : (
        <>
          {/* Active Quick Session: Show Progress Header */}
          {isSessionActive ? (
            <div className="w-full min-w-0 max-w-md px-3 sm:px-4 my-3 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold font-mono text-[11px] uppercase tracking-wider">
                    Sessão Rápida
                  </span>
                  <span className="text-white font-bold font-mono">
                    Desafio {sessionProgress.formattedStep}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {sessionProgress.completedCount} concluído(s) • {sessionProgress.remainingCount} restante(s)
                  </span>

                  <button
                    type="button"
                    onClick={handleExitSession}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                    title="Sair da sessão"
                    aria-label="Sair da sessão rápida"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Accessible Visual Progress Bar (calculated strictly from effective completions) */}
              <div
                role="progressbar"
                aria-valuenow={sessionProgress.completedCount}
                aria-valuemin={0}
                aria-valuemax={sessionProgress.total}
                aria-label={`Progresso da Sessão Rápida: ${sessionProgress.completedCount} de ${sessionProgress.total} desafios concluídos (${sessionProgress.completionPercentage}%). Posição: desafio ${sessionProgress.currentStep} de ${sessionProgress.total}.`}
                className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${sessionProgress.completionPercentage}%` }}
                />
              </div>

              {/* Status Bar with Navigation Chevrons */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-1">
                <span className="truncate max-w-[220px] text-slate-300">
                  {currentIllusion.title}
                </span>

                <div className="shrink-0 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={goToPrev}
                    disabled={session.currentIndex <= 0}
                    className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white transition-colors"
                    title="Desafio Anterior"
                    aria-label="Desafio anterior da sessão"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    disabled={!canAdvanceSession(session)}
                    className={`p-1 rounded-lg bg-slate-900 border border-slate-800 transition-colors ${
                      !canAdvanceSession(session)
                        ? 'opacity-40 cursor-not-allowed text-slate-600'
                        : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title={
                      !canAdvanceSession(session)
                        ? 'Complete o desafio atual para avançar'
                        : sessionProgress.isLastChallenge
                        ? 'Concluir Sessão'
                        : 'Próximo Desafio'
                    }
                    aria-label={
                      sessionProgress.isLastChallenge ? 'Concluir sessão' : 'Próximo desafio da sessão'
                    }
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Catalog Mode: Category Filter & Status Bar */
            <>
              <div className="w-full min-w-0 max-w-2xl px-3 sm:px-4 my-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Filtrar Fenômeno:</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      playClickTone();
                      setIsShuffled(!isShuffled);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all ${
                      isShuffled
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                    title="Alternar ordem dos desafios"
                  >
                    <Shuffle className="w-3 h-3" />
                    <span>Aleatório</span>
                  </button>
                </div>

                <div className="w-full min-w-0 flex gap-2 overflow-x-auto overscroll-x-contain pb-1.5 scrollbar-thin no-scrollbar">
                  {CATEGORIES_LIST.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        playClickTone();
                        setSelectedCategory(cat.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all shrink-0 ${
                        selectedCategory === cat.id
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 font-bold'
                          : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Catalog Challenge Navigation Status Bar */}
              <div className="w-full min-w-0 max-w-md px-3 sm:px-4 flex items-center justify-between gap-2 text-xs font-mono text-slate-400 mb-2">
                <div className="min-w-0 flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">
                    #{currentIndex + 1} de {filteredIllusions.length}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="min-w-0 text-slate-400 truncate max-w-[160px]">
                    {currentIllusion.title}
                  </span>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={goToPrev}
                    className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Desafio Anterior (Seta Cima / W)"
                    aria-label="Desafio anterior"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="p-1 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Próximo Desafio (Seta Baixo / S)"
                    aria-label="Próximo desafio"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Active Challenge Card */}
          <div id="active-challenge" className="w-full min-w-0 max-w-full px-3 sm:px-4 flex justify-center">
            <ChallengeCard
              key={cardKey}
              illusion={currentIllusion}
              userProgress={userProgress}
              onProgressUpdate={onProgressUpdate}
              onNextChallenge={goToNext}
              onChallengeFriend={onChallengeFriend}
              reducedMotion={reducedMotion}
              isLastInSession={isSessionActive && sessionProgress.isLastChallenge}
              nextButtonLabel={
                isSessionActive && sessionProgress.isLastChallenge ? 'CONCLUIR SESSÃO' : undefined
              }
              isAlreadyCompletedInSession={isCurrentCompleted}
              sessionContextKey={cardKey}
              onAttemptCompleted={handleAttemptCompleted}
            />
          </div>

          {/* Non-intrusive AdSlot between challenges */}
          <div className="w-full max-w-md px-4 mt-6">
            <AdSlot placement="between_challenges" />
          </div>

          {/* Quick shortcuts helper for desktop */}
          <div className="mt-4 text-[11px] font-mono text-slate-600 hidden sm:flex items-center gap-3">
            <span>Atalhos: [↑] ou [W] Anterior</span>
            <span>•</span>
            <span>[↓] ou [S] Próximo Desafio</span>
          </div>
        </>
      )}
    </div>
  );
};
