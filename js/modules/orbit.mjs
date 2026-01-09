// Módulo de órbita de tecnologías
export function initOrbit() {
    const orbitRing = document.querySelector('.orbit-ring');
    const orbitContainer = document.querySelector('.orbit-container');
    
    if (!orbitRing || !orbitContainer) return;
    
    // Lista de tecnologías - fácil de modificar
    const technologies = [
        { name: 'Python', icon: 'python-icon' },
        { name: 'Django', icon: 'django-icon' },
        { name: 'JavaScript', icon: 'js-icon' },
        { name: 'HTML', icon: 'html-icon' },
        { name: 'CSS', icon: 'css-icon' },
        { name: 'Docker', icon: 'docker-icon' },
        { name: 'GitHub', icon: 'github-icon' },
        { name: 'Git', icon: 'git-icon' },
        { name: 'MySQL', icon: 'mysql-icon' },
        { name: 'Sass', icon: 'sass-icon' }
    ];
    
    const totalIcons = technologies.length;
    
    // Generar HTML para cada icono con tooltip y accesibilidad
    function createOrbitIcon(tech, index) {
        // El icono se posiciona con rotate(45° * index) translateX(100px)
        // La animación CSS maneja la contra-rotación automáticamente
        const compensation = -360 / totalIcons * index;
        
        return `
            <div class="orbit-icon" 
                 style="--i: ${index}; --initial-rotation: ${compensation}deg;" 
                 role="img" 
                 aria-label="${tech.name}"
                 tabindex="0">
                <img src="https://techstack-generator.vercel.app/${tech.icon}.svg" 
                     alt="${tech.name}" 
                     loading="lazy">
                <span class="orbit-tooltip">${tech.name}</span>
            </div>
        `;
    }
    
    // Crear los iconos
    const iconsHTML = technologies.map((tech, i) => createOrbitIcon(tech, i)).join('');
    orbitRing.innerHTML = iconsHTML;
    
    // Actualizar número de iconos en CSS custom property
    orbitContainer.style.setProperty('--total-icons', technologies.length);
    
    // Manejar responsive - detectar cambio de tamaño
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        orbitContainer.classList.toggle('orbit-mobile', isMobile);
    }
    
    // Ejecutar al cargar y al redimensionar
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Pausar animación al pasar el mouse sobre toda la órbita
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
    
    console.log('✅ Órbita inicializada');
}
