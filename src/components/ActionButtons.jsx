// ActionButtons.jsx

import PropTypes from "prop-types";

import { AiOutlineClear } from "react-icons/ai";
import { LiaUndoAltSolid } from "react-icons/lia";
import { GoPencil } from "react-icons/go";
import { HiMagnifyingGlass } from "react-icons/hi2";
import "./ActionButtons.css";

function ActionButtons({ setCurrInputNumber, currInputNumber }) {
  return (
    <div className="action-buttons">
      <button
        onClick={() => setCurrInputNumber(-1)}
        className={`clear-button ${currInputNumber === -1 ? "active" : ""}`}
      >
        Clear <AiOutlineClear />
      </button>
      <button className="undo-button">
        Undo <LiaUndoAltSolid />
      </button>
      <button className="pencil-button">
        Pencil <GoPencil />
      </button>
      <button className="hint-button">
        Hint <HiMagnifyingGlass />
      </button>
    </div>
  );
}

ActionButtons.propTypes = {
  currInputNumber: PropTypes.number.isRequired,
  setCurrInputNumber: PropTypes.func.isRequired,
};
export default ActionButtons;
