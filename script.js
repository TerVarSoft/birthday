// Crear confetti animado
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#ffd700', '#ff6b6b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.opacity = Math.random();
        confettiContainer.appendChild(confetti);
    }
}

// Función para actualizar la fecha (opcional - puedes personalizarla)
function updateDate() {
    // Puedes cambiar esta fecha según necesites
    const dateElement = document.getElementById('date');
    if (dateElement) {
        // Ejemplo: puedes usar una fecha específica
        // dateElement.textContent = 'Sábado, 15 de Diciembre';
    }
}

// Función para manejar la confirmación de asistencia
function handleRSVP() {
    const confirmBtn = document.getElementById('confirmBtn');
    const rsvpMessage = document.getElementById('rsvpMessage');
    const rsvpMessage2 = document.getElementById('rsvpMessage2');
    
    confirmBtn.addEventListener('click', function() {
        // Cambiar el texto del botón
        if (confirmBtn.textContent === 'Confirmar Asistencia') {
            confirmBtn.textContent = '¡Confirmado! ✓';
            confirmBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
            
            // Mostrar mensaje
            rsvpMessage.textContent = 'No se yo, ahora tienes que venir, si no vamos a saber que hiciste click y no viniste....';
            rsvpMessage2.textContent = '¡Gracias por confirmar! Te esperamos 🎉';
            rsvpMessage.classList.add('show');
            rsvpMessage2.classList.add('show');
            
            // Crear más confetti al confirmar
            createConfettiBurst();
        } else {
            confirmBtn.textContent = 'Confirmar Asistencia';
            confirmBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            rsvpMessage.classList.remove('show');
        }
    });
}

// Crear explosión de confetti al confirmar
function createConfettiBurst() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#ffd700', '#ff6b6b'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.animationDuration = '1s';
        confetti.style.animationDelay = '0s';
        confetti.style.opacity = '1';
        
        // Animación de explosión
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 200;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        confetti.style.animation = `confettiBurst 1s ease-out forwards`;
        confetti.style.setProperty('--x', x + 'px');
        confetti.style.setProperty('--y', y + 'px');
        
        confettiContainer.appendChild(confetti);
        
        // Remover después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 1000);
    }
}

// Agregar animación CSS dinámica para la explosión
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiBurst {
        to {
            transform: translate(var(--x), var(--y)) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efecto parallax suave en el scroll (si hay scroll)
function addParallaxEffect() {
    const card = document.querySelector('.invitation-card');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        card.style.transform = `perspective(1000px) rotateY(${mouseX * 0.1}deg) rotateX(${mouseY * -0.1}deg)`;
    });
}

// Función para personalizar el mensaje según query params
function customizeInvitation() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('n') || '';
    const gender = urlParams.get('g') || 'm'; // Por defecto masculino
    
    const titleElement = document.querySelector('.title');
    
    if (name) {
        // Personalizar mensaje según género
        const invitadoText = gender === 'f' ? 'invitada' : 'invitado';
        titleElement.textContent = `${name}, estás ${invitadoText}!`;
    } else {
        // Si no hay nombre, usar mensaje por defecto
        titleElement.textContent = '¡Estás Invitado!';
    }
}

// Función para manejar el overlay y reproducir audio
function handleOverlay() {
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('openBtn');
    const invitationCard = document.getElementById('invitationCard');
    const audio = document.getElementById('birthdayAudio');
    
    openBtn.addEventListener('click', function() {
        // Ocultar overlay con animación
        overlay.classList.add('hidden');
        
        // Mostrar invitación después de un pequeño delay
        setTimeout(() => {
            overlay.style.display = 'none';
            invitationCard.style.display = 'block';
            
            // Reproducir audio desde el segundo 1
            audio.currentTime = 0.1;
            audio.play().catch(error => {
                console.log('Error al reproducir audio:', error);
                // Algunos navegadores requieren interacción del usuario primero
            });
            
            // Mostrar footer después de que termine la animación del card (0.8s)
            const pageFooter = document.getElementById('pageFooter');
            setTimeout(() => {
                pageFooter.style.display = 'block';
                pageFooter.style.animation = 'fadeIn 0.5s ease';
            }, 800);
        }, 500);
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    handleOverlay();
    customizeInvitation();
    createConfetti();
    updateDate();
    handleRSVP();
    addParallaxEffect();
    
    // Agregar efecto de entrada a los elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    document.querySelectorAll('.detail-item').forEach(item => {
        observer.observe(item);
    });
});

// Efecto de partículas flotantes en el fondo
function createFloatingParticles() {
    const container = document.body;
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '0';
        particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
    }
    
    // Agregar animación CSS
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(-40px) translateX(-10px);
            }
            75% {
                transform: translateY(-20px) translateX(5px);
            }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Inicializar partículas flotantes
createFloatingParticles();

