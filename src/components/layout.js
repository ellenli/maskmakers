import React from "react";
import { Helmet } from "react-helmet";
import "../styles/index.scss";

const Layout = ({ children }) => (
  <>
    <Helmet
      title="Mask Makers Club"
      meta={[
        {
          property: "description",
          content:
            "A global collective of mask makers. #MaskOn"
        },
        { property: "og:title", content: "Mask Makers Club" },
        {
          property: "og:description",
          content:
            "A global collective of mask makers. #MaskOn"
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
        { property: "og:site_name", content: "Mask Makers Club" },
        { property: "twitter:site", content: "@maskmakersclub" },
        { property: "twitter:creator", content: "@ellenxli" },
        { property: "twitter:card", content: "summary_large_image" },
        {
          property: "twitter:image",
          content: "https://maskmakers.club/opengraph.png"
        }
      ]}
    />
    {children}
  </>
);

export default Layout;
