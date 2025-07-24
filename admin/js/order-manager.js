// admin/js/order-manager.js

const ORDER_DATA_KEY = 'vpcomputer_orders';

const initialOrders = [
    {
        id: '#VPC-1025',
        customer: { name: 'Nguyễn Văn A', phone: '0901234567', email: 'nguyenvana@email.com', address: '123 Đường ABC, Q1, TP.HCM' },
        date: '21/07/2025',
        total: 15500000,
        status: 'pending',
        items: [{ id: 'cpu4', name: 'AMD Ryzen 9 7950X', quantity: 1, price: 15500000 }]
    },
    {
        id: '#VPC-1024',
        customer: { name: 'Trần Thị B', phone: '0907654321', email: 'tranthib@email.com', address: '456 Đường XYZ, Q3, TP.HCM' },
        date: '21/07/2025',
        total: 8290000,
        status: 'completed',
        items: [{ id: 'vga1', name: 'GIGABYTE RTX 3060 12GB', quantity: 1, price: 8290000 }]
    },
    {
        id: '#VPC-1023',
        customer: { name: 'Lê Văn C', phone: '0988888888', email: 'levanc@email.com', address: '789 Đường DEF, Q7, TP.HCM' },
        date: '20/07/2025',
        total: 49990000,
        status: 'shipped',
        items: [{ id: 'vga3', name: 'MSI RTX 4090 SUPRIM X 24G', quantity: 1, price: 49990000 }]
    },
];

function getOrders() {
    let orders = JSON.parse(localStorage.getItem(ORDER_DATA_KEY));
    if (!orders || orders.length === 0) {
        orders = initialOrders;
        saveOrders(orders);
    }
    return orders;
}

function saveOrders(orders) {
    localStorage.setItem(ORDER_DATA_KEY, JSON.stringify(orders));
}

function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(o => o.id === `#${orderId.replace('#', '')}`);
}

function updateOrderStatus(orderId, newStatus) {
    let orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === `#${orderId.replace('#', '')}`);
    if (orderIndex > -1) {
        orders[orderIndex].status = newStatus;
        saveOrders(orders);
        return true;
    }
    return false;
}