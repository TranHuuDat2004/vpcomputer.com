// js/promo-generator.js (Phiên bản "Tờ rơi quảng cáo")

document.addEventListener('DOMContentLoaded', () => {
    
    const promoContainer = document.getElementById('promo-page-container');
    if (!promoContainer) return;

    // 1. Định nghĩa các danh mục bạn muốn hiển thị
    const promoCategories = [
        {
            category: 'cpu',
            title: 'CPU - BỘ VI XỬ LÝ',
            subtitle: 'Ưu đãi đặc biệt cho các dòng CPU Intel & AMD'
        },
        {
            category: 'vga',
            title: 'VGA - CARD ĐỒ HỌA',
            subtitle: 'Chơi game đỉnh cao với card đồ họa giá sốc'
        },
        {
            category: 'mainboard',
            title: 'MAINBOARD - BO MẠCH CHỦ',
            subtitle: 'Nền tảng vững chắc cho mọi cấu hình'
        },
        {
            category: 'ram',
            title: 'RAM - BỘ NHỚ TRONG',
            subtitle: 'Nâng cấp tốc độ, đa nhiệm mượt mà'
        },
        {
            category: 'psu',
            title: 'PSU - NGUỒN MÁY TÍNH',
            subtitle: 'Nguồn ổn định, bảo vệ toàn diện linh kiện'
        }
    ];
    
    // 2. Hàm tạo HTML cho một sản phẩm trong lưới
    function createProductCard(product) {
        if (!product.discountPercent || product.discountPercent <= 0) return '';
        
        const salePrice = calculateSalePrice(product);

        return `
            <div class="product-card">
                <a href="product-detail.html?id=${product.id}" class="product-card-link">
                    <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price">
                            <span class="old-price">${product.price.toLocaleString('vi-VN')}₫</span>
                            <span class="new-price">${salePrice.toLocaleString('vi-VN')}₫</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    // 3. Lặp qua từng danh mục để tạo khối "tờ rơi"
    promoCategories.forEach(promo => {
        // Lọc các sản phẩm có khuyến mãi thuộc danh mục này
        const productsForGrid = allProducts.filter(p => p.category === promo.category && p.discountPercent > 0);
        
        if (productsForGrid.length > 0) {
            const productCardsHTML = productsForGrid.map(createProductCard).join('');

            const categoryBlockHTML = `
                <div class="container">
                    <section class="promo-category-block">
                        <div class="category-header">
                            <h2>${promo.title}</h2>
                            <p>${promo.subtitle}</p>
                        </div>
                        <div class="promo-product-grid">
                            ${productCardsHTML}
                        </div>
                    </section>
                </div>
            `;
            promoContainer.innerHTML += categoryBlockHTML;
        }
    });

});