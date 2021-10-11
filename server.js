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
const PROJECT_DIR = "/Users/azakaria/Code/personal_projects/personal_site"
var postData = [];
let markdownDir = `${PROJECT_DIR}/markdown`;
let pageDir = `${PROJECT_DIR}/pages`;
fs.readdir(`${PROJECT_DIR}/markdown`, (err, files) => {
    files.forEach(file => {
        let fileBaseName =file.split('.')[0];
        let fileBaseNameNoUnderscores = fileBaseName.replace(/_/g, ' ');
        postLinks += `<a href="/public/pages/${fileBaseName}">${fileBaseNameNoUnderscores}</a><br>`; 
        fs.readFile(path.join(`${PROJECT_DIR}/markdown`, file), 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            html = converter.makeHtml(data);
            const compiledFunction = pug.compileFile(`${PROJECT_DIR}/templates/template.pug`);
            console.log(`postData: ${html}`);
            let template = compiledFunction({ blog_post_text: html, blog_post_title: fileBaseNameNoUnderscores});
            fs.writeFile(`${PROJECT_DIR}/pages/${fileBaseName}.html`, template, err => {
                if (err) {
                    console.error(err)
                    return
                }
                //file written successfully
            })
        })
    });
    const compiledFunctionHome = pug.compileFile(`${PROJECT_DIR}/templates/homepage.pug`);
    let templateHome = compiledFunctionHome({ links: postLinks});
    fs.writeFile(`${PROJECT_DIR}/pages/homepage.html`, templateHome, err => {
        if (err) {
            console.error(err)
            return
        }
        //file written successfully
    });
});

app.get('/', (req, res) => {
  res.sendFile(`${PROJECT_DIR}/pages/homepage.html`);
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