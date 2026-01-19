// Módulo: Sobre mí
export function initAbout() {
    console.log('✨ Módulo Sobre mí inicializado');
    
    // Aquí puedes agregar funcionalidades específicas de la sección "Sobre mí"
    // Por ejemplo: animaciones, carga de datos, interacciones, etc.
    
    const aboutSection = document.querySelector('#sobre-mi');
    if (!aboutSection) return;
    
    // Ejemplo: Agregar interactividad o animaciones personalizadas
    // aboutSection.addEventListener('mouseenter', handleHover);
}

// Funciones auxiliares
function handleHover() {
    console.log('Hover en sección Sobre mí');
}
