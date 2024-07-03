import { useEffect, useState } from "react";
import "./App.css";
import InputButton from "./components/InputButton";
import InputCell from "./components/InputCell";
import SudokuGrid from "./components/ExampleGrid";

function App() {
  const [currInputNumber, setCurrInputNumber] = useState(-1);
  const [solveGrid, setSolveGrid] = useState(
    SudokuGrid.map((row) => row.slice())
  );

  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleCellValueChange(row, col, newValue) {
    //console.log({ row, col, newValue });
    return validateNewCellValue({ row, col, newValue });
  }

  function updateSolution(row, col, newValue) {
    console.log("updating solution");
    setSolveGrid((prevGrid) => {
      let newGrid = prevGrid;
      newGrid[row][col] = newValue;
      return newGrid;
    });
  }
  const validateNewCellValue = ({ row, col, newValue }) => {
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

  useEffect(() => {
    console.log(solveGrid);
  }, [solveGrid]);

  return (
    <>
      <h1>Sudoku</h1>

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

      <hr></hr>
      <p>{currInputNumber > 0 ? currInputNumber : "Select a num below"}</p>

      {numList.map((num) => {
        return (
          <InputButton
            key={"button_" + num}
            num={num}
            setCurrInputNumber={setCurrInputNumber}
            currInput={currInputNumber}
          ></InputButton>
        );
      })}

      <button
        onClick={() => {
          setCurrInputNumber(-1);
        }}
        value={-1}
        className={currInputNumber === -1 ? "num-button active" : "num-button"}
      >
        clear
      </button>
    </>
  );
}

export default App;
