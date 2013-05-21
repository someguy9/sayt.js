WORK IN PROGRESS VERSION 0
====

sayt.js
=======

Create a Search as you Type field quickly with this jQuery plugin

Usage
======

$(document).ready(function() {
  $('.search-box').sayt({
    src: 'your/json/script',
    timeoutLength:150
  });
});

Hooks
=====

| Name          | Description   | Example  |
| ------------- |:-------------:| --------:|
| -      | - | - |


What is sayt.js?
================

After seeing Google's search as you type dropdown on ecommerce sites using their ecommerce plugins I found it hard to replicate thair autocomplete features using current plugins. Most were out dated or made it very hard to mix images in with results including twitter's typeahead. So here's my take on the plugin, here's sayt.js.