import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  validateSudokuGrid,
  checkSolution,
  validateHints,
} from "../utils/SudokuValidator";
import { EmptyGrid, EmptyHintGrid } from "../constants/sudokuConstants";
import { createContext, useContext } from "react";
import { useTimerContext } from "./TimerContext";
import { useGameDifficultyContext } from "./GameDifficultyProvider";
import { useScreenContext } from "./ScreenContext";
import { useSettingsContext } from "./SettingsContext";
import GenerateSudoku from "../utils/GenerateSudoku";
import { cloneDeep, isEqual } from "lodash";
import { useGameHistoryContext } from "./GameHistoryProvider";
import {
  highlightSameDigit,
  markActiveCell,
  markInvalidCells,
} from "../utils/SudokuGridUtils";

const SudokuContext = createContext(0);
export const SudokuProvider = ({ children }) => {
  const { switchScreen, currentScreen } = useScreenContext();
  const { gameDifficulty, updateGameDifficulty } = useGameDifficultyContext();
  const { resetTimer, pauseTimer, updateTimer, elapsedTime } =
    useTimerContext();
  const { settings, initialSettings, setSettings, setInitialSettings } =
    useSettingsContext();
  const {
    gameHistory,
    saveGameToHistory,
    getGameFromHistory,
    deleteGameFromHistory,
  } = useGameHistoryContext();
  const [gameId, setGameId] = useState(() => Date.now());

  const [sudokuGrid, setSudokuGrid] = useState(() => EmptyGrid());
  const [solutionGrid, setSolutionGrid] = useState(() => EmptyGrid());
  const [hintGrid, setHintGrid] = useState(() => EmptyHintGrid());

  const [invalidCells, setInvalidCells] = useState(new Set()); // Track invalid cells
  const [currInputNumber, setCurrInputNumber] = useState(-1); // Active number (-1 means none)
  const [activeCell, setActiveCell] = useState(null); // Active cell (null means none)
  const [inputMode, setInputMode] = useState("noInput"); // Modes: "noInput", "numberFirst", "cellFirst"
  const [highlightNumber, setHighlightNumber] = useState(-1);

  // History and future stacks for undo/redo
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const saveToHistory = () => {
    console.log("SAVE TO HISTORY", history);

    // Check if the current state matches the latest state in history
    const currentState = {
      sudokuGrid: cloneDeep(sudokuGrid),
      solutionGrid: cloneDeep(solutionGrid),
      hintGrid: cloneDeep(hintGrid),
    };

    const isSameAsLastHistory =
      history.length > 0 && isEqual(currentState, history[0]); // Compare with the last state in history

    if (isSameAsLastHistory) {
      console.log(
        "Current state is the same as the last history state. Not saving."
      );
      return; // Do not add to history if the state is the same
    }

    setHistory((prev) => [currentState, ...prev]);
    setFuture([]); // Clear redo stack on new action
  };

  useEffect(() => {
    console.log("history: ", history.length);
    console.log("history: ", history);
    console.log("future: ", future.length);
    console.log("future: ", future);
  }, [history, future]);
  const undo = () => {
    console.log("UNDO");
    if (history.length === 0) {
      console.warn("No history to undo.");
      return;
    }

    // Save the current state to future
    const currentState = {
      sudokuGrid: cloneDeep(sudokuGrid),
      solutionGrid: cloneDeep(solutionGrid),
      hintGrid: cloneDeep(hintGrid),
    };
    setFuture((prev) => [currentState, ...prev]);
    // Restore the last state from history
    const [lastState, ...remainingState] = history;
    setSudokuGrid(cloneDeep(lastState.sudokuGrid));
    setSolutionGrid(cloneDeep(lastState.solutionGrid));
    setHintGrid(cloneDeep(lastState.hintGrid));

    // Remove the last state from history
    setHistory(remainingState);

    console.log(lastState);

    // Validate the restored state
    console.log("revalidate");
    setInvalidCells(validateSudokuGrid(lastState.solutionGrid));
    validateHints(lastState.hintGrid, lastState.solutionGrid, settings);
  };

  const redo = () => {
    console.log("REDO");
    if (future.length === 0) return;

    const [nextState, ...remainingState] = future;
    setFuture(remainingState); // Remove first state from future

    // Push current state to history
    setHistory((prev) => [
      {
        sudokuGrid: JSON.parse(JSON.stringify(sudokuGrid)),
        solutionGrid: JSON.parse(JSON.stringify(solutionGrid)),
        hintGrid: JSON.parse(JSON.stringify(hintGrid)),
      },
      ...prev,
    ]);

    // Restore the next state
    setSudokuGrid(cloneDeep(nextState.sudokuGrid));
    setSolutionGrid(cloneDeep(nextState.solutionGrid));
    setHintGrid(cloneDeep(nextState.hintGrid));
  };

  useEffect(() => {
    console.log("changed Solution:", solutionGrid);
  }, [solutionGrid]);

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
    // console.log("Saving game state to localStorage:", gameState); // Debug log
    saveGameToHistory(gameState);
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

    saveToHistory(); // Save the current state for undo/redo
    //console.log("updating solution");
    //console.log("row:" + row + ", col:" + col + ", val:" + value);

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
      const validatedHintsGrid = validateHints(
        newHintGrid,
        solutionGrid,
        settings
      );
      setHintGrid(validatedHintsGrid);
    } else {
      // not in pencil mode, update solution grid
      const newGrid = [...solutionGrid];
      newGrid[row][col] = value;

      setSolutionGrid(cloneDeep(newGrid));

      validateSudokuGrid(solutionGrid, row, col, value);

      if (checkSolution(solutionGrid)) {
        alert("Completed!");
        deleteGameFromHistory(gameId);
        pauseTimer();
      }

      setInvalidCells(validateSudokuGrid(newGrid)); // Revalidate after update

      validateHints(hintGrid, solutionGrid, settings);
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
          highlightSameDigit(
            inputMode,
            activeCell,
            solutionGrid,
            currInputNumber,
            highlightNumber,
            settings
          );
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
              highlightSameDigit(
                inputMode,
                activeCell,
                solutionGrid,
                currInputNumber,
                highlightNumber,
                settings
              );
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
              highlightSameDigit(
                inputMode,
                activeCell,
                solutionGrid,
                currInputNumber,
                highlightNumber,
                settings
              );
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
    markInvalidCells(invalidCells, settings);
  }, [invalidCells]);

  useEffect(() => {
    if (currentScreen != "game") resetInputMode();
    else {
      markInvalidCells(invalidCells, settings);
      validateHints(hintGrid, solutionGrid, settings);
    }
  }, [currentScreen]);

  useEffect(() => {
    markActiveCell(activeCell, settings);
  }, [activeCell]);

  useEffect(() => {
    highlightSameDigit(
      inputMode,
      activeCell,
      solutionGrid,
      currInputNumber,
      highlightNumber,
      settings
    );
  }, [activeCell, currInputNumber, highlightNumber, solutionGrid]);

  // Start a new game
  const startNewGame = () => {
    console.debug("Start New Game...");
    // Generate a new Sudoku grid
    const newGrid = GenerateSudoku(gameDifficulty);

    const initialHistoryState = {
      sudokuGrid: cloneDeep(newGrid),
      solutionGrid: cloneDeep(newGrid),
      hintGrid: EmptyHintGrid(),
    };
    setHistory([initialHistoryState]); // Save the initial state
    setFuture([]);
    // Reset states (for a new game)
    setGameId(() => Date.now());
    resetTimer();
    setCurrInputNumber(-1);

    // Update grids
    setSudokuGrid(cloneDeep(newGrid));
    setSolutionGrid(cloneDeep(newGrid)); // Create a deep copy for the solution grid
    setHintGrid(EmptyHintGrid());

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
    saveGameToHistory(newGameState);

    switchScreen("game");
  };

  const loadHistoricalGame = (oldGameId) => {
    console.debug("Load Old Game...");
    const oldGame = getGameFromHistory(oldGameId);

    if (oldGame) {
      setGameId(oldGame.gameId);
      setCurrInputNumber(-1); // Reset input number
      setSudokuGrid(oldGame.sudokuGrid);
      setSolutionGrid(oldGame.solutionGrid); // Create a deep copy for the solution grid
      setHintGrid(oldGame.hintGrid);
      updateTimer(oldGame.elapsedTime);
      updateGameDifficulty(oldGame.gameDifficulty);
      setSettings(oldGame.settings);
      setInitialSettings(oldGame.initialSettings);

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
        undo,
        redo,
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
