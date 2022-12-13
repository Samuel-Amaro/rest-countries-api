const URL_BASE = "https://restcountries.com/v3.1";
const QUERY_ALL = "/all";
const QUERY_NAME = "/name/";
const QUERY_CODE = "/alpha/";

export default async function getCountries(query) {
    let url = URL_BASE;
    if(query.type === "all") {
        url += QUERY_ALL;
    }
    if(query.type === "name") {
        url += QUERY_NAME + query.value;
    }
    if(query.type === "code") {
        url += QUERY_CODE + query.value;
    }
    try {
        let response = await fetch(url);
        if(response.ok) {
            return await response.json();
        }
        throw response;
    } catch (error) {
        console.log("Error in fetching data: " + error);
    }
}