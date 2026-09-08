# Fundação C.H. do MindFlip

Status: normativa  
Versão: 1.0  
Fatia de origem: W01  
Produto: MindFlip

## 1. Propósito

O MindFlip é um laboratório interativo de percepção humana. Ele apresenta ilusões visuais, conflitos cognitivos e microdesafios acompanhados de explicações científicas acessíveis.

O produto existe para despertar curiosidade sobre como o cérebro interpreta a realidade. Ele não mede inteligência, não determina capacidade mental e não substitui avaliação médica, oftalmológica, psicológica ou neurocognitiva.

## 2. Método C.H.

C.H. significa simultaneamente **ChatGPT–Hallan**, por sua origem, e **Colaboração Híbrida**, por seu modelo de trabalho.

O Método C.H. organiza a construção entre um responsável humano e agentes de IA. A IA amplia análise e execução; o humano mantém intenção, autorização e responsabilidade.

O método governa a fronteira entre intenção humana e execução agêntica. Seu objetivo é maximizar **valor aceito por unidade de risco, custo e atenção humana**, não produção bruta de código.

### 2.1 Valores

1. **Intenção verificável:** toda mudança deve responder a uma necessidade explícita.
2. **Evidência reproduzível:** conclusão exige prova que outra pessoa consiga conferir.
3. **Fatias pequenas e reversíveis:** mudanças devem ser compreensíveis e fáceis de desfazer.
4. **Memória explícita:** decisões duráveis pertencem ao repositório, não apenas ao chat.
5. **Responsabilidade humana:** decisões de produto, risco e publicação permanecem humanas.
6. **Orquestração adequada:** usar apenas os agentes e ferramentas necessários para a fatia.

## 3. Ciclo operacional CHAVE

Toda Fatia W percorre o ciclo **CHAVE**:

1. **C — Contextualizar:** ler as fontes de verdade e compreender necessidade, baseline, histórico, riscos, restrições e capacidade disponível. Nenhuma conversa substitui a baseline publicada.
2. **H — Harmonizar:** alinhar intenção humana, arquitetura, escopo, decisões, critérios e autonomia; ao final, fechar o Contrato de Execução.
3. **A — Agir:** executar em branch, worktree ou ambiente isolado, dentro do tempo, ferramentas, acessos e autonomia concedidos.
4. **V — Verificar:** examinar o diff, testes, checagens, segurança, escopo, impacto documental, hipóteses, limitações e desvios; corrigir dentro do contrato ou rejeitar a entrega.
5. **E — Evoluir:** obter decisão humana, integrar apenas quando autorizado, limpar recursos temporários e devolver o aprendizado à Memória Versionada.

As etapas são sequenciais como gates de responsabilidade. Uma etapa pode exigir retorno à anterior, mas não pode ser silenciosamente ignorada.

## 4. Unidade de trabalho: Fatia W

Uma **Fatia W** é a menor mudança capaz de produzir aprendizado ou valor verificável sem romper a coerência do produto. Pode ser documental, arquitetural, funcional, corretiva ou experimental. Seu tamanho é limitado pela capacidade humana de revisão: se não puder ser revisada com compreensão suficiente, está grande demais.

Antes da execução, a fatia deve declarar:

- identificador e título;
- objetivo e valor esperado;
- baseline, contexto ou problema;
- escopo incluído;
- exclusões explícitas;
- decisões aprovadas e proibidas;
- arquivos e componentes permitidos;
- ferramentas e acessos autorizados;
- critérios de aceitação;
- verificações obrigatórias;
- nível de autonomia;
- responsável humano;
- condição de parada;
- estratégia de reversão ou recuperação;
- formato esperado do Pacote de Evidências;
- commit-base e branch de trabalho, quando houver alteração no repositório.

Uma fatia não autoriza trabalho implícito. Descobertas fora do escopo devem ser registradas como candidatas futuras, não implementadas silenciosamente.

## 5. Artefatos obrigatórios

1. **Contrato de Execução:** especificação fechada da Fatia W com baseline, escopo permitido, proibições, critérios, autonomia, verificações e saídas esperadas.
2. **Pacote de Evidências:** diff, testes, checagens, demonstrações, hipóteses, limitações, custo relevante e desvios observados.
3. **Pedido de Integração:** unidade revisável, normalmente uma Draft PR, que expõe a mudança sem presumir aceite.
4. **Registro de Aceitação:** decisão humana explícita de aprovar, rejeitar ou solicitar correção.
5. **Memória Versionada:** instruções, documentação, mapas, padrões e histórico incorporados à fonte de verdade.

## 6. Níveis de autonomia

A autonomia é concedida por Fatia W e calibrada pelo risco:

- **CH-0 — Consultar:** ler, analisar e explicar, sem alterações externas.
- **CH-1 — Propor:** preparar plano, contrato, prompt ou recomendação, sem executar mudanças.
- **CH-2 — Executar isolado:** alterar, testar, commitar e abrir Draft PR em ambiente isolado, sem integrar.
- **CH-3 — Integrar condicionado:** integrar somente quando gates e políticas estiverem satisfeitos, houver autorização e a trilha for auditável.

O nível define o teto da autorização, não uma obrigação de usar toda a autonomia disponível.

## 7. Papéis e autoridade

### 7.1 Hallan — Product Owner e responsável humano

Compete ao Product Owner:

