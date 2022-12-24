import Header from "../components/Header";
import FormSearch from "../components/Form";
import getCountries from "../api/api";
import { NavLink, useLoaderData } from "react-router-dom";
import CardCountrie from "../components/Card";
import { useState } from "react";
import "./Home.css";

export async function loader({ request }) {
  const allCountries = await getCountries({ type: "all", value: "all" });
  return { countrys: allCountries };
}

export default function Home() {
  const datas = useLoaderData();
  const [regionFiltered, setRegionFiltered] = useState("All");
  const [search, setSearch] = useState("");
  const [filteredResultsCountrys, setFilteredResultsCountrys] = useState(
    datas.countrys
  );

  function onSearchCountrys(search) {
    setSearch(search);
    //se possuir pesquisa, e ja tiver filtrado uma região realiza pesquisa dentro da região
    if (search !== "" && regionFiltered.toLowerCase() !== "all") {
      const filteredsCountrysRegion = filteredResultsCountrys.filter((country) => {
        return country.name.common.toLowerCase().match(search.toLowerCase());
      });
      setFilteredResultsCountrys(filteredsCountrysRegion);
      //se não pesquisa em todas regioes
    }else if(search !== "" && regionFiltered.toLowerCase() === "all") {
      const filteredsCountrys = datas.countrys.filter((country) => {
        return country.name.common.toLowerCase().match(search.toLowerCase());
      });
      setFilteredResultsCountrys(filteredsCountrys);
      //se ja estiver apagando pesquisa e tiver filtro de região aplicado permanece no mesmo
    }else if (search === "" && regionFiltered.toLowerCase() !== "all") {
      onFilteredRegion(regionFiltered);
      //se não pesquisa em todas regioes
    }else{
      setFilteredResultsCountrys(datas.countrys);
    }
  }

  function onFilteredRegion(region) {
    setRegionFiltered(region);
    if (region.toLowerCase() !== "all") {
      const regionFilteredResult = datas.countrys.filter((country) => {
        return country.region.toLowerCase() === region.toLowerCase();
      });
      setFilteredResultsCountrys(regionFilteredResult);
    }else{
      setFilteredResultsCountrys(datas.countrys);
    }
  }

  return (
    <>
      <Header />
      <FormSearch
        searchTerm={datas.search ? datas.search : ""}
        setRegionFiltered={setRegionFiltered}
        onSearchCountrys={onSearchCountrys}
        onFilteredRegion={onFilteredRegion}
        search={search}
        setSearch={setSearch}
      />
      {
        <ul className="main__List-Countries" aria-label="List from countrys">
          {filteredResultsCountrys.length > 0 ? (
            filteredResultsCountrys.map((countriObj, index) => {
              return (
                <li className="main__Item-List" key={index}>
                  <NavLink
                    to={`/country/${countriObj.name.common}`}
                    className="main__Item-Link"
                    rel="next"
                    target="_self"
                    aria-label={`Go to details page and learn more about this ${countriObj.name.common} country`}
                    title={`Go to details page and learn more about this ${countriObj.name.common} country`}
                  >
                    <CardCountrie
                      name={countriObj.name.common}
                      srcFlag={countriObj.flags.png}
                      population={countriObj.population}
                      region={countriObj.region}
                      capital={
                        countriObj?.capital === undefined
                          ? "No capital"
                          : countriObj.capital
                      }
                    />
                  </NavLink>
                </li>
              );
            })
          ) : (
            <p className="main__Message">There are no countries with that name</p>
          )}
        </ul>
      }
    </>
  );
}
