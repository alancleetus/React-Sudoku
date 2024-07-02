import PropTypes from "prop-types";
import { useEffect } from "react";

export default function InputButton({ num, setCurrInputNumber, currInput }) {
  function onButtonClick(e) {
    setCurrInputNumber(e.target.value);
  }

  // useEffect(() => {
  //   console.log("num:" + num);
  //   console.log("currInput:" + currInput);
  //   console.log(currInput == num);
  // }, [num, currInput]);
  return (
    <button
      onClick={onButtonClick}
      value={num}
      className={currInput == num ? "num-button active" : "num-button"}
    >
      {num}
    </button>
  );
}

InputButton.propTypes = {
  num: PropTypes.string.isRequired,
  setCurrInputNumber: PropTypes.func.isRequired,
  currInput: PropTypes.number.isRequired,
};
