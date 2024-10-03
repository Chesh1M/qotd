import React from "react";
import styles from "./Hero.module.css";
// import { GithubIcon } from "lucide-react";
import myImg from "../../assets/me-light.png";
import githubLight from "../../assets/github-light.svg";
import githubDark from "../../assets/github-dark.svg";
import linkedInLight from "../../assets/linkedin-light.svg";
import linkedInDark from "../../assets/linkedin-dark.svg";
import resume from "../../assets/resume.pdf";
import { useTheme } from "../Theme/Theme";
import { useNavbarContext } from "../Navbar/NavbarContext";

export const Hero = () => {
  const { theme, toggleTheme } = useTheme();
  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedInIcon = theme === "light" ? linkedInLight : linkedInDark;
  const { navbarHeight } = useNavbarContext();

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
          <p className={`text-3xl`} style={{ color: "var(--color-text)" }}>
            I'm a
          </p>
          <p
            className={`text-4xl ml-3`}
            style={{ color: "var(--color-accent)" }}
          >
            Data Analyst
          </p>
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
