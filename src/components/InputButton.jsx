import PropTypes from "prop-types";
import { useSudokuContext } from "../contexts/SudokuProvider";

export default function InputButton({ num }) {
  const { currInputNumber, handleNumberClick } = useSudokuContext();

  return (
    <button
      onClick={() => handleNumberClick(num)}
      value={num > 0 && num}
      className={currInputNumber == num ? "num-button active" : "num-button"}
    >
      {num}
    </button>
  );
}

InputButton.propTypes = {
  num: PropTypes.number.isRequired,
};
