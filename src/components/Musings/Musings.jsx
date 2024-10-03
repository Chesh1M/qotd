import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Musings.module.css";
import { getImageUrl } from "../../utils";
import { useNavbarContext } from "../Navbar/NavbarContext";

export const Musings = () => {
  const { navbarHeight } = useNavbarContext();

  const SPACE_ID = import.meta.env.VITE_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  // Save quotes from contentful cms
  const [quotes, setQuotes] = useState([]);
  // Save quote currently displayed
  const [currentQuote, setCurrentQuote] = useState(() => {
    const storedQuote = localStorage.getItem("currentQuote");
    return storedQuote ? JSON.parse(storedQuote) : null;
  });
  // Save timestamp of the last updated quote
  const [lastUpdated, setLastUpdated] = useState(() => {
    const storedTime = localStorage.getItem("lastUpdated");
    return storedTime ? JSON.parse(storedTime) : null;
  });

  // Function to fetch & store quotes from Contentful CMS
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

  // Function to schedule the next fetch at 8 AM or 8 PM
  const scheduleNextFetch = () => {
    const now = new Date();
    const hours = now.getHours();
    const nextFetchTime =
      hours < 8
        ? new Date(now.setHours(8, 0, 0, 0))
        : hours < 20
        ? new Date(now.setHours(20, 0, 0, 0))
        : new Date(now.setDate(now.getDate() + 1), 8, 0, 0);

    const timeUntilNextFetch = nextFetchTime - Date.now();

    // console.log(`Current Time: ${new Date().toLocaleTimeString()}`);
    // console.log(`Next Fetch Time: ${nextFetchTime.toLocaleTimeString()}`);

    setTimeout(() => {
      fetchQuotes().then((fetchedQuotes) => {
        if (fetchedQuotes) {
          const newQuote = getRandomQuote(fetchedQuotes);
          if (newQuote) {
            setCurrentQuote(newQuote);
            localStorage.setItem("currentQuote", JSON.stringify(newQuote));
            localStorage.setItem("lastUpdated", Date.now());
            setLastUpdated(Date.now());
          }
        }
      });

      // Set the interval for subsequent fetches every 12 hours
      setInterval(() => {
        fetchQuotes().then((fetchedQuotes) => {
          if (fetchedQuotes) {
            const newQuote = getRandomQuote(fetchedQuotes);
            if (newQuote) {
              setCurrentQuote(newQuote);
              localStorage.setItem("currentQuote", JSON.stringify(newQuote));
              localStorage.setItem("lastUpdated", Date.now());
              setLastUpdated(Date.now());
            }
          }
        });
      }, 12 * 60 * 60 * 1000); // 12 hours
    }, timeUntilNextFetch);
  };

  useEffect(() => {
    scheduleNextFetch(); // Schedule fetch when component mounts

    return () => {
      // Optional: Clear intervals if needed on unmount
      clearInterval(); // Clear intervals if needed
    };
  }, []);

  return (
    <section
      className={`${styles.qotdSection} flex flex-col justify-start text-center w-full min-h-screen h-full`}
      style={{
        paddingTop: `${navbarHeight + 40}px`,
      }}
    >
      <h1 className={`${styles.title} text-2xl md:text-4xl`}>
        A-musing thoughts
      </h1>
      <p className={styles.disclaimer}>
        You have 12 hours to ponder over each of these, take your time to think
        deeper than you want to! <br /> (some will require additional context -
        Google it!)
      </p>
      {currentQuote && (
        <blockquote>
          <p className={`${styles.quoteText} text-lg md:text-2xl`}>
            {currentQuote.quoteText}
          </p>
          <footer className={`${styles.quoteAuthor} text-md md:text-xl`}>
            {currentQuote.quoteAuthor
              ? `- ${currentQuote.quoteAuthor.trim()}`
              : "Anonymous"}
          </footer>
        </blockquote>
      )}
      <img
        className={styles.quoteImage}
        src={getImageUrl("thus-spoke-zarathustra.jpg")}
        alt="Thus Spoke Zarathustra"
      />
    </section>
  );
};
