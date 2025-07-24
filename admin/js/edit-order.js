// admin/js/edit-order.js
document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.getElementById('order-detail-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    if (!orderId) { /* ... xử lý lỗi ... */ return; }
    const order = getOrderById(orderId);
    if (!order) { /* ... xử lý lỗi ... */ return; }

    function renderOrderDetail() {
        const itemsHTML = order.items.map(item => `
            <tr>
                <td>
                    <div class="product-cell">
                        <span>${item.quantity} x</span>
                        <span>${item.name}</span>
                    </div>
                </td>
                <td style="text-align: right;">${item.price.toLocaleString('vi-VN')}₫</td>
            </tr>
        `).join('');

        container.innerHTML = `
            <div class="page-header">
                <h1>Chi tiết Đơn hàng ${order.id}</h1>
                <a href="orders.html" class="btn btn-secondary">Quay Lại</a>
            </div>
            <div class="order-detail-layout">
                <div class="card-main">
                    <h3 class="card-header">Sản phẩm</h3>
                    <table class="order-items-table"><tbody>${itemsHTML}</tbody></table>
                </div>
                <div class="card-sub">
                    <h3 class="card-header">Thông tin Khách hàng</h3>
                    <dl class="customer-info-grid">
                        <dt>Tên:</dt><dd>${order.customer.name}</dd>
                        <dt>Email:</dt><dd>${order.customer.email}</dd>
                        <dt>SĐT:</dt><dd>${order.customer.phone}</dd>
                        <dt>Địa chỉ:</dt><dd>${order.customer.address}</dd>
                    </dl>
                    <hr style="margin: 20px 0;">
                    <form id="status-update-form">
                        <label for="order-status">Cập nhật trạng thái</label>
                        <select id="order-status">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chờ xử lý</option>
                            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Đang giao</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Đã giao</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                        </select>
                        <button type="submit" class="btn-save">Lưu thay đổi</button>
                    </form>
                </div>
            </div>
        `;
    }

    renderOrderDetail();

    // Gắn sự kiện sau khi đã render
    const statusForm = document.getElementById('status-update-form');
    if (statusForm) {
        statusForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newStatus = document.getElementById('order-status').value;
            if (updateOrderStatus(orderId, newStatus)) {
                alert('Cập nhật trạng thái thành công!');
                window.location.href = 'orders.html';
            } else {
                alert('Có lỗi xảy ra!');
            }
        });
    }
});