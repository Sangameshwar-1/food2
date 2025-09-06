import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
        if (!token) {
          throw new Error("No authentication token found");
        }

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>Welcome, {user.name || "User"}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserPage;