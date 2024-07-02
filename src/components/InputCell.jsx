import PropTypes from "prop-types";

import { useState } from "react";

export default function InputCell({ currInputNumber, row, col }) {
  const [cellValue, setCellValue] = useState(null);

  function onClickCell() {
    setCellValue(currInputNumber > 0 ? currInputNumber : null);
  }

  let classes = "sudoku-cell";
  if (row === 2 || row === 5) classes = "sudoku-cell bottom-margin ";
  if (col === 2 || col === 5) classes = classes + " right-margin ";

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
};
