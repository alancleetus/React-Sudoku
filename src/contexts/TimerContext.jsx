import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext(0);

export const TimerProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isTimerActive) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    // Cleanup on unmount or when timerActive changes
    return () => clearInterval(timer);
  }, [isTimerActive]);

  const resetTimer = () => setElapsedTime(0);
  const pauseTimer = () => setTimerActive(false);
  const resumeTimer = () => setTimerActive(true);
  const toggleTimer = () => setTimerActive(!isTimerActive);
  const getIsTimerActive = () => isTimerActive;
  const updateTimer = (time) => setElapsedTime(time);

  return (
    <TimerContext.Provider
      value={{
        elapsedTime,
        resetTimer,
        pauseTimer,
        resumeTimer,
        updateTimer,
        toggleTimer,
        getIsTimerActive,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};
export const useTimerContext = () => useContext(TimerContext);
