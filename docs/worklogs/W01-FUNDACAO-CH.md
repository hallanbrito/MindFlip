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

## 4. Escopo incluído

- definir propósito e limites do MindFlip;
- declarar o nome canônico do produto;
- formalizar valores, papéis e fluxo do Método C.H.;
- definir contrato, aceite e parada das Fatias W;
- estabelecer guardrails científicos, de acessibilidade, privacidade, monetização e engenharia;
- criar regras operacionais para agentes e colaboradores;
- registrar contexto, decisões e evidências da W01;
- criar uma porta de entrada documental para o repositório.

## 5. Exclusões explícitas

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

## 6. Entregáveis

| Arquivo | Finalidade |
|---|---|
| `README.md` | Apresentar o MindFlip e direcionar para as fontes normativas |
| `AGENTS.md` | Tornar o comportamento esperado obrigatório para agentes e colaboradores |
| `docs/00-FUNDACAO-CH.md` | Definir a constituição C.H. aplicada ao produto |
| `docs/worklogs/W01-FUNDACAO-CH.md` | Registrar contrato, execução e evidências desta fatia |

## 7. Critérios de aceitação

- [x] O Método C.H. está definido no repositório.
- [x] A Fatia W possui estrutura mínima obrigatória.
- [x] Autoridade humana e limites dos agentes estão explícitos.
- [x] O nome canônico MindFlip está registrado.
- [x] Existem guardrails próprios para o domínio de ilusões perceptivas.
- [x] Monetização ética, privacidade e acessibilidade estão contempladas.
- [x] O fluxo Git proíbe trabalho direto em `main` e merge sem autorização.
- [x] A W01 não altera arquivos executáveis.
- [x] O estado final é “pronto para revisão”, sem autoaprovação por agente.

## 8. Evidências

### Verificado

- branch `main` observada no commit-base declarado;
- ausência inicial de `AGENTS.md`, `README.md` e diretório `docs/`;
- leitura da árvore completa do repositório;
- leitura dos arquivos centrais relacionados a composição do app, tipos, catálogo, persistência, analytics, publicidade e textos legais;
- criação dos quatro entregáveis exclusivamente documentais na branch de trabalho;
- `main` preservada.

### Não executado por não se aplicar à mudança

- `npm run lint`;
- `npm run build`;
- testes de interface;
- revisão visual do site.

Essas verificações não validariam o conteúdo normativo da W01 e nenhum arquivo executável foi alterado. A integridade final da branch deve ser confirmada por comparação com o commit-base.

## 9. Decisões

1. **MindFlip é o nome canônico.** “NeuroFlip” é tratado como referência histórica do scaffold.
2. **A fundação é normativa.** Mudanças futuras precisam respeitá-la ou alterá-la explicitamente por nova Fatia W.
3. **Agentes não autoaprovam entregas.** O estado termina em pronto para revisão.
4. **O domínio exige guardrails próprios.** Ilusões não podem ser convertidas em alegações de inteligência ou diagnóstico.
5. **Monetização faz parte do produto, mas integrações reais não fazem parte desta fatia.**
6. **Conversas não são memória suficiente.** Decisões duráveis precisam chegar ao repositório.

## 10. Riscos e limitações

- a fundação ainda não foi validada pelo Product Owner;
- textos existentes do produto podem divergir dos guardrails e exigem auditoria separada;
- não há suíte de testes automatizados no estado observado;
- afirmações científicas do catálogo não foram verificadas nesta fatia;
- políticas legais existentes não receberam revisão jurídica;
- a presença de dependências não prova que todas sejam necessárias ou utilizadas.

## 11. Condição de parada

A W01 termina com a documentação criada em branch própria e entregue ao Product Owner para revisão. Nenhum ajuste funcional, merge ou publicação faz parte desta execução.

## 12. Próxima fatia candidata

**W02 — Auditoria de Conformidade do MindFlip**

Objetivo candidato: comparar código, conteúdo e experiência atual contra a Fundação C.H., produzindo achados priorizados e evidências, sem implementar correções durante a auditoria.

A W02 é apenas uma recomendação e depende de autorização explícita.
