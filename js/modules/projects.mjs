// Modulo: Proyectos
export function initProjects() {
    console.log('💼 Módulo Proyectos inicializado');
    
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectCards.length === 0) return;
    
    // Agregar efecto spotlight que sigue el mouse
    projectCards.forEach(card => {
        const spotlight = card.querySelector('.project-spotlight');
        
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

// Funcion para cargar proyectos desde un archivo JSON (opcional)
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
    }
}

function renderProjects(projects) {
    // Logica para renderizar proyectos
    console.log('Proyectos cargados:', projects);
}
