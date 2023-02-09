import { useState, useEffect } from "react";

export function useTheme() {
    /*const [stateContext, setStateContext] = useState({
      theme: "light",
      toggleTheme: toggleTheme,
    });*/
    const [theme, setTheme] = useState("light");

    function toggleTheme(themeOption: string) {
      /*setStateContext((previosState) => {
        return {
          ...previosState,
          theme: themeOption,
          toggleTheme: previosState.toggleTheme,
        };
      });*/
      setTheme(themeOption);
    }

    useEffect(() => {
      const body = document.querySelector(".Body") as HTMLBodyElement;
      body.dataset.theme =theme;
    }, [theme]);

    return [theme, toggleTheme];
}
