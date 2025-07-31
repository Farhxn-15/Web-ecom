import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Styled Components

const NavbarContainer = styled.header`
  width: 100%;
  background: linear-gradient(90deg, #40652a 60%, #a89168 100%);
  color: #fff;
  box-shadow: 0 1px 6px rgba(100,60,20,0.07);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1.1rem 0;

  @media (max-width: 640px) {
    padding: 0.8rem 0;
    overflow-x: hidden;
  }
`;

const NavContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.7rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const LogoImg = styled.div`
  border-radius: 50%;
  background: #a89168;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-weight: bold;
  font-size: 1.6rem;
  color: #40652a;
`;

const SiteTitle = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff8f0;
  letter-spacing: 1px;
`;

// Auth Buttons container
const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

// Single Auth Button
const AuthBtn = styled(Link)`
  background: #fffdf6;
  color: #40652a;
  font-weight: 600;
  border: 1.5px solid #a89168;
  border-radius: 0.7em;
  padding: 0.38em 1.13em;
  font-size: 1.02rem;
  margin-right: 0.47em;
  text-decoration: none;
  transition: background 0.17s, color 0.17s, border 0.14s;

  &:hover,
  &:focus {
    background: #e6ebd7;
    color: #a89168;
    border-color: #b5996c;
    outline: none;
  }

  @media (max-width: 640px) {
    margin-right: 0;
    width: 100%;
    text-align: center;
  }
`;

// Navigation Links container
const NavLinks = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

// Individual styled Link
const StyledLink = styled(Link)`
  color: ${({ active }) => (active ? '#c4db8c' : '#fffdf6')};
  text-decoration: none;
  font-size: 1.07rem;
  letter-spacing: 0.04em;
  font-weight: 500;
  padding-bottom: 2px;
  border-bottom: ${({ active }) => (active ? '2px solid #a89168' : 'none')};
  transition: color 0.2s;

  &:hover,
  &:focus {
    color: #a89168;
    outline: none;
  }

  @media (max-width: 640px) {
    display: block;
    padding: 0.5rem 0;
    width: 100%;
  }
`;

// Cart Button and Badge
const CartBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.15em 0.5em;
  display: flex;
  align-items: center;
  transition: transform 0.13s;
  margin-left: 1.3em;
  position: relative;

  &:hover,
  &:focus {
    transform: scale(1.12);
    outline: 2px solid #a89168;
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const CartIcon = styled.span`
  display: flex;
  align-items: center;
  svg {
    display: block;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -7px;
  background: #e9c46a;
  color: #2c4722;
  font-weight: 700;
  border-radius: 50%;
  font-size: 11px;
  min-width: 18px;
  padding: 0.05em 0.44em;
  border: 2px solid #fff;
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  color: #fff9cc;
  font-weight: 600;
  margin-left: 1.4em;
  font-size: 1.02rem;
  cursor: pointer;
  transition: color 0.17s;

  &:hover,
  &:focus {
    color: #e9c46a;
    outline: none;
  }

  @media (max-width: 640px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

// Hamburger / Toggle Button for Mobile menu
const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: none;
  font-size: 2rem;
  margin-left: auto;
  padding: 0.3rem 0.5rem;

  @media (max-width: 640px) {
    display: block;
  }

  &:focus {
    outline: 2px solid #a89168;
    outline-offset: 2px;
  }
`;

// Mobile Menu Container
const MobileMenuContainer = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  gap: 1rem;

  &.open {
    display: flex;
  }
`;

// Desktop menu container - hide on mobile
const DesktopMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3em;
  margin-left: auto;

  @media (max-width: 640px) {
    display: none !important;
  }
`;

// Main Navbar component
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mobile menu open state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Read user session from localStorage
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("mehndi_loggedin_user") || "null")
  );

  // Cart count (total qty in cart)
  const [cartCount, setCartCount] = useState(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("mehndi_cart") || "[]");
      return cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const cart = JSON.parse(localStorage.getItem("mehndi_cart") || "[]");
      setCartCount(cart.reduce((acc, item) => acc + (item.qty || 1), 0));
      setUser(JSON.parse(localStorage.getItem("mehndi_loggedin_user") || "null"));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
    localStorage.removeItem("mehndi_loggedin_user");
    setUser(null);
    navigate("/");
    setMobileMenuOpen(false);
  }

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <NavbarContainer>
      <NavContent>
        <LogoRow>
          <LogoWrapper to="/">
            <LogoImg>🌿</LogoImg>
            <SiteTitle>Samrin Organic Mehndi</SiteTitle>
          </LogoWrapper>
        </LogoRow>

        {/* Mobile menu toggle button */}
        <MobileMenuButton
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>

        {/* Mobile menu */}
        <MobileMenuContainer id="mobile-menu" className={mobileMenuOpen ? 'open' : ''}>
          <NavLinks>
            <StyledLink to="/" active={location.pathname === "/"} onClick={() => setMobileMenuOpen(false)}>Home</StyledLink>
            <StyledLink to="/about" active={location.pathname === "/about"} onClick={() => setMobileMenuOpen(false)}>About Us</StyledLink>
            <StyledLink to="/contact" active={location.pathname === "/contact"} onClick={() => setMobileMenuOpen(false)}>Contact Us</StyledLink>
          </NavLinks>

          {/* Auth buttons */}
          {!user && (
            <AuthContainer>
              <AuthBtn to="/login" onClick={() => setMobileMenuOpen(false)}>Login</AuthBtn>
              <AuthBtn to="/signup" onClick={() => setMobileMenuOpen(false)}>Signup</AuthBtn>
            </AuthContainer>
          )}

          {/* Cart and logout for logged in user */}
          {user && (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: 'wrap', width: '100%' }}>
              <CartBtn
                onClick={() => { navigate("/payment"); setMobileMenuOpen(false); }}
                aria-label="Cart"
              >
                <CartIcon>
                  <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="23" r="1.6" fill="#a89168" />
                    <circle cx="21" cy="23" r="1.6" fill="#a89168" />
                    <path d="M4 5h2.6l2.1 11.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.6L22 8.7a1 1 0 0 0-1-1.2H7.1" stroke="#fff" strokeWidth="1.6" fill="none" />
                  </svg>
                  {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
                </CartIcon>
              </CartBtn>

              <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </div>
          )}
        </MobileMenuContainer>

        {/* Desktop menu visible only on desktop */}
        <DesktopMenuContainer>
          <NavLinks>
            <StyledLink to="/" active={location.pathname === "/"}>Home</StyledLink>
            <StyledLink to="/about" active={location.pathname === "/about"}>About Us</StyledLink>
            <StyledLink to="/contact" active={location.pathname === "/contact"}>Contact Us</StyledLink>
          </NavLinks>

          {!user && (
            <AuthContainer>
              <AuthBtn to="/login">Login</AuthBtn>
              <AuthBtn to="/signup">Signup</AuthBtn>
            </AuthContainer>
          )}

          <CartBtn onClick={() => navigate("/payment")} aria-label="Cart">
            <CartIcon>
              <svg width="27" height="27" viewBox="0 0 27 27" fill="none" aria-hidden="true" focusable="false">
                <circle cx="12" cy="23" r="1.6" fill="#a89168" />
                <circle cx="21" cy="23" r="1.6" fill="#a89168" />
                <path d="M4 5h2.6l2.1 11.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.6L22 8.7a1 1 0 0 0-1-1.2H7.1" stroke="#fff" strokeWidth="1.6" fill="none" />
              </svg>
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </CartIcon>
          </CartBtn>

          {user && <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>}
        </DesktopMenuContainer>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;
