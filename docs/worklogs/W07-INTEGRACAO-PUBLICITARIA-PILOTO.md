# W07 — Integração Publicitária Piloto

Status: aprovado para integração, com ativação comercial adiada  
Tipo: funcional, privacidade e monetização  
Data: 2026-09-09

## 1. Intenção

Preparar um piloto do Google AdSense no posicionamento `between_challenges`, sem ativar tráfego publicitário enquanto a conta, os identificadores e a configuração de privacidade do Product Owner não existirem.

## 2. Baseline e autorização

- Repositório: `hallanbrito/MindFlip`
- Branch-base: `main`
- Commit-base: `fdf1d66b118d0609bbc072828abdce3e7ec8ab52`
- Branch: `feat/w07-adsense-pilot-ready`
- Responsável humano: Hallan
- Autonomia: `CH-2 — Executar isolado`
- Autorização: solicitação explícita para acelerar e executar a W07 em 2026-09-09
- Situação externa declarada: o Product Owner ainda não possui conta no Google AdSense

## 3. Valor esperado

Reduzir o caminho entre a futura aprovação da conta AdSense e o primeiro teste controlado, mantendo publicidade desligada por padrão e impedindo solicitações externas sem configuração válida e escolha positiva do usuário.

## 4. Escopo incluído

- selecionar Google AdSense como primeiro adaptador piloto;
- aceitar configuração pública por variáveis Vite;
- validar `publisher ID` e `slot ID`;
- manter kill switch desligado por padrão;
- solicitar uma escolha não coerciva antes de carregar publicidade;
- pedir somente anúncios não personalizados no piloto;
- permitir continuar sem anúncios e revisar a escolha;
- carregar o script apenas após configuração válida e permissão;
- usar somente `between_challenges`;
- preservar espaço e fornecer falha segura;
- não exibir slot, placeholder ou chamada publicitária enquanto o gate não estiver liberado;
- atualizar os textos de privacidade e cookies conforme o comportamento condicional;
- adicionar testes unitários, documentação operacional e evidências.

## 5. Exclusões

- criação ou aprovação de conta AdSense;
- inserção de IDs reais inexistentes;
- anúncio personalizado;
- auto ads, intersticiais, âncoras, vinhetas ou novos posicionamentos;
- analytics externo ou estimativa de receita;
- geolocalização própria;
- declaração de conformidade jurídica;
- deployment, merge ou publicação;
- implementação de uma CMP certificada fora das ferramentas do parceiro.

## 6. Decisões aprovadas e proibidas

### Aprovadas

- AdSense como adaptador piloto;
- modo não personalizado;
- configuração pública, sem segredos;
- estado seguro `demo` quando faltar qualquer gate;
- persistência local apenas da escolha publicitária;
- um único slot após a experiência.

### Proibidas

- usar IDs falsos em produção;
- carregar Google quando o kill switch estiver desligado;
- tratar ausência de resposta como consentimento;
- impedir acesso após recusa;
- relacionar anúncio a resultado, tempo ou perfil cognitivo;
- afirmar que “não há cookies” quando o piloto estiver habilitado;
- iniciar W08, deployment ou merge.

## 7. Arquivos autorizados

- `src/utils/monetization.ts` e teste correspondente;
- `src/components/AdSlot.tsx`;
- `src/components/AdConsentBanner.tsx`;
- `src/App.tsx`;
- `src/components/LegalPagesModal.tsx`;
- `.env.example`;
- `README.md`;
- `docs/01-ARQUITETURA-MONETIZACAO.md`;
- este worklog.

## 8. Critérios de aceitação

- [x] Configuração ausente ou inválida não faz solicitação externa.
- [x] O kill switch é `false` por padrão.
- [x] O script só carrega após escolha positiva.
- [x] O piloto solicita anúncios não personalizados.
- [x] A recusa mantém todo o MindFlip disponível.
- [x] A escolha pode ser revisada.
- [x] Apenas `between_challenges` pode receber o AdSense.
- [x] Falha ou bloqueio mantém um estado seguro.
- [x] Monetização desligada ou recusada não ocupa espaço na experiência.
- [x] Textos legais correspondem ao comportamento condicional.
- [x] Lint, testes, build e `git diff --check` aprovam.
- [x] Nenhum ID real, segredo, deployment ou merge é incluído.

## 9. Verificações

- `bun install --frozen-lockfile`;
- `bun run lint`;
- `bun test`;
- `bun run build`;
- `git diff --check`;
- revisão do diff e da lista de arquivos;
- busca por IDs, segredos e novos domínios;
- inspeção do bundle para confirmar ausência de IDs reais.

## 10. Parada e reversão

Parar se a solução exigir credencial, conta externa, custo, geolocalização, interpretação jurídica definitiva ou expansão de posicionamentos. Antes do merge, fechar a Draft PR e abandonar a branch restaura a `main`. Depois de integração autorizada, o squash da W07 poderá ser revertido sem migração de dados.

## 11. Implementação

