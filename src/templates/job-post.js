import React from "react";
import { graphql } from "gatsby";
import Link from "gatsby-link";
import { Helmet } from "react-helmet";
import ta from "time-ago";
import Layout from "../components/layout";
import Nav from "../components/nav";
import styles from "../pages/about.module.scss";
import MapIcon from "../icons/map";
import BriefcaseIcon from "../icons/briefcase";
import Button from "../components/button";
import "reset-css";

export default ({ data, location }) => {
  const job = data.seeker;
  const date = ta.ago(job.job.creation_date);
  const helmetContent = `${job.job.company.name} is hiring a ${job.job.job_title} in ${job.job.job_location} on the Women Who Design job board.`;
  const helmetTitle = `${job.job.company.name} is hiring!`;
  const helmetLink = `https://womenwho.design${location.pathname}`;
  return (
    <Layout>
      <Helmet
        title={`${job.job.job_title} | Women Who Design`}
        meta={[
          {
            property: "description",
            content: helmetContent
          },
          { property: "og:title", content: helmetTitle },
          {
            property: "og:description",
            content: helmetContent
          },
          {
            property: "og:image",
            content: "https://womenwho.design/opengraph.png"
          },
          { property: "og:url", content: helmetLink },
          { property: "og:type", content: "website" },
          { property: "og:site_name", content: "Women Who Design" },
          { property: "twitter:site", content: "@womenwhodesign" },
          { property: "twitter:creator", content: "@julesforrest" },
          { property: "twitter:card", content: "summary_large_image" },
          {
            property: "twitter:image",
            content: "https://womenwho.design/opengraph.png"
          }
        ]}
      />
      <Nav theme="light" />
      <div className={styles.container}>
        <h1 className={styles.h1}>{job.job.job_title}</h1>
        <div className={styles.jobMetadata}>
          <p className={styles.p}>
            <span className="icon-group">
              <BriefcaseIcon size={16} />
              <a href={job.job.company.company_url} className={styles.company}>
                {job.job.company.name}
              </a>
            </span>{" "}
            <span className={styles.interpunct}>·</span>{" "}
            <span className="icon-group">
              <MapIcon size={16} />
              {job.job.job_location}
            </span>
          </p>
          <p className={styles.jobDate}>{date}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: job.job.job_description }}
          className="job-description"
        />

        <Button href={job.job.job_application_link} width="auto">
          Apply to {job.job.company.name}
        </Button>
        <div className={styles.backContainer}>
          <Link to="/jobs" className={styles.backLink}>
            Back to jobs
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

// export const query = graphql`
//   query($slug: String!) {
//     seeker(fields: { slug: { eq: $slug } }) {
//       id
//       job {
//         id
//         job_title
//         job_description
//         job_location
//         creation_date
//         job_application_link
//         company {
//           name
//           company_url
//         }
//       }
//     }
//   }
// `;
