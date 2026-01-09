// Módulo de Carrusel
export function initCarousel() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        new Carousel(carousel);
    });
    
    if (carousels.length > 0) {
        console.log('✅ Carrusel inicializado');
    }
}

class Carousel {
    constructor(element) {
        this.carousel = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = element.querySelectorAll('.carousel-slide');
        this.prevBtn = element.querySelector('.carousel-btn-prev');
        this.nextBtn = element.querySelector('.carousel-btn-next');
        this.dotsContainer = element.querySelector('.carousel-dots');
        
        this.currentIndex = 0;
        this.slidesCount = this.slides.length;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 segundos
        
        if (this.slidesCount > 0) {
            this.init();
        }
    }
    
    init() {
        this.createDots();
        this.bindEvents();
        this.updateCarousel();
        this.startAutoplay();
    }
    
    createDots() {
        if (!this.dotsContainer) return;
        
        for (let i = 0; i < this.slidesCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Pausar autoplay al hacer hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Soporte para swipe en móviles
        this.addTouchSupport();
        
        // Soporte para teclado
        this.carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }
    
    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Mínimo 50px de swipe
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        }, { passive: true });
    }
    
    updateCarousel() {
        // Mover el track
        if (this.track) {
            this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }
        
        // Actualizar slides activos
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);
        });
        
        // Actualizar dots
        if (this.dots) {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentIndex);
            });
        }
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slidesCount;
        this.updateCarousel();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slidesCount) % this.slidesCount;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    startAutoplay() {
        if (this.slidesCount <= 1) return;
        
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

export { Carousel };
