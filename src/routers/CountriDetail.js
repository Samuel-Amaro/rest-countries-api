import { NavLink, useLoaderData} from "react-router-dom";
import getCountries from "../api/api";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import formatNumber from "../utils/format-number";

export async function loader({ params }) {
  //busca country details
  const country = await getCountries({
    type: "name",
    value: params.countriName,
  });
  let bordersCountrys = [];
  //se possuir borders, busca nome dos country borders
  if (!(country[0]?.borders === undefined)) {
    bordersCountrys = await getCountries({
      type: "code",
      value: country[0].borders,
    }).then((result) => {
      let countrysBorders = [];
      result.forEach((country) => {
        countrysBorders.push({ name: country.name.common });
      });
      return countrysBorders;
    });
  }
  return {
    country: country[0],
    borders: bordersCountrys,
  };
}

export default function CountriDetail() {
  const { country, borders } = useLoaderData();

  //buscar currencies valores encontrados na propriedade currencie
  function foundCurrencies(currencies) {
    const currenciesFound = [];
    for (const prop in currencies) {
      if (typeof currencies[prop] === "object") {
        for (const propJ in currencies[prop]) {
          if (propJ === "name") {
            currenciesFound.push(currencies[prop][propJ]);
          }
        }
      }
    }
    return currenciesFound;
  }

  //buscar languages valores encontrados na propriedade language
  function foundLanguages(languages) {
    const languagesArray = [];
    for (const prop in languages) {
      languagesArray.push(languages[prop]);
    }
    return languagesArray;
  }

  return (
    <>
      <Header />
      <div className="main__Countri-Detail">
        <NavLink
          to="/"
          className="main__Link-Back"
          rel="return"
          target="_self"
          title="Return to page Home"
          aria-label="Return to page Home"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="main__Icon-Link" />
          Back
        </NavLink>
        <section className="main__Content-Detail">
          <aside className="main__Side-Content">
            <img
              src={country.flags.png}
              alt={`Ilustration flag from ${country.name.common}`}
              className="main__Ilustration-Countri"
            />
          </aside>
          <article className="main__Detail">
            <h2 className="main__Name-Countri">{country.name.common}</h2>
            <div className="main__Container">
              <div className="main__Container-Side">
                <p className="main__Data">
                  <span className="main__Relevant"> Native Name:</span>
                  {country.name.official}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Population:</span>
                  {formatNumber(country.population)}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Region:</span>
                  {country.region}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Sub Region:</span>
                  {country.subregion}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Capital:</span>
                  {country?.capital.join(", ")}
                </p>
              </div>
              <div className="main__Container-Side">
                <p className="main__Data">
                  <span className="main__Relevant"> Top Level Domain:</span>
                  {country.tld}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Currencies:</span>
                  {foundCurrencies(country.currencies).join(", ")}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Languages:</span>
                  {foundLanguages(country.languages).join(", ")}
                </p>
              </div>
            </div>
            <div className="main__Data">
              <span className="main__Relevant">Border Countries:</span>
              {
                /*propriedadde border pode existir ou não dependendo do country selected*/
                borders.length === 0 ? (
                  "No countries on the border"
                ) : (
                  <ul className="main__List-Contries-Borers">
                    {borders.map((border, index) => {
                      return (
                        <li className="main__Item-Border-Countri" key={index}>
                          <NavLink
                            to={`/country/${border.name}`}
                            className="main__Item-Link"
                            rel="next"
                            target="_self"
                            aria-label={`Go to details page and learn more about this ${border.name} country`}
                            title={`Go to details page and learn more about this ${border.name} country`}
                          >
                            {border.name}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )
              }
            </div>
          </article>
        </section>
        {/*<React.Suspense fallback={<p>Loading country details...</p>}>
          <Await
            resolve={data.country}
            errorElement={<p>Error loading country details...!</p>}
          >
            {(country) => {
              return (
              );
            }}
          </Await>
        </React.Suspense>
          */}
      </div>
    </>
  );
}
