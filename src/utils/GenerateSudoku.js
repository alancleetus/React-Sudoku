// GenerateSudoku.jsx

import { EmptyGrid } from "../constants/sudokuConstants";
import { validateNewCellValue } from "./SudokuValidator";

// Recursively fills a Sudoku grid using a backtracking algorithm.
// This function ensures that the grid is completely and correctly filled.
const fillSudoku = (SudokuGrid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (SudokuGrid[row][col] === 0) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        shuffleArray(numbers);
        for (let num of numbers) {
          if (validateNewCellValue(SudokuGrid, row, col, num)) {
            SudokuGrid[row][col] = num;
            if (fillSudoku(SudokuGrid)) {
              return true;
            }
            SudokuGrid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

// Shuffles an array in-place using the Fisher-Yates algorithm.
// This is used to randomize the order of numbers for Sudoku generation.
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateSudokuGrid = () => {
  const SudokuGrid = EmptyGrid;

  while (!fillSudoku(SudokuGrid)) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        SudokuGrid[row][col] = 0;
      }
    }
  }

  return SudokuGrid;
};

// Hides values in a Sudoku grid based on the specified difficulty level
// to create the puzzle by replacing cells with 0 (empty).
const hideValues = (SudokuGrid, difficulty) => {
  let cellsToHide;
  switch (difficulty) {
    case "Easy":
      cellsToHide = 25; // Easy: Hide 25 cells
      break;
    case "Medium":
      cellsToHide = 40; // Medium: Hide 40 cells
      break;
    case "Hard":
      cellsToHide = 60; // Hard: Hide 60 cells
      break;
    default:
      cellsToHide = 40; // Default to medium if no valid difficulty is given
  }

  while (cellsToHide > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (SudokuGrid[row][col] !== 0) {
      SudokuGrid[row][col] = 0;
      cellsToHide--;
    }
  }

  return SudokuGrid;
};

// Main function to generate a Sudoku puzzle.
// Creates a fully solved Sudoku grid and then hides values based on the difficulty level.
const GenerateSudoku = (difficulty) => {
  const fullGrid = generateSudokuGrid();
  const puzzleGrid = hideValues(fullGrid, difficulty);
  return puzzleGrid;
};

export default GenerateSudoku;
