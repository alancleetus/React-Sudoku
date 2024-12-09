import { useScreenContext } from "./contexts/ScreenContext"; // Use the new ScreenContext
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DifficultySelector from "./components/DifficultyComponent";
import { BsArrowLeftShort } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import StatsScreen from "./screens/StatsScreen";

function AppContent() {
  const { currentScreen, handleBackButton, handleSettingsClick } =
    useScreenContext();

  return (
    <div className="app-container">
      <nav className="navbar">
        <button
          className="icon-button"
          onClick={handleBackButton}
          style={{ flexGrow: 1, textAlign: "left" }}
        >
          <BsArrowLeftShort />
        </button>
        <div style={{ flexGrow: 3 }}></div>{" "}
        {/* Flex-grow 3 creates space between items */}
        <button
          className="icon-button"
          onClick={handleSettingsClick}
          style={{ flexGrow: 1, textAlign: "right" }}
        >
          <IoSettingsOutline />
        </button>
      </nav>
      <div className="page-body">
        <div className="main-container">
          {/* Conditionally render components based on currentScreen */}
          {currentScreen === "home" && <HomeScreen />}
          {currentScreen === "game" && <GameScreen />}
          {currentScreen === "settings" && <SettingsScreen />}
          {currentScreen === "difficulty" && <DifficultySelector />}
          {currentScreen === "history" && <HistoryScreen />}
          {currentScreen === "stats" && <StatsScreen />}
        </div>
      </div>
    </div>
  );
}

export default AppContent;
