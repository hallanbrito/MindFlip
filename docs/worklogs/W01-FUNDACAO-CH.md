# W01 — Fundação C.H. do MindFlip

Status: pronto para revisão do Product Owner  
Tipo: documentação e governança  
Data: 2026-09-08

## 1. Intenção

Converter o Método C.H. de uma intenção externa ao repositório em regras explícitas, verificáveis e aplicáveis à evolução do MindFlip.

## 2. Contexto observado

No início da W01, o repositório já continha uma prova de conceito funcionalmente ampla em React, TypeScript e Vite, incluindo:

- catálogo de ilusões e componentes interativos;
- feed, laboratório e artigos;
- progresso e preferências em armazenamento local;
- movimento reduzido e avisos em parte das experiências;
- desafios, conquistas, compartilhamento e duelos por URL;
- espaços reservados para publicidade;
- textos de privacidade, cookies, termos e aviso não diagnóstico.

Entretanto, não existiam `README.md`, `AGENTS.md` ou documentação normativa do Método C.H. O commit inicial também usava “NeuroFlip” na mensagem, embora o repositório, metadados e interface adotassem “MindFlip”.

## 3. Commit-base e branch

- Repositório: `hallanbrito/MindFlip`
- Branch-base: `main`
- Commit-base: `3e55c179201bd715497360ba16b6ea1b3ec7df3d`
- Branch de trabalho: `docs/w01-foundation-ch`
- Responsável humano: Hallan
- Nível de autonomia: `CH-2 — Executar isolado`

## 4. Contrato de Execução

### Valor esperado

Criar uma fonte de verdade enxuta que permita evoluir o MindFlip com responsabilidade humana, escopo controlado e evidência verificável.

### Decisões aprovadas

- formalizar o Método C.H. e o ciclo CHAVE no repositório;
- documentar propósito, papéis, autoridade, guardrails e fluxo Git;
- criar somente os quatro arquivos Markdown declarados como entregáveis;
- abrir e atualizar uma Draft PR sem integrar.

### Arquivos, ferramentas e acessos autorizados

- arquivos: `README.md`, `AGENTS.md`, `docs/00-FUNDACAO-CH.md` e este worklog;
- ferramentas: leitura do repositório, edição textual, Git e GitHub;
- acesso: branch isolada e Draft PR, sem merge ou publicação.

### Reversão e recuperação

A mudança pode ser integralmente revertida fechando a Draft PR e removendo a branch, pois `main` permanece no commit-base e nenhum arquivo executável foi alterado.

### Pacote de Evidências esperado

Diff por arquivo, commits, verificações documentais, confirmação de escopo, limitações, desvios e estado final para decisão do Product Owner.

## 5. Escopo incluído

- definir propósito e limites do MindFlip;
- declarar o nome canônico do produto;
- formalizar valores, papéis e fluxo do Método C.H.;
- definir contrato, aceite e parada das Fatias W;
- estabelecer guardrails científicos, de acessibilidade, privacidade, monetização e engenharia;
- criar regras operacionais para agentes e colaboradores;
- registrar contexto, decisões e evidências da W01;
- criar uma porta de entrada documental para o repositório.

## 6. Exclusões e decisões proibidas

Esta fatia não autoriza:

- alteração de TypeScript, CSS, HTML, configuração ou dependências;
- correção de bugs;
- inclusão ou remoção de ilusões;
- integração real de analytics, anúncios, autenticação, banco de dados ou IA;
- mudança de política jurídica exibida no produto;
- implantação, publicação ou merge;
- afirmação de conformidade jurídica, médica ou científica;
- definição detalhada do roadmap posterior.

Descobertas nessas áreas devem ser tratadas em futuras Fatias W.

## 7. Entregáveis

| Arquivo | Finalidade |
|---|---|
| `README.md` | Apresentar o MindFlip e direcionar para as fontes normativas |
| `AGENTS.md` | Tornar o comportamento esperado obrigatório para agentes e colaboradores |
| `docs/00-FUNDACAO-CH.md` | Definir a constituição C.H. aplicada ao produto |
| `docs/worklogs/W01-FUNDACAO-CH.md` | Registrar contrato, execução e evidências desta fatia |

Os entregáveis materializam os artefatos do método: este worklog contém o Contrato de Execução e o Pacote de Evidências; a Draft PR #1 é o Pedido de Integração; o Registro de Aceitação permanece pendente; após aceite e merge, os documentos passam a compor a Memória Versionada de `main`.

## 8. Critérios de aceitação

