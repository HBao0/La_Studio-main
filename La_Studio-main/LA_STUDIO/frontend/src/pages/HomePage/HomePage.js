import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SlideComponent from '../../components/SlidesComponent/SlideComponent';
import ListProductCartComponent from '../../components/ListProductCartComponent/ListProductCartComponent';
// Import các ảnh từ thư mục assets
import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';
import image3 from '../../assets/images/image3.jpg';
import image4 from '../../assets/images/image4.jpg';
import image5 from '../../assets/images/image5.jpg';
import image6 from '../../assets/images/image6.jpg';
import image7 from '../../assets/images/image7.jpg';
import image8 from '../../assets/images/image8.jpg';
import image9 from '../../assets/images/image9.jpg';
import image10 from '../../assets/images/image10.jpg';

const HomePage = () => {
    const bestSellingProducts = [
        { id: 1, image: image1, link: '/product/1', name: 'Áo HODIE , Áo nỉ RANPINJIA nhện in 2 mặt , áo nỉ mũ nỉ cotton lót bông, Áo dài tay mũ 2 lớp dày dặn tay bồng siêu hot', price: '450,000đ', rating: 4.5 },
        { id: 2, image: image2, link: '/product/2', name: 'Quần Jean Nam', price: '600,000đ', rating: 5 },
        { id: 3, image: image3, link: '/product/3', name: 'Áo Sơ Mi Trắng', price: '350,000đ', rating: 4 },
        { id: 4, image: image4, link: '/product/4', name: 'Giày Sneaker', price: '1,200,000đ', rating: 4.8 },
        { id: 5, image: image5, link: '/product/5', name: 'Túi Xách Nữ', price: '800,000đ', rating: 3.5 },
    ];

    const newProducts = [
        { id: 6, image: image6, link: '/product/6', name: 'Đồng Hồ Nam', price: '2,000,000đ' },
        { id: 7, image: image7, link: '/product/7', name: 'Áo Polo Nam', price: '400,000đ' },
        { id: 8, image: image8, link: '/product/8', name: 'Mũ Lưỡi Trai', price: '250,000đ' },
        { id: 9, image: image9, link: '/product/9', name: 'Balo Laptop', price: '1,500,000đ' },
        { id: 10, image: image10, link: '/product/10', name: 'Thắt Lưng Da', price: '700,000đ' },
    ];

    const todayIdeas = [
        { id: 1, image: image1, link: '/product/1', name: 'Áo HODIE , Áo nỉ RANPINJIA nhện in 2 mặt , áo nỉ mũ nỉ cotton lót bông, Áo dài tay mũ 2 lớp dày dặn tay bồng siêu hot', price: '450,000đ', rating: 4.5 },
        { id: 2, image: image2, link: '/product/2', name: 'Quần Jean Nam', price: '600,000đ', rating: 5 },
        { id: 3, image: image3, link: '/product/3', name: 'Áo Sơ Mi Trắng', price: '350,000đ', rating: 4 },
        { id: 4, image: image4, link: '/product/4', name: 'Giày Sneaker', price: '1,200,000đ', rating: 4.8 },
        { id: 5, image: image5, link: '/product/5', name: 'Túi Xách Nữ', price: '800,000đ', rating: 3.5 },
        { id: 6, image: image6, link: '/product/6', name: 'Đồng Hồ Nam', price: '2,000,000đ', rating: 5 },
        { id: 7, image: image7, link: '/product/7', name: 'Áo Polo Nam', price: '400,000đ',rating: 4.8 },
        { id: 8, image: image8, link: '/product/8', name: 'Mũ Lưỡi Trai', price: '250,000đ',rating: 3.5 },
        { id: 9, image: image9, link: '/product/9', name: 'Balo Laptop', price: '1,500,000đ',rating: 4.5 },
        { id: 10, image: image10, link: '/product/10', name: 'Thắt Lưng Da', price: '700,000đ',rating: 4 },
    ]

    const categories = [
        { name: 'Gợi ý hôm nay', products: todayIdeas, link: '/category/today', count: 10 },
        { name: 'Hoodie', products: bestSellingProducts, link: '/category/hoodie', count: 5 },
        { name: 'Varsity', products: bestSellingProducts, link: '/category/varsity', count: 5 },
        { name: 'Sweater', products: bestSellingProducts, link: '/category/sweater', count: 5 },
        { name: 'Cargo Pant', products: bestSellingProducts, link: '/category/cargopant', count: 5 },
    ];


    return (
        <Container fluid className="px-4">
            <Row>
                <Col md={6}>
                    <SlideComponent title="BÁN CHẠY NHẤT TRONG TUẦN" products={bestSellingProducts} />
                </Col>
                <Col md={6}>
                    <SlideComponent title="SẢN PHẨM MỚI NHẤT" products={newProducts} />
                </Col>
            </Row>
            {categories.map((category, index) => (
                <ListProductCartComponent
                    key={index}
                    title={category.name}
                    link={category.link}
                    products={category.products}
                />
            ))}
        </Container>
    );
}

export default HomePage;