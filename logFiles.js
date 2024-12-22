import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'public/posts');

fs.readdir(directoryPath, (err, fileNames) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }
  // make renderedPosts folder if it doesn't exist
  if (!fs.existsSync('public/renderedPosts')) {
    fs.mkdirSync('public/renderedPosts');
  }
  console.log('Listing files in public/posts:');
  fileNames.forEach(fileName => {
    /*
    For each file, create a new html file with the file name as the title
    in public/renderedPosts
    */ 
    // get filename without extension
    const baseName = fileName.split('.')[0];
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${baseName}</title>
      </head>
      <body>
        <h1>${baseName}</h1>
      </body>
    </html>
    `;
    fs.writeFileSync(`public/renderedPosts/${fileName}.html`, html);
    console.log(fileName);
  });
}); 