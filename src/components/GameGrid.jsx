import InputCell from "./InputCell";

function GameGrid() {
  return (
    <>
      <div id="sudoku-game-grid">
        <div id="sudoku-grid-inner-container">
          {[...Array(9).keys()].map((i) => {
            return (
              <div className="sudoku-row" key={i}>
                {[...Array(9).keys()].map((j) => {
                  return (
                    <InputCell key={"row" + i + "col" + j} row={i} col={j} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default GameGrid;
