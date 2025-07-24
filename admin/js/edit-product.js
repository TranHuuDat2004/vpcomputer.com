// admin/js/edit-product.js

document.addEventListener('DOMContentLoaded', () => {
    
    const formContainer = document.getElementById('edit-product-form');
    if (!formContainer) return;
    
    // 1. Lấy ID sản phẩm từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        formContainer.innerHTML = '<h2>ID sản phẩm không hợp lệ.</h2>';
        return;
    }

    // 2. Tìm sản phẩm trong allProducts
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        formContainer.innerHTML = `<h2>Không tìm thấy sản phẩm với ID: ${productId}</h2>`;
        return;
    }

    // 3. Render form với dữ liệu của sản phẩm
    function renderForm() {
        formContainer.innerHTML = `
            <div class="edit-form-grid">
                <div class="form-group">
                    <label for="name">Tên sản phẩm</label>
                    <input type="text" id="name" value="${product.name}" required>
                </div>
                <div class="form-group">
                    <label for="sku">Mã SKU</label>
                    <input type="text" id="sku" value="${product.sku || ''}">
                </div>
                <div class="form-group">
                    <label for="price">Giá gốc (VNĐ)</label>
                    <input type="number" id="price" value="${product.price}" required>
                </div>
                <div class="form-group">
                    <label for="discountPercent">Giảm giá (%)</label>
                    <input type="number" id="discountPercent" value="${product.discountPercent || 0}">
                </div>
                <div class="form-group">
                    <label for="brand">Thương hiệu</label>
                    <input type="text" id="brand" value="${product.brand}" required>
                </div>
                <div class="form-group">
                    <label for="stockStatus">Tình trạng kho</label>
                    <select id="stockStatus">
                        <option value="Còn hàng" ${product.stockStatus === 'Còn hàng' ? 'selected' : ''}>Còn hàng</option>
                        <option value="Hết hàng" ${product.stockStatus === 'Hết hàng' ? 'selected' : ''}>Hết hàng</option>
                        <option value="Hàng sắp về" ${product.stockStatus === 'Hàng sắp về' ? 'selected' : ''}>Hàng sắp về</option>
                    </select>
                </div>
                <div class="form-group full-width">
                    <label for="description">Mô tả</label>
                    <textarea id="description" rows="8">${product.description || ''}</textarea>
                </div>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn-save">Lưu Thay Đổi</button>
            </div>
        `;
    }

    // 4. Xử lý sự kiện submit của form
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();

        // Thu thập dữ liệu đã sửa từ form
        const updatedProduct = {
            ...product, // Giữ lại các thuộc tính không đổi
            name: document.getElementById('name').value,
            sku: document.getElementById('sku').value,
            price: parseInt(document.getElementById('price').value, 10),
            discountPercent: parseInt(document.getElementById('discountPercent').value, 10),
            brand: document.getElementById('brand').value,
            stockStatus: document.getElementById('stockStatus').value,
            description: document.getElementById('description').value,
        };

        // *** LOGIC LƯU DỮ LIỆU ***
        // Trong thực tế, bạn sẽ gửi 'updatedProduct' lên server.
        // Ở đây, chúng ta sẽ giả lập bằng cách cập nhật lại mảng allProducts trong bộ nhớ.
        const productIndex = allProducts.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            allProducts[productIndex] = updatedProduct;
            console.log("Sản phẩm đã được cập nhật (trong bộ nhớ):", allProducts[productIndex]);
            alert('Cập nhật sản phẩm thành công!');
            
            // Chuyển hướng về trang danh sách sau khi lưu
            window.location.href = 'products.html';
        } else {
            alert('Có lỗi xảy ra, không tìm thấy sản phẩm để cập nhật.');
        }
    });

    // Khởi tạo
    renderForm();
});