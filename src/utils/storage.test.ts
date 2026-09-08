import assert from 'node:assert/strict';
import test from 'node:test';
import {
  INITIAL_PROGRESS,
  normalizeUserPreferences,
  normalizeUserProgress,
  recordAttempt
} from './storage.ts';

test('rejects malformed persisted progress fields', () => {
  const normalized = normalizeUserProgress({
    mentalScore: 'infinite',
    streak: -2,
    lastPlayedDate: 'yesterday',
    dominatedIllusions: 'not-an-array',
    bestTimes: { valid: 2.5, invalid: 'fast' },
    unlockedAchievements: [1, 'valid'],
    history: [{ illusionId: 7 }]
  });

  assert.equal(normalized.mentalScore, INITIAL_PROGRESS.mentalScore);
  assert.equal(normalized.streak, INITIAL_PROGRESS.streak);
  assert.deepEqual(normalized.dominatedIllusions, []);
  assert.deepEqual(normalized.bestTimes, { valid: 2.5 });
  assert.deepEqual(normalized.unlockedAchievements, ['valid']);
  assert.deepEqual(normalized.history, []);
});

test('normalized progress remains safe for recordAttempt', () => {
  const current = normalizeUserProgress({ dominatedIllusions: null, history: null });
  const result = recordAttempt(current, {
    illusionId: 'cubo-de-necker',
    timestamp: Date.now(),
    completed: true,
    scoreEarned: 80
  });

  assert.deepEqual(result.updated.dominatedIllusions, ['cubo-de-necker']);
  assert.equal(result.updated.history.length, 1);
});

test('uses the system motion preference only when no explicit choice exists', () => {
  assert.equal(normalizeUserPreferences(undefined, true).reducedMotion, true);
  assert.equal(normalizeUserPreferences({ reducedMotion: false }, true).reducedMotion, false);
});
