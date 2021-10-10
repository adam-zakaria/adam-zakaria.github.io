This is my personal site! I create posts in markdown, which get read into pug templates, which get rendered and served! I use sass as well. Let me know if you're interested in a similar setup. I tried Jekyll out but it's not a good fit for me right now. I guess I wrote a simple static site generator?

Install the necessary files:
```
npm i
```

To run this site and have files automatically build and reload, run these commands in separate terminals:
```
npm run watch-sass 
nodemon -e pug,js,md server.js 
```
