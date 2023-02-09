import formatNumber from "../../utils/format-number";
import "./Card.css";

interface PropsCardCountrie {
  name: string;
  srcFlag: string;
  population: number;
  region: string;
  capital: string[];
}

export default function CardCountrie({
  name,
  srcFlag,
  population,
  region,
  capital,
}: PropsCardCountrie) {
  return (
    <div className="main__Card-Contrie">
      <img
        className="main__Ilustration"
        alt={`Ilustration Flag ${name}`}
        src={srcFlag}
      />
      <div className="main__Container-Text">
        <h2 className="main__Name-Countrie">{name}</h2>
        <p className="main__Population">
          <span className="main__Relevant">Population:</span>
          <span className="main__Value">{formatNumber(population)}</span>
        </p>
        <p className="main__Region">
          <span className="main__Relevant">Region:</span>
          <span className="main__Value">{region}</span>
        </p>
        <p className="main__Region">
          <span className="main__Relevant">Capital:</span>
          <span className="main__Value">{capital}</span>
        </p>
      </div>
    </div>
  );
}
