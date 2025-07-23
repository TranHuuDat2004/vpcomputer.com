// admin/js/orders.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DỮ LIỆU ĐƠN HÀNG MẪU ---
    // Trong thực tế, bạn sẽ lấy dữ liệu này từ server/database
    const allOrders = [
        { id: '#VPC-1025', customer: 'Nguyễn Văn A', phone: '0901234567', date: '21/07/2025', total: 15500000, status: 'pending' },
        { id: '#VPC-1024', customer: 'Trần Thị B', phone: '0907654321', date: '21/07/2025', total: 8290000, status: 'completed' },
        { id: '#VPC-1023', customer: 'Lê Văn C', phone: '0988888888', date: '20/07/2025', total: 49990000, status: 'shipped' },
        { id: '#VPC-1022', customer: 'Phạm Thị D', phone: '0912345678', date: '19/07/2025', total: 5490000, status: 'cancelled' },
    ];
    
    const tableBody = document.getElementById('order-table-body');
    const statusFilter = document.getElementById('status-filter');
    if (!tableBody || !statusFilter) return;

    // --- HÀM RENDER BẢNG ĐƠN HÀNG ---
    function renderOrders(ordersToRender) {
        tableBody.innerHTML = '';
        
        const statusMap = {
            pending: { text: 'Chờ xử lý', class: 'pending' },
            shipped: { text: 'Đang giao', class: 'shipped' },
            completed: { text: 'Đã giao', class: 'completed' },
            cancelled: { text: 'Đã hủy', class: 'cancelled' }
        };

        ordersToRender.forEach(order => {
            const statusInfo = statusMap[order.status] || { text: 'Không xác định', class: '' };
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Mã ĐH">${order.id}</td>
                <td data-label="Khách hàng">
                    <div class="customer-cell">
                        <span class="customer-name">${order.customer}</span>
                        <span class="customer-phone">${order.phone}</span>
                    </div>
                </td>
                <td data-label="Ngày đặt">${order.date}</td>
                <td data-label="Tổng tiền">${order.total.toLocaleString('vi-VN')}₫</td>
                <td data-label="Trạng thái">
                    <span class="status ${statusInfo.class}">${statusInfo.text}</span>
                </td>
                <td data-label="Hành động">
                    <div class="action-buttons">
                        <button class="action-btn view" title="Xem chi tiết"><i class="fas fa-eye"></i></button>
                        <button class="action-btn edit" title="Cập nhật trạng thái"><i class="fas fa-edit"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // --- HÀM LỌC ĐƠN HÀNG ---
    function applyFilters() {
        const selectedStatus = statusFilter.value;
        let filteredOrders = allOrders;

        if (selectedStatus !== 'all') {
            filteredOrders = allOrders.filter(order => order.status === selectedStatus);
        }

        renderOrders(filteredOrders);
    }
    
    // --- GẮN SỰ KIỆN VÀ KHỞI TẠO ---
    statusFilter.addEventListener('change', applyFilters);
    
    // Khởi tạo trang, hiển thị tất cả đơn hàng ban đầu
    renderOrders(allOrders);

});