// js/search.js
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
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            productCard.innerHTML = `
                <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${product.price.toLocaleString('vi-VN')}₫</p>
                    <button class="btn btn-secondary">Thêm vào giỏ</button>
                </div>
            `;
            searchGrid.appendChild(productCard);
        });
    } else {
        searchGrid.innerHTML = `<p class="no-results">Không tìm thấy sản phẩm nào phù hợp với từ khóa của bạn.</p>`;
    }
});