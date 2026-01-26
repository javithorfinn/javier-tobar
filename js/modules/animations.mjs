// Modulo de animaciones
export function initAnimations() {
    // Animacion de fade-in cuando los elementos entran en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase .animate
    document.querySelectorAll('.animate').forEach(el => {
        observer.observe(el);
    });
    
    console.log('✅ Animaciones inicializadas');
}

// Funcion para animar un elemento especifico
export function fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
        element.style.opacity = 1;
    });
}

// Función para animar con delay
export function staggerAnimation(elements, delayBetween = 100) {
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * delayBetween);
    });
}
