import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/HomePage";
import { MusingsPage } from "./pages/MusingsPage";
import { GalleryPage } from "./pages/GalleryPage";
import { NavbarProvider } from "./components/Navbar/NavbarContext";

export const App = () => {
  return (
    <NavbarProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/musings" element={<MusingsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </Router>
    </NavbarProvider>
  );
};
