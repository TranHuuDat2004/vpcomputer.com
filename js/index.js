// File: js/index.js

document.addEventListener('DOMContentLoaded', function () {
    // === KHAI BÁO BIẾN ===
    // Lấy các thành phần cần thiết từ HTML
    const sliderContainer = document.querySelector('.slider-container');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const navTabs = document.querySelectorAll('.nav-tab');

    // Các biến trạng thái
    let currentIndex = 0; // Vị trí slide hiện tại, bắt đầu từ 0
    const slideCount = slides.length; // Tổng số slide
    let autoPlayInterval; // Biến để lưu trữ bộ đếm thời gian tự động chạy


    // === CÁC HÀM CHỨC NĂNG ===

    /**
     * Hàm chính để di chuyển đến một slide cụ thể
     * @param {number} index - Vị trí của slide muốn chuyển đến
     */
    function goToSlide(index) {
        // Xử lý vòng lặp: nếu đi quá slide cuối thì quay về đầu và ngược lại
        if (index >= slideCount) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slideCount - 1;
        } else {
            currentIndex = index;
        }

        // Di chuyển cả khối slide bằng CSS Transform
        const offset = -currentIndex * 100; // Tính toán vị trí mới
        sliderWrapper.style.transform = `translateX(${offset}%)`;

        // Cập nhật trạng thái 'active' cho các tab điều hướng
        updateNavTabs();
    }

    /**
     * Hàm cập nhật giao diện các tab điều hướng
     */
    function updateNavTabs() {
        navTabs.forEach((tab, index) => {
            // Xóa class 'active' khỏi tất cả các tab
            tab.classList.remove('active');
            
            // Thêm class 'active' chỉ cho tab tương ứng với slide hiện tại
            if (index === currentIndex) {
                tab.classList.add('active');
            }
        });
    }
    
    /**
     * Hàm bắt đầu tự động chuyển slide
     */
    function startAutoPlay() {
        // Chắc chắn rằng không có interval nào đang chạy trước khi bắt đầu
        stopAutoPlay(); 
        // Cứ mỗi 5 giây (5000ms) sẽ tự động chuyển đến slide tiếp theo
        autoPlayInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    /**
     * Hàm dừng tự động chuyển slide
     */
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }


    // === GÁN SỰ KIỆN ===

    // 1. Sự kiện click cho nút "Sau"
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        // Reset bộ đếm thời gian mỗi khi người dùng tự bấm nút
        startAutoPlay(); 
    });

    // 2. Sự kiện click cho nút "Trước"
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        // Reset bộ đếm thời gian
        startAutoPlay(); 
    });

    // 3. Sự kiện click cho các tab điều hướng
    navTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            goToSlide(index);
            // Reset bộ đếm thời gian
            startAutoPlay();
        });
    });

    // 4. Sự kiện di chuột vào/ra khỏi slider để tạm dừng/tiếp tục autoplay
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);


    // === KHỞI TẠO SLIDER ===
    
    // Hiển thị slide đầu tiên khi tải trang
    goToSlide(0); 
    
    // Bắt đầu tự động chạy
    startAutoPlay();

    function renderFeaturedProducts() {
    const featuredGrid = document.getElementById('featured-product-grid');
    if (!featuredGrid) return; // Nếu không tìm thấy grid thì thoát

    // Lấy 4 sản phẩm đầu tiên làm sản phẩm nổi bật (bạn có thể thay đổi logic này)
    const featuredProducts = allProducts.slice(0, 8);

    featuredGrid.innerHTML = ''; // Xóa grid cũ
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id; // << THÊM DÒNG NÀY
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString('vi-VN')}₫</p>
                <button class="btn btn-secondary">Thêm vào giỏ</button>
            </div>
        `;
        featuredGrid.appendChild(productCard);
    });
}

// Gọi hàm để hiển thị sản phẩm nổi bật
renderFeaturedProducts();
});