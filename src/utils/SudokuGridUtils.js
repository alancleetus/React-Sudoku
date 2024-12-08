export const markActiveCell = (activeCell, settings) => {
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
    if (settings?.highlightRowCol) {
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

export const markInvalidCells = (invalidCells, settings) => {
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

export // Highlight cells with the same number
const highlightSameDigit = (
  inputMode,
  activeCell,
  solutionGrid,
  currInputNumber,
  highlightNumber,
  settings
) => {
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
