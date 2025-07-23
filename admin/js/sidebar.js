// admin/js/sidebar.js

class SidebarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const sidebarHTML = `
            <aside class="sidebar">
                <div class="sidebar-header">
                   <a href="index.html" class="logo">
                        <img src="img/logo.png" alt="VP Computer Admin Logo">
                    </a>
                </div>
                <nav class="sidebar-nav">
                    <ul>
                        <li><a href="index.html" data-page="index.html"><i class="fas fa-tachometer-alt"></i><span>Tổng quan</span></a></li>
                        <li><a href="products.html" data-page="products.html"><i class="fas fa-box"></i><span>Sản phẩm</span></a></li>
                        <li><a href="orders.html" data-page="orders.html"><i class="fas fa-shopping-cart"></i><span>Đơn hàng</span></a></li>
                        <li><a href="customers.html" data-page="customers.html"><i class="fas fa-users"></i><span>Khách hàng</span></a></li>
                        <li><a href="reports.html" data-page="reports.html"><i class="fas fa-chart-line"></i><span>Báo cáo</span></a></li>
                        <li><a href="settings.html" data-page="settings.html"><i class="fas fa-cog"></i><span>Cài đặt</span></a></li>
                    </ul>
                </nav>
                <div class="sidebar-footer">
                    <!-- Link đến trang đăng nhập của khách hàng -->
                    <a href="../login.html"><i class="fas fa-sign-out-alt"></i><span style="padding-left=20px">Đăng xuất</span></a>
                </div>
            </aside>
        `;
        
        this.innerHTML = sidebarHTML;

        // --- Logic tự động thêm class 'active' ---
        // Lấy tên file của trang hiện tại (ví dụ: "index.html")
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        const navLinks = this.querySelectorAll('.sidebar-nav a');

        navLinks.forEach(link => {
            // So sánh với thuộc tính data-page đã thêm
            if (link.dataset.page === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Đăng ký custom element với tên 'admin-sidebar'
customElements.define('admin-sidebar', SidebarComponent);