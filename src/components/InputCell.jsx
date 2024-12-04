import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { useSudokuContext } from "../contexts/SudokuProvider";

export default function InputCell({ row, col }) {
  const { sudokuGrid, solutionGrid, updateCell, currInputNumber } =
    useSudokuContext();

  const initialValue = sudokuGrid[row][col]
    ? sudokuGrid[row][col]
    : solutionGrid[row][col] > 0
    ? solutionGrid[row][col]
    : null;
  const [cellValue, setCellValue] = useState(initialValue);

  useEffect(() => {
    setCellValue(initialValue > 0 ? initialValue : null);
  }, [initialValue]);

  const [classes, setClasses] = useState("sudoku-cell");

  function onClickCell() {
    console.log(
      "onClickCell: row(" +
        row +
        ") col(" +
        col +
        ") currInputNumber (" +
        currInputNumber +
        ")"
    );

    if (sudokuGrid[row][col] === 0) {
      // Handle valid or invalid move
      const validMove = updateCell(row, col, currInputNumber);

      if (currInputNumber === -1) setCellValue(null);
      else setCellValue(currInputNumber);

      setClasses((prev) =>
        validMove || currInputNumber === -1
          ? prev.replace(" red", "")
          : prev.includes(" red")
          ? prev
          : prev + " red"
      );
    }
  }

  useEffect(() => {
    let newClasses = "sudoku-cell";
    if (row === 2 || row === 5) newClasses += " bottom-margin";
    if (col === 2 || col === 5) newClasses += " right-margin";
    if (sudokuGrid[row][col] > 0) newClasses += " locked-cell";
    else newClasses += " editable-cell";

    setClasses(newClasses);
  }, [row, col, sudokuGrid]);

  return (
    <div
      className={classes}
      onClick={onClickCell}
      data-row={row}
      data-col={col}
    >
      <div>{cellValue}</div>
    </div>
  );
}

InputCell.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};
