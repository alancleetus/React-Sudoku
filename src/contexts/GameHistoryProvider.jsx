import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const GameHistoryContext = createContext();

// Provide the context to the app
export const GameHistoryProvider = ({ children }) => {
  const [gameHistory, setGameHistory] = useState();

  // Function to change History
  const updateGameHistory = (newHistory) => {
    setGameHistory(newHistory);
  };

  return (
    <GameHistoryContext.Provider value={{ gameHistory, updateGameHistory }}>
      {children}
    </GameHistoryContext.Provider>
  );
};

GameHistoryProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};

// Custom hook to consume the context
export const useGameHistoryContext = () => {
  return useContext(GameHistoryContext);
};
