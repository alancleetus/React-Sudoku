import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useTimerContext } from "./TimerContext";

// Create the context
const ScreenContext = createContext("home");

// Create a provider to wrap the app and manage screen state
export const ScreenProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [previousScreen, setPreviousScreen] = useState("home");
  const { resumeTimer, pauseTimer } = useTimerContext();

  // Function to switch screens, called safely during events or lifecycle
  const switchScreen = (screen) => {
    if (screen !== currentScreen) {
      setPreviousScreen(currentScreen); // Update previous screen
      setCurrentScreen(screen); // Update the current screen

      // Start or pause the timer depending on the screen
      if (screen === "game") {
        resumeTimer();
      } else {
        pauseTimer();
      }
    }
  };

  const handleBackButton = () => switchScreen(previousScreen);
  const handleHomeClick = () => switchScreen("home");
  const handleGameClick = () => switchScreen("game");
  const handleSettingsClick = () => switchScreen("settings");
  const handleHistoryClick = () => switchScreen("history");

  // Avoid any state update directly during render
  useEffect(() => {}, [currentScreen]);

  return (
    <ScreenContext.Provider
      value={{
        currentScreen,
        previousScreen,
        switchScreen,
        handleSettingsClick,
        handleHistoryClick,
        handleBackButton,
        handleHomeClick,
        handleGameClick,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
// Custom hook to use the screen context
export const useScreenContext = () => useContext(ScreenContext);

ScreenProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};
