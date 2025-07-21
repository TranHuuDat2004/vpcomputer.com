// js/cart.js (Phiên bản nâng cấp với LocalStorage)

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // PHẦN 1: KHỞI TẠO BIẾN VÀ KẾT NỐI LOCALSTORAGE
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
        // Chuyển mảng 'cart' thành chuỗi JSON để lưu
        localStorage.setItem('vpcomputer_cart', JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        // Lấy chuỗi JSON từ localStorage và chuyển ngược lại thành mảng
        const savedCart = localStorage.getItem('vpcomputer_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // --- HÀM TỔNG HỢP: CẬP NHẬT BIẾN CART VÀ LƯU LẠI ---
    function updateCartAndSave(newCart) {
        cart = newCart;
        saveCartToLocalStorage();
        renderCart(); // Vẽ lại giỏ hàng sau mỗi lần cập nhật
    }


    // ===============================================
    // PHẦN 2: CÁC HÀM XỬ LÝ LOGIC (Đã cập nhật)
    // ===============================================

    function renderCart() {
        // ... Nội dung hàm renderCart không đổi ...
        // (Copy/paste toàn bộ hàm renderCart cũ của bạn vào đây)
        if (cart.length === 0) {
            cartSidebar.innerHTML = `
                <div class="cart-header"><h3>Giỏ Hàng Của Bạn</h3><button class="close-cart-btn">×</button></div>
                <div class="cart-body empty-cart"><p>Chưa có sản phẩm nào trong giỏ hàng.</p></div>
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
                <div class="cart-header"><h3>Giỏ Hàng Của Bạn</h3><button class="close-cart-btn">×</button></div>
                <div class="cart-body">${cartItemsHTML}</div>
                <div class="cart-footer">
                    <div class="cart-total"><span>Tổng cộng:</span><span>${total.toLocaleString('vi-VN')}₫</span></div>
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
    
    // Sửa lại hàm addToCart để sử dụng updateCartAndSave
    function addToCart(productId) {
        const productToAdd = allProducts.find(p => p.id === productId);
        if (!productToAdd) return;
        
        let newCart = [...cart]; // Tạo một bản sao của giỏ hàng
        const existingItemIndex = newCart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            newCart[existingItemIndex].quantity++;
        } else {
            newCart.push({ ...productToAdd, quantity: 1 });
        }
        
        updateCartAndSave(newCart); // Cập nhật và lưu
        openCart(); // Mở giỏ hàng sau khi thêm
    }
    
    // Sửa lại hàm removeFromCart để sử dụng updateCartAndSave
    function removeFromCart(productId) {
        const newCart = cart.filter(item => item.id !== productId);
        updateCartAndSave(newCart); // Cập nhật và lưu
    }
    
    // ... Các hàm openCart, closeCart, attachCartEvents không cần thay đổi ...
    function openCart() {
        cartSidebar.classList.add('active');
        document.body.classList.add('no-scroll');
    }
    function closeCart() {
        cartSidebar.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    function attachCartEvents() {
        const closeBtn = cartSidebar.querySelector('.close-cart-btn');
        if (closeBtn) closeBtn.addEventListener('click', closeCart);
        cartSidebar.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.closest('.cart-item').dataset.id;
                removeFromCart(productId);
            });
        });
    }

    // ===============================================
    // PHẦN 3: GẮN SỰ KIỆN (Không đổi)
    // ===============================================
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });
    document.body.addEventListener('click', (e) => {
        if (e.target.matches('.btn-secondary') || e.target.matches('.btn-add-to-cart')) {
            e.preventDefault();
            const productCard = e.target.closest('.product-card');
            if (productCard && productCard.dataset.id) {
                addToCart(productCard.dataset.id);
            }
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
            closeCart();
        }
    });

    // ===============================================
    // KHỞI TẠO BAN ĐẦU (Đã cập nhật)
    // ===============================================
    
    // 1. Tải giỏ hàng từ LocalStorage khi trang vừa mở
    const initialCart = loadCartFromLocalStorage();
    
    // 2. Cập nhật trạng thái và render lần đầu
    updateCartAndSave(initialCart); 
});