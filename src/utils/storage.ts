import { UserProgress, UserPreferences, ChallengeAttempt, Achievement } from '../types';

const STORAGE_KEY = 'mindflip_user_progress_v1';
const PREFS_KEY = 'mindflip_user_preferences_v1';

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'primeiro_flip',
    title: 'Primeiro Flip',
    description: 'Inverteu sua primeira ilusão com a mente.',
    iconName: 'Zap',
    category: 'Percepção'
  },
  {
    id: 'velocista_mental',
    title: 'Velocista Mental',
    description: 'Inverteu uma ilusão de rotação em menos de 5 segundos.',
    iconName: 'Timer',
    category: 'Velocidade'
  },
  {
    id: 'olhos_de_lince',
    title: 'Olhos de Lince',
    description: 'Provou a igualdade de cores no Checker Shadow.',
    iconName: 'Eye',
    category: 'Cores'
  },
  {
    id: 'foco_zen',
    title: 'Foco Zen',
    description: 'Completou a fixação de Troxler sem desviar o olhar.',
    iconName: 'Sparkles',
    category: 'Atenção'
  },
  {
    id: 'mestre_stroop',
    title: 'Imune à Distração',
    description: 'Concluiu o teste de conflito Stroop com alta precisão.',
    iconName: 'Brain',
    category: 'Cognitivo'
  },
  {
    id: 'desbravador_5',
    title: 'Explorador da Mente',
    description: 'Dominou 5 ilusões diferentes.',
    iconName: 'Compass',
    category: 'Progresso'
  },
  {
    id: 'mente_de_ferro',
    title: 'Mestre da Percepção',
    description: 'Dominou 10 ou mais ilusões no catálogo.',
    iconName: 'Crown',
    category: 'Progresso'
  },
  {
    id: 'cientista_curioso',
    title: 'Curiosidade Científica',
    description: 'Leu a explicação científica aprofundada de 3 ilusões.',
    iconName: 'GraduationCap',
    category: 'Ciência'
  },
  {
    id: 'desafiador',
    title: 'Desafiador',
    description: 'Compartilhou um resultado para desafiar amigos.',
    iconName: 'Share2',
    category: 'Social'
  }
];

export const INITIAL_PROGRESS: UserProgress = {
  mentalScore: 100,
  streak: 1,
  lastPlayedDate: new Date().toISOString().split('T')[0],
  totalAttempts: 0,
  dominatedIllusions: [],
  bestTimes: {},
  unlockedAchievements: [],
  history: []
};

export const INITIAL_PREFERENCES: UserPreferences = {
  soundEnabled: true,
  reducedMotion: false,
  highContrast: false,
  vibrationEnabled: true
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const data = JSON.parse(raw);
    return { ...INITIAL_PROGRESS, ...data };
  } catch (err) {
    console.error('Error loading progress from localStorage', err);
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Error saving progress to localStorage', err);
  }
}

export function loadUserPreferences(): UserPreferences {
  if (typeof window === 'undefined') return INITIAL_PREFERENCES;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return INITIAL_PREFERENCES;
    return { ...INITIAL_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return INITIAL_PREFERENCES;
  }
}

export function saveUserPreferences(prefs: UserPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {}
}

export function calculateLevel(score: number): { name: string; min: number; max: number; progress: number } {
  const levels = [
    { name: 'Observador', min: 0, max: 250 },
    { name: 'Curioso', min: 250, max: 600 },
    { name: 'Decodificador', min: 600, max: 1200 },
    { name: 'Ilusionista', min: 1200, max: 2000 },
    { name: 'Mestre da Percepção', min: 2000, max: 3500 },
    { name: 'Mind Hacker', min: 3500, max: 99999 }
  ];

  const current = levels.find(l => score >= l.min && score < l.max) || levels[levels.length - 1];
  const progress = current.max === 99999 
    ? 100 
    : Math.min(100, Math.max(0, ((score - current.min) / (current.max - current.min)) * 100));

  return { ...current, progress };
}

export function recordAttempt(
  current: UserProgress,
  attempt: ChallengeAttempt,
  bonusPoints = 50
): { updated: UserProgress; newlyUnlocked: Achievement[] } {
  const today = new Date().toISOString().split('T')[0];
  let newStreak = current.streak;

  if (current.lastPlayedDate !== today) {
    const lastDate = new Date(current.lastPlayedDate);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  }

  const updatedDominated = current.dominatedIllusions.includes(attempt.illusionId)
    ? current.dominatedIllusions
    : [...current.dominatedIllusions, attempt.illusionId];

  const newBestTimes = { ...current.bestTimes };
  if (attempt.timeElapsed && attempt.timeElapsed > 0) {
    const existing = newBestTimes[attempt.illusionId];
    if (!existing || attempt.timeElapsed < existing) {
      newBestTimes[attempt.illusionId] = Number(attempt.timeElapsed.toFixed(1));
    }
  }

  const newScore = current.mentalScore + attempt.scoreEarned + bonusPoints;
  const newHistory = [attempt, ...current.history.slice(0, 49)];

  const newlyUnlocked: Achievement[] = [];
  const currentUnlocked = new Set(current.unlockedAchievements);

  const checkUnlock = (id: string) => {
    if (!currentUnlocked.has(id)) {
      const ach = ACHIEVEMENTS_LIST.find(a => a.id === id);
      if (ach) {
        newlyUnlocked.push(ach);
        currentUnlocked.add(id);
      }
    }
  };

  if (attempt.flipped || attempt.completed) {
    checkUnlock('primeiro_flip');
  }
  if (attempt.timeElapsed && attempt.timeElapsed < 5 && attempt.flipped) {
    checkUnlock('velocista_mental');
  }
  if (attempt.illusionId === 'checker-shadow' && attempt.completed) {
    checkUnlock('olhos_de_lince');
  }
  if ((attempt.illusionId === 'lilac-chaser' || attempt.illusionId === 'desvanecimento-periferico') && attempt.completed) {
    checkUnlock('foco_zen');
  }
  if (attempt.illusionId === 'stroop-challenge' && attempt.scoreEarned >= 80) {
    checkUnlock('mestre_stroop');
  }
  if (updatedDominated.length >= 5) {
    checkUnlock('desbravador_5');
  }
  if (updatedDominated.length >= 10) {
    checkUnlock('mente_de_ferro');
  }

  const updated: UserProgress = {
    ...current,
    mentalScore: newScore,
    streak: newStreak,
    lastPlayedDate: today,
    totalAttempts: current.totalAttempts + 1,
    dominatedIllusions: updatedDominated,
    bestTimes: newBestTimes,
    unlockedAchievements: Array.from(currentUnlocked),
    history: newHistory
  };

  saveUserProgress(updated);
  return { updated, newlyUnlocked };
}
