import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Form, useSubmit } from "react-router-dom";
import { useRef, useEffect } from "react";

export default function FormSearch(props) {
  const refInputSearch = useRef(null);
  const submit = useSubmit();

  useEffect(() => {
    refInputSearch.current.value = props.searchTerm;
  }, [props.searchTerm]);

  return (
    <Form className="Form" role="search ou filter countrys">
      <div className="form__Group">
        <input
          type="search"
          ref={refInputSearch}
          defaultValue={props.searchTerm}
          className="form__Input"
          name="q"
          placeholder="Search for a contry..."
          title="Search for a country..."
          aria-label="Search for a country..."
          onChange={(event) => {
            const isFirstSearch = props.searchTerm === "";
            submit(event.currentTarget.form, {replace: !isFirstSearch});
          }}
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
    </Form>
  );
}
