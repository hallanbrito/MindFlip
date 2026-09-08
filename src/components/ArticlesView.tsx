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
    snippet: 'Entenda como o córtex visual lida com ambiguidades visuais através da inibição recíproca entre populações de neurônios.',
    readTime: '4 min de leitura',
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          As <strong>ilusões biestáveis</strong> (ou multiestáveis) são estímulos visuais que possuem duas ou mais interpretações geométricas ou figurativas válidas e mutuamente exclusivas. Exemplos clássicos incluem a Bailarina Giratória (Silhueta Ambígua), o Cubo de Necker e o Vaso de Rubin.
        </p>
        <h4 className="text-white font-bold text-sm sm:text-base mt-2">Como o Cérebro Processa a Ambiguidade?</h4>
        <p>
          A retina humana captura apenas um mosaico bidimensional de fótons que chegam ao olho. Cabe ao córtex visual primário (V1) e às áreas de processamento de ordem superior reconstruir um modelo tridimensional plausível do mundo externo.
        </p>
        <p>
          Quando a imagem não contém pistas de oclusão ou sombreamento suficientes para descartar uma das direções (como na silhueta preta giratória), duas populações neurais concorrentes entram em jogo. A primeira população codifica a rotação horária; a segunda, anti-horária.
        </p>
        <h4 className="text-white font-bold text-sm sm:text-base mt-2">O Fenômeno da Fadiga Neural e a Inversão</h4>
        <p>
          Enquanto você observa o estímulo girando para a direita, os neurônios responsáveis por essa interpretação disparam ativamente e inibem os neurônios rivais (inibição mútua). No entanto, após alguns segundos, esses neurônios sofrem <em>adaptação neural</em> (ou fadiga sináptica).
        </p>
        <p>
          Com o declínio gradual de sua taxa de disparo, a inibição sobre a população concorrente diminui, permitindo que a segunda hipótese assuma a consciência. É exatamente nesse instante que você experimenta o "flip" mental!
        </p>
      </div>
    )
  },
  {
    id: 'desvanecimento-troxler',
    title: 'O Efeito Troxler: Por Que Cores e Formas Desaparecem Quando Fixamos os Olhos?',
    snippet: 'Descubra a razão evolutiva pela qual o sistema visual humano ignora estímulos perfeitamente constantes no campo periférico.',
    readTime: '3 min de leitura',
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          Descoberto em 1804 pelo médico suíço Ignaz Paul Vital Troxler, o <strong>desvanecimento de Troxler</strong> demonstra que qualquer estímulo visual estático localizado na retina periférica tende a desaparecer da percepção consciente se o observador mantiver a fixação rigorosa em um único ponto.
        </p>
        <h4 className="text-white font-bold text-sm sm:text-base mt-2">Adaptação Sensorial e Micro-movimentos Oculares</h4>
        <p>
          Os fotorreceptores e as células ganglionares da retina são detectores de variação: eles evoluíram para sinalizar mudanças no ambiente (movimento de predadores, presas, luzes cambiantes).
        </p>
        <p>
          Na visão central (fóvea), nossos olhos realizam involuntariamente milhares de minúsculos tremores por segundo chamados <em>microssacadas</em>. Essas microssacadas mantêm os cones foveais em constante renovação de sinal. Na periferia retiniana, porém, onde o campo receptivo de cada neurônio é muito mais amplo, as microssacadas não são suficientes para alterar o padrão de fótons: o estímulo estático é considerado ruído constante e "apagado" pelo cérebro, que preenche a lacuna com a cor do fundo.
        </p>
      </div>
    )
  },
  {
    id: 'efeito-stroop',
    title: 'O Efeito Stroop e a Guerra Entre a Leitura Automática e o Controle Inibitório',
    snippet: 'Por que é tão difícil nomear a cor da tinta quando a palavra escrita diz outra cor? A neurociência do córtex pré-frontal.',
    readTime: '3 min de leitura',
    content: (
      <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          Publicado em 1935 pelo psicólogo John Ridley Stroop, o teste demonstra a interferência entre processos cognitivos automáticos e deliberados.
        </p>
        <p>
          Para uma pessoa alfabetizada, ler é um processo altamente automatizado e involuntário: ao ver as letras "A-Z-U-L", o cérebro decodifica o significado semântico em frações de segundo. Já identificar conscientemente a cor física do pigmento (tinta) exige esforço voluntário do córtex pré-frontal dorsolateral e do córtex cingulado anterior.
        </p>
        <p>
          A diferença de tempo entre a condição congruente (a palavra "AZUL" escrita em azul) e a condição incongruente ("AZUL" em vermelho) mede o custo temporal da inibição cognitiva.
        </p>
      </div>
    )
  }
];

const FAQS = [
  {
    q: 'As ilusões ópticas indicam algum problema de visão?',
    a: 'Não! Pelo contrário: as ilusões ópticas funcionam exatamente porque seu sistema visual e cérebro são saudáveis e aplicam atalhos evolutivos eficientes para interpretar luz, sombras e profundidade.'
  },
  {
    q: 'Por que algumas pessoas conseguem inverter a rotação mais rápido que outras?',
    a: 'O tempo de inversão varia de acordo com a flexibilidade cognitiva, a taxa natural de microssacadas oculares, a atenção voluntária e a prática. Com o tempo, é possível treinar a alternância consciente.'
  },
  {
    q: 'O MindFlip é um teste psicológico ou médico?',
    a: 'Não. O MindFlip é uma plataforma de divulgação científica, exploração lúdica e entretenimento. Nenhuma métrica aqui substitui avaliação clínica de oftalmologistas ou neuropsicólogos.'
  },
  {
    q: 'Como o MindFlip protege meus dados e privacidade?',
    a: '100% do seu progresso, recordes e conquistas são salvos estritamente no armazenamento local do seu navegador (localStorage). Não realizamos rastreamento invasivo nem venda de dados pessoais.'
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
          Artigos aprofundados sobre como seu córtex visual, retina e cognição constroem a realidade a cada milissegundo.
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
