document.addEventListener('DOMContentLoaded', () => {
    const rachaImage = document.getElementById('racha-image');
    const continuarButton = document.getElementById('continuar');
    const terminarButton = document.getElementById('terminar');
    
    const today = new Date().toDateString();
    const lastAccessDate = localStorage.getItem('lastAccessDate');
    const isRachaOn = localStorage.getItem('isRachaOn') === 'true';

    // Verificar si se puede continuar la racha
    if (lastAccessDate === today) {
        continuarButton.disabled = true;
    } else {
        continuarButton.disabled = false;
    }

    // Configurar el estado de la racha
    if (isRachaOn) {
        rachaImage.src = 'images/On.png';
    } else {
        rachaImage.src = 'images/Off.png';
    }

    continuarButton.addEventListener('click', () => {
        if (!continuarButton.disabled) {
            localStorage.setItem('lastAccessDate', today);
            localStorage.setItem('isRachaOn', 'true');
            rachaImage.src = 'images/On.png';
            continuarButton.disabled = true;
        }
    });

    terminarButton.addEventListener('click', () => {
        const confirmTerminate = confirm('¿Estás seguro de que quieres terminar la racha? Esta acción es irreversible.');
        if (confirmTerminate) {
            localStorage.setItem('isRachaOn', 'false');
            rachaImage.src = 'images/Off.png';
            continuarButton.disabled = false;
        }
    });
});
