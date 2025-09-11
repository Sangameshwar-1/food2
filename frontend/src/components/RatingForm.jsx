import React, { useState } from "react";
import "../styles/Rating.css";

const RatingForm = () => {
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rating Submitted:", { rating, feedback });
    alert("Thank you for your feedback!");
    setRating("");
    setFeedback("");
  };

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      <h2>Rate Us</h2>
      <select value={rating} onChange={(e) => setRating(e.target.value)} required>
        <option value="" disabled>Select Rating</option>
        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
        <option value="4">⭐⭐⭐⭐ Very Good</option>
        <option value="3">⭐⭐⭐ Good</option>
        <option value="2">⭐⭐ Fair</option>
        <option value="1">⭐ Poor</option>
      </select>
      <textarea placeholder="Your feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      <button type="submit">Submit Feedback</button>
    </form>
  );
};

export default RatingForm;
