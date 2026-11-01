# W08 — Núcleo de Retenção (Fatia W08-A: Sessão Rápida)

Status: pronto para auditoria (AGUARDANDO_AUDITORIA_CHATGPT)  
Tipo: funcional, interface, experiência e retenção  
Data: 2026-10-31  
Executor: AGY  
Auditor previsto: ChatGPT  
Responsável humano / Product Owner: Hallan  
Issue vinculada: https://github.com/hallanbrito/MindFlip/issues/10  
Issue-mãe: https://github.com/hallanbrito/MindFlip/issues/8  

---

## 1. Intenção

Implementar a Sessão Rápida de cinco desafios no MindFlip, transformando a entrada em uma experiência estruturada com início, indicador claro de progresso de 1/5 a 5/5, finalização inequívoca, tela de resumo com métricas confiáveis e opções para reiniciar ou sair sem engajamento forçado.

## 2. Baseline e autorização

- **Repositório:** `hallanbrito/MindFlip`
- **Branch-base:** `main`
- **Commit-base:** `8fa45adfd3e9153e7cb6d678b7a4bde50634011d`
- **Branch de trabalho:** `agy/w08a-sessao-rapida`
- **Autonomia concedida:** `CH-2 — Executar isolado` (código, testes, commit, push e Draft PR, sem integração e sem deploy)
- **Custo adicional:** R$ 0 comprovado

## 3. Valor esperado

Substituir a navegação infinita e sem desfecho por uma sessão curta de 5 desafios, fornecendo senso de conquista, clareza sobre o esforço investido e retenção baseada em valor, preservando privacidade, acessibilidade e integridade científica.

## 4. Escopo incluído (W08-A)

1. Disparo da Sessão Rápida pelo CTA principal ("COMEÇAR O DESAFIO");
2. Composição da sessão com exatamente cinco desafios selecionados do catálogo atual;
3. Indicador visual e acessível de progresso de 1/5 a 5/5, informando desafios concluídos e restantes;
4. Avanço controlado entre os 5 desafios sem saltos ou dupla contagem de pontuação na sessão;
5. Ao concluir o 5º desafio, transição para tela de resumo (`QuickSessionSummary`), sem reinício silencioso para o primeiro desafio;
6. Apresentação no resumo do total concluído, da pontuação real atribuída nesta sessão e do melhor tempo de inversão somente quando houver dado positivo confiável (omitido quando inexistente);
7. Ações de desfecho: "Jogar novamente" (inicia nova sessão limpa de 5 desafios, sem resetar o progresso geral acumulado) e "Voltar amanhã" (saída clara e respeitosa, sem coerção ou dark patterns);
8. Opção de encerramento antecipado da sessão para retorno à exploração livre do catálogo;
9. Suporte completo a navegação por teclado (W/S, setas, Tab, Enter), leitores de tela (`aria-valuenow`, `aria-label`, foco programático) e preferência de movimento reduzido;
10. Testes automatizados cobrindo criação, limites, progressão, proteção contra dupla contagem, finalização e cálculo de resumo.

## 5. Exclusões

- Desafio diário, sequência/streak, modal diário, timers globais e recompensa diária (escopo reservado para a fatia W08-B futura);
- Mecânicas da W09 (duelos jogáveis, ordem embaralhada determinística complexa);
- Anúncios/AdSense, cookies externos, telemetria agregada ou analytics invasivo;
- Backend, APIs externas, autenticação, login ou banco de dados;
- Criação ou modificação de conteúdo científico e referências bibliográficas;
- Novas dependências externas em `package.json`.

## 6. Decisões aprovadas e proibidas

### Aprovadas

- Criar módulo utilitário dedicado `src/utils/quickSession.ts` com funções puras e regras testáveis;
- Criar componente visual `src/components/QuickSessionSummary.tsx` desacoplado e acessível;
- Exibir melhor tempo no resumo somente se houver medição real positiva (`timeElapsed > 0`); omitir caso contrário;
- Preservar `userProgress` no reinício de sessão, zerando apenas contadores efêmeros da sessão atual.

### Proibidas

