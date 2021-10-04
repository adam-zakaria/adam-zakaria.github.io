const express = require('express')
const app = express()
const port = 3000
const directory = './files/';
const fs = require('fs');
var path = require('path');

var showdown  = require('showdown'),
    converter = new showdown.Converter();

app.get('/', (req, res) => {
  //res.send('Hello World!')
  res.sendFile('/Users/azakaria/Code/node_starter_app/index.html');
})

app.use("/public", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


let html;
fs.readdir('/Users/azakaria/Code/personal_projects/personal_site/markdown', (err, files) => {
    files.forEach(file => {
        console.log(file);
        fs.readFile(path.join('/Users/azakaria/Code/personal_projects/personal_site/markdown', file), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
            html = converter.makeHtml(data);
            console.log(html);
        })
    });
});

/*
For each markdown file in a directory, generate some html.
Populate the home page with links to all the markdown files.
*/