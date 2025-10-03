# LA_STUDIO Backend

## Mô tả
Đây là backend cho dự án La Studio, sử dụng Node.js, Express, Sequelize (MySQL), Redis, JWT để quản lý sản phẩm, người dùng, admin, giỏ hàng và thanh toán.

## Cấu trúc thư mục
- `server.js`: File khởi động server chính.
- `routes/`: Chứa các route cho API (sản phẩm, giỏ hàng, thanh toán, người dùng).
- `models/`: Định nghĩa các model Sequelize cho MySQL.
- `middleware/`: Chứa các middleware xác thực, cache, phân quyền.
- `config/db.js`: Cấu hình kết nối MySQL.
- `utils/redisClient.js`: Kết nối Redis.
- `logger.js`: Ghi log bằng Winston.
- `init.sql`: Script tạo bảng và dữ liệu mẫu cho MySQL.

## Cài đặt
1. Cài đặt Node.js và MySQL.
2. Cài đặt package:
   ```bash
   npm install
   ```
3. Tạo database và bảng bằng file `init.sql`.
4. Cấu hình kết nối MySQL trong `config/db.js` cho phù hợp môi trường.
5. Chạy backend:
   ```bash
   npm start
   ```

## Các API chính
- `POST /api/login`: Đăng nhập admin (trả về JWT).
- `GET /api/products/:id`: Lấy thông tin sản phẩm.
- `POST /api/cart/add`: Thêm sản phẩm vào giỏ hàng.
- `GET /api/cart/me`: Lấy thông tin user từ JWT.
- `GET /api/auth/me`: Lấy thông tin user từ JWT.
- `POST /api/payment/charge`: Thanh toán (demo).
- `GET /health`: Kiểm tra trạng thái server.

## Môi trường
- Cấu hình biến môi trường trong `.env` hoặc qua Docker Compose.
- Redis và MySQL cần chạy trước khi khởi động backend.

## Ghi chú
- Đảm bảo cài đủ các package trong `package.json`.
- Đổi mật khẩu admin và JWT_SECRET khi deploy thực tế.
- Để phát triển, có thể dùng proxy cho frontend để gọi API backend.

## Liên hệ
Nếu gặp lỗi hoặc cần hỗ trợ, liên hệ nhóm phát triển La Studio.
