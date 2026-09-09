# Arquitetura de Monetização Ética do MindFlip

Status: normativa proposta pela W06  
Versão: 1.0  
Fatia de origem: W06  
Produto: MindFlip

## 1. Propósito

Este documento define a arquitetura e os limites para futura monetização do MindFlip. O objetivo econômico é sustentar a experiência gratuita sem transformar atenção, vulnerabilidade perceptiva ou dados pessoais em mecanismos de pressão.

A arquitetura não ativa publicidade, não seleciona um parceiro e não afirma conformidade jurídica. Qualquer integração real exige nova Fatia W, autorização do Product Owner e revisão proporcional de privacidade, acessibilidade, desempenho e segurança.

## 2. Estado de referência

Na baseline da W06:

- `AdSlot` é somente um espaço visual demonstrativo;
- o feed exibe um slot reservado após o cartão de desafio;
- nenhum SDK, script ou parceiro publicitário está integrado;
- nenhum cookie publicitário é criado;
- eventos técnicos permanecem em memória e não são transmitidos;
- os textos legais informam corretamente que os espaços são demonstrativos.

A presença de um `AdSlot` não prova veiculação, impressão, receita ou consentimento.

## 3. Princípios

1. **Publicidade reconhecível:** todo anúncio deve ser identificado como “Publicidade” antes da peça.
2. **Experiência primeiro:** publicidade não interrompe tentativa, cronômetro, animação, áudio ou explicação essencial.
3. **Privacidade por padrão:** nenhuma transmissão publicitária ocorre antes de a base aplicável estar definida e refletida na interface e nos textos publicados.
4. **Mínimo necessário:** começar pela alternativa de menor coleta, preferindo publicidade contextual ou não personalizada.
5. **Acessibilidade preservada:** anúncio não pode capturar foco indevidamente, depender apenas de cor, produzir áudio inesperado ou desrespeitar movimento reduzido.
6. **Falha segura:** indisponibilidade, bloqueio ou lentidão do provedor não impede o uso do MindFlip.
7. **Reversibilidade:** toda integração deve possuir desligamento central e poder ser removida sem alterar as experiências.
8. **Separação editorial:** parceiro comercial não interfere em explicações científicas, resultados ou ordenação das experiências.
9. **Verdade operacional:** política, interface e comportamento real devem descrever a mesma coleta.
10. **Controle humano:** parceiro, formato, finalidade de dados e publicação exigem decisão explícita do Product Owner.

## 4. Limites obrigatórios

### 4.1 Permitido em princípio

- slot entre desafios, após a experiência ativa;
- slot entre blocos editoriais de artigos;
- slot estático no rodapé, sem sobreposição;
- conteúdo patrocinado futuro, desde que rotulado e separado do conteúdo científico;
- publicidade contextual ou não personalizada como ponto de partida;
- espaço vazio ou mensagem institucional quando anúncios estiverem desativados.

“Permitido em princípio” não autoriza implementação. Cada uso ainda precisa de Fatia W própria e evidência.

### 4.2 Proibido

- anúncio dentro da área perceptiva ativa;
- anúncio durante cronômetro, tentativa ou reprodução de áudio;
- intersticial obrigatório para continuar;
- pop-up publicitário, autoplay sonoro ou vibração;
- anúncio que imite botão, resultado, desafio, alerta ou navegação;
- botão de fechar oculto, atraso artificial ou bloqueio de saída;
- recompensa condicionada a interpretação de saúde, inteligência ou capacidade mental;
- segmentação baseada em pontuação, tempo, suposta habilidade cognitiva ou inferência de saúde;
- venda ou compartilhamento silencioso de progresso e preferências;
- publicidade que altere explicações científicas ou ranking;
- carregamento de parceiro não aprovado;
- segredo, chave privada ou credencial no cliente.

## 5. Componentes conceituais

### 5.1 `MonetizationPolicy`

Fonte central das regras de ativação. Deve representar, no mínimo:

- publicidade globalmente habilitada ou desabilitada;
- posicionamentos autorizados;
- modo demonstrativo, contextual/não personalizado ou personalizado;
- estado de consentimento quando aplicável;
- provedor autorizado;
- versão da política;
- kill switch.

Valores seguros devem prevalecer quando configuração estiver ausente ou inválida.

### 5.2 `ConsentGate`

