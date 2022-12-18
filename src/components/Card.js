import formatNumber from "../utils/format-number";
import "./Card.css";

export default function CardCountrie(props) {
  return (
    <div className="main__Card-Contrie">
      <img
        className="main__Ilustration"
        alt={`Ilustration Flag ${props.name}`}
        src={props.srcFlag}
      />
      <div className="main__Container-Text">
        <h2 className="main__Name-Countrie">{props.name}</h2>
        <p className="main__Population">
          <span className="main__Relevant">Population:</span>
          <span className="main__Value">{formatNumber(props.population)}</span>
        </p>
        <p className="main__Region">
          <span className="main__Relevant">Region:</span>
          <span className="main__Value">{props.region}</span>
        </p>
        <p className="main__Region">
          <span className="main__Relevant">Capital:</span>
          <span className="main__Value">{props.capital}</span>
        </p>
      </div>
    </div>
  );
}
