import Header from "../components/Header";
import Form from "../components/Form";
import getCountries from "../api/api";
import { NavLink, useLoaderData } from "react-router-dom";
import CardCountrie from "../components/Card";

export async function loader() {
  const allCountries = await getCountries({type: "all", value: "all"});
  return allCountries;
}

export default function Home() {
  const datas = useLoaderData();
  //console.log(datas);
  return (
    <>
      <Header />
      <Form />
      <ul className="main__List-Countries">
        {datas.map((countriObj, index) => {
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
    </>
  );
}
