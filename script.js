let racha = 0;

// Cargar la racha guardada desde localStorage al iniciar la página
window.onload = function() {
    const rachaGuardada = localStorage.getItem('racha');
    if (rachaGuardada) {
        racha = parseInt(rachaGuardada);
        document.getElementById('contador').innerText = racha;
    }
}

// Función para guardar la racha en localStorage
function guardarRacha() {
    localStorage.setItem('racha', racha);
}

// Evento para seguir con la racha
document.getElementById('seguirm').addEventListener('click', function() {
    racha++;
    document.getElementById('contador').innerText = racha;
    guardarRacha();
});

// Evento para restablecer la racha
document.getElementById('resetear').addEventListener('click', function() {
    racha = 0;
    document.getElementById('contador').innerText = racha;
    localStorage.removeItem('racha'); // Eliminar la racha guardada
});
