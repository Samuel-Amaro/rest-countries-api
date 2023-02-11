import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";
import { useState } from "react";
import "./Form.css";
import { useThemeContext } from "../../context/ThemeContext";

interface PropsFormSearch {
  onSearchCountrys: (search: string) => void;
  onFilteredRegion: (region: string) => void;
  search: string;
}

export default function FormSearch({
  onSearchCountrys,
  onFilteredRegion,
  search,
}: PropsFormSearch) {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [valueSelectedFilter, setValueSelectedFilter] =
    useState("Filter by Region");
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "All"];
  const themeContext = useThemeContext();

  return (
    /*<ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        return (*/
    <Form
      className="Form"
      role="search"
      aria-label="Form search or filters countrys"
    >
      <div className="form__Group">
        <div className="form__wrapper-input">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="form__icon-input"
          />
          <input
            type="search"
            value={search}
            className={
              themeContext.theme === "light"
                ? "form__Input form__input_theme--light"
                : "form__Input form__input_theme--dark"
            }
            placeholder="Search for a country..."
            title="Search for a country..."
            aria-label="Search for a country..."
            onChange={(event) => {
              onSearchCountrys(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="form__Group">
        <div
          className={
            isOpenSelect ? "form__Select form__select_active" : "form__Select"
          }
          tabIndex={0}
          aria-label="Filter by Region"
          title="Filter by Region"
          onPointerDown={() => {
            setIsOpenSelect((prevState) => {
              return !prevState;
            });
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              setIsOpenSelect((prevState) => {
                return !prevState;
              });
            }
          }}
          role="listbox"
          aria-expanded={isOpenSelect}
          aria-controls="list-filter-countrys"
        >
          <span className="form__Value-Selected">
            <span className="form__Value">{valueSelectedFilter}</span>{" "}
            <FontAwesomeIcon icon={faAngleDown} className="form__Icon-Select" />
          </span>
          <ul
            className={
              isOpenSelect
                ? "form__Opt-List"
                : "form__Opt-List form__opt-list_Hidden"
            }
            role="presentation"
            id="list-filter-countrys"
          >
            {regions.map((region, index) => {
              return (
                <li
                  className={
                    valueSelectedFilter === region
                      ? "form__Option form__Option_Selected"
                      : "form__Option"
                  }
                  role="option"
                  aria-label={`Option region ${region}`}
                  aria-selected={
                    valueSelectedFilter === region ? "true" : "false"
                  }
                  tabIndex={0}
                  title={`Option region ${region}`}
                  key={index}
                  onPointerDown={(event) => {
                    setValueSelectedFilter(region);
                    onFilteredRegion(region);
                  }}
                  onKeyDown={(event) => {
                    if (event.code === "Enter") {
                      setValueSelectedFilter(region);
                      onFilteredRegion(region);
                    }
                  }}
                >
                  {region}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Form>
    /*);
      }}
    </ThemeContext.Consumer>*/
  );
}
