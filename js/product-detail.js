// js/product-detail.js
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-detail-container');
    
    // 1. Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        container.innerHTML = '<h1>Sản phẩm không tồn tại!</h1>';
        return;
    }

    // 2. Tìm sản phẩm trong 'allProducts' từ data.js
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        container.innerHTML = '<h1>Sản phẩm không tồn tại!</h1>';
        return;
    }

    // 3. Cập nhật tiêu đề trang
    document.title = `${product.name} - VP Computer`;
    
    // 4. Tạo và chèn HTML vào trang
    container.innerHTML = `
        <div class="container">
            <div class="product-detail-layout">
                <div class="product-gallery">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <div class="product-price-box">
                        <span class="price">${product.price.toLocaleString('vi-VN')}₫</span>
                        <div class="add-to-cart-section">
                            <input type="number" value="1" min="1" class="quantity-input" id="quantity">
                            <button class="btn-submit btn-add-to-cart" data-id="${product.id}">Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                    <div class="product-description">
                        ${product.description || '<p>Sản phẩm này chưa có mô tả.</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;

    // 5. Gắn sự kiện cho nút "Thêm vào giỏ"
    const addToCartBtn = container.querySelector('.btn-add-to-cart');
    const quantityInput = container.querySelector('#quantity');

    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value, 10);
        // Giả sử hàm addToCart có thể nhận số lượng (cần nâng cấp cart.js sau)
        // Hiện tại, chúng ta sẽ gọi nó nhiều lần
        for (let i = 0; i < quantity; i++) {
            addToCart(product.id);
        }
        openCart();
    });
});