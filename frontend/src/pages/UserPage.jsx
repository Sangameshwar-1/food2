import React, { useState, useEffect } from "react";
import "./UserPage.css";
import DonorForm from "../components/DonorForm";
import DonorDetails from "../components/DonorDetails";
import VolunteerForm from "../components/VolunteerForm";
import RatingForm from "../components/RatingForm";
import ToggleThemeButton from "../components/ToggleThemeButton";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("main");
  const [darkMode, setDarkMode] = useState(true);
  const [donor, setDonor] = useState(null);


  const fetchUser = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };
  
    // Fetch donor details
    const fetchDonorDetails = async (userId) => {
      try {
        const response = await fetch(`/api/donors/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response");
        }
    
        const data = await response.json();
        console.log("Donor details fetched:", data);
        setDonor(data);
        setView("donorDetails");
      } catch (error) {
        console.error("Error fetching donor details:", error.message);
        alert("Error fetching donor details. Please try again.");
      }
    };
    useEffect(() => {
      fetchUser();
    }, []);

  const handleDonorSubmit = (formData) => {
    setDonor(formData);
    setView("donorDetails");
  };

  const handleVolunteerSubmit = (formData) => {
    console.log("Volunteer Registered:", formData);
    alert("Volunteer registered successfully!");
    setView("main");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={`user-page ${darkMode ? "dark-mode" : ""}`}>
      <ToggleThemeButton darkMode={darkMode} setDarkMode={setDarkMode} />

      <header>
        <nav>
          <ul>
            <li className="user-info">
              {user && user.email ? `Logged in as: ${user.email}` : "Not logged in"}
            </li>
            <li>
              <button className="adddonor" onClick={() => setView("main")}>
                Home
              </button>
            </li>
            <li>
              <button className="adddonor" onClick={() => setView("rating")}>
                Rate Us
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div className="user-page-container">
        {view === "main" && (
          <div className="container">
            <h1>Donor Management System</h1>
            <div>
            <button
              className="adddonor"
              onClick={() => {
                if (donor) {
                  setView("donorDetails");
                } else {
                  fetchDonorDetails(user._id); // Fetch donor details using the user's ID
                }
              }}
            >
              {donor ? "View Donor" : "Add Donor"}
            </button>
            </div>
            <div>
              <button
                className="adddonor"
                onClick={() => setView("volunteerForm")}
                style={{ marginTop: "7px" }}
              >
                Volunteer
              </button>
            </div>
            <div className="scrolling-text">
              <h3 style={{ color: "red", display: "inline" }}>**</h3>
              <h3 style={{ display: "inline" }}>Rate this web below</h3>
              <h3 style={{ color: "red", display: "inline" }}>**</h3>
            </div>
          </div>
        )}

        {view === "donorForm" && (
          <DonorForm onSubmit={handleDonorSubmit} onBack={() => setView("main")} />
        )}

        {view === "donorDetails" && donor && (
          <DonorDetails
            donor={donor}
            onEdit={() => setView("donorForm")}
            onBack={() => setView("main")}
          />
        )}

        {view === "volunteerForm" && (
          <VolunteerForm onSubmit={handleVolunteerSubmit} onBack={() => setView("main")} />
        )}

        {view === "rating" && <RatingForm />}
      </div>

      <footer>
        <p>&copy; GMC Vikarabad</p>
      </footer>
    </div>
  );
};

export default UserPage;