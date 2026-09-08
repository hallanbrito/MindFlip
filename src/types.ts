export type IllusionCategory =
  | 'movimento'
  | 'cores'
  | 'profundidade'
  | 'atencao'
  | 'visao_periferica'
  | 'formas'
  | 'rostos'
  | 'tempo_reacao'
  | 'classicos';

export type InteractionType =
  | 'flip_timer'          // "Para qual lado gira? Agora tente inverter com a mente"
  | 'choice'              // Multiple choice (e.g. Which line is longer? What do you see first?)
  | 'interactive_reveal'  // Slider or button that proves brain wrong (e.g. bridge between checker A and B)
  | 'fixation_timer'      // Stare at cross/spiral for X seconds then observe afterimage
  | 'reaction_test';      // Stroop or rapid cognitive conflict test

export interface LabControlConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
}

export type ScientificReferenceKind =
  | 'primary-study'
  | 'review'
  | 'historical-source'
  | 'institutional';

export interface ScientificReference {
  id: string;
  title: string;
  authors: string;
  year: number;
  kind: ScientificReferenceKind;
  url: string;
  doi?: string;
  supports: string;
}

export interface Illusion {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  category: IllusionCategory;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Extremo';
  instructions: string;
  interactionType: InteractionType;
  initialQuestion?: string;
  choices?: string[];
  correctOrSurpriseAnswer?: string;
  flipPrompt?: string;
  tips: string[];
  explanation: string;
  scienceExplanation: string;
  curiosity: string;
  shareText: string;
  motionWarning?: boolean;
  labControls?: LabControlConfig[];
}

export interface ChallengeAttempt {
  illusionId: string;
  timestamp: number;
  timeElapsed?: number; // in seconds
  completed: boolean;
  initialPerception?: string;
  flipped?: boolean;
  scoreEarned: number;
}

export interface UserProgress {
  mentalScore: number;
  streak: number;
  lastPlayedDate: string;
  totalAttempts: number;
  dominatedIllusions: string[]; // illusion ids
  bestTimes: Record<string, number>; // illusionId -> lowest seconds to flip
  unlockedAchievements: string[];
  history: ChallengeAttempt[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

export interface UserPreferences {
  soundEnabled: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  vibrationEnabled: boolean;
}

export interface AnalyticsEvent {
  eventName: string;
  data?: Record<string, any>;
  timestamp: number;
}

export interface FriendBattleData {
  challengerName: string;
  illusionId: string;
  challengerTime: number;
  date: string;
}
