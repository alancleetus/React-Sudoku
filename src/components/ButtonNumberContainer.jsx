import PropTypes from "prop-types";
import InputButton from "./InputButton";
import ActionButtons from "./ActionButtons"; // Import the new ActionButtons component

function ButtonNumberContainer({ currInputNumber, setCurrInputNumber }) {
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {/* Action Buttons Section */}
      <ActionButtons
        setCurrInputNumber={setCurrInputNumber}
        currInputNumber={currInputNumber}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <div
          id="number-buttons"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            rowGap: "10px",
            maxWidth: "300px",
            justifyContent: "center",
          }}
        >
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
        </div>
      </div>
    </>
  );
}

ButtonNumberContainer.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
  setCurrInputNumber: PropTypes.func.isRequired,
};

export default ButtonNumberContainer;
