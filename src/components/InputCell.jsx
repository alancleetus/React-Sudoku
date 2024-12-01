import PropTypes from "prop-types";

import { useState, useEffect } from "react";

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

  const [classes, setClasses] = useState("sudoku-cell");

  function onClickCell() {
    if (initialValue == 0) {
      const validMove = handleCellValueChange(row, col, currInputNumber);
      !validMove && setClasses((prev) => prev + " red");
      setCellValue(currInputNumber > 0 ? currInputNumber : null);
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
  currInputNumber: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  initialValue: PropTypes.number.isRequired,
  handleCellValueChange: PropTypes.func.isRequired,
};
