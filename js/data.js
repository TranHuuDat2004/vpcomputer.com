// js/data.js (Phiên bản đã cập nhật đầy đủ mô tả sản phẩm)

// --- HÀM TRỢ GIÚP TOÀN CỤC ---
function calculateSalePrice(product) {
    if (!product || !product.price || !product.discountPercent || product.discountPercent <= 0) {
        return product.price; // Trả về giá gốc nếu không có khuyến mãi
    }
    const salePrice = product.price * (1 - product.discountPercent / 100);
    // Làm tròn đến hàng nghìn gần nhất
    return Math.round(salePrice / 1000) * 1000;
}

const allProducts = [
    // CPUs
    { 
        id: 'cpu1', name: 'Intel Core i5-13400F', price: 5490000, discountPercent: 5, brand: 'Intel', category: 'cpu', 
        image: 'img/product/Intel Core i5-13400F.jpg',
        attributes: { socket: 'LGA 1700', wattage: 65 },
        // Mô tả sản phẩm với HTML
        description: `
            <h4>Hiệu năng vượt trội cho Gaming và Sáng tạo</h4>
            <p>Intel Core i5-13400F là sự lựa chọn vàng trong phân khúc tầm trung, mang lại hiệu suất ấn tượng cho cả chơi game và các tác vụ đa nhiệm. Với kiến trúc lai kết hợp giữa P-core và E-core, CPU này đảm bảo xử lý mượt mà từ game AAA đến render video nhẹ nhàng.</p>
            <ul>
                <li><strong>Socket:</strong> LGA 1700</li>
                <li><strong>Số nhân / luồng:</strong> 10 nhân (6 P-core + 4 E-core) / 16 luồng</li>
                <li><strong>Tốc độ Turbo tối đa:</strong> 4.6 GHz</li>
                <li><strong>Bộ nhớ đệm:</strong> 20 MB Intel Smart Cache</li>
            </ul>
        `
    },
    { 
        id: 'cpu2', name: 'Intel Core i7-13700K', price: 10590000, discountPercent: 5, brand: 'Intel', category: 'cpu', 
        image: 'img/product/Intel Core i7-13700K.jpg',
        attributes: { socket: 'LGA 1700', wattage: 125 },
        description: `
            <h4>Sức mạnh tối thượng cho Game thủ và Chuyên gia</h4>
            <p>Với 16 nhân và 24 luồng, Core i7-13700K không chỉ là một con quái vật gaming mà còn xử lý xuất sắc các tác vụ đồ họa, render video và livestream chuyên nghiệp. Khả năng ép xung mạnh mẽ (hậu tố 'K') cho phép bạn đẩy hiệu năng lên một tầm cao mới.</p>
            <ul>
                <li><strong>Socket:</strong> LGA 1700</li>
                <li><strong>Số nhân / luồng:</strong> 16 nhân (8 P-core + 8 E-core) / 24 luồng</li>
                <li><strong>Tốc độ Turbo tối đa:</strong> 5.4 GHz</li>
                <li><strong>Hỗ trợ ép xung:</strong> Có</li>
            </ul>
        `
    },
    { 
        id: 'cpu3', name: 'AMD Ryzen 5 7600X', price: 6200000, discountPercent: 5, brand: 'AMD', category: 'cpu', 
        image: 'img/product/AMD Ryzen 5 7600X.jpg',
        attributes: { socket: 'AM5', wattage: 105 },
        description: `
            <h4>Hiệu năng Gaming thuần túy trên nền tảng mới</h4>
            <p>AMD Ryzen 5 7600X xây dựng trên kiến trúc Zen 4 mạnh mẽ, mang lại xung nhịp cực cao và hiệu năng đơn nhân xuất sắc, là lựa chọn lý tưởng cho các game thủ muốn tối ưu hóa FPS. Hỗ trợ RAM DDR5 và PCIe 5.0, sẵn sàng cho tương lai.</p>
            <ul>
                <li><strong>Socket:</strong> AM5</li>
                <li><strong>Số nhân / luồng:</strong> 6 nhân / 12 luồng</li>
                <li><strong>Tốc độ Boost tối đa:</strong> 5.3 GHz</li>
                <li><strong>Hỗ trợ RAM:</strong> DDR5</li>
            </ul>
        `
    },
    { 
        id: 'cpu4', name: 'AMD Ryzen 9 7950X', price: 15500000, discountPercent: 5, brand: 'AMD', category: 'cpu', 
        image: 'img/product/AMD Ryzen 9 7950X.jpg',
        attributes: { socket: 'AM5', wattage: 120 },
        description: `
            <h4>Nhà vô địch về hiệu năng đa luồng</h4>
            <p>AMD Ryzen 9 7950X là sự lựa chọn hàng đầu cho các chuyên gia sáng tạo, lập trình viên và streamer. Với 16 nhân và 32 luồng, nó dễ dàng "cân" mọi tác vụ nặng nhất từ render 3D, biên dịch code đến streaming game chất lượng cao.</p>
            <ul>
                <li><strong>Socket:</strong> AM5</li>
                <li><strong>Số nhân / luồng:</strong> 16 nhân / 32 luồng</li>
                <li><strong>Tốc độ Boost tối đa:</strong> 5.7 GHz</li>
                <li><strong>Tổng bộ nhớ đệm:</strong> 80 MB</li>
            </ul>
        `
    },

    // Mainboards
    { 
        id: 'mb1', name: 'ASUS PRIME B760M-A WIFI D4', price: 4190000, discountPercent: 5, brand: 'ASUS', category: 'mainboard', 
        image: 'img/product/ASUS PRIME B760M-A WIFI D4.jpg',
        attributes: { socket: 'LGA 1700', ddr: 'DDR4' },
        description: `
            <h4>Nền tảng ổn định, kết nối toàn diện</h4>
            <p>Mainboard ASUS PRIME B760M-A WIFI D4 hỗ trợ CPU Intel thế hệ 12 & 13, RAM DDR4, và tích hợp sẵn Wi-Fi 6, là lựa chọn hoàn hảo cho các bộ máy tầm trung hiệu năng cao mà không cần đầu tư vào RAM DDR5 đắt đỏ.</p>
            <ul>
                <li><strong>Socket:</strong> LGA 1700</li>
                <li><strong>Chipset:</strong> B760</li>
                <li><strong>Hỗ trợ RAM:</strong> DDR4</li>
                <li><strong>Kết nối không dây:</strong> Wi-Fi 6 + Bluetooth 5.2</li>
            </ul>
        `
    },
    { 
        id: 'mb2', name: 'GIGABYTE Z790 AORUS ELITE AX', price: 7190000, discountPercent: 5, brand: 'Gigabyte', category: 'mainboard', 
        image: 'img/product/GIGABYTE Z790 AORUS ELITE AX.jpg',
        attributes: { socket: 'LGA 1700', ddr: 'DDR5' },
        description: `
            <h4>Sẵn sàng cho Ép xung và Hiệu năng đỉnh cao</h4>
            <p>GIGABYTE Z790 AORUS ELITE AX là bo mạch chủ cao cấp dành cho những ai muốn khai thác tối đa sức mạnh của CPU Intel dòng 'K'. Với dàn VRM mạnh mẽ, tản nhiệt toàn diện và hỗ trợ RAM DDR5 tốc độ cao, đây là nền tảng vững chắc cho mọi hệ thống PC gaming và workstation.</p>
            <ul>
                <li><strong>Socket:</strong> LGA 1700</li>
                <li><strong>Chipset:</strong> Z790 (Hỗ trợ ép xung)</li>
                <li><strong>Hỗ trợ RAM:</strong> DDR5</li>
                <li><strong>Khe M.2:</strong> 4 khe Gen4 tốc độ cao</li>
            </ul>
        `
    },
    { 
        id: 'mb3', name: 'ASUS TUF GAMING B650-PLUS', price: 5590000, discountPercent: 5, brand: 'ASUS', category: 'mainboard', 
        image: 'img/product/ASUS TUF GAMING B650-PLUS.jpg',
        attributes: { socket: 'AM5', ddr: 'DDR5' },
        description: `
            <h4>Bền bỉ chuẩn quân đội cho nền tảng AMD</h4>
            <p>Thuộc dòng TUF Gaming danh tiếng, bo mạch chủ này mang lại độ bền vượt trội và hiệu năng ổn định cho các CPU AMD Ryzen 7000 series. Trang bị đầy đủ các cổng kết nối hiện đại và khe cắm PCIe 5.0 cho card đồ họa thế hệ mới.</p>
            <ul>
                <li><strong>Socket:</strong> AM5</li>
                <li><strong>Chipset:</strong> B650</li>
                <li><strong>Hỗ trợ RAM:</strong> DDR5</li>
                <li><strong>Độ bền:</strong> Linh kiện chuẩn TUF</li>
            </ul>
        `
    },

    // RAM
    { 
        id: 'ram1', name: 'Corsair Vengeance 16GB Bus 3200', price: 1150000, discountPercent: 5, brand: 'Corsair', category: 'ram', 
        image: 'img/product/Corsair Vengeance 16GB Bus 3200.jpg',
        attributes: { ddr: 'DDR4' },
        description: `
            <h4>Đáng tin cậy và hiệu quả</h4>
            <p>Kit RAM DDR4 16GB (2x8GB) từ Corsair với tốc độ bus 3200MHz, đảm bảo sự ổn định và hiệu năng cần thiết cho các tác vụ hàng ngày và gaming. Thiết kế tản nhiệt nhôm giúp duy trì nhiệt độ hoạt động tối ưu.</p>
            <ul>
                <li><strong>Loại RAM:</strong> DDR4</li>
                <li><strong>Dung lượng:</strong> 16GB (2 x 8GB)</li>
                <li><strong>Tốc độ Bus:</strong> 3200MHz</li>
            </ul>
        `
    },
    { 
        id: 'ram2', name: 'G.Skill Trident Z5 32GB Bus 6000', price: 3250000, discountPercent: 5, brand: 'G.Skill', category: 'ram', 
        image: 'img/product/G.Skill Trident Z5 32GB Bus 6000.jpg',
        attributes: { ddr: 'DDR5' },
        description: `
            <h4>Hiệu năng đỉnh cao và thiết kế ấn tượng</h4>
            <p>G.Skill Trident Z5 là dòng RAM DDR5 cao cấp, được thiết kế để khai thác tối đa sức mạnh của các nền tảng mới nhất. Với tốc độ bus lên đến 6000MHz và thiết kế tản nhiệt hầm hố, đây là lựa chọn không thể bỏ qua cho các bộ máy high-end.</p>
            <ul>
                <li><strong>Loại RAM:</strong> DDR5</li>
                <li><strong>Dung lượng:</strong> 32GB (2 x 16GB)</li>
                <li><strong>Tốc độ Bus:</strong> 6000MHz</li>
            </ul>
        `
    },
    
    // VGAs
    { 
        id: 'vga1', name: 'GIGABYTE RTX 3060 12GB', price: 8290000, discountPercent: 5, brand: 'Gigabyte', category: 'vga', 
        image: 'img/product/GIGABYTE RTX 3060 12GB.jpg',
        attributes: { wattage: 170 },
        description: `
            <h4>Nhà vô địch Gaming Full HD</h4>
            <p>GIGABYTE RTX 3060 với 12GB VRAM là chiếc card đồ họa hoàn hảo cho trải nghiệm gaming mượt mà ở độ phân giải 1080p. Công nghệ DLSS và Ray Tracing mang lại chất lượng hình ảnh vượt trội trong các tựa game hỗ trợ.</p>
            <ul>
                <li><strong>GPU:</strong> NVIDIA GeForce RTX 3060</li>
                <li><strong>VRAM:</strong> 12GB GDDR6</li>
                <li><strong>Tản nhiệt:</strong> WINDFORCE 2X</li>
            </ul>
        `
    },
    { 
        id: 'vga2', name: 'ASUS TUF RTX 4070 Ti 12GB', price: 22490000, discountPercent: 5, brand: 'ASUS', category: 'vga', 
        image: 'img/product/ASUS TUF RTX 4070 Ti 12GB.jpg',
        attributes: { wattage: 285 },
        description: `
            <h4>Trải nghiệm Gaming 2K Max Setting</h4>
            <p>ASUS TUF RTX 4070 Ti mang lại hiệu năng đột phá của kiến trúc Ada Lovelace. Sức mạnh của nó đủ sức "chiến" mọi tựa game ở độ phân giải 2K với thiết lập đồ họa cao nhất, đồng thời công nghệ DLSS 3 giúp đẩy FPS lên mức không tưởng.</p>
            <ul>
                <li><strong>GPU:</strong> NVIDIA GeForce RTX 4070 Ti</li>
                <li><strong>VRAM:</strong> 12GB GDDR6X</li>
                <li><strong>Độ bền:</strong> Chuẩn quân đội TUF</li>
            </ul>
        `
    },
    { 
        id: 'vga3', name: 'MSI RTX 4090 SUPRIM X 24G', price: 49990000, discountPercent: 5, brand: 'MSI', category: 'vga', 
        image: 'img/product/MSI RTX 4090 SUPRIM X 24G.jpg',
        attributes: { wattage: 450 },
        description: `
            <h4>Đỉnh cao đồ họa 4K</h4>
            <p>MSI RTX 4090 SUPRIM X là chiếc card đồ họa mạnh mẽ nhất thế giới, mang lại trải nghiệm gaming 4K Ray Tracing đỉnh cao và hiệu năng render vượt trội cho các nhà sáng tạo nội dung chuyên nghiệp. Thiết kế SUPRIM sang trọng và tản nhiệt TRI FROZR 3S hiệu quả.</p>
            <ul>
                <li><strong>GPU:</strong> NVIDIA GeForce RTX 4090</li>
                <li><strong>VRAM:</strong> 24GB GDDR6X</li>
                <li><strong>Thiết kế:</strong> SUPRIM X cao cấp</li>
            </ul>
        `
    },

    // PSU
    {
        id: 'psu1', name: 'Cooler Master MWE 650W Bronze V2', price: 1590000, discountPercent: 5, brand: 'Cooler Master', category: 'psu',
        image: 'img/product/Cooler Master MWE 650W Bronze V2.jpg',
        attributes: { wattage: 650 },
        description: `
            <h4>Nguồn ổn định cho hệ thống tầm trung</h4>
            <p>Cooler Master MWE 650W Bronze V2 cung cấp nguồn điện ổn định và hiệu quả, đạt chuẩn 80 Plus Bronze. Đây là lựa chọn đáng tin cậy cho các cấu hình PC gaming và làm việc phổ thông, đảm bảo an toàn cho toàn bộ linh kiện.</p>
            <ul>
                <li><strong>Công suất:</strong> 650W</li>
                <li><strong>Chuẩn hiệu suất:</strong> 80 Plus Bronze</li>
                <li><strong>Thiết kế quạt:</strong> HDB 120mm yên tĩnh</li>
            </ul>
        `
    },
    {
        id: 'psu2', name: 'Corsair RM850e 850W 80 Plus Gold', price: 2950000, discountPercent: 5, brand: 'Corsair', category: 'psu',
        image: 'img/product/Corsair RM850e 850W 80 Plus Gold.jpg',
        attributes: { wattage: 850 },
        description: `
            <h4>Năng lượng vàng cho hệ thống cao cấp</h4>
            <p>Corsair RM850e với chuẩn 80 Plus Gold mang lại hiệu suất chuyển đổi điện năng cực cao, giảm thiểu nhiệt lượng và tiếng ồn. Thiết kế full-modular giúp đi dây gọn gàng. Công suất 850W đủ sức "gánh" các cấu hình cao cấp với CPU và VGA hàng đầu.</p>
            <ul>
                <li><strong>Công suất:</strong> 850W</li>
                <li><strong>Chuẩn hiệu suất:</strong> 80 Plus Gold</li>
                <li><strong>Thiết kế dây:</strong> Full-Modular (Tháo rời toàn bộ)</li>
            </ul>
        `
    },
];