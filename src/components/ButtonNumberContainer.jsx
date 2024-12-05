import InputButton from "./InputButton";
import ActionButtons from "./ActionButtons"; // Import the new ActionButtons component
import "../assets/styles/NumberButtonStyles.css";

function ButtonNumberContainer() {
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {/* Action Buttons Section */}
      <ActionButtons />

      <div className="button-container">
        <div className="number-buttons-div">
          {numList.map((num) => {
            return <InputButton key={"button_" + num} num={num}></InputButton>;
          })}
        </div>
      </div>
    </>
  );
}

export default ButtonNumberContainer;
