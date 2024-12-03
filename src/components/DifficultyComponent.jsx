import "../assets/styles/DifficultySelector.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useGameDifficultyContext } from "../contexts/GameDifficultyProvider";

function DifficultySelector() {
  const { gameDifficulty, updateGameDifficulty } = useGameDifficultyContext();

  const incrementDifficulty = () => {
    let newDifficulty = "Medium";
    if (gameDifficulty === "Hard") newDifficulty = "Easy";
    else if (gameDifficulty === "Easy") newDifficulty = "Medium";
    else if (gameDifficulty === "Medium") newDifficulty = "Hard";
    updateGameDifficulty(newDifficulty);
  };

  const decrementDifficulty = () => {
    let newDifficulty = "Medium";
    if (gameDifficulty === "Medium") newDifficulty = "Easy";
    else if (gameDifficulty === "Hard") newDifficulty = "Medium";
    else if (gameDifficulty === "Easy") newDifficulty = "Hard";
    else newDifficulty = "Medium";
    updateGameDifficulty(newDifficulty);
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
