import React, { createContext, useState, useContext } from "react";

// Create the context
const NavbarContext = createContext();

// Create a custom hook to use the NavbarContext more easily
export const useNavbarContext = () => {
  return useContext(NavbarContext);
};

// Create the provider component
export const NavbarProvider = ({ children }) => {
  const [navbarHeight, setNavbarHeight] = useState(0);

  return (
    <NavbarContext.Provider value={{ navbarHeight, setNavbarHeight }}>
      {children}
    </NavbarContext.Provider>
  );
};
