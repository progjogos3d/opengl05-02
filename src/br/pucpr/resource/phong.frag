#version 330

uniform vec3 uLightDir;         //Direcao da luz

uniform vec3 uAmbientLight;     //Cor do componente ambiente
uniform vec3 uDiffuseLight;     //Cor do componente difuso

//Normal recebida do vertex shader. Já em coordenadas do mundo
in vec3 vNormal;

out vec4 outColor;

void main() {
    //Calculo do componente ambiente. Como ele não reflete, é aplicado diretamente a cena.
    vec3 ambient = uAmbientLight;

    //Calculo do componente difuso. A intensidade do brilho será equivalente ao cosseno do angulo entre a normal e o
    //inverso da luz. Como L e N são vetores unitários, o cosseno pode ser obtido diretamente pelo produto escalar.
    vec3 L = normalize(uLightDir);
	vec3 N = normalize(vNormal);
    float diffuseIntensity = max(dot(N, -L), 0.0);
    vec3 diffuse = diffuseIntensity * uDiffuseLight;

    //A cor final da luz é obtida somando os dois componentes. Valores maiores do que 1.0 serão truncados.
    vec3 color = clamp(ambient + diffuse, 0.0, 1.0);
    outColor = vec4(color, 1.0);
}