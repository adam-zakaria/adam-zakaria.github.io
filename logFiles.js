import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'public/posts');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }
  console.log('Listing files in public/posts:');
  files.forEach(file => {
    /*
    For each file, create a new html file with the file name as the title
    in public/renderedPosts
    */ 
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${file}</title>
      </head>
      <body>
        <h1>${file}</h1>
      </body>
    </html>
    `;
    fs.writeFileSync(`public/renderedPosts/${file}.html`, html);
    console.log(file);
  });
}); 