// admin/js/header.js

class AdminHeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Lấy thông tin admin giả định
        const adminName = "Admin";
        const adminAvatar = "img/avatar.jpg"; // Thay bằng đường dẫn ảnh thật

        const headerHTML = `
            <header class="main-header">
                <div class="header-left">
                    <button class="menu-toggle" id="menu-toggle">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Tìm kiếm đơn hàng, sản phẩm...">
                    </div>
                </div>
                <div class="header-right">
                    <div class="user-profile">
                        <i class="fas fa-bell"></i>
                        <img src="${adminAvatar}" alt="Admin Avatar">
                    </div>
                </div>
            </header>
        `;
        
        this.innerHTML = headerHTML;

        // --- Logic Mở/Đóng Sidebar ---
        // Chúng ta đặt logic này ở đây để nó luôn hoạt động trên mọi trang
        const menuToggle = this.querySelector('#menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('overlay'); // Giả sử overlay có trong HTML

        const openSidebar = () => {
            if (sidebar) sidebar.classList.add('active');
            if (overlay) overlay.classList.add('active');
        };

        const closeSidebar = () => {
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        };

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                // Toggle thay vì chỉ mở
                if (sidebar && sidebar.classList.contains('active')) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            });
        }
        
        // Đảm bảo overlay cũng có thể đóng sidebar
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }
    }
}

// Đăng ký custom element với tên 'admin-header'
customElements.define('admin-header', AdminHeaderComponent);