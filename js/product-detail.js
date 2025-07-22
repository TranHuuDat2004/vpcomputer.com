// js/product-detail.js (Phiên bản hoàn chỉnh)

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-detail-container');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        container.innerHTML = '<h1>Sản phẩm không tồn tại!</h1>';
        return;
    }
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        container.innerHTML = '<h1>Sản phẩm không tồn tại!</h1>';
        return;
    }

    document.title = `${product.name} - VP Computer`;
    // --- HÀM TẠO HTML CHO CÁC NGÔI SAO ĐÁNH GIÁ ---
    function createRatingStars(rating) {
        let starsHTML = '';
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) starsHTML += '<i class="fas fa-star"></i>';
        if (halfStar) starsHTML += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < emptyStars; i++) starsHTML += '<i class="far fa-star"></i>';

        return starsHTML;
    }
    // --- TÍNH TOÁN GIÁ ---
    // --- TÍNH TOÁN VÀ TẠO HTML CHO GIÁ (ĐÃ NÂNG CẤP) ---
    const salePrice = calculateSalePrice(product); // Gọi hàm toàn cục từ data.js
    let priceHTML;

    if (salePrice < product.price) {
        // Nếu có giảm giá
        priceHTML = `
            <div class="product-price-main">
                <span class="price">${salePrice.toLocaleString('vi-VN')}₫</span>
                <del>${product.price.toLocaleString('vi-VN')}₫</del>
            </div>
        `;
    } else {
        // Nếu không giảm giá
        priceHTML = `
            <div class="product-price-main">
                <span class="price">${product.price.toLocaleString('vi-VN')}₫</span>
            </div>
        `;
    }

    // --- TẠO HTML CHO GALLERY ẢNH ---
    const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    const galleryThumbsHTML = galleryImages.map((imgUrl, index) => `
        <div class="thumb-item ${index === 0 ? 'active' : ''}" data-src="${imgUrl}">
            <img src="${imgUrl}" alt="Thumbnail ${index + 1}" />
        </div>
    `).join('');

    // --- TẠO HTML CHÍNH ---
    // Thêm biến kiểm tra tình trạng hàng
    const isAvailable = product.stockStatus === 'Còn hàng';
    container.innerHTML = `
        <div class="product-detail-layout">
            <div class="product-gallery">
                <div class="gallery-thumbs">${galleryThumbsHTML}</div>
                <div class="gallery-main-image"><div class="zoom-container"><img id="main-product-image" src="${galleryImages[0]}" alt="${product.name}"></div></div>
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="product-meta">
                    <span>Mã sản phẩm: ${product.sku || 'Đang cập nhật'}</span>
                    <span>Tình trạng: ${product.stockStatus || 'Còn hàng'}</span>
                    <div class="product-rating">
                        <div class="stars">${createRatingStars(product.rating || 0)}</div>
                        <span>(${product.reviewCount || 0} đánh giá)</span>
                    </div>
                </div>
                ${priceHTML}
                <div class="product-promo-box">
                    <h4><i class="fas fa-gift"></i> Khuyến mãi - Ưu đãi</h4>
                    <ul>
                        <li>Giảm giá sốc mùa hè, áp dụng đến hết tháng.</li>
                        <li>Miễn phí vận chuyển cho đơn hàng trên 500.000₫.</li>
                    </ul>
                </div>
                <div class="quantity-section">
                    <span>Số lượng:</span>
                    <div class="quantity-control">
                        <button class="quantity-decrease" id="quantity-decrease">-</button>
                        <input type="number" value="1" min="1" class="quantity-input" id="quantity-input">
                        <button class="quantity-increase" id="quantity-increase">+</button>
                    </div>
                </div>
                                <!-- SỬA LẠI NÚT NÀY -->
                <button class="btn-buy-now" ${isAvailable ? '' : 'disabled'}>
                    ${isAvailable ? 'MUA NGAY' : 'HẾT HÀNG'}
                </button>
                <div class="policy-section">
                    <div class="policy-item"><i class="fas fa-shield-alt"></i><span>Bảo hành chính hãng 36 tháng</span></div>
                    <div class="policy-item"><i class="fas fa-check-circle"></i><span>Giá luôn tốt nhất</span></div>
                </div>
            </div>
        </div>
        <div class="product-tabs">
            <div class="tab-nav">
                <div class="tab-nav-item active" data-tab="desc">Mô Tả Sản Phẩm</div>
                <div class="tab-nav-item" data-tab="specs">Thông Số Kỹ Thuật</div>
            </div>
            <div class="tab-content">
                <div class="tab-pane active" id="desc">${product.description || '<p>Sản phẩm này chưa có mô tả.</p>'}</div>
                <div class="tab-pane" id="specs"><p>Thông số kỹ thuật đang được cập nhật...</p></div>
            </div>
        </div>
    `;

    // --- GẮN SỰ KIỆN ---

    // 1. Logic cho Gallery ảnh
    const mainImage = document.getElementById('main-product-image');
    const thumbItems = container.querySelectorAll('.thumb-item');
    thumbItems.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbItems.forEach(item => item.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.dataset.src;
        });
    });

    // 2. Logic cho nút tăng/giảm số lượng
    const quantityInput = container.querySelector('#quantity-input');
    container.querySelector('#quantity-decrease').addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) quantityInput.value = currentValue - 1;
    });
    container.querySelector('#quantity-increase').addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        quantityInput.value = currentValue + 1;
    });

    // 3. Logic cho nút MUA NGAY (thêm kiểm tra 'isAvailable')
    const buyNowBtn = container.querySelector('.btn-buy-now');
    if (buyNowBtn) { // Kiểm tra xem nút có tồn tại không
        buyNowBtn.addEventListener('click', () => {
            // Chỉ thực hiện khi nút không bị disabled
            if (!buyNowBtn.disabled) {
                const quantity = parseInt(quantityInput.value, 10);
                if (quantity > 0 && typeof addToCart === 'function') {
                    for (let i = 0; i < quantity; i++) {
                        addToCart(product.id);
                    }
                    openCart();
                }
            }
        });
    }

    // 4. Logic cho Tab
    const tabNavItems = container.querySelectorAll('.tab-nav-item');
    const tabPanes = container.querySelectorAll('.tab-pane');
    tabNavItems.forEach(item => {
        item.addEventListener('click', () => {
            tabNavItems.forEach(i => i.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            item.classList.add('active');
            container.querySelector(`#${item.dataset.tab}`).classList.add('active');
        });
    });
});
