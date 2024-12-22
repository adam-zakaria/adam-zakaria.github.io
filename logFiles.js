const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'public/posts');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }
  console.log('Listing files in public/posts:');
  files.forEach(file => {
    console.log(file);
  });
}); 