- `createMonetizationConfig` valida o kill switch, o ID de cliente e o slot;
- placeholders documentais compostos apenas por zeros são rejeitados;
- `canRequestAd` exige configuração válida, posicionamento aprovado e escolha `granted`;
- a escolha `granted` ou `denied` é armazenada localmente e pode ser limpa;
- `ensureAdsenseScript` solicita modo não personalizado antes de carregar o script;
- `AdConsentBanner` oferece ações equivalentes para permitir ou continuar sem anúncios;
- `AdSlot` não renderiza enquanto o piloto estiver desligado, sem permissão ou recusado;
- após uma tentativa autorizada, falha do provedor mantém um placeholder seguro;
- somente `between_challenges` pode disparar o adaptador;
- a revisão da escolha limpa o estado e recarrega a página para impedir novas solicitações;
- README, arquitetura e textos legais descrevem o comportamento condicional;
- `.env.example` permanece desligado e usa placeholders rejeitados pelo validador.

## 12. Arquivos alterados

- `.env.example`;
- `README.md`;
- `docs/01-ARQUITETURA-MONETIZACAO.md`;
- `docs/worklogs/W07-INTEGRACAO-PUBLICITARIA-PILOTO.md`;
- `src/App.tsx`;
- `src/components/AdConsentBanner.tsx`;
- `src/components/AdSlot.tsx`;
- `src/components/LegalPagesModal.tsx`;
- `src/utils/monetization.ts`;
- `src/utils/monetization.test.ts`.

Nenhuma dependência ou lockfile foi alterado.

## 13. Pacote de Evidências

### Verificado

- baseline `main@fdf1d66b118d0609bbc072828abdce3e7ec8ab52` confirmada;
- `npx bun@1.4.2 install --frozen-lockfile`: aprovado, 87 pacotes instalados;
- `npx bun@1.4.2 run lint`: aprovado (`tsc --noEmit`);
- `npx bun@1.4.2 test`: 15 de 15 testes aprovados;
- seis testes de monetização cobrem configuração segura, placeholders, consentimento e gates;
- `npx bun@1.4.2 run build`: aprovado, 1.711 módulos transformados;
- build: CSS 72,08 kB e JavaScript 389,66 kB antes de gzip;
- `git diff --check`: aprovado;
- busca no bundle: nenhum publisher ID incorporado;
- `.env.example`: kill switch desligado;
- ausência de mudanças em dependências e lockfile;
- nenhum ID real, segredo, deployment ou merge.

### Não verificado

- anúncio real: não há conta, site aprovado, publisher ID ou slot ID;
- integração no domínio publicado: deployment não autorizado;
- fluxo da CMP do Google: depende da futura conta e configuração no painel;
- revisão visual em navegador: não havia navegador disponível no ambiente de execução.

## 14. Riscos e limitações

- a W07 reduz o trabalho técnico futuro, mas ainda não produz receita;
- anúncios não personalizados ainda podem usar cookies ou tecnologias similares para frequência, relatórios e prevenção de fraude;
- a configuração de privacidade e mensagens deve ser concluída no AdSense antes da ativação pública;
- requisitos regionais e a política do parceiro podem mudar e devem ser reconfirmados na ativação;
- bloqueadores de anúncio ou falhas de rede mantêm o placeholder seguro;
- a escolha local não substitui, por si só, uma CMP certificada quando ela for exigida.

## 15. Próxima fatia aprovada

**W08 — Núcleo de Retenção e Desafio Diário**

Objetivo: transformar o catálogo atual em um ciclo de uso mensurável — desafio, resposta, pontuação, explicação e próximo desafio — antes de qualquer investimento em domínio ou ativação publicitária.

Prioridades aprovadas:

- modo desafio com objetivo claro, cronômetro, resultado e continuação;
- progressão por dificuldade e recorde local, sem cadastro obrigatório;
- desafio diário determinístico;
- resultado compartilhável por ação explícita;
- explicação científica curta após a tentativa;
- validação com usuários antes de retomar monetização.

Domínio próprio, onboarding do AdSense, IDs reais, CMP, `ads.txt` e ativação do kill switch ficam adiados até evidência de retenção. A disponibilidade futura de um nome de domínio não é garantida.

## 16. Estado final

**Aprovado para integração.** A arquitetura publicitária permanece preparada, reversível e desligada por padrão. Em 2026-09-09, o Product Owner decidiu priorizar qualidade, retenção e validação antes de assumir custos ou ativar publicidade.

## 17. Referências operacionais do provedor

- [Encontrar o ID de publisher](https://support.google.com/adsense/answer/105516?hl=pt-BR)
- [Configurações de anúncios não personalizados](https://support.google.com/adsense/answer/7670312)
- [Anúncios personalizados e não personalizados para a LGPD](https://support.google.com/adsense/answer/9956024)
- [Configurar a plataforma de gestão de consentimento](https://support.google.com/adsense/answer/7670013?hl=pt-BR)

Essas páginas documentam requisitos e recursos do Google; não constituem validação jurídica do MindFlip.
