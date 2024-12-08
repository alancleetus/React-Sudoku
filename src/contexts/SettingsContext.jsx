import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    highlightRowCol: true, // Highlight row and column based on input
    showRemainingDigits: true, // Show remaining digits count
    highlightErrors: true, // Highlight errors
    highlightNoteErrors: true, // Highlight note errors
    highlightSameDigits: true, // Highlight cells with the same digit
    autoRemoveInvalidNotes: false, // Automatically remove conflicting notes
    showTimer: true, // Show the timer
    // holdToErase: true, // Allow holding cells to erase them
    disableDigitWhenNine: true, // Disable a digit when its count reaches 9
    allowPrefilledNumberInteraction: true,
    resetInputNumberWhenClickedOnMatchingPreFilledNumber: true,
    resetInputNumberWhenClickedOnAnyPreFilledNumber: true,
    resetActiveCellWhenClickedOnMatchingPreFilledNumber: true,
    resetActiveCellWhenClickedOnAnyPreFilledNumber: true,
  });
  const [initialSettings, setInitialSettings] = useState({
    pencilMode: false, // Enable or disable pencil mode
  });
  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
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
