// js/footer.js

// Đổi tên class cho rõ ràng
class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Di chuyển brandName và HTML vào bên trong để tránh xung đột
        const brandName = "VP Computer";
        const footerHTML = `
            <footer>
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-col">
                            <!-- ĐÃ THAY ĐỔI: Thay thế logo văn bản bằng logo hình ảnh -->
                    <a href="index.html" class="logo">
                        <img src="img/logo.png" alt="VP Computer Logo">
                    </a>
                            <p>Chuyên cung cấp linh kiện PC, Gaming Gear chính hãng với giá tốt nhất thị trường. Hỗ trợ xây dựng cấu hình máy tính theo yêu cầu.</p>
                        </div>
                        <div class="footer-col">
                            <h4>Về chúng tôi</h4>
                            <ul>
                                <li><a href="about.html">Giới thiệu</a></li>
                                <li><a href="careers.html">Tuyển dụng</a></li>
                                <li><a href="terms.html">Điều khoản dịch vụ</a></li> <!-- THÊM MỚI -->
                                <li><a href="privacy.html">Chính sách bảo mật</a></li> <!-- THÊM MỚI -->
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Hỗ trợ khách hàng</h4>
                            <ul>
        <li><a href="how-to-buy.html">Hướng dẫn mua hàng</a></li>
        <li><a href="warranty.html">Chính sách bảo hành</a></li>
        <li><a href="returns.html">Chính sách đổi trả</a></li> <!-- THÊM MỚI -->
        <li><a href="faq.html">Câu hỏi thường gặp</a></li> <!-- THÊM MỚI -->
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h4>Liên hệ</h4>
                            <p><i class="fas fa-map-marker-alt"></i> 123 Đường ABC, Quận 1, TP.HCM</p>
                            <p><i class="fas fa-phone"></i> 1900 1234</p>
                            <p><i class="fas fa-envelope"></i> support@vpcomputer.vn</p>
                            <div class="social-icons">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-youtube"></i></a>
                                <a href="#"><i class="fab fa-tiktok"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>© 2024 ${brandName}. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;

        // Gắn HTML vào custom element
        this.innerHTML = footerHTML;
    }
}

// Đăng ký thẻ mới theo gợi ý của bạn
customElements.define('footer-placeholder', FooterComponent);