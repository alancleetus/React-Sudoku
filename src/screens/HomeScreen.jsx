import PropTypes from "prop-types";
import DifficultySelector from "../components/DifficultySelector";
import { IoSettingsOutline } from "react-icons/io5";
function HomeScreen({
  setGameDifficulty,
  switchScreen,
  startNewGame,
  resumeGame,
}) {
  return (
    <>
      <h1>Sudoku</h1>
      <DifficultySelector
        setGameDifficulty={setGameDifficulty} // Pass setter to update difficulty
      />
      <div>
        <button onClick={() => startNewGame()}>New Game</button>
      </div>

      <div>
        <button onClick={() => resumeGame()}>Resume Game</button>
      </div>
      <button className="icon-button" onClick={() => switchScreen("settings")}>
        <IoSettingsOutline />
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
