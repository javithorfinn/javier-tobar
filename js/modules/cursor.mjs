// Módulo de cursor personalizado con punto rojo que sigue el mouse
export function initCursor() {
    // No inicializar en dispositivos móviles
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        console.log('📱 Cursor personalizado deshabilitado en dispositivos móviles');
        return;
    }
    
    const cursor = document.querySelector('.cursor-follower');
    
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Seguir el movimiento del mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animación suave con desaceleración
    function animate() {
        // Calcular la distancia entre el cursor y el punto
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // Ajustar la velocidad según la distancia (más lento cerca del cursor)
        const speed = distance > 50 ? 0.15 : 0.05;
        
        // Mover el cursor hacia la posición del mouse
        cursorX += distX * speed;
        cursorY += distY * speed;
        
        // Aplicar la posición
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    console.log('✅ Cursor personalizado inicializado');
}
