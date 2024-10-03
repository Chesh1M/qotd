import React from "react";
import styles from "./Navbar.module.css";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ResponsiveMenu } from "./ResponsiveMenu";
import { NavLinks } from "./links";
import { useTheme } from "../Theme/Theme";
import sun from "../../assets/sun.svg";
import moon from "../../assets/moon.svg";
import { useNavbarContext } from "./NavbarContext";

export const Navbar = () => {
  // Hamburger menu state
  const [isOpen, setIsOpen] = useState(false);

  // Website theme
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;

  // Reference to detect clicks on navbar
  const navbarRef = useRef(null);

  const { setNavbarHeight } = useNavbarContext(); // Get the setter from the context
  // State to store navbar height (to adjust menu position)
  // const [navbarHeight, setNavbarHeight] = useState(0);

  // Get current page
  const { pathname } = useLocation();

  // Smooth scrolling
  useEffect(() => {
    // Detect if there's a hash in the URL after navigation
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#' from the hash
      const element = document.getElementById(elementId);
      if (element) {
        // Scroll smoothly to the element
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Function to toggle the navbar state
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the navbar
  const closeNavbar = () => {
    setIsOpen(false);
  };

  // Function to handle clicking "About"
  const handleAboutClick = () => {
    if (pathname === "/") {
      // Scroll to top if already on the homepage
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If navigating to the homepage
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    }
    closeNavbar(); // Close the navbar
  };

  // Add a resize event listener to close the navbar dropdown when resizing the screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        closeNavbar(); // Close the navbar if the screen is resized
      }

      // Update the navbar height dynamically
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    // Set the initial navbar height
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [closeNavbar, setNavbarHeight]);

  return (
    <>
      <nav className={styles.navbar} ref={navbarRef}>
        <div className="container flex justify-between items-center py-8 px-6">
          {/* My name section */}
          <div className="text-2xl font-black flex items-center gap-2">
            <NavLink
              to="/"
              onClick={handleAboutClick}
              className={styles.logo}
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
              <NavLinks
                closeNavbar={closeNavbar}
                handleAboutClick={handleAboutClick}
              />
            </ul>
          </div>

          {/* Mobile hamburger menu section */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar}>
              {isOpen ? (
                <X
                  className={styles.hamburgerIcon}
                  style={{ color: "var(--color-text)" }}
                  size={28}
                />
              ) : (
                <Menu
                  className={`flex-auto ${styles.hamburgerIcon}`}
                  style={{ color: "var(--color-text)" }}
                  size={28}
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
        handleAboutClick={handleAboutClick}
      />
    </>
  );
};
