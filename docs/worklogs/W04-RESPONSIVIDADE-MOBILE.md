# W04 — Responsividade Mobile e Refinamento Visual

Status: pronto para revisão do Product Owner

Tipo: correção de interface, responsividade e acessibilidade

Data: 2026-09-08

## 1. Intenção e valor esperado

Restaurar a experiência do MindFlip em telas pequenas, eliminando o deslocamento horizontal que cortava navegação, filtros e cartões. O valor esperado é manter todo o conteúdo principal dentro do viewport e preservar controles legíveis e operáveis no celular.

## 2. Baseline e execução autorizada

- Repositório: `hallanbrito/MindFlip`
- Branch-base: `main`
- Commit-base: `5033ea6dfd12430fe6c12eb819db9be97a0fbad6`
- Branch de trabalho: `fix/w04-mobile-responsiveness`
- Responsável humano: Hallan
- Nível de autonomia: `CH-2 — Executar isolado`
- Evidência do problema: captura do MindFlip em Safari no iPhone, com elementos cortados nas duas laterais
- Registro de autorização: solicitação explícita do Product Owner para ajustar a responsividade e o visual em 2026-09-08
- Condição de parada: Draft PR pronta para revisão; sem merge e sem deployment

## 3. Contrato de Execução

### Escopo incluído

1. impedir overflow horizontal da estrutura principal;
2. compactar o cabeçalho em viewports pequenos sem remover destinos de navegação;
3. manter filtros horizontais roláveis dentro do próprio componente;
4. permitir que status, títulos, etiquetas e cartão encolham ou quebrem linha;
5. tornar mídia visual incapaz de aumentar a largura da página;
6. restaurar zoom do navegador e declarar suporte a `viewport-fit`;
7. executar lint, testes, build e revisão de diff.

### Exclusões e decisões proibidas

- nenhuma alteração nas ilusões, pontuação, persistência ou catálogo científico;
- nenhum redesign amplo, nova página ou dependência;
- nenhum analytics, publicidade, CI/CD ou deployment;
- nenhum merge sem autorização literal posterior do Product Owner.

### Arquivos e componentes permitidos

- `index.html`;
- `src/index.css`;
- `src/App.tsx`;
- `src/components/Navbar.tsx`;
- `src/components/FeedView.tsx`;
- `src/components/ChallengeCard.tsx`;
- este registro da W04.

### Critérios de aceitação

- a estrutura não cria rolagem horizontal de página;
- o cabeçalho cabe em telas pequenas usando ícones e placar compacto;
- filtros continuam acessíveis por rolagem horizontal local;
- cartão, títulos e etiquetas respeitam a largura disponível;
- zoom por gesto não é bloqueado pelo viewport;
- lint, testes e build aprovam sem regressão.

### Reversão e recuperação

Antes do merge, fechar a Draft PR e abandonar a branch restaura a `main`. Depois de eventual integração autorizada, o commit da W04 pode ser revertido sem migração de dados ou infraestrutura.

## 4. Diagnóstico

O cabeçalho mantinha marca, quatro destinos, sequência, placar, áudio e configurações em uma única linha. A largura mínima resultante ultrapassava o viewport do iPhone. Como o documento também ocultava overflow horizontal, o excesso era cortado e podia deslocar visualmente o restante da página.

O feed já possuía rolagem local para categorias, mas faltavam limites explícitos de encolhimento nos ancestrais flex. Elementos visuais com dimensões próprias também não tinham um limite global de largura.

## 5. Implementação

- contém a largura em `html`, `body`, `#root`, aplicação, conteúdo principal e feed;
- adiciona `min-w-0` nos pontos flexíveis que precisam encolher;
- compacta a navegação mobile, preservando os quatro destinos por ícone;
- oculta apenas informações redundantes em telas estreitas: nome longo da marca, sequência duplicada e sufixo `pts`;
- mantém controles de áudio, configurações, placar e navegação disponíveis;
- permite quebra das etiquetas e títulos do cartão;
- limita imagens, SVG e canvas à largura do contêiner;
- remove o bloqueio de zoom do metadado de viewport;
- transforma a marca clicável em botão com rótulo e foco visível.

## 6. Arquivos alterados

- `index.html`
- `src/index.css`
- `src/App.tsx`
- `src/components/Navbar.tsx`
- `src/components/FeedView.tsx`
- `src/components/ChallengeCard.tsx`
- `docs/worklogs/W04-RESPONSIVIDADE-MOBILE.md`

## 7. Pacote de Evidências

### Verificado

- `npm run lint`: aprovado;
- `npm test`: 9 de 9 testes aprovados;
- `npm run build`: aprovado com 1.709 módulos transformados;
- `git diff --check`: aprovado;
- nenhuma dependência ou lógica de produto foi alterada;
- nenhum segredo, integração, analytics, anúncio ou deployment foi adicionado.

### Inferido por inspeção estrutural

- os limites de largura impedem que os grupos flex ampliem o documento;
- a soma dos controles compactos do cabeçalho cabe no viewport de 390 px apresentado na evidência;
- categorias mantêm rolagem horizontal isolada.

### Não verificado

- renderização da branch em navegador real ou em emulação mobile, pois o ambiente de execução não disponibilizou navegador gráfico;
- sincronização e publicação pelo Google AI Studio.

## 8. Riscos e limitações

- em telas pequenas, os destinos principais aparecem apenas como ícones e dependem de seus títulos semânticos e contexto visual;
- motores de ilusão continuam com dimensões-base próprias; agora são contidos pelo cartão, mas uma fatia futura pode adaptar individualmente cada motor para telas inferiores a 320 px;
- a confirmação final no mesmo iPhone da captura permanece necessária antes da integração.

## 9. Itens fora do escopo

- revisão visual completa de modais, laboratório, artigos e rodapé;
- sistema dedicado de navegação inferior mobile;
- testes end-to-end com matriz automatizada de viewports;
- alterações estéticas sem evidência específica.

## 10. Execução pelo ciclo CHAVE

- **C — Contextualizar:** captura, `AGENTS.md`, Fundação C.H., W03, baseline e consumidores diretos foram revisados.
- **H — Harmonizar:** o relato foi recortado como correção mobile, com lógica e conteúdo explicitamente preservados.
- **A — Agir:** mudanças executadas em branch isolada e sem dependências novas.
- **V — Verificar:** diff, TypeScript, testes e build foram conferidos; a limitação visual está declarada.
- **E — Evoluir:** este worklog e a Draft PR formam a Memória Versionada e o Pedido de Integração; aceite e merge permanecem humanos.

## 11. Próxima fatia recomendada

**W05 — Matriz Visual Automatizada de Viewports**

Objetivo recomendado: adicionar testes end-to-end para 320 px, 390 px, tablet e desktop, cobrindo feed, laboratório, artigos e modais. Esta recomendação não autoriza sua execução.

## 12. Estado final

**Pronto para revisão do Product Owner.** Nenhum merge ou deployment foi executado.
