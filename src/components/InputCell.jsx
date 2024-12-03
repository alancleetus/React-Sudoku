import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { useSudokuContext } from "../contexts/SudokuProvider";

export default function InputCell({ row, col }) {
  const { sudokuGrid, updateCell, currInputNumber } = useSudokuContext();

  const initialValue = sudokuGrid[row][col];
  const [cellValue, setCellValue] = useState(
    initialValue > 0 ? initialValue : null
  );

  useEffect(() => {
    setCellValue(initialValue > 0 ? initialValue : null);
  }, [initialValue]);
  const [classes, setClasses] = useState("sudoku-cell");

  function onClickCell() {
    if (initialValue === 0) {
      // Handle valid or invalid move
      const validMove = updateCell(row, col, currInputNumber);

      if (currInputNumber === -1) setCellValue(null);
      else setCellValue(currInputNumber);

      setClasses((prev) =>
        validMove
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
    if (initialValue > 0) newClasses += " locked-cell";
    else newClasses += " editable-cell";

    setClasses(newClasses);
  }, [row, col, initialValue]);

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
