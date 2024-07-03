import PropTypes from "prop-types";

export default function InputButton({ num, setCurrInputNumber, currInput }) {
  function onButtonClick(e) {
    setCurrInputNumber(parseInt(e.target.value));
  }

  // useEffect(() => {
  //   console.log("num:" + num);
  //   console.log("currInput:" + currInput);
  //   console.log(currInput == num);
  // }, [num, currInput]);
  return (
    <button
      onClick={onButtonClick}
      value={num > 0 && num}
      className={currInput == num ? "num-button active" : "num-button"}
    >
      {num}
    </button>
  );
}

InputButton.propTypes = {
  num: PropTypes.number.isRequired,
  setCurrInputNumber: PropTypes.func.isRequired,
  currInput: PropTypes.number.isRequired,
};
