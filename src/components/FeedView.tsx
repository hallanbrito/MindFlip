import React, { useState, useEffect, useRef } from 'react';
import { Illusion, UserProgress } from '../types';
import { ILLUSIONS_DATA, CATEGORIES_LIST } from '../data/illusions';
import { ChallengeCard } from './ChallengeCard';
import { AdSlot } from './AdSlot';
import { playClickTone } from '../utils/audio';
import {
  Shuffle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  CheckCircle,
  Eye
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

  const containerRef = useRef<HTMLDivElement>(null);

  // Filtered illusions list
  const filteredIllusions = React.useMemo(() => {
    let list = selectedCategory === 'todos'
      ? [...ILLUSIONS_DATA]
      : ILLUSIONS_DATA.filter(i => i.category === selectedCategory);

    if (isShuffled) {
      // Deterministic sort based on id hash for stability while active
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [selectedCategory, isShuffled]);

  // Keep index in bound
  useEffect(() => {
    if (currentIndex >= filteredIllusions.length) {
      setCurrentIndex(0);
    }
  }, [filteredIllusions.length, currentIndex]);

  // Keyboard navigation support: ArrowUp/ArrowDown, or W/S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing if active in an input
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
  }, [currentIndex, filteredIllusions.length]);

  const goToNext = () => {
    playClickTone();
    setCurrentIndex(i => (i + 1) % filteredIllusions.length);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const goToPrev = () => {
    playClickTone();
    setCurrentIndex(i => (i - 1 + filteredIllusions.length) % filteredIllusions.length);
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const currentIllusion = filteredIllusions[currentIndex] || ILLUSIONS_DATA[0];

  return (
    <div ref={containerRef} className="w-full min-w-0 max-w-full overflow-x-clip flex flex-col items-center pb-16">
      {/* Game-like Hero Section (shows when first landing) */}
      {!hasStartedPlaying && (
        <section className="w-full max-w-4xl mx-auto px-4 pt-4 pb-8 sm:pt-8 sm:pb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laboratório de Percepção & Ilusões Biestáveis</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-3xl leading-[1.15]">
            VOCÊ CONSEGUE ENGANAR O <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">PRÓPRIO CÉREBRO?</span>
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
            Teste ilusões ópticas e fenômenos visuais que desafiam movimento, cores, profundidade e atenção. Tente forçar sua mente a inverter a realidade.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playClickTone();
                setHasStartedPlaying(true);
                // Smooth scroll to challenge card
                const el = document.getElementById('active-challenge');
                el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
              }}
              className="py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-cyan-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2.5 uppercase tracking-wide"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>COMEÇAR O DESAFIO</span>
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Leva menos de 30 segundos • Grátis e sem cadastro</span>
          </div>
        </section>
      )}

      {/* Category Filter Horizontal Scrollbar */}
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

      {/* Challenge Navigation Status Bar */}
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

        {/* Desktop / Mobile arrow buttons */}
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

      {/* Active Challenge Card */}
      <div id="active-challenge" className="w-full min-w-0 max-w-full px-3 sm:px-4 flex justify-center">
        <ChallengeCard
          key={currentIllusion.id}
          illusion={currentIllusion}
          userProgress={userProgress}
          onProgressUpdate={onProgressUpdate}
          onNextChallenge={goToNext}
          onChallengeFriend={onChallengeFriend}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Non-intrusive AdSlot every few challenges with reserved dimensions */}
      <div className="w-full max-w-md px-4 mt-6">
        <AdSlot placement="between_challenges" />
      </div>

      {/* Quick shortcuts helper for desktop */}
      <div className="mt-4 text-[11px] font-mono text-slate-600 hidden sm:flex items-center gap-3">
        <span>Atalhos: [↑] ou [W] Anterior</span>
        <span>•</span>
        <span>[↓] ou [S] Próximo Desafio</span>
      </div>
    </div>
  );
};
