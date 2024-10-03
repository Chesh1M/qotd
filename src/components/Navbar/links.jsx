import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export const NavLinks = ({ closeNavbar, handleAboutClick }) => {
  return (
    <>
      <NavLink to="/" className={styles.navlinks} onClick={handleAboutClick}>
        About
      </NavLink>
      <NavLink
        to="#experiences"
        className={styles.navlinks}
        onClick={closeNavbar}
      >
        Experiences
      </NavLink>
      <NavLink
        to="/#projects"
        className={styles.navlinks}
        onClick={closeNavbar}
      >
        Projects
      </NavLink>
      <NavLink to="/#contact" className={styles.navlinks} onClick={closeNavbar}>
        Contact
      </NavLink>
      <NavLink to="/musings" className={styles.navlinks} onClick={closeNavbar}>
        Musings
      </NavLink>
      <NavLink to="/gallery" className={styles.navlinks} onClick={closeNavbar}>
        Life
      </NavLink>
    </>
  );
};
