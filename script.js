document.addEventListener('DOMContentLoaded', () => {
    const rachaImage = document.getElementById('racha-image');
    const continuarButton = document.getElementById('continuar');
    const terminarButton = document.getElementById('terminar');
    const rachaCounter = document.getElementById('racha-counter');
    
    const today = new Date().toDateString();
    const lastAccessDate = localStorage.getItem('lastAccessDate');
    let rachaDays = parseInt(localStorage.getItem('rachaDays'), 10) || 0;
    const isRachaOn = localStorage.getItem('isRachaOn') === 'true';

    // Verificar si se puede continuar la racha
    if (lastAccessDate === today) {
        continuarButton.disabled = true;
    } else {
        continuarButton.disabled = false;
    }

    // Configurar el estado de la racha y el contador
    if (isRachaOn) {
        rachaImage.src = 'images/On.png';
        rachaCounter.textContent = `Racha actual: ${rachaDays} días`;
    } else {
        rachaImage.src = 'images/Off.png';
        rachaCounter.textContent = `Racha actual: 0 días`;
    }

    continuarButton.addEventListener('click', () => {
        if (!continuarButton.disabled) {
            if (lastAccessDate === today) {
                rachaDays++;
            } else {
                rachaDays = 1; // Nueva racha
            }

            localStorage.setItem('lastAccessDate', today);
            localStorage.setItem('isRachaOn', 'true');
            localStorage.setItem('rachaDays', rachaDays);
            rachaImage.src = 'images/On.png';
            rachaCounter.textContent = `Racha actual: ${rachaDays} días`;
            continuarButton.disabled = true;
        }
    });

    terminarButton.addEventListener('click', () => {
        const confirmTerminate = confirm('¿Estás seguro de que quieres terminar la racha? Esta acción es irreversible.');
        if (confirmTerminate) {
            localStorage.setItem('isRachaOn', 'false');
            localStorage.setItem('rachaDays', 0);
            rachaImage.src = 'images/Off.png';
            rachaCounter.textContent = 'Racha actual: 0 días';
            continuarButton.disabled = false;
        }
    });
});
