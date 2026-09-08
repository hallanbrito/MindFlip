import React, { useState } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Eye,
  RotateCcw,
  ShieldCheck,
  Database
} from 'lucide-react';
import { playClickTone } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  systemPrefersReducedMotion?: boolean;
  onToggleReducedMotion: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  systemPrefersReducedMotion = false,
  onToggleReducedMotion,
  onResetData
}) => {
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#0b0e18] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 id="settings-title" className="text-xl font-bold text-white mb-1">
          Configurações & Acessibilidade
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          Personalize sua experiência de visualização e áudio
        </p>

        <div className="space-y-3">
          {/* Sound Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">Efeitos Sonoros</div>
                <div className="text-[11px] text-slate-400">Feedback sonoro e tons binaurais</div>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={soundEnabled}
              aria-label="Ativar ou desativar efeitos sonoros"
              onClick={() => {
                playClickTone();
                onToggleSound();
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Movimento Reduzido</div>
                <div className="text-[11px] text-slate-400">
                  {systemPrefersReducedMotion
                    ? 'Ativo pela preferência do seu sistema'
                    : 'Desativa rotações rápidas e confetes'}
                </div>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={reducedMotion}
              aria-label="Ativar ou desativar movimento reduzido"
              disabled={systemPrefersReducedMotion}
              onClick={() => {
                playClickTone();
                onToggleReducedMotion();
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                reducedMotion ? 'bg-purple-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  reducedMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Local persistence notice */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-400">
            <Database className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Progresso e preferências ficam armazenados neste navegador.</span>
          </div>

          {/* Reset Data */}
          <div className="pt-3 border-t border-slate-800">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="w-full py-2 px-3 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar Histórico e Pontuação Local</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-center">
                <p className="text-xs text-rose-200 font-semibold mb-2">
                  Tem certeza? Todo o progresso e recordes serão apagados.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      onResetData();
                      setConfirmReset(false);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
                  >
                    Sim, apagar tudo
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Dados salvos localmente</span>
          </span>
          <span>v1.2.0</span>
        </div>
      </div>
    </div>
  );
};
