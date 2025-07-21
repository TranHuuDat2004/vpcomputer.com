// js/builder.js (Phiên bản đã sắp xếp lại và sửa lỗi)

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // PHẦN 1: KHAI BÁO BIẾN VÀ TRẠNG THÁI
    // ===============================================
    let currentBuild = { cpu: null, mainboard: null, ram: null, vga: null, psu: null };

    const selectButtons = document.querySelectorAll('.btn-select');
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalProductList = document.getElementById('modal-product-list');
    const closeButton = document.querySelector('.close-button');
    const totalPriceEl = document.getElementById('total-price');
    const compatibilityMessagesEl = document.getElementById('compatibility-messages');
    const addToCartButton = document.querySelector('.btn-add-to-cart');
    let currentSelectingCategory = null;

    // ===============================================
    // PHẦN 2: ĐỊNH NGHĨA TẤT CẢ CÁC HÀM CHỨC NĂNG
    // ===============================================

    // --- Hàm phụ để thêm thông báo ---
    function addMessage(text, type) {
        const li = document.createElement('li');
        li.className = type;
        li.textContent = text;
        compatibilityMessagesEl.appendChild(li);
    }

    // --- Hàm kiểm tra tương thích ---
    function checkCompatibility() {
        compatibilityMessagesEl.innerHTML = '';
        let errors = 0;
        let componentsSelected = 0;
        const { cpu, mainboard, ram, vga, psu } = currentBuild;

        Object.values(currentBuild).forEach(comp => { if (comp) componentsSelected++; });

        if (cpu && mainboard) {
            if (cpu.attributes.socket === mainboard.attributes.socket) addMessage(`CPU & Mainboard: Socket ${cpu.attributes.socket} tương thích.`, 'success');
            else { addMessage(`LỖI: CPU (Socket ${cpu.attributes.socket}) và Mainboard (Socket ${mainboard.attributes.socket}) không tương thích!`, 'error'); errors++; }
        }

        if (ram && mainboard) {
            if (ram.attributes.ddr === mainboard.attributes.ddr) addMessage(`RAM & Mainboard: Chuẩn ${ram.attributes.ddr} tương thích.`, 'success');
            else { addMessage(`LỖI: RAM (${ram.attributes.ddr}) không lắp được vào Mainboard yêu cầu ${mainboard.attributes.ddr}!`, 'error'); errors++; }
        }

        if (psu && (cpu || vga)) {
            let requiredWattage = 150;
            if (cpu) requiredWattage += cpu.attributes.wattage;
            if (vga) requiredWattage += vga.attributes.wattage;

            if (psu.attributes.wattage >= requiredWattage) addMessage(`Nguồn ${psu.attributes.wattage}W đủ công suất (cần khoảng ${requiredWattage}W).`, 'success');
            else { addMessage(`CẢNH BÁO: Nguồn ${psu.attributes.wattage}W có thể không đủ công suất (cần ít nhất ${requiredWattage}W).`, 'error'); errors++; }
        }

        if (compatibilityMessagesEl.innerHTML === '') addMessage('Hãy chọn linh kiện để bắt đầu kiểm tra.', 'info');

        if (componentsSelected > 0 && errors === 0) addToCartButton.disabled = false;
        else addToCartButton.disabled = true;
    }

    // --- Hàm cập nhật giao diện ---
    function updateUI() {
        let totalPrice = 0;
        for (const category in currentBuild) {
            const product = currentBuild[category];
            const selectedItemEl = document.getElementById(`selected-${category}`);
            if (product) {
                selectedItemEl.innerHTML = `${product.name} <span class="price">${product.price.toLocaleString('vi-VN')}đ</span>`;
                totalPrice += product.price;
            } else if (selectedItemEl) {
                selectedItemEl.textContent = 'Chưa chọn linh kiện';
            }
        }
        totalPriceEl.textContent = `${totalPrice.toLocaleString('vi-VN')}đ`;
        checkCompatibility();
    }

    // --- Hàm đóng Modal ---
    function closeModal() {
        modal.style.display = 'none';
    }

    // --- Hàm chọn sản phẩm ---
    function selectProduct(product) {
        currentBuild[product.category] = product;
        updateUI();
        closeModal();
    }

    // --- Hàm mở Modal ---
    function openModal(category) {
        currentSelectingCategory = category;
        modal.style.display = 'block';
        modalTitle.textContent = `Chọn ${category.toUpperCase()}`;

        const filteredProducts = allProducts.filter(p => p.category === category);

        modalProductList.innerHTML = '';
        filteredProducts.forEach(product => {
            const itemEl = document.createElement('div');
            itemEl.className = 'product-item';
            itemEl.innerHTML = `<span>${product.name}</span><strong>${product.price.toLocaleString('vi-VN')}đ</strong>`;
            itemEl.addEventListener('click', () => selectProduct(product));
            modalProductList.appendChild(itemEl);
        });
    }

    // --- Hàm thêm cấu hình vào giỏ ---
    // js/builder.js

    // --- Hàm thêm cấu hình vào giỏ (PHIÊN BẢN MỚI) ---
    function addBuildConfigToCart() {
        const itemsToAdd = Object.values(currentBuild).filter(item => item !== null);
        if (itemsToAdd.length === 0) {
            alert("Bạn chưa chọn linh kiện nào!");
            return;
        }

        console.log("Chuẩn bị thêm các sản phẩm sau vào giỏ:", itemsToAdd);

        // Gọi trực tiếp hàm addToCart từ cart.js
        itemsToAdd.forEach(item => {
            // Kiểm tra xem hàm có tồn tại không để tránh lỗi
            if (typeof addToCart === 'function') {
                addToCart(item.id);
            } else {
                console.error("Hàm addToCart không được định nghĩa!");
            }
        });

        // Sau khi thêm TẤT CẢ, mới mở giỏ hàng MỘT LẦN
        if (typeof openCart === 'function') {
            openCart();
        } else {
            console.error("Hàm openCart không được định nghĩa!");
        }
    }

    // ===============================================
    // PHẦN 3: GẮN SỰ KIỆN VÀ KHỞI TẠO
    // ===============================================

    // Gán sự kiện cho các nút "Chọn"
    selectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            openModal(category);
        });
    });

    // Gán sự kiện cho các nút trong Modal và nút "Thêm vào giỏ"
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    addToCartButton.addEventListener('click', addBuildConfigToCart);

    // Khởi tạo giao diện ban đầu
    updateUI();
});