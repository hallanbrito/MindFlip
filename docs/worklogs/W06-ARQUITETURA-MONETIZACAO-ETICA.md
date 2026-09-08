# W06 — Arquitetura de Monetização Ética do MindFlip

Status: aprovado pelo Product Owner e autorizado para integração  
Tipo: arquitetura e documentação  
Data: 2026-09-08

## Registro de Aceitação

- Decisão humana: **aprovado** por Hallan, Product Owner.
- Autorização de integração: concedida pela manifestação literal **Autorizado** em 2026-09-08.
- Escopo autorizado: integrar exclusivamente a W06 pela Draft PR #6, sem iniciar a W07.
- Método de integração: squash merge.
- Deployment e exclusão da branch: não autorizados.

## 1. Intenção

Definir como o MindFlip poderá gerar receita com publicidade sem prejudicar privacidade, acessibilidade, desempenho, integridade científica ou continuidade dos desafios.

A W06 transforma os guardrails gerais da Fundação C.H. em uma arquitetura verificável. Ela não ativa anúncios reais.

## 2. Contexto e prioridade

Após a W05, a próxima fatia recomendada no repositório era “Build Reproduzível e Verificação Contínua Mínima”. O Product Owner priorizou explicitamente a monetização, tema presente desde a concepção inicial e ainda não implementado.

Pela ordem de fontes da Fundação C.H., a autorização humana mais recente altera a prioridade. A CI mínima permanece candidata futura e não foi executada nesta fatia.

## 3. Baseline

- Repositório: `hallanbrito/MindFlip`
- Branch-base: `main`
- Commit-base: `98bebf9352247b2455f89f3f2aa849bedcef315a`
- Branch de trabalho: `docs/w06-arquitetura-monetizacao-etica`
- Responsável humano: Hallan
- Nível de autonomia: `CH-2 — Executar isolado`
- Autorização de execução: manifestação literal **Aprovado** em 2026-09-08
- Integração: autorizada exclusivamente pela Draft PR #6

No commit-base:

- W01 a W05 estavam integradas à `main`;
- `AdSlot.tsx` implementava somente um placeholder identificado;
- `FeedView.tsx` exibia esse placeholder após o cartão de desafio;
- não existia SDK, script ou parceiro publicitário;
- não existia transmissão externa de analytics;
- os textos legais declaravam que os espaços publicitários eram demonstrativos;
- a W05 havia removido dependências e capacidades sem consumidor, sem alterar `src/`.

## 4. Contrato de Execução

### Objetivo e valor esperado

Criar uma fonte de verdade arquitetural que permita avaliar e implementar monetização em fatias futuras, mantendo receita subordinada à experiência, à privacidade e à decisão humana.

### Escopo incluído

- formalizar princípios e limites de monetização;
- definir componentes conceituais de política, consentimento, adaptador, slot e eventos;
- separar experiência, parceiro e medição;
- classificar posicionamentos permitidos, proibidos e não priorizados;
- definir estados, falhas seguras e kill switch;
- registrar requisitos de privacidade, desempenho, acessibilidade e segurança;
- estabelecer critérios para selecionar o primeiro parceiro;
- recomendar o recorte de uma integração piloto futura;
- tornar a arquitetura encontrável pelo README;
- registrar contrato e evidências da W06.

### Exclusões

Esta fatia não autoriza:

- alteração em `src/`, CSS, HTML, configuração ou dependências;
- integração de Google AdSense ou qualquer outro parceiro;
- criação de conta, unidade publicitária ou identificador de publicação;
- cookies, rastreamento ou transmissão externa;
- banner ou mecanismo funcional de consentimento;
- analytics externo;
- alteração visual ou comportamental de `AdSlot`;
- promessa de receita;
- afirmação de conformidade jurídica;
- deployment, publicação ou merge;
- implementação da W07 ou da CI recomendada pela W05.

### Decisões aprovadas

- arquitetura documental e neutra em relação a fornecedor;
- preferência inicial pelo modo de menor coleta, contextual ou não personalizado;
- fronteira única por adaptador de provedor;
- gate separado para política e consentimento;
- publicidade fora da área perceptiva ativa;
- falha do parceiro sem impacto no desafio;
- desligamento central;
- um único posicionamento como piloto futuro;
- revisão obrigatória de textos legais antes de qualquer integração real.

### Decisões proibidas

- acesso condicionado a anúncio;
- intersticial obrigatório;
- anúncio dentro de ilusão ou tentativa;
- botão falso, bloqueio de saída, áudio surpresa ou dark pattern;
- segmentação baseada em desempenho, saúde ou suposta capacidade cognitiva;
- acoplamento direto de SDK aos componentes de experiência;
- segredo no cliente;
- ativação silenciosa de coleta;
- escolha de parceiro apenas por receita estimada.

### Arquivos autorizados

- `docs/01-ARQUITETURA-MONETIZACAO.md`;
- `docs/worklogs/W06-ARQUITETURA-MONETIZACAO-ETICA.md`;
- `README.md`, somente para navegação documental.

### Ferramentas e acessos

- leitura do repositório;
- Git e GitHub;
- branch isolada;
- commits e Draft PR;
- sem merge ou deployment.

### Critérios de aceitação

