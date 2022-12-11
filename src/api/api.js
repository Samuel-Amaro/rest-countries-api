const URL_BASE = "https://restcountries.com/v3.1";
const QUERY_ALL = "/all";
const QUERY_NAME = `/name/`;

export default async function getCountries(query) {
    let url = URL_BASE;
    if(query.type === "all") {
        url += QUERY_ALL;
    }
    if(query.type === "name") {
        url += QUERY_NAME + query.value;
    }
    try {
        let response = await fetch(url);
        if(response.ok) {
            return await response.json();
        }else{
            return "Error in loader data to countries";
        }
    } catch (error) {
        return "Error in loader data to countries";
    }
}