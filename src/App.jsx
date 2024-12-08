import "./assets/styles/App.css";
import "./assets/styles/theme.css";
import "./assets/styles/SudokuGrid.css";
import "./assets/styles/Notes.css";

import { TimerProvider } from "./contexts/TimerContext";
import { GameDifficultyProvider } from "./contexts/GameDifficultyProvider";
import { SudokuProvider } from "./contexts/SudokuProvider";
import { ScreenProvider } from "./contexts/ScreenContext";
import AppContent from "./AppContent";
import { SettingsProvider } from "./contexts/SettingsContext";
import { GameHistoryProvider } from "./contexts/GameHistoryProvider";

function App() {
  return (
    <SettingsProvider>
      <TimerProvider>
        <ScreenProvider>
          <GameDifficultyProvider>
            <GameHistoryProvider>
              <SudokuProvider>
                <AppContent />
              </SudokuProvider>
            </GameHistoryProvider>
          </GameDifficultyProvider>
        </ScreenProvider>
      </TimerProvider>
    </SettingsProvider>
  );
}

export default App;
