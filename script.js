let racha = 0;
const tieneProtector = localStorage.getItem('protector') === 'true';
const temaIndex = localStorage.getItem('temaIndex') || 0;
const temas = [
    { background: '#000000', container: '#222222', button: '#ff3333', buttonText: 'white' },
    { background: '#ffffff', container: '#f0f0f0', button: '#3498db', buttonText: 'white' },
    { background: '#2c3e50', container: '#34495e', button: '#e74c3c', buttonText: 'white' },
    { background: '#1e1e1e', container: '#2e2e2e', button: '#f39c12', buttonText: 'white' },
    { background: '#f5f5f5', container: '#e0e0e0', button: '#e67e22', buttonText: 'white' }
];

function aplicarTema(index) {
    const tema = temas[index];
    document.body.style.backgroundColor = tema.background;
    document.querySelector('.container').style.backgroundColor = tema.container;
    document.querySelectorAll('button').forEach(btn => {
        btn.style.backgroundColor = tema.button;
        btn.style.color = tema.buttonText;
    });
    localStorage.setItem('temaIndex', index);
}

function guardarRacha() {
    localStorage.setItem('racha', racha);
    localStorage.setItem('fecha', new Date().toDateString());
}

function cargarRacha() {
    const rachaGuardada = localStorage.getItem('racha');
    const fechaGuardada = localStorage.getItem('fecha');
    const hoy = new Date().toDateString();

    if (fechaGuardada === hoy) {
        racha = parseInt(rachaGuardada, 10);
        document.getElementById('contador').innerText = racha;
        document.getElementById('mensaje-espera').classList.add('hidden');
    } else {
        racha = 0;
        document.getElementById('contador').innerText = racha;
        if (fechaGuardada) {
            document.getElementById('mensaje-espera').classList.remove('hidden');
        } else {
            document.getElementById('mensaje-espera').classList.add('hidden');
        }
    }
}

window.onload = function() {
    cargarRacha();
    aplicarTema(temaIndex);

    document.getElementById('theme-button').addEventListener('click', function() {
        document.getElementById('theme-menu').classList.toggle('hidden');
    });

    document.querySelectorAll('#theme-menu div').forEach(item => {
        item.addEventListener('click', function() {
            const nuevoTemaIndex = parseInt(this.getAttribute('data-theme'), 10);
            aplicarTema(nuevoTemaIndex);
            document.getElementById('theme-menu').classList.add('hidden');
        });
    });

    document.getElementById('redeem-button').addEventListener('click', function() {
        const codigo = document.getElementById('code-input').value.trim();
        const mensaje = document.getElementById('redeem-message');
        mensaje.classList.remove('hidden');

        switch (codigo) {
            case 'PROTECTOR123':
                if (!tieneProtector) {
                    localStorage.setItem('protector', 'true');
                    mensaje.textContent = '¡Código canjeado con éxito! Ahora tienes un protector de racha.';
                    mensaje.classList.add('success');
                } else {
                    mensaje.textContent = '¡Ya tienes un protector de racha!';
                    mensaje.classList.add('error');
                }
                break;
            case 'BONO50':
                mensaje.textContent = '¡Bono aplicado! (Simulación)';
                mensaje.classList.add('success');
                break;
            case 'NUEVO_TEMA':
                mensaje.textContent = '¡Nuevo tema desbloqueado!';
                mensaje.classList.add('success');
                break;
            default:
                mensaje.textContent = 'Código inválido. Inténtalo de nuevo.';
                mensaje.classList.add('error');
                break;
        }
    });

    document.getElementById('seguirm').addEventListener('click', function() {
        const hoy = new Date().toDateString();
        const fechaGuardada = localStorage.getItem('fecha');
        if (fechaGuardada === hoy) {
            document.getElementById('mensaje-espera').classList.remove('hidden');
        } else {
            racha++;
            document.getElementById('contador').innerText = racha;
            guardarRacha();
            document.getElementById('mensaje-espera').classList.add('hidden');
            document.getElementById('icono').src = 'Images/IconOn.png';
        }
    });

    document.getElementById('resetear').addEventListener('click', function() {
        racha = 0;
        document.getElementById('contador').innerText = racha;
        localStorage.removeItem('racha');
        localStorage.removeItem('fecha');
        document.getElementById('mensaje-espera').classList.add('hidden');
        document.getElementById('icono').src = 'Images/IconOff.png';
    });
}
