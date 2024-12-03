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

export const validateSudokuGrid = (SudokuGrid) => {
  const invalidCellsArr = [];
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

  // Update invalid cells set
  invalidCellsArr.push(newInvalidCellsSet);

  return invalidCellsArr;
};

// const validateNewCellValue = ({ row, col, newValue }) => {
//   console.log("validateNewCellValue");
//   //check each row for new value
//   const isInRow = SolutionGrid[row].find((i) => {
//     return i == newValue;
//   })
//     ? true
//     : false;

//   //check each col for new value
//   const isInCol = SolutionGrid.map((eachRow) => {
//     return eachRow[col] == newValue;
//   }).find((flag) => {
//     return flag === true;
//   })
//     ? true
//     : false;

//   // check if new value in 3x3 grid

//   let startingRow = Math.floor(row / 3) * 3;
//   let startingCol = Math.floor(col / 3) * 3;

//   let endingRow = startingRow + 2;
//   let endingCol = startingCol + 2;

//   let isInQuadrant = false;
//   // console.log(`${row},${col} `);
//   // console.log(`${startingRow},${endingRow}, ${startingCol},${endingCol} `);
//   for (let i = startingRow; i <= endingRow; i++) {
//     for (let j = startingCol; j <= endingCol; j++) {
//       //console.log(SolutionGrid[i][j]);
//       if (SolutionGrid[i][j] == newValue) isInQuadrant = true;
//     }
//   }

//   isInRow && console.log(`${newValue} is in row`);
//   isInCol && console.log(`${newValue} is in col`);
//   isInQuadrant && console.log(`${newValue} is in 3x3 grid`);

//   return !isInRow && !isInCol && !isInQuadrant;
// };
