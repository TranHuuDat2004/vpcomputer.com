// js/search.js (Phiên bản đã sửa lỗi)

document.addEventListener('DOMContentLoaded', () => {
    const searchGrid = document.getElementById('search-results-grid');
    const querySpan = document.getElementById('search-query');
    const countSpan = document.getElementById('result-count');

    // Lấy từ khóa tìm kiếm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (!query || !searchGrid || !querySpan || !countSpan) {
        if(querySpan) querySpan.textContent = "Không có từ khóa";
        return;
    }

    querySpan.textContent = query;
    const searchTerm = query.toLowerCase();

    // Lọc sản phẩm
    const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.brand.toLowerCase().includes(searchTerm)
    );

    countSpan.textContent = results.length;

    // Hiển thị kết quả
    if (results.length > 0) {
        results.forEach(product => {
            // === DI CHUYỂN LOGIC VÀO BÊN TRONG VÒNG LẶP ===
            const isAvailable = product.stockStatus === 'Còn hàng';
            
            // Tái sử dụng logic hiển thị giá sale
            const salePrice = calculateSalePrice(product);
            let priceHTML = `<p class="product-price">${salePrice.toLocaleString('vi-VN')}₫</p>`;
            if (salePrice < product.price) {
                priceHTML = `
                    <p class="product-price sale">
                        <span class="price">${salePrice.toLocaleString('vi-VN')}₫</span>
                        <del style="color:black; font-size: 16px">${product.price.toLocaleString('vi-VN')}₫</del>
                    </p>
                `;
            }
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            productCard.innerHTML = `
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        ${priceHTML}
                    </div>
                </a>
                <div class="product-actions">
                    <button class="btn btn-secondary" ${isAvailable ? '' : 'disabled'}>
                        ${isAvailable ? 'Thêm vào giỏ' : product.stockStatus}
                    </button>
                </div>
            `;
            searchGrid.appendChild(productCard);
        });
    } else {
        searchGrid.innerHTML = `<p class="no-results">Không tìm thấy sản phẩm nào phù hợp với từ khóa của bạn.</p>`;
    }
});