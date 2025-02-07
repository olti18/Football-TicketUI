import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Tickets from "./pages/Tickets";
import AuthForm from "./pages/AuthForm";

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
      <nav>
        <Link to="/tickets">View Tickets</Link>
      </nav>
      <Routes>
        <Route
          path="/tickets"
          element={
            isAuthenticated ? (
              <Tickets />
            ) : (
              <Container>
                <AuthForm onLogin={handleLogin} />
              </Container>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
