# Introduction
This is my personal site! I wrote a simple static site generator with an automated build process. I tried Jekyll out, but I just couldn't get jazzed about it. 

I create posts in markdown, which get read into pug templates, which get rendered and served! I use sass as well. Let me know if you have any questions or need help getting set up.

# Setup
Install the necessary files:
```
npm i
```

To run this site and have files automatically build and reload, run these commands in separate terminals:
```
npm run watch-sass 
nodemon -e pug,js,md server.js 
```
