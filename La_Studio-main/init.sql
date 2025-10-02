-- Tạo database
CREATE DATABASE IF NOT EXISTS la_studio;
USE la_studio;

-- Bảng người dùng
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng admin
CREATE TABLE IF NOT EXISTS admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thông tin người dùng
CREATE TABLE IF NOT EXISTS user_info (
    info_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Thông tin admin
CREATE TABLE IF NOT EXISTS admin_info (
    info_id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(255),
    FOREIGN KEY (admin_id) REFERENCES admins(admin_id) ON DELETE CASCADE
);

-- Thêm dữ liệu mẫu cho admin
INSERT INTO admins (username, email, password)
VALUES ('admin1', 'admin1@gmail.com', '123456');

-- Bảng products (sản phẩm)
CREATE TABLE IF NOT EXISTS products (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  category VARCHAR(100),
  stock INT DEFAULT 0,
  images TEXT, -- json array of image urls
  attributes JSON, -- optional attributes JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes tối ưu tìm kiếm
ALTER TABLE products
  ADD INDEX idx_category (category),
  ADD INDEX idx_price (price),
  ADD INDEX idx_created_at (created_at);

-- Fulltext index cho tìm kiếm nhanh theo từ khoá (MySQL InnoDB >=5.6 hỗ trợ fulltext)
ALTER TABLE products ADD FULLTEXT INDEX idx_fulltext_name_description (name, description);
