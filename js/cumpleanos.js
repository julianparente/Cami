// Función para crear corazones flotantes (igual que en index)
function createFloatingHeart() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Símbolos de corazón diferentes
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

// Función para crear partículas brillantes continuas
function createSparkle() {
    const sparklesContainer = document.querySelector('.sparkles');
    if (!sparklesContainer) return;
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Símbolos de brillos
    const sparkleSymbols = ['✨', '⭐', '🌟', '💫', '⚡'];
    sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    
    // Tamaños aleatorios
    const sizes = ['small', 'medium', 'large'];
    sparkle.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
    
    // Posición horizontal aleatoria
    sparkle.style.left = Math.random() * 100 + 'vw';
    
    // Duración de animación aleatoria
    const duration = Math.random() * 6 + 4;
    sparkle.style.animationDuration = duration + 's';
    
    sparklesContainer.appendChild(sparkle);
    
    // Eliminar después de la animación
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, duration * 1000);
}

// Función para actualizar el contador de amor en tiempo real
function updateLoveCounter() {
    const startDate = new Date('2024-03-08T19:10:00');
    const now = new Date();
    const difference = now - startDate;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Actualizar elementos del DOM si existen
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = days;
    if (hoursElement) hoursElement.textContent = hours;
    if (minutesElement) minutesElement.textContent = minutes;
    if (secondsElement) secondsElement.textContent = seconds;
}

// Función para controlar la música
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.querySelector('.music-btn');
    
    if (!audio || !btn) return;
    
    if (audio.paused) {
        audio.play().then(() => {
            btn.textContent = '🔊';
            btn.classList.add('playing');
        }).catch(error => {
            console.log('Error al reproducir música:', error);
            btn.textContent = '❌';
        });
    } else {
        audio.pause();
        btn.textContent = '🔇';
        btn.classList.remove('playing');
    }
}

// Crear corazones continuamente
function startHeartAnimation() {
    // Crear un corazón cada 400ms (menos intenso que en index)
    setInterval(createFloatingHeart, 400);
    
    // Crear algunos corazones iniciales
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }
}

// Crear partículas brillantes continuamente
function startSparkleAnimation() {
    // Crear una partícula cada segundo
    setInterval(createSparkle, 1000);
    
    // Crear algunas partículas iniciales
    for (let i = 0; i < 5; i++) {
        setTimeout(createSparkle, i * 200);
    }
}

