import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

import myLogo from "../../assets/me-dark.png";
import styles from "./Navbar.module.css";
import { ResponsiveMenu } from "./ResponsiveMenu";
import { NavLinks } from "./links";
import { useTheme } from "../Theme/Theme";
import themeIcon from "../../assets/sun.svg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // To toggle navbar open/close when clicking menu icon
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  // To close navbar
  const closeNavbar = () => {
    setIsOpen(false);
  };

  // Add a resize event listener to close the navbar dropdown when resizing the screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Tailwind's 'lg' breakpoint
        closeNavbar();
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className={styles.navbar}>
        <div className="container flex justify-between items-center py-8 px-6">
          {/* My name section */}
          <div className="text-2xl flex items-center gap-2 font-black">
            <NavLink to="/" onClick={closeNavbar}>
              AowenC
            </NavLink>
          </div>

          {/* Theme setting */}
          <div>
            <img
              className={styles.themeMode}
              src={themeIcon}
              alt="Theme mode icon"
            />
          </div>

          {/* Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6 text-gray-600">
              <NavLinks closeNavbar={closeNavbar} />
            </ul>
          </div>
          {/* Mobile hamburger menu section */}
          <div className="lg:hidden">
            <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
      </nav>
      {/* Mobile sidebar section */}
      <ResponsiveMenu open={isOpen} closeNavbar={closeNavbar} />
    </>
  );
};
