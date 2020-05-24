import React from "react";
import styles from "./no-results-found.module.scss";

const NoResultsFound = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.heading}>
          No results found
        </h2>
      </div>
    </div>
  );
};

export default NoResultsFound;
