import { useScreenContext } from "./contexts/ScreenContext"; // Use the new ScreenContext
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import DifficultySelector from "./components/DifficultyComponent";

function AppContent() {
  const { currentScreen } = useScreenContext();

  return (
    <div>
      {/* Conditionally render components based on currentScreen */}
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "game" && <GameScreen />}
      {currentScreen === "settings" && <SettingsScreen />}
      {currentScreen === "difficulty" && <DifficultySelector />}
      {currentScreen === "history" && <HistoryScreen />}
    </div>
  );
}

export default AppContent;