Decide se uma solicitação externa pode ocorrer. O gate não presume consentimento, não transforma navegação em aceite e não usa recusa como punição.

A implementação futura deverá distinguir:

- recursos estritamente necessários;
- armazenamento local funcional;
- medição opcional;
- publicidade contextual ou não personalizada;
- publicidade personalizada, se algum dia for aprovada.

As categorias não devem ser agrupadas artificialmente. A necessidade exata de consentimento e os textos correspondentes dependerão do parceiro, das tecnologias usadas e das jurisdições atendidas.

### 5.3 `AdProviderAdapter`

Fronteira única entre o produto e o parceiro. Componentes de experiência não importam SDK publicitário diretamente.

Responsabilidades esperadas:

- iniciar o provedor somente após liberação da política;
- receber um identificador lógico de posicionamento;
- converter falhas em estado vazio seguro;
- impedir carregamento duplicado;
- disponibilizar desligamento e descarte;
- não expor detalhes do provedor aos componentes de domínio.

O adaptador não decide consentimento, conteúdo editorial nem posição visual.

### 5.4 `AdSlot`

Componente de apresentação responsável por:

- reservar dimensões antes do carregamento;
- informar semanticamente que a região contém publicidade;
- exibir estado demonstrativo, bloqueado, vazio, carregando ou preenchido;
- manter conteúdo essencial acessível quando o anúncio falhar;
- nunca sobrepor controles ou a ilusão.

O slot não carrega scripts por conta própria e não contém identificadores secretos.

### 5.5 `MonetizationEvents`

Caso medição seja autorizada futuramente, eventos de monetização ficam separados dos eventos lúdicos. O catálogo mínimo deverá evitar conteúdo sensível e identificadores desnecessários.

Não devem ser emitidos eventos que relacionem publicidade a:

- tempo individual de resolução;
- erro ou acerto;
- suposta capacidade cognitiva;
- condição médica;
- preferência de acessibilidade;
- conteúdo digitado pelo usuário.

## 6. Fluxo de decisão

1. Carregar uma política local segura.
2. Confirmar que publicidade está globalmente habilitada.
3. Confirmar que o posicionamento foi autorizado.
4. Avaliar o estado exigido pelo `ConsentGate`.
5. Somente então inicializar o `AdProviderAdapter`.
6. Solicitar a peça para o posicionamento lógico.
7. Em erro, bloqueio ou timeout, manter o slot vazio sem prejudicar a experiência.
8. Registrar apenas eventos previamente aprovados.
9. Permitir desligamento central sem modificar as experiências.

Nenhuma etapa posterior compensa a ausência de uma etapa anterior.

## 7. Posicionamentos

| Posicionamento lógico | Situação | Condição |
|---|---|---|
| `between_challenges` | Candidato inicial | Somente após o encerramento da experiência ativa |
| `article_inline` | Permitido futuramente | Entre blocos, sem quebrar citação ou raciocínio |
| `footer` | Permitido futuramente | Estático, sem sobreposição ou perseguição |
| `top` | Não priorizado | Exige evidência de que não compete com a ação principal |
| `sidebar` | Não priorizado | Apenas em viewport compatível e sem reduzir legibilidade |
| área da ilusão | Proibido | Sem exceção |
| tentativa cronometrada | Proibido | Sem exceção |
| modal de resultado | Proibido inicialmente | Requer decisão futura específica |
| intersticial/tela cheia | Proibido | Sem exceção |

## 8. Estados e falhas

O sistema futuro deve tratar explicitamente:

- `disabled`: publicidade desligada;
- `demo`: placeholder sem rede;
- `blocked`: política ou consentimento impedem carregamento;
- `loading`: espaço reservado aguardando resposta;
- `filled`: peça carregada;
- `empty`: parceiro não retornou peça;
- `failed`: erro ou timeout.

`empty` e `failed` não podem gerar repetição agressiva, mudança de layout, mensagem culpabilizadora ou bloqueio de navegação.

## 9. Privacidade e dados

Antes de integrar um parceiro, a Fatia W correspondente deve registrar:

- domínios e scripts carregados;
- cookies, armazenamento e identificadores utilizados;
- dados transmitidos e finalidades;
- retenção conhecida;
- terceiros envolvidos;
- modo de consentir, recusar e revisar escolhas;
- efeito real da recusa;
- forma de revogar a autorização;
- atualização necessária nos textos publicados.

