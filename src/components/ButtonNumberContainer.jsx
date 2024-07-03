import PropTypes from "prop-types";
import InputButton from "./InputButton";

function ButtonNumberContainer({ currInputNumber, setCurrInputNumber }) {
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <p>{currInputNumber > 0 ? currInputNumber : "Select a num below"}</p>

      {numList.map((num) => {
        return (
          <InputButton
            key={"button_" + num}
            num={num}
            setCurrInputNumber={setCurrInputNumber}
            currInput={currInputNumber}
          ></InputButton>
        );
      })}

      <button
        onClick={() => {
          setCurrInputNumber(-1);
        }}
        value={-1}
        className={currInputNumber === -1 ? "num-button active" : "num-button"}
      >
        clear
      </button>
    </>
  );
}

export default ButtonNumberContainer;

ButtonNumberContainer.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
  setCurrInputNumber: PropTypes.func.isRequired,
};
