import { useState } from "react";
import "./App.css";
import InputButton from "./components/InputButton";
import InputCell from "./components/InputCell";
import SudokuGrid from "./components/ExampleGrid";

function App() {
  const [currInputNumber, setCurrInputNumber] = useState(-1);
  const [solveGrid, setSolveGrid] = useState(SudokuGrid);

  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  function handleCellValueChange(row, col, newValue) {
    //console.log({ row, col, newValue });
    return validateNewCellValue({ row, col, newValue });
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
    isInRow && console.log(`${newValue} is in row`);
    isInCol && console.log(`${newValue} is in col`);

    /*
    ! TODO: add code to validate 3x3 cells
    */

    return true;
  };

  return (
    <>
      <h1>Sudoku</h1>

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
          setCurrInputNumber(null);
        }}
        value={null}
        className={
          currInputNumber === null ? "num-button active" : "num-button"
        }
      >
        clear
      </button>
    </>
  );
}

export default App;
