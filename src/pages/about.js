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
        <div className={styles.imageContainer}>
          <img className={styles.picture} src='https://maskmakers.club/background.png' alt="Maskmaker with scissors and cloth" />
        </div>
        <h1 className={styles.pageTitle}>About the club</h1>
        <div className={styles.aboutContainer}>
          <p className={styles.about}>
            Mask Makers Club is a global collective of mask makers. We are sewists,
            makers, and entrepreneurs, united in a mission to slow the spread of COVID-19 by
            supporting local communities and bringing a bit of joy with every mask we make.
            <br />
            <br />
            Mask on and <a href="/">support a local maker</a>.
          </p>
          <h1 className={styles.pageTitle}>FAQ</h1>
          <h2 className={styles.subheading}>Why wear a mask?</h2>
          <p className={styles.about}>
            There are 3 simple reasons to wear a mask:
            <ol type="1">
              <li>Protect others by not spreading COVID-19 if you have it</li>
              <li>
                Protect yourself by reducing your chances of catching COVID-19 when you go
                outside
              </li>
              <li>Reduce face touching by wearing something that covers your face</li>
            </ol>
            <br />
            Learn more at{" "}
            <a href="https://masks4all.co/" target="_blank" rel="noopener noreferrer">
              masks4all
            </a>
            .
          </p>
          <h2 className={styles.subheading}>How do I join the club?</h2>
          <p className={styles.about}>
            To join the club as a mask maker, or to add a mask maker you know,{" "}
            <a
              href="https://airtable.com/shrwyYwx7xdJZTU8Z"
              target="_blank"
              rel="noopener noreferrer"
            >
              complete this simple form
            </a>
            . Mask makers are added every couple hours.
          </p>
          <h2 className={styles.subheading}>How do I leave the club?</h2>
          <p className={styles.about}>
            If you've been featured in the club and you'd rather not be, please contact us
            and you will be removed.
          </p>
          <h2 className={styles.subheading}>Contact us</h2>
          <p className={styles.about}>
            You can contact us through{" "}
            <a
              href="https://instagram.com/maskmakersclub"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            ,{" "}
            <a
              href="https://twitter.com/maskmakersclub"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            , or good ol' email:{" "}
            <a href="mailto:hello@maskmakers.club">hello@maskmakers.club</a>.
          </p>
        </div>
        <h1 className={styles.pageTitle}>About the project</h1>
        <div className={styles.aboutContainer}>
          <p className={styles.about}>
            Mask Makers Club is a project started by{" "}
            <a href="https://twitter.com/ellenxli" target="_blank" rel="noopener noreferrer">
              Ellen
            </a>{" "}
            and friends. Art and design by{" "}
            <a href="https://twitter.com/a_gargul" target="_blank" rel="noopener noreferrer">
              Andrey
            </a>
            ,{" "}
            <a href="https://uglycute.life/" target="_blank" rel="noopener noreferrer">
              Jessica
            </a>
            ,{" "}
            <a href="http://localkristine.com/" target="_blank" rel="noopener noreferrer">
              Kristine
            </a>
            , and{" "}
            <a href="https://www.joelletso.com/" target="_blank" rel="noopener noreferrer">
              Joelle
            </a>
            . Marketing by{" "}
            <a href="https://twitter.com/CarlCasis" target="_blank" rel="noopener noreferrer">
              Carl
            </a>
            . Development by{" "}
            <a href="https://twitter.com/djirdehh" target="_blank" rel="noopener noreferrer">
              Hassan
            </a>
            ,{" "}
            <a href="https://twitter.com/attaboy" target="_blank" rel="noopener noreferrer">
              Luke
            </a>
            ,{" "}
            <a href="https://twitter.com/kasrak" target="_blank" rel="noopener noreferrer">
              Kasra
            </a>
            , and{" "}
            <a href="https://www.ben-che.com/" target="_blank" rel="noopener noreferrer">
              Ben
            </a>
            .<br /><br />Our website is built on{" "}
            <a href="https://womenwho.design/" target="_blank" rel="noopener noreferrer">
            Women Who Design
            </a>{" "}
             by{" "}
            <a href="https://twitter.com/julesforrest">
            Jules
            </a>
            . Our source code is{" "}
            <a href="https://github.com/ellenli/maskmakers/" target="_blank">
              on GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
