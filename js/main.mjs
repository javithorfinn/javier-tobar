// Script principal para index.html
import { initResumeSkills } from './modules/resume-skills.mjs';
import { initOrbit } from './modules/orbit.mjs';
import { initProjects } from './modules/projects.mjs';
import { initCursor } from './modules/cursor.mjs';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Portafolio cargado');
    
    // Inicializar efectos de las tarjetas de habilidades
    initResumeSkills();
    
    // Inicializar órbita de herramientas
    initOrbit();
    
    // Inicializar efectos de las tarjetas de proyectos
    initProjects();
    
    // Inicializar cursor personalizado
    initCursor();
});
