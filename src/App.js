import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Signup from './pages/Signup';
import Login from './pages/Login';
import styled, { createGlobalStyle } from 'styled-components';
import AdminApp from './admin/AdminApp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

// --- Auth Guard Wrapper ---
function RequireAuth({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("mehndi_loggedin_user") || "null");
  if (!user) {
    // Save where the user tried to go, to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}

// --- Global Styling ---
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', Arial, sans-serif;
    background: #f5f4f0;
    color: #2e4d25;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Signup/Login routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected payment/checkout: only accessible when logged in */}
          <Route 
            path="/payment" 
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            } 
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
