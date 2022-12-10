import { useLoaderData } from "react-router-dom";
import getCountries from "../api/api";

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
    <div className="main__Countri-Detail">
      <h2>Countri Detail</h2>
    </div>
  );
}
