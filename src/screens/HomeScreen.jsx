import DifficultySelector from "../components/DifficultyComponent";
import { EmptyGrid } from "../constants/sudokuConstants";
import { useScreenContext } from "../contexts/ScreenContext";
import { useSudokuContext } from "../contexts/SudokuProvider";
import isEqual from "lodash/isEqual";

function HomeScreen() {
  const { handleSettingsClick } = useScreenContext();
  const { startNewGame, resumeGame } = useSudokuContext();
  const prevState = JSON.parse(localStorage.getItem("sudokuState"));
  const resumeDiff = prevState ? prevState.gameDifficulty : "";
  const resumeTime = prevState ? prevState.elapsedTime : "";

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
      <div>
        {!isEqual(prevState.sudokuGrid, EmptyGrid()) && (
          <button className="home-screen-buttons" onClick={() => resumeGame()}>
            <span>Resume Game</span>
            <br />
            <span>
              {resumeDiff !== ""
                ? `${resumeDiff} - ${formatTime(resumeTime)}`
                : ""}
            </span>
          </button>
        )}
      </div>
      <button className="home-screen-buttons" onClick={handleSettingsClick}>
        Settings
      </button>
    </>
  );
}

export default HomeScreen;
