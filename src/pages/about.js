import React from "react";
import "reset-css";
import { Helmet } from "react-helmet";
import Nav from "../components/nav";
import styles from "./about.module.scss";
import Layout from "../components/layout";

const About = () => (
  <Layout>
    <Helmet title="About Mask Maker Club" />
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Nav theme="light" />
      </div>
      <div className={styles.main}>
        <h1 className={styles.pageTitle}>About Mask Maker Club</h1>
        <div className={styles.aboutContainer}>
          <p className={styles.about}>
            Business owners like you are the heart of Shopify, and we always want to do
            everything in our power to support you. Read on to learn about the actions
            we’re taking, get answers to your questions, and access resources to help you
            navigate your business during this challenging time.
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
