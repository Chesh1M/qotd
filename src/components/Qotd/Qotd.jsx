import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Qotd.module.css";

const refreshTime = 15 * 1000;

export const Qotd = () => {
  const SPACE_ID = import.meta.env.VITE_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  // save quotes from contentful cms
  const [quotes, setQuotes] = useState([]);
  // save quote currently displayed
  const [currentQuote, setCurrentQuote] = useState(() => {
    const storedQuote = localStorage.getItem("currentQuote");
    return storedQuote ? JSON.parse(storedQuote) : null;
  });
  // save timestamp of the last updated quote
  const [lastUpdated, setLastUpdated] = useState(() => {
    const storedTime = localStorage.getItem("lastUpdated");
    return storedTime ? JSON.parse(storedTime) : null;
  });

  // Function to fetch & store quotes from contentful cms
  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=quotes`
      );
      const fetchedQuotes = response.data.items;
      setQuotes(fetchedQuotes); // Store fetched quotes
      return fetchedQuotes;
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  // Randomly select a quote from the fetched quotes
  const getRandomQuote = (quotes) => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex].fields; // Adjust this based on your Contentful model
    }
    return null; // Return null if there are no quotes
  };

  useEffect(() => {
    // Function to update current quote
    const updateQuote = () => {
      // get a random quote from the list of quotes
      const newQuote = getRandomQuote(quotes);
      if (newQuote) {
        // update current quote state and localstorage
        setCurrentQuote(newQuote);
        localStorage.setItem("currentQuote", JSON.stringify(newQuote));
        // update timestamp of new quote (both state and in localstorage)
        const now = Date.now();
        localStorage.setItem("lastUpdated", JSON.stringify(now));
        setLastUpdated(now);
      }
    };

    // Fetch quotes initially
    fetchQuotes().then((fetchedQuotes) => {
      if (fetchedQuotes) {
        // Set the initial quote only if there are fetched quotes
        const now = Date.now();
        if (!lastUpdated || now - lastUpdated >= refreshTime) {
          updateQuote(); // Update quote if more than an hour has passed
        }
      }
    });

    // Set an interval to check every hour
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastUpdated >= refreshTime) {
        fetchQuotes().then((fetchedQuotes) => {
          updateQuote(); // Update the current quote
        });
      }
    }, refreshTime); // Check every hour

    return () => clearInterval(intervalId);
  }, [quotes, lastUpdated]);

  return (
    <section className={styles.qotdSection}>
      <h1 className={styles.title}>Quote of the Day</h1>
      {currentQuote && (
        <blockquote>
          <p className={styles.quoteText}>{currentQuote.quoteText}</p>{" "}
          {/* Adjust based on your model */}
          <footer
            className={styles.quoteAuthor}
          >{`- ${currentQuote.quoteAuthor}`}</footer>
          {/* Adjust based on your model */}
        </blockquote>
      )}
      <img
        className={styles.quoteImage}
        src="../../assets/thus-spoke-zarathustra.jpg"
        alt="Thus Spoke Zarathustra"
      />
    </section>
  );
};
