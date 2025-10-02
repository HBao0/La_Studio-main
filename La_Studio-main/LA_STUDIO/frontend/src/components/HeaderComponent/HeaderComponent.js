import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, FormControl, Button, Row, Col } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { navbarStyle, searchContainerStyle, inputContainerStyle, searchButtonStyle, cartButtonStyle, inputStyle, userIconHoverStyle } from './style';
import image7 from '../../assets/images/image7.jpg';

const UserIconHover = styled(Link)`
  ${userIconHoverStyle}
`;

const StyledNavbar = styled(Navbar)`
  ${navbarStyle}
`;

const StyledSearchContainer = styled.div`
  ${searchContainerStyle}
`;

const StyledInputContainer = styled.div`
  ${inputContainerStyle}
`;

const StyledSearchButton = styled(Button)`
  ${searchButtonStyle}
`;

const StyledCartButton = styled(Button)`
  ${cartButtonStyle}
`;

const StyledNotificationButton = styled(Button)`
  ${cartButtonStyle}
`;

const StyledInput = styled(FormControl)`
  ${inputStyle}
`;



const HeaderComponent = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const isLoggedIn = !!user;
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef();

  useEffect(() => {
    if (!showNotifications) return;
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showNotifications]);
  const notifications = [
    { id: 1, text: 'Your order #1234 has been shipped.' },
    { id: 2, text: 'Welcome to La Studio! Enjoy shopping.' },
    { id: 3, text: 'New product arrivals this week.' },
  ];
  const handleBellClick = () => setShowNotifications((prev) => !prev);
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <header>
      <StyledNavbar expand="lg" className="container-fluid">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="ps-4 pe-3 nav-link">Home</Link>
            <Nav.Link href="#category" className="px-3">Category</Nav.Link>
            <Nav.Link href="#blog" className="px-3">Blog</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#cskh" className="px-3">CSKH</Nav.Link>
            <Nav.Link href="#about" className="px-3">About La</Nav.Link>
            {isLoggedIn ? (
              <button
                className="ps-3 pe-4 nav-link"
                style={{ background: 'none', border: 'none', color: '#88001b', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  localStorage.removeItem('user');
                  setUser(null);
                  window.location.href = '/';
                }}
              >Logout</button>
            ) : (
              <Link to="/login" className="ps-3 pe-4 nav-link">Login</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </StyledNavbar>

      <StyledSearchContainer className="text-light container">
        <Row className="align-items-center">
          <Col md={3} className="d-none d-md-block">
            <div className="d-flex align-items-center">
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 className="h5 mb-0 ms-3">La Studio</h1>
              </Link>
              <div style={{ position: 'relative' }} ref={bellRef}>
                <StyledNotificationButton className="ms-3" onClick={handleBellClick}>
                  <FaBell />
                </StyledNotificationButton>
                {showNotifications && (
                  <div
                    className="notification-dropdown"
                    style={{ position: 'absolute', top: 40, left: 0, minWidth: 260, background: '#fff', color: '#222', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.15)', zIndex: 9999 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid #eee', fontWeight: 600 }}>Notifications</div>
                    {notifications.length === 0 ? (
                      <div style={{ padding: 16, color: '#888' }}>No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} style={{ padding: '10px 16px', borderBottom: '1px solid #f3f3f3', fontSize: 15 }}>
                          {n.text}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col md={6} className="d-none d-md-block">
            <StyledInputContainer className="d-flex">
              <StyledInput
                type="search"
                placeholder="Search..."
                aria-label="Search"
                border="none"
              />
              <StyledSearchButton>
                <FaSearch />
              </StyledSearchButton>
            </StyledInputContainer>
          </Col>
          <Col md={3} className="text-end d-none d-md-block">
            <div className="d-flex justify-content-end align-items-center">
              {isLoggedIn ? (
                <Link to={"/profile"} className="d-flex align-items-center me-3" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img src={image7} alt="Avatar" className="rounded-circle" width="30" height="30" />
                  <span className="ms-2">{user.username || user.email}</span>
                </Link>
              ) : (
                <UserIconHover to="/login" className="d-flex align-items-center me-3" style={{ color: 'white', fontSize: 28, textDecoration: 'none' }}>
                  <FaUserCircle />
                </UserIconHover>
              )}
              <StyledCartButton>
                <FaShoppingCart />
              </StyledCartButton>
            </div>
          </Col>
          <Col xs={12} className="d-md-none">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h5 mb-0">La Studio</h1>
              <StyledNotificationButton>
                <FaBell />
              </StyledNotificationButton>
              <StyledCartButton>
                <FaShoppingCart />
              </StyledCartButton>
            </div>
          </Col>
          <Col xs={12} className="d-md-none mt-2">
            <StyledInputContainer className="d-flex">
              <StyledInput
                type="search"
                placeholder="Search..."
                aria-label="Search"
                border="none"
              />
              <StyledSearchButton>
                <FaSearch />
              </StyledSearchButton>
            </StyledInputContainer>
          </Col>
        </Row>
      </StyledSearchContainer>
    </header>
  );
}

export default HeaderComponent;