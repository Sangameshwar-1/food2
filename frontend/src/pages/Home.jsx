import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // Include cookies in the request
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
  
      if (isLogin) {
        setSuccess("Login successful!");
        localStorage.setItem("token", data.token);
        console.log("Token stored in localStorage:", localStorage.getItem("token")); // Debugging token storage
        setForm({ email: data.email, password: "" });
        navigate("../user");
      } else {
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default Home;