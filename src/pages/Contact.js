import React, { useState } from "react";
import styled from "styled-components";

// SOCIAL CONTACTS (update with real links)
const CONTACT_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/creative_world1301/",
    color: "#E1306C",
    icon: (
      <svg width="34" height="34" viewBox="0 0 60 60" fill="none" aria-hidden="true" focusable="false">
        <rect width="60" height="60" rx="16" fill="#fff"/>
        <circle cx="30" cy="30" r="13" stroke="#E1306C" strokeWidth="3"/>
        <circle cx="30" cy="30" r="7.5" fill="#E1306C"/>
        <circle cx="43" cy="17" r="2.6" fill="#E1306C"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1B9P5ENcWx/",
    color: "#1877F3",
    icon: (
      <svg width="34" height="34" viewBox="0 0 60 60" fill="none" aria-hidden="true" focusable="false">
        <rect width="60" height="60" rx="16" fill="#fff"/>
        <path d="M38.5 21h-3c-1.29 0-2.5.8-2.5 2.38v3.12h5l-.74 4.5h-4.26V39h-5V31h-4v-4.5h4v-3.1C28.5 20.13 31.11 17 35.38 17H39v4z" fill="#1877F3"/>
      </svg>
    )
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@samrinmehndiart",
    color: "#FF0000",
    icon: (
      <svg width="34" height="34" viewBox="0 0 60 60" fill="none" aria-hidden="true" focusable="false">
        <rect width="60" height="60" rx="16" fill="#fff"/>
        <rect x="17" y="21" width="26" height="18" rx="6" fill="#FF0000"/>
        <polygon points="31,27 39,30 31,33" fill="#fff"/>
      </svg>
    )
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/7295077585",
    color: "#25D366",
    icon: (
      <svg width="34" height="34" viewBox="0 0 60 60" fill="none" aria-hidden="true" focusable="false">
        <rect width="60" height="60" rx="16" fill="#fff"/>
        <circle cx="30" cy="30" r="13" fill="#25D366"/>
        <path d="M35 33.4c-.42-.2-2.45-1.2-2.83-1.34-.38-.12-.65-.2-.93.21-.26.39-.99 1.34-1.22 1.61-.22.25-.45.28-.84.09-2.31-1.16-3.84-4.13-3.97-4.33-.13-.2-.02-.3.18-.39.18-.08.4-.22.6-.35.21-.13.28-.22.4-.36.13-.16.07-.3 0-.43-.09-.2-.83-2-.83-2.06-.11-.25-.23-.21-.33-.22h-.27c-.1 0-.25.03-.39.16s-.5.5-.5 1.21c0 .7.51 1.4.58 1.5.07.09 1 1.56 2.42 2.12.34.13.6.21.81.13.25-.1.41-.36.5-.5.13-.21.26-.43.36-.6.09-.17.19-.18.29-.12.07.04 1.54.77 1.78.89.25.13.42.19.48.3s.06.33-.03.56c-.1.22-.29.51-.58.83Z" fill="#fff"/>
      </svg>
    )
  },
  {
    name: "Gmail",
    url: "mailto:samrinmehnadiart@gmail.com",
    color: "#D14836",
    icon: (
      <svg width="34" height="34" viewBox="0 0 60 60" fill="none" aria-hidden="true" focusable="false">
        <rect width="60" height="60" rx="16" fill="#fff"/>
        <rect x="15" y="21" width="30" height="18" rx="4" fill="#D14836"/>
        <polyline points="15,25 30,36 45,25" fill="none" stroke="#fff" strokeWidth="2.5"/>
      </svg>
    )
  }
];

// Styled Components
const Page = styled.section`
  background: #f5f4f0;
  min-height: 100vh;
  font-family: 'Poppins', Arial, sans-serif;
`;

const MainBox = styled.div`
  max-width: 540px;
  margin: 3rem auto 2.5rem;
  padding: 2.2rem 1.4rem 2.5rem;
  border-radius: 1.25rem;
  background: #eceadd;
  box-shadow: 0 1px 12px rgba(104,96,48,0.07);

  @media (max-width: 480px) {
    padding: 1.6rem 1rem 2rem;
    margin: 2rem 1rem 2rem;
  }
`;

