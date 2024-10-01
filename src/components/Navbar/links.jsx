import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export const NavLinks = () => {
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
