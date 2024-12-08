import { useEffect, useState } from "react";
import DifficultySelector from "../components/DifficultyComponent";

import { useScreenContext } from "../contexts/ScreenContext";
import { useSudokuContext } from "../contexts/SudokuProvider";

function HomeScreen() {
  const { handleSettingsClick, handleHistoryClick } = useScreenContext();
  const { startNewGame, resumeGame, sudokuGrid, gameHistory } =
    useSudokuContext();
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [resumeDiff, setResumeDiff] = useState("");
  const [resumeTime, setResumeTime] = useState("");

  // Check if there's a saved game in localStorage
  const checkSavedGame = () => {
    //console.log("Previous Game State:", prevState); // Debug log
    if (gameHistory.length > 0) {
      const latestGame = gameHistory[gameHistory.length - 1]; // Latest game based on ID

      setResumeDiff(latestGame.gameDifficulty);
      setResumeTime(latestGame.elapsedTime);
      return true;
    } else return false;
  };

  // Recalculate `hasSavedGame` whenever the component renders
  useEffect(() => {
    setHasSavedGame(checkSavedGame());
  }, [sudokuGrid]);

  // Format elapsed time into mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <h1>Sudoku</h1>
      <DifficultySelector />
      <div>
        <button className="home-screen-buttons" onClick={() => startNewGame()}>
          New Game
        </button>
      </div>
      {hasSavedGame && (
        <div>
          <button className="home-screen-buttons" onClick={() => resumeGame()}>
            <span>Resume Game</span>
            <br />
            <span className="button-subtext">
              {resumeDiff} - {formatTime(resumeTime)}
            </span>
          </button>
        </div>
      )}

      <button className="home-screen-buttons" onClick={handleHistoryClick}>
        Incomplete Games
      </button>
      <button className="home-screen-buttons" onClick={handleSettingsClick}>
        Settings
      </button>
    </>
  );
}

export default HomeScreen;