// Variables para la galería
let currentImageIndex = 0;
let images = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar animaciones
    startHeartAnimation();
    startSparkleAnimation();
    
    // Inicializar y actualizar contador de amor
    updateLoveCounter();
    setInterval(updateLoveCounter, 1000);
    
    // Configurar música de fondo
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.volume = 0.3; // Volumen moderado
        
        // Repetir la canción cuando termine
        audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
        
        // Manejo de errores de audio
        audio.addEventListener('error', function() {
            console.log('Error al cargar la música');
            const musicBtn = document.querySelector('.music-btn');
            if (musicBtn) {
                musicBtn.textContent = '❌';
                musicBtn.disabled = true;
            }
        });
    }
    
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const envelopeImage = document.getElementById('envelopeImage');
    const letterContent = document.getElementById('letterContent');
    const gallerySection = document.getElementById('gallerySection');
    const videoSection = document.getElementById('videoSection');
    const photoItems = document.querySelectorAll('.photo-item');
    const photoModal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Recopilar todas las imágenes para la galería
    images = Array.from(photoItems).map(item => item.dataset.src);
    
    // Función para abrir el sobre (animación completamente nueva)
    function openEnvelope() {
        // Evitar múltiples clics
        if (letterContent.style.display === 'block') return;
        
        // Cambiar la imagen del sobre (mantener cerrado)
        envelopeImage.src = 'img/sobre-cerrado.png';
        envelopeImage.alt = 'Sobre cerrado';
        
        // Aplicar animación mágica al sobre
        envelopeImage.classList.add('envelope-opening');
        
        // Crear lluvia de corazones intensa al inicio
        for (let i = 0; i < 25; i++) {
            setTimeout(createFloatingHeart, i * 20);
        }
        
        // Hacer que el botón se desvanezca con rotación
        openBtn.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        openBtn.style.opacity = '0';
        openBtn.style.transform = 'translateY(-30px) rotate(180deg) scale(0.3)';
        openBtn.style.filter = 'blur(5px)';
        
        setTimeout(() => {
            openBtn.style.display = 'none';
        }, 800);
        
        // Esperar a que termine la animación del sobre y mostrar carta
        setTimeout(() => {
            letterContent.style.display = 'block';
            letterContent.classList.add('letter-appear');
            
            // Crear otra ola de corazones cuando aparece la carta
            setTimeout(() => {
                for (let i = 0; i < 15; i++) {
                    setTimeout(createFloatingHeart, i * 80);
                }
            }, 300);
            
            // Ola final de corazones
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    setTimeout(createFloatingHeart, i * 120);
                }
            }, 800);
        }, 400);
        
        // Limpiar clases de animación después
        setTimeout(() => {
            envelopeImage.classList.remove('envelope-opening');
        }, 1200);
    }
    
    // Event listener para el botón "Abrir"
    openBtn.addEventListener('click', openEnvelope);
    
    // Event listener para hacer clic en el sobre
    envelopeImage.addEventListener('click', openEnvelope);
    
    // Función para cerrar el sobre (animación espectacular)
    closeBtn.addEventListener('click', function() {
        // Cambiar la imagen de vuelta al sobre cerrado
        envelopeImage.src = 'img/sobre-cerrado.png';
        envelopeImage.alt = 'Sobre cerrado';
        
        // Resetear transformaciones del sobre
        envelopeImage.style.transform = '';
        envelopeImage.style.filter = '';
        envelopeImage.style.boxShadow = '';
        envelopeImage.classList.remove('envelope-opening');
        
        // Ocultar el contenido de la carta con animación dramática
        letterContent.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        letterContent.style.opacity = '0';
        letterContent.style.transform = 'translateY(-60px) scale(0.2) rotateX(-90deg)';
        letterContent.style.filter = 'blur(10px) hue-rotate(180deg)';
        letterContent.classList.remove('letter-appear', 'fade-in');
        
        setTimeout(() => {
            letterContent.style.display = 'none';
            letterContent.style.opacity = '';
            letterContent.style.transform = '';
            letterContent.style.transition = '';
            letterContent.style.filter = '';
        }, 1000);
        
        // Mostrar el botón de abrir con entrada mágica
        openBtn.style.display = 'inline-block';
        openBtn.style.opacity = '0';
        openBtn.style.transform = 'translateY(40px) rotate(-180deg) scale(0.2)';
        openBtn.style.filter = 'blur(8px)';
        
        setTimeout(() => {
            openBtn.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            openBtn.style.opacity = '1';
            openBtn.style.transform = 'translateY(0) rotate(0deg) scale(1)';
            openBtn.style.filter = 'blur(0)';
        }, 200);
        
        // Crear lluvia de corazones al cerrar
        for (let i = 0; i < 20; i++) {
            setTimeout(createFloatingHeart, i * 60);
        }
    });
    
    // Funcionalidad de la galería
    photoItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openModal();
        });
    });
    
    function openModal() {
        photoModal.style.display = 'block';
        modalImage.src = images[currentImageIndex];
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        console.log('Modal abierto, clase agregada:', document.body.classList.contains('modal-open'));
    }
    
    function closeModalFunc() {
        photoModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
        console.log('Modal cerrado, clase removida:', !document.body.classList.contains('modal-open'));
    }
    
    closeModal.addEventListener('click', closeModalFunc);
    
    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            closeModalFunc();
        }
    });
    
    // Navegación en el modal
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentImageIndex];
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modalImage.src = images[currentImageIndex];
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (photoModal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                closeModalFunc();
            }
        }
    });
    
    // Crear corazones al hacer hover en las fotos
    photoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            for (let i = 0; i < 3; i++) {
                setTimeout(createFloatingHeart, i * 100);
            }
        });
    });
    
    // Manejo de errores para imágenes que no existen
    const imgs = document.querySelectorAll('.photo-item img');
    imgs.forEach(img => {
        img.addEventListener('error', function() {
            // Si la imagen no existe, usar un placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZjMGNiIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2Q2MzM4NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZvdG8gUGVuZGllbnRlPC90ZXh0Pgo8L3N2Zz4K';
            this.alt = 'Foto pendiente';
        });
    });
    
    // Manejo de errores para las imágenes del sobre
    envelopeImage.addEventListener('error', function() {
        // Si la imagen del sobre no existe, mostrar un placeholder
        this.style.background = 'linear-gradient(135deg, #ffc0cb, #ffb6c1)';
        this.style.border = '2px solid #d63384';
        this.style.borderRadius = '15px';
        this.style.minHeight = '200px';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.alt = 'Sobre (imagen no encontrada)';
    });
    
    // Detectar si el video de YouTube falla y mostrar enlace alternativo
    const iframe = document.querySelector('.video-container iframe');
    const videoFallback = document.querySelector('.video-link-fallback');
    
    if (iframe && videoFallback) {
        // Detectar errores del iframe
        iframe.addEventListener('error', function() {
            showVideoFallback();
        });
        
        // Timeout para detectar si el iframe no carga
        setTimeout(() => {
            try {
                // Si después de 5 segundos el iframe no ha cargado correctamente
                if (iframe.contentDocument === null) {
                    showVideoFallback();
                }
            } catch (e) {
                // Si hay error de acceso, probablemente el video está bloqueado
                showVideoFallback();
            }
        }, 5000);
        
        function showVideoFallback() {
            iframe.style.display = 'none';
            videoFallback.style.display = 'block';
        }
    }
    
    // Funcionalidad para la línea de tiempo
    initializeTimeline();
});

