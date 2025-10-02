-- Tạo bảng sản phẩm
CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    price DECIMAL(15,2) NOT NULL,
    category VARCHAR(100),
    stock INT DEFAULT 0,
    images TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tạo FULLTEXT INDEX cho tìm kiếm nhanh
CREATE FULLTEXT INDEX idx_name_desc ON products(name, description);

-- Thêm dữ liệu mẫu sản phẩm
INSERT INTO products (name, slug, price, category, stock, images, description) VALUES
('Áo Hoodie Nam', 'ao-hoodie-nam', 450000, 'Áo', 100, '["/images/hoodie.jpg"]', 'Áo hoodie nam chất cotton, in nhện 2 mặt.'),
('Quần Jean Nam', 'quan-jean-nam', 600000, 'Quần', 80, '["/images/jean.jpg"]', 'Quần jean nam thời trang.'),
('Áo Sơ Mi Trắng', 'ao-so-mi-trang', 350000, 'Áo', 50, '["/images/somi.jpg"]', 'Áo sơ mi trắng vải cao cấp.'),
('Giày Sneaker', 'giay-sneaker', 1200000, 'Giày', 40, '["/images/sneaker.jpg"]', 'Giày sneaker nam nữ cá tính.'),
('Túi Xách Nữ', 'tui-xach-nu', 800000, 'Túi', 25, '["/images/tuixach.jpg"]', 'Túi xách nữ sang trọng.');

-- Tạo bảng admin
CREATE TABLE IF NOT EXISTS admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Thêm dữ liệu mẫu admin (password là hash bcrypt, cần thay đổi khi dùng thật)
INSERT INTO admins (username, email, password) VALUES
('admin', 'admin@gmail.com', 'bao123');