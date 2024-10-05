import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import myImg from "../../assets/me-light.png";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedInLight from "../../assets/linkedin-light.svg";
import linkedInDark from "../../assets/linkedin-dark.svg";
import resume from "../../assets/resume.pdf";
import { useTheme } from "../Theme/Theme";
import { useNavbarContext } from "../Navbar/NavbarContext";
import { Cursor } from "react-simple-typewriter";

export const Hero = () => {
  const { theme } = useTheme();
  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedInIcon = theme === "light" ? linkedInLight : linkedInDark;
  const { navbarHeight } = useNavbarContext();

  const roles = [
    "Mathematics Undergrad",
    "Data Analyst",
    "Frontend Developer",
    "Tech Enthusiast",
  ];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTypewriter = async () => {
      const currentRole = roles[currentRoleIndex];
      const fullText = currentRole.substring(0, charIndex);

      if (!isDeleting) {
        // Typing phase
        setText(fullText);
        if (charIndex < currentRole.length) {
          setCharIndex(charIndex + 1);
          setTypingSpeed(60); // Typing speed
        } else {
          setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        }
      } else {
        // Deleting phase
        let deleteSpeed = 50; // Default delete speed

        // Set custom delete speed for last 3 characters
        if (charIndex > currentRole.length - 3) {
          deleteSpeed = 50 + Math.floor(Math.random() * 200); // Varies between 50-100
        }

        setText(fullText);
        if (charIndex > 0) {
          setCharIndex(charIndex - 1);
          setTypingSpeed(deleteSpeed);
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
          setTypingSpeed(500); // Pause before starting to type next word
        }
      }
    };

    const timer = setTimeout(handleTypewriter, typingSpeed);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [charIndex, isDeleting, typingSpeed, currentRoleIndex]);

  return (
    <section
      className={`${styles.heroContainer}`}
      style={{ paddingTop: `${navbarHeight}px` }}
    >
      {/* Image container */}
      <div className={`${styles.myImgContainer}`}>
        <img
          className={`${styles.myImg}`}
          src={myImg}
          alt="Profile Picture of Aowen"
        />
      </div>

      {/* Info container */}
      <div className={`${styles.myInfoContainer}`}>
        <h1
          className={`${styles.myName}`}
          style={{ color: "var(--color-text)" }}
        >
          Chin Ao-Wen
        </h1>
        <h2
          className={`${styles.myRole} text-3xl`}
          style={{ color: "var(--color-text)" }}
        >
          <span>
            <span className={`text-3xl`} style={{ color: "var(--color-text)" }}>
              I'm a
            </span>
            <span
              className={`text-3xl ml-2`}
              style={{ color: "var(--color-accent)" }}
            >
              {text}
            </span>
            <span>
              <Cursor cursorColor="var(--color-accent)" />
            </span>
          </span>
        </h2>

        <span className={`${styles.socialIcons}`}>
          <a href="https://github.com/Chesh1M" target="_blank">
            <img src={githubIcon} alt="Github Icon" />
          </a>
          <a href="https://www.linkedin.com/in/aowenc/" target="_blank">
            <img src={linkedInIcon} alt="linkedIn Icon" />
          </a>
        </span>

        <p
          className={`${styles.myDescription} text-lg`}
          style={{ color: "var(--color-text)" }}
        >
          With a passion for all things tech, data, and developing modern web
          applications. <br /> Check out my resume!
        </p>

        <div className={`flex justify-center mb-10`}>
          <a href={resume} download>
            <button className={styles.resumeBtn}>My Resume</button>
          </a>
        </div>
      </div>
    </section>
  );
};
