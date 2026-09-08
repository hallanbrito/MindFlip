# W03 — Rastreabilidade Científica do Catálogo

Status: pronto para revisão do Product Owner

Tipo: conteúdo científico, conformidade e código de apresentação

Data: 2026-09-08

## 1. Intenção e valor esperado

Tornar verificável a base científica de cada experiência do catálogo do MindFlip. O valor esperado é permitir que uma pessoa identifique a fonte associada à explicação, o limite da evidência e as afirmações que precisaram ser qualificadas ou removidas.

## 2. Baseline e execução autorizada

- Repositório: `hallanbrito/MindFlip`
- Branch-base: `main`
- Commit-base: `b9d23345cd00f9dc4290be96c473c5c54eb5a66a`
- Branch de trabalho: `docs/w03-scientific-traceability`
- Responsável humano: Hallan
- Nível de autonomia: `CH-2 — Executar isolado`
- Registro de autorização: **Aprovado**, manifestado pelo Product Owner em 2026-09-08 após apresentação do Contrato de Execução
- Condição de parada: Draft PR pronta para revisão; sem merge e sem deployment

## 3. Contrato de Execução

### Escopo incluído

1. revisar todas as experiências presentes em `src/data/illusions.ts`;
2. verificar explicações, curiosidades, dicas e alegações históricas relevantes;
3. remover ou qualificar afirmações absolutas sem sustentação suficiente;
4. criar catálogo central de referências com identificadores estáveis;
5. associar cada experiência a pelo menos uma fonte;
6. exibir as fontes na aba “Quero Entender”;
7. criar matriz versionada de rastreabilidade;
8. testar cobertura, integridade, unicidade e segurança das referências;
9. executar verificações disponíveis e registrar limitações;
10. entregar commits e Draft PR sem integrar.

### Exclusões e decisões proibidas

- nenhuma nova experiência, mecânica ou pontuação;
- nenhum redesign;
- nenhuma dependência nova;
- nenhum analytics, publicidade, CI/CD ou deployment;
- nenhuma apresentação do MindFlip como teste clínico ou de inteligência;
- nenhum merge sem autorização literal posterior do Product Owner.

### Fontes admitidas

- estudos científicos primários;
- revisões acadêmicas reconhecidas;
- fontes históricas para autoria e data;
- página institucional do autor da demonstração quando aplicável.

Blogs genéricos, conteúdo comercial e fontes sem identificação não sustentam as alegações do catálogo.

### Reversão e recuperação

Antes do merge, fechar a Draft PR e abandonar a branch restaura o estado da `main`. Depois de eventual integração autorizada, os commits da W03 podem ser revertidos sem migração de dados ou infraestrutura.

## 4. Desvio identificado durante a execução

O contrato preliminar mencionou 13 experiências. A enumeração automática da baseline confirmou **15 experiências**. Como o escopo aprovado abrangia “cada experiência do catálogo”, as 15 foram revisadas e o desvio de contagem foi corrigido sem ampliar a intenção da fatia.

## 5. Implementação

- adiciona `ScientificReference` e classificação da natureza da fonte;
- centraliza 15 referências em `src/data/scientificReferences.ts`;
- cria associação explícita entre os 15 itens do catálogo e suas fontes;
- exibe autoria, ano e título na explicação aprofundada;
- mantém links externos com `target="_blank"` e `rel="noreferrer"`;
- revisa alegações deterministas, absolutas ou não rastreadas;
- adiciona três testes de integridade científica do catálogo;
- documenta a relação afirmação–fonte–tratamento editorial.

## 6. Arquivos alterados

- `src/types.ts`
- `src/data/illusions.ts`
- `src/data/scientificReferences.ts`
- `src/components/ChallengeCard.tsx`
- `src/utils/science.test.ts`
- `docs/science/CATALOG-TRACEABILITY.md`
- `docs/worklogs/W03-RASTREABILIDADE-CIENTIFICA.md`

## 7. Execução pelo ciclo CHAVE

