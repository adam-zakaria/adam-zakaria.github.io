# Introduction
This is my portfolio and blog, where I introduce myself and showcase projects.

To write blog posts I navigate to the Decap CMS where I manage posts and use a WYISWYG word processor to write posts.

It's surprising to see that I actually modify the html with the blog links (i.e. I look at index.html and I see the links), but I think this is for the server side rendering.

Posts are stored by decap CMS in 'post', i.e. posts/check-me-out.md
blog_listener.js listens for changes and on change generateHtmlForPost(), which
1) takes posts/*.md and outputs them to renderedPosts/*.html
2) Adds links to index.html

The way this works as a static site is that we leverage gitlab ci/cd and it builds the pages for us. i.e. on push, build the pages...hmmm, this doesn't quite cover the bases.



We are making local modifications on dev and merging to main then pushing for changes to production.

# Install packages
`npm i`

# Run
Use pm2 to run in the background.
i.e.
`pm2 start nodemon blog_listener.js --name portfolio_blog_listener`

## Frontend
`npm run dev`

## Decap CMS
`npx decap-server`

## Blog Listener
`nodemon blog_listener.js`  

# Decap reachable at: 
http://localhost:5173/admin/index.html

# Blog reachable at 
http://localhost:5173/

# Docs
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
## To do
* The view is messed up with the blogs: they don't have a separate panel. I can click on the post but they take me to a page away from the site.
* Update blog posts to use template.
* Update link creation to not create duplicate links (current problems are that we update on write, change, and deletion. And do not clear the links).

