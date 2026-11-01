import assert from 'node:assert/strict';
import test from 'node:test';
import type { Illusion } from '../types.ts';
import {
  QUICK_SESSION_SIZE,
  createQuickSession,
  getSessionProgress,
  recordSessionChallengeCompletion,
  canAdvanceSession,
  advanceSession,
  previousSessionChallenge,
  shouldAwardSessionScore,
  isChallengeCompletedInSession,
  calculateSessionSummary,
  restartQuickSession
} from './quickSession.ts';

const MOCK_CATALOG: Illusion[] = Array.from({ length: 10 }, (_, i) => ({
  id: `illusion-${i + 1}`,
  slug: `illusion-${i + 1}`,
  title: `Ilusão ${i + 1}`,
  subtitle: `Subtítulo ${i + 1}`,
  shortDescription: `Descrição ${i + 1}`,
  category: 'movimento',
  difficulty: 'Fácil',
  instructions: 'Instruções',
  interactionType: 'flip_timer',
  tips: ['Dica 1'],
  explanation: 'Explicação rápida',
  scienceExplanation: 'Explicação científica',
  curiosity: 'Curiosidade',
  shareText: 'Texto'
}));

test('creates quick session with exactly 5 challenges and clean initial state', () => {
  const session = createQuickSession(MOCK_CATALOG);

  assert.equal(session.isActive, true);
  assert.equal(session.currentIndex, 0);
  assert.equal(session.illusions.length, QUICK_SESSION_SIZE);
  assert.equal(session.isCompleted, false);
  assert.equal(session.sessionNumber, 1);
  assert.deepEqual(session.results, {});
  assert.equal(session.illusions[0].id, 'illusion-1');
  assert.equal(session.illusions[4].id, 'illusion-5');
});

test('handles empty or invalid catalog safely', () => {
  const emptySession = createQuickSession([]);
  assert.equal(emptySession.isActive, false);
  assert.equal(emptySession.illusions.length, 0);
  assert.equal(emptySession.isCompleted, false);

  const invalidSession = createQuickSession(null as unknown as Illusion[]);
  assert.equal(invalidSession.isActive, false);
  assert.equal(invalidSession.illusions.length, 0);
});

test('calculates progress percentage strictly by completions while keeping position 1/5 to 5/5 separate', () => {
  let session = createQuickSession(MOCK_CATALOG);

  // Initial step: position 1/5, but 0 completed (0% progress)
  let progress = getSessionProgress(session);
  assert.equal(progress.currentStep, 1);
  assert.equal(progress.total, 5);
  assert.equal(progress.completedCount, 0);
  assert.equal(progress.remainingCount, 5);
  assert.equal(progress.completionPercentage, 0);
  assert.equal(progress.formattedStep, '1/5');
  assert.equal(progress.canAdvance, false);

  // Complete first challenge: still at position 1/5, but now 1 completed (20% progress)
  session = recordSessionChallengeCompletion(session, 0, {
    illusionId: session.illusions[0].id,
    scoreEarned: 130,
    timeElapsed: 3.5
  });

  progress = getSessionProgress(session);
  assert.equal(progress.currentStep, 1);
  assert.equal(progress.completedCount, 1);
  assert.equal(progress.remainingCount, 4);
  assert.equal(progress.completionPercentage, 20);
  assert.equal(progress.canAdvance, true);

  // Advance to position 2/5
  session = advanceSession(session);
  progress = getSessionProgress(session);
  assert.equal(progress.currentStep, 2);
  assert.equal(progress.completedCount, 1);
  assert.equal(progress.completionPercentage, 20); // Still 20% until challenge 2 is completed
  assert.equal(progress.canAdvance, false);

  // Complete challenge 2 -> advances to 40%
  session = recordSessionChallengeCompletion(session, 1, {
    illusionId: session.illusions[1].id,
    scoreEarned: 130
  });
  progress = getSessionProgress(session);
  assert.equal(progress.completedCount, 2);
  assert.equal(progress.completionPercentage, 40);
  assert.equal(progress.canAdvance, true);
});

test('blocks premature advancement when the current challenge is not completed', () => {
  let session = createQuickSession(MOCK_CATALOG);

  // On challenge 0, uncompleted
  assert.equal(canAdvanceSession(session), false);
  const attempted = advanceSession(session);
  // Stays strictly on index 0, not completed
  assert.equal(attempted.currentIndex, 0);
  assert.equal(attempted.isCompleted, false);

  // Now complete challenge 0
  session = recordSessionChallengeCompletion(session, 0, {
    illusionId: session.illusions[0].id,
    scoreEarned: 130
  });

  assert.equal(canAdvanceSession(session), true);
  session = advanceSession(session);
  assert.equal(session.currentIndex, 1);
  // On challenge 1, again blocked until completed
  assert.equal(canAdvanceSession(session), false);
  assert.equal(advanceSession(session).currentIndex, 1);
});

