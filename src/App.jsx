import "./assets/styles/App.css";
import "./assets/styles/theme.css";

import { TimerProvider } from "./contexts/TimerContext";
import { GameDifficultyProvider } from "./contexts/GameDifficultyProvider";
import { SudokuProvider } from "./contexts/SudokuProvider";
import { ScreenProvider } from "./contexts/ScreenContext";
import AppContent from "./AppContent";
import { SettingsProvider } from "./contexts/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <TimerProvider>
        <ScreenProvider>
          <GameDifficultyProvider>
            <SudokuProvider>
              <AppContent />
            </SudokuProvider>
          </GameDifficultyProvider>
        </ScreenProvider>
      </TimerProvider>
    </SettingsProvider>
  );
}

export default App;
