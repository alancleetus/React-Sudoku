import InputButton from "./InputButton";
import ActionButtons from "./ActionButtons"; // Import the new ActionButtons component

function ButtonNumberContainer() {
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {/* Action Buttons Section */}
      <ActionButtons />

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
            return <InputButton key={"button_" + num} num={num}></InputButton>;
          })}
        </div>
      </div>
    </>
  );
}

export default ButtonNumberContainer;
