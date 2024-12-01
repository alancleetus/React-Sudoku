import PropTypes from "prop-types";
import InputCell from "./InputCell";

function GameGrid({
  SudokuGrid,
  currInputNumber,
  SolutionGrid,
  setSolutionGrid,
}) {
  // Input value into cell
  function updateSolutionGrid(row, col, newValue) {
    console.log("updating solution");
    setSolutionGrid((prevGrid) => {
      let newGrid = prevGrid.map((row) => [...row]); // Deep copy
      newGrid[row][col] = newValue;
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
