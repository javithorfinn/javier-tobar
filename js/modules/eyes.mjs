// Módulo de ojos que siguen el mouse
export function initEyes() {
    const eyes = document.querySelectorAll('.eye');
    const eyesContainer = document.querySelector('.eyes-container');
    const hero = document.querySelector('.hero');
    
    if (eyes.length === 0) return;
    
    let hasFused = false;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Crear el punto azul que seguirá al mouse
    const fusedPoint = document.createElement('div');
    fusedPoint.classList.add('fused-point');
    document.body.appendChild(fusedPoint);
    
    // Crear las "balas" de luz
    const leftBullet = document.createElement('div');
    const rightBullet = document.createElement('div');
    leftBullet.classList.add('eye-bullet');
    rightBullet.classList.add('eye-bullet');
    document.body.appendChild(leftBullet);
    document.body.appendChild(rightBullet);
    
    // Seguimiento del mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Mover las pupilas siempre (los ojos nunca desaparecen)
        eyes.forEach(eye => {
            const pupil = eye.querySelector('.pupil');
            if (!pupil) return;
            
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;
            
            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(
                Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10,
                eyeRect.width / 5
            );
            
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Animación suave del punto fusionado
    function animateCursor() {
        if (hasFused) {
            // Seguimiento suave
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            fusedPoint.style.left = cursorX + 'px';
            fusedPoint.style.top = cursorY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Detectar scroll para fusionar o desfusionar
    function checkScroll() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight * 0.5;
        
        // Si bajamos del hero y no está fusionado -> fusionar
        if (scrollPosition > heroBottom && !hasFused) {
            triggerFusion();
        }
        // Si subimos al hero y está fusionado -> desfusionar
        else if (scrollPosition <= heroBottom && hasFused) {
            triggerUnfusion();
        }
    }
    
    // Disparar la fusión
    function triggerFusion() {
        if (hasFused) return;
        hasFused = true;
        
        const eyeElements = [...eyes];
        const leftEye = eyeElements[0];
        const rightEye = eyeElements[1];
        
        const leftRect = leftEye.getBoundingClientRect();
        const rightRect = rightEye.getBoundingClientRect();
        
        // Posición inicial de las balas (centro de cada ojo)
        const leftStartX = leftRect.left + leftRect.width / 2;
        const leftStartY = leftRect.top + leftRect.height / 2;
        const rightStartX = rightRect.left + rightRect.width / 2;
        const rightStartY = rightRect.top + rightRect.height / 2;
        
        // Punto de fusión (centro entre ambos ojos)
        const fuseX = (leftStartX + rightStartX) / 2;
        const fuseY = leftStartY;
        
        // Posicionar balas
        leftBullet.style.left = leftStartX + 'px';
        leftBullet.style.top = leftStartY + 'px';
        rightBullet.style.left = rightStartX + 'px';
        rightBullet.style.top = rightStartY + 'px';
        
        // Mostrar balas
        leftBullet.classList.add('active');
        rightBullet.classList.add('active');
        
        // Ojos "disparan" - efecto de flash
        eyesContainer.classList.add('firing');
        
        // Animar balas hacia el centro
        setTimeout(() => {
            leftBullet.style.left = fuseX + 'px';
            leftBullet.style.top = fuseY + 'px';
            rightBullet.style.left = fuseX + 'px';
            rightBullet.style.top = fuseY + 'px';
        }, 50);
        
        // Fusionar en el punto azul
        setTimeout(() => {
            leftBullet.classList.remove('active');
            rightBullet.classList.remove('active');
            eyesContainer.classList.remove('firing');
            
            // Posicionar punto fusionado
            cursorX = fuseX;
            cursorY = fuseY;
            fusedPoint.style.left = fuseX + 'px';
            fusedPoint.style.top = fuseY + 'px';
            fusedPoint.classList.add('active');
        }, 350);
        
        console.log('✨ Punto azul activado');
    }
    
    // Desfusionar cuando vuelve al hero
    function triggerUnfusion() {
        if (!hasFused) return;
        hasFused = false;
        
        // Desvanecer el punto azul
        fusedPoint.classList.remove('active');
        
        console.log('👁️ Punto azul desactivado');
    }
    
    // Parpadeo ocasional
    setInterval(() => {
        if (Math.random() > 0.7) {
            eyes.forEach(eye => {
                eye.classList.add('blink');
                setTimeout(() => eye.classList.remove('blink'), 150);
            });
        }
    }, 3000);
    
    window.addEventListener('scroll', checkScroll);
    
    console.log('✅ Ojos inicializados');
}
