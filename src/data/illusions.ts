import { Illusion } from '../types';

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
    explanation: 'A animação não tem profundidade 2D: é uma projeção ortográfica plana sem pistas de oclusão ou sombra. Seu cérebro precisa adivinhar qual lado está na frente.',
    scienceExplanation: 'Este é um estímulo biestável: como a silhueta oferece poucas pistas de profundidade, ela admite mais de uma interpretação. Modelos científicos relacionam as alternâncias a processos sensoriais e cognitivos concorrentes.',
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
      'Pisque rapidamente para quebrar a dominância neural.'
    ],
    explanation: 'Como todas as arestas têm a mesma espessura e não há sombras, o desenho 2D contém duas representações 3D matematicamente idênticas.',
    scienceExplanation: 'Descrito por Louis Albert Necker em 1832, o desenho admite duas organizações espaciais. Competição, adaptação e atenção aparecem em modelos de percepção multiestável, sem que o site consiga medir diretamente esses mecanismos.',
    curiosity: 'O cérebro humano raramente aceita o cubo como um desenho plano de 12 linhas: ele insiste em transformá-lo num sólido tridimensional.',
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
    shortDescription: 'Dois rostos frente a frente ou um vaso sofisticado no centro? Seu cérebro não consegue ver ambos ao mesmo tempo.',
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
    explanation: 'A mesma linha de contorno serve como limite para a figura e para o fundo. O cérebro só pode atribuir a propriedade de "borda" a um dos lados por vez.',
    scienceExplanation: 'Popularizada por Edgar Rubin, a imagem demonstra a alternância figura-fundo: ora a região central é percebida como figura, ora os perfis laterais assumem esse papel.',
    curiosity: 'É praticamente impossível para a consciência humana processar simultaneamente as duas interpretações: elas operam em alternância competitiva.',
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
      'Seu cérebro compensa a sombra do cilindro e clareia o quadrado B.'
    ],
    explanation: 'O cérebro calcula a cor de um objeto descontando a sombra aparente. Como B está sob uma sombra projetada, o sistema visual assume que ele precisa ser um quadrado claro para refletir aquela quantidade de luz.',
    scienceExplanation: 'Criada pelo professor Edward Adelson no MIT em 1995, ilustra a constância de luminosidade. O sistema visual humano não mede fótons absolutos (como um fotômetro); ele mede relações de contraste local e deduz a iluminação tridimensional do ambiente.',
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
    scienceExplanation: 'O tamanho percebido do círculo central muda conforme o contexto ao redor. A explicação envolve processamento contextual de tamanho, e não uma medição direta feita por esta demonstração.',
    curiosity: 'Ilusões de tamanho relativo funcionam até no mundo real: colocar comida em pratos menores faz as pessoas sentirem que comeram mais.',
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
    scienceExplanation: 'Publicada por Franz Carl Müller-Lyer em 1889. Uma teoria clássica (Gregory, 1968) sugere que o cérebro interpreta as flechas abertas como cantos internos de uma sala (mais distantes) e as fechadas como cantos externos de um edifício (mais próximos), aplicando compensação de perspectiva.',
    curiosity: 'Povos que vivem em culturas sem arquitetura retilínea ou edifícios com quinas (como certas tribos em florestas) são muito menos suscetíveis a esta ilusão!',
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
    explanation: 'O contraste entre os blocos pretos e brancos desfasados engana os detectores de borda da retina, criando vetores de orientação falsos.',
    scienceExplanation: 'Descoberta numa parede de azulejos de um café em Bristol, Inglaterra, na década de 1970 por Richard Gregory. Ocorre devido a interações de luminância no córtex visual primário (células simples sensíveis a orientação), gerando pequenas assimetrias de brilho nas junções que o cérebro interpreta como inclinação.',
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
    explanation: 'Ao fixar o centro, os fotorreceptores periféricos se esgotam (efeito Troxler) e o cérebro substitui o espaço vazio pela cor complementar oposta: verde.',
    scienceExplanation: 'O efeito Troxler (1804) demonstra que estímulos invariantes na visão periférica são filtrados pelo sistema nervoso central como ruído de fundo. Quando a bolinha lilás apaga temporariamente, o pós-efeito negativo dos cones retinianos sensibiliza a percepção para o comprimento de onda verde complementar.',
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
    correctOrSurpriseAnswer: 'A imagem é 100% estática, mas os neurônios de movimento do seu cérebro estão em compensação reversa!',
    tips: [
      'Fixe os olhos no centro exato da espiral.',
      'Deixe a contagem regressiva de 15 segundos completar.',
      'Não desvie o olhar até a imagem estática aparecer.'
    ],
    explanation: 'A exposição prolongada a uma direção de movimento adapta o sistema visual. Ao olhar depois para uma imagem parada, o equilíbrio entre sinais de direções opostas pode produzir movimento aparente.',
    scienceExplanation: 'Documentado por Aristóteles e formalizado por Robert Addams em 1834 na Cachoeira de Foyers. A área cortical MT/V5 possui populações de neurônios sintonizados com direções de movimento específicas. A adaptação neural reduz a taxa de disparo espontânea das células estimuladas, gerando um desequilíbrio na leitura da rede neural.',
    curiosity: 'É o mesmo efeito neurológico que faz você sentir que o chão continua se movendo quando você desce de uma esteira ergométrica.',
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
    explanation: 'Bordas suaves com baixo gradiente de luminância são as primeiras a serem filtradas pelo cérebro quando não há movimento dos olhos.',
    scienceExplanation: 'As células ganglionares da retina respondem preferencialmente a mudanças no tempo e no espaço (derivadas temporais). Como os discos possuem bordas difusas e o olho é instruído a fixar, não há variação de sinal temporal na periferia, levando à cessação do impulso elétrico.',
    curiosity: 'Seus olhos usam esse mesmo mecanismo para apagar da sua visão os vasos sanguíneos que ficam na frente da sua própria retina!',
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
    shortDescription: 'Você tem um buraco real na sua visão onde o nervo óptico sai da retina. Descubra onde ele fica agora.',
    category: 'atencao',
    difficulty: 'Fácil',
    instructions: 'Feche ou cubra o olho esquerdo. Fixe o olho direito na cruz da esquerda. Aproxime ou afaste seu rosto da tela devagar. A bolinha da direita sumirá por completo!',
    interactionType: 'interactive_reveal',
    initialQuestion: 'A bolinha desapareceu a uma certa distância?',
    choices: ['Sim! Sumiu do nada!', 'Ainda não acertei a distância.'],
    correctOrSurpriseAnswer: 'No ponto cego, seu cérebro preenche o buraco com a cor de fundo cinza ao redor!',
    tips: [
      'Certifique-se de cobrir totalmente o olho esquerdo.',
      'Olhe apenas para a cruz (+), use a visão lateral para notar a bolinha (•).',
      'Aproxime a cabeça lentamente de cerca de 40 cm para 20 cm da tela.'
    ],
    explanation: 'No local onde o nervo óptico se conecta à retina, não existem cones nem bastonetes. O cérebro inventa o fundo para preencher a lacuna.',
    scienceExplanation: 'Descoberto pelo físico francês Edme Mariotte em 1668. O disco óptico (papila óptica) tem cerca de 1,5 mm de diâmetro e nenhuma célula fotorreceptora. O fenômeno de preenchimento ("perceptual filling-in") no córtex visual substitui ativamente a região ausente com a textura circundante.',
    curiosity: 'Mariotte usava essa ilusão na corte do rei Luís XIV da França para fazer a cabeça das pessoas "desaparecerem" visualmente por diversão!',
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
      'A fadiga dos cones vermelho-azul gera a resposta das cores opostas.'
    ],
    explanation: 'Os receptores de cores na retina se cansam de processar as cores falsas. Quando você olha para uma tela branca (que reflete todas as cores), os receptores descansados respondem com força.',
    scienceExplanation: 'Baseia-se na teoria do processo oponente de Ewald Hering. Os circuitos neurais visuais codificam cores em pares antagônicos: vermelho versus verde, azul versus amarelo, preto versus branco. A adaptação temporária de um canal desbalanceia o sinal para a cor oposta.',
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
    curiosity: 'Crianças que ainda não aprenderam a ler completam esse teste muito mais rápido do que adultos com diploma universitário!',
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
    scienceExplanation: 'Criada pelo psicólogo italiano Gaetano Kanizsa em 1955. Evidencia contornos ilusórios (ou modais). Neurônios da área visual V2 respondem a esses contornos virtuais como se fossem linhas físicas reais com contraste de luminância.',
    curiosity: 'Animais caçadores e primatas também enxergam contornos ilusórios: isso ajudava nossos ancestrais a detectar predadores camuflados na selva.',
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
    correctOrSurpriseAnswer: 'Sua fóvea central tem campos receptivos minúsculos que não criam a inibição lateral que gera a mancha!',
    tips: [
      'Mantenha o olhar no centro e repare nas manchas piscando na visão lateral.',
      'Tente fixar o olhar exatamente onde uma mancha cinza apareceu.',
      'Aproxime e afaste os olhos para mudar o espaçamento relativo.'
    ],
    explanation: 'Nas interseções, há quatro faixas brancas vizinhas causando inibição lateral nos fotorreceptores. No centro da sua visão (fóvea), a resolução é alta e o efeito desaparece.',
    scienceExplanation: 'Descoberta por Ludimar Hermann em 1870. O modelo clássico explica o fenômeno por campos receptivos concêntricos (centro-periferia) de células ganglionares na retina. A maior quantidade de luz ao redor nas encruzilhadas inibe a resposta do centro receptor.',
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
