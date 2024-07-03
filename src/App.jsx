import { useState } from "react";
import "./App.css";
import ButtonNumberContainer from "./components/ButtonNumberContainer";
import GameGrid from "./components/GameGrid";
function App() {
  const [currInputNumber, setCurrInputNumber] = useState(-1);

  return (
    <>
      <h1>Sudoku</h1>
      <GameGrid currInputNumber={currInputNumber} />
      <hr></hr>
      <ButtonNumberContainer
        currInputNumber={currInputNumber}
        setCurrInputNumber={setCurrInputNumber}
      />
    </>
  );
}

export default App;
