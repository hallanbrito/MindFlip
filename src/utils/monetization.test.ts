import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  canRequestAd,
  clearAdConsent,
  createMonetizationConfig,
  loadAdConsent,
  saveAdConsent
} from './monetization.ts';

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key)
  };
}

describe('monetization config', () => {
  it('keeps advertising disabled by default', () => {
    const config = createMonetizationConfig({});
    assert.equal(config.enabled, false);
    assert.equal(config.reason, 'disabled');
  });

  it('fails closed when the publisher id is invalid', () => {
    const config = createMonetizationConfig({
      VITE_ADSENSE_ENABLED: 'true',
      VITE_ADSENSE_CLIENT_ID: 'ca-pub-example',
      VITE_ADSENSE_SLOT_BETWEEN_CHALLENGES: '1234567890'
    });
    assert.equal(config.enabled, false);
    assert.equal(config.reason, 'invalid-client');
  });

  it('rejects the documented placeholder identifiers', () => {
    const config = createMonetizationConfig({
      VITE_ADSENSE_ENABLED: 'true',
      VITE_ADSENSE_CLIENT_ID: 'ca-pub-0000000000000000',
      VITE_ADSENSE_SLOT_BETWEEN_CHALLENGES: '0000000000'
    });
    assert.equal(config.enabled, false);
    assert.equal(config.reason, 'invalid-client');
  });

  it('accepts a valid pilot configuration', () => {
    const config = createMonetizationConfig({
      VITE_ADSENSE_ENABLED: 'true',
      VITE_ADSENSE_CLIENT_ID: 'ca-pub-1234567890123456',
      VITE_ADSENSE_SLOT_BETWEEN_CHALLENGES: '1234567890'
    });
    assert.equal(config.enabled, true);
    assert.equal(config.reason, 'ready');
    assert.equal(config.slots.between_challenges, '1234567890');
  });
});

describe('advertising consent gate', () => {
  it('persists, reads and clears the choice locally', () => {
    const storage = memoryStorage();
    assert.equal(loadAdConsent(storage), 'unknown');
    saveAdConsent('granted', storage);
    assert.equal(loadAdConsent(storage), 'granted');
    clearAdConsent(storage);
    assert.equal(loadAdConsent(storage), 'unknown');
  });

  it('requires valid config, an approved placement and explicit permission', () => {
    const config = createMonetizationConfig({
      VITE_ADSENSE_ENABLED: 'true',
      VITE_ADSENSE_CLIENT_ID: 'ca-pub-1234567890123456',
      VITE_ADSENSE_SLOT_BETWEEN_CHALLENGES: '1234567890'
    });
    assert.equal(canRequestAd(config, 'unknown', 'between_challenges'), false);
    assert.equal(canRequestAd(config, 'denied', 'between_challenges'), false);
    assert.equal(canRequestAd(config, 'granted', 'between_challenges'), true);
  });
});
