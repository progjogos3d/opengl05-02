# Aula 05 - Iluminação: Componentes ambiente e difuso

Neste repositório apresentamos o código intermediário da aula de iluminação contendo os componentes ambiente e difuso 
implementados. O código ainda não contempla o material da malha, somente o cálculo da iluminação.

## Componente ambiente

Como o componente representa uma luz muito refletida e sem origem definida, a cor do componente é diretamente aplicado 
ao resultado. Isso porque objetos iluminados nesse componente não apresentariam sombreamento, exatamente como ocorre ao
enxergar um objeto com apenas a luz presente num ambiente com penumbra. 

## Componente difuso

Para esse componente, devemos calcular a atenuação da luz de acordo com o ângulo em que o raio de luz incide e a face
sendo atingida por ele. 

A inclinação da face é dada definindo-se um vetor normalizado, formando um angulo de 90 graus 
com sua superfície intitulado **vetor normal**. Esse vetor torna-se um dos atributos da nossa malha e, num ambiente 
profissional, será gerado pelo software de modelagem.

A atenuação é proporcional ao cosseno do ângulo da normal (N) com a direção do raio da luz (L), invertida (como se o 
raio de luz partisse da face em direção a luz, e não o contrário). Como a N e L são vetores unitários, esse cosseno pode 
ser obtido através do produto escalar, ou seja:

Observe entretanto que essa normal é gerada em coordenadas do modelo, e deve ser convertida para coordenadas do mundo 
antes de ser utilizada. Essa é uma tarefa que cabe ao Vertex Shader.

`intensity = dot(N, -L);`

 ## Combinando os componentes
 
 Os dois componentes são combinados através da soma. Entretanto, deve-se cuidar para que componentes de valores muito 
 altos não somem mais do que 1.0. Nesse caso, os valores devem ser truncados, como fazíamos nas aulas de processamento de 
 imagens (o que for maior que 1.0 em r, g ou b, permanecerá 1.0). No glsl a função `clamp` realiza essa tarefa.