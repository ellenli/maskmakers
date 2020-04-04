import React from "react";
import MapIcon from "../../icons/map";
import styles from "./profile.module.scss";
import Button from "../button";

const Profile = props => {
  const { image, name, location, country, websiteUrl } = props;

  return (
    <div
      className={styles.profile}
      style={{
        "--profile-theme-color": "#6362fc"
      }}
    >
      <div style={{ backgroundImage: `url(${image})` }} className={styles.image} />
      <div className={styles.card}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.item}>
          <MapIcon style={{ marginBottom: "-2px", marginRight: "2px" }} size={14} />
          {location}
        </p>
        <p className={styles.item}>
          <MapIcon style={{ marginBottom: "-2px", marginRight: "2px" }} size={14} />
          {country}
        </p>

        <Button
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: "#FF805C",
            borderRadius: 99,
            gridColumn: "1 / -1",
            marginTop: "16px",
            marginBottom: "12px"
          }}
        >
          <span className={styles.linkText}>Visit Website</span>
        </Button>
      </div>
    </div>
  );
};

export default Profile;
