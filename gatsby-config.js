require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          camelCase: false
        }
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
      trackingId: "UA-162749493-1",
      sampleRate: 5,
      siteSpeedSampleRate: 10,
      cookieDomain: "maskmakers.club",
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
        injectHTML: true,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: "gatsby-source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: "appWCcQ2UsrJFIHsp",
            tableName: "providers"
          }
        ]
      }
    }
  ],

  siteMetadata: {
    title: "Mask Makers Club"
  }
};
