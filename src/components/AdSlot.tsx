import React, { useEffect, useRef, useState } from 'react';
import {
  AD_CONSENT_CHANGED_EVENT,
  canRequestAd,
  ensureAdsenseScript,
  loadAdConsent,
  monetizationConfig,
  requestAdsenseAd
} from '../utils/monetization';

interface AdSlotProps {
  placement: 'top' | 'inline' | 'between_challenges' | 'sidebar' | 'footer';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '' }) => {
  const [consent, setConsent] = useState(loadAdConsent);
  const [failed, setFailed] = useState(false);
  const requested = useRef(false);

  useEffect(() => {
    const syncConsent = () => {
      requested.current = false;
      setFailed(false);
      setConsent(loadAdConsent());
    };
    window.addEventListener(AD_CONSENT_CHANGED_EVENT, syncConsent);
    return () => window.removeEventListener(AD_CONSENT_CHANGED_EVENT, syncConsent);
  }, []);

  const isPilotPlacement = placement === 'between_challenges';
  const canLoad = isPilotPlacement && canRequestAd(
    monetizationConfig,
    consent,
    'between_challenges'
  );

  useEffect(() => {
    if (!canLoad || requested.current) return;
    requested.current = true;

    ensureAdsenseScript(monetizationConfig)
      .then(() => requestAdsenseAd())
      .catch(() => setFailed(true));
  }, [canLoad]);

  // Pre-reserved dimensions to guarantee zero Cumulative Layout Shift (CLS = 0)
  const getDimensions = () => {
    switch (placement) {
      case 'top':
        return 'w-full max-w-[728px] h-[90px]';
      case 'between_challenges':
        return 'w-full max-w-[400px] h-[100px]';
      case 'sidebar':
        return 'w-[300px] h-[250px]';
      case 'footer':
        return 'w-full max-w-[728px] h-[90px]';
      case 'inline':
      default:
        return 'w-full max-w-[340px] h-[80px]';
    }
  };

  if (canLoad && !failed) {
    return (
      <aside
        className={`my-3 mx-auto overflow-hidden rounded-xl ${getDimensions()} ${className}`}
        aria-label="Publicidade do Google"
      >
        <p className="mb-1 text-center text-[10px] font-mono uppercase tracking-wider text-slate-500">
          Publicidade
        </p>
        <ins
          className="adsbygoogle block h-[80px] w-full"
          data-ad-client={monetizationConfig.clientId}
          data-ad-slot={monetizationConfig.slots.between_challenges}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  const statusText = failed
    ? 'Publicidade indisponível no momento'
    : monetizationConfig.enabled && consent === 'denied'
      ? 'Publicidade desativada pela sua escolha'
      : 'Sem anúncios ativos nesta versão';

  return (
    <div
      className={`my-3 mx-auto flex flex-col items-center justify-center rounded-xl bg-[#0d101a]/70 border border-dashed border-slate-800 text-slate-500 overflow-hidden relative ${getDimensions()} ${className}`}
      role="complementary"
      aria-label="Publicidade parceira"
    >
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        <span>Espaço de Publicidade</span>
      </div>

      <p className="text-xs text-slate-400 font-medium mt-1">
        {statusText}
      </p>

      <span className="text-[10px] text-slate-600 mt-0.5">
        Nunca interrompe seus desafios
      </span>
    </div>
  );
};
