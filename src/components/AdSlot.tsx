import React from 'react';

interface AdSlotProps {
  placement: 'top' | 'inline' | 'between_challenges' | 'sidebar' | 'footer';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ placement, className = '' }) => {
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

  return (
    <div
      className={`my-3 mx-auto flex flex-col items-center justify-center rounded-xl bg-[#0d101a]/70 border border-dashed border-slate-800 text-slate-500 overflow-hidden relative ${getDimensions()} ${className}`}
      role="complementary"
      aria-label="Publicidade parceira"
    >
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        <span>Espaço Patrocinado</span>
      </div>

      <p className="text-xs text-slate-400 font-medium mt-1">
        Apoie o MindFlip mantendo os desafios 100% gratuitos
      </p>

      <span className="text-[10px] text-slate-600 mt-0.5">
        Sem anúncios invasivos • Respeito à sua privacidade
      </span>
    </div>
  );
};
