const express = require('express')
const app = express()
const port = 3000
const directory = './files/';
const fs = require('fs');
var path = require('path');
const pug = require('pug');
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico')); 

var showdown  = require('showdown'),
    converter = new showdown.Converter();

let html;
var postLinks = "";
var postData = [];
let markdownDir = '/Users/azakaria/Code/personal_projects/personal_site/markdown';
let pageDir = '/Users/azakaria/Code/personal_projects/personal_site/pages';
fs.readdir('/Users/azakaria/Code/personal_projects/personal_site/markdown', (err, files) => {
    files.forEach(file => {
        let fileBaseName =file.split('.')[0];
        let fileBaseNameNoUnderscores = fileBaseName.replace(/_/g, ' ');
        postLinks += `<a href="/public/pages/${fileBaseName}">${fileBaseNameNoUnderscores}</a><br>`; 
        fs.readFile(path.join('/Users/azakaria/Code/personal_projects/personal_site/markdown', file), 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            html = converter.makeHtml(data);
            const compiledFunction = pug.compileFile('templates/template.pug');
            console.log(`postData: ${html}`);
            let template = compiledFunction({ blog_post_text: html, blog_post_title: fileBaseNameNoUnderscores});
            fs.writeFile(`/Users/azakaria/Code/personal_projects/personal_site/pages/${fileBaseName}.html`, template, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            })
        })
    });
    const compiledFunctionHome = pug.compileFile('templates/homepage.pug');
    let templateHome = compiledFunctionHome({ links: postLinks});
    fs.writeFile(`/Users/azakaria/Code/personal_projects/personal_site/pages/homepage.html`, templateHome, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
});

app.get('/', (req, res) => {
  res.sendFile('/Users/azakaria/Code/personal_projects/personal_site/pages/homepage.html');
})

app.get('/public/pages/:post', (req, res) => {
    console.log(`post: ${path.join(markdownDir, req.params.post)}`)
    console.log(`file: ${path.join(markdownDir, req.params.post, '.html')}`);
    res.sendFile(path.join(pageDir, req.params.post) + '.html');
})

app.use("/public", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})