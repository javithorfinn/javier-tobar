// Modulo: Sobre mi
export function initAbout() {
    console.log('✨ Módulo Sobre mí inicializado');
    
    // Aqui puedes agregar funcionalidades especificas de la seccion "Sobre mi"
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
