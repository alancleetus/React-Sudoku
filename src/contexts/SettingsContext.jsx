import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [initialSettings, setInitialSettings] = useState({
    pencilMode: true, // Enable or disable pencil mode
  });
  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  useEffect(() => {
    console.log("saving timer...");
    const savedState = JSON.parse(localStorage.getItem("sudokuState"));

    const gameState = { ...savedState, settings, initialSettings };

    console.log("Saving settings to localStorage:", gameState); // Debug log
    localStorage.setItem("sudokuState", JSON.stringify(gameState));
  }, [settings, initialSettings]); // This will trigger on any of these state changes

  const toggleInitialSetting = (key) => {
    setInitialSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        toggleSetting,
        initialSettings,
        setSettings,
        setInitialSettings,
        toggleInitialSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Prop validation should be here for SettingsProvider
SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop for SettingsProvider
};

export const useSettingsContext = () => useContext(SettingsContext);
