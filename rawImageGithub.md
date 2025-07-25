Đây là cách lấy link chính xác:

### **Cách 1: Lấy link trực tiếp (Đơn giản nhất)**

1.  Truy cập vào đường dẫn ảnh trên GitHub mà bạn đã cung cấp:
    [https://github.com/TranHuuDat2004/vpcomputer.com/blob/main/img/screenshot.png](https://github.com/TranHuuDat2004/vpcomputer.com/blob/main/img/screenshot.png)

2.  Trên trang hiển thị ảnh, tìm và nhấp vào nút **"Download raw file"** (nút này thường là một icon mũi tên chỉ xuống hoặc có chữ "Raw").

3.  Trình duyệt sẽ mở ảnh ở một tab mới. **URL trên thanh địa chỉ của tab mới đó chính là đường dẫn bạn cần.**

    Nó sẽ có dạng như sau:
    ```
    https://raw.githubusercontent.com/TranHuuDat2004/vpcomputer.com/main/img/screenshot.png
    ```

### **Cách 2: Tự xây dựng link (Nhanh hơn khi đã quen)**

Bạn có thể tự chuyển đổi từ link GitHub thông thường sang link raw bằng cách thay đổi cấu trúc URL:

*   **URL GitHub:** `https://github.com/`**`USER`**`/`**`REPO`**`/blob/`**`BRANCH`**`/`**`PATH_TO_FILE`**
*   **URL Raw:** `https://raw.githubusercontent.com/`**`USER`**`/`**`REPO`**`/`**`BRANCH`**`/`**`PATH_TO_FILE`**

**Áp dụng cho link của bạn:**
*   Bỏ `blob/`.
*   Thay `github.com` bằng `raw.githubusercontent.com`.


