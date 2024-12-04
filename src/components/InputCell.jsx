import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { useSudokuContext } from "../contexts/SudokuProvider";

export default function InputCell({ row, col }) {
  const { sudokuGrid, solutionGrid, handleCellClick } = useSudokuContext();

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
      onClick={() => handleCellClick(row, col)}
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
