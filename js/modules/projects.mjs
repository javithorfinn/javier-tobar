// Módulo: Proyectos
export function initProjects() {
    console.log('💼 Módulo Proyectos inicializado');
    
    const projectsSection = document.querySelector('#proyectos');
    if (!projectsSection) return;
    
    // Aquí puedes agregar lógica específica para la sección de proyectos
    // Ejemplo: filtros, búsqueda, carga dinámica de proyectos, etc.
    
    // Si tienes datos de proyectos en JSON, puedes cargarlos aquí
    // loadProjects();
}

// Función para cargar proyectos desde un archivo JSON (opcional)
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
    // Lógica para renderizar proyectos
    console.log('Proyectos cargados:', projects);
}
