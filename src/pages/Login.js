import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // 🛑 adjust if your path is different

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
  background: linear-gradient(90deg, #40652a 60%, #a89168 100%);
  color: #fffdf0;
  border: none;
  border-radius: 0.51em;
  font-size: 1.08rem;
  font-weight: 600;
  padding: 0.77em 0;
  margin-top: 0.2em;
  cursor: pointer;
  transition: background 0.3s, opacity 0.3s;

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #4c7835 70%, #b5996c 100%);
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

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 0.6em;
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

export default function Login() {
  const nav = useNavigate();
  const location = useLocation();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const from = location.state?.from || "/payment";

  function handleChange(e) {
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        fields.email,
        fields.password
      );
      // Save user session
      localStorage.setItem(
        "mehndi_loggedin_user",
        JSON.stringify({
          email: result.user.email,
          uid: result.user.uid,
        })
      );
      nav(from, { replace: true });
    } catch (e) {
      setError("Wrong email or password.");
    }
    setLoading(false);
  }

  return (
    <Box>
      <Heading>Login</Heading>
      {error && <Error>{error}</Error>}
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={fields.email}
            onChange={handleChange}
            autoFocus
            required
            disabled={loading}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={fields.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </Field>
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <SignupPrompt>
        Don&#39;t have an account?{" "}
        <Link to="/signup">Sign up</Link>
      </SignupPrompt>
    </Box>
  );
}
