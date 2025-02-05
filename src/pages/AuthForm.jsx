import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import FormWrapper from "../components/FormWrapper";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ToggleButton from "../components/ToggleButton";

const AuthForm = () => {
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
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed!");
      setIsSuccess(false);
    }
  };

  return (
    <FormWrapper>
      <h1>{isLogin ? "User Login" : "User Registration"}</h1>
      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <InputField type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        {!isLogin && <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />}
        <InputField type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">{isLogin ? "Login" : "Register"}</Button>
      </form>
      {message && <p style={{ color: isSuccess ? "green" : "red" }}>{message}</p>}
      <ToggleButton onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </ToggleButton>
    </FormWrapper>
  );
};

export default AuthForm;
