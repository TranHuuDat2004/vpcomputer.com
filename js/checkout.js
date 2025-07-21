// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // PHẦN 1: KHAI BÁO CÁC BIẾN DOM
    // ===============================================
    const summaryItemsContainer = document.getElementById('summary-items');
    const summaryTotalPriceEl = document.getElementById('summary-total-price');
    const checkoutForm = document.getElementById('checkout-form');

    // Kiểm tra xem các element cần thiết có tồn tại không
    if (!summaryItemsContainer || !summaryTotalPriceEl || !checkoutForm) {
        console.error("Thiếu các thành phần HTML cần thiết cho trang checkout.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem('vpcomputer_cart')) || [];
    let subtotal = 0;


    // ===============================================
    // PHẦN 2: CÁC HÀM CHỨC NĂNG
    // ===============================================

    // --- Hàm render tóm tắt đơn hàng ---
    function renderOrderSummary() {
        if (cart.length > 0) {
            cart.forEach(item => {
                const itemSubtotal = item.price * item.quantity;
                const itemHTML = `
                    <div class="summary-item">
                        <div class="item-thumbnail">
                            <img src="${item.image}" alt="${item.name}">
                            <span class="item-quantity">${item.quantity}</span>
                        </div>
                        <div class="item-details">
                            <span class="item-name">${item.name}</span>
                            <span class="item-unit-price">${item.quantity} x ${item.price.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div class="item-subtotal">${itemSubtotal.toLocaleString('vi-VN')}₫</div>
                    </div>
                `;
                summaryItemsContainer.innerHTML += itemHTML;
                subtotal += itemSubtotal;
            });
        } else {
            summaryItemsContainer.innerHTML = '<p class="empty-summary">Giỏ hàng của bạn đang trống.</p>';
            // Vô hiệu hóa nút đặt hàng nếu giỏ trống
            document.querySelector('.btn-place-order').disabled = true;
        }

        summaryTotalPriceEl.textContent = `${subtotal.toLocaleString('vi-VN')}₫`;
    }

    // --- Hàm tạo và tải hóa đơn PDF (PHIÊN BẢN SỬA LỖI LAYOUT) ---
    function generateInvoice(customerData, cartData, total) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: 'pt' }); // Sử dụng đơn vị 'point' để dễ kiểm soát hơn
        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
        }

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 40;
        let yPosition = 60;

        // --- PHẦN HEADER CỦA HÓA ĐƠN ---
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        // Thêm khoảng cách ký tự để tạo hiệu ứng giãn cách đều
        doc.text(removeAccents("HOA DON BAN HANG"), pageWidth / 2, yPosition, { align: 'center', charSpace: 2 });
        yPosition += 20;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text("VP Computer", pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 20;

        // Mã đơn hàng và Ngày tạo
        // Đoạn code mới đã thêm giờ tạo
        // Mã đơn hàng và Ngày giờ tạo
        const orderId = `VPC-${Math.floor(Date.now() / 1000)}`;
        const now = new Date(); // Lấy đối tượng Date hiện tại

        // --- Định dạng Ngày (DD/MM/YYYY) ---
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const orderDate = `${day}/${month}/${year}`;

        // --- Định dạng Giờ (HH:MM) ---
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const orderTime = `${hours}:${minutes}`;

        // --- Ghép lại thành chuỗi hoàn chỉnh ---
        const fullDateTime = `${orderTime} ${orderDate}`;

        doc.setFontSize(10);
        doc.text(removeAccents(`Ma don hang: ${orderId}`), margin, yPosition);
        // In ra chuỗi ngày giờ mới
        doc.text(removeAccents(`Ngay gio tao: ${fullDateTime}`), pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 15;
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 25;

        // --- PHẦN THÔNG TIN KHÁCH HÀNG (ĐÃ SỬA CĂN CHỈNH) ---
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(removeAccents("Thong tin khach hang:"), margin, yPosition);
        yPosition += 20;

        doc.setFont('helvetica', 'normal');
        doc.text(removeAccents(`Ten: ${customerData.fullname}`), margin + 10, yPosition);
        yPosition += 18;
        doc.text(`Email: ${customerData.email}`, margin + 10, yPosition);
        yPosition += 18;
        doc.text(removeAccents(`So dien thoai: ${customerData.phone}`), margin + 10, yPosition);
        yPosition += 18;
        // Tự động xuống dòng cho địa chỉ dài
        const addressLines = doc.splitTextToSize(removeAccents(`Dia chi: ${customerData.address}`), pageWidth - (margin * 3));
        doc.text(addressLines, margin + 10, yPosition);
        yPosition += (addressLines.length * 15) + 10;
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 25;

        // --- PHẦN CHI TIẾT ĐƠN HÀNG ---
        // Header của bảng
        doc.setFont('helvetica', 'bold');
        doc.text("STT", margin, yPosition);
        doc.text(removeAccents("Ten san pham"), margin + 40, yPosition);
        doc.text(removeAccents("Thanh tien"), pageWidth - margin, yPosition, { align: 'right' });
        yPosition += 15;
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 20;

        // Nội dung bảng
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        cartData.forEach((item, index) => {
            const itemText = removeAccents(`${item.quantity} x ${item.name}`);
            // Giảm chiều rộng của cột tên sản phẩm để không bị chồng chéo
            const itemLines = doc.splitTextToSize(itemText, 300);

            doc.text(`${index + 1}.`, margin, yPosition);
            doc.text(itemLines, margin + 40, yPosition);

            const itemSubtotal = (item.quantity * item.price).toLocaleString('vi-VN') + 'd';
            doc.text(itemSubtotal, pageWidth - margin, yPosition, { align: 'right' });

            yPosition += (itemLines.length * 12) + 10;
        });

        // --- PHẦN TỔNG CỘNG ---
        yPosition += 15;
        doc.line(pageWidth / 2, yPosition, pageWidth - margin, yPosition);
        yPosition += 20;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');

        const rightAlignX = pageWidth - margin;
        const totalText = `${total.toLocaleString('vi-VN')}d`;

        // In chữ "Tong Cong:" trước, căn phải vào một vị trí an toàn
        doc.text(removeAccents("Tong Cong:"), rightAlignX - 100, yPosition, { align: 'right' });

        // In giá trị tổng tiền sau, căn phải vào lề
        doc.text(totalText, rightAlignX, yPosition, { align: 'right' });

        // --- LỜI CẢM ƠN ---
        yPosition += 40; // << THAY ĐỔI DÒNG NÀY: Tạo một khoảng cách 40pt so với dòng Tổng Cộng
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(removeAccents("Cam on quy khach da mua hang tai VP Computer!"), pageWidth / 2, yPosition, { align: 'center' });

        // --- LƯU FILE PDF ---
        const today = new Date();
        const formattedDate = `${day}-${month}-${year}`;
        const fileName = `HoaDon_VPComputer-${formattedDate}.pdf`;
        doc.save(fileName);
    }


    // ===============================================
    // PHẦN 3: GẮN SỰ KIỆN VÀ KHỞI TẠO
    // ===============================================

    // --- Gắn sự kiện SUBMIT cho FORM ---
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn form gửi đi theo cách truyền thống

        // 1. Thu thập dữ liệu khách hàng từ form
        const customerData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
        };

        // 2. Gọi hàm tạo hóa đơn
        generateInvoice(customerData, cart, subtotal);

        // 3. Xóa giỏ hàng sau khi đã xuất hóa đơn
        localStorage.removeItem('vpcomputer_cart');
        // Cũng cập nhật lại icon giỏ hàng trên header (nếu có cart.js)
        if (typeof updateCartAndSave === 'function') {
            updateCartAndSave([]);
        }

        // 4. Thông báo và chuyển hướng về trang chủ
        alert("Đặt hàng thành công! Hóa đơn của bạn đang được tải xuống.");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });

    // --- Khởi tạo trang ---
    renderOrderSummary();
});