const streakButton = document.getElementById('streak-button');
const streakCountDisplay = document.getElementById('streak-count');
const streakStatus = document.getElementById('streak-status');
const streakImage = document.getElementById('streak-image'); // Selección del elemento de la imagen

let streakData = {
    streak: 0,
    lastUpdated: new Date().getTime()
};

// Cargar datos de la racha desde localStorage
function loadStreakData() {
    const savedData = localStorage.getItem('streakData');
    if (savedData) {
        streakData = JSON.parse(savedData);
    }
    updateStreakDisplay();
}

// Función para actualizar la visualización de la racha
function updateStreakDisplay() {
    const now = new Date().getTime();
    const diff = now - streakData.lastUpdated;
    const oneDay = 24 * 60 * 60 * 1000;

    // Si han pasado más de 24 horas sin mantener la racha, se reinicia
    if (diff >= oneDay) {
        streakData.streak = 0;
        streakStatus.textContent = '¡Racha perdida!';
    }

    streakCountDisplay.textContent = streakData.streak;
    updateStreakImage(); // Llamada para actualizar la imagen de la racha
}

// Función para mantener la racha
function maintainStreak() {
    const now = new Date().getTime();
    const diff = now - streakData.lastUpdated;
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay) {
        streakStatus.textContent = '¡Ya has mantenido tu racha hoy!';
        return;
    }

    streakData.streak += 1;
    streakData.lastUpdated = now;
    streakStatus.textContent = '¡Racha mantenida!';

    // Actualizar visualización y guardar los datos
    updateStreakDisplay();
    saveStreakData();
}

// Función para guardar los datos de la racha en localStorage
function saveStreakData() {
    localStorage.setItem('streakData', JSON.stringify(streakData));
}

// Función para actualizar la imagen de la racha según el conteo de días
function updateStreakImage() {
    if (streakData.streak >= 200) {
        streakImage.src = "images/fuego200.png"; // Imagen para racha de 200 días
    } else if (streakData.streak >= 100) {
        streakImage.src = "images/fuego100.png"; // Imagen para racha de 100 días
    } else if (streakData.streak >= 50) {
        streakImage.src = "images/fuego50.png"; // Imagen para racha de 50 días
    } else if (streakData.streak >= 25) {
        streakImage.src = "images/fuego25.png"; // Imagen para racha de 25 días
    } else if (streakData.streak >= 10) {
        streakImage.src = "images/fuego10.png"; // Imagen para racha de 10 días
    } else {
        streakImage.src = "images/png1.png"; // Imagen predeterminada
    }
}

// Evento al hacer clic en el botón de mantener racha
streakButton.addEventListener('click', maintainStreak);

// Cargar los datos de la racha al cargar la página
loadStreakData();
