import React from "react";
import MapIcon from "../../icons/map";
import styles from "./profile.module.scss";
import Button from "../button";

const Profile = props => {
  const { image, name, location, country, websiteUrl } = props;

  const locationDetails = location ? (
    <>
      <MapIcon style={{ marginBottom: "-2px", marginRight: "2px" }} size={14} />
      {location}
    </>
  ) : null;

  const countryDetails = country ? (
    <>
      <MapIcon
        style={{
          marginBottom: "-2px",
          marginRight: "2px",
          paddingBottom: location ? "0" : "27px"
        }}
        size={14}
      />
      {country}
    </>
  ) : null;

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
        <p className={styles.item}>{locationDetails}</p>
        <p className={styles.item}>{countryDetails}</p>
      </div>

      <Button
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
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
    </a>
  );
};

export default Profile;
