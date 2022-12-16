import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as loaderHome } from "../routers/Home";
import CountriDetail, {
  loader as loaderCountriDetail,
} from "../routers/CountriDetail";
import { ThemeContext } from "./ThemeContext";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: loaderHome,
  },
  {
    path: "/country/:countriName",
    element: <CountriDetail />,
    loader: loaderCountriDetail,
  },
]);

export default function App() {
    
  const [theme, setTheme] = useState({
    theme: "light",
    toggleTheme: toggleTheme,
  });

  function toggleTheme(themeOption) {
    setTheme((previosState) => {
      return {
        theme: themeOption,
        toggleTheme: previosState.toggleTheme,
      };
    });
  }

  return (
    <ThemeContext.Provider value={theme}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}
