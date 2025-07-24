// admin/js/products.js

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('product-table-body');
    if (!tableBody) return;

    function renderProducts() {
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ

        // Lấy dữ liệu từ biến allProducts (đã được nhúng từ ../js/data.js)
        allProducts.forEach(product => {
            const salePrice = calculateSalePrice(product);
            const hasSale = salePrice < product.price;

            let stockStatusClass = 'in-stock';
            if (product.stockStatus !== 'Còn hàng') {
                stockStatusClass = 'out-of-stock';
            }

            const row = document.createElement('tr');
            // THÊM CÁC THUỘC TÍNH data-label VÀO ĐÂY
            row.innerHTML = `
                <td><input type="checkbox"></td>
                <td>
                    <div class="product-cell">
                        <img src="../${product.image}" alt="${product.name}">
                        <span>${product.name}</span>
                    </div>
                </td>
                <td data-label="Mã SKU">${product.sku || 'N/A'}</td>
                <td data-label="Giá" class="price-cell">
                    <span class="${hasSale ? 'sale-price' : ''}">${salePrice.toLocaleString('vi-VN')}₫</span>
                    ${hasSale ? `<span class="original-price">${product.price.toLocaleString('vi-VN')}₫</span>` : ''}
                </td>
                <td data-label="Tồn kho">
                    <span class="stock-status ${stockStatusClass}">${product.stockStatus}</span>
                </td>
                <td data-label="Danh mục">${product.category}</td>
                <td data-label="Hành động">
                    <div class="action-buttons">
                        <!-- SỬA LẠI NÚT NÀY -->
                    <a href="edit-product.html?id=${product.id}" class="action-btn edit" title="Sửa">
                        <i class="fas fa-edit"></i>
                    </a>
                        <button class="action-btn delete" title="Xóa"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);

            // XÓA BỎ VIỆC GẮN SỰ KIỆN CŨ
        // row.querySelector('.edit').addEventListener('click', () => openEditModal(product.id));
        });

    }

    // Khởi tạo trang
    renderProducts();
});