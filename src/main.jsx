import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";

import "@fontsource/montserrat";
import "@fontsource-variable/rubik";
import { Theme } from "./components/Theme/Theme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>
);
