import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Form} from "react-router-dom";
import { useState } from "react";
import "./Form.css";
import { ThemeContext } from "./ThemeContext";

export default function FormSearch(props) {
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [valueSelectedFilter, setValueSelectedFilter] =
    useState("Filter by Region");
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "All"];

  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => {
        return (
          <Form className="Form" role="search ou filter countrys">
            <div className="form__Group">
              <input
                type="search"
                value={props.search}
                className={
                  theme === "light"
                    ? "form__Input form__input_theme--light"
                    : "form__Input form__input_theme--dark"
                }
                placeholder="Search for a country..."
                title="Search for a country..."
                aria-label="Search for a country..."
                onChange={(event) => {
                  props.onSearchCountrys(event.target.value);
                }}
              />
            </div>
            <div className="form__Group">
              <div
                className={
                  isOpenSelect
                    ? "form__Select form__select_active"
                    : "form__Select"
                }
                tabIndex="0"
                aria-label="Filter by Region"
                title="Filter by Region"
                onPointerDown={(event) => {
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
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="form__Icon-Select"
                  />
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
                        tabIndex="0"
                        title={`Option region ${region}`}
                        key={index}
                        onPointerDown={(event) => {
                          setValueSelectedFilter(region);
                          props.onFilteredRegion(region);
                        }}
                        onKeyDown={(event) => {
                          if (event.code === "Enter") {
                            setValueSelectedFilter(region);
                            props.onFilteredRegion(region);
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
        );
      }}
    </ThemeContext.Consumer>
  );
}
