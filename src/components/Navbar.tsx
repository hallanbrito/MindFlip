import React from 'react';
import { UserProgress } from '../types';
import { calculateLevel } from '../utils/storage';
import { playClickTone } from '../utils/audio';
import {
  Flame,
  Award,
  FlaskConical,
  Compass,
  Calendar,
  Settings,
  BookOpen,
  Volume2,
  VolumeX
} from 'lucide-react';

interface Props {
  userProgress: UserProgress;
  activeTab: 'feed' | 'lab' | 'articles';
  setActiveTab: (tab: 'feed' | 'lab' | 'articles') => void;
  onOpenDaily: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<Props> = ({
  userProgress,
  activeTab,
  setActiveTab,
  onOpenDaily,
  onOpenAchievements,
  onOpenSettings,
  soundEnabled,
  onToggleSound
}) => {
  const currentLevel = calculateLevel(userProgress.mentalScore);

  return (
    <header className="sticky top-0 z-50 w-full max-w-full overflow-x-clip bg-[#08090d]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="w-full min-w-0 max-w-6xl mx-auto px-2 sm:px-6 h-14 sm:h-16 flex items-center gap-1 sm:gap-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => {
            playClickTone();
            setActiveTab('feed');
          }}
          className="shrink-0 flex items-center gap-2 cursor-pointer select-none group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          aria-label="Ir para os desafios do MindFlip"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090b12] rounded-[10px] flex items-center justify-center">
              <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-base sm:text-lg">
                MF
              </span>
            </div>
          </div>

          <div className="hidden lg:flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black tracking-tight text-white text-base sm:text-lg">
                MIND<span className="text-cyan-400">FLIP</span>
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                Laboratório
              </span>
            </div>
            <span className="hidden sm:inline text-[10px] text-slate-400 font-medium">
              Vire seu cérebro
            </span>
          </div>
        </button>

        {/* Center Nav tabs */}
        <nav className="min-w-0 flex-1 flex items-center justify-center gap-0.5 sm:gap-2" aria-label="Navegação principal">
          <button
            type="button"
            aria-label="Abrir desafios"
            onClick={() => {
              playClickTone();
              setActiveTab('feed');
            }}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'feed'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden md:inline">Desafios</span>
          </button>

          <button
            type="button"
            aria-label="Abrir laboratório"
            onClick={() => {
              playClickTone();
              setActiveTab('lab');
            }}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'lab'
                ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span className="hidden md:inline">Laboratório</span>
          </button>

          <button
            type="button"
            aria-label="Abrir desafio diário"
            onClick={() => {
              playClickTone();
              onOpenDaily();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 flex items-center gap-1.5 transition-all"
            title="Desafio Impossível do Dia"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Diário</span>
          </button>

          <button
            type="button"
            aria-label="Abrir artigos de ciência"
            onClick={() => {
              playClickTone();
              setActiveTab('articles');
            }}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'articles'
                ? 'bg-blue-500/15 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">Ciência</span>
          </button>
        </nav>

        {/* Right Stats & Tools */}
        <div className="shrink-0 flex items-center gap-0.5 sm:gap-2.5">
          {/* Daily Streak */}
          <button
            type="button"
            onClick={onOpenDaily}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold cursor-pointer hover:border-amber-500/40 transition-colors"
            title="Sequência de dias ativos"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{userProgress.streak}</span>
          </button>

          {/* Level / Score Badge */}
          <button
            type="button"
            onClick={onOpenAchievements}
            className="flex items-center gap-1 px-1.5 sm:px-2.5 py-1.5 sm:py-1 rounded-lg bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 text-xs cursor-pointer hover:border-cyan-400/60 transition-all"
            title="Ver conquistas e nível mental"
          >
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-cyan-300 font-bold hidden sm:inline leading-tight">
                {currentLevel.name}
              </span>
              <span className="font-mono text-xs font-bold text-white leading-none">
                {userProgress.mentalScore}<span className="hidden sm:inline"> pts</span>
              </span>
            </div>
          </button>

          {/* Sound toggle quick button */}
          <button
            type="button"
            onClick={() => {
              playClickTone();
              onToggleSound();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label={soundEnabled ? 'Silenciar áudio' : 'Ativar efeitos sonoros'}
            title={soundEnabled ? 'Silenciar áudio' : 'Ativar áudio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Settings modal button */}
          <button
            type="button"
            onClick={() => {
              playClickTone();
              onOpenSettings();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Abrir configurações e acessibilidade"
            title="Configurações e Acessibilidade"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
