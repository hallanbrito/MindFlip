# W02 — Correções Críticas de Conformidade do MindFlip

Status: pronto para revisão  
Tipo: correção e conformidade  
Data: 2026-09-08

## 1. Intenção e valor esperado

Corrigir violações críticas dos guardrails da Fundação C.H. sem adicionar funcionalidades, ampliar a arquitetura ou publicar a aplicação. O valor esperado é tornar as afirmações públicas compatíveis com o comportamento observado, reduzir riscos de entrada não confiável e fazer a preferência de movimento reduzido alcançar as experiências relevantes.

## 2. Reconciliação da identificação

A W01 previa a W02 como uma auditoria sem correções. A auditoria ocorreu fora da Memória Versionada e o Product Owner redefiniu explicitamente esta fatia como **W02 — Correções Críticas de Conformidade**. Este registro consolida a instrução humana mais recente e evita manter duas W02 concorrentes.

## 3. Baseline e execução autorizada

- Repositório: `hallanbrito/MindFlip`
- Branch-base: `main`
- Commit-base: `693f472f9cc13b59d7c268cc53a71f0cdb9e8bb7`
- Branch de trabalho: `fix/w02-critical-conformance`
- Responsável humano: Hallan
- Nível de autonomia: `CH-2 — Executar isolado`
- Registro de autorização: **Aprovado**, manifestado pelo Product Owner em 2026-09-08 após apresentação do Contrato de Execução
- Condição de parada: Draft PR pronta para revisão; sem merge e sem deployment

## 4. Contrato de Execução

### Escopo incluído

1. fazer o movimento reduzido alcançar Feed, Laboratório, animações CSS, rolagem e experiência de pós-efeito;
2. respeitar também `prefers-reduced-motion` do sistema;
3. remover a promessa inexistente de PWA e funcionamento offline;
4. reconciliar os textos de privacidade, cookies, compartilhamento e analytics com a implementação;
5. remover o carregamento de fontes remotas que contrariava a privacidade por padrão;
6. validar e limitar dados de duelos recebidos pela URL;
7. validar estruturalmente progresso e preferências recuperados do `localStorage`;
8. corrigir afirmações científicas críticas, absolutas ou não sustentadas;
9. adicionar regressões automatizadas para as novas fronteiras de confiança.

### Exclusões e decisões proibidas

- nenhuma nova ilusão, tela ou mecânica;
- nenhum redesign;
- nenhum anúncio ou analytics externo real;
- nenhuma nova dependência;
- nenhuma alteração de CI/CD ou deployment;
- nenhuma revisão jurídica ou científica integral;
- nenhuma refatoração ampla;
- nenhum merge sem nova autorização literal do Product Owner.

### Arquivos e acessos autorizados

- componentes e utilitários diretamente afetados em `src/`;
- `index.html`, `package.json` e este worklog;
- Git e GitHub em branch isolada e Draft PR;
- pesquisa de fontes científicas para verificar as correções editoriais.

### Reversão e recuperação

Antes do merge, a reversão consiste em fechar a Draft PR e abandonar a branch. Depois de eventual integração autorizada, os commits da W02 podem ser revertidos sem depender de alteração de dados ou infraestrutura externa.

## 5. Achados tratados

| ID | Prioridade | Achado confirmado | Tratamento |
|---|---|---|---|
| C01 | Crítica | Movimento reduzido não alcançava o Laboratório, rolagens e todo o ciclo da experiência de pós-efeito | Preferência efetiva combina escolha local e sistema; propagação ampliada; experiência incompatível fica pausada |
| C02 | Alta | Interface prometia instalação e uso offline sem service worker ou manifesto PWA | Promessa removida e substituída por descrição verificável da persistência local |
| C03 | Alta | Política citava cookies/parceiros/analytics que não correspondiam à implementação; `gtag` podia transmitir eventos se injetado | Integração implícita removida; política descreve o estado real, compartilhamento voluntário e buffer em memória |
| C04 | Alta | Fontes Google eram requisitadas externamente apesar da postura de privacidade por padrão | Requisições removidas; fontes do sistema usadas como fallback local |
| C05 | Alta | Parâmetros de duelo vindos da URL não possuíam contrato de validação | Flag, ilusão, nome e tempo passam por validação, normalização e limites |
| C06 | Alta | JSON arbitrário do `localStorage` era incorporado diretamente aos contratos do domínio | Normalização estrutural com defaults seguros, filtros e limites de histórico |
| C07 | Alta | Textos apresentavam mecanismo neural, saúde visual e capacidade cognitiva como conclusões determinadas pela experiência | Alegações absolutas foram removidas ou qualificadas; artigos críticos receberam fontes verificáveis |
| C08 | Média | Controles de som e movimento não expunham estado de switch assistivo | `role="switch"`, `aria-checked`, rótulos e estado do sistema acrescentados |
| C09 | Média | Janelas de compartilhamento eram abertas sem isolamento explícito | `noopener,noreferrer` acrescentados |

## 6. Arquivos alterados

