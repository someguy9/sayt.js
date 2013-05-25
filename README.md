What is sayt.js?
================

After seeing Google's search as you type dropdown on ecommerce sites using their ecommerce plugins I found it hard to replicate their autocomplete features using current plugins. Most were out dated or made it very hard to mix images in with results including twitter's typeahead. So here's my take on the plugin, here's sayt.js.

Usage
======

$(document).ready(function() {
  $('.search-box').sayt({
    src: 'path-to-your/json/script'
  });
});

Hooks
=====

| Name          | Description   | Example  |
| ------------- | ------------- | -------- |
| src      | URL of your json script, make sure to view the example sayt-json.php for formatting your json | mysite.com/json-search.php |