- [x] O estado atual é diferenciado da arquitetura futura.
- [x] A documentação não afirma que publicidade real está ativa.
- [x] Existe fronteira entre produto e provedor.
- [x] Política, consentimento, slot, adaptador e eventos possuem responsabilidades separadas.
- [x] Posicionamentos permitidos e proibidos estão explícitos.
- [x] Área da ilusão, tentativa cronometrada e intersticiais estão proibidos.
- [x] Falhas do provedor não bloqueiam a experiência.
- [x] Existe requisito arquitetural de kill switch.
- [x] Privacidade, acessibilidade, desempenho e segurança possuem gates próprios.
- [x] A seleção do primeiro parceiro exige critérios além de receita.
- [x] A próxima integração está recortada como piloto independente.
- [x] Nenhum arquivo executável foi alterado.
- [x] Nenhum parceiro, script, cookie, identificador ou rastreamento foi adicionado.

### Verificações obrigatórias

- comparar branch com o commit-base;
- confirmar que somente Markdown foi alterado;
- conferir links e caminhos;
- revisar consistência com `AGENTS.md`, Fundação, README e comportamento observado;
- conferir ausência de linguagem que apresente arquitetura como funcionalidade ativa;
- executar checagem de diff disponível no GitHub.

### Condição de parada

Parar e retornar ao Product Owner se a arquitetura exigir escolha de parceiro, interpretação jurídica definitiva, coleta real, credencial, custo, código executável, publicação ou ampliação material de escopo.

### Reversão

Antes do merge, fechar a Draft PR e abandonar a branch mantém a `main` inalterada. Depois de eventual integração autorizada, a mudança poderá ser revertida como documentação, sem migração de dados ou infraestrutura.

## 5. Execução pelo ciclo CHAVE

- **C — Contextualizar:** baseline, histórico W01–W05, Fundação, regras do repositório, placeholder, feed, analytics e textos legais foram examinados.
- **H — Harmonizar:** o contrato documental foi apresentado e aprovado pelo Product Owner; integração real, parceiro e coleta foram excluídos.
- **A — Agir:** a arquitetura, este worklog e a navegação documental foram produzidos na branch isolada.
- **V — Verificar:** diff, escopo, caminhos, consistência normativa e ausência de arquivos executáveis foram conferidos.
- **E — Evoluir:** a Draft PR #6 constitui o Pedido de Integração; o aceite humano e a autorização literal foram registrados, permitindo o squash merge sem iniciar a W07.

## 6. Implementação documental

### Arquitetura

`docs/01-ARQUITETURA-MONETIZACAO.md` define:

- princípios éticos e limites obrigatórios;
- `MonetizationPolicy`;
- `ConsentGate`;
- `AdProviderAdapter`;
- responsabilidades futuras de `AdSlot`;
- separação de `MonetizationEvents`;
- fluxo de decisão antes de carregar parceiro;
- matriz de posicionamentos;
- estados de execução e falha segura;
- requisitos de dados, desempenho, acessibilidade e segurança;
- critérios de seleção de parceiro;
- sequência recomendada para o piloto.

### Navegação

O README passa a apontar para a arquitetura normativa, sem anunciar integração inexistente.

## 7. Arquivos alterados

- `docs/01-ARQUITETURA-MONETIZACAO.md` — novo;
- `docs/worklogs/W06-ARQUITETURA-MONETIZACAO-ETICA.md` — novo;
- `README.md` — link para a arquitetura.

Nenhum arquivo executável ou de configuração foi alterado.

## 8. Pacote de Evidências

### Verificado

- `main` observada no commit-base declarado;
- ausência de parceiro e tráfego publicitário no estado de referência;
- placeholder identificado em `AdSlot.tsx`;
- uso do placeholder após o desafio em `FeedView.tsx`;
- analytics mantido somente em memória em `src/utils/analytics.ts`;
- textos legais coerentes com a ausência de anúncios reais;
- criação dos documentos somente na branch de trabalho;
- comparação final da branch com o commit-base;
- revisão dos caminhos e do escopo documental;
- nenhum segredo, SDK, cookie, rastreamento, parceiro ou funcionalidade adicionado.

### Não executado por não se aplicar

- lint, testes e build: nenhum arquivo executável, de dependência ou configuração foi alterado;
- revisão visual: nenhuma interface foi alterada;
- teste com provedor: nenhum provedor foi integrado;
- verificação jurídica: a arquitetura não declara conformidade legal;
- deployment: não autorizado.

## 9. Riscos e limitações

- o parceiro ainda não foi escolhido;
- requisitos concretos de consentimento dependem das tecnologias e jurisdições do piloto;
- acessibilidade de criativos externos depende também dos controles oferecidos pelo parceiro;
- orçamento numérico de desempenho deve ser definido com a integração mensurável;
- a arquitetura, sozinha, não produz receita;
- o placeholder atual continua demonstrativo.

## 10. Itens fora do escopo

- integração real de publicidade;
- conta ou aprovação em rede publicitária;
- CMP ou banner de consentimento;
- analytics e painel financeiro;
- estimativa de receita;
- alteração de posicionamentos;
- CI/CD;
- deployment;
- exclusão de branches anteriores.

## 11. Próxima fatia recomendada

**W07 — Integração Publicitária Piloto**

Objetivo recomendado: validar um único parceiro e o posicionamento `between_challenges`, começando pelo modo de menor coleta compatível, com adaptador, gate, kill switch, atualização legal e evidências de privacidade, acessibilidade e desempenho.

A W07 não está autorizada por este documento.

## 12. Estado final

**Aprovado pelo Product Owner e autorizado para integração.** O squash merge da PR #6 incorpora a W06 à `main`; nenhum deployment, integração publicitária real, início da W07 ou exclusão da branch foi autorizado.
