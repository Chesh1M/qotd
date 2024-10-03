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

export const Hero = () => {
  const { theme, toggleTheme } = useTheme();
  const githubIcon = theme === "light" ? githubLight : githubDark;
  const linkedInIcon = theme === "light" ? linkedInLight : linkedInDark;

  return (
    <section className={`${styles.container}`}>
      <div className={`${styles.myImgContainer} my-10`}>
        <img
          className={`${styles.myImg}`}
          src={myImg}
          alt="Profile Picture of Aowen"
        />
      </div>

      <div>
        <h1
          className={`text-5xl text-center mb-6`}
          style={{ color: "var(--color-text)" }}
        >
          Aowen
        </h1>
        <h2
          className={`text-2xl text-center mb-4`}
          style={{ color: "var(--color-text)" }}
        >
          Data Analyst
        </h2>

        <span className={`${styles.socialIcons} mb-4`}>
          <a href="https://github.com/Chesh1M" target="_blank">
            <img src={githubIcon} alt="Github Icon" />
          </a>
          <a href="https://www.linkedin.com/in/aowenc/" target="_blank">
            <img src={linkedInIcon} alt="linkedIn Icon" />
          </a>
        </span>

        <p
          className={`text-lg text-center mb-14`}
          style={{ color: "var(--color-text)" }}
        >
          With a passion for developing modern web applications
        </p>

        <div className={`flex justify-center`}>
          <a href={resume} download>
            <button className="hover text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Resume
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
