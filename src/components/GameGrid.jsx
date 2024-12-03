import InputCell from "./InputCell";
import { useState } from "react";
import {
  validateNewCellValue,
  validateSudokuGrid,
} from "../utils/SudokuValidator";
import { useSudokuContext } from "../contexts/SudokuProvider";
//TODO: REFACTOR THIS  CODE
function GameGrid() {
  const {
    solutionGrid,
    startNewGame,
    resumeGame,
    updateCell,
    currInputNumber,
    setCurrInputNumber,
  } = useSudokuContext();
  const [invalidCells, setInvalidCells] = useState(new Set()); // Track invalid cells

  // Input value into cell
  // function updateSolutionGrid(row, col, newValue) {
  //   console.log("updating solution");
  //   setSolutionGrid((prevGrid) => {
  //     let newGrid = prevGrid.map((row) => [...row]); // Deep copy
  //     newGrid[row][col] = newValue;
  //     setInvalidCells(validateSudokuGrid(newGrid)); // Revalidate after update

  //     // Apply visual updates
  //     for (let i = 0; i < 9; i++) {
  //       for (let j = 0; j < 9; j++) {
  //         const cellKey = `${i}-${j}`;
  //         const cellElement = document.querySelector(
  //           `[data-row="${i}"][data-col="${j}"]`
  //         );
  //         if (cellElement) {
  //           if (invalidCells.has(cellKey)) {
  //             cellElement.classList.add("red");
  //           } else {
  //             cellElement.classList.remove("red");
  //           }
  //         }
  //       }
  //     }

  //     return newGrid;
  //   });
  // }

  // // When inputting value, validate the value
  // function handleCellValueChange(row, col, newValue) {
  //   //console.log({ row, col, newValue });

  //   if (newValue > 0) {
  //     updateCell(row, col, newValue);
  //     return validateNewCellValue({ solutionGrid, row, col, newValue });
  //   } else updateSolutionGrid(row, col, 0);
  //   return true;
  // }

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
                    currInputNumber={currInputNumber}
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
