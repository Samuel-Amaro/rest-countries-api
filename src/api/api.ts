import { Countrie } from "./IDataCountries";

const URL_BASE = "https://restcountries.com/v3.1";
const QUERY_ALL = "/all";
const QUERY_NAME = "/name/";
const QUERY_CODE = "/alpha?codes=";

interface queryParams {
    type: string,
    value: string | string[]
};

export default async function getCountries({type, value}: queryParams) {
    let url = URL_BASE;
    let datas: Countrie[] = [];
    if(type === "all") {
        url += QUERY_ALL;
    }
    if(type === "name") {
        url += QUERY_NAME + value;
    }
    if(type === "code" && value instanceof Object) {
        url += QUERY_CODE + value.join(",");
    }
    try {
        let response = await fetch(url);
        if(response.ok) {
            datas = await response.json();
            return datas;
        }
        throw response;
    } catch (error) {
        console.log("Error in fetching data: " + error);
        return datas;
    }
}