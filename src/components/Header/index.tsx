import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as moonSolid } from "@fortawesome/free-solid-svg-icons";
import { faMoon as moonRegular } from "@fortawesome/free-regular-svg-icons";
import "./Header.css";
import { useThemeContext } from "../../context/ThemeContext";

export default function Header() {
  const themeContext = useThemeContext();

  return (
    <header className="Header">
      <h1 className="header__Title">Where in the world?</h1>
      <button
        className="header__Btn-Toggle-Theme"
        type="button"
        aria-label="Toggle Theme"
        title="Toggle Theme"
        onPointerDown={(event) => {
          themeContext.setTheme(
            themeContext.theme === "light" ? "dark" : "light"
          );
        }}
        onKeyDown={(event) => {
          if (event.code === "Enter") {
            themeContext.setTheme(
              themeContext.theme === "light" ? "dark" : "light"
            );
          }
        }}
      >
        {
          <FontAwesomeIcon
            icon={themeContext.theme === "light" ? moonRegular : moonSolid}
            className="header__Icon-Btn"
          />
        }
        Dark Mode
      </button>
    </header>
  );
}
