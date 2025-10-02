import styled from 'styled-components';

export const SlideContainer = styled.div`
  margin: 20px 0;
  position: relative;
`;

export const SlideTitle = styled.h4`
  text-align: center;
  margin-bottom: 20px;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

export const OverlayInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  color: white;
  text-align: center;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40%;
  transition: background 0.3s ease-in-out;
`;

export const ProductName = styled.h4`
  font-size: 20px;
  margin: 0;
`;

export const Price = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  z-index: 2;
`;

export const Rating = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
`;

export const SlideItem = styled.div`
  text-align: center;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  &:hover ${Rating} {
    background: white;
    color: black;
  }
`;

export const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  font-size: 18px;
  color: white;
  background: transparent;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const PrevArrow = styled(ArrowButton)`
  left: 10px;
`;

export const NextArrow = styled(ArrowButton)`
  right: 10px;
`;

export const GlobalStyle = styled.div`
  .slick-list {
    border-radius: 10px !important;
    overflow: hidden !important;
  }
`;