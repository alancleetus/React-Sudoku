import { useState, useEffect } from "react";
import "./App.css";
import "./theme.css";

import SettingsPage from "./components/SettingsPage";
import { BsArrowLeftShort } from "react-icons/bs";
import HomeScreen from "./screens/HomeScreen";
import DifficultySelector from "./components/DifficultySelector";
import GameScreen from "./screens/GameScreen";
import GenerateSudoku from "./components/GenerateSudoku";
function App() {
  const [elapsedTime, setElapsedTime] = useState(0); // Timer state
  const [timerActive, setTimerActive] = useState(false); // Track if the timer is running
  const [gameDifficulty, setGameDifficulty] = useState("Medium");
  const [currInputNumber, setCurrInputNumber] = useState(-1);

  const [currentScreen, setCurrentScreen] = useState("home"); // Manage which screen to display
  const [previousScreen, setPreviousScreen] = useState("home"); // Manage which screen to display

  const [SudokuGrid, setSudokuGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [SolutionGrid, setSolutionGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  // Load game state from localStorage (if any)
  const loadGameState = () => {
    const savedState = JSON.parse(localStorage.getItem("sudokuState"));
    if (savedState) {
      setGameDifficulty(savedState.difficulty);
      setElapsedTime(savedState.elapsedTime);
      setTimerActive(savedState.timerActive);
      setSudokuGrid(savedState.SudokuGrid);
      setSolutionGrid(savedState.SolutionGrid);
      // If you want to restore the grid as well, you can load that here
    }
  };

  // Function to switch screens
  const switchScreen = (screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);

    if (screen === "game") {
      setTimerActive(true); // Start the timer
    } else {
      setTimerActive(false); // Pause the timer
    }
  };

  // Whenever the game state changes, update localStorage (example)
  useEffect(() => {
    const gameState = {
      SudokuGrid,
      SolutionGrid,
      gameDifficulty,
      elapsedTime,
      timerActive,
    };
    localStorage.setItem("sudokuState", JSON.stringify(gameState));
  }, [SudokuGrid, SolutionGrid, gameDifficulty, elapsedTime, timerActive]);

  // Start a new game
  const startNewGame = () => {
    // Generate a new Sudoku grid
    const newGrid = GenerateSudoku(gameDifficulty);

    // Reset states (for a new game)
    setElapsedTime(0);
    setTimerActive(false);
    setCurrInputNumber(-1);

    // Update grids
    setSudokuGrid(newGrid);
    setSolutionGrid(newGrid.map((row) => row.slice())); // Create a deep copy for the solution grid

    // Clear saved state and switch to the game screen
    localStorage.removeItem("sudokuState");
    switchScreen("game");
  };

  // Resume the game if a saved state exists
  const resumeGame = () => {
    loadGameState();
    switchScreen("game");
  };

  // Timer Logic
  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup on unmount or when timerActive changes
  }, [timerActive]);

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
      <div>
        {/* Conditionally render components based on currentScreen */}
        {currentScreen === "home" && (
          <HomeScreen
            setGameDifficulty={setGameDifficulty}
            switchScreen={switchScreen}
            startNewGame={startNewGame}
            resumeGame={resumeGame}
          />
        )}

        {currentScreen === "game" && (
          <GameScreen
            currInputNumber={currInputNumber}
            setCurrInputNumber={setCurrInputNumber}
            gameDifficulty={gameDifficulty}
            switchScreen={switchScreen}
            timerActive={timerActive}
            setTimerActive={setTimerActive}
            formatTime={formatTime}
            elapsedTime={elapsedTime}
            SudokuGrid={SudokuGrid}
            SolutionGrid={SolutionGrid}
            setSolutionGrid={setSolutionGrid}
          />
        )}
        {currentScreen === "settings" && (
          <>
            <div style={{ display: "flex" }}>
              <button
                className="icon-button"
                onClick={() => switchScreen(previousScreen)}
                style={{ flexGrow: "1" }}
              >
                <BsArrowLeftShort />
              </button>
              <div style={{ flexGrow: "3" }}></div>

              <div style={{ flexGrow: "1" }}></div>
            </div>

            <SettingsPage />
          </>
        )}
        {currentScreen === "difficulty" && <DifficultySelector />}
      </div>
    </>
  );
}

export default App;