- [x] O Método C.H. está definido no repositório.
- [x] O ciclo CHAVE está definido sem criar uma versão concorrente do método.
- [x] A Fatia W possui estrutura mínima obrigatória.
- [x] Artefatos, níveis de autonomia, Definition of Ready e Definition of Done estão explícitos.
- [x] Autoridade humana e limites dos agentes estão explícitos.
- [x] O nome canônico MindFlip está registrado.
- [x] Existem guardrails próprios para o domínio de ilusões perceptivas.
- [x] Monetização ética, privacidade e acessibilidade estão contempladas.
- [x] O fluxo Git proíbe trabalho direto em `main` e merge sem autorização.
- [x] A W01 não altera arquivos executáveis.
- [x] O estado final é “pronto para revisão”, sem autoaprovação por agente.

## 9. Execução pelo ciclo CHAVE

- **C — Contextualizar:** o repositório e seu commit-base foram confirmados; a prova de conceito, sua arquitetura e a ausência inicial de documentação normativa foram examinadas.
- **H — Harmonizar:** objetivo, escopo, exclusões, autonomia `CH-2`, verificações, reversão e autoridade humana foram fechados neste contrato.
- **A — Agir:** os quatro documentos foram criados e reconciliados na branch `docs/w01-foundation-ch`, sem mudança funcional.
- **V — Verificar:** diff, caminhos, consistência documental e ausência de arquivos executáveis foram conferidos; resultados reais estão registrados abaixo.
- **E — Evoluir:** a Draft PR #1 constitui o Pedido de Integração. Aceite humano, merge, limpeza da branch e incorporação definitiva à memória de `main` permanecem pendentes.

## 10. Pacote de Evidências

### Verificado

- branch `main` observada no commit-base declarado;
- ausência inicial de `AGENTS.md`, `README.md` e diretório `docs/`;
- leitura da árvore completa do repositório;
- leitura dos arquivos centrais relacionados a composição do app, tipos, catálogo, persistência, analytics, publicidade e textos legais;
- criação dos quatro entregáveis exclusivamente documentais na branch de trabalho;
- reconciliação da Fundação com o ciclo CHAVE canônico;
- `main` preservada.

### Verificações adicionais da reconciliação

- `git diff --check`: aprovado;
- links e caminhos documentais: confirmados;
- comparação com o commit-base: somente os quatro arquivos Markdown declarados;
- diff de arquivos executáveis e configurações: vazio;
- `npm run lint`: aprovado (`tsc --noEmit`);
- `npm run build`: aprovado (Vite, 1.707 módulos transformados).

### Não executado por não se aplicar à mudança

- testes de interface;
- revisão visual do site.

Nenhum arquivo executável foi alterado. Lint e build confirmam a integridade técnica, mas não substituem a revisão humana do conteúdo normativo.

## 11. Decisões

1. **MindFlip é o nome canônico.** “NeuroFlip” é tratado como referência histórica do scaffold.
2. **A fundação é normativa.** Mudanças futuras precisam respeitá-la ou alterá-la explicitamente por nova Fatia W.
3. **Agentes não autoaprovam entregas.** O estado termina em pronto para revisão.
4. **O domínio exige guardrails próprios.** Ilusões não podem ser convertidas em alegações de inteligência ou diagnóstico.
5. **Monetização faz parte do produto, mas integrações reais não fazem parte desta fatia.**
6. **Conversas não são memória suficiente.** Decisões duráveis precisam chegar ao repositório.
7. **CHAVE é o ciclo operacional do Método C.H.** C.H. preserva seus significados ChatGPT–Hallan e Colaboração Híbrida.
8. **Autonomia é concedida por fatia.** A W01 usa CH-2 e não autoriza integração.

## 12. Riscos e limitações

- a fundação ainda não foi validada pelo Product Owner;
- textos existentes do produto podem divergir dos guardrails e exigem auditoria separada;
- não há suíte de testes automatizados no estado observado;
- afirmações científicas do catálogo não foram verificadas nesta fatia;
- políticas legais existentes não receberam revisão jurídica;
- a presença de dependências não prova que todas sejam necessárias ou utilizadas.

## 13. Definition of Ready observada

A W01 entrou em execução com objetivo, baseline, escopo, exclusões, critérios, branch e autoridade humana definidos. A reconciliação posterior completou autonomia, decisões, ferramentas, acessos, reversão e formato do Pacote de Evidências sem alterar o escopo original.

## 14. Definition of Done e condição de parada

A execução agêntica da W01 termina com a documentação criada em branch própria e entregue ao Product Owner para revisão. Nenhum ajuste funcional, merge ou publicação faz parte desta execução.

O Done integral depende de Registro de Aceitação humano, integração autorizada, limpeza da branch e consolidação da Memória Versionada. Até lá, o estado permanece **pronto para revisão**.

## 15. Próxima fatia

**W02 — Auditoria de Conformidade do MindFlip**

Objetivo: comparar código, conteúdo e experiência atual contra a Fundação C.H., produzindo achados priorizados e evidências, sem implementar correções durante a auditoria.

A W02 foi autorizada pelo Product Owner. Seu registro versionado deve ser tratado separadamente da W01 e não autoriza correções funcionais implícitas.
