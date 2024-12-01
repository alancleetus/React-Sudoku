import PropTypes from "prop-types";
import DifficultySelector from "../components/DifficultySelector";
function HomeScreen({
  setGameDifficulty,
  switchScreen,
  startNewGame,
  resumeGame,
}) {
  const prevState = JSON.parse(localStorage.getItem("sudokuState"));
  const resumeDiff = prevState.gameDifficulty;
  const resumeTime = prevState.elapsedTime;

  // Format elapsed time into mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  console.log(prevState);
  return (
    <>
      <h1>Sudoku</h1>
      <DifficultySelector
        setGameDifficulty={setGameDifficulty} // Pass setter to update difficulty
      />
      <div>
        <button className="home-screen-buttons" onClick={() => startNewGame()}>
          New Game
        </button>
      </div>
      <div>
        <button className="home-screen-buttons" onClick={() => resumeGame()}>
          <span>Resume Game</span>
          <br />
          <span>
            {resumeDiff} - {formatTime(resumeTime)}
          </span>
        </button>
      </div>
      <button
        className="home-screen-buttons"
        onClick={() => switchScreen("settings")}
      >
        Settings
      </button>
    </>
  );
}

HomeScreen.propTypes = {
  setGameDifficulty: PropTypes.func.isRequired,
  switchScreen: PropTypes.func.isRequired,
  startNewGame: PropTypes.func.isRequired,
  resumeGame: PropTypes.func.isRequired,
};
export default HomeScreen;
