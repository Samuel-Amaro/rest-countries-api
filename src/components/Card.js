export default function CardCountrie(props) {
  return (
    <div className="main__Card-Contrie">
      <img className="main__Ilustration" alt={`Ilustration Flag ${props.name}`} src={props.srcFlag}/>
      <h2 className="main__Name-Countrie">{props.name}</h2>
      <p className="main__Population">
        <span className="main__Relevant">Population:</span> {props.population}
      </p>
      <p className="main__Region">
        <span className="main__Relevant">Region:</span> {props.region}
      </p>
      <p className="main__Region">
        <span className="main__Relevant">Capital:</span> {props.capital}
      </p>
    </div>
  );
}
