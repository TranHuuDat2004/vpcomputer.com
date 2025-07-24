// admin/js/edit-customer.js
document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.getElementById('customer-edit-container');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('id');

    if (!customerId) { /* ... xử lý lỗi ... */ return; }
    const customer = getCustomerById(customerId);
    if (!customer) { /* ... xử lý lỗi ... */ return; }

    function renderEditForm() {
        container.innerHTML = `
            <div class="page-header">
                <h1>Chỉnh Sửa Thông Tin Khách Hàng</h1>
                <a href="customers.html" class="btn btn-secondary">Quay Lại</a>
            </div>
            <div class="edit-form-container">
                <form id="edit-customer-form">
                    <div class="edit-form-grid">
                        <div class="form-group">
                            <label for="name">Họ và tên</label>
                            <input type="text" id="name" value="${customer.name}" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" value="${customer.email}" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Số điện thoại</label>
                            <input type="tel" id="phone" value="${customer.phone}" required>
                        </div>
                        <div class="form-group full-width">
                            <label for="address">Địa chỉ</label>
                            <textarea id="address" rows="3">${customer.address || ''}</textarea>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-save">Lưu Thay Đổi</button>
                    </div>
                </form>
            </div>
        `;
    }

    renderEditForm();

    const editForm = document.getElementById('edit-customer-form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedCustomer = {
                ...customer,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
            };

            if (updateCustomer(updatedCustomer)) {
                alert('Cập nhật thông tin khách hàng thành công!');
                window.location.href = 'customers.html';
            } else {
                alert('Có lỗi xảy ra!');
            }
        });
    }
});