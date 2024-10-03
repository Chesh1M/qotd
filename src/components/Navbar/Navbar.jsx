import { Menu, X } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

import myLogo from "../../assets/me-dark.png";
import styles from "./Navbar.module.css";
import { ResponsiveMenu } from "./ResponsiveMenu";
import { NavLinks } from "./links";
import { useTheme } from "../Theme/Theme";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;
  const navbarRef = useRef(null);

  // Function to toggle the navbar state
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the navbar
  const closeNavbar = () => {
    setIsOpen(false);
  };

  // Add a resize event listener to close the navbar dropdown when resizing the screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeNavbar(); // Close the navbar if the screen is resized
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className={styles.navbar} ref={navbarRef}>
        <div className="container flex justify-between items-center py-8 px-6">
          {/* My name section */}
          <div className="text-2xl flex items-center gap-2">
            <NavLink
              to="/"
              onClick={closeNavbar}
              style={{ color: "var(--color-text)" }}
            >
              AowenC
            </NavLink>
          </div>

          {/* Theme setting */}
          <div className={styles.themeIcon}>
            <img
              className={styles.themeMode}
              src={themeIcon}
              alt="Theme mode icon"
              onClick={toggleTheme}
            />
          </div>

          {/* Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6 text-gray-600">
              <NavLinks closeNavbar={closeNavbar} />
            </ul>
          </div>

          {/* Mobile hamburger menu section */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar}>
              {isOpen ? (
                <X style={{ color: "var(--color-text)" }} />
              ) : (
                <Menu
                  className="flex-auto"
                  style={{ color: "var(--color-text)" }}
                />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile sidebar section */}
      <ResponsiveMenu
        open={isOpen}
        closeNavbar={closeNavbar}
        navbarRef={navbarRef}
      />
    </>
  );
};
