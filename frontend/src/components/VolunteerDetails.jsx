import React from "react";

const VolunteerDetails = ({ volunteer, onEdit, onBack }) => {
  if (!volunteer) {
    return <p>No volunteer details available.</p>;
  }

  return (
    <div className="volunteer-details">
      <h2>Volunteer Details</h2>
      <p><strong>Name:</strong> {volunteer.name}</p>
      <p><strong>Contact:</strong> {volunteer.contact}</p>
      <p><strong>Availability:</strong> {volunteer.availability}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default VolunteerDetails;