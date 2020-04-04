import React from "react";
import MapIcon from "../../icons/map";
import styles from "./profile.module.scss";
import Button from "../button";

const Profile = props => {
  const { image, name, location, country, websiteUrl } = props;

  return (

<a href={websiteUrl} target="_blank">
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
      </div>

      <Button
  href={websiteUrl}
  target="_blank"
  rel="noopener noreferrer"
  style={{
    backgroundColor: "#626BEB",
    borderRadius: 15,
    gridColumn: "1 / -1",
    marginTop: "5px",
    marginBottom: "16px",
    width: "88%"
  }}
>
  <span className={styles.linkText}>Visit the maker</span>
</Button>

    </div>
    </a>
  );
};

export default Profile;