const Heading = styled.h2`
  color: #40652a;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  text-align: center;
  letter-spacing: 0.01em;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }
`;

const Subtext = styled.div`
  color: #6d6c49;
  text-align: center;
  margin-bottom: 2.3rem;
  font-size: 1.05rem;

  @media (max-width: 480px) {
    font-size: 0.92rem;
    margin-bottom: 1.7rem;
  }
`;

const IconsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2.5rem;

  @media (max-width: 690px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem 1.9rem;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const IconBox = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  background: #f7f6e8;
  border-radius: 1.1rem;
  padding: 1rem 0.6rem 0.7rem;
  box-shadow: 0 1.8px 10px rgba(172,141,70,0.06);
  transition: transform 0.16s, box-shadow 0.23s;
  outline: none;
  will-change: transform;

  &:hover,
  &:focus {
    transform: scale(1.07);
    box-shadow: 0 5px 18px ${({color}) => color + "36"};
  }

  /* Make tap area bigger */
  @media (max-width: 690px) {
    padding: 1.1rem 0.8rem 0.8rem;
  }
`;

const Label = styled.div`
  margin-top: 0.5em;
  color: #58441f;
  font-weight: 600;
  font-size: 1.03rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  margin-top: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.67rem 0.98rem;
  border-radius: 0.54rem;
  border: 1px solid #b9b08a;
  background: #fffdf7;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #a89168;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.7rem 0.98rem;
  border-radius: 0.54rem;
  border: 1px solid #b9b08a;
  background: #fffdf7;
  font-size: 1rem;
  resize: vertical;
  min-height: 88px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #a89168;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #40652a, #a89168);
  color: #fffdf0;
  padding: 0.8rem 0;
  font-size: 1.07rem;
  font-weight: 600;
  border: none;
  border-radius: 0.55em;
  cursor: pointer;
  margin-top: 0.14em;
  transition: background 0.14s;

  &:hover,
  &:focus {
    background: linear-gradient(90deg, #4b7a30, #b49d6f);
    outline: none;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.7rem 0;
  }
`;

const SuccessMsg = styled.div`
  margin-top: 1.7rem;
  color: #40652a;
  background: #e0ead4;
  border-radius: 0.7rem;
  padding: 1.1rem 0.8rem;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.92rem;
    padding: 0.9rem 0.7rem;
  }
`;

// Main Component
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <Page>
      <MainBox>
        <Heading>Get in Touch</Heading>
        <Subtext>We’d love to hear from you!</Subtext>

        {/* Contact Icons */}
        <IconsRow>
          {CONTACT_LINKS.map(c => (
            <IconBox
              key={c.name}
              href={c.url.startsWith("mailto:") ? c.url : undefined}
              onClick={c.url.startsWith("mailto:") ? undefined : () => window.open(c.url, "_blank", "noopener,noreferrer")}
              role="link"
              tabIndex={0}
              aria-label={c.name}
              color={c.color}
            >
              {c.icon}
              <Label>{c.name}</Label>
            </IconBox>
          ))}
        </IconsRow>

        {/* Optional Contact Form */}
        <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
          {!submitted ? (
            <>
              <Field>
                <label htmlFor="name" style={{ color: "#7a7a3a", fontWeight: 500 }}>Name</label>
                <Input id="name" name="name" required />
              </Field>
              <Field>
                <label htmlFor="email" style={{ color: "#7a7a3a", fontWeight: 500 }}>Email</label>
                <Input id="email" name="email" type="email" required />
              </Field>
              <Field>
                <label htmlFor="message" style={{ color: "#7a7a3a", fontWeight: 500 }}>Message</label>
                <TextArea id="message" name="message" rows={4} required />
              </Field>
              <Button type="submit">Send Message</Button>
            </>
          ) : (
            <SuccessMsg>
              Thank you! We’ve received your message and will get back to you soon 🌱
            </SuccessMsg>
          )}
        </Form>
      </MainBox>
    </Page>
  );
}
