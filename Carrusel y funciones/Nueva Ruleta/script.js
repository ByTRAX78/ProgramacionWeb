// Seleccionar el elemento de desplazamiento y las flechas de desplazamiento
const scrollElement = document.querySelector(".carousel");
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");

// Obtener la anchura de cada elemento del carrusel
const carouselItemWidth = document.querySelector(".carousel-item").offsetWidth;

// Función para mover el desplazamiento horizontal
function moveScroll(displacement) {
  // Obtener la posición actual del desplazamiento horizontal
  let currentPosition = scrollElement.scrollLeft;

  // Calcular el límite izquierdo
  const leftLimit = 0;

  // Calcular el límite derecho (ancho total del carrusel - ancho de la ventana)
  const rightLimit = scrollElement.scrollWidth - scrollElement.clientWidth;

  // Desplazar el contenido horizontalmente
  scrollElement.scrollTo(currentPosition + displacement, 0);

  // Verificar si alcanzó el límite derecho y volver a la primera imagen
  if (currentPosition + displacement >= rightLimit) {
    scrollElement.scrollTo(0, 0);
  }

  // Verificar si alcanzó el límite izquierdo y volver a la última imagen
  if (currentPosition + displacement <= leftLimit) {
    scrollElement.scrollTo(rightLimit, 0);
  }
}

// Evento al hacer clic en la flecha izquierda
scrollLeft.addEventListener("click", () => {
  moveScroll(-carouselItemWidth); // Desplazar hacia la izquierda
});

// Evento al hacer clic en la flecha derecha
scrollRight.addEventListener("click", () => {
  moveScroll(carouselItemWidth); // Desplazar hacia la derecha
});

// Evento al cargar la página
onload = () => {
  // Mostrar el estilo del elemento de desplazamiento en la consola
  console.log(scrollElement.style);

  // Ocultar la flecha izquierda si el elemento de desplazamiento está oculto
  if (scrollElement.style.display) {
    scrollLeft.style.display = "none";
  }
};
