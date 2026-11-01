# W08 — Núcleo de Retenção (Fatia W08-A: Sessão Rápida)

Status: pronto para reauditoria (AGUARDANDO_REAUDITORIA_CHATGPT)
Tipo: funcional, interface, experiência e retenção
Data: 2026-10-31
Executor: AGY
Auditor previsto: ChatGPT
Responsável humano / Product Owner: Hallan
Issue vinculada: https://github.com/hallanbrito/MindFlip/issues/10
Issue-mãe: https://github.com/hallanbrito/MindFlip/issues/8
Draft PR: https://github.com/hallanbrito/MindFlip/pull/11

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

## 4. Escopo incluído (W08-A e Reteste Corretivo)

1. Disparo da Sessão Rápida pelo CTA principal ("COMEÇAR O DESAFIO");
2. Composição da sessão com exatamente cinco desafios selecionados do catálogo atual;
3. Indicador de posição de navegação (1/5 a 5/5) separado da porcentagem de progresso;
4. Cálculo da porcentagem da barra de progresso baseado estritamente nas conclusões efetivas (`completedCount / total * 100`), iniciando em 0% e atingindo 100% apenas com 5/5 concluídos;
5. Bloqueio estrito de avanço e conclusão sem completar efetivamente o desafio em foco, desabilitando o botão de avanço e neutralizando atalhos de teclado (seta baixo, W/S);
6. Preservação do encerramento antecipado da sessão a qualquer momento para retorno à exploração do catálogo livre;
7. Prevenção de duplicação de `mentalScore`, tentativas ou recompensas gerais ao repetir ou revisitar desafios já concluídos na sessão, mantendo intacto o comportamento do modo catálogo;
8. Reset garantido do estado do `ChallengeCard` através de chave de renderização contextual (`sessionContextKey` / `cardKey`) em transições catálogo/sessão e no reinício da sessão;
9. Ao concluir o 5º desafio, transição para tela de resumo (`QuickSessionSummary`), sem reinício silencioso para o primeiro desafio;
10. Apresentação no resumo do total concluído, da pontuação real atribuída nesta sessão e do melhor tempo de inversão somente quando houver dado positivo confiável (omitido quando inexistente);
11. Ações de desfecho: "Jogar novamente" (inicia nova sessão limpa de 5 desafios, com novo ciclo e sem resetar o progresso geral acumulado) e "Voltar amanhã" (saída clara e respeitosa, sem coerção ou dark patterns);
12. Suporte completo a navegação por teclado, leitores de tela (`role="progressbar"`, `aria-valuenow`, `aria-label`, foco programático) e preferência de movimento reduzido;
13. Testes automatizados regressivos cobrindo criação, limites, progressão, bloqueio de avanço indevido, bloqueio de conclusão indevida, proteção contra dupla contagem, finalização e cálculo de resumo.

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
- Preservar `userProgress` no reinício de sessão, zerando apenas contadores efêmeros da sessão atual;
- Bloquear avanço sem resolução efetiva do desafio corrente;
- Separar indicador de posição (`1/5` a `5/5`) da porcentagem efetiva de conclusão (`0%` a `100%`).

### Proibidas

- Avançar de desafio sem concluir o atual na sessão;
- Reiniciar silenciosamente para o desafio 1 ao concluir o 5º;
- Duplicar `mentalScore` ou progresso geral ao repetir desafio já concluído na sessão;
- Inventar pontuação ou tempos estimados sem medição efetiva;
- Tentar merge, publicação ou deploy.

## 7. Arquivos afetados

- `src/utils/quickSession.ts`: regras puras de sessão, bloqueio de avanço (`canAdvanceSession`), verificação de duplicação (`shouldAwardSessionScore`, `isChallengeCompletedInSession`), progresso e resumo;
- `src/utils/quickSession.test.ts`: suíte com 10 testes regressivos automatizados;
- `src/components/QuickSessionSummary.tsx`: tela de resumo final da sessão;
- `src/components/ChallengeCard.tsx`: suporte a label dinâmico, reset por chave contextual e bloqueio de pontuação duplicada em repetições na sessão;
- `src/components/FeedView.tsx`: coordenação do ciclo de vida da Sessão Rápida, barra de progresso por conclusões, desabilitação de avanço e atalhos controlados;
- `docs/worklogs/W08-NUCLEO-RETENCAO.md`: este registro operacional.

Nenhuma dependência ou lockfile foi alterado.

## 8. Critérios de aceitação da Issue #10

- [x] CTA inicia sessão real; indicador correto 1/5 a 5/5.
- [x] Avanço e conclusão indevidos são estritamente bloqueados até a conclusão efetiva do desafio.
- [x] Final do 5º não reinicia silenciosamente; resumo correto e navegação funcional.
- [x] Reinício não reaproveita contadores antigos nem apaga progresso geral.
- [x] Repetição de desafio na sessão não duplica `mentalScore` nem recompensas gerais.
- [x] Porcentagem de progresso calculada por conclusões efetivas (0% a 100%), separada da posição (1/5 a 5/5).
- [x] Reset de `ChallengeCard` garantido na transição catálogo/sessão e no reinício da sessão.
- [x] Fluxo sem rede/conta; acessibilidade e movimento reduzido preservados.
- [x] `bun run lint`, `bun test`, `npm test`, `bun run build`, `git diff --check` aprovados com código de saída 0.
- [x] Teste visual mobile e desktop registrado com evidência ou declarado `NÃO_VERIFICADO`.
- [x] Draft PR vinculado às Issues #10 e #8 com RUC auditável reconciliado.

## 9. Verificações executadas

1. **`bun run lint` (`tsc --noEmit`):**
   - Código de saída: 0 (nenhum erro de tipagem).
2. **`bun test` e `npm test`:**
   - 25 testes executados em 5 arquivos (`battle`, `monetization`, `science`, `storage`, `quickSession`).
   - 25 aprovados, 0 falhas.
   - 10 testes específicos em `quickSession.test.ts` cobrindo bloqueio de avanço indevido, bloqueio de conclusão indevida, prevenção de dupla contagem e porcentagem por conclusões efetivas.
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
- `bun test`: 25 pass, 0 fail;
- `npm test`: 25 pass, 0 fail;
- `bun run build`: exit code 0 (CSS 75.31 kB, JS 402.70 kB antes de gzip);
- `git diff --check`: exit code 0;
- Bloqueio de avanço e conclusão sem resolução comprovado por testes regressivos unitários;
- Omissão de tempo de inversão quando inexistente dado positivo confiável.

### Não verificado

- **Revisão visual interativa em navegadores reais mobile e desktop:** declarada como `NÃO_VERIFICADO` (ambiente de execução CLI sem display gráfico / headless).

## 11. Limitações e riscos

- O cálculo de tempo depende do cronômetro interno do `ChallengeCard`; ilusões puramente estáticas sem temporizador não geram tempo de inversão (comportamento intencional para evitar tempos falsos);
- A sessão seleciona os 5 primeiros desafios da categoria ativa ou do catálogo geral;
- As mecânicas de desafio diário e sequência de dias permanecem para a fatia W08-B.

## 12. Recomendação para próxima fatia (W08-B)

- Implementar o Desafio Diário com reset de interface ao reabrir, pontuação única diária e sequência contínua (streak) auditável.
