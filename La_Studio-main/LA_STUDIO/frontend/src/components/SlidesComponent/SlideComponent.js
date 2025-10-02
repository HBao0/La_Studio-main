import React, { useRef, useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  SlideContainer,
  SlideTitle,
  SlideItem,
  SlideImage,
  OverlayInfo,
  ProductName,
  Price,
  Rating,
  PrevArrow,
  NextArrow,
  GlobalStyle,
} from "./style";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <PrevArrow onClick={onClick}>
      <FaChevronLeft />
    </PrevArrow>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <NextArrow onClick={onClick}>
      <FaChevronRight />
    </NextArrow>
  );
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars).fill().map((_, i) => <FaStar key={`full-${i}`} color="#fffff" />)}
      {halfStar && <FaStarHalfAlt key="half" color="#fffff" />}
      {Array(emptyStars).fill().map((_, i) => <FaRegStar key={`empty-${i}`} color="#fffff" />)}
    </>
  );
};

const SlideComponent = ({ title, products }) => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const startAutoSlide = useCallback(() => {
    return setInterval(() => {
      if (sliderRef.current && !isPaused) {
        sliderRef.current.slickNext();
      }
    }, 3000);
  }, [isPaused]);

  useEffect(() => {
    const interval = startAutoSlide();
    return () => clearInterval(interval);
  }, [startAutoSlide]);

  const beforeChangeHandler = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: beforeChangeHandler,
  };

  return (
    <GlobalStyle>
      <SlideContainer>
        <SlideTitle>{title}</SlideTitle>
        <Slider ref={sliderRef} {...settings}>
          {products.map((product) => (
            <SlideItem key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <SlideImage src={product.image} alt={product.name} />
                <OverlayInfo>
                  <ProductName>{product.name}</ProductName>
                </OverlayInfo>
                <Price>{product.price}</Price>
                {product.rating && <Rating>{renderStars(product.rating)}</Rating>}
              </Link>
            </SlideItem>
          ))}
        </Slider>
      </SlideContainer>
    </GlobalStyle>
  );
};

SlideComponent.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SlideComponent;