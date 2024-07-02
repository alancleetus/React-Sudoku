import PropTypes from "prop-types";

import { useState } from "react";

export default function InputCell({ currInputNumber }) {
  const [cellValue, setCellValue] = useState(null);

  function onClickCell() {
    setCellValue(currInputNumber > 0 ? currInputNumber : null);
  }

  return (
    <div className="input-num-cell" onClick={onClickCell}>
      <div>{cellValue}</div>
    </div>
  );
}

InputCell.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
};
