import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCartComponent from '../ProductCartComponent/ProductCartComponent';
import { ListProductCartContainer, Title, TextRight, SeeMoreLink, ProductCol } from './style';

const ListProductCartComponent = ({ title, link, products }) => {
  return (
    <ListProductCartContainer>
      <Row className="align-items-center">
        <Col>
          <Title>{title}</Title>
        </Col>
        <Col>
          <TextRight>
            <SeeMoreLink to={link}>Xem thêm</SeeMoreLink>
          </TextRight>
        </Col>
      </Row>
      <Row>
        {products.map((product) => (
          <ProductCol key={product.id} className="mb-4">
            <ProductCartComponent product={product} />
          </ProductCol>
        ))}
      </Row>
    </ListProductCartContainer>
  );
};

export default ListProductCartComponent;
