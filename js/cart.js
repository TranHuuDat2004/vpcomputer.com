// js/cart.js (Phiên bản hoàn chỉnh, nâng cấp với hàm toàn cục và LocalStorage)

// Khai báo các biến hàm ở phạm vi toàn cục để các file script khác có thể gọi
let addToCart, openCart;

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // PHẦN 1: KHAI BÁO BIẾN VÀ KẾT NỐI LOCALSTORAGE
    // ===============================================
    let cart = []; // Mảng chứa các sản phẩm trong giỏ hàng
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    const cartCountElement = document.querySelector('.cart-count');

    if (!cartSidebar || !cartIcon || !cartCountElement) {
        console.error("Không tìm thấy các thành phần cần thiết cho giỏ hàng!");
        return;
    }

    // --- CÁC HÀM TƯƠNG TÁC VỚI LOCALSTORAGE ---
    function saveCartToLocalStorage() {
        localStorage.setItem('vpcomputer_cart', JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('vpcomputer_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // --- HÀM TỔNG HỢP: CẬP NHẬT BIẾN CART, LƯU VÀ RENDER LẠI ---
    function updateCartAndSave(newCart) {
        cart = newCart;
        saveCartToLocalStorage();
        renderCart(); // Vẽ lại giỏ hàng sau mỗi lần cập nhật
    }


    // ===============================================
    // PHẦN 2: CÁC HÀM XỬ LÝ LOGIC
    // ===============================================

    // --- Hàm render (vẽ lại) giỏ hàng ---
    function renderCart() {
        if (cart.length === 0) {
            cartSidebar.innerHTML = `
                <div class="cart-header">
                    <h3>Giỏ Hàng Của Bạn</h3>
                    <button class="close-cart-btn">×</button>
                </div>
                <div class="cart-body empty-cart">
                    <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                </div>
            `;
        } else {
            const cartItemsHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <p class="item-name">${item.name}</p>
                        <p class="item-price">${item.quantity} x ${item.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                    <button class="remove-item-btn">×</button>
                </div>
            `).join('');

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            cartSidebar.innerHTML = `
                <div class="cart-header">
                    <h3>Giỏ Hàng Của Bạn</h3>
                    <button class="close-cart-btn">×</button>
                </div>
                <div class="cart-body">
                    ${cartItemsHTML}
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Tổng cộng:</span>
                        <span>${total.toLocaleString('vi-VN')}₫</span>
                    </div>
                    <a href="#" class="btn-cart-view">Xem Giỏ Hàng</a>
                    <a href="#" class="btn-cart-checkout">Thanh Toán</a>
                </div>
            `;
        }

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';

        attachCartEvents();
    }
    
    // Gán hàm addToCart cục bộ vào biến addToCart toàn cục
    addToCart = function(productId) {
        const productToAdd = allProducts.find(p => p.id === productId);
        if (!productToAdd) {
            console.error(`Không tìm thấy sản phẩm với ID: ${productId}`);
            return;
        }
        
        let newCart = [...cart];
        const existingItemIndex = newCart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            newCart[existingItemIndex].quantity++;
        } else {
            newCart.push({ ...productToAdd, quantity: 1 });
        }
        
        updateCartAndSave(newCart);
    }
    
    // Gán hàm openCart cục bộ vào biến openCart toàn cục
    openCart = function() {
        renderCart(); // Luôn render lại trước khi mở để đảm bảo dữ liệu mới nhất
        cartSidebar.classList.add('active');
        document.body.classList.add('no-scroll');
    }
    
    // Hàm xóa sản phẩm khỏi giỏ
    function removeFromCart(productId) {
        const newCart = cart.filter(item => item.id !== productId);
        updateCartAndSave(newCart);
    }
    
    // Hàm đóng giỏ hàng
    function closeCart() {
        cartSidebar.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Hàm gắn sự kiện cho các nút bên trong giỏ hàng
    function attachCartEvents() {
        const closeBtn = cartSidebar.querySelector('.close-cart-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCart);
        }

        cartSidebar.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.cart-item').dataset.id;
                removeFromCart(productId);
            });
        });
    }

    // ===============================================
    // PHẦN 3: GẮN SỰ KIỆN CHUNG
    // ===============================================
    
    // Sự kiện click vào icon giỏ hàng trên header
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });

    // Sự kiện click vào các nút "Thêm vào giỏ" trên toàn trang
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.btn-secondary')) {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            if (productCard && productCard.dataset.id) {
                addToCart(productCard.dataset.id);
                openCart(); // Mở giỏ hàng khi thêm từ trang sản phẩm
            }
        }
    });

    // Sự kiện đóng giỏ hàng bằng phím Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
            closeCart();
        }
    });

    // ===============================================
    // KHỞI TẠO BAN ĐẦU
    // ===============================================
    const initialCart = loadCartFromLocalStorage();
    updateCartAndSave(initialCart); 

});