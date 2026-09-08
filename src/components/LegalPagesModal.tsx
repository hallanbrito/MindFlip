import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Cookie, Info } from 'lucide-react';
import { playClickTone } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'sobre' | 'privacidade' | 'cookies' | 'termos';
}

export const LegalPagesModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'sobre'
}) => {
  const [activeTab, setActiveTab] = useState<'sobre' | 'privacidade' | 'cookies' | 'termos'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#0b0e18] border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tab pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-800 scrollbar-thin">
          <button
            type="button"
            onClick={() => {
              playClickTone();
              setActiveTab('sobre');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'sobre'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Sobre o MindFlip</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTone();
              setActiveTab('privacidade');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'privacidade'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Política de Privacidade</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTone();
              setActiveTab('cookies');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'cookies'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookies</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClickTone();
              setActiveTab('termos');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'termos'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Termos de Uso</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
          {activeTab === 'sobre' && (
            <div>
              <h3 className="text-base font-bold text-white mb-2">Sobre o MindFlip</h3>
              <p>
                O <strong>MindFlip</strong> é um laboratório interativo de percepção humana, ilusões visuais e paradoxos cognitivos. Nosso objetivo é unir diversão rápida e viciante (no modelo de micro-jogos para feed) à divulgação científica rigorosa e acessível sobre como o cérebro humano decodifica a realidade.
              </p>
              <h4 className="text-white font-semibold mt-3">Compromisso com a Experiência do Usuário</h4>
              <p>
                Adotamos uma postura estrita de <strong>monetização ética</strong>: não utilizamos pop-ups invasivos, anúncios sonoros surpresa, botões falsos ("dark patterns") ou anúncios que interrompam a linha de visão durante um teste cronometrado. Os espaços publicitários possuem dimensões reservadas (zero CLS) e são claramente sinalizados.
              </p>
              <h4 className="text-white font-semibold mt-3">Aviso Legal & Disclaimer</h4>
              <p className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 text-xs">
                As experiências, testes cronometrados, pontuações e rankings contidos no MindFlip são destinados exclusivamente ao entretenimento e à curiosidade científica. Eles não representam testes clínicos oftalmológicos, avaliações neurocognitivas formais ou diagnósticos médicos.
              </p>
            </div>
          )}

          {activeTab === 'privacidade' && (
            <div>
              <h3 className="text-base font-bold text-white mb-2">Política de Privacidade</h3>
              <p>
                Sua privacidade é prioritária. O MindFlip foi arquitetado sob o princípio de <em>Privacy by Design</em>:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-400">
                <li><strong>Armazenamento Local:</strong> Seu progresso, pontuações, sequências de dias, recordes e preferências são gravados no armazenamento deste navegador (<code>localStorage</code>). O MindFlip não envia esses registros a um servidor próprio.</li>
                <li><strong>Sem Cadastro Obrigatório:</strong> Você pode usufruir de todas as 15 ilusões, modo laboratório e desafios diários sem necessidade de informar e-mail, telefone ou dados sensíveis.</li>
                <li><strong>Eventos técnicos:</strong> Eventos de interação usados pela interface permanecem temporariamente na memória da página e não são enviados a um serviço externo de analytics.</li>
                <li><strong>Compartilhamento:</strong> Ao escolher compartilhar um duelo, você envia voluntariamente o apelido, a ilusão e o tempo pelos aplicativos ou sites selecionados.</li>
              </ul>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div>
              <h3 className="text-base font-bold text-white mb-2">Política de Cookies & Tecnologias Similares</h3>
              <p>
                A versão atual não cria cookies próprios. Utilizamos <code>localStorage</code> para salvar preferências de acessibilidade, progresso e pontuação neste navegador.
              </p>
              <p className="mt-2 text-slate-400">
                Os espaços de publicidade exibidos são apenas demonstrativos. Não há parceiro publicitário nem serviço externo de analytics integrado nesta versão.
              </p>
            </div>
          )}

          {activeTab === 'termos' && (
            <div>
              <h3 className="text-base font-bold text-white mb-2">Termos de Uso</h3>
              <p>
                Ao acessar e utilizar o MindFlip, você concorda com as seguintes condições:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 mt-2 text-slate-400">
                <li>O serviço é fornecido de forma gratuita "como está", com fins lúdicos e educacionais.</li>
                <li>É vedada a cópia não autorizada da identidade visual, ilustrações autorais e códigos-fonte para exploração comercial predatória.</li>
                <li>Pessoas com fotossensibilidade extrema ou suscetibilidade a vertigens induzidas por movimento devem utilizar o botão de <strong>Movimento Reduzido</strong> presente nas configurações.</li>
              </ul>
            </div>
          )}
        </div>

        <div className="pt-3 mt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
