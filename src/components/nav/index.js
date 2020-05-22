import React from "react";
import { Link } from "gatsby";
import styles from "./nav.module.scss";

const Nav = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <div className={styles.titleContainer}>
          <span className={styles.celebratingContainer}>
            Celebrating
          </span>
          <h1>Asian merchants at Shopify</h1>
        </div>
      </Link>
      <nav className={styles.links}>
        <Link to="/about" className={styles.link}>
          About
        </Link>
        <span className={styles.separator}>•</span>
        <a
          href="https://airtable.com/shrG3WYY0EFTUjbp5"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Nominate
        </a>
      </nav>
    </div>
  );
};

export default Nav;
