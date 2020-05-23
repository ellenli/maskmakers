import React from "react";
import styles from "./profile.module.scss";

const MAX_DESCRIPTION_LENGTH = 80;

function locationAndCountryText(location, country) {
  if (location && country) {
    return `${location}, ${country}`;
  } if (location) {
    return location;
  } if (country) {
    return country;
  } 
    return "";
  
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
        {locationAndCountryText(location, country)}
      </p>
    );
  }

  return null;
}

function truncateString(string) {
  if (!string) {
    return '';
  }

  const truncated = string.substr(0, MAX_DESCRIPTION_LENGTH);

  return `${truncated}...`;
} 

function prefaceLinkWithHTTPS(url) {
  if (url.indexOf('://') === -1) {
    return `https://${  url}`
  }

  return url
}

const Profile = props => {
  const { image, name, location, country, websiteUrl, categories, description, usesGiftCard } = props;

  // CSS makes it easy to truncate a single line of text, but not multiple lines of text
  // const description = "Premium custom jewlery handcrafted with precision with some longer text that needs to be truncated because it is too long to show the whole thing";

  const descriptionToDisplay = description.length > MAX_DESCRIPTION_LENGTH ? truncateString(description) : description;


  const giftCardBadge = usesGiftCard ?
    <div className={styles.giftCardBadge}>Gift card only</div> : null
  return (
    <a
      className={styles.profile}
      href={prefaceLinkWithHTTPS(websiteUrl)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.profileFocusState }/>
      {giftCardBadge}
      <div style={{ backgroundImage: `url(${image})` }} className={styles.image} />
      <div className={styles.card}>
        <div>
          <h2 className={styles.name}>{name}</h2>
          {locationAndCountry(location, country)}
          <p className={styles.profileDescription}>{descriptionToDisplay}</p>
        </div>
        <div className={styles.filterTags}>
          {giftCardBadge}
          {
            categories.length ? categories.map(category => {
              return <div className={styles.filterTag}>{category}</div>
            }): null
          }
        </div>
      </div>
    </a>
  );
};

export default Profile;
