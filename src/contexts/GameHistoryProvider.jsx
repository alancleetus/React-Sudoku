import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const GameHistoryContext = createContext();

export const GameHistoryProvider = ({ children }) => {
  const [gameHistory, setGameHistory] = useState(
    JSON.parse(localStorage.getItem("sudokuHistory")) || []
  );

  // Load history from localStorage on mount
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("sudokuHistory")) || [];
    setGameHistory(storedHistory);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    console.log("....saving hist....", gameHistory);
    localStorage.setItem("sudokuHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  // Add or update a game in the history
  const saveGameToHistory = (gameState) => {
    console.log("....save to hist....", gameState);
    setGameHistory((prevHistory) => {
      console.log("prevHist:", prevHistory);
      const existingIndex = prevHistory.findIndex(
        (game) => game.gameId === gameState.gameId
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
    console.log("finding game", gameHistory);
    console.log("finding gameid:", gameId);
    return gameHistory.find((game) => game.gameId === gameId);
  };

  // Delete a specific game by ID
  const deleteGameFromHistory = (gameId) => {
    setGameHistory((prevHistory) =>
      prevHistory.filter((game) => game.gameId !== gameId)
    );
  };

  return (
    <GameHistoryContext.Provider
      value={{
        gameHistory,
        saveGameToHistory,
        getGameFromHistory,
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
