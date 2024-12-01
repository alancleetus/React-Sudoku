import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import GenerateSudoku from "./GenerateSudoku";
import InputCell from "./InputCell";

function GameGrid({ currInputNumber }) {
  const [SudokuGrid, setSudokuGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [solveGrid, setSolveGrid] = useState(
    SudokuGrid.map((row) => row.slice())
  );
  useEffect(() => {
    const generateAndSetSudoku = async () => {
      const generatedGrid = await GenerateSudoku("easy");
      console.log("Generated Grid:");
      console.log(generatedGrid);

      setSudokuGrid(generatedGrid);
      setSolveGrid(generatedGrid.map((row) => [...row]));
    };

    generateAndSetSudoku();
  }, []);

  function updateSolution(row, col, newValue) {
    console.log("updating solution");
    setSolveGrid((prevGrid) => {
      let newGrid = prevGrid.map((row) => [...row]); // Deep copy
      newGrid[row][col] = newValue;
      return newGrid;
    });
  }

  function handleCellValueChange(row, col, newValue) {
    //console.log({ row, col, newValue });
    return validateNewCellValue({ row, col, newValue });
  }

  const validateNewCellValue = ({ row, col, newValue }) => {
    console.log("validateNewCellValue");
    //check each row for new value
    const isInRow = solveGrid[row].find((i) => {
      return i == newValue;
    })
      ? true
      : false;

    //check each col for new value
    const isInCol = solveGrid
      .map((eachRow) => {
        return eachRow[col] == newValue;
      })
      .find((flag) => {
        return flag === true;
      })
      ? true
      : false;

    // check if new value in 3x3 grid

    let startingRow = Math.floor(row / 3) * 3;
    let startingCol = Math.floor(col / 3) * 3;

    let endingRow = startingRow + 2;
    let endingCol = startingCol + 2;

    let isInGrid = false;
    // console.log(`${row},${col} `);
    // console.log(`${startingRow},${endingRow}, ${startingCol},${endingCol} `);
    for (let i = startingRow; i <= endingRow; i++) {
      for (let j = startingCol; j <= endingCol; j++) {
        //console.log(solveGrid[i][j]);
        if (solveGrid[i][j] == newValue) isInGrid = true;
      }
    }

    isInRow && console.log(`${newValue} is in row`);
    isInCol && console.log(`${newValue} is in col`);
    isInGrid && console.log(`${newValue} is in 3x3 grid`);

    updateSolution(row, col, newValue);

    return !isInRow && !isInCol && !isInGrid;
  };

  // useEffect(() => {
  //   console.log(solveGrid);
  // }, [solveGrid]);

  return (
    <>
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
    </>
  );
}

export default GameGrid;

GameGrid.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
};
