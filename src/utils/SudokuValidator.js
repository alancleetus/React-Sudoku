export const validateNewCellValue = (SudokuGrid, row, col, newValue) => {
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

export const checkSolution = (SudokuGrid) => {
  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (SudokuGrid[i][j] <= 0) {
        return false; //grid incomplete
      }
    }
  }
  return validateSudokuGrid(SudokuGrid);
};

export const validateSudokuGrid = (SudokuGrid) => {
  const newInvalidCellsSet = new Set();

  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    const rowValues = {};
    const colValues = {};
    for (let j = 0; j < 9; j++) {
      // Row validation
      if (SudokuGrid[i][j] > 0) {
        if (rowValues[SudokuGrid[i][j]]) {
          newInvalidCellsSet.add(`${i}-${j}`);
          newInvalidCellsSet.add(`${i}-${rowValues[SudokuGrid[i][j]]}`);
        } else {
          rowValues[SudokuGrid[i][j]] = j;
        }
      }

      // Column validation
      if (SudokuGrid[j][i] > 0) {
        if (colValues[SudokuGrid[j][i]]) {
          newInvalidCellsSet.add(`${j}-${i}`);
          newInvalidCellsSet.add(`${colValues[SudokuGrid[j][i]]}-${i}`);
        } else {
          colValues[SudokuGrid[j][i]] = j;
        }
      }
    }
  }

  // Check 3x3 grids
  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      const blockValues = {};
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const cellValue = SudokuGrid[blockRow * 3 + i][blockCol * 3 + j];
          if (cellValue > 0) {
            const cellKey = `${blockRow * 3 + i}-${blockCol * 3 + j}`;
            if (blockValues[cellValue]) {
              newInvalidCellsSet.add(cellKey);
              newInvalidCellsSet.add(blockValues[cellValue]);
            } else {
              blockValues[cellValue] = cellKey;
            }
          }
        }
      }
    }
  }

  return newInvalidCellsSet;
};

// Function to validate hints and apply error handling
export const validateHints = (newHintGrid, solutionGrid, settings) => {
  console.log("validateHints");

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cellElement = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );

      if (cellElement?.children[1]) {
        // Check if there are hints for this cell
        for (let num = 1; num <= 9; num++) {
          const hintIsValid = validateNewCellValue(solutionGrid, row, col, num);
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
