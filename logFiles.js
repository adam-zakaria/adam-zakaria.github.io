import fs from 'fs';
import path from 'path';

const directoryPath = path.join(process.cwd(), 'public/posts');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error('Unable to scan directory: ' + err);
  }
  console.log('Listing files in public/posts:');
  files.forEach(file => {
    console.log(file);
  });
}); 