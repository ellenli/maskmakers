import React from "react";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.heading}>
          #MaskOn
        </h1>
        <div className={styles.spinner} />
      </div>
    </div>
  );
};

export default Loader;
