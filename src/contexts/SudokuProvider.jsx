import PropTypes from "prop-types";
import { useState } from "react";
import { validateSudokuGrid } from "../utils/SudokuValidator";
import { EmptyGrid } from "../constants/sudokuConstants";
import { createContext, useContext } from "react";
import { useTimerContext } from "./TimerContext";
import GenerateSudoku from "../utils/GenerateSudoku";
import { useGameDifficultyContext } from "./GameDifficultyProvider";
import { useScreenContext } from "./ScreenContext";

const SudokuContext = createContext(0);
export const SudokuProvider = ({ children }) => {
  const { resetTimer, updateTimer } = useTimerContext();
  const { gameDifficulty, updateGameDifficulty } = useGameDifficultyContext();
  const { switchScreen } = useScreenContext();
  const [currInputNumber, setCurrInputNumber] = useState(-1);

  const [sudokuGrid, setSudokuGrid] = useState(EmptyGrid);
  const [solutionGrid, setSolutionGrid] = useState(EmptyGrid);

  const updateCell = (row, col, value) => {
    const newGrid = [...sudokuGrid];
    newGrid[row][col] = value;
    setSolutionGrid(newGrid);
    validateSudokuGrid(solutionGrid, row, col, value);
  };

  // Start a new game
  const startNewGame = () => {
    // Generate a new Sudoku grid
    const newGrid = GenerateSudoku(gameDifficulty);

    // Reset states (for a new game)
    resetTimer();
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

  // Load game state from localStorage (if any)
  const loadGameState = () => {
    const savedState = JSON.parse(localStorage.getItem("sudokuState"));
    if (savedState) {
      updateGameDifficulty(savedState.gameDifficulty);
      updateTimer(savedState.elapsedTime);
      setSudokuGrid(savedState.SudokuGrid);
      setSolutionGrid(savedState.SolutionGrid);
    }
  };

  return (
    <SudokuContext.Provider
      value={{
        sudokuGrid,
        solutionGrid,
        startNewGame,
        resumeGame,
        updateCell,
        currInputNumber,
        setCurrInputNumber,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
};
SudokuProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children
};

export const useSudokuContext = () => useContext(SudokuContext);
