import { NavLink, useLoaderData } from "react-router-dom";
/*import getCountries from "../api/api";*/
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export async function loader({ params }) {
  return params.countriName;
}

export default function CountriDetail() {
  const countryFiltered = useLoaderData();
  const currenciesFound = [],
    languagesArray = [];
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  //buscar currencies valores encontrados na propriedade currencie
  function foundCurrencies(currencies) {
    for (const prop in currencies) {
      if (typeof currencies[prop] === "object") {
        for (const propJ in currencies[prop]) {
          if (propJ === "name") {
            currenciesFound.push(currencies[prop][propJ]);
            //console.log(currencies[prop][propJ]);
          }
        }
      }
    }
    console.log(currenciesFound);
  }

  //buscar languages valores encontrados na propriedade language
  function foundLanguages(languages) {
    for (const prop in languages) {
      languagesArray.push(languages[prop]);
    }
  }

  function fetchDetailsCountry(nameCountry) {
    //loader data details country
    fetch(`https://restcountries.com/v3.1/name/${nameCountry}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error in fetching ata in country detail");
      })
      .then((result) => {
        setIsLoaded(true);
        setData(result[0]);
        foundCurrencies(result[0].currencies);
        foundLanguages(result[0].languages);
      })
      .catch((error) => {
        console.log("Error in fetching data in country detail: " + error);
        setError(error);
        setIsLoaded(true);
      });
  }

  useEffect(() => {
    fetchDetailsCountry(countryFiltered);
  }, []);

  console.log(data);

  if(error) {
    return <div>Error: {error.message}</div>;
  }else if (!isLoaded) {
    return <div>Loading...</div>;
  }else{
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
                src={data.flags.png}
                alt={`Ilustration flag from ${data.name.common}`}
                className="main__Ilustration-Countri"
              />
            </aside>
            <article className="main__Detail">
              <h2 className="main__Name-Countri">{data.name.common}</h2>
              <div className="main__Container">
                <div className="main__Container-Side">
                  <p className="main__Data">
                    <span className="main__Relevant"> Native Name:</span>
                    {data.name.official}
                  </p>
                  <p className="main__Data">
                    <span className="main__Relevant"> Population:</span>
                    {data.population}
                  </p>
                  <p className="main__Data">
                    <span className="main__Relevant"> Region:</span>
                    {data.region}
                  </p>
                  <p className="main__Data">
                    <span className="main__Relevant"> Sub Region:</span>
                    {data.subregion}
                  </p>
                  <p className="main__Data">
                    <span className="main__Relevant"> Capital:</span>
                    {data.capital.join(", ")}
                  </p>
                </div>
                <div className="main__Container-Side">
                  <p className="main__Data">
                    <span className="main__Relevant"> Top Level Domain:</span>
                    {data.tld}
                  </p>
                  <p className="main__Data">
                    <span className="main__Relevant"> Currencies:</span>
                    {currenciesFound.join(", ")}
                  </p>
                  <p className="main__Data">
                    <span className="main__Relevant"> Languages:</span>
                    {languagesArray.join(", ")}
                  </p>
                </div>
              </div>
              <div className="main__Data">
                <span className="main__Relevant">Border Countries:</span>
                {
                  /*propriedadde border pode existir ou não dependendo do country selected*/
                  data?.borders === undefined ? (
                    "No countries on the border"
                  ) : (
                    <ul className="main__List-Contries-Borers">
                      {data.borders.map((border, index) => {
                        return (
                          <li className="main__Item-Border-Countri" key={index}>
                            <NavLink
                              to={`/${border}`}
                              className="main__Item-Link"
                              rel="next"
                              target="_self"
                              aria-label={`Go to details page and learn more about this ${border} country`}
                              title={`Go to details page and learn more about this ${border} country`}
                            >
                              {border}
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
}
