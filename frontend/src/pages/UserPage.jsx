import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("light");
  const [view, setView] = useState("main"); // 'main', 'donorForm', 'donorDetails', 'volunteer'

  // Fetch current user info from backend (session/JWT)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Fetch donor info if user is logged in
  useEffect(() => {
    const fetchDonor = async () => {
      if (user) {
        try {
          const res = await axios.get("/api/donors/me");
          setDonor(res.data);
        } catch (err) {
          console.error("Error fetching donor:", err);
          setDonor(null);
        }
      }
    };
    fetchDonor();
  }, [user]);

  // Toggle dark/light mode
  const toggleDark = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    document.body.classList.toggle("dark-mode");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      window.location.href = "/";
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  // Submit donor form
  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      dob: form.dob.value,
      weight: form.weight.value,
      bloodType: form.bloodType.value,
      contact: form.contact.value,
      address: form.address.value,
      district: form.district.value,
      lat: form.lat?.value,
      lng: form.lng?.value,
    };

    try {
      await axios.post("/api/donors", data);
      setView("donorDetails");
      const res = await axios.get("/api/donors/me");
      setDonor(res.data);
    } catch (err) {
      console.error("Error submitting donor form:", err);
    }
  };

  // Submit volunteer form
  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.volunteerName.value,
      email: form.volunteerEmail.value,
      contact: form.volunteerContact.value,
      address: form.volunteerAddress.value,
      district: form.volunteerDistrict.value,
      skills: form.volunteerSkills.value,
      lat: form.lat?.value,
      lng: form.lng?.value,
    };

    try {
      await axios.post("/api/volunteers", data);
      setView("main");
    } catch (err) {
      console.error("Error submitting volunteer form:", err);
    }
  };

  // Main UI
  if (loading) return <div>Loading...</div>;

  return (
    <div className={mode === "dark" ? "dark-mode" : ""}>
      <button className="toggle" onClick={toggleDark}>
        {mode === "light" ? "Light Mode" : "Dark Mode"}
      </button>
      <header>
        <nav>
          <ul>
            <li className="user-info" id="user-info">
              {user ? (
                <>
                  Logged in as: {user.email}
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      background: "#4caf50",
                      borderRadius: "50%",
                      marginLeft: 6,
                      verticalAlign: "middle",
                    }}
                    title="Online"
                  ></span>
                </>
              ) : (
                "Not logged in"
              )}
            </li>
            <li>
              <a href="/game">Play the Game</a>
            </li>
            <li>
              <button id="logoutButton" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container">
        {view === "main" && (
          <>
            <h1>Donor Management System</h1>
            <button
              className="adddonor"
              onClick={donor ? () => setView("donorDetails") : () => setView("donorForm")}
            >
              {donor ? "View Donor" : "Add Donor"}
            </button>
            <button
              className="adddonor"
              onClick={() => setView("volunteer")}
              style={{ marginTop: 7 }}
            >
              Volunteer
            </button>
          </>
        )}

        {/* Donor Form */}
        {view === "donorForm" && (
          <form id="donorForm" onSubmit={handleDonorSubmit}>
            <button
              className="adddonor"
              type="button"
              onClick={() => setView("main")}
            >
              Go Back
            </button>
            <input type="text" name="name" placeholder="Name" required />
            <input type="date" name="dob" placeholder="Date of Birth" required />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              min="40"
              required
            />
            <select name="bloodType" required>
              <option value="" disabled>
                Select Blood Type
              </option>
              <option value="A+">A+ve</option>
              <option value="A-">A-ve</option>
              <option value="B+">B+ve</option>
              <option value="B-">B-ve</option>
              <option value="AB+">AB+ve</option>
              <option value="AB-">AB-ve</option>
              <option value="O+">O+ve</option>
              <option value="O-">O-ve</option>
            </select>
            <input type="text" name="contact" placeholder="Contact Number" required />
            <input type="text" name="address" placeholder="Address" required />
            <input type="text" name="district" placeholder="District" required />
            <button type="submit" className="adddonor">
              Add Donor
            </button>
          </form>
        )}

        {/* Donor Details */}
        {view === "donorDetails" && donor && (
          <div className="donor-details">
            <button
              className="adddonor"
              onClick={() => setView("main")}
            >
              Go Back
            </button>
            <h2>Your Donor Submission</h2>
            <p>Name: {donor.name}</p>
            <p>Date of Birth: {donor.dob}</p>
            <p>Weight: {donor.weight} kg</p>
            <p>Blood Type: {donor.bloodType}</p>
            <p>Contact: {donor.contact}</p>
            <p>Address: {donor.address}</p>
            <p>District: {donor.district}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;