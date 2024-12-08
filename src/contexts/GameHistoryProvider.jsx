import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const GameHistoryContext = createContext();

export const GameHistoryProvider = ({ children }) => {
  const [gameHistory, setGameHistory] = useState([]);

  // Load game history from localStorage
  const loadGameHistory = () => {
    const savedHistory =
      JSON.parse(localStorage.getItem("sudokuHistory")) || [];
    setGameHistory(savedHistory);
  };
  useEffect(() => {
    // Load game history on initialization
    loadGameHistory();
  }, []);

  // Load history from localStorage on mount
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("sudokuHistory")) || [];
    setGameHistory(storedHistory);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sudokuHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  // Add or update a game in the history
  const saveGameToHistory = (gameState) => {
    setGameHistory((prevHistory) => {
      const existingIndex = prevHistory.findIndex(
        (game) => game.id === gameState.id
      );
      if (existingIndex !== -1) {
        // Update existing game
        const updatedHistory = [...prevHistory];
        updatedHistory[existingIndex] = {
          ...prevHistory[existingIndex],
          ...gameState,
        };
        return updatedHistory;
      }
      // Add new game and limit history to 10 entries
      return [...prevHistory, gameState].slice(-10);
    });
  };

  // Get a specific game by ID
  const getGameFromHistory = (gameId) => {
    return gameHistory.find((game) => game.id === gameId);
  };

  // Clear the game history
  const clearGameHistory = () => {
    setGameHistory([]);
    localStorage.removeItem("sudokuHistory");
  };

  // Delete a specific game by ID
  const deleteGameFromHistory = (gameId) => {
    setGameHistory((prevHistory) =>
      prevHistory.filter((game) => game.id !== gameId)
    );
  };

  return (
    <GameHistoryContext.Provider
      value={{
        gameHistory,
        saveGameToHistory,
        getGameFromHistory,
        clearGameHistory,
        deleteGameFromHistory,
      }}
    >
      {children}
    </GameHistoryContext.Provider>
  );
};

GameHistoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGameHistoryContext = () => {
  return useContext(GameHistoryContext);
};
