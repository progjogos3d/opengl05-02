#version 330

//Matriz de transformação World
uniform mat4 uWorld;

//Matrizes de transformação da camera
uniform mat4 uView;         //Posicionamento
uniform mat4 uProjection;   //Abertura

//Atributos do vertice
in vec3 aPosition;
in vec3 aNormal;   //Vetor unitário que faz angulo de 90 graus com a face sendo iluminada

out vec3 vNormal;

void main() {

	gl_Position = uProjection * uView * uWorld * vec4(aPosition, 1.0);

    //A normal deve estar em coordenadas do mundo
    vNormal = (uWorld * vec4(aNormal, 0.0)).xyz;
}