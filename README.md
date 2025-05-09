# Introduction
This is my portfolio and blog, where I introduce myself and showcase projects. In retrospect I'd make this site even simpler because I avoid frontend work and it's a tremendous burden to load into memory all the complexity when not actively doing frontend, but I'm claiming frontend skills so I wanted to showcase my skill a bit.

Unfortunately, even as is, the rendering is not entirely smooth - i.e. the page loads before the styling does so there is a blip.

# Blog Feature
I have a branch to add a blog feature, but it's pretty annoying to write and linking to an external blogging platform is preferable currently. But for the feature, to write blog posts I navigate to the Decap CMS where I manage posts and use a WYISWYG word processor to write posts.

Posts are stored by decap CMS in 'post', i.e. posts/check-me-out.md
blog_listener.js listens for changes and on change generateHtmlForPost(), which
1) takes posts/*.md and outputs them to renderedPosts/*.html
2) Adds links to index.html

The way this works as a static site is that we leverage gitlab ci/cd and it builds the pages for us. i.e. on push, build the pages.

markdown -> html -> templated html

Decap CMS writes to posts, blog_listener.js monitors posts and makes them renderedPosts/*.html, wrap.js is currently manually called and wraps renderedPosts to produce templatedPosts (wrapping in wrapper.html)

We are making local modifications on dev and merging to main then pushing for changes to production.

# Install packages
`npm i`

# Run

## Frontend
`npm run dev`

## Decap CMS
`npx decap-server`

## Blog Listener
`nodemon blog_listener.js`  

## Wrap blog posts
`node wrap.js`

# Run in backkground
Use pm2 to run in the background.
i.e.
`pm2 start 'nodemon blog_listener.js' --name portfolio_blog_listener`

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

