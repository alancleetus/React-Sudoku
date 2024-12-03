import { BsArrowLeftShort } from "react-icons/bs";
import ThemeSelector from "../components/ThemeSelector";
import PropTypes from "prop-types";
function SettingsScreen({ handleBackButton }) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          className="icon-button"
          onClick={() => handleBackButton()}
          style={{ flexGrow: "1" }}
        >
          <BsArrowLeftShort />
        </button>
        <div style={{ flexGrow: "3" }}></div>

        <div style={{ flexGrow: "1" }}></div>
      </div>
      <ThemeSelector />
    </>
  );
}

SettingsScreen.propTypes = {
  handleBackButton: PropTypes.func.isRequired,
};
export default SettingsScreen;