A política exibida nunca pode afirmar “sem cookies”, “somente local” ou “sem transmissão” quando o comportamento real contrariar essas frases.

## 10. Desempenho

A futura integração deve definir orçamento verificável antes da ativação. No mínimo:

- dimensão reservada para evitar deslocamento cumulativo;
- carregamento assíncrono e posterior ao conteúdo essencial;
- timeout e recuperação;
- nenhuma dependência do provedor para renderizar o desafio;
- avaliação de peso transferido e impacto nos indicadores de experiência;
- teste em viewport móvel e rede limitada.

Nenhum número de desempenho deve ser prometido sem medição reproduzível.

## 11. Acessibilidade e segurança perceptiva

A verificação futura deve incluir:

- nome acessível da região publicitária;
- ordem de foco previsível;
- ausência de armadilha de teclado;
- foco não transferido automaticamente;
- contraste do rótulo “Publicidade”;
- zoom e reflow;
- movimento reduzido;
- ausência de flashes e áudio inesperado;
- alternativa segura quando o criativo do parceiro violar requisitos.

Criativos externos não recebem confiança automática. Devem existir política de formatos, bloqueio e canal de revisão do parceiro.

## 12. Segurança e configuração

- identificadores públicos de slot devem ficar separados de segredos;
- segredos nunca entram no repositório ou bundle;
- configuração inválida mantém publicidade desativada;
- Content Security Policy e domínios autorizados devem ser avaliados na integração;
- URLs e mensagens recebidas do parceiro não podem ser tratadas como conteúdo confiável;
- o kill switch deve funcionar sem alteração de componentes de experiência;
- ambientes de desenvolvimento e teste usam adaptador falso, não tráfego real.

## 13. Seleção do primeiro parceiro

A escolha exige evidência comparável sobre:

- suporte a publicidade contextual ou não personalizada;
- controles de privacidade e consentimento;
- documentação técnica;
- formatos e capacidade de bloqueio;
- acessibilidade conhecida;
- peso e comportamento dos scripts;
- cobertura geográfica;
- requisitos de elegibilidade;
- transparência de relatórios e pagamentos;
- facilidade de desligamento e remoção.

Receita estimada isoladamente não decide a escolha.

## 14. Sequência de evolução

### W07 candidata — Integração Publicitária Piloto

Escopo recomendado:

- um parceiro aprovado;
- somente `between_challenges`;
- modo de menor coleta compatível;
- configuração e kill switch;
- adaptador falso para testes;
- atualização dos textos legais;
- verificações de acessibilidade, privacidade e desempenho;
- nenhum deployment sem autorização própria.

### Fatias posteriores possíveis

- medição econômica do piloto;
- posicionamento editorial em artigos;
- painel de configuração;
- conteúdo patrocinado;
- revisão ou substituição do parceiro.

Cada possibilidade exige contrato independente.

## 15. Critérios arquiteturais para implementação

Uma integração só estará pronta para agir quando:

- parceiro e modo publicitário estiverem aprovados;
- fluxo de dados estiver documentado;
- necessidade de consentimento estiver definida;
- textos legais propostos corresponderem ao comportamento;
- posicionamento estiver autorizado;
- orçamento de desempenho estiver declarado;
- critérios de acessibilidade estiverem testáveis;
- kill switch e estratégia de reversão estiverem especificados;
- credenciais e configuração tiverem destino seguro;
- ambiente de teste não depender de tráfego real.

## 16. Decisão da W06

O MindFlip adota uma arquitetura intermediada, reversível e com falha segura. Publicidade real não faz parte do núcleo das experiências e não pode ser condição para acesso aos desafios.

Esta decisão substitui a ausência de arquitetura, mas não ativa monetização nem escolhe fornecedor.

## 17. Implementação piloto da W07

A W07 seleciona o Google AdSense como primeiro adaptador, restrito a anúncios não personalizados no posicionamento `between_challenges`. O piloto permanece desligado por padrão e falha fechado enquanto não existirem configuração válida, aprovação externa e escolha positiva do usuário.

A seleção do adaptador não autoriza deployment nem substitui a configuração de privacidade e mensagens exigida pelo parceiro. IDs de publisher e slot são identificadores públicos; nenhum segredo é aceito no cliente.
