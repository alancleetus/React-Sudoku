import { BsArrowLeftShort } from "react-icons/bs";
import ThemeSelector from "../components/ThemeSelector";
import { useScreenContext } from "../contexts/ScreenContext";
function SettingsScreen() {
  const { handleBackButton } = useScreenContext();
  return (
    <>
      <div style={{ display: "flex" }}>
        <button
          className="icon-button"
          onClick={handleBackButton}
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

export default SettingsScreen;
