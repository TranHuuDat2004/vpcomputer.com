// admin/js/customer-manager.js

const CUSTOMER_DATA_KEY = 'vpcomputer_customers';

// Dữ liệu khách hàng ban đầu
const initialCustomers = [
    { 
        id: 'cust1', 
        name: 'Nguyễn Văn A', 
        avatar: 'https://via.placeholder.com/40/28a745/ffffff?text=A', 
        email: 'nguyenvana@email.com', 
        phone: '0901234567', 
        totalSpent: 15500000, 
        joinDate: '21/07/2025',
        address: '123 Đường ABC, Q1, TP.HCM'
    },
    { 
        id: 'cust2', 
        name: 'Trần Thị B', 
        avatar: 'https://via.placeholder.com/40/ffc107/333333?text=B', 
        email: 'tranthib@email.com', 
        phone: '0907654321', 
        totalSpent: 8290000, 
        joinDate: '21/07/2025',
        address: '456 Đường XYZ, Q3, TP.HCM'
    },
    { 
        id: 'cust3', 
        name: 'Lê Văn C', 
        avatar: 'https://via.placeholder.com/40/17a2b8/ffffff?text=C', 
        email: 'levanc@email.com', 
        phone: '0988888888', 
        totalSpent: 49990000, 
        joinDate: '20/07/2025',
        address: '789 Đường DEF, Q7, TP.HCM'
    },
];

function getCustomers() {
    let customers = JSON.parse(localStorage.getItem(CUSTOMER_DATA_KEY));
    if (!customers || customers.length === 0) {
        customers = initialCustomers;
        saveCustomers(customers);
    }
    return customers;
}

function saveCustomers(customers) {
    localStorage.setItem(CUSTOMER_DATA_KEY, JSON.stringify(customers));
}

function getCustomerById(customerId) {
    const customers = getCustomers();
    return customers.find(c => c.id === customerId);
}

function updateCustomer(updatedCustomer) {
    let customers = getCustomers();
    const customerIndex = customers.findIndex(c => c.id === updatedCustomer.id);
    if (customerIndex > -1) {
        customers[customerIndex] = updatedCustomer;
        saveCustomers(customers);
        return true;
    }
    return false;
}