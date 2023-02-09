
export interface Countrie {
    name: Name;
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: Currencies;
    idd: Idd;
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: Languages;
    translations: Translations;
    latlng: number[];
    demonyms: Demonyms;
    landlocked: boolean;
    borders: string[];
    area: number;
    callingCodes: string[];
    flag: string;
    maps: Maps;
    population: number;
    gini: Gini;
    fifa: string;
    car: Car;
    timezones: string[];
    continents: string[];
    flags: Flags;
    coatOfArms: GenericTypeFlagsAndArms;
    startOfWeek: string;
    capitalInfo: CapitalInfo;
    postalCode: PostalCode;
}

/**
 * * Generic Value Type
*/

interface GenericValueType {
    official: string;
    common: string;
}

interface GenericTypeFlagsAndArms {
    png: string;
    svg: string;
}

/**
 * * TYPES BASE
*/

/**
 * Type Name 
 */
interface Name extends GenericValueType {
    nativeName: Native;
}

interface Native {
    [key: string]: GenericValueType;
}


/**
 * Type Currencies
*/

export interface Currencies {
    [key: string]: CurrenciesType
}

interface CurrenciesType {
    name: string;
    symbol: string;
}

/**
 * Type idd 
*/

interface Idd {
    root: string;
    suffixes: string[];
}

/**
 * Type languages 
*/

export interface Languages  {
    [key: string]: string;
}

/**
 * * Type Translations 
*/

interface Translations{
    [key: string]: GenericValueType;
}

/**
 * Type demomyms 
*/

interface Demonyms {
    [key: string]: demonymsTypeValue;
}

interface demonymsTypeValue {
    f: string;
    m: string;
}

/**
 * * TYPES ADD
*/

interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

/**
 * * Type Gini 
*/

interface Gini {
    [key: number]: number;
}

/**
 * * Type Car 
*/

interface Car {
    signs: string[];
    side: string;
}

/**
 * * Type Flags 
*/

interface Flags extends GenericTypeFlagsAndArms {
    alt: string
}

/**
 * * Type Capital Info 
*/

interface CapitalInfo{
    latlng: number[];
}

/**
 * * Type postal code
 *  
*/

interface PostalCode {
    format: string;
    regex: string;
}
