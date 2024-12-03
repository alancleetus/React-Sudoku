import "./assets/styles/App.css";
import "./assets/styles/theme.css";

import { TimerProvider } from "./contexts/TimerContext";
import { GameDifficultyProvider } from "./contexts/GameDifficultyProvider";
import { SudokuProvider } from "./contexts/SudokuProvider";
import { ScreenProvider } from "./contexts/ScreenContext";
import AppContent from "./AppContent";

function App() {
  return (
    <TimerProvider>
      <ScreenProvider>
        <GameDifficultyProvider>
          <SudokuProvider>
            <AppContent />
          </SudokuProvider>
        </GameDifficultyProvider>
      </ScreenProvider>
    </TimerProvider>
  );
}

export default App;
