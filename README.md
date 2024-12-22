# Install packages
`npm i`

# Run
`npm run dev`

# Decap CMS

npx decap-server

## Docs
We used this specific backend:
https://decapcms.org/docs/working-with-a-local-git-repository/

## Files


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

