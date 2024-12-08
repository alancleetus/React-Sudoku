import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  validateSudokuGrid,
  checkSolution,
  validateNewCellValue,
} from "../utils/SudokuValidator";
import { EmptyGrid, EmptyHintGrid } from "../constants/sudokuConstants";
import { createContext, useContext } from "react";
import { useTimerContext } from "./TimerContext";
import { useGameDifficultyContext } from "./GameDifficultyProvider";
import { useScreenContext } from "./ScreenContext";
import { useSettingsContext } from "./SettingsContext";
import GenerateSudoku from "../utils/GenerateSudoku";
import { isEqual } from "lodash";

const SudokuContext = createContext(0);
export const SudokuProvider = ({ children }) => {
  const { switchScreen, currentScreen } = useScreenContext();
  const { gameDifficulty, updateGameDifficulty } = useGameDifficultyContext();
  const { resetTimer, pauseTimer, updateTimer, elapsedTime } =
    useTimerContext();
  const { settings, initialSettings, setSettings, setInitialSettings } =
    useSettingsContext();

  const [gameId, setGameId] = useState(() => Date.now());
  const [sudokuGrid, setSudokuGrid] = useState(() => EmptyGrid());
  const [solutionGrid, setSolutionGrid] = useState(() => EmptyGrid());
  const [hintGrid, setHintGrid] = useState(() => EmptyHintGrid());
  const [invalidCells, setInvalidCells] = useState(new Set()); // Track invalid cells
  const [currInputNumber, setCurrInputNumber] = useState(-1); // Active number (-1 means none)
  const [activeCell, setActiveCell] = useState(null); // Active cell (null means none)
  const [inputMode, setInputMode] = useState("noInput"); // Modes: "noInput", "numberFirst", "cellFirst"
  const [highlightNumber, setHighlightNumber] = useState(-1);

  const [gameHistory, setGameHistory] = useState(() => []); // Array to store game history with IDs
  // Whenever the game state changes, update localStorage
  useEffect(() => {
    if (isEqual(sudokuGrid, EmptyGrid())) return; // if sudoku grid is being reset, don't save state

    const gameState = {
      gameId, // Unique ID for the game state
      gameDifficulty,
      elapsedTime,
      sudokuGrid,
      solutionGrid,
      hintGrid: hintGrid.map((row) => row.map((cell) => ({ ...cell }))), // Deep clone the hint grid
      settings,
      initialSettings,
    };
    console.log("Saving game state to localStorage:", gameState); // Debug log
    setGameHistory((prevHistory) => {
      const existingGameIndex = prevHistory.findIndex(
        (game) => game.id === gameState.id
      );
      if (existingGameIndex !== -1) {
        // Update existing game in history if ID matches, without resetting the elapsed time
        const updatedGame = {
          ...prevHistory[existingGameIndex],
          ...gameState,
        };
        const newHistory = [...prevHistory];
        newHistory[existingGameIndex] = updatedGame;
        return newHistory;
      } else {
        // Add new game to history
        return [...prevHistory, gameState].slice(-10); // Limit history to 10 games
      }
    });
    localStorage.setItem(
      "sudokuHistory",
      JSON.stringify(gameHistory) // Save the entire game history
    );
  }, [
    sudokuGrid,
    solutionGrid,
    hintGrid,
    gameDifficulty,
    settings,
    initialSettings,
  ]);

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

      // After updating the hints, validate each hint value and handle errors
      const validatedHintsGrid = validateHints(newHintGrid);
      setHintGrid(validatedHintsGrid);
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

      validateHints(hintGrid);
    }
  };

  // Function to validate hints and apply error handling
  const validateHints = (newHintGrid) => {
    console.log("validateHints");

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cellElement = document.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );

        if (cellElement?.children[1]) {
          // Check if there are hints for this cell
          for (let num = 1; num <= 9; num++) {
            const hintIsValid = validateNewCellValue(
              solutionGrid,
              row,
              col,
              num
            );
            const hintCell = cellElement.children[1].querySelector(
              `[data-hint="${num}"]`
            );

            if (hintCell) {
              if (!hintIsValid) {
                //console.log(hintCell);
                // Invalid hint, handle based on settings
                if (settings.highlightNoteErrors) {
                  // Mark invalid hints as red
                  hintCell.classList.add("red");
                }
                if (settings.autoRemoveInvalidNotes)
                  hintCell.classList.remove("shown");
              } else {
                // Valid hint, ensure it's shown
                hintCell.classList.remove("red");
              }
            }
          }
        }
      }
    }
    return newHintGrid;
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
      if (solutionGrid[activeCell.row][activeCell.col] == num)
        updateCell(activeCell.row, activeCell.col, 0);
      else updateCell(activeCell.row, activeCell.col, num);
    }
  };

  const handleCellClick = (row, col) => {
    // Check if the clicked cell is non-editable (pre-filled in the original grid)
    if (sudokuGrid[row][col] > 0) {
      console.debug("Clicked on a prefilled cell at", { row, col });

      if (!settings.allowPrefilledNumberInteraction) {
        console.debug("Prefilled number interaction is disabled. Exiting.");
        return;
      }

      if (inputMode === "noInput") {
        // No input mode: toggle highlight for pre-filled numbers
        console.debug("Input mode is 'noInput'.");
        if (highlightNumber === sudokuGrid[row][col]) {
          // Already highlighted: reset highlight
          console.debug(
            "Prefilled number matches the highlighted number. Resetting highlight."
          );
          resetInputMode();
        } else {
          // Highlight other same numbers
          console.debug(
            "Prefilled number does not match the highlighted number. Highlighting prefilled number:",
            sudokuGrid[row][col]
          );
          setHighlightNumber(sudokuGrid[row][col]);
          highlightSameDigit();
        }
      } else if (inputMode === "numberFirst") {
        // Number-first input mode
        console.debug("Input mode is 'numberFirst'.");
        if (settings.resetInputNumberWhenClickedOnMatchingPreFilledNumber) {
          if (currInputNumber === sudokuGrid[row][col]) {
            // Prefilled number matches current input number: reset input mode
            console.debug(
              "Prefilled number matches the current input number. Resetting input mode."
            );
            resetInputMode();
          } else {
            // Prefilled number does not match: reset and highlight the prefilled number

            if (settings.resetInputNumberWhenClickedOnAnyPreFilledNumber) {
              console.debug(
                "Prefilled number does not match the current input number. Resetting input mode and highlighting prefilled number:",
                sudokuGrid[row][col]
              );
              resetInputMode();
              setHighlightNumber(sudokuGrid[row][col]);
              highlightSameDigit();
            }
          }
        } else {
          console.debug(
            "Setting 'resetInputNumberWhenClickedOnMatchingPreFilledNumber' is disabled. No action taken."
          );
        }
      } else if (inputMode === "cellFirst") {
        // Cell-first input mode
        console.debug("Input mode is 'cellFirst'.");
        if (settings.resetActiveCellWhenClickedOnMatchingPreFilledNumber) {
          if (
            activeCell &&
            solutionGrid[activeCell.row][activeCell.col] ===
              sudokuGrid[row][col]
          ) {
            // Prefilled number matches active cell number: reset input mode
            console.debug(
              "Prefilled number matches the active cell number. Resetting input mode."
            );
            resetInputMode();
          } else {
            // Prefilled number does not match: reset and highlight the prefilled number

            if (settings.resetActiveCellWhenClickedOnAnyPreFilledNumber) {
              console.debug(
                "Prefilled number does not match the active cell number. Resetting input mode and highlighting prefilled number:",
                solutionGrid[row][col]
              );
              resetInputMode();
              setHighlightNumber(solutionGrid[row][col]);
              highlightSameDigit();
            }
          }
        } else {
          console.debug(
            "Setting 'resetActiveCellWhenClickedOnMatchingPreFilledNumber' is disabled. No action taken."
          );
        }
      } else {
        console.debug("Unhandled input mode:", inputMode);
      }

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
    setHighlightNumber(-1);
    setActiveCell(null);
  };

  useEffect(() => {
    markInvalidCells();
  }, [invalidCells]);

  useEffect(() => {
    if (currentScreen != "game") resetInputMode();
    else {
      markInvalidCells();
      validateHints(hintGrid);
    }
  }, [currentScreen]);

  useEffect(() => {
    markActiveCell();
  }, [activeCell]);

  // useEffect(() => {
  //   console.log("inputMode:" + inputMode);
  // }, [inputMode]);

  const markActiveCell = () => {
    // Clear previous highlights
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cellElement = document.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );
        if (cellElement) {
          cellElement.classList.remove(
            "active-cell",
            "neighbor-cell",
            "same-number-cell"
          );
        }
      }
    }
    // Highlight the active cell and its neighbors
    if (activeCell) {
      const { row, col } = activeCell;

      // Highlight the active cell
      const activeCellElement = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      if (activeCellElement) {
        activeCellElement.classList.add("active-cell");
      }

      // Highlight neighboring cells in the same row and column
      if (settings.highlightRowCol) {
        for (let i = 0; i < 9; i++) {
          // Row neighbors
          if (i !== col) {
            const rowNeighbor = document.querySelector(
              `[data-row="${row}"][data-col="${i}"]`
            );
            if (rowNeighbor) {
              rowNeighbor.classList.add("neighbor-cell");
            }
          }

          // Column neighbors
          if (i !== row) {
            const colNeighbor = document.querySelector(
              `[data-row="${i}"][data-col="${col}"]`
            );
            if (colNeighbor) {
              colNeighbor.classList.add("neighbor-cell");
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    highlightSameDigit();
  }, [activeCell, currInputNumber, highlightNumber, solutionGrid]);

  // Highlight cells with the same number
  const highlightSameDigit = () => {
    // clear all highlights
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cellElement = document.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );
        if (cellElement) {
          cellElement.classList.remove("same-number-cell");
        }
      }
    }

    if (!settings.highlightSameDigits) return; // Exit if the feature is disabled

    let activeNumber = -1;

    if (inputMode == "cellFirst") {
      if (activeCell) {
        const { row, col } = activeCell;
        activeNumber = solutionGrid[row][col];
      }
    } else if (inputMode == "numberFirst") {
      activeNumber = currInputNumber;
    } else if (inputMode == "noInput") {
      activeNumber = highlightNumber;
    } else {
      activeNumber = -1;
    }

    if (activeNumber <= 0) return;
    // Iterate through all cells to update the highlight state
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cellElement = document.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );

        if (cellElement) {
          if (solutionGrid[i][j] == activeNumber) {
            cellElement.classList.add("same-number-cell");
          } else {
            cellElement.classList.remove("same-number-cell");
          }
        }
      }
    }
  };

  const markInvalidCells = () => {
    if (settings.highlightErrors) {
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
    console.log("Start New Game...");
    // Generate a new Sudoku grid
    const newGrid = GenerateSudoku(gameDifficulty);

    // Reset states (for a new game)
    setGameId(() => Date.now());
    resetTimer();
    setCurrInputNumber(-1);

    // Update grids
    setSudokuGrid(newGrid);
    setSolutionGrid(newGrid.map((row) => row.slice())); // Create a deep copy for the solution grid
    setHintGrid(EmptyHintGrid());

    // Add new game to history
    const newGameState = {
      gameId: Date.now(),
      gameDifficulty,
      elapsedTime: 0,
      sudokuGrid: newGrid,
      solutionGrid: newGrid,
      hintGrid: EmptyHintGrid(),
      settings,
      initialSettings,
    };
    loadGameHistory();
    setGameHistory((prevHistory) => {
      if (prevHistory.some((game) => game.id === newGameState.id)) {
        // Update existing game in history if ID matches
        return prevHistory.map((game) =>
          game.id === newGameState.id ? newGameState : game
        );
      } else {
        // Add new game to history
        return [...prevHistory, newGameState].slice(-10); // Limit history to 10 games
      }
    });

    // Clear saved state and switch to the game screen
    localStorage.removeItem("sudokuHistory");
    switchScreen("game");
  };
  // Load game history from localStorage
  const loadGameHistory = () => {
    const savedHistory =
      JSON.parse(localStorage.getItem("sudokuHistory")) || [];
    setGameHistory(savedHistory);
  };

  useEffect(() => {
    // Load game history on initialization
    loadGameHistory();
  }, []);

  const loadHistoricalGame = (oldGameId) => {
    console.log("Load Old Game...");

    // Find the game with oldGameId from gameHistory
    const oldGame = gameHistory.find((game) => game.id === oldGameId);

    if (oldGame) {
      // Update states
      console.log(oldGame);
      setGameId(oldGame.id);
      setCurrInputNumber(-1); // Reset input number
      setSudokuGrid(oldGame.sudokuGrid);
      setSolutionGrid(oldGame.solutionGrid); // Create a deep copy for the solution grid
      setHintGrid(oldGame.hintGrid);
      updateTimer(oldGame.elapsedTime);
      updateGameDifficulty(oldGame.gameDifficulty);
      setSettings(oldGame.settings);
      setInitialSettings(oldGame.initialSettings);

      // Switch to the game screen (if needed)
      switchScreen("game");
    } else {
      console.error("Game not found!");
    }
  };

  // Resume the game with the highest ID (last played)
  const resumeGame = () => {
    if (gameHistory.length > 0) {
      const latestGame = gameHistory[gameHistory.length - 1]; // Latest game based on ID
      updateGameDifficulty(latestGame.gameDifficulty);
      updateTimer(latestGame.elapsedTime);
      setSudokuGrid(latestGame.sudokuGrid);
      setSolutionGrid(latestGame.solutionGrid);
      setHintGrid(latestGame.hintGrid);
      setSettings(latestGame.settings);
      setInitialSettings(latestGame.initialSettings);
      switchScreen("game");
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
        setSudokuGrid,
        solutionGrid,
        setSolutionGrid,
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
        gameHistory,
        loadHistoricalGame,
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
