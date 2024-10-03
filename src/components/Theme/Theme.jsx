import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const Theme = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// import React from "react";
// import "./DarkMode.css";
// import styles from "./Darkmode.module.css";

// const DarkMode = () => {
//   const setDarkMode = () => {
//     document.querySelector("body").setAttribute("data-theme", "dark");
//   };
//   const setLightMode = () => {
//     document.querySelector("body").setAttribute("data-theme", "light");
//   };
//   setDarkMode();
//   return (
//     <div className="dark_mode">
//       <input className="dark_mode_input" type="checkbox" id="darkmode-toggle" />
//       <label className="dark_mode_label" for="darkmode-toggle">
//         <Sun />
//         <Moon />
//       </label>
//     </div>
//   );
// };

// export default DarkMode;
