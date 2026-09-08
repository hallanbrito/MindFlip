import assert from 'node:assert/strict';
import test from 'node:test';
import {
  normalizeBattleTime,
  parseBattleQuery,
  sanitizeChallenger
} from './battle.ts';

test('accepts a valid battle query', () => {
  assert.deepEqual(
    parseBattleQuery('?battle=1&challenger=Ana&ill=cubo-de-necker&time=4.26', [
      'cubo-de-necker'
    ]),
    { challenger: 'Ana', illusionId: 'cubo-de-necker', time: 4.3 }
  );
});

test('rejects unknown illusions and non-canonical battle flags', () => {
  assert.equal(parseBattleQuery('?battle=true&ill=known', ['known']), null);
  assert.equal(parseBattleQuery('?battle=1&ill=unknown', ['known']), null);
});

test('sanitizes the challenger and constrains invalid times', () => {
  assert.equal(sanitizeChallenger('  Ana\n\tMaria com nome longo  '), 'AnaMaria com no');
  assert.equal(normalizeBattleTime('NaN'), 6);
  assert.equal(normalizeBattleTime('999999'), 6);
  assert.equal(normalizeBattleTime('-3'), 6);
});
