// js/product.js (Phiên bản đã sửa lỗi lồng sự kiện)

// Chỉ cần MỘT sự kiện DOMContentLoaded duy nhất bao bọc toàn bộ code
document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // PHẦN 1: CÁC DOM ELEMENTS
    // ===============================================
    const productGrid = document.getElementById('product-grid-container');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortSelect = document.getElementById('sort');
    const toggleFilterBtn = document.getElementById('btn-toggle-filter');
    const filterSidebar = document.getElementById('filter-sidebar');

    // Thoát sớm nếu thiếu các thành phần quan trọng
    if (!productGrid || !categoryFilter || !priceFilter || !brandFilter || !sortSelect) {
        console.error("Thiếu các thành phần HTML cần thiết cho trang sản phẩm.");
        return;
    }

    // ===============================================
    // PHẦN 2: CÁC HÀM CHỨC NĂNG
    // ===============================================

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p class="no-products">Không tìm thấy sản phẩm phù hợp.</p>';
            return;
        }
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            const isAvailable = product.stockStatus === 'Còn hàng';
            const salePrice = calculateSalePrice(product);
            let priceHTML = `<p class="product-price"><span class="price">${salePrice.toLocaleString('vi-VN')}₫</span></p>`;
            if (salePrice < product.price) {
                priceHTML = `<p class="product-price sale"><span class="price">${salePrice.toLocaleString('vi-VN')}₫</span><del>${product.price.toLocaleString('vi-VN')}₫</del></p>`;
            }
            productCard.innerHTML = `<a href="product-detail.html?id=${product.id}" class="product-link"><div class="product-image"><img src="${product.image}" alt="${product.name}"></div><div class="product-info"><h3 class="product-name">${product.name}</h3>${priceHTML}</div></a><div class="product-actions"><button class="btn btn-secondary" ${isAvailable ? '' : 'disabled'}>${isAvailable ? 'Thêm vào giỏ' : product.stockStatus}</button></div>`;
            productGrid.appendChild(productCard);
        });
    }

    function populateBrandFilter() {
        const brands = [...new Set(allProducts.map(p => p.brand))];
        brands.sort().forEach(brand => {
            const li = document.createElement('li');
            li.innerHTML = `<label><input type="checkbox" name="brand" value="${brand.toLowerCase()}"> ${brand}</label>`;
            brandFilter.appendChild(li);
        });
    }

    function applyFilters() {
        const selectedCategory = categoryFilter.querySelector('a.active').dataset.category;
        const selectedPriceValue = document.querySelector('input[name="price"]:checked').value;
        const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')].map(cb => cb.value);
        let filteredProducts = allProducts;
        if (selectedCategory !== 'all') { filteredProducts = filteredProducts.filter(p => p.category === selectedCategory); }
        if (selectedPriceValue !== 'all') { const [minPrice, maxPrice] = selectedPriceValue.split('-').map(parseFloat); filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice); }
        if (selectedBrands.length > 0) { filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand.toLowerCase())); }

        const sortBy = sortSelect.value;
        if (sortBy === 'default') {
            filteredProducts = shuffleArray(filteredProducts);
        } else if (sortBy === 'price-asc') {
            filteredProducts.sort((a, b) => calculateSalePrice(a) - calculateSalePrice(b));
        } else if (sortBy === 'price-desc') {
            filteredProducts.sort((a, b) => calculateSalePrice(b) - calculateSalePrice(a));
        }
        renderProducts(filteredProducts);
    }

    // ===============================================
    // PHẦN 3: GẮN SỰ KIỆN VÀ KHỞI TẠO
    // ===============================================
    function checkUrlForCategory() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');
        if (categoryFromUrl) {
            const targetLink = categoryFilter.querySelector(`a[data-category="${categoryFromUrl}"]`);
            if (targetLink) {
                // Click giả không kích hoạt event listener một cách đáng tin cậy trên mọi trình duyệt
                // Thay vào đó, chúng ta sẽ trực tiếp cập nhật trạng thái và gọi applyFilters
                categoryFilter.querySelector('a.active').classList.remove('active');
                targetLink.classList.add('active');
                applyFilters(); // Gọi lại bộ lọc sau khi đã đổi active link
            }
        }
    }

    categoryFilter.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            categoryFilter.querySelector('a.active').classList.remove('active');
            e.target.classList.add('active');
            applyFilters();
        }
    });

    if (toggleFilterBtn && filterSidebar) {
        toggleFilterBtn.addEventListener('click', () => {
            filterSidebar.classList.toggle('active');
        });
    }

    priceFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    populateBrandFilter();
    applyFilters(); // Áp dụng bộ lọc lần đầu tiên
    checkUrlForCategory(); // Kiểm tra URL để áp dụng bộ lọc từ link
    
});