// Función para inicializar la línea de tiempo con efectos especiales
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Observer para animaciones de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // Crear corazones cuando el elemento entra en vista
                setTimeout(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(createFloatingHeart, i * 150);
                    }
                }, 300);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
        
        // Pausar animación inicialmente
        item.style.animationPlayState = 'paused';
        
        // Efectos de hover mejorados
        const content = item.querySelector('.timeline-content');
        const icon = item.querySelector('.timeline-icon');
        
        content.addEventListener('mouseenter', function() {
            // Crear corazones en hover
            for (let i = 0; i < 3; i++) {
                setTimeout(createFloatingHeart, i * 100);
            }
            
            // Crear algunas partículas brillantes
            for (let i = 0; i < 2; i++) {
                setTimeout(createSparkle, i * 200);
            }
            
            // Efecto de brillo en el icono
            if (icon) {
                icon.style.transform = 'translateY(-50%) scale(1.1) rotate(15deg)';
                icon.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.6)';
            }
        });
        
        content.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'translateY(-50%)';
                icon.style.boxShadow = '0 6px 20px rgba(255, 105, 180, 0.4)';
            }
        });
        
        // Efecto de click para momentos especiales
        content.addEventListener('click', function() {
            // Explosión de corazones al hacer click
            for (let i = 0; i < 15; i++) {
                setTimeout(createFloatingHeart, i * 50);
            }
            
            // Explosión de partículas brillantes
            for (let i = 0; i < 8; i++) {
                setTimeout(createSparkle, i * 80);
            }
            
            // Efecto de pulso temporal
            this.style.transform = 'translateY(-5px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }, 200);
        });
    });
    
    // Animación especial para la fecha actual (último elemento)
    const lastTimelineItem = timelineItems[timelineItems.length - 1];
    if (lastTimelineItem) {
        const lastIcon = lastTimelineItem.querySelector('.timeline-icon');
        if (lastIcon) {
            // Hacer que el último icono tenga un pulso constante
            setInterval(() => {
                lastIcon.style.transform = 'translateY(-50%) scale(1.15)';
                setTimeout(() => {
                    lastIcon.style.transform = 'translateY(-50%) scale(1)';
                }, 500);
            }, 2000);
        }
    }
    
    // Efecto de escritura para las fechas
    const timelineDates = document.querySelectorAll('.timeline-date');
    timelineDates.forEach((date, index) => {
        const originalText = date.textContent;
        date.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeEffect = setInterval(() => {
                date.textContent += originalText[i];
                i++;
                if (i >= originalText.length) {
                    clearInterval(typeEffect);
                }
            }, 100);
        }, 1000 + (index * 200));
    });
}