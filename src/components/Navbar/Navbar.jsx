import { Menu, X } from "lucide-react";
import { useState } from "react";
import React from "react";
import { NavLink } from "react-router-dom";

import myLogo from "../../assets/me-dark.png";
import styles from "./Navbar.module.css";
import { ResponsiveMenu } from "./ResponsiveMenu";
import { NavLinks } from "./links";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const closeNavbar = () => {
    setIsOpen(false); // Closes the navbar when a link is clicked
  };

  return (
    <>
      <nav>
        <div className="container flex justify-between items-center py-8 px-6">
          {/* My name section */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <NavLink to="/" onClick={closeNavbar}>
              AowenC
            </NavLink>
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