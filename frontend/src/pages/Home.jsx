import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(""); // New state for success message
  const [userData, setUserData] = useState(null); // State to store user data

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(""); // Clear success message on new submit
    setUserData(null); // Clear previous user data

    // Validate inputs
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
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Parse the response
      const data = await response.json();

      // Check if the response is not OK
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      // Set success message and user data
      setSuccess(isLogin ? "Login successful!" : "Registration successful!");
      setUserData(data.user); // Assuming the API returns user data in `data.user`
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
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
          aria-label="Email"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          required
          value={form.password}
          onChange={handleChange}
          aria-label="Password"
        />
        <button type="submit" id="auth-button" disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      {error && <div className="error-message" id="error-message">{error}</div>}
      {success && <div className="success-message" id="success-message">{success}</div>}
      {userData && (
        <div className="user-data" id="user-data">
          <h3>User Details:</h3>
          <p>ID: {userData.id}</p>
          <p>Email: {userData.email}</p>
          {/* Add more user details here if needed */}
        </div>
      )}
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