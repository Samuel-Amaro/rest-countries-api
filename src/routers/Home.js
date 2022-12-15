import Header from "../components/Header";
import FormSearch from "../components/Form";
import getCountries from "../api/api";
import { NavLink, useLoaderData } from "react-router-dom";
import CardCountrie from "../components/Card";

export async function loader({ request }) {
  //se tiver informado query de search, obtem o termo de pesquisa
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  let typeQuery = { type: "", value: "" };
  //se termo de pesquisa existir
  if (q) {
    typeQuery.type = "name";
    typeQuery.value = q;
  } else {
    //se o termo de pesquisa não existir
    typeQuery.type = "all";
    typeQuery.value = "all";
  }
  const allCountries = await getCountries(typeQuery);
  return { countrys: allCountries, search: q };
}

export default function Home() {
  const datas = useLoaderData();
  //console.log(datas);
  return (
    <>
      <Header />
      <FormSearch searchTerm={datas.search ? datas.search : ""} />
      {datas.countrys ? (
        <ul className="main__List-Countries">
          {datas.countrys.map((countriObj, index) => {
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
                    capital={countriObj.capital}
                  />
                </NavLink>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no countries with that name</p>
      )}
    </>
  );
}
