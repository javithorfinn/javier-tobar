// Exportamos la función para inicializar el stack de tarjetas con arrastre bidireccional
export function initCardStack() {
    const cards = Array.from(document.querySelectorAll('.card-stack'));
    const container = document.querySelector('.stack-container');
    
    if (cards.length === 0 || !container) return;
    
    // Variables para el arrastre
    let isDragging = false;
    let startY = 0;
    let startX = 0;
    let currentY = 0;
    let currentX = 0;
    let draggedCard = null;
    let currentCardIndex = 0; // Índice de la tarjeta actual en el frente
    
    // Inicializar el estado de las tarjetas
    function initializeCards() {
        cards.forEach((card, index) => {
            // Limpiar clases previas
            card.classList.remove('is-front', 'is-back', 'is-exiting-up', 'is-exiting-down', 'is-promoting', 'is-flipped');
            card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            if (index === currentCardIndex) {
                // Tarjeta principal al frente
                card.classList.add('is-front');
                card.style.zIndex = 100;
                card.style.transform = 'translateY(0) scale(1) translateZ(0)';
                card.style.opacity = '1';
            } else if (index > currentCardIndex) {
                // Tarjetas siguientes - stack hacia abajo
                const offset = index - currentCardIndex;
                const maxVisible = 3; // Máximo 3 tarjetas visibles en el stack
                
                if (offset <= maxVisible) {
                    card.style.zIndex = 100 - offset;
                    card.style.transform = `translateY(${offset * 16}px) scale(${1 - offset * 0.05})`;
                    // Solo la primera tarjeta detrás mantiene opacidad total
                    card.style.opacity = offset === 1 ? '1' : `${1 - (offset - 1) * 0.3}`;
                } else {
                    // Ocultar tarjetas más allá de las 3 visibles
                    card.style.zIndex = 0;
                    card.style.transform = `translateY(48px) scale(0.85)`;
                    card.style.opacity = '0';
                }
            } else {
                // Tarjetas ya vistas - ocultas abajo
                card.classList.add('is-back');
                const offset = currentCardIndex - index;
                card.style.zIndex = 0;
                card.style.transform = `translateY(60px) scale(0.8)`;
                card.style.opacity = '0';
            }
        });
    }

    // Función para manejar el inicio del arrastre
    function handleDragStart(e) {
        const card = e.currentTarget;
        
        // Solo permitir arrastre en la tarjeta del frente
        if (!card.classList.contains('is-front')) {
            return;
        }
        
        // No arrastrar si se hace click en botones o enlaces
        if (e.target.closest('.btn-card') || e.target.tagName === 'A') return;
        
        isDragging = true;
        draggedCard = card;
        
        const touch = e.type.includes('touch') ? e.touches[0] : e;
        startY = touch.clientY;
        startX = touch.clientX;
        currentY = 0;
        currentX = 0;
        
        card.classList.add('is-dragging');
        
        e.preventDefault();
    }

    // Función para manejar el movimiento del arrastre
    function handleDragMove(e) {
        if (!isDragging || !draggedCard) return;
        
        const touch = e.type.includes('touch') ? e.touches[0] : e;
        currentY = touch.clientY - startY;
        currentX = touch.clientX - startX;
        
        const dragDistance = Math.abs(currentY);
        const sideOffset = currentX * 0.15;
        const rotation = (currentX / window.innerWidth) * 10;
        
        if (currentY < 0) {
            // Arrastrando hacia ARRIBA - volver a tarjeta anterior
            const progress = Math.min(dragDistance / 200, 1);
            const opacity = Math.max(0.5, 1 - progress * 0.3);
            const scale = 1 - progress * 0.1;
            
            draggedCard.style.transform = `translateY(${currentY}px) translateX(${sideOffset}px) scale(${scale}) rotate(${rotation}deg)`;
            draggedCard.style.opacity = opacity;
            
            // Animar tarjetas del stack para dar feedback visual
            cards.forEach((card, idx) => {
                if (idx > currentCardIndex && idx <= currentCardIndex + 3) {
                    const offset = idx - currentCardIndex;
                    const newOffset = 16 * offset - progress * 6;
                    card.style.transform = `translateY(${newOffset}px) scale(${1 - offset * 0.05})`;
                }
            });
            
        } else if (currentY > 0) {
            // Arrastrando hacia ABAJO - siguiente tarjeta
            const progress = Math.min(dragDistance / 200, 1);
            const opacity = Math.max(0.3, 1 - progress * 0.6);
            const scale = 1 - progress * 0.15;
            
            draggedCard.style.transform = `translateY(${currentY}px) translateX(${sideOffset}px) scale(${scale}) rotate(${rotation}deg)`;
            draggedCard.style.opacity = opacity;
            
            // Animar la siguiente tarjeta subiendo
            const nextCardIndex = (currentCardIndex + 1) % cards.length;
            const nextCard = cards[nextCardIndex];
            if (nextCard) {
                const newScale = 0.95 + progress * 0.05;
                const newOffset = 16 - progress * 16;
                const newOpacity = 0.8 + progress * 0.2;
                
                nextCard.style.transform = `translateY(${newOffset}px) scale(${newScale})`;
                nextCard.style.opacity = newOpacity;
                
                // Animar el resto del stack
                cards.forEach((card, idx) => {
                    if (idx > nextCardIndex && idx <= nextCardIndex + 3) {
                        const offset = idx - nextCardIndex;
                        const baseOffset = 16 * offset;
                        const adjustedOffset = baseOffset - progress * 16;
                        card.style.transform = `translateY(${adjustedOffset}px) scale(${1 - offset * 0.05})`;
                    }
                });
            }
        }
        
        e.preventDefault();
    }

    // Función para manejar el fin del arrastre
    function handleDragEnd(e) {
        if (!isDragging || !draggedCard) return;
        
        const dragDistance = Math.abs(currentY);
        const threshold = 80; // Píxeles necesarios para cambiar de tarjeta
        
        draggedCard.classList.remove('is-dragging');
        
        if (currentY > threshold) {
            // Arrastre hacia ABAJO - pasar a la siguiente (la que estaba arriba)
            goToNextCard();
            
        } else if (currentY < -threshold) {
            // Arrastre hacia ARRIBA - traer la anterior (la que estaba abajo volteada)
            goToPreviousCard();
            
        } else {
            // Arrastre insuficiente - volver a la posición original
            resetDraggedCard();
        }
        
        isDragging = false;
        draggedCard = null;
        
        e.preventDefault();
    }

    // Función para ir a la siguiente tarjeta (arrastre ABAJO)
    function goToNextCard() {
        const nextCardIndex = (currentCardIndex + 1) % cards.length;
        
        // Animación de salida hacia abajo y volteo
        draggedCard.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        draggedCard.style.transform = `translateY(120%) translateX(${currentX * 0.3}px) rotateX(180deg) rotate(${currentX > 0 ? '-10' : '10'}deg)`;
        draggedCard.style.opacity = '0.8';
        draggedCard.classList.add('is-exiting-down', 'is-flipped');
        draggedCard.classList.remove('is-front');
        
        // Actualizar índice
        currentCardIndex = nextCardIndex;
        
        // Reorganizar tarjetas
        setTimeout(() => {
            initializeCards();
            
            // Animar la nueva tarjeta del frente (viene de arriba)
            const newFrontCard = cards[currentCardIndex];
            if (newFrontCard) {
                newFrontCard.classList.add('is-promoting');
                setTimeout(() => {
                    newFrontCard.classList.remove('is-promoting');
                }, 600);
            }
        }, 100);
    }

    // Función para ir a la tarjeta anterior (arrastre ARRIBA)
    function goToPreviousCard() {
        const prevCardIndex = currentCardIndex === 0 ? cards.length - 1 : currentCardIndex - 1;
        
        // Animación de salida hacia arriba
        draggedCard.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        draggedCard.style.transform = `translateY(-120%) translateX(${currentX * 0.3}px) rotate(${currentX > 0 ? '10' : '-10'}deg)`;
        draggedCard.style.opacity = '0';
        draggedCard.classList.add('is-exiting-up');
        draggedCard.classList.remove('is-front');
        
        // Actualizar índice
        currentCardIndex = prevCardIndex;
        
        // Reorganizar tarjetas
        setTimeout(() => {
            initializeCards();
            
            // Animar la nueva tarjeta del frente (debe des-voltear desde abajo)
            const newFrontCard = cards[currentCardIndex];
            if (newFrontCard) {
                newFrontCard.classList.add('is-promoting');
                newFrontCard.classList.remove('is-flipped');
                setTimeout(() => {
                    newFrontCard.classList.remove('is-promoting');
                }, 600);
            }
        }, 100);
    }

    // Función para resetear la tarjeta arrastrada
    function resetDraggedCard() {
        if (!draggedCard) return;
        
        draggedCard.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        draggedCard.style.transform = 'translateY(0) scale(1)';
        draggedCard.style.opacity = '1';
        
        // Resetear las tarjetas adyacentes
        cards.forEach((card, index) => {
            if (index !== currentCardIndex) {
                card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                if (index > currentCardIndex) {
                    const offset = index - currentCardIndex;
                    card.style.transform = `translateY(${offset * 8}px) scale(${Math.pow(0.98, offset)})`;
                    card.style.filter = `brightness(${1 - offset * 0.1})`;
                } else {
                    const offset = currentCardIndex - index;
                    card.style.transform = `translateY(-${offset * 8}px) scale(${Math.pow(0.98, offset)})`;
                    card.style.filter = `brightness(${1 - offset * 0.1})`;
                }
            }
        });
        
        setTimeout(() => {
            if (draggedCard) {
                draggedCard.style.transition = '';
            }
            cards.forEach(card => {
                if (card !== draggedCard) {
                    card.style.transition = '';
                }
            });
        }, 400);
    }

    // Event listeners para cada tarjeta
    cards.forEach((card) => {
        // Mouse events
        card.addEventListener('mousedown', handleDragStart);
        
        // Touch events (móviles)
        card.addEventListener('touchstart', handleDragStart, { passive: false });
    });

    // Eventos globales para arrastre
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd, { passive: false });

    // Inicialización
    initializeCards();
    
    console.log('🃏 Stack de tarjetas inicializado con', cards.length, 'tarjetas (carrusel circular)');
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    initCardStack();
});
