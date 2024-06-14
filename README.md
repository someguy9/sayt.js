[![Search as you Type Javascript Demo](https://static.drawne.com/wp-content/uploads/2014/04/saytjs.png)](https://drawne.com/demo/sayt.js "Javascript sayt.js example")

What is sayt.js?
================

After seeing Google's search as you type dropdown on ecommerce sites (example lowes.com) using their ecommerce plugins I found it hard to replicate their autocomplete features using current plugins. Most were out dated or made it very hard to mix images in with results including twitter's typeahead. So here's my take on the plugin using vanilla Javascript, here's sayt.js. Perfect for sites that have a built-in search with mixed data. Currently you have to use a json file you produce, so if you want to use external data you'll need to format it into the JSON structure listed below.

Read my blog post about this plugin [https://drawne.com/blog/search-as-you-type-jquery-plugin-sayt-js/](https://drawne.com/blog/search-as-you-type-jquery-plugin-sayt-js/)

To-do
=====

- Allow formatting of results to allow external data sources

[Demo](https://drawne.com/demo/sayt.js "Javascript sayt.js example")
=======

You can view an example of this script on my site -> [https://drawne.com/demo/sayt.js](https://drawne.com/demo/sayt.js "Javascript sayt.js example").

Download
========

[Grab the latest copy via Github](https://github.com/someguy9/sayt.js/archive/master.zip)

Usage
======

```javascript
document.addEventListener('DOMContentLoaded', function () {
  sayt( document.querySelector('.search-box'), {
    src: 'path-to-your/json/script'
  });
});
```
This is the most basic code you need, it'll automatically include sayt.css in your page which can be turned off with the includeCSS variable. Be sure to see all of the variables below for more options.

Hooks
=====

| Name          | Description   | Example  |
| ------------- | ------------- | -------- |
| src      | URL of your json script, make sure to view the example sayt-json.php for formatting your json | "mysite.com/json-search.php" |
| inputId      | The ID of the search results div that appears, % will be overwritten with the ID of the input | "%-search" |
| classPrefix      | Overwrites the default classes of elements in the search results div, great for removing the default css | "mysearchresults-" |
| noResultsText      | Text that shows up when there are no results | "404 No Results Found" |
| inputWidth      | The width you want your search results div to be, default of this just grabs the width of your input | 400 |
| minChars      | Amount of characters in your input before a search is triggered | 3 |
| showSectionHeadings      | Displays the title of sections, great if you have multiple categories | true |
| showDescription      | If your json includes description tags, you can choose to show them or not  | true |
| showImages      | If you don't want to show images in your results it can be turned off here  | false |
| includeCSS      | If you don't want to automatically include the default stylesheet set this to false  | true |
| seeAllLink      | Add a see all link to the bottom of the search, this link basically just submits your form | true |


JSON Structure
==============

```json
    {
        "section": {
            "title": "Section Name",
            "num": "2",
            "limit": "3"
        },
        "data": [
            {
                "title": "Go to Google",
                "url": "https://www.google.com/",
                "onclick": "alert('Javascript!')"
            },
            {
                "title": "Title of the Results",
                "description": "Text displayed under the title",
                "image": "url of image to be shown",
                "url": "url of the page you want this to link to"
            }
        ]
    }

```

num under section is used for the number of results, and the limit is how many you would like to show.

The basics are a repeating set of sections and data as seen above, I do not actually include a php script for searching your data but feel free to use any language for your resulting json.
