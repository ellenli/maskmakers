import React from "react";
import "reset-css";
import { Helmet } from "react-helmet";
import Nav from "../components/nav";
import styles from "./about.module.scss";
import Layout from "../components/layout";

const About = () => (
  <Layout>
    <Helmet title="About Mask Makers Club" />
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Nav theme="light" />
      </div>
      <div className={styles.main}>
        <div className={styles.aboutContainer}>
          <h2 className={styles.subheading}>What is this?</h2>
          <p className={styles.about}>
          This is a global directory of Shopify-run businesses that are Asian owned and operated. For Asian American Pacific Heritage Month, the Asian Employee Resource Group at Shopify would like to celebrate our Asian merchants by featuring them and bringing buyers—new and old—especially at a time where the community is currently facing hardships with both the economy and our identity.
          </p>
          
          <h2 className={styles.subheading}>How do I add a store to the directory?</h2>
          <p className={styles.about}>
            To join the directory, or add someone you know, please complete <a target="_blank" rel="noopener noreferrer" href="https://airtable.com/shrG3WYY0EFTUjbp5">this simple form</a>.
            <br /><br />
            If you have been featured in our directory and would like to be removed, please contact us.
          </p>

          <h2 className={styles.subheading}>About the initiative</h2>
          <p className={styles.about}>
            This directory is a project started by the Asian Employee Resource Group at Shopify: Leanne Macaspac, Lisa Vanderschuit, Peter Ho, John Oh, Yosha Khan, Aman Biswas, Maple Ong, Carolynn Nguyen.
            <br /><br />
            Special thank you to our community friends, <a target="_blank" rel="noopener noreferrer" href="https://github.com/francinen">Francine Navarro</a>, <a target="_blank" rel="noopener noreferrer" href="https://github.com/TerencedzLi">Terence Li</a>, and <a target="_blank" rel="noopener noreferrer" href="https://ben-che.com">Ben Che</a> that helped us build this.
            <br /><br />
            Our website is built on Women Who Design and inspired by our friends that built Mask Makers Club. Our source code is on <a target="_blank" rel="noopener noreferrer" href="https://github.com/ben-che/AHM">Github</a>.
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
