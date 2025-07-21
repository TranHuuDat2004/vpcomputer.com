// js/data.js
// NGUỒN DỮ LIỆU DUY NHẤT (Đã sửa lỗi, trỏ trực tiếp đến tên file ảnh)

const allProducts = [
    // CPUs
    { 
        id: 'cpu1', name: 'Intel Core i5-13400F', price: 5490000, brand: 'Intel', category: 'cpu', 
        image: 'img/product/Intel Core i5-13400F.jpg', // << Đã sửa
        attributes: { socket: 'LGA 1700', wattage: 65 } 
    },
    { 
        id: 'cpu2', name: 'Intel Core i7-13700K', price: 10590000, brand: 'Intel', category: 'cpu', 
        image: 'img/product/Intel Core i7-13700K.jpg', // << Đã sửa
        attributes: { socket: 'LGA 1700', wattage: 125 } 
    },
    { 
        id: 'cpu3', name: 'AMD Ryzen 5 7600X', price: 6200000, brand: 'AMD', category: 'cpu', 
        image: 'img/product/AMD Ryzen 5 7600X.jpg', // << Đã sửa
        attributes: { socket: 'AM5', wattage: 105 } 
    },
    { 
        id: 'cpu4', name: 'AMD Ryzen 9 7950X', price: 15500000, brand: 'AMD', category: 'cpu', 
        image: 'img/product/AMD Ryzen 9 7950X.jpg', // << Đã sửa
        attributes: { socket: 'AM5', wattage: 120 } 
    },

    // Mainboards
    { 
        id: 'mb1', name: 'ASUS PRIME B760M-A WIFI D4', price: 4190000, brand: 'ASUS', category: 'mainboard', 
        image: 'img/product/ASUS PRIME B760M-A WIFI D4.jpg', // << Đã sửa
        attributes: { socket: 'LGA 1700', ddr: 'DDR4' } 
    },
    { 
        id: 'mb2', name: 'GIGABYTE Z790 AORUS ELITE AX', price: 7190000, brand: 'Gigabyte', category: 'mainboard', 
        image: 'img/product/GIGABYTE Z790 AORUS ELITE AX.jpg', // << Đã sửa
        attributes: { socket: 'LGA 1700', ddr: 'DDR5' } 
    },
    { 
        id: 'mb3', name: 'ASUS TUF GAMING B650-PLUS', price: 5590000, brand: 'ASUS', category: 'mainboard', 
        image: 'img/product/ASUS TUF GAMING B650-PLUS.jpg', // << Đã sửa
        attributes: { socket: 'AM5', ddr: 'DDR5' } 
    },

    // RAM
    { 
        id: 'ram1', name: 'Corsair Vengeance 16GB Bus 3200', price: 1150000, brand: 'Corsair', category: 'ram', 
        image: 'img/product/Corsair Vengeance 16GB Bus 3200.jpg', // << Đã sửa
        attributes: { ddr: 'DDR4' } 
    },
    { 
        id: 'ram2', name: 'G.Skill Trident Z5 32GB Bus 6000', price: 3250000, brand: 'G.Skill', category: 'ram', 
        image: 'img/product/G.Skill Trident Z5 32GB Bus 6000.jpg', // << GIẢ ĐỊNH TÊN FILE NÀY
        attributes: { ddr: 'DDR5' } 
    },
    
    // VGAs
    { 
        id: 'vga1', name: 'GIGABYTE RTX 3060 12GB', price: 8290000, brand: 'Gigabyte', category: 'vga', 
        image: 'img/product/GIGABYTE RTX 3060 12GB.jpg', // << GIẢ ĐỊNH TÊN FILE NÀY
        attributes: { wattage: 170 } 
    },
    { 
        id: 'vga2', name: 'ASUS TUF RTX 4070 Ti 12GB', price: 22490000, brand: 'ASUS', category: 'vga', 
        image: 'img/product/ASUS TUF RTX 4070 Ti 12GB.jpg', // << GIẢ ĐỊNH TÊN FILE NÀY
        attributes: { wattage: 285 } 
    },
    { 
        id: 'vga3', name: 'MSI RTX 4090 SUPRIM X 24G', price: 49990000, brand: 'MSI', category: 'vga', 
        image: 'img/product/MSI RTX 4090 SUPRIM X 24G.jpg', // << GIẢ ĐỊNH TÊN FILE NÀY
        attributes: { wattage: 450 } 
    },

    // PSU
    {
        id: 'psu1', name: 'Cooler Master MWE 650W Bronze V2', price: 1590000, brand: 'Cooler Master', category: 'psu',
        image: 'img/product/Cooler Master MWE 650W Bronze V2.jpg', // << GIẢ ĐỊNH TÊN FILE NÀY
        attributes: { wattage: 650 }
    },
    {
        id: 'psu2', name: 'Corsair RM850e 850W 80 Plus Gold', price: 2950000, brand: 'Corsair', category: 'psu',
        image: 'img/product/Corsair RM850e 850W 80 Plus Gold.jpg', // << GIẢ ĐỊNH TÊN FILE NÀY
        attributes: { wattage: 850 }
    },
];