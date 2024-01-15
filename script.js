let intentosMaximos = 6;
let palabra = "";
let palabraPantalla = "";
const canvas = document.getElementById("dibujo");

function jugar() {
  formatoJuego();
  palabra = String(seleccionarPalabra(['SANDWICH', 'LECHUGA', 'SEMILLA', 'ANDORRA', 'CLAUSTROFOBIA', 'DINOSAURIO']));
  palabraInicial();
}
function formatoJuego() {
  document.getElementById('btnJugar').style.display = 'none';
  document.getElementById('bloqueJuego').style.display = 'block';
  formatoNumeroIntentos();
}
/**
 * Función para mostrar todos los asteriscos iniciales en función de la longitud de la palabra
 */
function palabraInicial() {
  palabraPantalla = "*".repeat(palabra.length);
  document.getElementById('palabra').textContent = palabraPantalla;
}
function formatoNumeroIntentos() {
  document.getElementById('numIntentos').textContent = intentosMaximos;
}
function seleccionarPalabra(listaPalabras) {
  return listaPalabras[Math.floor(Math.random() * (listaPalabras.length - 0) + 0)];
}
/**
 * Si solo es un carácter, se comprueba la letra.
 * Si se introduce una palabra de la longitud de la palabra a acertar, se tomará como que se intenta solucionar.
 * Si no se cumplen ninguna de las condiciones, lo tomaré como error (no restaré intentos ni nada, simplemente lo tomaré como error).
 */
function intentar() {
  let valorIntroducido = document.getElementById('intento').value.toUpperCase();
  valorIntroducido.length == 1 ? comprobarLetra(valorIntroducido) : valorIntroducido.length == palabra.length ? comprobarPalabra(valorIntroducido) : alert("Valor introducido incorrecto.");
}
function comprobarLetra(letra) {
  let palabraPantallaNueva = "";
  for (let i = 0; i < palabra.length; i++) {
    palabra[i] == letra ? palabraPantallaNueva += letra : palabraPantallaNueva += palabraPantalla[i];
  }
  //Comprobar que se acierta la palabra introduciendo únicamente letras
  palabraPantallaNueva == palabraPantalla ? actualizarIntentos() : actualizarPalabraPantalla(palabraPantallaNueva);
}
function comprobarPalabra(palabraIntroducida) {
  palabra == palabraIntroducida ? ganar() : perder();
}
function actualizarIntentos() {
  intentosMaximos--;
  formatoNumeroIntentos();
  draw();
  intentosMaximos == 0 ? perder() : null;
}
function actualizarPalabraPantalla(valor) {
  palabraPantalla = valor;
  document.getElementById('palabra').textContent = palabraPantalla;
  palabraPantalla == palabra ? ganar() : null;
}
function perder() {
  document.getElementById('resultado').textContent = `Has perdido. La palabra era: ${palabra}`;
  finPartida()
}
function ganar() {
  document.getElementById('resultado').textContent = "Has ganado"
  finPartida();
}
function finPartida() {
  document.getElementById('btnVolverJugar').style.display = 'block';
  document.getElementById('btnIntentar').disabled = true;
  document.getElementById('btnIntentar').style.backgroundColor = 'grey';
  document.getElementById('intento').disabled = true;
}

//Si se pulsa el botón de volver a jugar, recargar directamente la página
function volverJugar() {
  location.reload();
}

//CANVAS
function draw() {
  let ctx = canvas.getContext('2d');
  /**
   * Para crear el dibujo, se dibujará una parte del muñeco en función del número de intentos.
   * 5 intentos: cabeza
   * 4 intentos: cuerpo
   * 3 intentos: brazo izquierdo
   * 2 intentos: brazo derecho
   * 1 intento: pierna izquierda
   * 0 intentos: pierna derecha
   */
  switch (intentosMaximos) {
    case 5:
      ctx.beginPath();
      ctx.arc(75, 75, 20, 0, Math.PI * 2, true);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(75, 95);
      ctx.lineTo(75, 130);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(75, 110);
      ctx.lineTo(45, 95);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(75, 110);
      ctx.lineTo(105, 95);
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(75, 130);
      ctx.lineTo(60, 150);
      ctx.stroke();
      break;
    case 0:
      ctx.beginPath();
      ctx.moveTo(75, 130);
      ctx.lineTo(90, 150);
      ctx.stroke();
      break;
  }
}
