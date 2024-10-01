import React from "react";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/HomePage";
import { MusingsPage } from "./pages/MusingsPage";
import { GalleryPage } from "./pages/GalleryPage";

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/musings" element={<MusingsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
};
