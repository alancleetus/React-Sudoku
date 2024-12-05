import { useEffect } from "react";
import { useTimerContext } from "../contexts/TimerContext";
import { useGameDifficultyContext } from "../contexts/GameDifficultyProvider";
import { useSudokuContext } from "../contexts/SudokuProvider";

export const useGamePersistence = () => {
  const {
    sudokuGrid,
    solutionGrid,

    hintGrid,
  } = useSudokuContext();
  const { gameDifficulty } = useGameDifficultyContext();

  const saveGameState = (gameState) => {
    localStorage.setItem("sudokuState", JSON.stringify(gameState));
  };

  // Whenever the game state changes, update localStorage (example)
  useEffect(() => {
    const gameState = {
      sudokuGrid,
      solutionGrid,
      hintGrid,
      gameDifficulty,
      elapsedTime: useTimerContext.elapsedTime,
    };
    localStorage.setItem("sudokuState", JSON.stringify(gameState));
  }, [sudokuGrid, solutionGrid, hintGrid, gameDifficulty]);

  const loadGameState = () => {
    return JSON.parse(localStorage.getItem("sudokuState")) || null;
  };

  return { saveGameState, loadGameState };
};
