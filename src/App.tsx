import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { FeedView } from './components/FeedView';
import { LabView } from './components/LabView';
import { ArticlesView } from './components/ArticlesView';
import { Footer } from './components/Footer';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { BattleModal } from './components/BattleModal';
import { AchievementsModal } from './components/AchievementsModal';
import { SettingsModal } from './components/SettingsModal';
import { LegalPagesModal } from './components/LegalPagesModal';

import { Illusion, UserProgress, UserPreferences } from './types';
import { ILLUSIONS_DATA } from './data/illusions';
import {
  loadUserProgress,
  saveUserProgress,
  loadUserPreferences,
  saveUserPreferences,
  INITIAL_PROGRESS
} from './utils/storage';
import { setSoundEnabled, playSuccessTone } from './utils/audio';
import { trackEvent } from './utils/analytics';
import { Swords, X, Sparkles } from 'lucide-react';

export default function App() {
  // State management
  const [userProgress, setUserProgress] = useState<UserProgress>(loadUserProgress);
  const [preferences, setPreferences] = useState<UserPreferences>(loadUserPreferences);
  const [activeTab, setActiveTab] = useState<'feed' | 'lab' | 'articles'>('feed');

  // Modal triggers
  const [dailyOpen, setDailyOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState<'sobre' | 'privacidade' | 'cookies' | 'termos'>('sobre');

  // Battle Duel Modal state
  const [battleOpen, setBattleOpen] = useState(false);
  const [activeBattleIllusion, setActiveBattleIllusion] = useState<Illusion>(ILLUSIONS_DATA[0]);
  const [activeBattleTime, setActiveBattleTime] = useState<number>(6.5);

  // Incoming duel query notification
  const [incomingDuel, setIncomingDuel] = useState<{ challenger: string; time: number; illusion: Illusion } | null>(null);

  // Sync sound settings with audio engine
  useEffect(() => {
    setSoundEnabled(preferences.soundEnabled);
  }, [preferences.soundEnabled]);

  // Check URL query params on mount for incoming battle challenge
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const isBattle = urlParams.get('battle');
      const challenger = urlParams.get('challenger');
      const illId = urlParams.get('ill');
      const targetTime = urlParams.get('time');

      if (isBattle && illId) {
        const found = ILLUSIONS_DATA.find(i => i.id === illId);
        if (found) {
          setIncomingDuel({
            challenger: challenger || 'Um amigo',
            time: targetTime ? Number(targetTime) : 6.0,
            illusion: found
          });
          trackEvent('battle_invite_received', {
            challenger,
            illusionId: illId
          });
        }
      }
    } catch {}
  }, []);

  const handleProgressUpdate = (updated: UserProgress) => {
    setUserProgress(updated);
    saveUserProgress(updated);
  };

  const handleToggleSound = () => {
    setPreferences(prev => {
      const next = { ...prev, soundEnabled: !prev.soundEnabled };
      saveUserPreferences(next);
      return next;
    });
  };

  const handleToggleReducedMotion = () => {
    setPreferences(prev => {
      const next = { ...prev, reducedMotion: !prev.reducedMotion };
      saveUserPreferences(next);
      return next;
    });
  };

  const handleResetData = () => {
    setUserProgress(INITIAL_PROGRESS);
    saveUserProgress(INITIAL_PROGRESS);
  };

  const handleOpenBattle = (illusion: Illusion, timeElapsed?: number) => {
    setActiveBattleIllusion(illusion);
    setActiveBattleTime(timeElapsed && timeElapsed > 0 ? timeElapsed : 6.2);
    setBattleOpen(true);
  };

  const handleOpenLegal = (tab: 'sobre' | 'privacidade' | 'cookies' | 'termos') => {
    setLegalInitialTab(tab);
    setLegalOpen(true);
  };

  const handleShareDaily = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MindFlip — Desafio do Dia',
          text,
          url: window.location.href
        });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Texto do desafio copiado para a área de transferência!');
      } catch {}
    }
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Fixed / Sticky Navigation */}
      <Navbar
        userProgress={userProgress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDaily={() => setDailyOpen(true)}
        onOpenAchievements={() => setAchievementsOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        soundEnabled={preferences.soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Incoming Duel Challenge Banner */}
      {incomingDuel && (
        <aside
          aria-label="Notificação de desafio"
          className="w-full bg-gradient-to-r from-purple-900/90 via-cyan-900/90 to-purple-900/90 border-b border-cyan-500/40 py-2.5 px-4 animate-fade-in"
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Swords className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />
              <span>
                <strong className="text-white">{incomingDuel.challenger}</strong> te desafiou a virar a ilusão{' '}
                <strong className="text-cyan-300">"{incomingDuel.illusion.title}"</strong> em menos de{' '}
                <strong className="text-amber-300 font-mono">{incomingDuel.time}s</strong>!
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('feed');
                  setIncomingDuel(null);
                }}
                className="px-3 py-1 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 active:scale-95 transition-all shadow"
              >
                Aceitar Duelo
              </button>
              <button
                type="button"
                onClick={() => setIncomingDuel(null)}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Dispensar aviso de duelo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content View Switcher */}
      <main className="flex-1 w-full flex flex-col items-center">
        {activeTab === 'feed' && (
          <FeedView
            userProgress={userProgress}
            onProgressUpdate={handleProgressUpdate}
            onChallengeFriend={handleOpenBattle}
            reducedMotion={preferences.reducedMotion}
          />
        )}

        {activeTab === 'lab' && (
          <LabView />
        )}

        {activeTab === 'articles' && (
          <ArticlesView />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Modals */}
      <DailyChallengeModal
        isOpen={dailyOpen}
        onClose={() => setDailyOpen(false)}
        userProgress={userProgress}
        onProgressUpdate={handleProgressUpdate}
        onShare={handleShareDaily}
        reducedMotion={preferences.reducedMotion}
      />

      <BattleModal
        isOpen={battleOpen}
        onClose={() => setBattleOpen(false)}
        illusion={activeBattleIllusion}
        recordedTime={activeBattleTime}
      />

      <AchievementsModal
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
        userProgress={userProgress}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        soundEnabled={preferences.soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={preferences.reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        onResetData={handleResetData}
      />

      <LegalPagesModal
        isOpen={legalOpen}
        onClose={() => setLegalOpen(false)}
        initialTab={legalInitialTab}
      />
    </div>
  );
}
