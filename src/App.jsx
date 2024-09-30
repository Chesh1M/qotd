import React from "react";
import styles from "./App.module.css";
import { Qotd } from "./components/QOTD/Qotd";

export const App = () => {
  return (
    <div className={styles.App}>
      <Qotd />
    </div>
  );
};
