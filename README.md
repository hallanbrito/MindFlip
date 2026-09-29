# MindFlip

Laboratório interativo de percepção humana com ilusões visuais, microdesafios e explicações científicas acessíveis. Foi criado para despertar curiosidade sobre como interpretamos o que vemos.

## Em 30 segundos

- **Experiência:** explore ilusões e desafios visuais, acompanhe seu progresso no navegador e leia explicações acessíveis.
- **Tecnologias:** React, TypeScript e Vite, com testes automatizados para regras específicas.
- **Estado:** prova de conceito com a [W07 (piloto publicitário)](docs/worklogs/W07-INTEGRACAO-PUBLICITARIA-PILOTO.md) integrada e desligada por padrão. A W08 de retenção e desafio diário está planejada; não é uma entrega deste repositório.
- **Aprendizado demonstrado:** construção de interface interativa, persistência local, atenção à acessibilidade e separação entre experiência, conteúdo e configuração opcional.

As experiências são lúdicas e educacionais; não constituem avaliação médica, oftalmológica ou neurocognitiva.

## Estado e decisões do projeto

A evolução ocorre em **Fatias W** pelo Método C.H. (ChatGPT–Hallan / Colaboração Híbrida). Para aprofundar, consulte a [Fundação C.H.](docs/00-FUNDACAO-CH.md), as [regras de colaboração](AGENTS.md), o [registro da W07](docs/worklogs/W07-INTEGRACAO-PUBLICITARIA-PILOTO.md) e a [arquitetura de monetização ética](docs/01-ARQUITETURA-MONETIZACAO.md).

## Princípios do produto

- curiosidade científica sem promessas diagnósticas;
- experiência acessível, inclusive com movimento reduzido;
- privacidade por padrão;
- monetização identificada e não invasiva;
- evolução em mudanças pequenas, verificáveis e reversíveis;
- decisão final e responsabilidade sob controle humano.

## Execução local

Requisitos: [Bun](https://bun.sh/) 1.4.2 ou compatível.

~~~bash
bun install --frozen-lockfile
bun run dev
~~~

Verificações disponíveis:

~~~bash
bun run lint   # checagem de tipos (tsc --noEmit)
bun test       # testes automatizados
bun run build  # build de produção
~~~

## Piloto de monetização

O adaptador piloto do Google AdSense é opcional e permanece desligado por padrão. Depois da aprovação da conta e do site, copie `.env.example` para o ambiente de publicação, substitua os identificadores públicos e habilite `VITE_ADSENSE_ENABLED=true`.

O piloto usa apenas o posicionamento `between_challenges`, solicita anúncios não personalizados e só carrega o provedor após escolha positiva do usuário. A configuração de privacidade e mensagens do AdSense deve ser concluída antes da ativação pública.

## Nome canônico

**MindFlip** é o nome oficial do produto e do projeto. Referências históricas a outros nomes não definem a identidade atual.
