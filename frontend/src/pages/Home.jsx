const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess(""); // Clear success message on new submit

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

    // Set success message and navigate to the user page on successful login
    setSuccess(isLogin ? "Login successful!" : "Registration successful!");
    if (isLogin) {
      console.log("User ID:", data.id); // Print user ID
      console.log("User Data:", data); // Print user data
      navigate("/user"); // Navigate to the user page
    } else {
      alert("Registration successful! Please log in.");
      setIsLogin(true); // Switch to login mode after registration
    }
  } catch (err) {
    setError(err.message || "An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }
};
