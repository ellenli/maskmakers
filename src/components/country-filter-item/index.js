import React from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
import CircleCheckIcon from "../../icons/circle-check";
import CircleIcon from "../../icons/circle";

const CountryFilterItem = ({ isChecked, onChange, onClick, title, id, type, count }) => {
  const pillStyles = classnames({
    [styles.main]: true,
    [styles.mainPill]: type === "pill",
    [styles.mainRow]: type === "row"
  });

  const labelStyles = classnames({
    [styles.label]: true,
    [styles.labelPill]: type === "pill",
    [styles.labelRow]: type === "row"
  });
  return (
    <span key={id} className={pillStyles}>
      <input
        id={id}
        type="radio"
        value={id}
        onChange={onChange}
        onClick={onClick}
        checked={isChecked}
        className={styles.input}
      />
      <label htmlFor={id} className={labelStyles}>
        {type === "row" && <>{isChecked ? <CircleCheckIcon /> : <CircleIcon />}</>}
        <span className={styles.labelTitle}>{title}</span>
      </label>
    </span>
  );
};

export default CountryFilterItem;
