import React, { useEffect, useState } from 'react';
import {
  AD_CONSENT_CHANGED_EVENT,
  announceAdConsentChange,
  loadAdConsent,
  monetizationConfig,
  saveAdConsent
} from '../utils/monetization';

export const AdConsentBanner: React.FC = () => {
  const [consent, setConsent] = useState(loadAdConsent);

  useEffect(() => {
    const syncConsent = () => setConsent(loadAdConsent());
    window.addEventListener(AD_CONSENT_CHANGED_EVENT, syncConsent);
    return () => window.removeEventListener(AD_CONSENT_CHANGED_EVENT, syncConsent);
  }, []);

  if (!monetizationConfig.enabled || consent !== 'unknown') return null;

  const choose = (next: 'granted' | 'denied') => {
    saveAdConsent(next);
    setConsent(next);
    announceAdConsentChange();
  };

  return (
    <aside
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-slate-700 bg-[#0b0e18] p-4 shadow-2xl"
      aria-label="Escolha de publicidade"
    >
      <p className="text-sm font-bold text-white">Ajude a manter o MindFlip gratuito</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-300">
        Com sua permissão, o Google poderá exibir anúncios não personalizados e usar tecnologias
        necessárias para frequência, relatórios e prevenção de fraude. Você pode continuar sem anúncios.
      </p>
      <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800"
        >
          Continuar sem anúncios
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="rounded-xl bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-300"
        >
          Permitir anúncios
        </button>
      </div>
    </aside>
  );
};

