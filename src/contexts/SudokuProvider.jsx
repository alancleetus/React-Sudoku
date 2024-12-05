import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { validateSudokuGrid, checkSolution } from "../utils/SudokuValidator";
import { EmptyGrid, EmptyHintGrid } from "../constants/sudokuConstants";
import { createContext, useContext } from "react";
import { useTimerContext } from "./TimerContext";
import GenerateSudoku from "../utils/GenerateSudoku";
import { useGameDifficultyContext } from "./GameDifficultyProvider";
import { useScreenContext } from "./ScreenContext";
import { useSettingsContext } from "./SettingsContext";

const SudokuContext = createContext(0);
export const SudokuProvider = ({ children }) => {
  const { resetTimer, updateTimer, pauseTimer } = useTimerContext();
  const { gameDifficulty, updateGameDifficulty } = useGameDifficultyContext();
  const { switchScreen } = useScreenContext();

  const [currInputNumber, setCurrInputNumber] = useState(-1); // Active number (-1 means none)
  const [activeCell, setActiveCell] = useState(null); // Active cell (null means none)
  const [inputMode, setInputMode] = useState("noInput"); // Modes: "noInput", "numberFirst", "cellFirst"

  const [sudokuGrid, setSudokuGrid] = useState(() => EmptyGrid());
  const [solutionGrid, setSolutionGrid] = useState(() => EmptyGrid());
  const [hintGrid, setHintGrid] = useState(() => EmptyHintGrid());

  const [invalidCells, setInvalidCells] = useState(new Set()); // Track invalid cells

  const { settings, initialSettings } = useSettingsContext();
  const updateCell = (row, col, value) => {
    if (row < 0 || row >= 9 || col < 0 || col >= 9) {
      console.error("Invalid row or column index");
      return;
    }

    console.log("updating solution");
    console.log("row:" + row + ", col:" + col + ", val:" + value);

    if (initialSettings.pencilMode) {
      console.log("updating hints");
      // Deep copy the hint grid
      const newHintGrid = hintGrid.map(
        (row) => row.map((cell) => ({ ...cell })) // Clone each cell object
      );

      if (value === 0) {
        // clear all hints
        newHintGrid[row][col] = {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
        };
      } else {
        newHintGrid[row][col][value] === true
          ? (newHintGrid[row][col][value] = false)
          : (newHintGrid[row][col][value] = true);
      }
      setHintGrid(newHintGrid);
    } else {
      const newGrid = [...solutionGrid];
      newGrid[row][col] = value;

      setSolutionGrid(newGrid);

      validateSudokuGrid(solutionGrid, row, col, value);

      if (checkSolution(solutionGrid)) {
        alert("Completed!");
        pauseTimer();
      }

      setInvalidCells(validateSudokuGrid(newGrid)); // Revalidate after update
    }
  };

  const handleNumberClick = (num) => {
    console.log("Handle Number Click:" + num);
    if (inputMode === "numberFirst" && currInputNumber === num) {
      // Deactivate number-first mode if the same number is clicked again
      resetInputMode();
    } else if (
      inputMode === "noInput" ||
      (inputMode === "numberFirst" && currInputNumber !== num)
    ) {
      // Switch to number mode and update number
      setCurrInputNumber(num);
      setActiveCell(null); // Deactivate any active cell
      setInputMode("numberFirst");
    } else if (inputMode === "cellFirst") {
      // In cell-first mode, update the cell immediately
      updateCell(activeCell.row, activeCell.col, num);
    }
  };

  const handleCellClick = (row, col) => {
    console.log("handleCellClick");
    if (sudokuGrid[row][col] > 0) {
      resetInputMode();
      return;
    }
    const isSameCell =
      activeCell && activeCell.row === row && activeCell.col === col;

    if (inputMode === "cellFirst" && isSameCell) {
      // Deactivate cell-first mode if the same cell is clicked again
      resetInputMode();
    } else if (inputMode === "cellFirst" && !isSameCell) {
      const cellElement = document.querySelector(
        `[data-row="${activeCell.row}"][data-col="${activeCell.col}"]`
      );

      if (cellElement) {
        cellElement.classList.remove("active-cell");
      }
      // Change active cell
      setActiveCell({ row, col });
    } else if (inputMode === "numberFirst") {
      // In number-first mode, update the cell immediately
      const cellElement = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );

      if (cellElement.innerText == currInputNumber) {
        updateCell(row, col, 0);
      } else updateCell(row, col, currInputNumber);
    } else {
      // Otherwise, activate the cell-first mode
      setActiveCell({ row, col });
      setCurrInputNumber(-1); // Deactivate any active number
      setInputMode("cellFirst");
    }

    if (currInputNumber > 0 && getNumCount(currInputNumber) <= 0) {
      resetInputMode();
    }
  };

  const resetInputMode = () => {
    setInputMode("noInput");
    setCurrInputNumber(-1);
    setActiveCell(null);
  };

  useEffect(() => {
    markInvalidCells();
  }, [invalidCells]);

  useEffect(() => {
    markActiveCell();
  }, [activeCell]);

  useEffect(() => {
    console.log("inputMode:" + inputMode);
  }, [inputMode]);

  const markActiveCell = () => {
    if (activeCell) {
      const cellElement = document.querySelector(
        `[data-row="${activeCell.row}"][data-col="${activeCell.col}"]`
      );

      if (cellElement) {
        cellElement.classList.add("active-cell");
      }
    } else {
      // Apply visual updates
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cellElement = document.querySelector(
            `[data-row="${i}"][data-col="${j}"]`
          );

          if (cellElement) {
            cellElement.classList.remove("active-cell");
          }
        }
      }
    }
  };

  const markInvalidCells = () => {
    if (settings.highlightErrors) {
      // console.log("markInvalidCells");
      // console.log("invalidCells" + invalidCells);

      // Apply visual updates
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cellKey = `${i}-${j}`;
          // console.log("Checking cellKey:" + cellKey);

          const cellElement = document.querySelector(
            `[data-row="${i}"][data-col="${j}"]`
          );

          if (cellElement) {
            if (invalidCells.has(cellKey)) {
              cellElement.classList.add("red");
            } else {
              cellElement.classList.remove("red");
            }
          }
        }
      }
    }
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

    console.log(sudokuGrid);
    console.log(solutionGrid);
  };

  // Load game state from localStorage (if any)
  const loadGameState = () => {
    const savedState = JSON.parse(localStorage.getItem("sudokuState"));
    if (savedState) {
      updateGameDifficulty(savedState.gameDifficulty);
      updateTimer(savedState.elapsedTime);
      setSudokuGrid(savedState.sudokuGrid);
      setSolutionGrid(savedState.solutionGrid);
      setHintGrid(savedState.hintGrid);
    }
  };

  const getNumCount = (num) => {
    let sum = 0;

    // Check rows and columns
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (solutionGrid[i][j] == num) {
          sum += 1;
        }
      }
    }

    return 9 - sum;
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
        handleCellClick,
        handleNumberClick,
        resetInputMode,
        getNumCount,
        hintGrid,
        setHintGrid,
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
