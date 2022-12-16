import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as moonSolid } from "@fortawesome/free-solid-svg-icons";
import {faMoon as moonRegular} from "@fortawesome/free-regular-svg-icons";
import "./Header.css";
import { ThemeContext } from "./ThemeContext";

export default function Header() {
  return (
    <header className="Header">
      <h1 className="header__Title">Where in the world?</h1>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <button
            className="header__Btn-Toggle-Theme"
            type="button"
            aria-label="Toggle Theme"
            title="Toggle Theme"
            onPointerDown={(event) => {
              toggleTheme(theme === "light" ? "dark" : "light");
            }} 
            onKeyDown={(event) => {
              if(event.code === "Enter") {
                toggleTheme(theme === "light" ? "dark" : "light");
              }
            }}
          >
            {<FontAwesomeIcon icon={theme === "light" ? moonRegular : moonSolid}  className="header__Icon-Btn"/>}  Dark Mode
          </button>
        )}
      </ThemeContext.Consumer>
    </header>
  );
}
