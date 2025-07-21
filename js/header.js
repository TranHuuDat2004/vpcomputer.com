// js/header.js (Phiên bản nâng cấp với Side Menu và Overlay)

class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const brandName = "VP Computer";
        const headerHTML = `
            <!-- Lớp phủ (overlay) - ban đầu bị ẩn -->
            <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>

            <header>
                <div class="container">
                    <a href="index.html" class="logo">${brandName.split(' ')[0]} <span>${brandName.split(' ').slice(1).join(' ')}</span></a>
                    
<nav class="main-nav desktop-nav">
                        <ul>
                            <li><a href="index.html">Trang Chủ</a></li>
                            <li><a href="product.html">Sản Phẩm</a></li>
                            <li><a href="builder.html">Xây Dựng Cấu Hình</a></li>
                            <li><a href="promotion.html">Khuyến Mãi</a></li> <!-- << ĐÃ SỬA -->
                            <li><a href="contact.html">Liên Hệ</a></li>       <!-- << ĐÃ SỬA -->
                        </ul>
                    </nav>

                    <div class="header-actions">
                        <!-- SỬA LỖI: Form tìm kiếm bây giờ sẽ chuyển hướng đến search.html -->
                        <form action="search.html" method="GET" class="search-bar" id="search-form">
                            <input type="text" name="q" placeholder="Tìm kiếm sản phẩm..." required>
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                        
                        <a href="#" class="action-icon cart-icon">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="cart-count">0</span>
                        </a>

                        <!-- THAY ĐỔI: Thay icon user bằng nút Login/Register -->
                        <div class="user-auth">
                           <a href="login.html" class="auth-link"><i class="fas fa-user"></i> Đăng nhập / Đăng ký</a>
                        </div>



                        <button class="hamburger-btn" id="hamburger-btn">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                </div>

                <!-- Menu cho Mobile (Side Menu) - ban đầu bị ẩn bên trái -->
               <nav class="mobile-side-menu" id="mobile-nav">
                    <div class="mobile-nav-header">
                        <span class="menu-title">${brandName}</span>
                        <button class="close-btn" id="close-btn">×</button>
                    </div>
                    <ul>
                        <li><a href="index.html"><i class="fas fa-home"></i> Trang Chủ</a></li>
                        <li><a href="product.html"><i class="fas fa-box"></i> Sản Phẩm</a></li>
                        <li><a href="builder.html"><i class="fas fa-cogs"></i> Xây Dựng Cấu Hình</a></li>
                        <li><a href="promotion.html"><i class="fas fa-tags"></i> Khuyến Mãi</a></li> <!-- << ĐÃ SỬA -->
                        <li><a href="contact.html"><i class="fas fa-envelope"></i> Liên Hệ</a></li> <!-- << ĐÃ SỬA -->
                    </ul>
                    <div class="mobile-nav-footer">
                         <a href="#"><i class="fas fa-headset"></i> Lắp đặt phòng net</a>
                         <a href="#"><i class="fas fa-newspaper"></i> Blog / Tin tức</a>
                         <a href="#"><i class="fas fa-phone-alt"></i> Hotline: 1900 1234</a>
                    </div>
                </nav>
            </header>
        `;

        // Tạo một fragment để chứa HTML, tránh render nhiều lần
        const fragment = document.createRange().createContextualFragment(headerHTML);
        this.append(fragment);

        // --- Logic xử lý Side Menu ---
        const hamburgerBtn = this.querySelector('#hamburger-btn');
        const mobileNav = this.querySelector('#mobile-nav');
        const closeBtn = this.querySelector('#close-btn');
        const overlay = this.querySelector('#mobile-menu-overlay');
        const body = document.body;

        const openMenu = () => {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden'; // Ngăn cuộn trang nền
        };

        const closeMenu = () => {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = ''; // Cho phép cuộn trang lại
        };

        hamburgerBtn.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        // --- Logic active link không đổi ---
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = this.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('header-placeholder', HeaderComponent);