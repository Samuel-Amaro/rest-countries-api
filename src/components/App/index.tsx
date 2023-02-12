import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home, { loader as loaderHome } from "../../routers/Root";
import CountriDetail, {
  loader as loaderCountriDetail,
} from "../../routers/CoutriDetail";
import ErrorPage from "../../routers/ErrorPage";
import { ThemeContextProvider } from "../../context/ThemeContext";

/*Obs: deployment in gitHub pages não pode usar createBrowserRouter -> createBrowserRouter([]), temos que usar createHashRouter createBrowserRouter([])*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loaderHome,
    errorElement: <ErrorPage />,
  },
  {
    path: "/country/:countriName",
    element: <CountriDetail />,
    loader: loaderCountriDetail,
    errorElement: <ErrorPage />,
  },
], {
  basename: "/rest-countries-api"
});


export default function App() {
  return (
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}
