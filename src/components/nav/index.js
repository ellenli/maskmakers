import React from "react";
import { Link } from "gatsby";
import Logo from "../logo";
import styles from "./nav.module.scss";

import TwitterIcon from "../../icons/twitter";
import InstagramIcon from "../../icons/instagram";

const Nav = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <a
          href="https://twitter.com/maskmakersclub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
        </a>
        <a
          href="https://instagram.com/maskmakersclub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
      </div>
      <Link to="/">
        <Logo className={styles.logo} />
      </Link>
      <nav className={styles.links}>
        <Link to="/about" className={styles.link}>
          About us
        </Link>
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
