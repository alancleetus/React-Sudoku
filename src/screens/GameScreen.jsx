import { BsArrowLeftShort } from "react-icons/bs";
import { IoIosPause } from "react-icons/io";
import { IoIosPlay } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import GameGrid from "../components/GameGrid";
import ButtonNumberContainer from "../components/ButtonNumberContainer";
import TimerComponent from "../components/TimerComponent";
import { useTimerContext } from "../contexts/TimerContext";
import { useScreenContext } from "../contexts/ScreenContext";
import { useGameDifficultyContext } from "../contexts/GameDifficultyProvider";
import { useSettingsContext } from "../contexts/SettingsContext";

function GameScreen() {
  const { isTimerActive, toggleTimer } = useTimerContext();
  const { handleHomeClick, handleSettingsClick } = useScreenContext();
  const { gameDifficulty } = useGameDifficultyContext();

  const { settings } = useSettingsContext();

  return (
    <div>
      <div style={{ display: "flex" }}>
        <button
          className="icon-button"
          onClick={handleHomeClick}
          style={{ flexGrow: "1", textAlign: "left" }}
        >
          <BsArrowLeftShort />
        </button>
        <div style={{ flexGrow: "3" }}></div>
        <button
          className="icon-button"
          onClick={handleSettingsClick}
          style={{ flexGrow: "1", textAlign: "right" }}
        >
          <IoSettingsOutline />
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "10px",
          paddingTop: "3px",
        }}
      >
        <p style={{ flexGrow: "1", textAlign: "left", margin: 0 }}>
          {gameDifficulty}
        </p>
        <div style={{ flexGrow: "2", textAlign: "center", margin: 0 }}>
          {settings.showTimer ? <TimerComponent /> : <></>}
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center", // Centers vertically
          }}
        >
          <button className="play-pause-button" onClick={toggleTimer}>
            {isTimerActive ? <IoIosPause /> : <IoIosPlay />}
          </button>
        </div>
      </div>
      <GameGrid />
      <ButtonNumberContainer />
    </div>
  );
}
export default GameScreen;
