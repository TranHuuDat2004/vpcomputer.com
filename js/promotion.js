// js/promotion.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Tìm tất cả các container của slider trên trang
    const allPromoSwipers = document.querySelectorAll('.promo-swiper');

    // Lặp qua từng slider và khởi tạo nó
    allPromoSwipers.forEach((swiperElement) => {
        
        // Tìm các nút điều hướng CỤ THỂ của slider này
        const nextBtn = swiperElement.parentElement.querySelector('.swiper-button-next');
        const prevBtn = swiperElement.parentElement.querySelector('.swiper-button-prev');

        new Swiper(swiperElement, {
            // Tùy chọn
            slidesPerView: 2, // Mặc định hiển thị 2 sản phẩm
            spaceBetween: 15,
            
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },

            // Responsive breakpoints
            breakpoints: {
                // Khi màn hình rộng >= 768px
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                // Khi màn hình rộng >= 1024px
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20
                }
            }
        });
    });

});