import React, { useState } from 'react';
import { Illusion } from '../types';
import { playClickTone, playSuccessTone } from '../utils/audio';
import { normalizeBattleTime, sanitizeChallenger } from '../utils/battle';
import {
  X,
  Swords,
  Copy,
  Check,
  Share2,
  MessageCircle,
  Twitter,
  Send
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  illusion: Illusion;
  recordedTime?: number;
}

export const BattleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  illusion,
  recordedTime = 6.4
}) => {
  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState('Você');

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://mindflip.app';
  const safeUserName = sanitizeChallenger(userName);
  const safeRecordedTime = normalizeBattleTime(recordedTime);
  const battleUrl = `${appUrl}?battle=1&challenger=${encodeURIComponent(safeUserName)}&ill=${encodeURIComponent(illusion.id)}&time=${safeRecordedTime.toFixed(1)}`;

  const shareText = `⚔️ ${safeUserName} te desafiou para uma Batalha de Cérebros no MindFlip!\n\nTempo alcançado na ilusão "${illusion.title}": ${safeRecordedTime.toFixed(1)} segundos.\n\nSeu cérebro consegue virar a percepção mais rápido?\nAceite o duelo: ${battleUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(battleUrl);
      setCopied(true);
      playSuccessTone();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Batalha de Cérebros — ${illusion.title}`,
          text: shareText,
          url: battleUrl
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(battleUrl)}&text=${encodeURIComponent(shareText)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#0b0e18] border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col items-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="battle-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 mb-3 shadow-lg shadow-cyan-500/20">
          <Swords className="w-6 h-6 text-slate-950 fill-current" />
        </div>

        <h2 id="battle-title" className="text-xl font-black text-white text-center">
          Batalha de Cérebros
        </h2>

        <p className="text-xs text-slate-400 text-center mt-1">
          Desafie um amigo para ver quem inverte a percepção em menor tempo!
        </p>

        {/* Duel Card Preview */}
        <div className="w-full my-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center text-center">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
            {illusion.title}
          </span>
          <div className="text-2xl font-black text-white font-mono my-1">
            {recordedTime.toFixed(1)} segundos
          </div>
          <span className="text-xs text-slate-400">
            Tempo a ser superado pelo seu adversário
          </span>

          <div className="w-full mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Seu Nome:</span>
            <input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value.slice(0, 15))}
              placeholder="Seu nome ou apelido"
              className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white font-semibold focus:outline-none focus:border-cyan-500 max-w-[140px]"
            />
          </div>
        </div>

        {/* Share buttons grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          <button
            type="button"
            onClick={shareWhatsApp}
            className="py-2.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex flex-col items-center gap-1 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={shareTwitter}
            className="py-2.5 px-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 text-xs font-bold flex flex-col items-center gap-1 transition-all"
          >
            <Twitter className="w-4 h-4" />
            <span>X (Twitter)</span>
          </button>

          <button
            type="button"
            onClick={shareTelegram}
            className="py-2.5 px-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold flex flex-col items-center gap-1 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Telegram</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="py-2.5 px-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex flex-col items-center gap-1 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Mais Opções</span>
          </button>
        </div>

        {/* Copy Link Direct Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-2 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Link de Duelo Copiado!' : 'Copiar Link da Batalha'}</span>
        </button>
      </div>
    </div>
  );
};
