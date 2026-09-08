# AGENTS.md

Este arquivo contém instruções obrigatórias para qualquer humano ou agente de IA que trabalhe neste repositório.

## 1. Identidade e idioma

- Nome canônico do produto: **MindFlip**.
- Idioma principal da documentação e da experiência: português do Brasil.
- Código pode usar nomes técnicos em inglês quando isso mantiver coerência com o projeto.
- Não renomeie produto, conceitos públicos ou estrutura central sem autorização explícita.

## 2. Leitura obrigatória

Antes de propor ou executar mudanças:

1. leia este arquivo integralmente;
2. leia `docs/00-FUNDACAO-CH.md`;
3. leia o registro da Fatia W atual;
4. leia integralmente os arquivos que serão alterados e seus consumidores diretos;
5. confirme branch, commit-base e estado atual antes de escrever.

Instruções mais específicas em arquivos `AGENTS.md` de subdiretórios, se vierem a existir, complementam este documento no escopo correspondente.

## 3. Contrato de trabalho C.H.

Nenhuma implementação começa sem uma Fatia W contendo:

- objetivo;
- escopo incluído;
- exclusões;
- critérios de aceitação;
- verificações;
- condição de parada.

Se algum item estiver ausente e isso puder mudar materialmente a solução, pare e solicite decisão.

## 4. Controle de escopo

- Implemente apenas o necessário para a Fatia W autorizada.
- Não adicione funcionalidades “aproveitando a oportunidade”.
- Não faça refatoração ampla junto com correção ou documentação específica.
- Registre descobertas fora do escopo como pendências; não as corrija silenciosamente.
- Não altere código executável em fatia declarada apenas documental.
- Preserve mudanças preexistentes que não pertencem à tarefa.

## 5. Fluxo Git

- Nunca trabalhe diretamente em `main`.
- Crie branch descritiva a partir do commit-base confirmado.
- Prefira commits pequenos e semanticamente coerentes.
- Não faça merge, publicação ou deployment sem autorização do Product Owner.
- Não reescreva histórico nem use ações destrutivas sem autorização explícita.
- Ao concluir, informe branch, commits, arquivos alterados e verificações.

## 6. Qualidade e evidência

Para mudanças de código, execute no mínimo, quando disponíveis:

~~~bash
npm run lint
npm run build
~~~

Execute testes específicos quando existirem ou quando forem adicionados pela fatia.

Para mudanças exclusivamente documentais:

- confirme links e caminhos;
- verifique consistência entre documentos;
- confirme que nenhum arquivo executável foi alterado;
- compare a branch com o commit-base.

Nunca declare teste, build, revisão visual ou comportamento como aprovado sem tê-lo executado. Diferencie claramente:

- **verificado:** há evidência executada;
- **inferido:** conclusão baseada em leitura;
- **não verificado:** faltou ambiente, acesso ou ferramenta.

## 7. Regras de produto

### Conteúdo científico

- Não apresente experiências como testes de inteligência ou diagnósticos.
- Não invente fontes, pesquisas, estatísticas ou explicações.
- Alegações científicas publicáveis devem ser verificáveis.
- Preserve o caráter lúdico sem exagerar conclusões sobre o usuário.

### Acessibilidade e segurança

- Respeite a preferência de movimento reduzido.
- Sinalize experiências capazes de provocar desconforto, vertigem ou fotossensibilidade.
- Preserve navegação por teclado, foco visível, rótulos acessíveis e contraste legível.
- Não torne cor, som ou movimento o único meio de transmitir informação essencial.

### Privacidade e segurança técnica

- Nunca inclua credenciais, tokens ou segredos no repositório ou bundle do cliente.
- Não adicione coleta, analytics real, anúncios reais ou transmissão externa sem autorização.
- Toda coleta deve corresponder ao texto de privacidade publicado.
- Valide entradas vindas de URL, armazenamento local ou serviços externos antes de usá-las.

### Monetização

- Anúncios devem ser identificados e não invasivos.
- Não use dark patterns, botões falsos, bloqueio de saída ou interrupção durante desafios.
- Integração publicitária exige revisão de privacidade, desempenho e acessibilidade.

## 8. Arquitetura atual a preservar

O MindFlip é uma aplicação React + TypeScript + Vite. No estado inicial:

- `src/App.tsx` coordena navegação, preferências, progresso e modais;
- `src/components/` contém interface e experiências;
- `src/components/illusions/` contém motores visuais;
- `src/data/illusions.ts` contém o catálogo e conteúdo;
- `src/utils/storage.ts` contém persistência local;
- `src/utils/analytics.ts` contém abstração de eventos;
- `src/utils/audio.ts` contém feedback sonoro;
- `src/types.ts` contém contratos TypeScript.

Essa descrição documenta o estado observado; não autoriza congelamento nem refatoração.

## 9. Delegação

Toda delegação para outro agente deve declarar:

- tarefa concreta;
- arquivos ou domínio permitidos;
- exclusões;
- resultado esperado;
- verificações;
- condição de parada.

O agente coordenador deve revisar o resultado delegado antes de incorporá-lo. Agentes executores não ampliam a própria autorização.

## 10. Relatório final obrigatório

A entrega deve incluir:

1. resultado alcançado;
2. branch e commit-base;
3. commits produzidos;
4. arquivos alterados;
5. verificações com resultados reais;
6. riscos ou limitações;
7. itens fora do escopo;
8. recomendação da próxima Fatia W, sem executá-la;
9. estado: **pronto para revisão**, nunca “aprovado” em nome do Product Owner.
