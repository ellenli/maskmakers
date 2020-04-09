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
        <div className={styles.imageContainer}>
          <img
            className={styles.picture}
            src="https://maskmakers.club/background.png"
            alt="Maskmaker with scissors and cloth"
          />
        </div>
        <h1 className={styles.pageTitle}>About the club</h1>
        <div className={styles.aboutContainer}>
          <p className={styles.about}>
            Mask Makers Club is a global directory of sewists and small businesses that sell non-medical reusable face masks.<br /><br />By connecting buyers to independent makers, we can all do our part in supporting local businesses, conserving medical-grade equipment for medical workers, and helping slow the spread of COVID-19.
          </p>
          <h1 className={styles.pageTitle}>FAQ</h1>
          <h2 className={styles.subheading}>Are these masks medical-grade?</h2>
          <p className={styles.about}>
            The masks listed on our website are not medical-grade masks or N-95 respirators. We believe that medical-grade supplies should be for medical workers who are at a higher risk in their work responding to COVID-19.
            <br />
            <br />
            Organizations such as{" "}
            <a
              href="https://masksfordocs.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Masks for Docs
            </a>{" "}
            and{" "}
            <a
              href="https://www.weneedmasks.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              We Need Masks
            </a>{" "}
            are focused on connecting sewists with the healthcare community in order to get them the medical-grade  supplies that they need.
          </p>

          <h2 className={styles.subheading}>
          Are homemade masks effective in slowing the spread of the COVID-19?

          </h2>
          <p className={styles.about}>
          Homemade masks do not guarantee protection against COVID-19, however, wearing a mask is more effective than not wearing a mask at all. The
{" "}
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/diy-cloth-face-coverings.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              CDC recommends
            </a>{" "}
            wearing a cloth mask in public or when social distancing may be difficult to maintain.
          </p>

          <h2 className={styles.subheading}>Why wear a mask?</h2>
          <p className={styles.about}>
            There are 3 simple reasons to wear a mask:
            <ol type="1">
              <li>Protect others by not spreading COVID-19 if you have it</li>
              <li>
                Protect yourself by reducing your chances of catching COVID-19
                when you go outside
              </li>
              <li>
                Reduce face touching by wearing something that covers your face
              </li>
            </ol>
            <br />
            Learn more at{" "}
            <a
              href="https://masks4all.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              masks4all
            </a>
            .
          </p>

          <h2 className={styles.subheading}>How do I join the Mask Makers Club?</h2>
          <p className={styles.about}>
            To join the club as a mask maker, or to add someone you know, complete {" "}
            <a
              href="https://airtable.com/shrwyYwx7xdJZTU8Z"
              target="_blank"
              rel="noopener noreferrer"
            >
              this simple form
            </a>
            . Mask makers are added every couple hours.<br /><br />
            If you've been featured in our directory and would like to be removed, please contact us.
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
            and friends. Design by{" "}
            <a
              href="https://twitter.com/a_gargul"
              target="_blank"
              rel="noopener noreferrer"
            >
              Andrey
            </a>
            ,{" "}
            <a
              href="https://uglycute.life/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jessica
            </a>
            ,{" "}
            <a
              href="http://localkristine.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kristine
            </a>
            , and{" "}
            <a
              href="https://www.joelletso.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Joelle
            </a>
            . Content editing by{" "}
            <a
              href="https://www.linkedin.com/in/kailey-derubeis-12338093/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kailey
            </a>
            . Development by{" "}
            <a
              href="https://twitter.com/djirdehh"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hassan
            </a>
            ,{" "}
            <a
              href="https://twitter.com/attaboy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Luke
            </a>
            ,{" "}
            <a
              href="https://www.ben-che.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ben
            </a>
                        , and{" "}
            <a
              href="https://twitter.com/kasrak"
              target="_blank"
              rel="noopener noreferrer"
            >
              Kasra
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
            <a href="https://github.com/ellenli/maskmakers/" target="_blank" rel="noopener noreferrer">
              on GitHub
            </a>
            .
          </p>
          <h2 className={styles.subheading}>Disclaimer</h2>
          <p className={styles.about}>
          Makers in the Mask Makers Club are not licensed medical professionals or healthcare providers. If you have questions about COVID-19 and how to protect yourself, please visit <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks" target="_blank">WHO</a>.
          <br /><br />
Masks listed on Mask Makers Club are available for purchase through the makers. If you have any questions about a mask, including questions about shipping, pricing, or availability, please contact the maker directly.
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
