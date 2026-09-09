export type AdConsent = 'unknown' | 'granted' | 'denied';
export type AdPlacement = 'between_challenges';

export interface MonetizationConfig {
  enabled: boolean;
  configured: boolean;
  clientId?: string;
  slots: Partial<Record<AdPlacement, string>>;
  reason: 'ready' | 'disabled' | 'invalid-client' | 'invalid-slot';
}

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface AdsenseQueue extends Array<Record<string, unknown>> {
  requestNonPersonalizedAds?: number;
}

declare global {
  interface Window {
    adsbygoogle?: AdsenseQueue;
  }
}

const CONSENT_KEY = 'mindflip_ad_consent_v1';
const SCRIPT_ID = 'mindflip-adsense-script';
const CLIENT_PATTERN = /^ca-pub-\d{16}$/;
const SLOT_PATTERN = /^\d{5,20}$/;

export const AD_CONSENT_CHANGED_EVENT = 'mindflip:ad-consent-changed';

export function createMonetizationConfig(
  env: Record<string, string | boolean | undefined>
): MonetizationConfig {
  const requested = env.VITE_ADSENSE_ENABLED === 'true' || env.VITE_ADSENSE_ENABLED === true;
  const clientId = typeof env.VITE_ADSENSE_CLIENT_ID === 'string'
    ? env.VITE_ADSENSE_CLIENT_ID.trim()
    : '';
  const slotId = typeof env.VITE_ADSENSE_SLOT_BETWEEN_CHALLENGES === 'string'
    ? env.VITE_ADSENSE_SLOT_BETWEEN_CHALLENGES.trim()
    : '';

  if (!requested) {
    return { enabled: false, configured: false, slots: {}, reason: 'disabled' };
  }

  const clientDigits = clientId.slice('ca-pub-'.length);
  if (!CLIENT_PATTERN.test(clientId) || /^0+$/.test(clientDigits)) {
    return { enabled: false, configured: false, slots: {}, reason: 'invalid-client' };
  }

  if (!SLOT_PATTERN.test(slotId) || /^0+$/.test(slotId)) {
    return { enabled: false, configured: false, clientId, slots: {}, reason: 'invalid-slot' };
  }

  return {
    enabled: true,
    configured: true,
    clientId,
    slots: { between_challenges: slotId },
    reason: 'ready'
  };
}

const runtimeEnv = (import.meta as ImportMeta & {
  env?: Record<string, string | boolean | undefined>;
}).env ?? {};

export const monetizationConfig = createMonetizationConfig(runtimeEnv);

export function loadAdConsent(storage?: StorageLike): AdConsent {
  const target = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!target) return 'unknown';

  try {
    const value = target.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unknown';
  } catch {
    return 'unknown';
  }
}

export function saveAdConsent(consent: Exclude<AdConsent, 'unknown'>, storage?: StorageLike): void {
  const target = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!target) return;

  try {
    target.setItem(CONSENT_KEY, consent);
  } catch {}
}

export function clearAdConsent(storage?: StorageLike): void {
  const target = storage ?? (typeof window !== 'undefined' ? window.localStorage : undefined);
  if (!target) return;

  try {
    target.removeItem(CONSENT_KEY);
  } catch {}
}

export function announceAdConsentChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AD_CONSENT_CHANGED_EVENT));
  }
}

export function canRequestAd(
  config: MonetizationConfig,
  consent: AdConsent,
  placement: AdPlacement
): boolean {
  return config.enabled && config.configured && consent === 'granted' && Boolean(config.slots[placement]);
}

let scriptPromise: Promise<void> | null = null;

export function ensureAdsenseScript(config: MonetizationConfig): Promise<void> {
  if (typeof window === 'undefined' || typeof document === 'undefined' || !config.enabled || !config.clientId) {
    return Promise.reject(new Error('AdSense indisponível sem configuração válida.'));
  }

  window.adsbygoogle = window.adsbygoogle ?? [];
  window.adsbygoogle.requestNonPersonalizedAds = 1;

  if (document.getElementById(SCRIPT_ID)) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(config.clientId!)}`;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Falha ao carregar o provedor publicitário.'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export function requestAdsenseAd(): void {
  if (typeof window === 'undefined') return;
  window.adsbygoogle = window.adsbygoogle ?? [];
  window.adsbygoogle.push({});
}
