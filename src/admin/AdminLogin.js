import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'; // adjust path if needed

// Add your allowed admin emails here
const ADMIN_EMAILS = [
  "farhanmallick00@gmail.com",
  "admin2@gmail.com",
  // add more emails as needed
];

export default function AdminLogin({ setUser }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Firebase Auth sign in
      const res = await signInWithEmailAndPassword(auth, email.trim(), pw);

      // Check if email belongs to admin
      if (!ADMIN_EMAILS.includes(res.user.email)) {
        setError("Access denied: You are not authorized as an admin.");
        setLoading(false);
        // Optionally, sign out the user here if you want:
        // await auth.signOut();
        return;
      }

      // Store session (for your dashboard logic)
      localStorage.setItem('mehndi_admin_user', JSON.stringify({
        email: res.user.email,
        uid: res.user.uid
      }));

      setUser({ email: res.user.email, uid: res.user.uid });
      navigate('/admin/products');

    } catch (err) {
      setError("Incorrect email or password");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f4f0]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-7 rounded-lg shadow-lg w-[330px] flex flex-col gap-5"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-[#40652a] text-center">
          Admin Login
        </h2>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <input
          placeholder="Email"
          autoFocus
          type="email"
          className="border rounded px-3 py-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <div className="relative">
          <input
            placeholder="Password"
            type={showPw ? "text" : "password"}
            className="border rounded px-3 py-2 w-full"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
            disabled={loading}
          />
          <button
            type="button"
            tabIndex={-1}
            aria-label={showPw ? "Hide password" : "Show password"}
            onClick={() => setShowPw(v => !v)}
            style={{
              position: "absolute", right: 12, top: "50%",
              transform: "translateY(-50%)",
              background: "none", border: "none", color: "#bda062", fontSize: 17, cursor: "pointer", padding: 0
            }}
          >
            {showPw ? "🙈" : "👁️"}
          </button>
        </div>
        <button
          className="bg-[#40652a] text-white font-bold py-2 rounded hover:bg-[#2c4722] transition"
          disabled={loading}
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}
