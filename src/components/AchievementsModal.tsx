import React from 'react';
import { UserProgress } from '../types';
import { ACHIEVEMENTS_LIST, calculateLevel } from '../utils/storage';
import {
  X,
  Award,
  Lock,
  CheckCircle2,
  Sparkles,
  Info,
  Zap,
  Timer,
  Eye,
  Brain,
  Compass,
  Crown,
  GraduationCap,
  Share2
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
}

const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
    case 'Timer': return <Timer className="w-5 h-5 text-cyan-400" />;
    case 'Eye': return <Eye className="w-5 h-5 text-emerald-400" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-fuchsia-400" />;
    case 'Brain': return <Brain className="w-5 h-5 text-purple-400" />;
    case 'Compass': return <Compass className="w-5 h-5 text-blue-400" />;
    case 'Crown': return <Crown className="w-5 h-5 text-amber-300" />;
    case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-indigo-400" />;
    case 'Share2': return <Share2 className="w-5 h-5 text-teal-400" />;
    default: return <Award className="w-5 h-5 text-cyan-400" />;
  }
};

export const AchievementsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userProgress
}) => {
  if (!isOpen) return null;

  const currentLevel = calculateLevel(userProgress.mentalScore);
  const unlockedSet = new Set(userProgress.unlockedAchievements);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#0b0e18] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievements-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 id="achievements-title" className="text-xl font-extrabold text-white">
              Conquistas & Nível Mental
            </h2>
            <p className="text-xs text-slate-400">
              Sua jornada desvendando os paradoxos da percepção
            </p>
          </div>
        </div>

        {/* Level Progression Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#121626] border border-slate-800 mb-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Nível Atual
              </span>
              <h3 className="text-lg font-black text-white">
                {currentLevel.name}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-lg font-black font-mono text-cyan-300">
                {userProgress.mentalScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {currentLevel.max < 90000 ? ` / ${currentLevel.max} pts` : ' pts (Máx)'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${currentLevel.progress}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-400 mt-2">
            {currentLevel.max < 90000
              ? `Faltam ${currentLevel.max - userProgress.mentalScore} pontos para o próximo nível.`
              : 'Você atingiu a maestria suprema da percepção!'}
          </p>
        </div>

        {/* Badges List with scroll */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
          <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Medalhas Desbloqueadas ({userProgress.unlockedAchievements.length}/{ACHIEVEMENTS_LIST.length})</span>
          </h4>

          {ACHIEVEMENTS_LIST.map(badge => {
            const isUnlocked = unlockedSet.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-cyan-500/40 text-white'
                    : 'bg-slate-900/30 border-slate-800/60 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-cyan-500/15 border border-cyan-500/30'
                      : 'bg-slate-800/60 border border-slate-700/50 grayscale'
                  }`}
                >
                  {getBadgeIcon(badge.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                      {badge.title}
                    </span>
                    {isUnlocked && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                    {badge.description}
                  </p>
                </div>

                {!isUnlocked && (
                  <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Ethical / Medical Disclaimer */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-start gap-2 text-[10px] text-slate-500">
          <Info className="w-3.5 h-3.5 shrink-0 text-slate-600 mt-0.5" />
          <span>
            Os níveis e conquistas são uma mecânica lúdica de entretenimento. Não representam testes clínicos de acuidade visual, medição de QI ou diagnóstico neurológico.
          </span>
        </div>
      </div>
    </div>
  );
};
