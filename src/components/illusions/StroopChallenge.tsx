import React, { useState } from 'react';
import { playClickTone, playSuccessTone } from '../../utils/audio';

interface Props {
  roundCount?: number;
  onComplete?: (score: number, avgTimeMs: number) => void;
}

interface StroopItem {
  word: string;
  inkColorName: string;
  inkHex: string;
}

const STROOP_POOL: StroopItem[] = [
  { word: 'AZUL', inkColorName: 'Vermelho', inkHex: '#ef4444' },
  { word: 'VERDE', inkColorName: 'Amarelo', inkHex: '#eab308' },
  { word: 'AMARELO', inkColorName: 'Azul', inkHex: '#3b82f6' },
  { word: 'VERMELHO', inkColorName: 'Verde', inkHex: '#22c55e' },
  { word: 'ROXO', inkColorName: 'Laranja', inkHex: '#f97316' },
  { word: 'VERDE', inkColorName: 'Azul', inkHex: '#3b82f6' },
  { word: 'AZUL', inkColorName: 'Verde', inkHex: '#22c55e' },
  { word: 'VERMELHO', inkColorName: 'Amarelo', inkHex: '#eab308' }
];

export const StroopChallenge: React.FC<Props> = ({ roundCount = 5, onComplete }) => {
  const [stage, setStage] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [currentRound, setCurrentRound] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<StroopItem>(STROOP_POOL[0]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [totalTimeMs, setTotalTimeMs] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const startNextRound = (nextRoundIndex: number) => {
    if (nextRoundIndex >= roundCount) {
      setStage('finished');
      playSuccessTone();
      const avg = totalTimeMs / roundCount;
      onComplete?.(score, avg);
      return;
    }
    const randomItem = STROOP_POOL[Math.floor(Math.random() * STROOP_POOL.length)];
    setCurrentPrompt(randomItem);
    setCurrentRound(nextRoundIndex);
    setStartTime(performance.now());
  };

  const handleChoice = (colorName: string) => {
    playClickTone();
    const elapsed = performance.now() - startTime;
    setTotalTimeMs(prev => prev + elapsed);

    const isCorrect = colorName === currentPrompt.inkColorName;
    if (isCorrect) {
      setScore(s => s + 20);
      setLastFeedback('✓ Correto!');
    } else {
      setLastFeedback(`✗ Errou! A tinta era ${currentPrompt.inkColorName}`);
    }

    startNextRound(currentRound + 1);
  };

  const startChallenge = () => {
    setScore(0);
    setTotalTimeMs(0);
    setLastFeedback(null);
    setStage('playing');
    startNextRound(0);
  };

  const colorOptions = ['Vermelho', 'Azul', 'Verde', 'Amarelo'];

  return (
    <div className="flex flex-col items-center justify-center select-none w-full">
      <div className="relative w-[300px] h-[280px] rounded-2xl bg-[#0b0e17] border border-slate-800 flex flex-col items-center justify-between p-4 overflow-hidden shadow-2xl">
        {stage === 'intro' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-2xl font-bold mb-2">
              🧠
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Teste de Conflito Stroop</h4>
            <p className="text-xs text-slate-300 max-w-[240px] mb-4">
              Clique na <span className="text-cyan-300 font-bold">COR DA TINTA</span>, ignorando o que está escrito!
            </p>
            <button
              type="button"
              onClick={startChallenge}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Começar Teste (5 Rodadas)
            </button>
          </div>
        )}

        {stage === 'playing' && (
          <div className="w-full flex flex-col items-center justify-between h-full">
            {/* Round info */}
            <div className="w-full flex justify-between items-center text-[11px] font-mono text-slate-400">
              <span>Rodada {currentRound + 1} de {roundCount}</span>
              <span className="text-cyan-400">Pontos: {score}</span>
            </div>

            {/* Target Word */}
            <div className="flex flex-col items-center my-auto">
              <span
                className="text-4xl font-extrabold tracking-wider transition-all duration-75 filter drop-shadow-md"
                style={{ color: currentPrompt.inkHex }}
              >
                {currentPrompt.word}
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-2">
                QUAL É A COR DA TINTA?
              </span>
              {lastFeedback && (
                <span className="text-[11px] font-semibold text-amber-400 mt-1">
                  {lastFeedback}
                </span>
              )}
            </div>

            {/* Answer buttons */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {colorOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleChoice(opt)}
                  className="py-2.5 px-3 rounded-lg bg-slate-800/90 hover:bg-slate-700 active:bg-cyan-500 active:text-slate-950 text-xs font-bold text-white border border-slate-700 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === 'finished' && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-3xl mb-1">{score >= 80 ? '🏆' : '⚡'}</span>
            <h4 className="text-sm font-bold text-white mb-1">Teste Concluído!</h4>
            <div className="my-3 p-3 bg-slate-900 rounded-xl border border-slate-800 w-full max-w-[220px]">
              <div className="text-xs text-slate-400">Pontuação:</div>
              <div className="text-xl font-bold text-cyan-400">{score} / {roundCount * 20}</div>
              <div className="text-xs text-slate-400 mt-1">Tempo Médio:</div>
              <div className="text-sm font-mono text-amber-300">
                {(totalTimeMs / roundCount / 1000).toFixed(2)}s por decisão
              </div>
            </div>
            <button
              type="button"
              onClick={startChallenge}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              Jogar Novamente
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-2 text-center max-w-xs">
        Seu cérebro lê a palavra em milissegundos antes de seu córtex pré-frontal inibir a resposta errada.
      </p>
    </div>
  );
};
