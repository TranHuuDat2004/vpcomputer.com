### **Hướng Dẫn Thay Đổi Bản Đồ Map của trang `contact.html` (3 bước đơn giản)**

#### **Bước 1: Tìm địa điểm của bạn trên Google Maps**
1.  Truy cập vào [https://www.google.com/maps](https://www.google.com/maps).
2.  Trên thanh tìm kiếm, gõ chính xác địa chỉ bạn muốn hiển thị. Ví dụ: **"Trường Đại học Tôn Đức Thắng"**.
3.  Nhấn Enter. Google Maps sẽ hiển thị đúng vị trí đó.



#### **Bước 2: Lấy mã nhúng (Embed code)**
1.  Sau khi đã tìm thấy đúng địa điểm, hãy nhấp vào nút **"Share"** (Chia sẻ).
2.  Một cửa sổ mới sẽ hiện ra. Hãy chọn tab **"Embed a map"** (Nhúng bản đồ).



#### **Bước 3: Sao chép và dán mã HTML**
1.  Bây giờ, bạn sẽ thấy một đoạn mã `<iframe>...</iframe>`, giống hệt như đoạn mã bạn đã có.
2.  Nhấp vào nút **"COPY HTML"** (SAO CHÉP HTML).
3.  Quay trở lại file **`contact.html`** của bạn.
4.  **Xóa** toàn bộ thẻ `<iframe>` cũ.
5.  **Dán** đoạn mã `<iframe>` mới mà bạn vừa sao chép vào đúng vị trí đó.

---

### **Ví dụ:**

**Đoạn code iframe cũ của bạn (Chợ Bến Thành):**
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447176274488!2d106.69758097589508!3d10.776992289371725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed8cb5%3A0x1a7da11b714b7417!2zQ2jhu6MgQuG6v24gVGjDoG5o!5e0!3m2!1svi!2s!4v1699999999999!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

**Đoạn code iframe mới (Trường Đại học Tôn Đức Thắng):**
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.023247320147!2d106.69774687589417!3d10.73263598941398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528b2747a81a3%3A0x336585166313f021!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUw7RuIMSQ4bupYyBUaOG6r25n!5e0!3m2!1svi!2s!4v1721545674312!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```