test('blocks premature session conclusion when the 5th challenge is not completed', () => {
  let session = createQuickSession(MOCK_CATALOG);

  // Complete and advance through challenges 0, 1, 2, 3
  for (let i = 0; i < 4; i++) {
    session = recordSessionChallengeCompletion(session, i, {
      illusionId: session.illusions[i].id,
      scoreEarned: 130
    });
    session = advanceSession(session);
  }

  // Now at challenge 4 (5/5), NOT completed yet
  assert.equal(session.currentIndex, 4);
  assert.equal(session.isCompleted, false);
  assert.equal(canAdvanceSession(session), false);

  // Attempting to advance/conclude prematurely must be blocked
  const premature = advanceSession(session);
  assert.equal(premature.currentIndex, 4);
  assert.equal(premature.isCompleted, false);

  // Complete the 5th challenge
  session = recordSessionChallengeCompletion(session, 4, {
    illusionId: session.illusions[4].id,
    scoreEarned: 130
  });
  assert.equal(canAdvanceSession(session), true);

  // Now advance concludes the session without looping back to 0
  session = advanceSession(session);
  assert.equal(session.currentIndex, 4);
  assert.equal(session.isCompleted, true);

  // Repeated advancement maintains completed state without resetting to 0
  session = advanceSession(session);
  assert.equal(session.currentIndex, 4);
  assert.equal(session.isCompleted, true);
});

test('prevents double-counting and identifies repeat attempts in session', () => {
  let session = createQuickSession(MOCK_CATALOG);

  // Before completion: eligible for score
  assert.equal(shouldAwardSessionScore(session, 0), true);
  assert.equal(isChallengeCompletedInSession(session, 0), false);

  session = recordSessionChallengeCompletion(session, 0, {
    illusionId: 'illusion-1',
    scoreEarned: 130,
    timeElapsed: 4.0
  });

  // After completion: NOT eligible for repeat score in session
  assert.equal(shouldAwardSessionScore(session, 0), false);
  assert.equal(isChallengeCompletedInSession(session, 0), true);

  // Attempting to record again preserves initial score
  session = recordSessionChallengeCompletion(session, 0, {
    illusionId: 'illusion-1',
    scoreEarned: 200,
    timeElapsed: 2.0
  });

  assert.equal(session.results[0].scoreEarned, 130);
  assert.equal(session.results[0].timeElapsed, 4.0);
  assert.equal(Object.keys(session.results).length, 1);
});

test('previousSessionChallenge moves back without falling below 0', () => {
  let session = createQuickSession(MOCK_CATALOG);

  // At 0, going previous stays at 0
  session = previousSessionChallenge(session);
  assert.equal(session.currentIndex, 0);

  // Complete 0 and 1, advance to 2
  session = recordSessionChallengeCompletion(session, 0, { illusionId: 'illusion-1', scoreEarned: 130 });
  session = advanceSession(session);
  session = recordSessionChallengeCompletion(session, 1, { illusionId: 'illusion-2', scoreEarned: 130 });
  session = advanceSession(session);
  assert.equal(session.currentIndex, 2);

  // Go back to 1
  session = previousSessionChallenge(session);
  assert.equal(session.currentIndex, 1);
});

test('calculates summary with real score and best time when reliable time exists', () => {
  let session = createQuickSession(MOCK_CATALOG);

  // Complete 3 with valid times, 2 without time
  session = recordSessionChallengeCompletion(session, 0, { illusionId: 'illusion-1', scoreEarned: 130, timeElapsed: 4.8 });
  session = recordSessionChallengeCompletion(session, 1, { illusionId: 'illusion-2', scoreEarned: 130, timeElapsed: 2.5 });
  session = recordSessionChallengeCompletion(session, 2, { illusionId: 'illusion-3', scoreEarned: 170, timeElapsed: 6.1 });
  session = recordSessionChallengeCompletion(session, 3, { illusionId: 'illusion-4', scoreEarned: 130 });
  session = recordSessionChallengeCompletion(session, 4, { illusionId: 'illusion-5', scoreEarned: 130, timeElapsed: 0 });

  const summary = calculateSessionSummary(session);

  assert.equal(summary.totalChallenges, 5);
  assert.equal(summary.totalCompleted, 5);
  assert.equal(summary.totalScore, 130 + 130 + 170 + 130 + 130); // 690
  assert.equal(summary.bestTime, 2.5); // minimum among 4.8, 2.5, 6.1
});

test('calculates summary with null best time when no reliable time data exists', () => {
  let session = createQuickSession(MOCK_CATALOG);

  // Completed challenges without timer (or 0s)
  session = recordSessionChallengeCompletion(session, 0, { illusionId: 'illusion-1', scoreEarned: 130 });
  session = recordSessionChallengeCompletion(session, 1, { illusionId: 'illusion-2', scoreEarned: 130, timeElapsed: 0 });

  const summary = calculateSessionSummary(session);

  assert.equal(summary.totalScore, 260);
  assert.equal(summary.bestTime, null); // Omitted, not invented!
});

test('restartQuickSession increments sessionNumber and resets state cleanly for fresh progress', () => {
  let session = createQuickSession(MOCK_CATALOG);
  for (let i = 0; i < 5; i++) {
    session = recordSessionChallengeCompletion(session, i, { illusionId: `illusion-${i + 1}`, scoreEarned: 130 });
    session = advanceSession(session);
  }
  assert.equal(session.isCompleted, true);

  const restarted = restartQuickSession(MOCK_CATALOG, session);

  assert.equal(restarted.isActive, true);
  assert.equal(restarted.currentIndex, 0);
  assert.equal(restarted.isCompleted, false);
  assert.deepEqual(restarted.results, {});
  assert.equal(restarted.illusions.length, 5);
  assert.equal(restarted.sessionNumber, 2);
  assert.equal(canAdvanceSession(restarted), false);
  // Next rotation took challenges 6-10
  assert.equal(restarted.illusions[0].id, 'illusion-6');
});
