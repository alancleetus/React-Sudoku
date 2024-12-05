import PropTypes from "prop-types";
import { useSudokuContext } from "../contexts/SudokuProvider";

export default function InputButton({ num }) {
  const { currInputNumber, handleNumberClick, getNumCount } =
    useSudokuContext();

  return (
    <button
      onClick={() => handleNumberClick(num)}
      value={num > 0 && num}
      className={currInputNumber == num ? "num-button active" : "num-button"}
      disabled={getNumCount(num) <= 0 ? "disabled" : ""}
    >
      {num}
      <span className="button__badge ">{getNumCount(num)}</span>
    </button>
  );
}

InputButton.propTypes = {
  num: PropTypes.number.isRequired,
};
