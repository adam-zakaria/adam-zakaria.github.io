import fs from 'fs/promises'; // Use fs with promises
import { JSDOM } from 'jsdom';

const wrapperPath = 'wrapper.html'; // Path to wrapper template
const blogPostPath = 'renderedPosts/ssrTesting.html'; // Path to blog post content
const outputPath = 'index.html'; // Output file path

const renderHTML = async () => {
  try {
    // Step 1: Read the wrapper template
    console.log('wrapperHtml')
    const wrapperHtml = await fs.readFile(wrapperPath, 'utf8');

    // Step 2: Parse the wrapper into a DOM object
    const wrapperDom = new JSDOM(wrapperHtml);
    const wrapperDocument = wrapperDom.window.document;

    // Step 3: Read the blog post content
    const blogHtml = await fs.readFile(blogPostPath, 'utf8');

    // Step 4: Parse the blog post into a DOM object
    const blogDom = new JSDOM(blogHtml);
    const blogBodyContent = blogDom.window.document.body.innerHTML; // Extract blog content

    // Step 5: Insert blog post content into the wrapper
    const contentDiv = wrapperDocument.querySelector('.content'); // Locate the placeholder div
    if (contentDiv) {
      contentDiv.innerHTML = blogBodyContent; // Replace content
    } else {
      console.error('Error: Could not find .main div in the wrapper.');
      return;
    }

    // Step 6: Serialize and write the final HTML to output
    const finalHtml = wrapperDom.serialize();
    await fs.writeFile(outputPath, finalHtml, 'utf8');
    console.log(`SSR complete. Rendered HTML saved to ${outputPath}.`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

renderHTML();
