# Deploy 
Merge dev to main
`npm run build-css`
`git push`

# Development
main branch imports style.css. dev branch uses main.js to import style.scss. use dev branch for development.

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