- definir intenção, prioridade e limites;
- aprovar decisões que alterem produto, risco, custo, privacidade ou monetização;
- aceitar ou rejeitar a fatia com base nas evidências;
- autorizar expansão de escopo, publicação e merge.

### 7.2 Agente coordenador

Compete ao agente coordenador:

- ler as fontes normativas antes de agir;
- transformar a intenção em escopo verificável;
- separar fatos, hipóteses e recomendações;
- delegar somente quando houver vantagem clara e limites definidos;
- consolidar evidências e declarar incertezas;
- parar diante de conflito normativo, falta de autoridade ou risco não autorizado.

No arranjo de origem do método, o ChatGPT exerce a orquestração cognitiva: contextualiza, recorta, harmoniza o contrato e revisa evidências.

### 7.3 Agente executor

Compete ao agente executor:

- atuar apenas no recorte delegado;
- preservar alterações externas ao seu trabalho;
- executar as verificações solicitadas;
- retornar arquivos afetados, resultados, riscos e bloqueios;
- não ampliar produto ou arquitetura por iniciativa própria.

No arranjo de origem do método, o Codex exerce a execução agêntica dentro do escopo fechado. Outros agentes podem ocupar esse papel quando forem explicitamente autorizados.

Agentes não aprovam o próprio trabalho em nome do Product Owner.

## 8. Guardrails do MindFlip

Toda evolução deve preservar os seguintes limites:

### 8.1 Integridade científica

- explicações devem distinguir observação, hipótese e conhecimento estabelecido;
- pontuação e tempo não podem ser apresentados como medida clínica ou de inteligência;
- alegações científicas relevantes devem ter fonte confiável quando publicadas;
- linguagem divertida não deve criar promessa falsa sobre “poder mental”.

### 8.2 Segurança perceptiva e acessibilidade

- experiências com movimento, flashes, fixação ou possível desconforto precisam de aviso adequado;
- a preferência de movimento reduzido deve ser respeitada;
- nenhum desafio pode depender exclusivamente de cor, áudio ou animação sem alternativa razoável;
- controles devem ser utilizáveis por teclado e possuir nomes acessíveis;
- uma experiência deve permitir interrupção sem punição.

### 8.3 Privacidade

- coletar apenas o necessário e declarar o que realmente ocorre;
- não afirmar que dados ficam apenas no dispositivo se alguma integração os transmitir;
- analytics, publicidade e integrações externas exigem revisão da política de privacidade;
- segredos e credenciais nunca devem entrar no repositório ou no cliente.

### 8.4 Monetização ética

- publicidade deve ser claramente identificada;
- anúncios não podem imitar controles, bloquear saída ou interromper teste cronometrado;
- monetização não pode reduzir acessibilidade nem explorar alegações de saúde;
- qualquer novo parceiro ou rastreamento requer autorização humana e revisão de privacidade.

### 8.5 Engenharia

- **MindFlip** é o nome canônico;
- TypeScript deve permanecer válido;
- mudanças devem preservar separação entre conteúdo, interação, persistência e interface;
- nova dependência precisa de necessidade explícita;
- nenhum recurso deve ser descrito como funcional sem evidência no código ou no ambiente verificado.

## 9. Fontes de verdade

Quando houver conflito, prevalece esta ordem:

1. autorização explícita mais recente do Product Owner;
2. documentação normativa em `docs/`;
3. `AGENTS.md`;
4. contrato da Fatia W em andamento;
5. código e testes;
6. textos auxiliares, prompts e conversas.

A autorização mais recente pode mudar direção, mas a mudança deve ser registrada se tiver efeito durável.

## 10. Definition of Ready

Uma Fatia W está pronta para entrar em **Agir** quando:

- objetivo e valor estão compreendidos;
- baseline foi confirmada;
- escopo e exclusões estão registrados;
- decisões aprovadas e proibidas estão claras;
- critérios são verificáveis;
- autonomia e responsável humano estão definidos;
- conflitos normativos e riscos materiais foram avaliados.

Se faltar informação capaz de mudar materialmente a solução, a fatia permanece em Harmonizar.

## 11. Definition of Done

Uma fatia só pode ser declarada concluída quando:

- o objetivo foi atendido sem ultrapassar o escopo;
- os critérios de aceitação possuem evidência;
- verificações aplicáveis foram executadas e relatadas;
- riscos, limitações e pendências são explícitos;
- documentação e comportamento não se contradizem;
- o Pacote de Evidências está completo;
- houve Registro de Aceitação humano;
- a integração ocorreu quando autorizada;
- recursos temporários foram limpos;
- o aprendizado foi registrado na Memória Versionada.

“Parece funcionar” não é evidência.

## 12. Condições gerais de parada

O trabalho deve parar e retornar ao Product Owner quando:

- faltar decisão que altere materialmente o resultado;
- houver conflito entre fontes normativas;
- a solução exigir acesso, custo, coleta de dados ou publicação não autorizados;
- a correção demandar expansão relevante de escopo;
- uma verificação crítica falhar e não houver correção segura dentro da fatia;
- não for possível provar uma afirmação necessária.

## 13. Regra de evolução

Esta fundação pode evoluir por nova Fatia W documental. Alterações devem explicar motivação, impacto e compatibilidade com decisões anteriores. Mudanças silenciosas nos princípios C.H. não são aceitas.
