# Introduction
We are making local modifications on dev and merging to main then pushing for changes to production.

# Install packages
`npm i`

# Run
Use pm2 to run in the background.

## Frontend
`npm run dev`

## Decap CMS
`npx decap-server`

## Docs
We used this specific backend:
https://decapcms.org/docs/working-with-a-local-git-repository/

# Install Tailwind
https://tailwindcss.com/docs/installation/using-postcss
* Update postcss.config.js to postcss.config.cjs
* For tailwind.config.js, we want to also build .html and .js in /, so we added the second element to content.

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

# Implement Blog
## CMS push to main
* We will listen for writes to the local folder, and push to main when we detect a write. This translates well if we transition to a server.
* `node blog_listener.js`

## implement generate html files in listening file
* Read index.html into DOM, and for each post create a new link, and append to content.
* For each post, create a new html file in public/renderedPosts that a link points to.

## Push to main
* Modify gh_hook.yml