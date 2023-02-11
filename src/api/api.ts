import { Countrie } from "./IDataCountries";

const URL_BASE = "https://restcountries.com/v3.1";
const QUERY_ALL = "/all";
const QUERY_NAME = "/name/";
const QUERY_CODE = "/alpha?codes=";

export async function fetchDatas(url: string) {
    let datas: Countrie[] = [];
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

export default async function getCountries() {
    let url = URL_BASE + QUERY_ALL;
    return await fetchDatas(url);
}

export async function getCountryByName(name: string) {
    let url = URL_BASE + QUERY_NAME + name;
    let data = await fetchDatas(url);
    if(data.length > 0) {
       return data; 
    }
    return null;
}

export async function getCountrysByCodes(codes: string[]) {
    let url = URL_BASE + QUERY_CODE + codes.join(",");
    const data = await fetchDatas(url);
    if(data.length > 0) {
        return data;
    }
    return null;
}