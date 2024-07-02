import { useState, useRef } from "react";
import "./App.css";
import InputButton from "./components/InputButton";
import InputCell from "./components/InputCell";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [currInputNumber, setCurrInputNumber] = useState(-1);

  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <h1>Sudoku</h1>

      <InputCell key={uuidv4()} currInputNumber={currInputNumber} />

      <hr></hr>
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
          setCurrInputNumber(null);
        }}
        value={null}
        className={
          currInputNumber === null ? "num-button active" : "num-button"
        }
      >
        clear
      </button>
    </>
  );
}

export default App;
