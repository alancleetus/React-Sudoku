import PropTypes from "prop-types";
import InputCell from "./InputCell";
import { useState } from "react";

function GameGrid({
  currInputNumber,
  SudokuGrid,
  SolutionGrid,
  setSolutionGrid,
}) {
  const [invalidCells, setInvalidCells] = useState(new Set()); // Track invalid cells

  function revalidateSolutionGrid(updatedGrid) {
    const newInvalidCells = new Set();

    // Check rows and columns
    for (let i = 0; i < 9; i++) {
      const rowValues = {};
      const colValues = {};
      for (let j = 0; j < 9; j++) {
        // Row validation
        if (updatedGrid[i][j] > 0) {
          if (rowValues[updatedGrid[i][j]]) {
            newInvalidCells.add(`${i}-${j}`);
            newInvalidCells.add(`${i}-${rowValues[updatedGrid[i][j]]}`);
          } else {
            rowValues[updatedGrid[i][j]] = j;
          }
        }

        // Column validation
        if (updatedGrid[j][i] > 0) {
          if (colValues[updatedGrid[j][i]]) {
            newInvalidCells.add(`${j}-${i}`);
            newInvalidCells.add(`${colValues[updatedGrid[j][i]]}-${i}`);
          } else {
            colValues[updatedGrid[j][i]] = j;
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
            const cellValue = updatedGrid[blockRow * 3 + i][blockCol * 3 + j];
            if (cellValue > 0) {
              const cellKey = `${blockRow * 3 + i}-${blockCol * 3 + j}`;
              if (blockValues[cellValue]) {
                newInvalidCells.add(cellKey);
                newInvalidCells.add(blockValues[cellValue]);
              } else {
                blockValues[cellValue] = cellKey;
              }
            }
          }
        }
      }
    }

    // Update invalid cells set
    setInvalidCells(newInvalidCells);

    // Apply visual updates
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cellKey = `${i}-${j}`;
        const cellElement = document.querySelector(
          `[data-row="${i}"][data-col="${j}"]`
        );
        if (cellElement) {
          if (newInvalidCells.has(cellKey)) {
            cellElement.classList.add("red");
          } else {
            cellElement.classList.remove("red");
          }
        }
      }
    }
  }

  // Input value into cell
  function updateSolutionGrid(row, col, newValue) {
    console.log("updating solution");
    setSolutionGrid((prevGrid) => {
      let newGrid = prevGrid.map((row) => [...row]); // Deep copy
      newGrid[row][col] = newValue;
      revalidateSolutionGrid(newGrid); // Revalidate after update
      return newGrid;
    });
  }

  // When inputting value, validate the value
  function handleCellValueChange(row, col, newValue) {
    //console.log({ row, col, newValue });

    if (newValue > 0) return validateNewCellValue({ row, col, newValue });
    else updateSolutionGrid(row, col, 0);
    return true;
  }

  const validateNewCellValue = ({ row, col, newValue }) => {
    console.log("validateNewCellValue");
    //check each row for new value
    const isInRow = SolutionGrid[row].find((i) => {
      return i == newValue;
    })
      ? true
      : false;

    //check each col for new value
    const isInCol = SolutionGrid.map((eachRow) => {
      return eachRow[col] == newValue;
    }).find((flag) => {
      return flag === true;
    })
      ? true
      : false;

    // check if new value in 3x3 grid

    let startingRow = Math.floor(row / 3) * 3;
    let startingCol = Math.floor(col / 3) * 3;

    let endingRow = startingRow + 2;
    let endingCol = startingCol + 2;

    let isInQuadrant = false;
    // console.log(`${row},${col} `);
    // console.log(`${startingRow},${endingRow}, ${startingCol},${endingCol} `);
    for (let i = startingRow; i <= endingRow; i++) {
      for (let j = startingCol; j <= endingCol; j++) {
        //console.log(SolutionGrid[i][j]);
        if (SolutionGrid[i][j] == newValue) isInQuadrant = true;
      }
    }

    isInRow && console.log(`${newValue} is in row`);
    isInCol && console.log(`${newValue} is in col`);
    isInQuadrant && console.log(`${newValue} is in 3x3 grid`);

    updateSolutionGrid(row, col, newValue);

    return !isInRow && !isInCol && !isInQuadrant;
  };

  // useEffect(() => {
  //   console.log(SolutionGrid);
  // }, [SolutionGrid]);

  return (
    <>
      <div id="sudoku-game-grid">
        {/* returns [...Array(9).keys()] arr [1,2,..,9]*/}
        {[...Array(9).keys()].map((i) => {
          return (
            <div className="sudoku-row" key={i}>
              {[...Array(9).keys()].map((j) => {
                return (
                  <InputCell
                    key={"row" + i + "col" + j}
                    row={i}
                    col={j}
                    initialValue={SudokuGrid[i][j]}
                    currInputNumber={currInputNumber}
                    handleCellValueChange={handleCellValueChange}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default GameGrid;

GameGrid.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
  gameDifficulty: PropTypes.string.isRequired,
  SudokuGrid: PropTypes.array.isRequired,
  SolutionGrid: PropTypes.array,
  setSolutionGrid: PropTypes.func.isRequired,
};
