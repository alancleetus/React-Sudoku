import PropTypes from "prop-types";
import { useSudokuContext } from "../contexts/SudokuProvider";
import { useSettingsContext } from "../contexts/SettingsContext";
export default function InputButton({ num }) {
  const { currInputNumber, handleNumberClick, getNumCount } =
    useSudokuContext();
  const { settings } = useSettingsContext();
  return (
    <button
      onClick={() => handleNumberClick(num)}
      value={num > 0 && num}
      className={currInputNumber == num ? "num-button active" : "num-button"}
      disabled={
        getNumCount(num) <= 0 && settings.disableDigitWhenNine ? "disabled" : ""
      }
    >
      {num}
      {settings.showRemainingDigits && (
        <span className="button__badge ">{getNumCount(num)}</span>
      )}
    </button>
  );
}

InputButton.propTypes = {
  num: PropTypes.number.isRequired,
};
