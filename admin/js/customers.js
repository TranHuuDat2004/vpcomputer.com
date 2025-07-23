// admin/js/customers.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- DỮ LIỆU KHÁCH HÀNG MẪU ---
    // Trong thực tế, bạn sẽ lấy dữ liệu này từ server/database
    const allCustomers = [
        { 
            id: 'cust1', 
            name: 'Nguyễn Văn A', 
            avatar: 'https://via.placeholder.com/40/28a745/ffffff?text=A', 
            email: 'nguyenvana@email.com', 
            phone: '0901234567', 
            totalSpent: 15500000, 
            joinDate: '21/07/2025' 
        },
        { 
            id: 'cust2', 
            name: 'Trần Thị B', 
            avatar: 'https://via.placeholder.com/40/ffc107/333333?text=B', 
            email: 'tranthib@email.com', 
            phone: '0907654321', 
            totalSpent: 8290000, 
            joinDate: '21/07/2025' 
        },
        { 
            id: 'cust3', 
            name: 'Lê Văn C', 
            avatar: 'https://via.placeholder.com/40/17a2b8/ffffff?text=C', 
            email: 'levanc@email.com', 
            phone: '0988888888', 
            totalSpent: 49990000, 
            joinDate: '20/07/2025' 
        },
    ];
    
    const tableBody = document.getElementById('customer-table-body');
    if (!tableBody) return;

    function renderCustomers(customersToRender) {
        tableBody.innerHTML = '';
        
        customersToRender.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-label="Khách hàng">
                    <div class="customer-cell">
                        <img src="${customer.avatar}" alt="${customer.name}">
                        <span>${customer.name}</span>
                    </div>
                </td>
                <td data-label="Email">${customer.email}</td>
                <td data-label="SĐT">${customer.phone}</td>
                <td data-label="Tổng chi tiêu" class="total-spent">${customer.totalSpent.toLocaleString('vi-VN')}₫</td>
                <td data-label="Ngày đăng ký">${customer.joinDate}</td>
                <td data-label="Hành động">
                    <div class="action-buttons">
                        <button class="action-btn edit" title="Sửa"><i class="fas fa-edit"></i></button>
                        <button class="action-btn delete" title="Xóa"><i class="fas fa-user-slash"></i></button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    // Khởi tạo trang, hiển thị tất cả khách hàng
    renderCustomers(allCustomers);

});