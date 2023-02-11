import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-router-dom";
import "./Form.css";
import Select from "../Select";

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
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania", "All"];

  return (
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
            className={"form__Input"}
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
        <Select optionsSelect={regions} onFilteredRegion={onFilteredRegion} />
      </div>
    </Form>
  );
}
