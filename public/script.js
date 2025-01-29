// Fecha del evento
const eventDate = new Date("2025-10-25T12:00:00");
const startDate = new Date("2024-09-14T00:00:00");
const weddingDate = eventDate;

const noviosElement = document.getElementById("novios");
const startIcon = document.querySelector(".start-icon");
const endIcon = document.querySelector(".end-icon");
const timelineLength = document.querySelector(".line").clientWidth;

// Función para actualizar el contador regresivo
function updateCountdown() {
    const now = new Date();
    const timeDifference = weddingDate - now;

    if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
    } else {
        document.getElementById("countdown").innerHTML = '<h2>¡El gran día ha llegado!</h2>';
    }
}

setInterval(updateCountdown, 1000);

// Función para calcular el progreso en la línea de tiempo
function updateProgress() {
    const now = new Date();
    const totalDuration = weddingDate - startDate;
    const timePassed = now - startDate;
    const progress = Math.max(0, Math.min(1, timePassed / totalDuration));

    const position = progress * timelineLength;
    noviosElement.style.transform = `translateX(${position}px)`;

    const progressPercentage = Math.round(progress * 100);
    document.getElementById("progress-percentage").textContent = `${progressPercentage}%`;

    startIcon.style.left = `0px`;
    endIcon.style.left = `${timelineLength - endIcon.clientWidth}px`;
}

setInterval(() => {
    updateCountdown();
    updateProgress();
}, 1000);

// Funciones para mostrar y ocultar secciones
document.getElementById('info-evento').addEventListener('click', function() {
    let buttons = document.getElementById('buttons-container');
    let infoEvento = document.getElementById('info-evento-container');
    
    buttons.style.transform = 'translateX(100%)';
    setTimeout(() => {
        buttons.classList.add('hidden');
        infoEvento.style.display = 'block';
        setTimeout(() => infoEvento.style.opacity = '1', 100);
    }, 500);
});

document.getElementById('confirmar-asistencia').addEventListener('click', function() {
    let buttons = document.getElementById('buttons-container');
    let confirmarAsistencia = document.getElementById('confirmar-asistencia-container');
    
    buttons.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        buttons.classList.add('hidden');
        confirmarAsistencia.style.display = 'block';
        setTimeout(() => confirmarAsistencia.style.opacity = '1', 100);
    }, 500);
});

function resetView() {
    let buttons = document.getElementById('buttons-container');
    let infoEvento = document.getElementById('info-evento-container');
    let confirmarAsistencia = document.getElementById('confirmar-asistencia-container');

    infoEvento.style.opacity = '0';
    confirmarAsistencia.style.opacity = '0';

    setTimeout(() => {
        infoEvento.style.display = 'none';
        confirmarAsistencia.style.display = 'none';
        buttons.classList.remove('hidden');
        buttons.style.transform = 'translateX(0)';
    }, 500);
}

document.querySelectorAll(".volver-btn").forEach(button => {
    button.addEventListener("click", resetView);
});

// Función para enviar los datos a Google Sheets

const scriptURL = "https://script.google.com/macros/s/AKfycbzhPeoPIlGEXNO-eEKnsJcNNq-gTENISv_dtC0w3P4rt7u0Ey71O2QjgqAIWNd8jN19Vg/exec";


function enviarDatos() {
    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;
    const busIda = document.getElementById("bus-ida").value;
    const busVuelta = document.getElementById("bus-vuelta").value;
    const allergies = document.getElementById("allergies").value;
    const considerations = document.getElementById("considerations").value;

    const data = {
        name,
        attendance,
        busIda,
        busVuelta,
        allergies,
        considerations,
    };

    

    console.log("Datos a enviar:", data);

    fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then((response) => {
        if (response.ok) {
            alert("Datos enviados correctamente. ¡Gracias por confirmar!");
        } else {
            alert("Hubo un problema al enviar los datos.");
        }
    })
    .catch((error) => {
        console.error("Error al enviar los datos:", error);
        alert("No se pudo enviar la información. Intenta más tarde.");
    });
}
