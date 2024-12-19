import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useScreenContext } from "./ScreenContext";

const GameHistoryContext = createContext();

export const GameHistoryProvider = ({ children }) => {
  const { currentScreen } = useScreenContext();
  const [gameHistory, setGameHistory] = useState(
    JSON.parse(localStorage.getItem("sudokuHistory")) || []
  );

  // Save history to localStorage whenever it changes
  useEffect(() => {
    console.log("....saving hist....", gameHistory);
    localStorage.setItem("sudokuHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  // Add or update a game in the history
  const saveGameToHistory = (gameState) => {
    if (currentScreen == "home") return;
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
    //console.log("finding game", gameHistory);
    //console.log("finding gameid:", gameId);
    return gameHistory.find((game) => game.gameId === gameId);
  };

  const saveCompletedGame = (gameId, gameDifficulty, elapsedTime) => {
    const completedGame = {
      gameId,
      difficulty: gameDifficulty,
      elapsedTime,
      completionDate: new Date().toISOString(), // Record the current date
    };

    // Retrieve the existing completed games from localStorage
    const existingCompletedGames =
      JSON.parse(localStorage.getItem("completedGames")) || [];

    // Add the new completed game to the array
    const updatedCompletedGames = [...existingCompletedGames, completedGame];

    // Save the updated array back to localStorage
    localStorage.setItem(
      "completedGames",
      JSON.stringify(updatedCompletedGames)
    );

    console.log("Game saved to completed games:", completedGame);
  };

  // Delete a specific game by ID
  const deleteGameFromHistory = (gameId) => {
    console.debug("Deleting game:", gameId);

    // Log the current gameHistory
    console.debug("Current game history:", gameHistory);

    // Check if the game exists in the history
    const game = gameHistory.find((g) => g.gameId === gameId);
    if (!game) {
      console.error("Game not found!");
      return;
    }

    // Save completed game to statistics
    saveCompletedGame(gameId, game.gameDifficulty, game.elapsedTime);

    // Filter the game out of history and log the operation
    const updatedHistory = gameHistory.filter((g) => {
      const shouldKeep = g.gameId !== gameId;
      console.debug(`Filtering gameId: ${g.gameId}, shouldKeep: ${shouldKeep}`);
      return shouldKeep;
    });

    // Log the updated history
    console.debug("Updated game history after filtering:", updatedHistory);

    // Update both state and localStorage
    setGameHistory(updatedHistory);
    localStorage.setItem("sudokuHistory", JSON.stringify(updatedHistory));
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
