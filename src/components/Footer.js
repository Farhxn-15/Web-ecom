import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// --- SVG ICONS (customizable, all accessible) ---
const icons = {
  instagram: (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="9" fill="#fff" />
      <circle cx="16" cy="16" r="7.5" stroke="#BB5E4E" strokeWidth="2" />
      <circle cx="16" cy="16" r="4" fill="#BB5E4E" />
      <circle cx="23" cy="10" r="1.6" fill="#BB5E4E" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="9" fill="#fff" />
      <path d="M20.5 12h-2c-.8 0-1.5.5-1.5 1.5v2h3l-.6 3h-2.4V24h-3v-5.5h-2V16h2v-1.5C14 12.7 15.7 11 18 11h2.5v3z" fill="#226944" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="9" fill="#fff" />
      <rect x="8" y="12" width="16" height="10" rx="2.5" fill="#BB2D2D" />
      <polygon points="17,15 21,16.9 17,18.8" fill="#fff" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="9" fill="#fff" />
      <circle cx="16" cy="16" r="7" fill="#33C135" />
      <path d="M19 18.3c-.29-.13-1.33-.65-1.54-.72-.21-.07-.35-.11-.5.11-.14.18-.55.77-.68.91-.12.14-.25.16-.47.05-1.25-.63-2.08-2.23-2.16-2.34-.08-.13-.01-.17.09-.21.1-.05.23-.12.34-.19.11-.07.16-.12.22-.2.07-.09.04-.16 0-.23-.04-.11-.45-1.09-.45-1.12-.06-.14-.13-.12-.18-.12h-.15c-.05 0-.14.02-.21.09s-.27.27-.27.67c0 .39.27.78.31.83.04.05.54.86 1.3 1.17.19.07.32.12.44.07.13-.06.22-.2.27-.28.07-.12.14-.24.19-.34.05-.09.1-.1.15-.07.04.02.83.43.96.49.13.07.23.1.26.17.04.09.03.18-.02.3-.06.12-.16.28-.31.46Z" fill="#fff" />
    </svg>
  ),
  gmail: (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect width="32" height="32" rx="9" fill="#fff" />
      <rect x="7" y="12" width="18" height="8" rx="2" fill="#BB7D0A" />
      <polyline points="7,15 16,21 25,15" fill="none" stroke="#fff" strokeWidth="1.6"/>
    </svg>
  ),
};

// --- Styled Footer ---
const FooterSection = styled.footer`
  background: #2C4722;
  color: #f5f4f0;
  font-family: 'Poppins', Arial, sans-serif;
  width: 100%;
  padding: 2.8rem 0 0.6rem 0;
  margin-top: auto;
`;

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1.3rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.1rem;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 1.3rem;
    text-align: center;
  }
`;

const SiteInfo = styled.div`
  display: flex; flex-direction: column; gap: 0.62em;
  font-size: 1rem;
`;

const SiteName = styled.div`
  font-size: 1.33rem;
  font-weight: 800;
  color: #E9C46A;
  letter-spacing: 0.04em;
`;

const Description = styled.div`
  color: #eed;
  line-height: 1.58;
  font-size: 0.99rem;
`;

const FooterLinks = styled.div`
  display: flex; flex-direction: column; gap: 0.45em;
  a {
    text-decoration: none;
    color: #f5f4f0cc;
    font-weight: 500;
    font-size: 1.01rem;
    transition: color .15s;
    &:hover,
    &:focus {
      color: #E9C46A;
      text-decoration: underline;
    }
  }
`;

const SocialRow = styled.div`
  display: flex; flex-direction: row; gap: 0.6em; margin-top: 0.15em;
  justify-content: flex-start;
  @media (max-width: 650px) { justify-content: center; }
`;

const IconLink = styled.a`
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 50%; padding: 0.37em;
  background: #293A18;
  transition: transform 0.16s, box-shadow 0.21s, background 0.13s;
  margin-right: 0.08em;
  &:hover, &:focus {
    background: #4F684E;
    transform: scale(1.14) translateY(-2px);
    box-shadow: 0 5px 18px #99ad7232;
  }
