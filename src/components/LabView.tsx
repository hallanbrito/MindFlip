import React, { useState } from 'react';
import { Illusion } from '../types';
import { ILLUSIONS_DATA } from '../data/illusions';
import { IllusionEngine } from './illusions/IllusionEngine';
import { ShepardToneDemo } from './illusions/ShepardToneDemo';
import { playClickTone } from '../utils/audio';
import {
  FlaskConical,
  Sliders,
  RotateCcw,
  Sparkles,
  Volume2
} from 'lucide-react';

interface Props {
  reducedMotion?: boolean;
}

export const LabView: React.FC<Props> = ({ reducedMotion = false }) => {
  const [selectedId, setSelectedId] = useState<string>('rotacao-ambigua');
  const [isAudioLab, setIsAudioLab] = useState<boolean>(false);

  // Dynamic parameter state map: illusionId -> { paramKey -> number }
  const [labParams, setLabParams] = useState<Record<string, Record<string, number>>>({});

  const selectedIllusion = ILLUSIONS_DATA.find(i => i.id === selectedId) || ILLUSIONS_DATA[0];

  const currentParams = labParams[selectedIllusion.id] || {};

  const handleParamChange = (key: string, value: number) => {
    setLabParams(prev => ({
      ...prev,
      [selectedIllusion.id]: {
        ...(prev[selectedIllusion.id] || {}),
        [key]: value
      }
    }));
  };

  const resetParams = () => {
    playClickTone();
    setLabParams(prev => {
      const next = { ...prev };
      delete next[selectedIllusion.id];
      return next;
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
          <FlaskConical className="w-3.5 h-3.5 text-purple-400" />
          <span>MindFlip Lab • Sandbox Interativo</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Laboratório de Parâmetros
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1">
          Altere velocidade, contraste, calibração geométrica e guias em tempo real para entender os limites da sua percepção visual e auditiva.
        </p>
      </div>

      {/* Illusion Selector Pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
        <button
          type="button"
          onClick={() => {
            playClickTone();
            setIsAudioLab(false);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            !isAudioLab
              ? 'bg-purple-500 text-white border-purple-400 font-bold shadow-md shadow-purple-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3 h-3 inline mr-1" />
          Ilusões Visuais
        </button>

        <button
          type="button"
          onClick={() => {
            playClickTone();
            setIsAudioLab(true);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            isAudioLab
              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Volume2 className="w-3 h-3 inline mr-1" />
          Ilusão Sonora (Tom Shepard)
        </button>

        <span className="text-slate-700 self-center">|</span>

        {!isAudioLab &&
          ILLUSIONS_DATA.map(ill => (
            <button
              key={ill.id}
              type="button"
              onClick={() => {
                playClickTone();
                setSelectedId(ill.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                selectedId === ill.id
                  ? 'bg-slate-800 text-cyan-300 border-cyan-500/60 font-semibold'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {ill.title}
            </button>
          ))}
      </div>

      {/* Main Sandbox Grid: Stage + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Stage Card (Left / Center) */}
        <div className="lg:col-span-7 bg-[#0a0d16] border border-slate-800/90 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                {isAudioLab ? 'Tom Shepard (A Escala Infinita)' : selectedIllusion.title}
              </h2>
              <p className="text-xs text-slate-400">
                {isAudioLab ? 'Paradoxo auditivo de altura tonal contínua' : selectedIllusion.subtitle}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
              MODO LAB ATIVO
            </span>
          </div>

          <div className="w-full flex items-center justify-center my-2">
            {isAudioLab ? (
              <ShepardToneDemo />
            ) : (
              <IllusionEngine
                illusion={selectedIllusion}
                customParams={currentParams}
                reducedMotion={reducedMotion}
              />
            )}
          </div>

          <p className="text-xs text-slate-400 text-center mt-3 max-w-md">
            {isAudioLab
              ? 'A superposição de oitavas separadas com envelope de amplitude gaussiano cria a impressão de subida ininterrupta.'
              : selectedIllusion.explanation}
          </p>
        </div>

        {/* Parameters Panel (Right) */}
        <div className="lg:col-span-5 bg-[#0b0e18] border border-slate-800 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Ajustes em Tempo Real</span>
            </div>

            {!isAudioLab && (
              <button
                type="button"
                onClick={resetParams}
                className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar</span>
              </button>
            )}
          </div>

          {isAudioLab ? (
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              <p>
                O <strong>Tom Shepard</strong> é o equivalente auditivo da ilusão óptica da "Escada de Penrose".
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300">
                Freq. Base: 55 Hz (A1) • 6 Oitavas Simultâneas • Curva Gaussiana
              </div>
              <p className="text-slate-400">
                Seu cérebro foca nas notas intermediárias que sobem de frequência, enquanto as extremidades aparecem e desaparecem suavemente abaixo do limiar auditivo.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedIllusion.labControls && selectedIllusion.labControls.length > 0 ? (
                selectedIllusion.labControls.map(ctrl => {
                  const currentValue = currentParams[ctrl.id] ?? ctrl.defaultValue;
                  const isToggle = ctrl.step === 1 && ctrl.min === 0 && ctrl.max === 1;

                  return (
                    <div key={ctrl.id} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-semibold text-slate-200">
                          {ctrl.label}
                        </label>
                        <span className="text-xs font-mono text-cyan-400">
                          {isToggle ? (currentValue > 0.5 ? 'LIGADO' : 'DESLIGADO') : `${currentValue}${ctrl.unit || ''}`}
                        </span>
                      </div>

                      {isToggle ? (
                        <button
                          type="button"
                          onClick={() => {
                            playClickTone();
                            handleParamChange(ctrl.id, currentValue > 0.5 ? 0 : 1);
                          }}
                          className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold border transition-colors ${
                            currentValue > 0.5
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {currentValue > 0.5 ? 'Desativar Assistente' : 'Ativar Assistente'}
                        </button>
                      ) : (
                        <input
                          type="range"
                          min={ctrl.min}
                          max={ctrl.max}
                          step={ctrl.step}
                          value={currentValue}
                          onChange={e => handleParamChange(ctrl.id, Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-4 rounded-xl bg-slate-900 text-center text-xs text-slate-400">
                  Esta demonstração não possui parâmetros ajustáveis nesta versão.
                </div>
              )}

              {/* Scientific Note */}
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-300/90 leading-relaxed">
                🔬 <strong>Exploração educativa:</strong> Alterar as variáveis permite comparar como o estímulo visual muda. Esta atividade não mede diretamente processos cerebrais.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
