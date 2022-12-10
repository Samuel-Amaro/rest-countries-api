import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as moonSolid } from "@fortawesome/free-solid-svg-icons";
import {faMoon as moonRegular} from "@fortawesome/free-regular-svg-icons";

export default function Header() {
  return (
    <header className="Header">
      <h1 className="header__Title">Where in the world?</h1>
      <button
        className="header__Btn-Toggle-Theme"
        type="button"
        aria-label="Toggle Theme"
        title="Toggle Theme"
      >
        {<FontAwesomeIcon icon={moonSolid} />}
        Dark Mode
      </button>
    </header>
  );
}
