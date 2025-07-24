// admin/js/data-manager.js

// Khóa để lưu dữ liệu trong LocalStorage
const DATA_KEY = 'vpcomputer_products';


// --- CÁC HÀM QUẢN LÝ DỮ LIỆU ---

/**
 * Lấy tất cả sản phẩm.
 * Nếu có dữ liệu trong LocalStorage, dùng nó.
 * Nếu không, dùng dữ liệu ban đầu và lưu vào LocalStorage.
 */
function getProducts() {
    let products = JSON.parse(localStorage.getItem(DATA_KEY));
    if (!products || products.length === 0) {
        products = initialProducts;
        saveProducts(products);
    }
    return products;
}

/**
 * Lưu một mảng sản phẩm vào LocalStorage.
 * @param {Array} products - Mảng sản phẩm cần lưu.
 */
function saveProducts(products) {
    localStorage.setItem(DATA_KEY, JSON.stringify(products));
}

/**
 * Cập nhật một sản phẩm duy nhất.
 * @param {Object} updatedProduct - Đối tượng sản phẩm đã được cập nhật.
 */
function updateProduct(updatedProduct) {
    let products = getProducts();
    const productIndex = products.findIndex(p => p.id === updatedProduct.id);
    if (productIndex > -1) {
        products[productIndex] = updatedProduct;
        saveProducts(products);
        return true; // Trả về true nếu thành công
    }
    return false; // Trả về false nếu không tìm thấy sản phẩm
}