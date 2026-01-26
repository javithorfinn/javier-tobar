// Modulo de carrusel de habilidades
export function initSkills() {
    const skillsTracks = document.querySelectorAll('.skills-track');
    
    if (skillsTracks.length === 0) return;
    
    // Grupos de contenido
    const groups = {
        // Servicios - Fila 1
        services: [
            { name: 'Aplicación Móvil', icon: 'react-icon' },
            { name: 'Optimización de SEO', icon: 'github-icon' },
            { name: 'Mantenimiento', icon: 'docker-icon' }
        ],
        // Servicios - Fila 2
        services2: [
            { name: 'Consultoría Técnica', icon: 'ts-icon' },
            { name: 'Despliegue en la Nube', icon: 'aws-icon' },
            { name: 'Desarrollo Web', icon: 'js-icon' }
        ],
        // Proyectos - Fila 1
        projects: [
            { name: 'E-Commerce', icon: 'react-icon' },
            { name: 'Dashboard', icon: 'ts-icon' },
            { name: 'API REST', icon: 'nodejs-icon' }
        ],
        // Proyectos - Fila 2
        projects2: [
            { name: 'Landing Page', icon: 'js-icon' },
            { name: 'App Móvil', icon: 'react-icon' },
            { name: 'Sistema CRM', icon: 'python-icon' }
        ]
    };
    
    // Generar HTML para cada skill
    function createSkillItem(skill) {
        return `
            <div class="skill-item">
                <img src="https://techstack-generator.vercel.app/${skill.icon}.svg" alt="${skill.name}" width="50" height="50">
                <span>${skill.name}</span>
            </div>
        `;
    }
    
    // Llenar cada track con su grupo correspondiente
    skillsTracks.forEach((track) => {
        const groupName = track.dataset.group;
        const skills = groups[groupName];
        
        if (!skills) return;
        
        const skillsHTML = skills.map(createSkillItem).join('');
        track.innerHTML = skillsHTML + skillsHTML + skillsHTML; // Triplicar para loop mas suave
        
        // Aplicar direccion de animacion
        const direction = track.dataset.direction || 'left';
        if (direction === 'right') {
            track.style.animationDirection = 'reverse';
        }
    });
    
    console.log('✅ Skills inicializadas');
}
