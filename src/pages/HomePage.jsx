import React from "react";
import { Hero } from "../components/Hero/Hero";
import { Testimonials } from "../components/Testimonials/Testimonials";

export const HomePage = () => {
  return (
    <div className="h-screen">
      <Hero />
      <Testimonials />
    </div>
  );
};
