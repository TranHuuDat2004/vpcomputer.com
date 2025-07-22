// js/promo-generator.js (Phiên bản đã sửa lỗi và đồng bộ)

document.addEventListener('DOMContentLoaded', () => {
    
    const promoContainer = document.getElementById('promo-page-container');
    if (!promoContainer) return; // Thoát sớm nếu không phải trang promotion

    // Mảng promoCategories không đổi
    const promoCategories = [
        { category: 'cpu', title: 'CPU - Vi xử lý', bannerText: 'DEAL CPU', bannerColor: '#e74c3c' },
        { category: 'vga', title: 'VGA - Card Đồ Họa', bannerText: 'DEAL VGA', bannerColor: '#27ae60' },
        { category: 'mainboard', title: 'Mainboard', bannerText: 'DEAL MAIN', bannerColor: '#8e44ad' },
        { category: 'ram', title: 'RAM', bannerText: 'DEAL RAM', bannerColor: '#f39c12' },
        { category: 'psu', title: 'PSU - Nguồn', bannerText: 'DEAL PSU', bannerColor: '#34495e' }
    ];
    
    // --- HÀM TẠO HTML CHO SLIDE (ĐÃ DỌN DẸP) ---
    // Hàm này bây giờ sẽ sử dụng hàm calculateSalePrice toàn cục từ data.js
    function createProductSlide(product) {
        if (!product.discountPercent || product.discountPercent <= 0) return '';
        
        // Gọi hàm toàn cục từ data.js
        const salePrice = calculateSalePrice(product);

        return `
            <div class="swiper-slide">
                <div class="product-card" data-id="${product.id}">
                    <div class="sale-tag">Giảm ${product.discountPercent}%</div>
                    <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price sale">
                            <span class="new-price">${salePrice.toLocaleString('vi-VN')}₫</span>
                            <span class="old-price">${product.price.toLocaleString('vi-VN')}₫</span>
                        </p>
                        <!-- Xóa bỏ data-price không cần thiết -->
                        <button class="btn btn-secondary">Thêm vào giỏ</button>
                    </div>
                </div>
            </div>
        `;
    }

    // --- Lặp qua các danh mục để tạo khối (Không đổi) ---
    promoCategories.forEach((promo, index) => {
        const productsForSlider = allProducts.filter(p => p.category === promo.category && p.discountPercent > 0);
        
        if (productsForSlider.length > 0) {
            const productSlidesHTML = productsForSlider.map(createProductSlide).join('');
            const promoBlockHTML = `
                <section class="promo-block">
                    <div class="promo-banner-side">
                        <img src="https://via.placeholder.com/300x450/${promo.bannerColor.substring(1)}/ffffff?text=${encodeURIComponent(promo.bannerText)}" alt="Combo ${promo.title}">
                    </div>
                    <div class="promo-slider-side">
                        <div class="swiper promo-swiper">
                            <div class="swiper-wrapper">${productSlidesHTML}</div>
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </section>
                <div class="view-more-container">
                    <a href="product.html?category=${promo.category}" class="view-more-btn"><i class="fas fa-bolt"></i> XEM THÊM DEAL ${promo.title.toUpperCase()}</a>
                </div>
            `;
            promoContainer.innerHTML += promoBlockHTML;
        }
    });

    // --- Khởi tạo Swiper (Không đổi) ---
    const allPromoSwipers = document.querySelectorAll('.promo-swiper');
    allPromoSwipers.forEach((swiperElement) => {
        const nextBtn = swiperElement.parentElement.querySelector('.swiper-button-next');
        const prevBtn = swiperElement.parentElement.querySelector('.swiper-button-prev');

        new Swiper(swiperElement, {
            slidesPerView: 2,
            spaceBetween: 15,
            navigation: { nextEl: nextBtn, prevEl: prevBtn },
            breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 20 },
                1200: { slidesPerView: 4, spaceBetween: 20 }
            }
        });
    });
});