- `index.html`
- `package.json`
- `src/App.tsx`
- `src/components/ArticlesView.tsx`
- `src/components/BattleModal.tsx`
- `src/components/ChallengeCard.tsx`
- `src/components/FeedView.tsx`
- `src/components/LabView.tsx`
- `src/components/LegalPagesModal.tsx`
- `src/components/SettingsModal.tsx`
- `src/components/illusions/MotionAftereffect.tsx`
- `src/data/illusions.ts`
- `src/index.css`
- `src/utils/analytics.ts`
- `src/utils/battle.ts`
- `src/utils/battle.test.ts`
- `src/utils/storage.ts`
- `src/utils/storage.test.ts`
- `docs/worklogs/W02-CORRECOES-CRITICAS.md`

## 7. Execução pelo ciclo CHAVE

- **C — Contextualizar:** `AGENTS.md`, Fundação C.H., W01, árvore, código afetado e consumidores diretos foram lidos; baseline e estado da `main` foram confirmados.
- **H — Harmonizar:** o contrato foi apresentado ao Product Owner e aprovado antes das alterações.
- **A — Agir:** as correções foram implementadas na branch isolada, sem nova dependência, publicação ou integração.
- **V — Verificar:** regressões, TypeScript, build, diff e busca de contradições conhecidas foram executados; limitações estão registradas abaixo.
- **E — Evoluir:** este worklog e a Draft PR constituem o Pacote de Evidências e o Pedido de Integração. O aceite e o merge permanecem pendentes de decisão humana.

## 8. Pacote de Evidências

### Commit funcional

- `8245ab6928046eedc0d56bfeaa95155b7376de63` — `fix: enforce critical MindFlip compliance guards`

### Verificado

- 6 testes automatizados aprovados com Node Test Runner;
- entradas válidas, flags inválidas, ilusão desconhecida, nome não confiável e tempos inválidos cobertos;
- dados persistidos malformados, segurança de `recordAttempt` e preferência do sistema cobertos;
- `tsc --noEmit`: aprovado;
- build Vite: aprovado, 1.708 módulos transformados;
- `git diff --check`: aprovado;
- busca estática confirmou a remoção da promessa offline, fontes Google, integração `gtag`, acesso `process.env.NODE_ENV` no cliente e alegações críticas selecionadas;
- nenhuma nova dependência foi adicionada;
- nenhum deployment ou merge foi executado.

### Fontes científicas consultadas

- revisão sobre bases da percepção biestável: <https://pubmed.ncbi.nlm.nih.gov/32612780/>
- estudo sobre microssacadas e desvanecimento durante fixação: <https://pubmed.ncbi.nlm.nih.gov/16423702/>
- artigo original de Stroop (1935): <https://doi.org/10.1037/h0054651>

### Não verificado

- revisão visual automatizada da build corrigida: o navegador de verificação não conseguiu acessar o servidor local do ambiente;
- comportamento no domínio publicado: não aplicável antes de integração e novo deployment;
- compatibilidade em dispositivos e leitores de tela reais;
- revisão jurídica dos textos;
- revisão científica fonte a fonte de todo o catálogo.

## 9. Riscos, limitações e pendências fora do escopo

- a troca para fontes do sistema pode produzir pequenas diferenças tipográficas entre plataformas; o layout compilou, mas a comparação visual permanece pendente;
- os testes cobrem utilitários críticos, não fluxos completos de React no navegador;
- outras explicações curtas do catálogo ainda precisam de rastreabilidade científica individual;
- o repositório público não possui licença, enquanto os Termos de Uso restringem cópia; definir licenciamento exige decisão específica do Product Owner;
- dependências aparentemente não utilizadas e a configuração `GEMINI_API_KEY` não foram removidas, pois isso exige auditoria própria de dependências e runtime.

## 10. Critérios de aceitação

- [x] Correções limitadas aos achados críticos aprovados.
- [x] Movimento reduzido alcança as superfícies identificadas e respeita o sistema.
- [x] Entradas de URL e armazenamento local possuem validação testada.
- [x] Privacidade e comportamento implementado não se contradizem nos pontos tratados.
- [x] Promessa PWA/offline inexistente removida.
- [x] Alegações críticas selecionadas foram qualificadas e referenciadas.
- [x] Testes, lint, build e `diff --check` aprovados.
- [x] Nenhuma dependência, analytics real, anúncio real, CI/CD ou deploy foi adicionado.
- [ ] Revisão visual humana da build corrigida.
- [ ] Registro de Aceitação do Product Owner.
- [ ] Integração autorizada.

## 11. Próxima fatia recomendada

**W03 — Rastreabilidade Científica do Catálogo**

Objetivo recomendado: revisar cada ilusão contra fontes primárias ou revisões confiáveis, associar referências ao conteúdo exibido e eliminar afirmações não comprovadas. Esta recomendação não autoriza sua execução.

## 12. Estado final

**Pronto para revisão.** A execução agêntica termina na Draft PR. O agente não aprova o próprio trabalho, não integra a branch e não publica a aplicação.
