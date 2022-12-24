import { NavLink, useRouteError } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
    const error = useRouteError();

    return (
      <div className="main__Error">
        <h1 className="main__Title-Error">Oops!</h1>
        <p className="main__Message">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="main__Error-Message">
          <i>{error.statusText || error.message}</i>
        </p>
        <NavLink
          to="/"
          target="_self"
          rel="next"
          aria-label="Return page Home"
          title="Return page Home"
          className="main__Link-Return"
        >
          Home Page
        </NavLink>
      </div>
    );
}