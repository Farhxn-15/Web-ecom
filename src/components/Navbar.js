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
    padding: 0.6rem 0;
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

  @media (max-width: 640px) {
    padding: 0.5rem 0.5rem;
  }
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;  /* allow shrinking */
  flex-shrink: 1;
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
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 9px;
  font-weight: bold;
  font-size: 1.36rem;
  color: #40652a;

  @media (max-width: 640px) {
    width: 28px;
    height: 28px;
    font-size: 1.18rem;
    margin-right: 7px;
  }
`;

const SiteTitle = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff8f0;
  letter-spacing: 0.2px;

  @media (max-width: 500px) {
    font-size: 1rem;
    max-width: unset;
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    display: block;
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
    gap: 0.7rem;
    margin-top: 0.7rem;
  }
`;

const AuthBtn = styled(Link)`
  background: #fffdf6;
  color: #40652a;
  font-weight: 600;
  border: 1.5px solid #a89168;
  border-radius: 0.6em;
  padding: 0.34em 1.05em;
  font-size: 0.98rem;
  margin-right: 0.37em;
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
    font-size: 0.93rem;
    padding: 0.44em 0;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1.4rem;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    margin-top: 0.2rem;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ active }) => (active ? '#c4db8c' : '#fffdf6')};
  text-decoration: none;
  font-size: 1.01rem;
  letter-spacing: 0.02em;
  font-weight: 500;
  padding-bottom: 2px;
  border-bottom: ${({ active }) => (active ? '2px solid #a89168' : 'none')};
  transition: color 0.2s;
  max-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover,
  &:focus {
    color: #a89168;
    outline: none;
  }

  @media (max-width: 640px) {
    display: block;
    padding: 0.32rem 0;
    width: 100%;
    font-size: 0.92rem;
  }
`;

// Cart Button (desktop menu and internal menu) hidden on mobile
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
    outline: none;
  }

  @media (max-width: 640px) {
    display: none; /* Hidden on mobile because CartBtnMobile used */
  }
`;

const CartIcon = styled.span`
  display: flex;
  align-items: center;
  svg {
    display: block;
    width: 23px;
    height: 23px;

    @media (max-width: 640px) {
      width: 22px;
      height: 22px;
    }
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
  font-size: 10px;
  min-width: 17px;
  padding: 0.03em 0.36em;
  border: 2px solid #fff;
`;

// Mobile-only Cart Button to the left of hamburger menu
const CartBtnMobile = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  position: relative;
  margin-right: 0.13em;
  padding: 0.16em 0.19em;
  cursor: pointer;

  @media (max-width: 640px) {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 38px;
    min-height: 38px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  color: #fff9cc;
  font-weight: 600;
  margin-left: 1em;
  font-size: 0.98rem;
  cursor: pointer;
  transition: color 0.17s;

  &:hover,
  &:focus {
    color: #e9c46a;
    outline: none;
  }

  @media (max-width: 640px) {
    margin: 0.7rem 0 0 0;
    width: 100%;
    font-size: 0.93rem;
    padding: 0.43em 0;
    text-align: center;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  display: none;
  font-size: 2rem;
  margin-left: auto;
  padding: 0.25rem 0.51rem;

  @media (max-width: 640px) {
    display: block;
  }

  &:focus {
    outline: 2px solid #a89168;
    outline-offset: 2px;
  }
`;

const MobileMenuContainer = styled.div`
  display: none;
  flex-direction: column;
  width: 100%;
  margin-top: 0.4rem;
  gap: 0.3rem;
  background: linear-gradient(90deg, #42652c 60%, #b49e73 100%);
  border-radius: 0.7em;
  box-shadow: 0 2px 5px rgba(20,40,25,0.06);

  &.open {
    display: flex;
  }
`;

const DesktopMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8em;
  margin-left: auto;

  @media (max-width: 640px) {
    display: none !important;
  }
`;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("mehndi_loggedin_user") || "null")
  );

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

  // When cart clicked, force login if not authenticated
  const handleCartClick = () => {
    if (!user) {
      navigate("/login", { state: { from: "/payment" } });
    } else {
      navigate("/payment");
    }
  };

  function handleLogout() {
    localStorage.removeItem("mehndi_loggedin_user");
    setUser(null);
    navigate("/");
    setMobileMenuOpen(false);
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <NavbarContainer>
      <NavContent>
        <LogoRow>
          <LogoWrapper to="/">
            <LogoImg>🌿</LogoImg>
            <SiteTitle>Samrin Organic Mehndi</SiteTitle>
          </LogoWrapper>
        </LogoRow>

        {/* Mobile Cart Button - only visible on mobile, left of hamburger */}
        <CartBtnMobile
          onClick={handleCartClick}
          aria-label="Cart"
          title="Cart"
        >
          <CartIcon>
            <svg
              width="22"
              height="22"
              viewBox="0 0 27 27"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="23" r="1.6" fill="#a89168" />
              <circle cx="21" cy="23" r="1.6" fill="#a89168" />
              <path
                d="M4 5h2.6l2.1 11.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.6L22 8.7a1 1 0 0 0-1-1.2H7.1"
                stroke="#fff"
                strokeWidth="1.6"
                fill="none"
              />
            </svg>
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </CartIcon>
        </CartBtnMobile>

        {/* Hamburger menu toggle */}
        <MobileMenuButton
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </MobileMenuButton>

        {/* Mobile menu content */}
        <MobileMenuContainer id="mobile-menu" className={mobileMenuOpen ? "open" : ""}>
          <NavLinks>
            <StyledLink to="/" active={location.pathname === "/"} onClick={() => setMobileMenuOpen(false)}>
              Home
            </StyledLink>
            <StyledLink to="/about" active={location.pathname === "/about"} onClick={() => setMobileMenuOpen(false)}>
              About Us
            </StyledLink>
            <StyledLink to="/contact" active={location.pathname === "/contact"} onClick={() => setMobileMenuOpen(false)}>
              Contact Us
            </StyledLink>
          </NavLinks>

          {!user && (
            <AuthContainer>
              <AuthBtn to="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </AuthBtn>
              <AuthBtn to="/signup" onClick={() => setMobileMenuOpen(false)}>
                Signup
              </AuthBtn>
            </AuthContainer>
          )}

          {/* Removed cart button from mobile menu */}

          {user && <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>}
        </MobileMenuContainer>

        {/* Desktop menu */}
        <DesktopMenuContainer>
          <NavLinks>
            <StyledLink to="/" active={location.pathname === "/"}>
              Home
            </StyledLink>
            <StyledLink to="/about" active={location.pathname === "/about"}>
              About Us
            </StyledLink>
            <StyledLink to="/contact" active={location.pathname === "/contact"}>
              Contact Us
            </StyledLink>
          </NavLinks>

          {!user && (
            <AuthContainer>
              <AuthBtn to="/login">Login</AuthBtn>
              <AuthBtn to="/signup">Signup</AuthBtn>
            </AuthContainer>
          )}

          <CartBtn onClick={handleCartClick} aria-label="Cart" title="Cart">
            <CartIcon>
              <svg
                width="23"
                height="23"
                viewBox="0 0 27 27"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="12" cy="23" r="1.6" fill="#a89168" />
                <circle cx="21" cy="23" r="1.6" fill="#a89168" />
                <path
                  d="M4 5h2.6l2.1 11.5a2 2 0 0 0 2 1.5h7.5a2 2 0 0 0 2-1.6L22 8.7a1 1 0 0 0-1-1.2H7.1"
                  stroke="#fff"
                  strokeWidth="1.6"
                  fill="none"
                />
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
