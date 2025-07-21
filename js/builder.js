document.addEventListener('DOMContentLoaded', () => {
    
    // ===============================================
    // PHẦN 1: "CƠ SỞ DỮ LIỆU" SẢN PHẨM (MÔ PHỎNG)
    // Trong thực tế, bạn sẽ lấy dữ liệu này từ server.
    // Các thuộc tính (attributes) là chìa khóa cho việc kiểm tra tương thích.
    // ===============================================
    const products = [
        // CPUs
        { id: 'cpu1', type: 'cpu', name: 'Intel Core i5-13400F', price: 5490000, attributes: { socket: 'LGA 1700', wattage: 65 } },
        { id: 'cpu2', type: 'cpu', name: 'Intel Core i7-13700K', price: 10590000, attributes: { socket: 'LGA 1700', wattage: 125 } },
        { id: 'cpu3', type: 'cpu', name: 'AMD Ryzen 5 7600X', price: 6200000, attributes: { socket: 'AM5', wattage: 105 } },
        { id: 'cpu4', type: 'cpu', name: 'AMD Ryzen 7 7800X3D', price: 11500000, attributes: { socket: 'AM5', wattage: 120 } },

        // Mainboards
        { id: 'mb1', type: 'mainboard', name: 'ASUS PRIME B760M-A WIFI D4', price: 4190000, attributes: { socket: 'LGA 1700', ddr: 'DDR4' } },
        { id: 'mb2', type: 'mainboard', name: 'GIGABYTE Z790 AORUS ELITE AX', price: 7190000, attributes: { socket: 'LGA 1700', ddr: 'DDR5' } },
        { id: 'mb3', type: 'mainboard', name: 'ASUS TUF GAMING B650-PLUS', price: 5590000, attributes: { socket: 'AM5', ddr: 'DDR5' } },
        { id: 'mb4', type: 'mainboard', name: 'MSI MAG X670E TOMAHAWK WIFI', price: 8990000, attributes: { socket: 'AM5', ddr: 'DDR5' } },
        
        // RAM
        { id: 'ram1', type: 'ram', name: 'Corsair Vengeance 16GB (2x8GB) Bus 3200', price: 1150000, attributes: { ddr: 'DDR4' } },
        { id: 'ram2', type: 'ram', name: 'G.Skill Trident Z5 RGB 32GB (2x16GB) Bus 6000', price: 3250000, attributes: { ddr: 'DDR5' } },
        
        // VGA
        { id: 'vga1', type: 'vga', name: 'GIGABYTE GeForce RTX 3060 12GB', price: 8290000, attributes: { wattage: 170 } },
        { id: 'vga2', type: 'vga', name: 'ASUS TUF Gaming GeForce RTX 4070 Ti 12GB', price: 22490000, attributes: { wattage: 285 } },

        // PSU
        { id: 'psu1', type: 'psu', name: 'Cooler Master MWE 650W Bronze V2', price: 1590000, attributes: { wattage: 650 } },
        { id: 'psu2', type: 'psu', name: 'Corsair RM850e 850W 80 Plus Gold', price: 2950000, attributes: { wattage: 850 } },
    ];

    // ===============================================
    // PHẦN 2: QUẢN LÝ TRẠNG THÁI CẤU HÌNH
    // ===============================================
    let currentBuild = {
        cpu: null,
        mainboard: null,
        ram: null,
        vga: null,
        psu: null
    };

    // DOM Elements
    const selectButtons = document.querySelectorAll('.btn-select');
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalProductList = document.getElementById('modal-product-list');
    const closeButton = document.querySelector('.close-button');
    const totalPriceEl = document.getElementById('total-price');
    const compatibilityMessagesEl = document.getElementById('compatibility-messages');
    const addToCartButton = document.querySelector('.btn-add-to-cart');

    let currentSelectingType = null;

    // ===============================================
    // PHẦN 3: CÁC HÀM XỬ LÝ
    // ===============================================
    
    // Mở Modal để chọn sản phẩm
    function openModal(type) {
        currentSelectingType = type;
        modal.style.display = 'block';
        modalTitle.textContent = `Chọn ${type.toUpperCase()}`;
        
        // Lọc sản phẩm theo loại và hiển thị
        const filteredProducts = products.filter(p => p.type === type);
        modalProductList.innerHTML = ''; // Xóa danh sách cũ
        filteredProducts.forEach(product => {
            const itemEl = document.createElement('div');
            itemEl.className = 'product-item';
            itemEl.innerHTML = `
                <span>${product.name}</span>
                <strong>${product.price.toLocaleString()}đ</strong>
            `;
            itemEl.addEventListener('click', () => selectProduct(product));
            modalProductList.appendChild(itemEl);
        });
    }

    // Đóng Modal
    function closeModal() {
        modal.style.display = 'none';
    }


    // Khi người dùng chọn một sản phẩm trong Modal
    function selectProduct(product) {
        currentBuild[product.type] = product;
        updateUI();
        closeModal();
    }
    
    // Cập nhật giao diện người dùng sau khi có thay đổi
    function updateUI() {
        let totalPrice = 0;
        
        // Cập nhật từng dòng linh kiện đã chọn
        for (const type in currentBuild) {
            const product = currentBuild[type];
            const selectedItemEl = document.getElementById(`selected-${type}`);
            if (product) {
                selectedItemEl.innerHTML = `${product.name} <span class="price">${product.price.toLocaleString()}đ</span>`;
                totalPrice += product.price;
            } else {
                selectedItemEl.textContent = 'Chưa chọn linh kiện';
            }
        }
        
        // Cập nhật tổng giá tiền
        totalPriceEl.textContent = `${totalPrice.toLocaleString()}đ`;
        
        // Kiểm tra tương thích
        checkCompatibility();
    }
    
    // HÀM QUAN TRỌNG NHẤT: KIỂM TRA TƯƠNG THÍCH
    function checkCompatibility() {
        compatibilityMessagesEl.innerHTML = ''; // Xóa các thông báo cũ
        let errors = 0;

        const { cpu, mainboard, ram, vga, psu } = currentBuild;
        
        // 1. Kiểm tra CPU và Mainboard
        if (cpu && mainboard) {
            if (cpu.attributes.socket === mainboard.attributes.socket) {
                addMessage(`CPU (${cpu.attributes.socket}) và Mainboard (${mainboard.attributes.socket}) tương thích Socket.`, 'success');
            } else {
                addMessage(`LỖI: CPU (${cpu.attributes.socket}) và Mainboard (${mainboard.attributes.socket}) KHÔNG tương thích Socket!`, 'error');
                errors++;
            }
        }

        // 2. Kiểm tra RAM và Mainboard
        if (ram && mainboard) {
            if (ram.attributes.ddr === mainboard.attributes.ddr) {
                addMessage(`RAM (${ram.attributes.ddr}) và Mainboard (${mainboard.attributes.ddr}) tương thích.`, 'success');
            } else {
                addMessage(`LỖI: RAM (${ram.attributes.ddr}) KHÔNG lắp được vào Mainboard yêu cầu ${mainboard.attributes.ddr}!`, 'error');
                errors++;
            }
        }
        
        // 3. Kiểm tra Nguồn
        if (psu) {
            let totalWattage = 0;
            if (cpu) totalWattage += cpu.attributes.wattage;
            if (vga) totalWattage += vga.attributes.wattage;
            
            // Thêm khoảng 100-150W cho các linh kiện khác và để an toàn
            totalWattage += 150; 
            
            if (psu.attributes.wattage >= totalWattage) {
                addMessage(`Nguồn ${psu.attributes.wattage}W đủ công suất (cần khoảng ${totalWattage}W).`, 'success');
            } else {
                addMessage(`CẢNH BÁO: Nguồn ${psu.attributes.wattage}W có thể không đủ công suất (cần ít nhất ${totalWattage}W).`, 'error');
                errors++;
            }
        }
        
        if (compatibilityMessagesEl.innerHTML === '') {
            addMessage('Hãy chọn thêm linh kiện để kiểm tra.', 'info');
        }

        // Kích hoạt/Vô hiệu hóa nút "Thêm vào giỏ"
        if (errors > 0 || !cpu || !mainboard || !ram || !vga || !psu) {
            addToCartButton.disabled = true;
        } else {
            addToCartButton.disabled = false;
        }
    }
    
    // Hàm phụ để thêm thông báo
    function addMessage(text, type) {
        const li = document.createElement('li');
        li.className = type; // success, error, info
        li.textContent = text;
        compatibilityMessagesEl.appendChild(li);
    }
    
    // ===============================================
    // PHẦN 4: GẮN SỰ KIỆN
    // ===============================================
    selectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            openModal(type);
        });
    });

    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal();
        }
    });
    
    // Khởi tạo giao diện ban đầu
    updateUI();
});