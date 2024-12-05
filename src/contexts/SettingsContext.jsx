import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    // highlightRowCol: true, // Highlight row and column based on input
    showRemainingDigits: true, // Show remaining digits count
    highlightErrors: true, // Highlight errors
    // highlightSameDigits: true, // Highlight cells with the same digit
    // autoNoteRemoval: true, // Automatically remove conflicting notes
    showTimer: true, // Show the timer
    // holdToErase: true, // Allow holding cells to erase them
    // disablePencil: false, // Disable pencil mode
    disableDigitWhenNine: true, // Disable a digit when its count reaches 9
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsContext.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};

export const useSettingsContext = () => useContext(SettingsContext);
