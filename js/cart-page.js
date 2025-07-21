// js/cart-page.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-list');
    const subtotalPriceEl = document.getElementById('subtotal-price');
    const totalPriceEl = document.getElementById('total-price');
    
    function renderCartPage() {
        const cart = JSON.parse(localStorage.getItem('vpcomputer_cart')) || [];
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
            updateSummary(0);
            return;
        }

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const itemHTML = `
                <div class="cart-item-card" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p class="item-price">${item.price.toLocaleString('vi-VN')}₫</p>
                    </div>
                    <div class="item-actions">
                        <div class="quantity-control">
                            <button class="quantity-decrease">-</button>
                            <input type="number" value="${item.quantity}" min="1">
                            <button class="quantity-increase">+</button>
                        </div>
                        <a href="#" class="remove-from-cart-btn">Xóa</a>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
            subtotal += item.price * item.quantity;
        });
        
        updateSummary(subtotal);
        attachPageEvents();
    }

    function updateSummary(subtotal) {
        subtotalPriceEl.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
        totalPriceEl.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
    }

    function attachPageEvents() {
        cartItemsContainer.querySelectorAll('.cart-item-card').forEach(card => {
            const productId = card.dataset.id;
            card.querySelector('.quantity-decrease').addEventListener('click', () => updateQuantity(productId, -1));
            card.querySelector('.quantity-increase').addEventListener('click', () => updateQuantity(productId, 1));
            card.querySelector('.remove-from-cart-btn').addEventListener('click', (e) => {
                e.preventDefault();
                removeFromPageCart(productId);
            });
        });
    }
    
    function updateQuantity(productId, change) {
        let cart = JSON.parse(localStorage.getItem('vpcomputer_cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity < 1) {
                cart[itemIndex].quantity = 1;
            }
        }
        localStorage.setItem('vpcomputer_cart', JSON.stringify(cart));
        renderCartPage(); // Cập nhật lại toàn bộ trang và cả sidebar
        if (typeof renderCart === 'function') renderCart();
    }

    function removeFromPageCart(productId) {
        let cart = JSON.parse(localStorage.getItem('vpcomputer_cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('vpcomputer_cart', JSON.stringify(cart));
        renderCartPage();
        if (typeof renderCart === 'function') renderCart();
    }

    renderCartPage();
});