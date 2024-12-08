import { BsArrowLeftShort } from "react-icons/bs";
import { useScreenContext } from "../contexts/ScreenContext";
import { useEffect, useState } from "react";
import { useSudokuContext } from "../contexts/SudokuProvider";

function HistoryScreen() {
  const { handleBackButton } = useScreenContext();
  const { loadHistoricalGame } = useSudokuContext();
  const [gameHistory, setGameHistory] = useState(() => {
    const savedHistory = localStorage.getItem("sudokuHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // Save game history to local storage
  useEffect(() => {
    localStorage.setItem("sudokuHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  // Load a game from history to play
  const loadGame = (gameId) => {
    const game = gameHistory.find((g) => g.id === gameId);
    if (game) {
      //resume game with game id
      console.log("Loading game:", game);
      loadHistoricalGame(gameId);
    }
  };

  // Delete a game from history
  const deleteGame = (gameId) => {
    const updatedHistory = gameHistory.filter((game) => game.id !== gameId);
    setGameHistory(updatedHistory); // Update the history state
    localStorage.setItem("sudokuHistory", JSON.stringify(updatedHistory)); // Update local storage
  };

  return (
    <div>
      <button
        className="icon-button"
        onClick={handleBackButton}
        style={{ flexGrow: "1" }}
      >
        <BsArrowLeftShort />
      </button>

      <h1>Game History</h1>
      {gameHistory.length === 0 ? (
        <p>No saved games found.</p>
      ) : (
        <ul>
          {gameHistory.map((game) => (
            <li key={game.id}>
              <span>Game ID: {game.id}</span>
              <span>Difficulty: {game.gameDifficulty}</span>
              <span>Elapsed Time: {game.elapsedTime} seconds</span>
              <button onClick={() => loadGame(game.id)}>Load</button>
              <button onClick={() => deleteGame(game.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistoryScreen;