- Reiniciar silenciosamente para o desafio 1 ao concluir o 5º;
- Inventar pontuação ou tempos estimados sem medição efetiva;
- Usar contadores com saltos ou duplicar pontuação ao rever o mesmo desafio;
- Tentar merge, publicação ou deploy.

## 7. Arquivos afetados

- `src/utils/quickSession.ts` (novo: regras puras de sessão, progresso e resumo);
- `src/utils/quickSession.test.ts` (novo: 9 casos de teste unitários);
- `src/components/QuickSessionSummary.tsx` (novo: tela de resumo final da sessão);
- `src/components/ChallengeCard.tsx` (modificado: propriedades opcionais para label e evento de conclusão da tentativa);
- `src/components/FeedView.tsx` (modificado: coordenação do ciclo de vida da Sessão Rápida, barra de progresso e atalhos);
- `docs/worklogs/W08-NUCLEO-RETENCAO.md` (este documento).

Nenhuma dependência ou lockfile foi alterado.

## 8. Critérios de aceitação da Issue #10

- [x] CTA inicia sessão real; indicador correto 1/5 a 5/5.
- [x] Final do 5º não reinicia silenciosamente; resumo correto e navegação funcional.
- [x] Reinício não reaproveita contadores antigos nem apaga progresso geral.
- [x] Fluxo sem rede/conta; acessibilidade e movimento reduzido preservados.
- [x] `bun run lint`, `bun test`, `bun run build`, `git diff --check` aprovados com código de saída 0.
- [x] Teste visual mobile e desktop registrado com evidência ou declarado `NÃO_VERIFICADO`.
- [x] Draft PR vinculado às Issues #10 e #8 com RUC auditável.

## 9. Verificações executadas

1. **`bun run lint` (`tsc --noEmit`):**
   - Código de saída: 0 (nenhum erro de tipagem).
2. **`bun test` e `npm test`:**
   - 24 testes executados em 5 arquivos (`battle`, `monetization`, `science`, `storage`, `quickSession`).
   - 24 aprovados, 0 falhas.
   - 9 novos testes cobrindo limites de sessão, progressão 1/5 a 5/5, dupla contagem, finalização e cálculo de tempo confiável.
3. **`bun run build` (`vite build`):**
   - Código de saída: 0.
   - 1.713 módulos transformados.
   - Bundle gerado com sucesso em `dist/`.
4. **`git diff --check`:**
   - Código de saída: 0 (sem conflitos, espaços em branco espúrios ou problemas de formatação).
5. **Inspeção de segredos e rede:**
   - Nenhuma chamada de rede adicionada;
   - Nenhum tracker, token, credencial ou segredo incluído.

## 10. Pacote de Evidências

### Verificado

- Baseline: `main@8fa45adfd3e9153e7cb6d678b7a4bde50634011d`;
- Branch de trabalho: `agy/w08a-sessao-rapida`;
- `bun run lint`: exit code 0;
- `bun test`: 24 pass, 0 fail;
- `npm test`: 24 pass, 0 fail;
- `bun run build`: exit code 0 (dist/assets/index-DtmkEEte.css 75.08 kB, dist/assets/index-Cnbc88J_.js 401.82 kB);
- `git diff --check`: exit code 0;
- Resumo omite "Melhor tempo" quando nenhuma medição confiável foi registrada no teste automatizado.

### Não verificado

- **Revisão visual interativa em navegadores reais mobile e desktop:** declarada como `NÃO_VERIFICADO` (ambiente de execução CLI sem display gráfico / headless).

## 11. Limitações e riscos

- O cálculo de tempo depende do cronômetro interno do `ChallengeCard`; ilusões puramente estáticas sem temporizador não geram tempo de inversão (comportamento intencional para evitar tempos falsos);
- A sessão seleciona os 5 primeiros desafios da categoria ativa ou do catálogo geral;
- As mecânicas de desafio diário e sequência de dias permanecem para a fatia W08-B.

## 12. Recomendação para próxima fatia (W08-B)

- Implementar o Desafio Diário com reset de interface ao reabrir, pontuação única diária e sequência contínua (streak) auditável.
