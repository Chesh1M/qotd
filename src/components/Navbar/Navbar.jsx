import { Menu, X } from "lucide-react";
import { useState } from "react";
import React from "react";
import { NavLink, Link } from "react-router-dom";

import myLogo from "../../assets/me-dark.png";
import styles from "./Navbar.module.css";

const NavLinks = () => {
  return (
    <>
      <NavLink to="#about" className={styles.navlinks}>
        About
      </NavLink>
      <NavLink to="#experiences" className={styles.navlinks}>
        Experiences
      </NavLink>
      <NavLink to="#projects" className={styles.navlinks}>
        Projects
      </NavLink>
      <NavLink to="#contact" className={styles.navlinks}>
        Contact
      </NavLink>
      <NavLink to="/musings" className={styles.navlinks}>
        Musings
      </NavLink>
      <NavLink to="/gallery" className={styles.navlinks}>
        Life
      </NavLink>
    </>
  );
};

//export const Navbar = () => {};

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between flex-wrap py-8 px-16">
        <div className="text-bold text-xl">
          <NavLink to="/">AowenC</NavLink>
        </div>

        <nav className="flex justify-end">
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          <div className="md:hidden">
            <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
          </div>
        </nav>
      </div>

      {isOpen && (
        <div className="flex flex-col items-center basis-full">
          <NavLinks />
        </div>
      )}
    </>
  );
};
