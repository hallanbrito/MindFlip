import type { Illusion } from '../types.ts';

export const QUICK_SESSION_SIZE = 5;

export interface SessionChallengeResult {
  illusionId: string;
  completed: boolean;
  scoreEarned: number;
  timeElapsed?: number;
}

export interface QuickSessionState {
  isActive: boolean;
  currentIndex: number;
  illusions: Illusion[];
  results: Record<number, SessionChallengeResult>;
  isCompleted: boolean;
  sessionNumber: number;
}

export interface QuickSessionProgress {
  total: number;
  currentStep: number;
  completedCount: number;
  remainingCount: number;
  percentage: number;
  isLastChallenge: boolean;
  formattedStep: string;
}

export interface QuickSessionSummaryData {
  totalChallenges: number;
  totalCompleted: number;
  totalScore: number;
  bestTime: number | null;
  challenges: Array<{
    illusion: Illusion;
    result?: SessionChallengeResult;
  }>;
}

/**
 * Creates a new Quick Session composed of exactly `count` challenges (default 5).
 * Selects challenges sequentially from the given catalog, using `offset` to support rotation.
 */
export function createQuickSession(
  catalog: Illusion[],
  count: number = QUICK_SESSION_SIZE,
  offset: number = 0,
  sessionNumber: number = 1
): QuickSessionState {
  if (!Array.isArray(catalog) || catalog.length === 0) {
    return {
      isActive: false,
      currentIndex: 0,
      illusions: [],
      results: {},
      isCompleted: false,
      sessionNumber
    };
  }

  const targetCount = Math.max(1, count);
  const normalizedOffset = Math.max(0, offset) % catalog.length;
  const selected: Illusion[] = [];

  for (let i = 0; i < targetCount; i++) {
    const item = catalog[(normalizedOffset + i) % catalog.length];
    if (item) selected.push(item);
  }

  return {
    isActive: true,
    currentIndex: 0,
    illusions: selected,
    results: {},
    isCompleted: false,
    sessionNumber
  };
}

/**
 * Calculates current progression numbers and accessible labels.
 */
export function getSessionProgress(session: QuickSessionState): QuickSessionProgress {
  const total = session.illusions.length;
  if (total === 0) {
    return {
      total: 0,
      currentStep: 0,
      completedCount: 0,
      remainingCount: 0,
      percentage: 0,
      isLastChallenge: false,
      formattedStep: '0/0'
    };
  }

  const currentStep = Math.min(session.currentIndex + 1, total);
  const completedCount = Object.values(session.results).filter(r => r && r.completed).length;
  const remainingCount = Math.max(0, total - completedCount);
  const percentage = Math.round((currentStep / total) * 100);
  const isLastChallenge = session.currentIndex === total - 1;

  return {
    total,
    currentStep,
    completedCount,
    remainingCount,
    percentage,
    isLastChallenge,
    formattedStep: `${currentStep}/${total}`
  };
}

/**
 * Records the completion of a challenge in the session.
 * Prevents double-counting: if the challenge at this index was already completed,
 * it keeps the first recorded score.
 */
export function recordSessionChallengeCompletion(
  session: QuickSessionState,
  index: number,
  data: {
    illusionId: string;
    scoreEarned: number;
    timeElapsed?: number;
  }
): QuickSessionState {
  if (index < 0 || index >= session.illusions.length) {
    return session;
  }

  // Double count protection: if already recorded for this index, preserve existing
  if (session.results[index]?.completed) {
    return session;
  }

  const safeScore = Number.isFinite(data.scoreEarned) && data.scoreEarned >= 0 ? data.scoreEarned : 0;
  const safeTime =
    typeof data.timeElapsed === 'number' && Number.isFinite(data.timeElapsed) && data.timeElapsed > 0
      ? Number(data.timeElapsed.toFixed(1))
      : undefined;

  const newResults = {
    ...session.results,
    [index]: {
      illusionId: data.illusionId,
      completed: true,
      scoreEarned: safeScore,
      timeElapsed: safeTime
    }
  };

  return {
    ...session,
    results: newResults
  };
}

/**
 * Advances to the next challenge in the session.
 * If already at the last challenge (e.g. 5/5), sets `isCompleted = true`
 * and DOES NOT loop back to the first challenge.
 */
export function advanceSession(session: QuickSessionState): QuickSessionState {
  const total = session.illusions.length;
  if (total === 0) return session;

  if (session.currentIndex >= total - 1) {
    return {
      ...session,
      isCompleted: true
    };
  }

  return {
    ...session,
    currentIndex: session.currentIndex + 1,
    isCompleted: false
  };
}

/**
 * Moves to the previous challenge within the session bounds.
 */
export function previousSessionChallenge(session: QuickSessionState): QuickSessionState {
  if (session.currentIndex <= 0) {
    return session;
  }

  return {
    ...session,
    currentIndex: session.currentIndex - 1
  };
}

/**
 * Generates the final session summary data.
 * Computes:
 * - totalChallenges: count of challenges in session
 * - totalCompleted: count of completed challenges
 * - totalScore: sum of score earned in this session
 * - bestTime: minimum positive time recorded in session, or NULL if no reliable time data exists
 */
export function calculateSessionSummary(session: QuickSessionState): QuickSessionSummaryData {
  const totalChallenges = session.illusions.length;
  const resultValues = Object.values(session.results);
  const totalCompleted = resultValues.filter(r => r.completed).length;

  const totalScore = resultValues.reduce((sum, r) => {
    return sum + (Number.isFinite(r.scoreEarned) ? r.scoreEarned : 0);
  }, 0);

  const validTimes = resultValues
    .map(r => r.timeElapsed)
    .filter((t): t is number => typeof t === 'number' && Number.isFinite(t) && t > 0);

  const bestTime = validTimes.length > 0 ? Number(Math.min(...validTimes).toFixed(1)) : null;

  const challenges = session.illusions.map((illusion, i) => ({
    illusion,
    result: session.results[i]
  }));

  return {
    totalChallenges,
    totalCompleted,
    totalScore,
    bestTime,
    challenges
  };
}

/**
 * Restarts a session cleanly: resets counters, results, and completion state.
 * Does not mutate or wipe user progress.
 */
export function restartQuickSession(
  catalog: Illusion[],
  previousSession?: QuickSessionState
): QuickSessionState {
  const prevNumber = previousSession?.sessionNumber ?? 1;
  const nextNumber = prevNumber + 1;
  // Rotate by 5 to provide variety if catalog permits
  const nextOffset = (prevNumber * QUICK_SESSION_SIZE) % (catalog.length || 1);

  return createQuickSession(catalog, QUICK_SESSION_SIZE, nextOffset, nextNumber);
}
