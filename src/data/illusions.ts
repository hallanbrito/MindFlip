import type { Illusion } from '../types.ts';

export const ILLUSIONS_DATA: Illusion[] = [
  {
    id: 'rotacao-ambigua',
    slug: 'rotacao-ambigua',
    title: 'Rotação Ambígua',
    subtitle: 'A Bailarina Cinética',
    shortDescription: 'Para qual direção essa silhueta está girando? Tente forçar seu cérebro a inverter o sentido.',
    category: 'movimento',
    difficulty: 'Médio',
    instructions: 'Observe a figura girando. Decida para qual lado ela parece girar. Em seguida, acione o cronômetro e force seu cérebro a vê-la girando no sentido oposto.',
    interactionType: 'flip_timer',
    initialQuestion: 'Para que lado ela está girando agora?',
    choices: ['Sentido Horário ↻', 'Sentido Anti-horário ↺'],
    flipPrompt: 'Agora tente fazê-la girar para o OUTRO lado apenas com a sua mente.',
    tips: [
      'Olhe fixamente para a base ou para a ponta do pé em movimento.',
      'Relaxe o foco dos olhos e tente piscar repetidamente.',
      'Imagine que a perna em rotação está passando por trás em vez de pela frente.',
      'Incline a cabeça levemente para alterar o ângulo perceptual.'
    ],
    explanation: 'A silhueta é uma projeção 2D com pistas insuficientes para definir qual parte está à frente. Por isso, a mesma animação admite duas direções aparentes de rotação.',
    scienceExplanation: 'Este é um estímulo biestável: a imagem física permanece igual enquanto a percepção pode alternar. Estudos com a silhueta giratória encontraram influência da intenção, do ponto de fixação e da velocidade sobre a frequência das alternâncias, sem transformar o fenômeno em medida de capacidade mental.',
    curiosity: 'A direção percebida pode mudar mesmo quando a animação permanece exatamente igual.',
    shareText: 'Consegui inverter a rotação ambígua da silhueta! Você consegue virar a percepção do seu cérebro no MindFlip?',
    motionWarning: true,
    labControls: [
      { id: 'speed', label: 'Velocidade', min: 0.5, max: 2.5, step: 0.1, defaultValue: 1, unit: 'x' },
      { id: 'guidelines', label: 'Pistas Visuais de Eixo', min: 0, max: 1, step: 1, defaultValue: 0 },
      { id: 'contrast', label: 'Opacidade do Rastro', min: 0, max: 1, step: 0.1, defaultValue: 0.2 }
    ]
  },
  {
    id: 'cubo-de-necker',
    slug: 'cubo-de-necker',
    title: 'Cubo de Necker',
    subtitle: 'A Geometria Impossível de 1832',
    shortDescription: 'Qual face quadrada está na frente? Uma hora parece vista de baixo, outra vista de cima.',
    category: 'profundidade',
    difficulty: 'Fácil',
    instructions: 'Fixe os olhos no centro do cubo. Tente alternar qual das duas faces quadradas você interpreta como a frontal.',
    interactionType: 'flip_timer',
    initialQuestion: 'Qual face parece estar voltada para você?',
    choices: ['Face Inferior Esquerda', 'Face Superior Direita'],
    flipPrompt: 'Concentre-se e inverta a perspectiva frontal com a mente!',
    tips: [
      'Concentre o olhar em um dos vértices centrais.',
      'Pense mentalmente: "estou olhando este cubo por baixo" e depois "por cima".',
      'Desvie brevemente o olhar e retorne a outro vértice do desenho.'
    ],
    explanation: 'Como o desenho não informa de modo decisivo quais arestas estão à frente, ele permite duas organizações tridimensionais coerentes.',
    scienceExplanation: 'Necker descreveu a reversão em 1832. Hoje o cubo é usado no estudo da percepção multiestável, para a qual existem modelos envolvendo competição, adaptação e influências da atenção. O MindFlip registra apenas a alternância relatada pelo usuário.',
    curiosity: 'Mesmo com o desenho imóvel, a face que parece estar na frente pode mudar ao longo da observação.',
    shareText: 'Acabei de alternar o Cubo de Necker no MindFlip! Consegue inverter sua percepção mais rápido que eu?',
    labControls: [
      { id: 'perspective', label: 'Distância Focal', min: 300, max: 1200, step: 50, defaultValue: 600, unit: 'px' },
      { id: 'rotation', label: 'Ângulo de Vista', min: -45, max: 45, step: 1, defaultValue: 15, unit: '°' },
      { id: 'highlight', label: 'Destacar Face Frontal', min: 0, max: 1, step: 1, defaultValue: 0 }
    ]
  },
  {
    id: 'vaso-de-rubin',
    slug: 'vaso-de-rubin',
    title: 'Vaso de Rubin',
    subtitle: 'Figura e Fundo em Guerra',
    shortDescription: 'Dois rostos frente a frente ou um vaso no centro? A mesma borda permite duas organizações de figura e fundo.',
    category: 'rostos',
    difficulty: 'Fácil',
    instructions: 'Observe a imagem. Identifique o que você viu primeiro. Depois, tente alternar a percepção entre os dois perfis e o vaso central.',
    interactionType: 'flip_timer',
    initialQuestion: 'O que você identificou primeiro?',
    choices: ['Dois Rostos de Perfil', 'O Vaso Central'],
    flipPrompt: 'Agora alterne entre ver o vaso e ver os rostos no menor tempo possível!',
    tips: [
      'Para ver o vaso, foque na simetria branca/luminosa central.',
      'Para ver os rostos, foque nos contornos pretos laterais como se fossem silhuetas humanas.',
      'Perceba como a mesma linha de contorno pertence a apenas uma das figuras por vez.'
    ],
    explanation: 'A mesma borda delimita tanto a região central quanto os perfis laterais. Conforme a borda é atribuída a um lado ou ao outro, muda o que se destaca como figura.',
    scienceExplanation: 'O estímulo faces-vaso é usado para estudar segregação figura-fundo. A entrada visual permanece constante, mas a região percebida como figura pode alternar entre o vaso central e os perfis.',
    curiosity: 'As duas formas continuam desenhadas ao mesmo tempo, embora normalmente uma delas se destaque como figura em cada momento.',
    shareText: 'Você vê rostos ou vaso? Testei minha percepção no MindFlip!',
    labControls: [
      { id: 'contrast', label: 'Contraste Figura-Fundo', min: 0.2, max: 1, step: 0.1, defaultValue: 1 },
      { id: 'invert', label: 'Inverter Cores', min: 0, max: 1, step: 1, defaultValue: 0 }
    ]
  },
  {
    id: 'checker-shadow',
    slug: 'checker-shadow',
    title: 'Sombra no Tabuleiro (Adelson)',
    subtitle: 'A Ilusão de Cor Mais Impressionante',
    shortDescription: 'O quadrado A e o quadrado B têm exatamente a mesma cor cinza. O cérebro se recusa a acreditar até você verificar!',
    category: 'cores',
    difficulty: 'Difícil',
    instructions: 'Observe os quadrados marcados com A e B. Eles parecem ter tons completamente diferentes de cinza? Arraste o conector de cor para conectá-los diretamente.',
    interactionType: 'interactive_reveal',
    initialQuestion: 'O quadrado A parece mais escuro que o quadrado B?',
    choices: ['Sim, A é muito mais escuro!', 'Não, parecem iguais.'],
    correctOrSurpriseAnswer: 'Ambos têm exatamente o mesmo valor RGB #787878! Arraste a ponte de cor para comprovar.',
    tips: [
      'Cubra com o dedo tudo ao redor de A e B, deixando apenas os centros visíveis.',
      'Use o controle interativo de "Ponte de Conexão" para ligar os dois quadrados.',
      'O contexto de sombra contribui para que o quadrado B pareça mais claro.'
    ],
    explanation: 'A aparência de cada quadrado depende do contraste ao redor e da interpretação da sombra projetada. Assim, regiões com a mesma luminância na imagem podem parecer diferentes.',
    scienceExplanation: 'A demonstração publicada por Edward Adelson em 1995 evidencia que a percepção de luminosidade considera relações locais e a organização aparente da cena. Ela não funciona como uma leitura direta e isolada do valor de cada pixel.',
    curiosity: 'Mesmo depois de saber a verdade científica e medir com conta-gotas de pixel, quando a imagem completa é mostrada novamente, seu cérebro volta a vê-los diferentes.',
    shareText: 'Juro que o quadrado A e o B parecem diferentes, mas têm a MESMA cor! Teste o Checker Shadow no MindFlip.',
    labControls: [
      { id: 'bridgeWidth', label: 'Largura da Ponte de Comparação', min: 0, max: 100, step: 1, defaultValue: 0, unit: '%' },
      { id: 'removeShadow', label: 'Remover Sombra do Cilindro', min: 0, max: 1, step: 1, defaultValue: 0 }
    ]
  },
  {
    id: 'circulos-de-ebbinghaus',
    slug: 'circulos-de-ebbinghaus',
    title: 'Círculos de Ebbinghaus',
    subtitle: 'O Tamanho Relativo Engana',
    shortDescription: 'Qual dos círculos centrais laranjas é maior? O contexto ao redor altera radicalmente seu julgamento.',
    category: 'formas',
    difficulty: 'Fácil',
    instructions: 'Compare os dois círculos centrais coloridos. Escolha qual parece maior. Depois, ative o alinhamento para sobrepô-los.',
    interactionType: 'interactive_reveal',
    initialQuestion: 'Qual círculo central é maior?',
    choices: ['O cercado por círculos pequenos', 'O cercado por círculos gigantes', 'Eles têm o mesmo tamanho'],
    correctOrSurpriseAnswer: 'Os dois círculos centrais têm diâmetro rigorosamente idêntico!',
    tips: [
      'Ignore os círculos externos e meça apenas a área interna.',
      'Use o botão de revelar guias para sobrepor os círculos centrais.',
      'Perceba como o contraste de tamanho induz um erro de escala.'
    ],
    explanation: 'Um objeto idêntico parece menor quando cercado por objetos grandes e maior quando cercado por objetos pequenos.',
    scienceExplanation: 'Experimentos mostram que o tamanho aparente do alvo depende de mais de um aspecto da configuração, especialmente do tamanho relativo e da distância dos círculos ao redor. Por isso, não há uma única regra de contraste que explique todas as variantes.',
    curiosity: 'Alterar a distância entre o círculo central e os círculos externos pode aumentar, reduzir ou até mudar o sentido do efeito.',
    shareText: 'Caí na ilusão dos Círculos de Ebbinghaus no MindFlip! O contexto engana nossos olhos completamente.',
    labControls: [
      { id: 'surroundSize', label: 'Tamanho dos Círculos Externos', min: 0.2, max: 2, step: 0.1, defaultValue: 1 },
      { id: 'showGuides', label: 'Linhas Guias de Calibre', min: 0, max: 1, step: 1, defaultValue: 0 }
    ]
  },
  {
    id: 'muller-lyer',
    slug: 'muller-lyer',
    title: 'Ilusão de Müller-Lyer',
    subtitle: 'Flechas e Comprimento',
    shortDescription: 'Duas linhas do mesmo tamanho. Uma tem pontas de flecha para fora, outra para dentro. Qual parece mais longa?',
    category: 'formas',
    difficulty: 'Fácil',
    instructions: 'Observe as duas hastes horizontais. Uma parece significativamente mais longa? Pressione o botão para sobrepor réguas milimétricas.',
    interactionType: 'interactive_reveal',
    initialQuestion: 'Qual segmento horizontal parece mais comprido?',
    choices: ['A linha com pontas abertas (<—>)', 'A linha com pontas fechadas (>—<)', 'São exatamente iguais'],
    correctOrSurpriseAnswer: 'As duas linhas retas têm exatamente o mesmo comprimento em pixels!',
    tips: [
      'Tape as pontas das flechas com dois dedos e olhe só a linha central.',
      'Ative a régua para ver as linhas guia perfeitamente alinhadas.',
      'Observe como o espaço delimitado pelas asas influencia a percepção do todo.'
    ],
    explanation: 'As pontas voltadas para fora fazem o cérebro estender a extensão visual da linha, enquanto as pontas para dentro criam um estreitamento perceptivo.',
    scienceExplanation: 'A ilusão é conhecida desde o século XIX, mas seu mecanismo permanece debatido. Um estudo de Howe e Purves mostrou que o efeito pode ser previsto pelas probabilidades das fontes físicas que costumam produzir configurações semelhantes nas imagens naturais.',
    curiosity: 'A intensidade do efeito varia com o ângulo e o comprimento das terminações, além da forma usada para comparar as linhas.',
    shareText: 'A Ilusão de Müller-Lyer é clássica, mas ainda engana qualquer um! Teste no MindFlip.',
    labControls: [
      { id: 'arrowAngle', label: 'Ângulo das Flechas', min: 15, max: 75, step: 5, defaultValue: 45, unit: '°' },
      { id: 'rulerGuide', label: 'Régua de Medição', min: 0, max: 1, step: 1, defaultValue: 0 }
    ]
  },
  {
    id: 'cafe-wall',
    slug: 'cafe-wall',
    title: 'Parede de Café (Café Wall)',
    subtitle: 'As Linhas Que Parecem Tortas',
    shortDescription: 'As linhas horizontais cinzas são absolutamente retas e paralelas entre si. Por que parecem inclinadas?',
    category: 'formas',
    difficulty: 'Médio',
    instructions: 'Olhe para as divisórias horizontais entre as fileiras de blocos pretos e brancos. Elas parecem inclinadas e em zigue-zague? Ligue as guias retas para comprovar.',
    interactionType: 'interactive_reveal',
    initialQuestion: 'As linhas horizontais parecem tortas ou inclinadas?',
    choices: ['Parecem bastante inclinadas!', 'Parecem perfeitamente paralelas.'],
    correctOrSurpriseAnswer: 'Todas as linhas cinzas são 100% retas e paralelas!',
    tips: [
      'Alinhe uma régua ou a borda de uma folha de papel na tela.',
      'Afaste-se da tela cerca de 1 metro para reduzir a distorção local.',
      'Ative as linhas vermelhas de referência para conferir.'
    ],
    explanation: 'O deslocamento entre blocos claros e escuros, separado por faixas de luminância intermediária, produz pequenas mudanças locais que fazem as divisórias paralelas parecerem inclinadas.',
    scienceExplanation: 'Gregory e Heard estudaram a configuração em 1979 e propuseram o mecanismo de “travamento de bordas”: bordas de luminância vizinhas, separadas por uma faixa estreita, podem ser registradas com deslocamentos aparentes. É um modelo explicativo, não uma medição neural feita por esta página.',
    curiosity: 'A organização alternada dos blocos é suficiente para mudar a orientação aparente das linhas paralelas.',
    shareText: 'Linhas 100% retas que parecem completamente tortas na Parede de Café do MindFlip! Tente você mesmo.',
    labControls: [
      { id: 'offset', label: 'Deslocamento dos Azulejos', min: 0, max: 50, step: 5, defaultValue: 25, unit: 'px' },
      { id: 'mortarWidth', label: 'Espessura da Argamassa', min: 1, max: 8, step: 1, defaultValue: 3, unit: 'px' },
      { id: 'showGuides', label: 'Guias Retas Transparentes', min: 0, max: 1, step: 1, defaultValue: 0 }
    ]
  },
  {
    id: 'lilac-chaser',
    slug: 'lilac-chaser',
    title: 'Lilac Chaser (O Pac-Man Verde)',
    subtitle: 'O Fenômeno de Troxler',
    shortDescription: 'Fixe o olhar na cruz central sem piscar por 10 segundos. Os círculos lilás vão desaparecer e um ponto verde surgirá!',
    category: 'atencao',
    difficulty: 'Médio',
    instructions: 'Mantenha os olhos absolutamente parados na cruz preta central por pelo menos 10 segundos. Repare o que acontece com as bolinhas lilás.',
    interactionType: 'fixation_timer',
    initialQuestion: 'O que aconteceu após 10 segundos de foco fixo?',
    choices: ['Os pontos lilás sumiram e vi um ponto verde!', 'Ainda vi todos os pontos normalmente.'],
    correctOrSurpriseAnswer: 'Os pontos lilás somem da percepção e uma luz verde complementar percorre o círculo!',
    tips: [
      'Não mova os olhos para as bolinhas: fixe estritamente o centro da cruz.',
      'Relaxe as pálpebras sem piscar durante a contagem.',
      'A visão periférica se adapta a estímulos estáticos e os apaga.'
    ],
    explanation: 'Durante a fixação, os pontos periféricos podem perder visibilidade por adaptação. A sequência de lacunas em movimento e a pós-imagem de cor contribuem para a aparência de um ponto esverdeado circulando.',
    scienceExplanation: 'Estudos relacionam o desvanecimento durante fixação à adaptação e mostram que microssacadas ajudam a restaurar a visibilidade. As pós-imagens de cor começam com sinais gerados na retina e podem ser modificadas por processamento cortical; a demonstração combina esses fenômenos.',
    curiosity: 'Mesmo durante a fixação, os olhos realizam pequenos movimentos involuntários que influenciam a visibilidade de estímulos estáticos.',
    shareText: 'Fiz pontos desaparecerem e vi um feixe verde correr com a mente no Lilac Chaser do MindFlip!',
    motionWarning: true,
    labControls: [
      { id: 'speed', label: 'Velocidade de Rotação', min: 50, max: 300, step: 10, defaultValue: 120, unit: 'ms' },
      { id: 'dotCount', label: 'Número de Pontos', min: 8, max: 16, step: 1, defaultValue: 12 }
    ]
  },
  {
    id: 'pos-efeito-movimento',
    slug: 'pos-efeito-movimento',
    title: 'Pós-Efeito de Movimento (Cachoeira)',
    subtitle: 'A Realidade Derretendo',
    shortDescription: 'Olhe para a espiral em rotação contínua por 15 segundos. Quando ela parar, a tela inteira parecerá se expandir ou derreter!',
    category: 'movimento',
    difficulty: 'Médio',
    instructions: 'Fixe o olhar no ponto central da espiral giratória por 15 segundos. Ao fim do cronômetro, olhe para a imagem estática que aparecerá.',
    interactionType: 'fixation_timer',
    initialQuestion: 'A imagem estática pareceu se mover ou respirar?',
    choices: ['Sim! Pareceu expandir/ondular sozinha!', 'Não senti nenhum movimento posterior.'],
    correctOrSurpriseAnswer: 'A imagem de teste está estática, mas a adaptação ao movimento anterior pode produzir movimento aparente na direção oposta!',
    tips: [
      'Fixe os olhos no centro exato da espiral.',
      'Deixe a contagem regressiva de 15 segundos completar.',
      'Não desvie o olhar até a imagem estática aparecer.'
    ],
    explanation: 'A exposição prolongada a uma direção de movimento adapta o sistema visual. Ao olhar depois para uma imagem parada, o equilíbrio entre sinais de direções opostas pode produzir movimento aparente.',
    scienceExplanation: 'O pós-efeito de movimento é uma ilusão robusta após exposição a um padrão móvel. Revisões indicam que a adaptação relacionada ao efeito ocorre em múltiplos níveis do processamento visual, e não em uma única área ou população de neurônios.',
    curiosity: 'O efeito pode mudar conforme o tipo, a velocidade e a duração do movimento usado na adaptação.',
    shareText: 'A imagem estática começou a se mover e respirar na minha frente no MindFlip! Que loucura neurológica.',
    motionWarning: true,
    labControls: [
      { id: 'spiralSpeed', label: 'Velocidade da Espiral', min: 1, max: 5, step: 0.5, defaultValue: 2.5 },
      { id: 'direction', label: 'Sentido do Movimento', min: -1, max: 1, step: 2, defaultValue: 1 }
    ]
  },
  {
    id: 'desvanecimento-periferico',
    slug: 'desvanecimento-periferico',
    title: 'Desvanecimento Periférico',
    subtitle: 'Apagando o Mundo com o Foco',
    shortDescription: 'Mantenha os olhos travados no ponto central. Em poucos segundos, as manchas coloridas ao redor vão sumir completamente.',
    category: 'visao_periferica',
    difficulty: 'Fácil',
    instructions: 'Fixe o olhar no ponto preto central. Não mova os olhos nem um milímetro. Em cerca de 6 a 8 segundos, as nuvens de cor suaves ao redor desaparecerão.',
    interactionType: 'fixation_timer',
    initialQuestion: 'As nuvens de cor sumiram enquanto você focava?',
    choices: ['Sim, a tela ficou quase cinza lisa!', 'Não, continuaram visíveis.'],
    tips: [
      'Mantenha a distância de um braço da tela.',
      'Olhe estritamente para o ponto central sem espiar as bordas.',
      'Se você mover os olhos mesmo que um milímetro, as cores voltam instantaneamente.'
    ],
    explanation: 'Alvos periféricos pouco contrastantes e quase imóveis na retina podem perder visibilidade durante uma fixação prolongada.',
    scienceExplanation: 'O desvanecimento envolve adaptação durante a fixação. Os olhos nunca ficam perfeitamente parados: microssacadas e deriva alteram a imagem retinal e podem recuperar a visibilidade. O resultado depende do contraste, da excentricidade e das condições de observação.',
    curiosity: 'Pequenos movimentos oculares involuntários podem fazer as manchas reaparecerem sem que você perceba ter movido os olhos.',
    shareText: 'Fiz objetos reais sumirem da minha visão só parando os olhos no MindFlip. Muito impressionante.',
    labControls: [
      { id: 'blurAmount', label: 'Difusão das Bordas', min: 5, max: 35, step: 5, defaultValue: 20, unit: 'px' },
      { id: 'opacity', label: 'Intensidade das Cores', min: 0.2, max: 1, step: 0.1, defaultValue: 0.6 }
    ]
  },
  {
    id: 'ponto-cego',
    slug: 'ponto-cego',
    title: 'O Ponto Cego da Retina',
    subtitle: 'O Buraco Invisível nos Seus Olhos',
    shortDescription: 'Existe uma região sem fotorreceptores onde o nervo óptico deixa a retina. Descubra como ela afeta esta demonstração.',
    category: 'atencao',
    difficulty: 'Fácil',
    instructions: 'Feche ou cubra o olho esquerdo. Fixe o olho direito na cruz da esquerda. Aproxime ou afaste seu rosto da tela devagar. A bolinha da direita sumirá por completo!',
    interactionType: 'interactive_reveal',
    initialQuestion: 'A bolinha desapareceu a uma certa distância?',
    choices: ['Sim! Sumiu do nada!', 'Ainda não acertei a distância.'],
    correctOrSurpriseAnswer: 'Quando o alvo coincide com o ponto cego, a região pode ser percebida de acordo com o fundo ao redor.',
    tips: [
      'Certifique-se de cobrir totalmente o olho esquerdo.',
      'Olhe apenas para a cruz (+), use a visão lateral para notar a bolinha (•).',
      'Aproxime a cabeça lentamente de cerca de 40 cm para 20 cm da tela.'
    ],
    explanation: 'O disco óptico não possui cones nem bastonetes. Quando o alvo incide nessa região, a percepção pode completar a área usando propriedades visuais do entorno.',
    scienceExplanation: 'O preenchimento perceptivo descreve situações em que cor, brilho, textura ou movimento são percebidos numa região sem informação retinal correspondente. Há evidências de participação de áreas visuais iniciais, mas os mecanismos exatos ainda são estudados.',
    curiosity: 'Normalmente não percebemos uma lacuna porque os pontos cegos dos dois olhos ficam em posições diferentes e a percepção integra o contexto disponível.',
    shareText: 'Acabei de encontrar o buraco cego do meu próprio olho no MindFlip! Muito legal.',
    labControls: [
      { id: 'targetDistance', label: 'Distância entre Ícones', min: 100, max: 350, step: 10, defaultValue: 220, unit: 'px' },
      { id: 'dotSize', label: 'Tamanho do Alvo', min: 12, max: 40, step: 2, defaultValue: 24, unit: 'px' }
    ]
  },
  {
    id: 'cores-complementares',
    slug: 'cores-complementares',
    title: 'Cores Complementares (Pós-Imagem)',
    subtitle: 'A Bandeira Fantasma',
    shortDescription: 'Olhe para o ponto no centro da bandeira com cores estranhas por 15 segundos. Quando ela mudar para branco, a bandeira correta surgirá!',
    category: 'cores',
    difficulty: 'Fácil',
    instructions: 'Fixe o ponto central da bandeira em cores invertidas por 15 segundos sem desviar. Ao soar o bipe, a tela ficará branca e você verá as cores verdadeiras.',
    interactionType: 'fixation_timer',
    initialQuestion: 'Você viu a bandeira com as cores originais no fundo branco?',
    choices: ['Sim! As cores normais surgiram perfeitamente!', 'Não vi a pós-imagem com nitidez.'],
    correctOrSurpriseAnswer: 'Seu cérebro projetou as cores complementares (verde, amarelo e azul) na tela branca!',
    tips: [
      'Fixe os olhos exatamente no ponto branco central.',
      'Tente piscar suavemente sobre a tela branca quando o tempo acabar.',
      'A adaptação aos estímulos coloridos contribui para a pós-imagem complementar.'
    ],
    explanation: 'Após a adaptação a um padrão colorido, olhar para uma área clara pode produzir por alguns instantes uma pós-imagem com cores aproximadamente complementares.',
    scienceExplanation: 'Experimentos indicam que os sinais de pós-imagem de cor são gerados inicialmente na retina e podem ser modificados por processos corticais. A aparência final depende tanto da adaptação quanto do contexto apresentado depois.',
    curiosity: 'Pós-imagens também podem aparecer depois de observar por algum tempo outros contrastes fortes de cor.',
    shareText: 'Meu cérebro pintou uma bandeira no branco do nada no MindFlip! Impressionante.',
    labControls: [
      { id: 'timerDuration', label: 'Tempo de Fixação', min: 8, max: 25, step: 1, defaultValue: 15, unit: 's' }
    ]
  },
  {
    id: 'stroop-challenge',
    slug: 'stroop-challenge',
    title: 'Desafio Stroop (Conflito Cognitivo)',
    subtitle: 'A Guerra entre Leitura e Cor',
    shortDescription: 'O teste clássico de tempo de reação: clique na COR em que a palavra está escrita, e NÃO no que a palavra diz!',
    category: 'tempo_reacao',
    difficulty: 'Difícil',
    instructions: 'Aparecerá o nome de uma cor escrito com uma tinta diferente. Seu objetivo é clicar no botão da COR DA FONTE o mais rápido possível.',
    interactionType: 'reaction_test',
    initialQuestion: 'Quantos acertos você consegue fazer em 5 rodadas rápidas?',
    choices: ['Iniciar Teste Stroop'],
    tips: [
      'Tente desfocar levemente a leitura da palavra para enxergar apenas o pigmento.',
      'Seu cérebro lê palavras automaticamente antes de você conseguir nomear a cor.',
      'Mantenha os dedos posicionados sobre os botões de resposta rápida.'
    ],
    explanation: 'A leitura é um processo automático supertreinado pelo cérebro, enquanto a nomeação de cor exige atenção consciente (processamento controlado).',
    scienceExplanation: 'O efeito foi estudado por John Ridley Stroop em 1935. A demora adicional na condição incongruente é usada em pesquisa para estudar interferência, mas este minijogo não é um teste neuropsicológico validado.',
    curiosity: 'A interferência é estudada comparando condições congruentes e incongruentes sob procedimentos controlados; uma pontuação isolada deste minijogo não permite essa inferência.',
    shareText: 'Tentei vencer o Desafio Stroop no MindFlip e meu cérebro travou completamente! Tente bater meu tempo.',
    labControls: [
      { id: 'roundCount', label: 'Quantidade de Rodadas', min: 3, max: 10, step: 1, defaultValue: 5 }
    ]
  },
  {
    id: 'triangulo-de-kanizsa',
    slug: 'triangulo-de-kanizsa',
    title: 'Triângulo de Kanizsa',
    subtitle: 'Contornos Fantasmas',
    shortDescription: 'Você vê um triângulo branco brilhante no centro? Na realidade, não existe nenhuma linha desenhada ali!',
    category: 'formas',
    difficulty: 'Fácil',
    instructions: 'Observe a figura. Você percebe um triângulo branco sobreposto, aparentemente mais brilhante que o fundo branco ao redor? Gire os discos para ver o triângulo sumir.',
    interactionType: 'interactive_reveal',
    initialQuestion: 'O triângulo central parece mais branco e brilhante que o fundo?',
    choices: ['Sim, parece mais brilhante e delimitado!', 'Não, vejo apenas 3 círculos cortados.'],
    correctOrSurpriseAnswer: 'Não há triângulo desenhado: seu cérebro cria as bordas imaginárias para fazer sentido da cena!',
    tips: [
      'Gire os círculos cortados ("Pac-Mans") no controle do laboratório.',
      'Observe como a ilusão de brilho desaparece no momento em que as bocas se desalinham.',
      'O cérebro prefere assumir que há um objeto bloqueando a visão.'
    ],
    explanation: 'O cérebro deduz a existência de uma forma geométrica frontal que oclui três círculos pretos, inventando as linhas de contorno.',
    scienceExplanation: 'A configuração evidencia contornos ilusórios: percebemos uma borda sem contraste físico contínuo naquele local. Em um estudo com macacos, neurônios da área visual 18 responderam a esses contornos, oferecendo uma evidência neural do processamento do fenômeno.',
    curiosity: 'A sensação de contorno enfraquece quando a orientação dos discos deixa de sugerir uma superfície que os encobre.',
    shareText: 'Meu cérebro inventou um triângulo luminoso onde não tem nada no MindFlip! Venha conferir.',
    labControls: [
      { id: 'pacmanRotation', label: 'Alinhamento dos Discos', min: 0, max: 180, step: 5, defaultValue: 0, unit: '°' },
      { id: 'showVirtualLines', label: 'Desenhar Arestas Reais', min: 0, max: 1, step: 1, defaultValue: 0 }
    ]
  },
  {
    id: 'grade-de-hermann',
    slug: 'grade-de-hermann',
    title: 'Grade de Hermann',
    subtitle: 'Os Pontos Cinzas Fantasmas',
    shortDescription: 'Pontos cinzas fantasmas aparecem nas interseções brancas. Mas quando você olha diretamente para um deles, ele desaparece!',
    category: 'atencao',
    difficulty: 'Fácil',
    instructions: 'Olhe para a grade de quadrados pretos. Repare nas manchas cinzas que piscam nas interseções brancas. Tente olhar diretamente para uma mancha.',
    interactionType: 'interactive_reveal',
    initialQuestion: 'Os pontos cinzas somem quando você olha diretamente para eles?',
    choices: ['Sim! Quando olho direto, a mancha some!', 'Não notei as manchas cinzas.'],
    correctOrSurpriseAnswer: 'As manchas dependem da configuração e costumam enfraquecer quando a interseção é observada diretamente.',
    tips: [
      'Mantenha o olhar no centro e repare nas manchas piscando na visão lateral.',
      'Tente fixar o olhar exatamente onde uma mancha cinza apareceu.',
      'Aproxime e afaste os olhos para mudar o espaçamento relativo.'
    ],
    explanation: 'A grade pode produzir manchas aparentes nas interseções vistas perifericamente. O efeito muda com a geometria, a orientação, o contraste e a posição do olhar.',
    scienceExplanation: 'A explicação clássica atribuía o efeito apenas a campos receptivos centro-periferia na retina. Experimentos posteriores mostraram que esse modelo isolado é insuficiente; Schiller e Carvey propuseram participação de mecanismos corticais sensíveis à orientação.',
    curiosity: 'O efeito pode mudar quando o tamanho da grade, o contraste ou a posição do olhar são alterados.',
    shareText: 'Tentei caçar os pontos fantasmas na Grade de Hermann do MindFlip e eles somem na hora! Muito divertido.',
    labControls: [
      { id: 'gridSize', label: 'Quantidade de Quadrados', min: 3, max: 8, step: 1, defaultValue: 5 },
      { id: 'gutterWidth', label: 'Largura dos Corredores', min: 8, max: 32, step: 2, defaultValue: 16, unit: 'px' }
    ]
  }
];

