import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

// Create the GameDifficultyContext
const GameDifficultyContext = createContext("Medium");

// Provide the context to the app
export const GameDifficultyProvider = ({ children }) => {
  const [gameDifficulty, setGameDifficulty] = useState("Medium"); // Default difficulty

  // Function to change difficulty
  const updateGameDifficulty = (newDifficulty) => {
    setGameDifficulty(newDifficulty);
  };

  return (
    <GameDifficultyContext.Provider
      value={{ gameDifficulty, updateGameDifficulty }}
    >
      {children}
    </GameDifficultyContext.Provider>
  );
};

GameDifficultyProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};

// Custom hook to consume the context
export const useGameDifficultyContext = () => {
  return useContext(GameDifficultyContext);
};
