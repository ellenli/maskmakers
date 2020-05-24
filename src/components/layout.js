import React from "react";
import { Helmet } from "react-helmet";
import "../styles/index.scss";

const Layout = ({ children }) => (
  <>
    <Helmet
      title="Asian Heritage Month Marketplace"
      meta={[
        {
          property: "description",
          content:
            "A directory of Asian Shopify merchants."
        },
        { property: "og:title", content: "Asian Heritage Month Marketplace" },
        {
          property: "og:description",
          content:
            "A directory of Asian Shopify merchants."
        },

        {
          property: "og:image",
          content: "https://maskmakers.club/opengraph.png"
        },
        {
          property: "og:url",
          content: "https://maskmakers.club"
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Asian Heritage Month Marketplace" },
      ]}
    />
    {children}
  </>
);

export default Layout;
