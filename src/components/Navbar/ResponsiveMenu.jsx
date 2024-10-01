import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "./links";

export const ResponsiveMenu = ({ open, closeNavbar }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-full h-screen z-20"
        >
          <div className="text-xl font-semibold uppercase bg-blue-950 text-white py-10 m-6 rounded-3xl">
            <ul className="flex flex-col justify-center items-center gap-10">
              <NavLinks closeNavbar={closeNavbar} />
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};