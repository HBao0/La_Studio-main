import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ListProductCartContainer = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const TextRight = styled.div`
  text-align: right;
`;

export const SeeMoreLink = styled(Link)`
  color:rgb(138, 138, 138);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProductCol = styled.div`
  flex: 0 0 16.6667%;
  max-width: 16.6667%;
  padding: 0.5rem;

  @media (max-width: 1200px) {
    flex: 0 0 20%;
    max-width: 20%;
  }

  @media (max-width: 992px) {
    flex: 0 0 25%;
    max-width: 25%;
  }

  @media (max-width: 768px) {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }

  @media (max-width: 576px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
`;
