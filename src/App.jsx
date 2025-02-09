import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Tickets from "./pages/Tickets";
import AuthForm from "./pages/AuthForm";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={isAuthenticated ? <Tickets /> : <Container><AuthForm onLogin={handleLogin} /></Container>} />
          <Route path="/my-tickets" element={isAuthenticated ? <Tickets /> : <Container><AuthForm onLogin={handleLogin} /></Container>} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Container><AuthForm onLogin={handleLogin} /></Container>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
