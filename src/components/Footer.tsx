import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { playClickTone } from '../utils/audio';

interface Props {
  onOpenLegal: (tab: 'sobre' | 'privacidade' | 'cookies' | 'termos') => void;
}

export const Footer: React.FC<Props> = ({ onOpenLegal }) => {
  return (
    <footer className="w-full bg-[#06070a] border-t border-slate-900 text-slate-500 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-5">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5">
            <div className="w-full h-full bg-[#08090d] rounded-[6px] flex items-center justify-center font-display font-black text-cyan-400 text-xs">
              MF
            </div>
          </div>
          <span className="font-display font-bold text-white text-sm tracking-tight">
            MIND<span className="text-cyan-400">FLIP</span>
          </span>
          <span className="text-xs text-slate-600">•</span>
          <span className="text-xs text-slate-400">
            Laboratório Interativo de Percepção
          </span>
        </div>

        {/* Legal & About links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => {
              playClickTone();
              onOpenLegal('sobre');
            }}
            className="hover:text-cyan-300 transition-colors"
          >
            Sobre Nós
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTone();
              onOpenLegal('privacidade');
            }}
            className="hover:text-cyan-300 transition-colors"
          >
            Política de Privacidade
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTone();
              onOpenLegal('cookies');
            }}
            className="hover:text-cyan-300 transition-colors"
          >
            Cookies
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTone();
              onOpenLegal('termos');
            }}
            className="hover:text-cyan-300 transition-colors"
          >
            Termos de Uso
          </button>
        </div>

        {/* Ethical commitment & disclaimer */}
        <div className="max-w-xl space-y-1.5 text-[11px] text-slate-500 leading-normal">
          <p className="flex items-center justify-center gap-1.5 text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monetização Ética: Sem pop-ups abusivos, sem cliques forçados e sem rastreamento invasivo.</span>
          </p>
          <p>
            Aviso: Todos os testes, cronômetros e pontuações do MindFlip têm finalidade exclusiva de entretenimento e divulgação científica. Eles não constituem diagnóstico médico, oftalmológico ou psicológico.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-900/80 text-[11px] text-slate-600 flex items-center justify-center gap-1">
          <span>Criado para expandir os limites da mente</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} MindFlip</span>
        </div>
      </div>
    </footer>
  );
};
