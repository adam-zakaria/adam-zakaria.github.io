from bs4 import BeautifulSoup

# Sample HTML
html = """
<!DOCTYPE html>
<html class="w-screen h-screen" lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="/vite.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adam Zakaria site</title>
  <!--<link href="./style.css" rel="stylesheet">-->
  <script type="module" src="main.js"></script>
</head>

<body>
  <div class="main background overflow-auto">

  </div>
</body>
</html>
"""

soup = BeautifulSoup(html, "html.parser")

# Find the target element using a CSS selector
#main_div = soup.select_one("div.main.background.overflow-auto")  # Select by class names
main_div = soup.select_one(".main")  # Select by class names

# Create a new element
new_div = soup.new_tag("clap")
new_div.string = "This is a new div."

# Append the new element to the target
main_div.append(new_div)

print(soup.prettify())
