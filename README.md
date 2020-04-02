### Prerequisites

This project requires API keys from [Seeker](https://seeker.company) to populate the job posts.

#### Seeker

Seeker is optional. To run this project without Seeker:

1. Clone the repo and open it in your code editor
2. Remove the `gatsby-source-seeker` plugin by deleting lines 12-17 from the `gatsby-config.js` file
3. Delete the entire `gatsby-node.js` file
4. Delete the entire `src/pages/jobs.js` file
5. At some point, remove the link to the jobs page from the `src/components/nav` file

### Install dependencies

If you're new to development, start by installing [Homebrew](https://brew.sh/), a macOS package manager. Paste the following command in your terminal.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

When Homebrew installed, use it to install [Yarn](https://yarnpkg.com/en/), a JS dependency manager.

```
brew install yarn
```

After Yarn is installed, use it to install the dependencies.

```
yarn
```

### Run the project locally

Making sure you're in the correct project folder, start the local development server.

```
yarn start
```

In your browser, open `localhost:8000`.
