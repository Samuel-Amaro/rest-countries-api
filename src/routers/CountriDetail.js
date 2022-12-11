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
  return countriFiltered;
}

export default function CountriDetail() {
  const data = useLoaderData();
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
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </NavLink>
        <h2>Countri Detail</h2>
        {/*ESCREVER MARCKUP SEMANTIC PARA O COMPOENTEN COUTRI DETAIL*/}
      </div>
    </>
  );
}
