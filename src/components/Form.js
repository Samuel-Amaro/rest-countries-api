import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export default function Form() {
  return (
    <form className="Form" name="form-inputs" action="" method="post">
      <div className="form__Group">
        <input
          type="text"
          className="form__Input"
          name="search-countrys"
          placeholder="Search for a contry..."
          title="Search for a country..."
          aria-label="Search for a country..."
        />
      </div>
      <div className="form__Group">
        <div
          className="form__Select"
          tabIndex="0"
          aria-label="Filter by Region"
          title="Filter by Region"
        >
          <span className="form__Value-Selected">
            Filter by Region <FontAwesomeIcon icon={faAngleDown} />
          </span>
          <ul className="form__Opt-List">
            <li
              className="form__Option"
              aria-label="Option region Africa"
              tabIndex="0"
            >
              Africa
            </li>
            <li
              className="form__Option"
              aria-label="Option region America"
              tabIndex="0"
            >
              America
            </li>
            <li
              className="form__Option"
              aria-label="Option region Asia"
              tabIndex="0"
            >
              Asia
            </li>
            <li
              className="form__Option"
              aria-label="Option region Europe"
              tabIndex="0"
            >
              Europe
            </li>
            <li
              className="form__Option"
              aria-label="Option region Oceania"
              tabIndex="0"
            >
              Oceania
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}
