import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 600,
    coverflowEffect: {
        rotate: 0,            // Ángulo de rotación
        stretch: 80,          // Espacio entre slides (positivo para separarlas)
        depth: 150,           // Profundidad (eje Z)
        modifier: 2.5,        // Multiplicador de escala
        slideShadows: false,  // Sombras internas del slide
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Efecto de autoplay opcional
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
});

export default swiper;