export const CATEGORIES_LIST = [
  { id: 'todos', name: 'Todos', icon: 'Sparkles', count: ILLUSIONS_DATA.length, description: 'Explore o catálogo completo de fenômenos perceptivos' },
  { id: 'movimento', name: 'Movimento', icon: 'RotateCw', count: 2, description: 'Rotações biestáveis e pós-efeitos cinéticos' },
  { id: 'profundidade', name: 'Profundidade', icon: 'Box', count: 2, description: 'Ambiguidade 3D e reconstrução espacial' },
  { id: 'cores', name: 'Cores', icon: 'Palette', count: 3, description: 'Constância de iluminação e pós-imagens de cones' },
  { id: 'formas', name: 'Formas', icon: 'Maximize2', count: 4, description: 'Contraste de tamanho e contornos imaginários' },
  { id: 'atencao', name: 'Atenção & Visão', icon: 'Eye', count: 3, description: 'Troxler, ponto cego e inibição foveal' },
  { id: 'tempo_reacao', name: 'Tempo de Reação', icon: 'Zap', count: 1, description: 'Conflito cognitivo e controle inibitório' }
];

export function getDailyChallenge(): { illusion: Illusion; goal: string; timeLimit: number } {
  // Stable daily illusion based on day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % ILLUSIONS_DATA.length;
  const illusion = ILLUSIONS_DATA[index];

  return {
    illusion,
    goal: illusion.interactionType === 'flip_timer' 
      ? 'Inverta a rotação/perspectiva em menos de 6.0 segundos' 
      : 'Resolva o desafio e compreenda o fenômeno perceptual',
    timeLimit: 6.0
  };
}
