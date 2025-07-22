document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // PHẦN 1: "CƠ SỞ DỮ LIỆU" SẢN PHẨM
    // Trong thực tế, bạn sẽ lấy dữ liệu này từ server (API)
    // ===============================================



    // ===============================================
    // PHẦN 2: CÁC DOM ELEMENTS
    // ===============================================
    const productGrid = document.getElementById('product-grid-container');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const brandFilter = document.getElementById('brand-filter');
    const sortSelect = document.getElementById('sort');

    // ===============================================
    // PHẦN 3: CÁC HÀM XỬ LÝ
    // ===============================================

    // --- Hàm hiển thị sản phẩm ---
    function renderProducts(productsToRender) {
        productGrid.innerHTML = ''; // Xóa grid cũ
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p class="no-products">Không tìm thấy sản phẩm phù hợp.</p>';
            return;
        }

         productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;

        // Tính giá và tạo chuỗi HTML cho giá
        const salePrice = calculateSalePrice(product);
        let priceHTML = `<p class="product-price">${salePrice.toLocaleString('vi-VN')}₫</p>`;
        if (salePrice < product.price) {
            priceHTML = `
                <p class="product-price sale">
                    <span class="new-price">${salePrice.toLocaleString('vi-VN')}₫</span>
                    <span class="old-price">${product.price.toLocaleString('vi-VN')}₫</span>
                </p>
            `;
        }

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
                <button class="btn btn-secondary">Thêm vào giỏ</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

    // --- Hàm tự động tạo checkbox thương hiệu ---
    function populateBrandFilter() {
        const brands = [...new Set(allProducts.map(p => p.brand))]; // Lấy danh sách thương hiệu không trùng lặp
        brands.sort().forEach(brand => {
            const li = document.createElement('li');
            li.innerHTML = `<label><input type="checkbox" name="brand" value="${brand.toLowerCase()}"> ${brand}</label>`;
            brandFilter.appendChild(li);
        });
    }


    // --- HÀM LỌC CHÍNH ---
    function applyFilters() {
        // 1. Lấy tất cả các giá trị lọc hiện tại
        const selectedCategory = categoryFilter.querySelector('a.active').dataset.category;

        const selectedPriceValue = document.querySelector('input[name="price"]:checked').value;

        const selectedBrands = [...document.querySelectorAll('input[name="brand"]:checked')].map(cb => cb.value);

        const sortBy = sortSelect.value;

        // 2. Bắt đầu lọc từ danh sách đầy đủ
        let filteredProducts = allProducts;

        // Lọc theo danh mục
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
        }

        // Lọc theo giá (ĐÃ SỬA)
        // Chỉ lọc nếu người dùng không chọn "Tất cả"
        if (selectedPriceValue !== 'all') {
            const priceRange = selectedPriceValue.split('-');
            const minPrice = parseFloat(priceRange[0]);
            const maxPrice = parseFloat(priceRange[1]);
            filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
        }

        // Lọc theo thương hiệu
        if (selectedBrands.length > 0) {
            filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand.toLowerCase()));
        }

        // 3. Sắp xếp
        if (sortBy === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        // 4. Hiển thị kết quả
        renderProducts(filteredProducts);
    }

    // ===============================================
    // PHẦN 4: GẮN SỰ KIỆN (EVENT LISTENERS)
    // ===============================================

    // Gắn sự kiện cho bộ lọc danh mục
    categoryFilter.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            categoryFilter.querySelector('a.active').classList.remove('active');
            e.target.classList.add('active');
            applyFilters();
        }
    });

    // --- KẾT THÚC ĐOẠN CODE MỚI ---
    // Gắn sự kiện cho các bộ lọc còn lại
    priceFilter.addEventListener('change', applyFilters);
    brandFilter.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    // ===============================================
    // KHỞI TẠO TRANG
    // ===============================================

    // --- THÊM ĐOẠN CODE NÀY VÀO ---
    function checkUrlForCategory() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryFromUrl = urlParams.get('category');

        if (categoryFromUrl) {
            // Tìm link danh mục tương ứng
            const targetLink = categoryFilter.querySelector(`a[data-category="${categoryFromUrl}"]`);
            if (targetLink) {
                // "Click" giả vào link đó để kích hoạt bộ lọc
                targetLink.click();
            }
        }
    }
    // --- KẾT THÚC ĐOẠN CODE MỚI ---

    populateBrandFilter(); // Tạo các checkbox thương hiệu
    checkUrlForCategory(); // << GỌI HÀM MỚI Ở ĐÂY
    applyFilters(); // Hiển thị sản phẩm ban đầu
});