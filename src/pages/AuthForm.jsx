import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/AuthForm.css";

const AuthForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/football-ticket/auth/register", {
        username,
        password,
        email,
      });
      setMessage(response.data.message);
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed!");
      setIsSuccess(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/football-ticket/auth/login",
        new URLSearchParams({ username, password }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      setMessage("Login successful!");
      setIsSuccess(true);
      Cookies.set("token", response.data.access_token, { expires: 7 });
      onLogin(); // Call the onLogin prop to update the authentication status
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed!");
      setIsSuccess(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h1>{isLogin ? "User Login" : "User Registration"}</h1>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <input
          className="input-field"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isLogin && (
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      {message && (
        <p className={`message ${isSuccess ? "success" : "error"}`}>
          {message}
        </p>
      )}
      <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default AuthForm;
