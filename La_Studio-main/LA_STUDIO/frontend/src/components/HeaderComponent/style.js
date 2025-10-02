
import { css } from 'styled-components';
export const userIconHoverStyle = css`
  transition: background 0.2s;
  &:hover {
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
  }
`;

export const navbarStyle = css`
  background-color: #F8F8F8;
  box-shadow: 0 4px 100px rgba(0, 0, 0, 0.58);
  margin-bottom: 20px;
  height:36px;
  border-radius: 0 0 10px 10px;
`;

export const searchContainerStyle = css`
  box-shadow: 0 4px 8px hsla(0, 0.00%, 0.00%, 0.57);
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #88001b;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const inputContainerStyle = css`
  display: flex;
  background-color: white;
  border-radius: 6px;
  // overflow: hidden;
  height:40px;
  align-items: center;
`;

export const searchButtonStyle = css`
  background-color: white;
  color: black;
  border: none;
  height: 90%;
  front-size:10px;
  margin-right:2px;
  padding: 0 15px;
  border-radius: 6px;
  transition: all 0.4s;
  &:hover {
      background-color: black;
  }
`;

export const cartButtonStyle = css`
  border: none;
  color: white;
  font-size: 20px;
  background-color: transparent;
  transition: all 0.4s;
  &:hover {
    color: black;
    background-color: white;
    transform: scale(1.1);
  }
`;

export const inputStyle = css`
  border: none;
  outline: none;
  box-shadow: none;
  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
  ::-webkit-search-cancel-button {
    appearance: none;
  }
  &::-webkit-search-cancel-button:hover {
      opacity: 0.8;
      cursor  : pointer;
  }
`;
