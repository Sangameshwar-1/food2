import React from "react";

const ToggleThemeButton = ({ darkMode, setDarkMode }) => {
  return (
    <button
      className="toggle"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ToggleThemeButton;
