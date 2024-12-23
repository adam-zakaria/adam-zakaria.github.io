
# Implement Blog
## CMS push to main
* Not using github auth because it involves oauth with Netlify (too complex)
* We will listen for writes to the local folder, and push to main when we detect a write. This translates well if we transition to a server.
* And 

## On push, run github action (node gh_hook.js) to generate html files
* .github/workflows/gh_hook.yml

## implement node gh_hook.js to generate html files
* Read index.html into DOM, and for each post create a new link, and append to content.
* For each post, create a new html file in public/renderedPosts that a link points to.

## Push to main
* Modify gh_hook.yml

# Deploy
Merge dev to main
`npm run prod`

# Development
main branch imports style.css. dev branch uses main.js to import style.scss. use dev branch for development.
`npm run dev`

# Install packages
`npm i`

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

