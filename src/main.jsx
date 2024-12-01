import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./theme.css";
import "./index.css";

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"; // Default to light theme
  document.documentElement.setAttribute("data-theme", savedTheme);
}

loadTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
