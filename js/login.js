// js/login.js (Phiên bản tối giản)

document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // PHẦN LOGIC SLIDER JAVASCRIPT THUẦN (HIỆU ỨNG FADE)
    // ===============================================
    const sliderContainer = document.querySelector('.login-slider');

    if (sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.slide');
        const slideCount = slides.length;
        let currentIndex = 0;
        let autoPlayInterval;

        function goToSlide(index) {
            currentIndex = (index + slideCount) % slideCount;
            slides.forEach(slide => slide.classList.remove('active'));
            slides[currentIndex].classList.add('active');
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 3000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        if(slideCount > 0) {
            goToSlide(0);
            startAutoPlay();
        }
    }
});