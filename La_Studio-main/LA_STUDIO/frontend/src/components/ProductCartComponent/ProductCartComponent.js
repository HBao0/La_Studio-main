import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
    ProductCard,
    ProductImage,
    ProductInfo,
    ProductName,
    ProductPrice,
    ProductRating,
    CartItem,
} from './style';

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <>
        {Array(fullStars).fill(<FaStar color="#fffff" />)}
        {halfStar && <FaStarHalfAlt color="#fffff" />}
        {Array(emptyStars).fill(<FaRegStar color="#fffff" />)}
      </>
    );
  };

const ProductCartComponent = ({ product }) => {
    return (
        <ProductCard>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CartItem>
                    <ProductImage src={product.image} alt={product.name} />
                    {product.rating && <ProductRating>{renderStars(product.rating)}</ProductRating>}
                    <ProductInfo>
                        <ProductName>{product.name}</ProductName>
                        <ProductPrice>{product.price}</ProductPrice>
                    </ProductInfo>
                </CartItem>
            </Link>
        </ProductCard>
    );
};

ProductCartComponent.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        rating: PropTypes.number,
    }).isRequired,
};

export default ProductCartComponent;