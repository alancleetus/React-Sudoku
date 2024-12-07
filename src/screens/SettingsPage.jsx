import { useSettingsContext } from "../contexts/SettingsContext";

function SettingsPage() {
  const { settings, toggleSetting } = useSettingsContext();

  return (
    <div>
      <h1>Settings</h1>
      <div className="settings-div">
        <ul id="settings-ul">
          {Object.keys(settings).map((key) => (
            <li key={key}>
              <label>
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={() => toggleSetting(key)}
                />
                {formatSettingKey(key)}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatSettingKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export default SettingsPage;
