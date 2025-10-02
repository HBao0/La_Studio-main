import styled from 'styled-components';

export const FooterContainer = styled.div`
  position: relative;
  height: 300px;
  width: 100%;
`;

export const FooterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const FooterBrand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 110px;
  font-weight: bold;
  font-family: 'Bungee Shade', cursive;
  text-wrap: nowrap;
  letter-spacing: 5px;
`;

export const FooterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
`;
