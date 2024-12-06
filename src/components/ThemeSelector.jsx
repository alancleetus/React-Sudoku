import { useState, useEffect } from "react";
import "../assets/styles/ThemeSelector.css";
import { themes } from "../constants/themesConstants";
export default function ThemeSelector() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [colorScheme, setColorScheme] = useState(
    localStorage.getItem("colorScheme") || "pink"
  );

  // Update theme or color scheme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-color-scheme", colorScheme);
    localStorage.setItem("colorScheme", colorScheme);
  }, [colorScheme]);

  return (
    <div>
      <h3>Choose Theme</h3>
      {/* Light/Dark Mode Toggle */}

      <div className="theme-selector">
        <button
          className={`theme-btn light ${theme === "light" ? "selected" : ""}`}
          style={{ backgroundColor: `white` }}
          onClick={() => setTheme("light")}
        >
          <span className="checkmark">✓</span>
        </button>
        <button
          className={`theme-btn dark ${theme === "dark" ? "selected" : ""}`}
          style={{ backgroundColor: `black` }}
          onClick={() => setTheme("dark")}
        >
          <span className="checkmark">✓</span>
        </button>
      </div>

      <h3>Choose Color Scheme</h3>
      <p>Select theme from below options</p>
      <div className="theme-selector">
        {themes.map(({ name, color }) => (
          <button
            key={name}
            className={`theme-btn ${name} ${
              colorScheme === name ? "selected" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => setColorScheme(name)}
          >
            <span className="checkmark">✓</span>
          </button>
        ))}
      </div>
    </div>
  );
}
