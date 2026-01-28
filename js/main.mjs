// Archivo principal - Importa todos los módulos
import { initNavigation } from './modules/navigation.mjs';
import { initAnimations } from './modules/animations.mjs';
import { initCarousel } from './modules/carousel.mjs';
import { initSkills } from './modules/skills.mjs';
import { initOrbit } from './modules/orbit.mjs';
import { initCursor } from './modules/cursor.mjs';
// import { initEyes } from './modules/eyes.mjs'; // Ojos desactivados temporalmente

// Módulos de secciones
import { initProjects } from './modules/projects.mjs';
import { initCertifications } from './modules/certifications.mjs';
import { initLinkedInPosts } from './modules/linkedin-posts.mjs';

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portafolio cargado');
    
    // Módulos generales
    initNavigation();
    initAnimations();
    initCarousel();
    initSkills();
    initOrbit();
    initCursor();
    // initEyes(); // Ojos desactivados temporalmente
    
    // Módulos de secciones
    initProjects();
    initCertifications();
    initLinkedInPosts();
});
