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

### 2.1 Valores

1. **Intenção verificável:** toda mudança deve responder a uma necessidade explícita.
2. **Evidência reproduzível:** conclusão exige prova que outra pessoa consiga conferir.
3. **Fatias pequenas e reversíveis:** mudanças devem ser compreensíveis e fáceis de desfazer.
4. **Memória explícita:** decisões duráveis pertencem ao repositório, não apenas ao chat.
5. **Responsabilidade humana:** decisões de produto, risco e publicação permanecem humanas.
6. **Orquestração adequada:** usar apenas os agentes e ferramentas necessários para a fatia.

## 3. Unidade de trabalho: Fatia W

Uma **Fatia W** é uma unidade pequena, justificável, reversível e verificável de evolução do produto.

Antes da execução, a fatia deve declarar:

- identificador e título;
- objetivo;
- contexto ou problema;
- escopo incluído;
- exclusões explícitas;
- critérios de aceitação;
- verificações obrigatórias;
- condição de parada;
- commit-base e branch de trabalho, quando houver alteração no repositório.

Uma fatia não autoriza trabalho implícito. Descobertas fora do escopo devem ser registradas como candidatas futuras, não implementadas silenciosamente.

## 4. Papéis e autoridade

### 4.1 Hallan — Product Owner e responsável humano

Compete ao Product Owner:

- definir intenção, prioridade e limites;
- aprovar decisões que alterem produto, risco, custo, privacidade ou monetização;
- aceitar ou rejeitar a fatia com base nas evidências;
- autorizar expansão de escopo, publicação e merge.

### 4.2 Agente coordenador

Compete ao agente coordenador:

- ler as fontes normativas antes de agir;
- transformar a intenção em escopo verificável;
- separar fatos, hipóteses e recomendações;
- delegar somente quando houver vantagem clara e limites definidos;
- consolidar evidências e declarar incertezas;
- parar diante de conflito normativo, falta de autoridade ou risco não autorizado.

### 4.3 Agente executor

Compete ao agente executor:

- atuar apenas no recorte delegado;
- preservar alterações externas ao seu trabalho;
- executar as verificações solicitadas;
- retornar arquivos afetados, resultados, riscos e bloqueios;
- não ampliar produto ou arquitetura por iniciativa própria.

Agentes não aprovam o próprio trabalho em nome do Product Owner.

## 5. Fluxo C.H.

1. **Intenção:** registrar o resultado desejado e por que ele importa.
2. **Contrato da fatia:** definir escopo, exclusões, aceite e parada.
3. **Leitura:** consultar documentação normativa e código afetado.
4. **Execução:** trabalhar em branch própria, com mudanças mínimas.
5. **Verificação:** executar testes, análise estática, build e/ou inspeção documental aplicáveis.
6. **Evidência:** apresentar resultado real, inclusive falhas e limitações.
7. **Decisão humana:** o Product Owner aprova, pede correção ou encerra.
8. **Memória:** incorporar decisões aceitas à documentação e ao histórico do repositório.

## 6. Guardrails do MindFlip

Toda evolução deve preservar os seguintes limites:

### 6.1 Integridade científica

- explicações devem distinguir observação, hipótese e conhecimento estabelecido;
- pontuação e tempo não podem ser apresentados como medida clínica ou de inteligência;
- alegações científicas relevantes devem ter fonte confiável quando publicadas;
- linguagem divertida não deve criar promessa falsa sobre “poder mental”.

### 6.2 Segurança perceptiva e acessibilidade

- experiências com movimento, flashes, fixação ou possível desconforto precisam de aviso adequado;
- a preferência de movimento reduzido deve ser respeitada;
- nenhum desafio pode depender exclusivamente de cor, áudio ou animação sem alternativa razoável;
- controles devem ser utilizáveis por teclado e possuir nomes acessíveis;
- uma experiência deve permitir interrupção sem punição.

### 6.3 Privacidade

- coletar apenas o necessário e declarar o que realmente ocorre;
- não afirmar que dados ficam apenas no dispositivo se alguma integração os transmitir;
- analytics, publicidade e integrações externas exigem revisão da política de privacidade;
- segredos e credenciais nunca devem entrar no repositório ou no cliente.

### 6.4 Monetização ética

- publicidade deve ser claramente identificada;
- anúncios não podem imitar controles, bloquear saída ou interromper teste cronometrado;
- monetização não pode reduzir acessibilidade nem explorar alegações de saúde;
- qualquer novo parceiro ou rastreamento requer autorização humana e revisão de privacidade.

### 6.5 Engenharia

- **MindFlip** é o nome canônico;
- TypeScript deve permanecer válido;
- mudanças devem preservar separação entre conteúdo, interação, persistência e interface;
- nova dependência precisa de necessidade explícita;
- nenhum recurso deve ser descrito como funcional sem evidência no código ou no ambiente verificado.

## 7. Fontes de verdade

Quando houver conflito, prevalece esta ordem:

1. autorização explícita mais recente do Product Owner;
2. documentação normativa em `docs/`;
3. `AGENTS.md`;
4. contrato da Fatia W em andamento;
5. código e testes;
6. textos auxiliares, prompts e conversas.

A autorização mais recente pode mudar direção, mas a mudança deve ser registrada se tiver efeito durável.

## 8. Critério de Pronto C.H.

Uma fatia só pode ser declarada concluída quando:

- o objetivo foi atendido sem ultrapassar o escopo;
- os critérios de aceitação possuem evidência;
- verificações aplicáveis foram executadas e relatadas;
- riscos, limitações e pendências são explícitos;
- documentação e comportamento não se contradizem;
- a mudança está isolada em branch e pronta para revisão;
- o Product Owner recebeu informação suficiente para decidir.

“Parece funcionar” não é evidência.

## 9. Condições gerais de parada

O trabalho deve parar e retornar ao Product Owner quando:

- faltar decisão que altere materialmente o resultado;
- houver conflito entre fontes normativas;
- a solução exigir acesso, custo, coleta de dados ou publicação não autorizados;
- a correção demandar expansão relevante de escopo;
- uma verificação crítica falhar e não houver correção segura dentro da fatia;
- não for possível provar uma afirmação necessária.

## 10. Regra de evolução

Esta fundação pode evoluir por nova Fatia W documental. Alterações devem explicar motivação, impacto e compatibilidade com decisões anteriores. Mudanças silenciosas nos princípios C.H. não são aceitas.
