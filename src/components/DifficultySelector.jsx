import { useEffect, useState } from "react";
import "../assets/styles/DifficultySelector.css";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import PropTypes from "prop-types";

function DifficultySelector({ setGameDifficulty }) {
  const [difficulty, setDifficulty] = useState(1); // 0: Easy, 1: Medium, 2: Hard

  const getDifficultyLabel = () => {
    if (difficulty === 0) return "Easy";
    if (difficulty === 1) return "Medium";
    return "Hard";
  };

  const incrementDifficulty = () => {
    setDifficulty((prevDifficulty) => (prevDifficulty + 1) % 3); // Cycles between 0, 1, 2
  };

  useEffect(() => {
    setGameDifficulty(getDifficultyLabel());
  }, [difficulty]); // Only run when difficulty changes

  const decrementDifficulty = () => {
    setDifficulty((prevDifficulty) => (prevDifficulty - 1 + 3) % 3); // Cycles between 0, 1, 2
  };

  return (
    <div className="difficulty-selector">
      <button className="icon-button" onClick={decrementDifficulty}>
        <MdKeyboardArrowLeft />
      </button>
      <span>{getDifficultyLabel()}</span>
      <button className="icon-button" onClick={incrementDifficulty}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
}

export default DifficultySelector;

DifficultySelector.propTypes = {
  setGameDifficulty: PropTypes.func.isRequired,
};