`;

const Contact = styled.div`
  font-size: 1rem;
  color: #ffeab0;
  line-height: 1.6;
  div {
    display: flex; align-items: center; gap: 0.3em;
    margin-bottom: 0.35em;
  }
  a {
    color: #f5f4f0cc;
    text-decoration: none;
    transition: color .14s; font-weight:600;
    &:hover {color: #E9C46A; text-decoration: underline;}
  }
`;

const Location = styled.div`
  color: #d4c49c; font-size: 0.99rem; margin-top: 0.21em;
`;

const BottomRow = styled.div`
  width: 100%; text-align: center;
  color: #dbd2b6; font-size: 0.96rem; font-weight: 500;
  padding: 1.5em 0 0.14em 0; border-top: 1px solid #3a6131;
  margin-top: 1.8em;
  display: flex; flex-direction: column; align-items: center; gap: 0.19em;
`;

const Policies = styled.div`
  display: inline-flex; gap: 1.1em;
  a {
    color: #e5e0d0cc; font-size: 0.97em; text-decoration: none; transition: color .13s;
    &:hover {color: #E9C46A;}
  }
`;

// --- Main Footer Component ---
export default function Footer() {
  return (
    <FooterSection>
      <Container>
        {/* Site Info */}
        <SiteInfo>
          <SiteName>Samrin Organic Mehndi</SiteName>
          <Description>
            Authentic, handmade organic mehndi directly from nature.  <br />
            Bringing pure, vibrant color and tradition to every celebration.
          </Description>
        </SiteInfo>

        {/* Quick Links */}
        <FooterLinks>
          <strong style={{color:"#ffc", fontSize:"1.07em", marginBottom:"0.3em"}}>Quick Links</strong>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/#products">Products</Link>
        </FooterLinks>

        {/* Social Media */}
        <div>
          <strong style={{color:"#ffc", fontSize:"1.07em", marginBottom:"0.38em"}}>Follow Us</strong>
          <SocialRow>
            <IconLink
              href="https://instagram.com/yourpage"
              target="_blank"
              aria-label="Instagram"
              rel="noopener noreferrer"
            >{icons.instagram}</IconLink>
            <IconLink
              href="https://www.facebook.com/share/1B9P5ENcWx/"
              target="_blank"
              aria-label="Facebook"
              rel="noopener noreferrer"
            >{icons.facebook}</IconLink>
            <IconLink
              href="https://youtube.com/yourchannel"
              target="_blank"
              aria-label="YouTube"
              rel="noopener noreferrer"
            >{icons.youtube}</IconLink>
            <IconLink
              href="https://wa.me/yourphonenumber"
              target="_blank"
              aria-label="WhatsApp"
              rel="noopener noreferrer"
            >{icons.whatsapp}</IconLink>
            <IconLink
              href="mailto:samrinmehnadiart@gmail.com"
              aria-label="Email"
            >{icons.gmail}</IconLink>
          </SocialRow>
        </div>

        {/* Contact Info */}
        <Contact>
          <strong style={{color:"#ffc", fontSize:"1.07em", marginBottom:"0.28em"}}>Contact</strong>
          <div>
            <svg width="19" height="19" viewBox="0 0 19 19" style={{marginRight:3}} fill="none">
              <path d="M4 5L14.3 9.5L4 14V5Z" fill="#e9c46a"/><rect x="2" y="3" width="15" height="13" rx="2.3" stroke="#bb7d0a" strokeWidth="1.5"/>
            </svg>
            <a href="mailto:yourmail@gmail.com">samrinmehnadiart@gmail.com</a>
          </div>
          <div>
            <svg width="17" height="17" fill="none"><path d="M5.7 3.5A2 2 0 0 1 7.35 3H11.7A2 2 0 0 1 13.3 3.5L15.6 5.8C16 6.17 16 6.79 15.6 7.16l-1.66 1.62A2.08 2.08 0 0 1 12.7 9.5c0 1.69 1.06 3.05 2.3 3.54l1.65.73c.41.18.4.81-.03 1.03L13 15.6c-.57.29-1.22.4-1.86.31-5.23-.91-8.37-5.48-7.46-10.77.09-.53.51-.95 1.04-1.03Z" stroke="#bb7d0a" strokeWidth="1.2" /></svg>
            <a href="tel:+91XXXXXXXXXX">+91-7295077585</a>
          </div>
          <Location>
            <svg width="17" height="17" fill="none"><path d="M8.5 15L7 13.3C4.14 10.02 2 7.86 2 5.5A6.5 6.5 0 0 1 15 5.5c0 2.36-2.14 4.52-5 7.8L8.5 15Z" stroke="#bb7d0a" strokeWidth="1.3"/><circle cx="8.5" cy="6" r="2" fill="#E9C46A"/></svg>
            Gaya, Bihar, India
          </Location>
        </Contact>
      </Container>
      <BottomRow>
        <div>
          © 2025 OrganicMehndi. All rights reserved.
         </div>
        <Policies>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </Policies>
      </BottomRow>
    </FooterSection>
  );
}
