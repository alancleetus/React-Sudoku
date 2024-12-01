import PropTypes from "prop-types";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import GameGrid from "../components/GameGrid";
import ButtonNumberContainer from "../components/ButtonNumberContainer";

function GameScreen({
  currInputNumber,
  setCurrInputNumber,
  gameDifficulty,
  switchScreen,
  timerActive,
  setTimerActive,
  formatTime,
  elapsedTime,
  SudokuGrid,
  SolutionGrid,
  setSolutionGrid,
}) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <button
          className="icon-button"
          onClick={() => switchScreen("home")}
          style={{ flexGrow: "1", textAlign: "left" }}
        >
          <BsArrowLeftShort />
        </button>
        <div style={{ flexGrow: "3" }}></div>
        <button
          className="icon-button"
          onClick={() => switchScreen("settings")}
          style={{ flexGrow: "1", textAlign: "right" }}
        >
          <IoSettingsOutline />
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "baseline" }}>
        <p style={{ flexGrow: "1", textAlign: "left" }}>{gameDifficulty}</p>
        <p style={{ flexGrow: "2", textAlign: "center" }}>
          {formatTime(elapsedTime)}
        </p>
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="play-pause-button"
            onClick={() => setTimerActive(!timerActive)}
          >
            {timerActive ? <IoIosPause /> : <IoIosPlay />}
          </button>
        </div>
      </div>
      <GameGrid
        currInputNumber={currInputNumber}
        gameDifficulty={gameDifficulty}
        SudokuGrid={SudokuGrid}
        SolutionGrid={SolutionGrid}
        setSolutionGrid={setSolutionGrid}
      />
      <ButtonNumberContainer
        currInputNumber={currInputNumber}
        setCurrInputNumber={setCurrInputNumber}
      />
    </div>
  );
}

GameScreen.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
  setCurrInputNumber: PropTypes.func.isRequired,
  gameDifficulty: PropTypes.string.isRequired,
  switchScreen: PropTypes.func.isRequired,
  timerActive: PropTypes.bool.isRequired,
  setTimerActive: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  SudokuGrid: PropTypes.array.isRequired,
  SolutionGrid: PropTypes.array,
  setSolutionGrid: PropTypes.func.isRequired,
};
export default GameScreen;
