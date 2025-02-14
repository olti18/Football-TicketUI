import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/AuthForm.css";

const AuthForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/football-ticket/auth/register",
        new URLSearchParams({
          username: formData.username,
          password: formData.password,
          email: formData.email
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      setMessage(response.data.message || "Registration successful!");
      setIsSuccess(true);
      setTimeout(() => setIsLogin(true), 1500);
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setMessage(error.response?.data?.error || "Registration failed!");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/football-ticket/auth/login",
        new URLSearchParams({
          username: formData.username,
          password: formData.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setMessage("Login successful!");
      setIsSuccess(true);
      Cookies.set("token", response.data.access_token, { expires: 7 });
      onLogin();
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed!");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <input
          className="input-field"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        {!isLogin && (
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        )}
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <button
          className={`button ${isLoading ? "loading" : ""}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
      </form>
      {message && (
        <p className={`message ${isSuccess ? "success" : "error"}`}>
          {message}
        </p>
      )}
      <button
        className="toggle-button"
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
          setFormData({ username: "", password: "", email: "" });
        }}
        disabled={isLoading}
      >
        {isLogin
          ? "Need an account? Sign Up"
          : "Already have an account? Sign In"}
      </button>
    </div>
  );
};

export default AuthForm;
