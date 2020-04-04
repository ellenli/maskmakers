import React from "react";
import { Link } from "gatsby";
import Logo from "../logo";
import styles from "./nav.module.scss";

const Nav = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Logo className={styles.logo} />
      </Link>
      <nav className={styles.links}>
        <Link to="/faq" className={styles.link}>
          FAQ
        </Link>
        <Link to="/about" className={styles.link}>
          About us
        </Link>
      </nav>
      <nav className={styles.links}>
        <a
          href="https://airtable.com/shrwyYwx7xdJZTU8Z"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Add a mask maker
        </a>
      </nav>
    </div>
  );
};

export default Nav;
