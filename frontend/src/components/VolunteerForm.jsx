import React, { useState } from "react";

const VolunteerForm = ({ onSubmit, onBack }) => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    availability: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form); // Pass the form data to the parent component
  };

  return (
    <div className="volunteer-form">
      <button onClick={onBack}>Go Back</button>
      <h2>Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability"
          value={form.availability}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VolunteerForm;