import PropTypes from "prop-types";

import { useState } from "react";

export default function InputCell({
  currInputNumber,
  row,
  col,
  initialValue,
  handleCellValueChange,
}) {
  const [cellValue, setCellValue] = useState(
    initialValue > 0 ? initialValue : null
  );

  function onClickCell() {
    if (initialValue == 0) {
      handleCellValueChange(row, col, currInputNumber);
      setCellValue(currInputNumber > 0 ? currInputNumber : null);
    }
  }

  let classes = "sudoku-cell";
  if (row === 2 || row === 5) classes = "sudoku-cell bottom-margin ";
  if (col === 2 || col === 5) classes = classes + " right-margin ";
  if (initialValue > 0) classes = classes + " constant-value";

  return (
    <div className={classes} onClick={onClickCell}>
      <div>{cellValue}</div>
    </div>
  );
}

InputCell.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  initialValue: PropTypes.number.isRequired,
  handleCellValueChange: PropTypes.func.isRequired,
};
