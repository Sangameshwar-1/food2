import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Replace with your backend API
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");
      // Redirect on success (example: user page)
      window.location.href = "/user";
    } catch (err) {
      setError(err.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" id="login-container">
      <h2 id="form-title">{isLogin ? "Login" : "Sign Up"}</h2>
      <form id="auth-form" onSubmit={handleSubmit}>
        <p>Use email: test@gmail.com</p>
        <p>Password: 123456</p>
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
      <div className="reset-link" id="reset-link">Forgot Password?</div>
      <div
        className="toggle-link"
        id="toggle-link"
        onClick={() => setIsLogin(!isLogin)}
        style={{ cursor: "pointer" }}
      >
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </div>
    </div>
  );
}