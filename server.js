const express = require('express')
const app = express()
const port = 3000
const directory = './files/';
const fs = require('fs');
var path = require('path');
const pug = require('pug');

var showdown  = require('showdown'),
    converter = new showdown.Converter();

let html;
fs.readdir('/Users/azakaria/Code/personal_projects/personal_site/markdown', (err, files) => {
    files.forEach(file => {
        fs.readFile(path.join('/Users/azakaria/Code/personal_projects/personal_site/markdown', file), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
            html = converter.makeHtml(data);

            //https://pugjs.org/language/interpolation.html
            let blogLink = `<a href="/post">${file}</a>`; //href = endpoint that triggers the reading of the markdown file? the sending of.

            // Compile the source code
            const compiledFunction = pug.compileFile('pug/template.pug');
            const compiledFunctionHome = pug.compileFile('pug/homepage.pug');
            let template = compiledFunction({ blog_post_text: data });
            let templateHome = compiledFunctionHome({ links: blogLink });

            fs.writeFile(`/Users/azakaria/Code/personal_projects/personal_site/templates/${file}.html`, template, err => {
                if (err) {
                    console.error(err)
                    return
                }
            //file written successfully
            })

//@media (max-width: 830px){

            fs.writeFile(`/Users/azakaria/Code/personal_projects/personal_site/templates/homepage.html`, templateHome, err => {
                if (err) {
                    console.error(err)
                    return
                }
            //file written successfully
            })


            // Render a set of data
            console.log();
            // "<p>Timothy's Pug source code!</p>"
            //console.log(html);


        })
    });
});

app.get('/', (req, res) => {
  res.sendFile('/Users/azakaria/Code/personal_projects/personal_site/templates/homepage.html');
})

app.get('/post', (req, res) => {

    res.sendFile('')
    //I really want to load a template I think......
    //...An html page with the blog post embedded in it..
})

app.use("/public", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})