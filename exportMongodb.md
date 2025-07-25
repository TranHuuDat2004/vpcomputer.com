### Cách export data từu MongoDB Compass (Cách dễ nhất, giao diện đồ họa)

Nếu bạn đã cài đặt MongoDB Compass (công cụ GUI chính thức của MongoDB), đây là cách đơn giản và trực quan nhất.

1.  **Kết nối đến Cluster:**
    *   Mở MongoDB Compass.
    *   Sử dụng chuỗi kết nối (Connection String) từ MongoDB Atlas của bạn để kết nối đến cluster.

2.  **Chọn Collection cần Export:**
    *   Ở bảng bên trái, chọn database của bạn (ví dụ: `VPComputerDB`).
    *   Nhấp vào collection bạn muốn export (ví dụ: `products`).

3.  **Thực hiện Export:**
    *   Trên menu chính ở trên cùng, nhấp vào **`Collection`**.
    *   Trong menu thả xuống, chọn **`Export Collection`**.



4.  **Tùy chỉnh và Export:**
    *   Một cửa sổ mới sẽ hiện ra.
    *   **Export File Type:** Chọn định dạng bạn muốn. **JSON** là lựa chọn phổ biến và linh hoạt nhất. **CSV** cũng là một lựa chọn tốt nếu bạn muốn mở bằng Excel.
    *   **Output:** Nhấp vào "Select..." để chọn nơi bạn muốn lưu file và đặt tên cho nó (ví dụ: `products_backup.json`).
    *   Nhấp vào nút **`EXPORT`**.

Compass sẽ export toàn bộ dữ liệu trong collection `products` thành một file JSON duy nhất tại vị trí bạn đã chọn.

