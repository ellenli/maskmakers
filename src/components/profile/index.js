import React from "react";
import Img from "gatsby-image";
import MapIcon from "../../icons/map";
import BriefcaseIcon from "../../icons/briefcase";
import styles from "./profile.module.scss";
import Button from "../button";

const Profile = props => {
  return (
    <div
      className={styles.profile}
      style={{
        "--profile-theme-color": "#6362fc"
      }}
    >
      {props.sizes ? (
        <Img
          alt={`${props.name}'s avatar on Twitter.'`}
          sizes={props.sizes}
          backgroundColor
          className={styles.image}
        />
      ) : (
        <img
          className={styles.grayImage}
          alt={`${props.name}'s avatar on Twitter.'`}
          src={props.image.replace("_normal", "_400x400")}
        />
      )}
      <div className={styles.card}>
        <h2 className={styles.name}>{props.name}</h2>
        <p className={styles.location}>
          <MapIcon style={{ marginBottom: "-2px", marginRight: "2px" }} size={14} />
          {props.location}
        </p>
        <p className={styles.location}>
          <BriefcaseIcon style={{ marginBottom: "-2px", marginRight: "2px" }} size={14} />
          Solo maker
        </p>
        <p className={styles.location}>
          <BriefcaseIcon style={{ marginBottom: "-2px", marginRight: "2px" }} size={14} />
          Non-medical masks
        </p>

        <Button
          href={props.websiteUrl}
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
