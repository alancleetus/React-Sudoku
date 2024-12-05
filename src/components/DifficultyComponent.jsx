import "../assets/styles/DifficultySelector.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useGameDifficultyContext } from "../contexts/GameDifficultyProvider";
import { DifficultySelections } from "../constants/sudokuConstants";

function DifficultySelector() {
  const { gameDifficulty, updateGameDifficulty } = useGameDifficultyContext();
  // Array of difficulty levels in the desired order
  const difficultyLevels = Object.keys(DifficultySelections);

  const incrementDifficulty = () => {
    const currentIndex = difficultyLevels.indexOf(gameDifficulty);
    const nextIndex = (currentIndex + 1) % difficultyLevels.length; // Cycle back to the start if at the end
    updateGameDifficulty(difficultyLevels[nextIndex]);
  };

  const decrementDifficulty = () => {
    const currentIndex = difficultyLevels.indexOf(gameDifficulty);
    const prevIndex =
      (currentIndex - 1 + difficultyLevels.length) % difficultyLevels.length; // Cycle to the end if at the start
    updateGameDifficulty(difficultyLevels[prevIndex]);
  };

  return (
    <div className="difficulty-selector">
      <button className="icon-button" onClick={decrementDifficulty}>
        <MdKeyboardArrowLeft />
      </button>
      <span>{gameDifficulty}</span>
      <button className="icon-button" onClick={incrementDifficulty}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
}

export default DifficultySelector;
