import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; // Adjust if your path is different

const Box = styled.div`
  max-width: 370px;
  margin: 2.5rem auto;
  background: #eceadd;
  border-radius: 1.15rem;
  box-shadow: 0 2px 12px #695f2120;
  padding: 2.2rem 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;

  @media (max-width: 480px) {
    padding: 1.8rem 1.3rem 2rem;
    margin: 2rem 1rem;
  }
`;

const Heading = styled.h2`
  color: #40652a;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.8rem;

  @media (max-width: 480px) {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.08rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

const Label = styled.label`
  color: #7d7c41;
  font-weight: 600;
  margin-bottom: 0.25em;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  background: #fffdf7;
  border: 1px solid #b9b08a;
  border-radius: 0.55em;
  font-size: 1.03rem;
  padding: 0.59em 0.9em;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #a89168;
    box-shadow: 0 0 3px 2px #b5af7d8a;
  }

  &:disabled {
    background-color: #f0f0df;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.53em 0.8em;
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg,#40652a 60%,#a89168 100%);
  color: #fffdf0;
  border: none;
  border-radius: 0.51em;
  font-size: 1.09rem;
  font-weight: 600;
  padding: 0.77em 0;
  margin-top: 0.2em;
  cursor: pointer;
  transition: background 0.3s, opacity 0.3s;

  &:hover:not(:disabled) {
    background: linear-gradient(90deg,#4c7835 70%,#b5996c 100%);
  }

  &:focus {
    outline: 3px solid #b5af7d8a;
    outline-offset: 1px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.65em 0;
  }
`;

const Error = styled.div`
  color: #c33d3d;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.3em;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Success = styled.div`
  color: #37682c;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.3em;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 0.5em;
  font-size: 0.95rem;

  a {
    color: #40652a;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;

    &:hover,
    &:focus {
      color: #2e4315;
      outline: none;
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export default function Signup() {
  const nav = useNavigate();
  const [fields, setFields] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!fields.fullName || !fields.email || !fields.password || !fields.phone) {
      setError("Please fill all fields."); 
      return;
    }
    if (fields.password.length < 5) {
      setError("Password must be at least 5 characters."); 
      return;
    }
    if (fields.password !== fields.confirm) {
      setError("Passwords do not match."); 
      return;
    }
    setLoading(true);
    try {
      // Create user in Firebase Auth
      const result = await createUserWithEmailAndPassword(
        auth,
        fields.email,
        fields.password
      );
      // Save full name to Firebase profile
      await updateProfile(result.user, { displayName: fields.fullName });
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => nav("/login"), 1300);
    } catch (e) {
      let msg = "Signup failed.";
      if (e.code === "auth/email-already-in-use") msg = "This email is already registered.";
      else if (e.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (e.code === "auth/weak-password") msg = "Choose a stronger password.";
      setError(msg);
    }
    setLoading(false);
  }

  return (
    <Box>
      <Heading>Create Account</Heading>
      {error && <Error>{error}</Error>}
      {success && <Success>{success}</Success>}
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Field>
          <Label htmlFor="signup-fullname">Full Name</Label>
          <Input
            id="signup-fullname"
            name="fullName"
            value={fields.fullName}
            onChange={handleChange}
            autoFocus
            required
            disabled={loading}
          />
        </Field>
        <Field>
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Field>
        <Field>
          <Label htmlFor="signup-phone">Phone Number</Label>
          <Input
            id="signup-phone"
            name="phone"
            type="tel"
            value={fields.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Field>
        <Field>
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            name="password"
            type="password"
            value={fields.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Field>
        <Field>
          <Label htmlFor="signup-confirm">Confirm Password</Label>
          <Input
            id="signup-confirm"
            name="confirm"
            type="password"
            value={fields.confirm}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Field>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </Form>
      <LoginPrompt>
        Already have an account?{" "}
        <Link to="/login">Log in</Link>
      </LoginPrompt>
    </Box>
  );
}
