// GenerateSudoku.js
const validateNewCellValue = (SudokuGrid, row, col, newValue) => {
  // Check row
  if (SudokuGrid[row].includes(newValue)) return false;

  // Check column
  for (let i = 0; i < 9; i++) {
    if (SudokuGrid[i][col] === newValue) return false;
  }

  // Check 3x3 grid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (SudokuGrid[i][j] === newValue) return false;
    }
  }

  return true;
};

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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateSudokuGrid = () => {
  const SudokuGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  while (!fillSudoku(SudokuGrid)) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        SudokuGrid[row][col] = 0;
      }
    }
  }

  return SudokuGrid;
};

const hideValues = (SudokuGrid, difficulty) => {
  let cellsToHide;
  switch (difficulty) {
    case "easy":
      cellsToHide = 20; // Easy: Hide 20 cells
      break;
    case "medium":
      cellsToHide = 40; // Medium: Hide 40 cells
      break;
    case "hard":
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

const GenerateSudoku = (difficulty) => {
  const fullGrid = generateSudokuGrid();
  const puzzleGrid = hideValues(fullGrid, difficulty);
  return puzzleGrid;
};

export default GenerateSudoku;
