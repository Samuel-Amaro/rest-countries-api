import { NavLink, useLoaderData } from "react-router-dom";
import getCountries from "../api/api";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function loader({ params }) {
  const country = await getCountries({
    type: "name",
    value: params.countriName,
  });
  const borders = [];
  console.log(
    "country[0]?.borders === undefined: " + !(country[0]?.borders === undefined)
  );
  if(!(country[0]?.borders === undefined)) {
    country[0].borders.forEach(async (codeCountry) => {
      let countryBorder = await getCountries({
        type: "code",
        value: codeCountry,
      });
      borders.push({ name: countryBorder[0].name.common });
    });
  }
  return { country, borders };
}

export default function CountriDetail() {
  const { country, borders } = useLoaderData();
  console.log(country[0].borders);
  console.log(borders.length);

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

  //console.log(data);
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
              src={country[0].flags.png}
              alt={`Ilustration flag from ${country[0].name.common}`}
              className="main__Ilustration-Countri"
            />
          </aside>
          <article className="main__Detail">
            <h2 className="main__Name-Countri">{country[0].name.common}</h2>
            <div className="main__Container">
              <div className="main__Container-Side">
                <p className="main__Data">
                  <span className="main__Relevant"> Native Name:</span>
                  {country[0].name.official}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Population:</span>
                  {country[0].population}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Region:</span>
                  {country[0].region}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Sub Region:</span>
                  {country[0].subregion}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Capital:</span>
                  {country[0].capital.join(", ")}
                </p>
              </div>
              <div className="main__Container-Side">
                <p className="main__Data">
                  <span className="main__Relevant"> Top Level Domain:</span>
                  {country[0].tld}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Currencies:</span>
                  {foundCurrencies(country[0].currencies).join(", ")}
                </p>
                <p className="main__Data">
                  <span className="main__Relevant"> Languages:</span>
                  {foundLanguages(country[0].languages).join(", ")}
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
      </div>
    </>
  );
}
