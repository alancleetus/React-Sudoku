import { useState } from "react";
import "./App.css";
import ButtonNumberContainer from "./components/ButtonNumberContainer";
import GameGrid from "./components/GameGrid";
import ThemeSelector from "./components/ThemeSelector";
import "./theme.css";

function App() {
  const [currInputNumber, setCurrInputNumber] = useState(-1);

  return (
    <>
      <ThemeSelector />

      {/* Add your Sudoku Grid or other components here */}
      <h1>Sudoku</h1>
      <GameGrid currInputNumber={currInputNumber} />

      <ButtonNumberContainer
        currInputNumber={currInputNumber}
        setCurrInputNumber={setCurrInputNumber}
      />
    </>
  );
}

export default App;
