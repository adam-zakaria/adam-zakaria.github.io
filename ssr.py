from bs4 import BeautifulSoup

"""
This is currently broken.

bs4 is annoying because it's not clear what all of the types are:
I would rather strictly use css selectors and deal with strings and lists
"""

# File paths
wrapper_path = "wrapper.html"  # Path to wrapper template
blog_post_path = "renderedPosts/ssrTesting.html"  # Path to blog post content
output_path = "index.html"  # Output file

# Step 1: Read the wrapper template
with open(wrapper_path, "r") as wrapper_file:
  wrapper_html = wrapper_file.read()
wrapper_soup = BeautifulSoup(wrapper_html, "html.parser")  # Parse into DOM object

# Step 2: Read the blog post content
with open(blog_post_path, "r") as blog_file:
  blog_html = blog_file.read()
blog_post_soup = BeautifulSoup(blog_html, "html.parser")  # Parse into DOM object

# Step 3: Replace the inner content of the content div with the blog post
main_div = wrapper_soup.select_one('.main')  # Locate placeholder div
if main_div:
  main_div.clear()  # Clear existing content
  children = blog_post_soup.select_one('body > *')
  for child in children:
    breakpoint()
    main_div.append(child)
  #main_div.append(blog_post_soup.select_one('body'))

# Step 4: Write the final rendered HTML to a file
with open(output_path, "w") as output_file:
  output_file.write(str(wrapper_soup))  # Serialize and save the DOM as HTML

# Debug message
print(f"SSR complete. Rendered HTML saved to {output_path}.")
