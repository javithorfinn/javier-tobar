// Modulo de orbita de tecnologias
export function initOrbit() {
    const orbitRing = document.querySelector('.orbit-ring');
    const orbitContainer = document.querySelector('.orbit-container');
    
    if (!orbitRing || !orbitContainer) return;
    
    // Lista de tecnologias - facil de modificar
    const technologies = [
        { name: 'Python', icon: 'python-icon', url: 'https://techstack-generator.vercel.app/python-icon.svg' },
        { name: 'Node.js', icon: 'nodejs-icon', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'JavaScript', icon: 'js-icon', url: 'https://techstack-generator.vercel.app/js-icon.svg' },
        { name: 'HTML5', icon: 'html5-icon', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'css3-icon', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'PHP', icon: 'php-icon', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'GitHub', icon: 'github-icon', url: 'https://techstack-generator.vercel.app/github-icon.svg' },
        { name: 'Android Studio', icon: 'androidstudio-icon', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg' },
        { name: 'MySQL', icon: 'mysql-icon', url: 'https://techstack-generator.vercel.app/mysql-icon.svg' },
        { name: 'Kotlin', icon: 'kotlin-icon', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' }
    ];
    
    const totalIcons = technologies.length;
    
    // Generar HTML para cada icono con tooltip y accesibilidad
    function createOrbitIcon(tech, index) {
        // El icono se posiciona con rotate(45° * index) translateX(100px)
        // La animacion CSS maneja la contra-rotacion automaticamente
        const compensation = -360 / totalIcons * index;
        
        return `
            <div class="orbit-icon" 
                 style="--i: ${index}; --initial-rotation: ${compensation}deg;" 
                 role="img" 
                 aria-label="${tech.name}"
                 tabindex="0">
                <img src="${tech.url || 'https://techstack-generator.vercel.app/' + tech.icon + '.svg'}" 
                     alt="${tech.name}" 
                     loading="lazy">
                <span class="orbit-tooltip">${tech.name}</span>
            </div>
        `;
    }
    
    // Crear los iconos
    const iconsHTML = technologies.map((tech, i) => createOrbitIcon(tech, i)).join('');
    orbitRing.innerHTML = iconsHTML;
    
    // Actualizar numero de iconos en CSS custom property
    orbitContainer.style.setProperty('--total-icons', technologies.length);
    
    // Manejar responsive - detectar cambio de tamano
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        orbitContainer.classList.toggle('orbit-mobile', isMobile);
    }
    
    // Ejecutar al cargar y al redimensionar
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Pausar animacion al pasar el mouse sobre toda la orbita
    orbitContainer.addEventListener('mouseenter', () => {
        orbitRing.style.animationPlayState = 'paused';
        orbitRing.querySelectorAll('.orbit-icon img, .orbit-tooltip').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    });
    orbitContainer.addEventListener('mouseleave', () => {
        orbitRing.style.animationPlayState = 'running';
        orbitRing.querySelectorAll('.orbit-icon img, .orbit-tooltip').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    });
    
    console.log('✅ Orbita inicializada');
}
