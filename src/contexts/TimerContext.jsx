import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const TimerContext = createContext(0);

export const TimerProvider = ({ children }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null); // Ref to store the interval ID

  useEffect(() => {
    if (isTimerActive) {
      // Start the timer
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      // Pause the timer
      clearInterval(timerRef.current);
      timerRef.current = null; // Clean up the interval
    }
    // Cleanup on unmount or isTimerActive changes
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isTimerActive]);

  const resetTimer = () => setElapsedTime(0);
  const pauseTimer = () => setTimerActive(false);
  const resumeTimer = () => setTimerActive(true);
  const toggleTimer = () => setTimerActive((prev) => !prev);
  const updateTimer = (time) => setElapsedTime(time);

  useEffect(() => {
    // Save the elapsed time to localStorage whenever it changes
    const savedState = JSON.parse(localStorage.getItem("sudokuState")) || {};
    const gameState = { ...savedState, elapsedTime };
    localStorage.setItem("sudokuState", JSON.stringify(gameState));
  }, [elapsedTime]);

  return (
    <TimerContext.Provider
      value={{
        elapsedTime,
        resetTimer,
        pauseTimer,
        resumeTimer,
        updateTimer,
        toggleTimer,
        isTimerActive,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTimerContext = () => useContext(TimerContext);
