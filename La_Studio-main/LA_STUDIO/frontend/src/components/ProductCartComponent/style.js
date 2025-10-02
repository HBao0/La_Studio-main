import styled from 'styled-components';

export const ProductCard = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

export const ProductInfo = styled.div`
  padding: 8px;
  text-align:start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ProductPrice = styled.p`
  font-size: 16px;
  color: #888;
  margin: 0;
  text-align: end;
  
`;

export const ProductRating = styled.div`
  position: absolute;
  top:5px;
  left:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
  transform: translateX(-50%);
`;

export const CartItem = styled.div`
  text-align: center;
  position: relative;
  &:hover ${ProductRating} {
    background: white;
    color: black;
  }
`;