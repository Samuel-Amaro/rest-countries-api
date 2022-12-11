import { NavLink, useLoaderData } from "react-router-dom";
import getCountries from "../api/api";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export async function loader({ params }) {
  const countriFiltered = await getCountries({
    type: "name",
    value: params.countriName,
  });
  if (!countriFiltered) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return countriFiltered[0];
}

export default function CountriDetail() {
  const data = useLoaderData();
  //buscar currencies valores encontrados na propriedade currencie
  const currenciesFound = [];
  for (const prop in data.currencies) {
    if (typeof data.currencies[prop] === "object") {
      for (const propJ in data.currencies[prop]) {
        if (propJ === "name") {
          currenciesFound.push(data.currencies[prop][propJ]);
          //console.log(data.currencies[prop][propJ]);
        }
      }
    }
  }
  //buscar languages valores encontrados na propriedade language
  const languages = [];
  for (const prop in data.languages) {
    languages.push(data.languages[prop]);
  }

  console.log(data);
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
                  {languages.join(", ")}
                </p>
              </div>
            </div>
            <div className="main__Data">
              <span className="main__Relevant">Border Countries:</span>
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
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
