// admin/js/reports.js
document.addEventListener('DOMContentLoaded', () => {

    // --- DỮ LIỆU BÁO CÁO MẪU (Trong thực tế sẽ lấy từ server) ---
    const reportData = {
        last7days: {
            totalRevenue: 125530000,
            totalProfit: 25106000,
            totalOrders: 85,
            totalProductsSold: 150,
            revenueProfitLabels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            revenueData: [12.5, 19.2, 15.3, 21.8, 18.1, 25.6, 13.0],
            profitData: [2.5, 3.8, 3.0, 4.3, 3.6, 5.1, 2.8],
            categoryLabels: ['CPU', 'VGA', 'Mainboard', 'RAM', 'PSU'],
            categoryData: [35, 25, 20, 15, 5],
            topProductsLabels: ['RTX 4070 Ti', 'i7-13700K', 'RTX 3060', 'Ryzen 5 7600X', 'PSU 850W'],
            topProductsData: [45, 38, 32, 25, 20]
        },
        last30days: {
            totalRevenue: 512400000,
            totalProfit: 102480000,
            totalOrders: 350,
            totalProductsSold: 680,
            // ... Dữ liệu chi tiết cho 30 ngày ...
        }
        // ... các khoảng thời gian khác
    };

    // --- CÁC BIẾN DOM ---
    const timeFilter = document.getElementById('time-range-filter');
    const chartNavItems = document.querySelectorAll('.charts-nav .nav-item');
    const chartPanes = document.querySelectorAll('.charts-content .chart-pane');

    let revenueProfitChart, categoryChart, topProductsChart;


    const totalRevenueEl = document.getElementById('total-revenue');
    const totalProfitEl = document.getElementById('total-profit');
    const totalOrdersEl = document.getElementById('total-orders');
    const totalProductsSoldEl = document.getElementById('total-products-sold');



    function updateDashboard(period) {
        const data = reportData[period] || reportData.last7days;

        // Cập nhật các thẻ thống kê
        totalRevenueEl.textContent = `${data.totalRevenue.toLocaleString('vi-VN')}₫`;
        totalProfitEl.textContent = `${data.totalProfit.toLocaleString('vi-VN')}₫`;
        totalOrdersEl.textContent = data.totalOrders;
        totalProductsSoldEl.textContent = data.totalProductsSold;

        // Hủy các biểu đồ cũ
        if (revenueProfitChart) revenueProfitChart.destroy();
        if (categoryChart) categoryChart.destroy();
        if (topProductsChart) topProductsChart.destroy();

        // Vẽ biểu đồ doanh thu & lợi nhuận
        revenueProfitChart = new Chart(document.getElementById('revenueProfitChart'), {
            type: 'line',
            data: {
                labels: data.revenueProfitLabels,
                datasets: [
                    { label: 'Doanh thu', data: data.revenueData, borderColor: '#007bff', tension: 0.3 },
                    { label: 'Lợi nhuận', data: data.profitData, borderColor: '#28a745', tension: 0.3 }
                ]
            }
        });

        // Vẽ biểu đồ danh mục
        categoryChart = new Chart(document.getElementById('categoryChart'), {
            type: 'doughnut',
            data: {
                labels: data.categoryLabels,
                datasets: [{
                    label: 'Sản phẩm đã bán',
                    data: data.categoryData,
                    backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8', '#6c757d']
                }]
            }
        });

        // Vẽ biểu đồ top sản phẩm
        topProductsChart = new Chart(document.getElementById('topProductsChart'), {
            type: 'bar',
            data: {
                labels: data.topProductsLabels,
                datasets: [{
                    label: 'Số lượng bán ra',
                    data: data.topProductsData,
                    backgroundColor: '#007bff'
                }]
            },
            options: { indexAxis: 'y' } // Biểu đồ cột ngang
        });
    }

    // Gắn sự kiện cho bộ lọc thời gian
    document.getElementById('time-range-filter').addEventListener('change', (e) => {
        updateDashboard(e.target.value);
    });

    // Khởi tạo dashboard với dữ liệu 7 ngày qua
    updateDashboard('last7days');

    // --- LOGIC CHUYỂN ĐỔI TAB ---
    chartNavItems.forEach(navItem => {
        navItem.addEventListener('click', () => {
            // Xóa active khỏi tất cả các nút và pane
            chartNavItems.forEach(item => item.classList.remove('active'));
            chartPanes.forEach(pane => pane.classList.remove('active'));
            
            // Thêm active cho nút và pane tương ứng
            navItem.classList.add('active');
            const targetPane = document.getElementById(`pane-${navItem.dataset.chart}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // --- GẮN SỰ KIỆN VÀ KHỞI TẠO ---
    timeFilter.addEventListener('change', (e) => {
        updateDashboard(e.target.value);
    });

    updateDashboard('last7days');

});