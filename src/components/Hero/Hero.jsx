import React from "react";
import styles from "./Hero.module.css";
// import { GithubIcon } from "lucide-react";
import myImg from "../../assets/me-light.png";
import githubIcon from "../../assets/github-light.svg";
import linkedInIcon from "../../assets/linkedin-light.svg";

export const Hero = () => {
  return (
    <section id="hero" className={styles.container}>
      <div className={styles.myImgContainer}>
        <img
          className={`${styles.myImg}`}
          src={myImg}
          alt="Profile Picture of Aowen"
        />
      </div>

      <div>
        <h1 className={`text-5xl text-center mb-6`}>Aowen</h1>
        <h2 className={`text-2xl text-center mb-4`}>Data Analyst</h2>

        <span className={`${styles.socialIcons} mb-4`}>
          <a href="http://github.com" target="_blank">
            <img src={githubIcon} alt="Github Icon" />
          </a>
          <a href="http://linkedin.com" target="_blank">
            <img src={linkedInIcon} alt="linkedIn Icon" />
          </a>
          <a href="http://github.com" target="_blank">
            <img src={githubIcon} alt="Github Icon" />
          </a>
        </span>

        <p className={`text-lg text-center`}>
          With a passion for developing modern web apps for any purpose
        </p>
      </div>
    </section>
  );
};