- **C — Contextualizar:** `AGENTS.md`, Fundação C.H., W02, baseline, catálogo, tipos e consumidor da explicação foram lidos integralmente.
- **H — Harmonizar:** o Contrato de Execução foi apresentado e aprovado pelo Product Owner antes das alterações.
- **A — Agir:** pesquisa, revisão e implementação ocorreram em branch isolada, sem dependência, integração ou deployment.
- **V — Verificar:** cobertura e integridade das referências, regressões existentes, escopo e metadados científicos foram conferidos; limitações estão declaradas.
- **E — Evoluir:** este worklog, a matriz e a Draft PR formam a Memória Versionada, o Pacote de Evidências e o Pedido de Integração. O aceite final permanece humano.

## 8. Pacote de Evidências

### Commit funcional

- `504522c06072c0da9e9dafd9a643c07b177c42d1` — `feat: add scientific traceability to the catalog`

### Verificado

- catálogo real enumerado: 15 experiências;
- referências versionadas: 15;
- cobertura automatizada: 15 de 15 experiências;
- `npm test`: 9 testes aprovados, incluindo as 6 regressões existentes e 3 testes científicos novos;
- nenhuma referência ausente, desconhecida, duplicada ou órfã;
- todas as URLs versionadas usam HTTPS;
- metadados e limites das fontes conferidos em PubMed, DOI ou página institucional correspondente;
- nenhuma dependência, configuração de runtime, analytics, anúncio, CI/CD ou deployment foi adicionado.

### Não verificado

- `npm run lint`: dependências do projeto não estavam disponíveis no ambiente local e a instalação não foi concluída;
- `npm run build`: mesma limitação de dependências;
- revisão visual em navegador da nova lista de fontes;
- disponibilidade futura dos sites externos, embora os endereços persistentes tenham sido conferidos nesta execução.

## 9. Correções científicas relevantes

- a Grade de Hermann deixou de apresentar a teoria retinal clássica como causa suficiente;
- Ebbinghaus deixou de sustentar uma alegação alimentar sem vínculo com a fonte da ilusão;
- Müller-Lyer deixou de generalizar suscetibilidade cultural;
- Kanizsa deixou de extrapolar achados em animais para uma narrativa evolutiva;
- pós-imagens e desvanecimento deixaram de ser reduzidos a receptores “cansados” ou impulsos que cessam;
- o pós-efeito de movimento deixou de ser localizado como fenômeno de uma única área visual;
- Stroop deixou de comparar crianças e adultos diplomados sem fonte adequada.

## 10. Riscos e limitações

- fontes exibidas aumentam discretamente a altura do cartão após a conclusão do desafio;
- uma referência oferece contexto e rastreabilidade, mas a demonstração não replica necessariamente o protocolo do artigo;
- a ausência de build e revisão visual executados exige atenção especial do Product Owner antes de autorizar integração;
- a disponibilidade de fontes externas depende dos respectivos editores e instituições.

## 11. Pendências fora do escopo

- o worklog da W02 ainda descreve integração como pendente, embora a PR #2 já esteja incorporada à `main`;
- o repositório continua sem licença pública definida;
- TypeScript strict, CI e testes de componentes permanecem para fatias próprias.

## 12. Critérios de aceitação

- [x] Todas as experiências do catálogo foram revisadas.
- [x] Cada experiência possui pelo menos uma referência resolvível.
- [x] Referências possuem autoria, ano, título, natureza, URL e limite de suporte.
- [x] Fontes são exibidas junto à explicação aprofundada.
- [x] Afirmações frágeis identificadas foram removidas ou qualificadas.
- [x] Matriz de rastreabilidade foi criada.
- [x] Testes automatizados científicos e regressões existentes foram aprovados.
- [x] Nenhuma dependência ou funcionalidade fora do escopo foi adicionada.
- [ ] TypeScript e build executados no ambiente completo.
- [ ] Revisão visual humana.
- [ ] Registro de Aceitação do Product Owner.
- [ ] Integração autorizada.

## 13. Próxima fatia recomendada

**W04 — TypeScript Estrito e Build Reproduzível**

Objetivo recomendado: fechar a lacuna de compilação verificável, endurecer gradualmente os contratos TypeScript e preparar uma verificação automatizada mínima. Esta recomendação não autoriza sua execução.

## 14. Estado final

**Pronto para revisão do Product Owner.** Nenhum merge ou deployment foi executado.
