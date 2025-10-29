// Función para crear corazones flotantes
function createFloatingHeart() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Símbolos de corazón diferentes (volviendo a los emojis originales)
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💝', '💘'];
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    // Tamaños aleatorios
    const sizes = ['small', 'medium', 'large', 'extra-large'];
    heart.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
    
    // Colores aleatorios
    const colors = ['pink', 'red', 'light-pink', 'hot-pink'];
    heart.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    
    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + '%';
    
    // Duración de animación aleatoria (entre 3 y 8 segundos)
    const duration = Math.random() * 5 + 3;
    heart.style.animationDuration = duration + 's';
    
    // Sin retraso - todos los corazones empiezan inmediatamente desde abajo
    heart.style.animationDelay = '0s';
    
    heartsContainer.appendChild(heart);
    
    // Eliminar el corazón después de la animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, (duration + 2) * 1000);
}

// Crear corazones continuamente
function startHeartAnimation() {
    // Crear un corazón cada 200ms (más frecuente)
    setInterval(createFloatingHeart, 200);
    
    // Crear otro conjunto de corazones cada 350ms
    setInterval(createFloatingHeart, 350);
    
    // Y otro conjunto cada 600ms para más variedad
    setInterval(createFloatingHeart, 600);
    
    // Crear muchos corazones iniciales para llenar la pantalla rápidamente
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingHeart, i * 150);
    }
}

// Manejo del formulario
document.addEventListener('DOMContentLoaded', function() {
    startHeartAnimation();
    
    const form = document.getElementById('loveForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const anniversary = document.getElementById('anniversary').value;
        
        console.log('Nombre ingresado:', name);
        console.log('Fecha ingresada:', anniversary);
        
        if (name && anniversary) {
            // Verificar si es Camila y la fecha correcta
            if (name.toLowerCase() === 'camila' && anniversary === '2024-03-08') {
                console.log('Redirigiendo a cumpleanos.html');
                // Redirigir a la página especial
                window.location.href = 'cumpleanos.html';
            } else {
                console.log('No coincide - mostrando alerta');
                // Mensaje para otros casos
                alert('Que feo todo');
            }
        } else {
            alert('Por favor completa todos los campos');
        }
    });
    
    // Efectos adicionales en los inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Crear más corazones cuando se enfocan los inputs
            for (let i = 0; i < 8; i++) {
                setTimeout(createFloatingHeart, i * 75);
            }
        });
    });
});

// Crear efecto de corazones cuando se hace hover en el botón
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.enter-btn');
    
    button.addEventListener('mouseenter', function() {
        // Crear muchos corazones cuando se hace hover en el botón
        for (let i = 0; i < 12; i++) {
            setTimeout(createFloatingHeart, i * 30);
        }
    });
});