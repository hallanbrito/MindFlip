import React, { useState } from 'react';
import { BookOpen, Brain, Sparkles, HelpCircle, ChevronDown } from 'lucide-react';
import { playClickTone } from '../utils/audio';

interface Article {
  id: string;
  title: string;
  snippet: string;
  readTime: string;
  content: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    id: 'percepcao-biestavel',
    title: 'O que são Ilusões Biestáveis e Por Que o Cérebro Inverte a Imagem?',
    snippet: 'Entenda como estímulos ambíguos podem sustentar mais de uma interpretação perceptiva.',
    readTime: '4 min de leitura',
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          As <strong>ilusões biestáveis</strong> (ou multiestáveis) são estímulos visuais que possuem duas ou mais interpretações geométricas ou figurativas válidas e mutuamente exclusivas. Exemplos clássicos incluem a Bailarina Giratória (Silhueta Ambígua), o Cubo de Necker e o Vaso de Rubin.
        </p>
        <h4 className="text-white font-bold text-sm sm:text-base mt-2">Como o Cérebro Processa a Ambiguidade?</h4>
        <p>
          A imagem que chega aos olhos é bidimensional, e o sistema visual combina pistas do estímulo com contexto e experiência para formar uma interpretação perceptiva.
        </p>
        <p>
          Quando faltam pistas capazes de definir uma única interpretação, como na silhueta giratória, a percepção pode alternar mesmo que o estímulo permaneça igual. Processos sensoriais e cognitivos participam dessas mudanças.
        </p>
        <h4 className="text-white font-bold text-sm sm:text-base mt-2">Como os modelos explicam a inversão</h4>
        <p>
          Modelos científicos incluem competição entre interpretações, adaptação e variações espontâneas da atividade neural. Esses mecanismos ajudam a explicar as alternâncias, mas não permitem atribuir cada inversão a uma única causa observável pelo site.
        </p>
        <p>
          No MindFlip, o “flip” registra apenas o relato do usuário de que sua percepção mudou; ele não mede diretamente atividade cerebral.
        </p>
        <p className="text-[11px] text-slate-400">
          Fonte: <a className="text-cyan-400 underline" href="https://pubmed.ncbi.nlm.nih.gov/32612780/" target="_blank" rel="noreferrer">revisão sobre percepção biestável</a>.
        </p>
      </div>
    )
  },
  {
    id: 'desvanecimento-troxler',
    title: 'O Efeito Troxler: Por Que Cores e Formas Desaparecem Quando Fixamos os Olhos?',
    snippet: 'Entenda por que um alvo periférico pouco variável pode perder visibilidade durante a fixação.',
    readTime: '3 min de leitura',
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          O <strong>desvanecimento de Troxler</strong> descreve a redução de visibilidade que alguns alvos periféricos podem apresentar durante a fixação prolongada. O resultado varia com contraste, tamanho, distância do ponto fixado e movimentos dos olhos.
        </p>
        <h4 className="text-white font-bold text-sm sm:text-base mt-2">Adaptação Sensorial e Micro-movimentos Oculares</h4>
        <p>
          Mesmo quando tentamos manter os olhos parados, ocorrem pequenos movimentos involuntários, incluindo microssacadas e deriva ocular. Eles alteram a imagem na retina e podem ajudar a recuperar a visibilidade de estímulos que estavam desaparecendo.
        </p>
        <p>
          A relação entre movimentos oculares, adaptação e desvanecimento é estudada experimentalmente e não se resume a uma frequência fixa ou a um único tipo de movimento.
        </p>
        <p className="text-[11px] text-slate-400">
          Fonte: <a className="text-cyan-400 underline" href="https://pubmed.ncbi.nlm.nih.gov/16423702/" target="_blank" rel="noreferrer">estudo sobre microssacadas e desvanecimento visual</a>.
        </p>
      </div>
    )
  },
  {
    id: 'efeito-stroop',
    title: 'O Efeito Stroop e a Guerra Entre a Leitura Automática e o Controle Inibitório',
    snippet: 'Por que é mais difícil nomear a tinta quando a palavra apresenta uma cor diferente?',
    readTime: '3 min de leitura',
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          Publicado em 1935 pelo psicólogo John Ridley Stroop, o teste demonstra a interferência entre processos cognitivos automáticos e deliberados.
        </p>
        <p>
          Para leitores fluentes, reconhecer palavras é uma tarefa muito praticada. Quando o significado da palavra entra em conflito com a cor da tinta, essa informação concorrente pode tornar a nomeação da cor mais lenta e sujeita a erros.
        </p>
        <p>
          Em experimentos controlados, a diferença entre condições congruentes e incongruentes é usada para estudar interferência. O minijogo do MindFlip não é um instrumento neuropsicológico validado e sua pontuação não deve ser interpretada clinicamente.
        </p>
        <p className="text-[11px] text-slate-400">
          Fonte: <a className="text-cyan-400 underline" href="https://doi.org/10.1037/h0054651" target="_blank" rel="noreferrer">artigo original de Stroop (1935)</a>.
        </p>
      </div>
    )
  }
];

