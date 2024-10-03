import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "./links";
import { useNavbarContext } from "../Navbar/NavbarContext";

export const ResponsiveMenu = ({ open, closeNavbar, navbarRef }) => {
  const menuRef = useRef(null);
  const { navbarHeight } = useNavbarContext();

  useEffect(() => {
    // Function to handle click outside the menu
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        closeNavbar(); // Close the navbar when clicking outside
        console.log(navbarHeight);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, closeNavbar]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 w-full z-20"
          style={{ top: `${navbarHeight}px` }}
        >
          <div
            className="text-xl font-semibold uppercase py-10 lg:hidden"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-text)",
              borderBottomLeftRadius: "1.5rem",
              borderBottomRightRadius: "1.5rem",
            }}
          >
            <ul className="flex flex-col justify-center items-center gap-8">
              <NavLinks closeNavbar={closeNavbar} />
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
