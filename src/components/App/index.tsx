import { createHashRouter, RouterProvider } from "react-router-dom";
import Home, { loader as loaderHome } from "../../routers/Home";
import CountriDetail, {
  loader as loaderCountriDetail,
} from "../../routers/CoutriDetail";
import ErrorPage from "../../routers/ErrorPage";
import { ThemeContextProvider } from "../../context/ThemeContext";

/*Obs: deployment in gitHub pages não pode usar createBrowserRouter -> createBrowserRouter([]), temos que usar createHashRouter createBrowserRouter([])*/
const router = createHashRouter([
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
  },
]);

export default function App() {  
  /*const [theme, toggleTheme] = useTheme();*/

  /*function toggleTheme(themeOption: string) {
    setTheme((previosState) => {
      return {
        theme: themeOption,
        toggleTheme: previosState.toggleTheme,
      };
    });
  }*/

  return (
    /*<ThemeContext.Provider value={{theme, toggleTheme}}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
    */
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  );
}
