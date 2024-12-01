import { useState, useEffect } from "react";
import "./ThemeSelector.css";

export default function ThemeSelector() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [colorScheme, setColorScheme] = useState(
    localStorage.getItem("colorScheme") || "blue"
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

  const themes = [
    { name: "pink", color: "#e33c74" },
    { name: "scarlet", color: "#cf6b66" },
    { name: "olive", color: "#808000" },
    { name: "green", color: "#01bb32" },
    { name: "aquamarine", color: "#2cc3b0" },
    { name: "teal", color: "#6dcfb8" },
    { name: "blue", color: "#0074ff" },
    { name: "indigo", color: "#12076d" },
    { name: "violet", color: "#a06cd0" },
    { name: "lilac", color: "#e2a7da" },
    { name: "gray", color: "#5e6c7a" },
  ];

  return (
    <div>
      {/* Light/Dark Mode Toggle */}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>

      <h3>Change theme</h3>
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
