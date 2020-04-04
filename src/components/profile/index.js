import React from "react";
import MapIcon from "../../icons/map";
import styles from "./profile.module.scss";
import Button from "../button";

const Profile = props => {
  const { image, name, location, country, websiteUrl } = props;

  return (
    <a
      className={styles.profile}
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div style={{ backgroundImage: `url(${image})` }} className={styles.image} />
      <div className={styles.card}>
        <h2 className={styles.name}>{name}</h2>
        {locationAndCountry(location, country)}
      </div>

      <div className={styles.profileButtonContainer}>
        <Button
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            backgroundColor: "#626BEB",
            borderRadius: 99,
            gridColumn: "1 / -1",
            marginTop: "5px",
            marginBottom: "16px",
            maxWidth: "180px"
          }}
        >
          <span className={styles.linkText}>Visit the maker</span>
        </Button>
      </div>
    </a>
  );
};

function locationAndCountryText(location, country) {
  if (location && country) {
    return `${location}, ${country}`;
  } else if (location) {
    return location;
  } else if (country) {
    return country;
  } else {
    return "";
  }
}

function locationAndCountry(location, country) {
  if (location || country) {
    return (
      <p
        className={styles.item}
        style={{
          textIndent: "-20px",
          paddingLeft: "20px"
        }}
      >
        <MapIcon style={{ marginBottom: "-2px", marginRight: "2px" }} size={14} />
        {locationAndCountryText(location, country)}
      </p>
    );
  } else {
    return null;
  }
}

export default Profile;
