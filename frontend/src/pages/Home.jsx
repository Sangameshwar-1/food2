import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Response from backend:", data); // Debugging response

      if (!res.ok) throw new Error(data.message || "Authentication failed");

      if (isLogin) {
        localStorage.setItem("token", data.TOKEN); // Save the token (uppercase TOKEN)
        console.log("Token stored in localStorage:", localStorage.getItem("token")); // Debugging token storage
        navigate("/user");
      }
    } catch (err) {
      setError(err.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" id="auth-button" disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {error && <div className="error-message" id="error-message">{error}</div>}
      <div
        className="toggle-link"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </div>
    </div>
  );
}