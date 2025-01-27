/* 
* Listen for writes to public/posts 
* Read index.html into DOM, and for each post create a new link, and append to content.
* For each post, create a new html file in public/renderedPosts that a link points to.
* Commit and push when we detect a write.
*/

import { fileURLToPath } from 'url';
import { join } from 'path';
import chokidar from 'chokidar';
import fs from 'fs';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import pkg from 'js-yaml'; const { load } = pkg; // cjs to esm hack

// Initialize paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename).split('/').slice(0, -1).join('/');
const postsDir = join(__dirname, 'posts');
const renderedPostsDir = join(__dirname, 'renderedPosts');

// generate blog post link and blog post page
function generateHtmlForPost(file) {
    /* ********** Init vars ********** */
    const mdFilePath = join(postsDir, file);
    const mdTextContent = fs.readFileSync(mdFilePath, 'utf8');

    /* ********** Get title from MD for links and post pages ********** */
    const frontMatterMatch = mdTextContent.match(/^---\n([\s\S]+?)\n---/);
    let title = 'Untitled';
    if (frontMatterMatch) {
        try {
            const frontMatter = load(frontMatterMatch[1]);
            title = frontMatter.title || title;
        } catch (e) {
            console.error(`Error parsing YAML front matter in file ${file}:`, e);
        }
    }

    /* ********** Create blog post pages ********** */
    // Render markdown
    const renderedContent = marked(mdTextContent);
    const htmlFilePath = join(renderedPostsDir, file.replace(/\.md$/, '.html'));
    const htmlFileContent = `
    <!DOCTYPE html>
    <html>
        <body>
            ${renderedContent}
        </body>
    </html>
    `;

    fs.writeFileSync(htmlFilePath, htmlFileContent);
    // Make renderedPostsDir if it doesn't exist
    if (!fs.existsSync(renderedPostsDir)) {
        fs.mkdirSync(renderedPostsDir, { recursive: true });
    }

    /* ********** Create blog links (Write blog links to index.html) ********** */
    // Read index.html into DOM using jsdom
    const indexHtml = fs.readFileSync(join(__dirname, 'index.html'), 'utf8');
    const dom = new JSDOM(indexHtml);
    const document = dom.window.document;
    // convert markdown file name to html file name
    const htmlFileName = file.replace(/\.md$/, '.html');
    // Create link as a string
    let link = `<a href="/renderedPosts/${htmlFileName}">${title}</a>`;
    // Append link to the blog-links div using innerHTML
    document.querySelector('.blog-links').innerHTML += link;
    // write the updated index.html to disk
    fs.writeFileSync(join(__dirname, 'index.html'), dom.serialize());
    console.log(link);


}

// Watch for file creation and modification
const watcher = chokidar.watch(postsDir, { persistent: true });

watcher
  .on('add', path => {
      console.log(`File ${path} has been added`);
      generateHtmlForPost(path.split('/').pop());
  })
  .on('change', path => {
      console.log(`File ${path} has been changed`);
      generateHtmlForPost(path.split('/').pop());
  })
  .on('unlink', path => {
      console.log(`File ${path} has been removed`);
      // Handle file removal if necessary
  });
