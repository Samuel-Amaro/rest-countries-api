import { NavLink, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { getCountryByName, getCountrysByCodes } from "../../api/api";
import Header from "../../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import formatNumber from "../../utils/format-number";
import "./CountriDetail.css";
import { Countrie, Currencies, Languages } from "../../api/IDataCountries";

export async function loader({ params }: LoaderFunctionArgs) {
  //busca country details
  /*const country = await getCountries({
    type: "name",
    value: params.countriName as string,
  });

  let bordersCountrys: Countrie[] = [];

  if (country.length > 0) {
    if ("borders" in country[0]) {
      bordersCountrys = await getCountries({
        type: "code",
        value: country[0].borders,
      });
    }
  }*/

  const country = await getCountryByName(params.countriName as string);
  let bordersCountrys: Countrie[] = [];

  if (!country) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  if ("borders" in country[0]) {
    bordersCountrys = await getCountrysByCodes(country[0].borders);
  }

  //se possuir borders, busca nome dos country borders
  /*if (!(country[0]?.borders === undefined)) {
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
  }*/

  return {
    country: country[0],
    borders: bordersCountrys,
  };
}

export default function CountriDetail() {
  const { country, borders } = useLoaderData() as {
    country: Countrie;
    borders: Countrie[];
  };

  //buscar currencies valores encontrados na propriedade currencie
  function foundCurrencies(currencies: Currencies) {
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
  function foundLanguages(languages: Languages) {
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
            {country?.flags === undefined ? (
              "Not imagen ilustration country"
            ) : (
              <img
                src={country.flags.svg}
                alt={`Ilustration flag from ${country.name.common}`}
                className="main__Ilustration-Countri"
              />
            )}
          </aside>
          <article className="main__Detail">
            <h2 className="main__Name-Countri">
              {country?.name === undefined
                ? "Not name country"
                : country.name.common}
            </h2>
            <div className="main__Container">
              <div className="main__Container-Side">
                <p className="main__Data">
                  <span className="main__Relevant-Info">Native Name:</span>
                  <span className="main__Value-Info">
                    {country?.name === undefined
                      ? "Not native name"
                      : country.name.official}
                  </span>
                </p>
                <p className="main__Data">
                  <span className="main__Relevant-Info">Population:</span>
                  <span className="main__Value-Info">
                    {country?.population === undefined
                      ? "Not population"
                      : formatNumber(country.population)}
                  </span>
                </p>
                <p className="main__Data">
                  <span className="main__Relevant-Info">Region:</span>
                  <span className="main__Value-Info">
                    {country?.region === undefined
                      ? "Not region"
                      : country.region}
                  </span>
                </p>
                <p className="main__Data">
                  <span className="main__Relevant-Info">Sub Region:</span>
                  <span className="main__Value-Info">
                    {country?.subregion === undefined
                      ? "Not subregion"
                      : country.subregion}
                  </span>
                </p>
                <p className="main__Data">
                  <span className="main__Relevant-Info">Capital:</span>
                  <span className="main__Value-Info">
                    {country?.capital === undefined
                      ? "No capital"
                      : country.capital}
                  </span>
                </p>
              </div>
              <div className="main__Container-Side">
                <p className="main__Data">
                  <span className="main__Relevant-Info">Top Level Domain:</span>
                  <span className="main__Value-Info">
                    {country?.tld === undefined
                      ? "No Top Level Domain"
                      : country.tld.join(", ")}
                  </span>
                </p>
                <p className="main__Data">
                  <span className="main__Relevant-Info">Currencies:</span>
                  <span className="main__Value-Info">
                    {country?.currencies === undefined
                      ? "Not currencies"
                      : foundCurrencies(country.currencies).join(", ")}
                  </span>
                </p>
                <p className="main__Data">
                  <span className="main__Relevant-Info">Languages:</span>
                  <span className="main__Value-Info">
                    {country?.languages === undefined
                      ? "Not Languages"
                      : foundLanguages(country.languages).join(", ")}
                  </span>
                </p>
              </div>
            </div>
            <div className="main__Container">
              <span className="main__Relevant-Info main__Relevante-Info_Text--Big">
                Border Countries:
              </span>
              {
                borders.length === 0 ? (
                  <span className="main__Message-Countries-Borders">
                    No countries on the border
                  </span>
                ) : (
                  <ul
                    className="main__List-Countries-Borders"
                    aria-label="List from countrys borders"
                  >
                    {borders.map((border, index) => {
                      return (
                        <li
                          className="main__Item-Border-Countri"
                          key={index}
                          tabIndex={0}
                        >
                          <NavLink
                            to={`/country/${border.name.common}`}
                            className="main__Item-Link-Border"
                            rel="next"
                            target="_self"
                            aria-label={`Go to details page and learn more about this ${border.name.common} country`}
                            title={`Go to details page and learn more about this ${border.name.common} country`}
                            tabIndex={0}
                          >
                            {border.name.common}
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
      </div>
    </>
  );
}
