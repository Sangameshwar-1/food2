import React from "react";

const DonorDetails = ({ donor, onEdit, onBack }) => {
  if (!donor) {
    return <p>No donor details available.</p>;
  }

  return (
    <div className="donor-details">
      <h2>Donor Details</h2>
      <p><strong>Name:</strong> {donor.name}</p>
      <p><strong>Date of Birth:</strong> {new Date(donor.dob).toLocaleDateString()}</p>
      <p><strong>Weight:</strong> {donor.weight} kg</p>
      <p><strong>Blood Type:</strong> {donor.bloodType}</p>
      <p><strong>Contact:</strong> {donor.contact}</p>
      <p><strong>Address:</strong> {donor.address}</p>
      <p><strong>District:</strong> {donor.district}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default DonorDetails;