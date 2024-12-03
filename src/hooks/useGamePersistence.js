export const useGamePersistence = () => {
  const saveGameState = (gameState) => {
    localStorage.setItem("sudokuState", JSON.stringify(gameState));
  };

  const loadGameState = () => {
    return JSON.parse(localStorage.getItem("sudokuState")) || null;
  };

  return { saveGameState, loadGameState };
};

// Whenever the game state changes, update localStorage (example)
useEffect(() => {
  const gameState = {
    SudokuGrid,
    SolutionGrid,
    gameDifficulty,
    elapsedTime: useTimer.elapsedTime,
  };
  localStorage.setItem("sudokuState", JSON.stringify(gameState));
}, [SudokuGrid, SolutionGrid, gameDifficulty]);
