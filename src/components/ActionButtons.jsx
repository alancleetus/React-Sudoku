// ActionButtons.jsx

import { AiOutlineClear } from "react-icons/ai";
import { LiaRedoAltSolid, LiaUndoAltSolid } from "react-icons/lia";
import { GoPencil } from "react-icons/go";
import "../assets/styles/ActionButtons.css";
import { useSudokuContext } from "../contexts/SudokuProvider";
import { useSettingsContext } from "../contexts/SettingsContext";

function ActionButtons() {
  const { currInputNumber, handleNumberClick } = useSudokuContext();
  const { initialSettings, toggleInitialSetting } = useSettingsContext();
  return (
    <div className="action-buttons">
      <button
        onClick={() => handleNumberClick(0)}
        className={`clear-button ${currInputNumber === 0 ? "active" : ""}`}
      >
        Clear <AiOutlineClear />
      </button>
      <button className="undo-button">
        Undo <LiaUndoAltSolid />
      </button>
      <button className="redo-button">
        Redo <LiaRedoAltSolid />
      </button>
      <button
        onClick={() => toggleInitialSetting("pencilMode")}
        className={`pencil-button ${
          initialSettings.pencilMode ? "active" : ""
        }`}
      >
        Pencil <GoPencil />
      </button>
    </div>
  );
}

export default ActionButtons;
