import React from 'react';
import { FooterContainer, FooterImage, FooterBrand, FooterOverlay } from './style';
import footerImage from '../../assets/images/footerbackground.jpg';

const FooterComponent = () => {
  return (
    <FooterContainer>
      <FooterImage src={footerImage} alt="Footer Background" />
      <FooterOverlay />
      <FooterBrand>La Studio</FooterBrand>
    </FooterContainer>
  );
};

export default FooterComponent;
