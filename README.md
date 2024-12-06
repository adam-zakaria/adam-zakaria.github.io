# Server Side rendering
For SEO

# Wondering
If I should've just used shadcn/ui because it's very light weight and this is even more tedious than I expected.

Grid really seems like a better option for layout...but there are differences. It seems like grid is really for two dimensional layout. So like page level layout.

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

