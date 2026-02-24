// Modulo: Efectos para tarjetas de habilidades en Resume
export function initResumeSkills() {
    console.log('🎯 Módulo Resume Skills inicializado');
    
    const skillCards = document.querySelectorAll('.skill-section');
    
    if (skillCards.length === 0) return;
    
    // Agregar efecto spotlight que sigue el mouse
    skillCards.forEach(card => {
        const spotlight = card.querySelector('.skill-spotlight');
        
        if (!spotlight) return;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Actualizar posicion del spotlight
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', () => {
            // Resetear posicion al centro cuando el mouse sale
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });
}