const FAQS = [
  {
    q: 'As ilusões ópticas indicam algum problema de visão?',
    a: 'Uma ilusão isolada não confirma nem descarta um problema de visão. A experiência varia entre pessoas e condições de visualização. Mudanças visuais persistentes ou preocupantes devem ser avaliadas por um profissional de saúde.'
  },
  {
    q: 'Por que algumas pessoas conseguem inverter a rotação mais rápido que outras?',
    a: 'O tempo pode variar conforme o estímulo, a atenção, a experiência e as condições de visualização. O cronômetro do MindFlip é apenas uma mecânica lúdica e não mede flexibilidade cognitiva.'
  },
  {
    q: 'O MindFlip é um teste psicológico ou médico?',
    a: 'Não. O MindFlip é uma plataforma de divulgação científica, exploração lúdica e entretenimento. Nenhuma métrica aqui substitui avaliação clínica de oftalmologistas ou neuropsicólogos.'
  },
  {
    q: 'Como o MindFlip protege meus dados e privacidade?',
    a: 'Progresso, recordes, conquistas e preferências ficam no localStorage deste navegador. Eventos técnicos permanecem temporariamente na memória da página. Ao compartilhar um duelo, os dados do convite seguem para o serviço escolhido por você.'
  }
];

export const ArticlesView: React.FC = () => {
  const [openArticleId, setOpenArticleId] = useState<string>('percepcao-biestavel');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Divulgação Científica & Neurociência</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          A Ciência por Trás do MindFlip
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-1">
          Explicações introdutórias, com fontes, sobre percepção visual e interferência cognitiva.
        </p>
      </div>

      {/* Articles Accordion */}
      <div className="space-y-4 mb-12">
        {ARTICLES.map(art => {
          const isOpen = openArticleId === art.id;
          return (
            <div
              key={art.id}
              className="rounded-2xl bg-[#0a0d16] border border-slate-800 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => {
                  playClickTone();
                  setOpenArticleId(isOpen ? '' : art.id);
                }}
                className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left hover:bg-slate-900/60 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 mb-1">
                    <Brain className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {art.snippet}
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                    isOpen ? 'transform rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 sm:p-6 pt-2 border-t border-slate-800/80 bg-slate-950/40 animate-fade-in">
                  {art.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="rounded-3xl bg-[#0b0e18] border border-slate-800 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Perguntas Frequentes sobre Ilusões & Percepção (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-800/80 overflow-hidden bg-slate-900/60"
              >
                <button
                  type="button"
                  onClick={() => {
                    playClickTone();
                    setOpenFaqIndex(isOpen ? null : i);
                  }}
                  className="w-full p-3.5 flex items-center justify-between gap-3 text-left text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'transform rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
