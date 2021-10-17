# Introduction
This is my personal site! I wrote a simple static site generator with an automated build process. I tried Jekyll out, but I just couldn't get jazzed about it. 

I create posts in markdown, which get read into pug templates, which get rendered and served! I use scss as well. Let me know if you have any questions or need help getting set up.

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

For some reason homepage.html is not getting generated, and the console of nodemon is complaining about missing files.

# To-do:
*Re-do the static directory so that I don't need to prefix everything with public.

*Extract the template building script from the server so I can watch HTML files without an infinite loop.