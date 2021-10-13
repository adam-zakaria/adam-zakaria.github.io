const express = require('express')
const app = express()
const port = 3000
const directory = './files/';
const fs = require('fs');
var path = require('path');
const pug = require('pug');
var favicon = require('serve-favicon');
var showdown  = require('showdown');

/*
middleware
*/
app.use(favicon(__dirname + '/public/images/favicon.ico')); 
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static('./'));


/*
Convert markdown files to HTML, pass them to pug templates, and render those
*/

var converter = new showdown.Converter();
let html;
var postLinks = "";
const projectDir = "/Users/azakaria/Code/personal_projects/personal_site"
let markdownDir = `${projectDir}/markdown`;
let templateDir = `${projectDir}/templates`;
let pageDir = `${projectDir}/public/pages`;
var postData = [];
fs.readdir(`${projectDir}/markdown`, (err, files) => {
    files.forEach(file => {
        let fileBaseName =file.split('.')[0];
        let fileBaseNameNoUnderscores = fileBaseName.replace(/_/g, ' ');
        postLinks += `<a href="/public/pages/${fileBaseName}.html">${fileBaseNameNoUnderscores}</a><br>`; 
        fs.readFile(path.join(`${projectDir}/markdown`, file), 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            html = converter.makeHtml(data);
            const compiledFunction = pug.compileFile(`${projectDir}/templates/template.pug`);
            let template = compiledFunction({ blog_post_text: html, blog_post_title: fileBaseNameNoUnderscores});
            fs.writeFile(`${pageDir}/${fileBaseName}.html`, template, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            })
        })
    });
    const compiledFunctionHome = pug.compileFile(`${templateDir}/homepage.pug`);
    let templateHome = compiledFunctionHome({ links: postLinks});
    fs.writeFile(`${pageDir}/homepage.html`, templateHome, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
});

fs.copyFile('public/pages/homepage.html', 'index.html', (err) => {
  if (err) throw err;
});


/*
Routes!
*/


app.get('/', (req, res) => {
  res.sendFile(`${pageDir}/homepage.html`);
})

app.get('/tower5', (req, res) => {
  res.sendFile(`${projectDir}/game.html`);
})

app.get('/public/pages/:post', (req, res) => {
    console.log(`post: ${path.join(markdownDir, req.params.post)}`)
    console.log(`file: ${path.join(markdownDir, req.params.post, '.html')}`);
    res.sendFile(path.join(pageDir, req.params.post));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})