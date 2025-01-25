// Fecha del evento (reemplaza con la fecha real)
const eventDate = new Date('2025-10-25T12:00:00');
const startDate = new Date("2024-09-14T00:00:00");
const weddingDate = eventDate; // Alias para mayor claridad

const noviosElement = document.getElementById("novios");
const timelineLength = document.querySelector(".line").clientWidth; // Longitud de la línea

// Función para actualizar el contador regresivo
function updateCountdown() {
  const now = new Date();
  const timeDifference = weddingDate - now;

  if (timeDifference > 0) {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Actualiza el HTML
    document.getElementById('days').textContent = days < 10 ? '0' + days : days;
    document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
  } else {
    // Cuando el contador llegue a cero
    document.getElementById('countdown').innerHTML = '<h2>The Big Day Has Arrived!</h2>';
  }
}

// Función para calcular el progreso y mover el icono
function updateProgress() {
  const now = new Date();
  const totalDuration = weddingDate - startDate;
  const timePassed = now - startDate;
  const progress = Math.max(0, Math.min(1, timePassed / totalDuration)); // Progreso entre 0 y 1

  // Calcula la posición del elemento en la línea
  const position = progress * timelineLength; // Posición en píxeles a lo largo de la línea

  // Actualiza la posición del elemento `#novios`
  noviosElement.style.transform = `translateX(${position}px)`;
}

// Llama a ambas funciones periódicamente
setInterval(() => {
  updateCountdown();
  updateProgress();
}, 1000);
