import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "./links";
import { useNavbarContext } from "../Navbar/NavbarContext";

export const ResponsiveMenu = ({
  open,
  closeNavbar,
  navbarRef,
  handleAboutClick,
}) => {
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
      }
    };

    if (open) {
      document.body.style.overflow = "hidden"; // Prevent scrolling on the page behind the menu
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling on close
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.body.style.overflow = "auto";
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
          style={{
            top: `${navbarHeight}px`,
            maxHeight: `calc(100vh - ${navbarHeight}px)`,
            overflowY: "auto",
          }} // Limit height to screen height minus navbar height
        >
          <div
            className="text-xl font-semibold uppercase py-10 lg:hidden"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-text)",
              borderBottomLeftRadius: "1.5rem",
              borderBottomRightRadius: "1.5rem",
              maxHeight: `calc(100vh - ${navbarHeight}px)`, // Ensure the menu doesn't exceed the viewport height
              overflowY: "auto", // Allow vertical scrolling for the menu
            }}
          >
            <ul className="flex flex-col justify-center items-center gap-8">
              <NavLinks
                closeNavbar={closeNavbar}
                handleAboutClick={handleAboutClick}
              />
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
