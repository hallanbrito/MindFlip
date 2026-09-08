# Matriz de Rastreabilidade Científica do Catálogo

Status: revisada na W03

Data da revisão: 2026-09-08

Escopo: catálogo publicado em `src/data/illusions.ts`

## 1. Como interpretar esta matriz

Esta matriz liga cada experiência do MindFlip às fontes que sustentam sua explicação pública. Ela não afirma que uma única referência encerra o debate sobre o mecanismo de uma ilusão.

As fontes são classificadas como:

- **estudo primário:** pesquisa experimental ou observacional;
- **revisão:** síntese crítica de múltiplos estudos;
- **fonte histórica:** publicação original usada para autoria ou data;
- **institucional:** demonstração mantida pela instituição ou pelo autor responsável.

O campo `supports` de `src/data/scientificReferences.ts` registra o limite do que cada fonte sustenta. A interface mostra as referências junto à explicação aprofundada de cada experiência.

## 2. Cobertura do catálogo

| Experiência | Fenômeno ou afirmação rastreada | Evidência associada | Tratamento editorial da W03 |
|---|---|---|---|
| Rotação Ambígua | Silhueta giratória biestável; influência de intenção, fixação e velocidade | `silhouette-spinner-2012`; `multistable-perception-2009` | Removeu linguagem de “adivinhação” e limitou a conclusão à alternância perceptiva relatada |
| Cubo de Necker | Reversão de uma figura geométrica ambígua | `necker-1832`; `multistable-perception-2009` | Separou descrição histórica de modelos atuais e retirou “dominância neural” não medida |
| Vaso de Rubin | Alternância figura-fundo no estímulo faces-vaso | `face-vase-2011`; `multistable-perception-2009` | Removeu a afirmação absoluta de impossibilidade de ver as duas formas |
| Sombra no Tabuleiro | Mesma luminância física com aparência diferente no contexto de sombra | `adelson-checkershadow-1995` | Substituiu a explicação determinista por contraste, contexto e organização aparente da cena |
| Círculos de Ebbinghaus | Efeito do tamanho e da distância dos indutores | `ebbinghaus-2005` | Removeu a alegação não rastreada sobre pratos e consumo de comida |
| Müller-Lyer | Alteração do comprimento aparente pelas terminações | `muller-lyer-2005` | Apresentou o mecanismo como debatido e retirou generalização cultural absoluta |
| Parede de Café | Inclinação aparente produzida por blocos deslocados e faixas intermediárias | `cafe-wall-1979` | Identificou “travamento de bordas” como modelo, não fato neural diretamente observado |
| Lilac Chaser | Desvanecimento durante fixação combinado com pós-imagem de cor | `microsaccades-fading-2006`; `color-afterimages-2012` | Separou os dois fenômenos e removeu a ideia simples de fotorreceptores “esgotados” |
| Pós-Efeito de Movimento | Movimento aparente depois de adaptação a um padrão móvel | `motion-aftereffect-2008` | Substituiu localização exclusiva em MT/V5 por adaptação em múltiplos níveis visuais |
| Desvanecimento Periférico | Perda e restauração de visibilidade durante fixação | `microsaccades-fading-2006` | Removeu a alegação de cessação de impulsos e incluiu microssacadas e deriva ocular |
| Ponto Cego | Ausência de fotorreceptores no disco óptico e preenchimento perceptivo | `perceptual-filling-in-2006` | Removeu dimensão anatômica e narrativa histórica não sustentadas; qualificou o mecanismo |
| Cores Complementares | Pós-imagem cromática após adaptação | `color-afterimages-2012` | Trocou “receptores cansados” por geração retinal com possível modificação cortical |
| Desafio Stroop | Interferência entre leitura da palavra e nomeação da cor | `stroop-1935` | Removeu comparação não sustentada entre crianças e adultos diplomados |
| Triângulo de Kanizsa | Percepção de contorno sem borda física contínua | `illusory-contours-1984` | Limitou a evidência neural ao estudo em área visual 18 de macacos e removeu especulação evolutiva |
| Grade de Hermann | Manchas aparentes nas interseções e dependência da geometria | `hermann-grid-2005` | Corrigiu a explicação retinal clássica isolada, considerada insuficiente pelos experimentos citados |

Cobertura: **15 de 15 experiências**, sem referência ausente, desconhecida ou órfã segundo o teste automatizado da W03.

## 3. Referências versionadas

Os metadados completos ficam em `src/data/scientificReferences.ts`, incluindo título, autores, ano, tipo, URL persistente, DOI quando existente e a descrição do que a fonte sustenta.

Fontes principais consultadas:

1. Liu et al. (2012), *Investigation of bistable perception with the “silhouette spinner”*. <https://doi.org/10.1016/j.visres.2012.03.005>
2. Sterzer, Kleinschmidt e Rees (2009), *The neural bases of multistable perception*. <https://doi.org/10.1016/j.tics.2009.04.006>
3. Necker (1832), *Observations on some remarkable optical phænomena...*. <https://doi.org/10.1080/14786443208647909>
4. Pitts et al. (2011), *Early stages of figure-ground segregation during perception of the face-vase*. <https://doi.org/10.1162/jocn.2010.21438>
5. Adelson (1995), *Checker Shadow Illusion*. <https://persci.mit.edu/gallery/checkershadow/>
6. Roberts, Harris e Yates (2005), *The roles of inducer size and distance in the Ebbinghaus illusion*. <https://doi.org/10.1068/p5273>
7. Howe e Purves (2005), *The Müller-Lyer illusion explained by the statistics of image-source relationships*. <https://doi.org/10.1073/pnas.0409314102>
8. Gregory e Heard (1979), *Border locking and the Café Wall illusion*. <https://doi.org/10.1068/p080365>
9. Martinez-Conde et al. (2006), *Microsaccades counteract visual fading during fixation*. <https://doi.org/10.1016/j.neuron.2005.11.033>
10. Mather et al. (2008), *The motion aftereffect reloaded*. <https://doi.org/10.1016/j.tics.2008.09.002>
11. Komatsu (2006), *The neural mechanisms of perceptual filling-in*. <https://doi.org/10.1038/nrn1869>
12. Zaidi et al. (2012), *Neural locus of color afterimages*. <https://doi.org/10.1016/j.cub.2011.12.021>
13. Stroop (1935), *Studies of interference in serial verbal reactions*. <https://doi.org/10.1037/h0054651>
14. von der Heydt, Peterhans e Baumgartner (1984), *Illusory contours and cortical neuron responses*. <https://doi.org/10.1126/science.6539501>
15. Schiller e Carvey (2005), *The Hermann grid illusion revisited*. <https://doi.org/10.1068/p5447>

## 4. Limites

- As demonstrações do MindFlip não reproduzem necessariamente os parâmetros experimentais das publicações.
- Referenciar uma fonte não transforma tempo, pontuação ou relato do usuário em medida clínica.
- Mecanismos científicos em debate são apresentados como modelos ou propostas, não como causa única determinada.
- A revisão cobre as afirmações do catálogo desta baseline; novos textos ou experiências exigem nova verificação.
