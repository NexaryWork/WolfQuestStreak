const streakButton = document.getElementById('streak-button');
const streakCountDisplay = document.getElementById('streak-count');
const streakStatus = document.getElementById('streak-status');
const streakImage = document.getElementById('streak-image');

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
    hideStreakStatus();  // Ocultar el estado al cargar
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
        streakStatus.style.display = 'block';  // Mostrar el estado
        streakImage.src = 'images/Off.png'; // Cambiar a imagen de fuego apagado
    } else {
        streakImage.src = 'images/On.png'; // Cambiar a imagen de fuego encendido
    }

    streakCountDisplay.textContent = streakData.streak;
}

// Función para mantener la racha
function maintainStreak() {
    const now = new Date().getTime();
    const diff = now - streakData.lastUpdated;
    const oneDay = 24 * 60 * 60 * 1000;

    if (diff < oneDay) {
        streakStatus.textContent = '¡Ya has mantenido tu racha hoy!';
        streakStatus.style.display = 'block';  // Mostrar el estado
        return;
    }

    streakData.streak += 1;
    streakData.lastUpdated = now;
    streakStatus.textContent = '¡Racha mantenida!';
    streakStatus.style.display = 'block';  // Mostrar el estado

    // Cambiar a la imagen de fuego encendido cuando se mantiene la racha
    streakImage.src = 'images/On.png';

    // Actualizar visualización y guardar los datos
    updateStreakDisplay();
    saveStreakData();
}

// Función para guardar los datos de la racha en localStorage
function saveStreakData() {
    localStorage.setItem('streakData', JSON.stringify(streakData));
}

// Función para ocultar el estado de la racha
function hideStreakStatus() {
    streakStatus.style.display = 'none';
}

// Evento al hacer clic en el botón de mantener racha
streakButton.addEventListener('click', maintainStreak);

// Cargar los datos de la racha al cargar la página
loadStreakData();
