import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase'; // <- adjust path if needed

import AdminLogin from './AdminLogin';
import Dashboard from './Dashboard';

export default function AdminApp() {
  const [user, setUser] = useState(() => {
    // Try localStorage, fallback to current firebase auth state
    const session = JSON.parse(localStorage.getItem('mehndi_admin_user') || 'null');
    return session;
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Keep react state in sync with Firebase Auth and session
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, fbUser => {
      if (fbUser) {
        // Logged in: save to session/localStorage
        const sessionUser = { email: fbUser.email, uid: fbUser.uid };
        setUser(sessionUser);
        localStorage.setItem('mehndi_admin_user', JSON.stringify(sessionUser));
      } else {
        // Logged out: clear all and always go to login
        setUser(null);
        localStorage.removeItem('mehndi_admin_user');
        if (location.pathname !== "/admin/login") navigate("/admin/login", {replace:true});
      }
    });
    return () => unsub();
    // eslint-disable-next-line
  }, []);

  // Protect all admin routes except the login page
  if (!user && location.pathname !== "/admin/login") {
    return <Navigate to="/admin/login" replace />;
  }

  // Logout clears both session and Firebase Auth
  async function handleLogout() {
    await signOut(auth); // logs out in Firebase land
    setUser(null);
    localStorage.removeItem('mehndi_admin_user');
    navigate("/admin/login", {replace:true});
  }

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin setUser={setUser} />} />
      <Route path="/*" element={<Dashboard onLogout={handleLogout} />} />
    </Routes>
  );
}
