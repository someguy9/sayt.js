![sayt.js](sayt-logo.svg)

What is sayt.js?
================

After seeing Google's search as you type dropdown on ecommerce sites (example lowes.com) using their ecommerce plugins I found it hard to replicate their autocomplete features using current plugins. Most were out dated or made it very hard to mix images in with results including twitter's typeahead. So here's my take on the plugin using vanilla Javascript, here's sayt.js. Perfect for sites that have a built-in search with mixed data. Results come from a `src` you provide — either a URL that returns the JSON structure below, or a function that returns it directly (no backend needed).

No dependencies — just `sayt.js` and `sayt.css`.

Demo
====

**[Try the live demo →](https://someguy9.github.io/sayt.js/)**

That page is [index.html](index.html) straight from this repo — it filters a local country list via [demo-data.js](demo-data.js), so it needs no backend and any static host (GitHub Pages here) can serve it as-is. Run the same thing locally:

```bash
npm run demo   # or: python3 -m http.server 8765
```

then open <http://localhost:8765>.

Install
=======

Drop the files into your page:

```html
<link rel="stylesheet" href="sayt.css">
<script src="sayt.js"></script>
```

Or skip the `<link>` and pass `includeCSS: true` — sayt.js then injects `sayt.css` from the same directory it was loaded from.

`sayt.js` is bundled as UMD, so if you vendor it into a project you can also `import sayt from './sayt.js'` (or `require`) and import `sayt.css` separately. [Grab the latest copy via Github](https://github.com/someguy9/sayt.js/archive/master.zip).

Usage
======

```javascript
sayt(document.querySelector('.search-box'), {
  src: 'path-to-your/json/script'
});
```

That's the minimum. A URL `src` is fetched as `GET <src>?query=<text>` and must return the [JSON structure](#json-structure) below. See [Options](#options) for everything you can tweak.

Keyboard
========

- **Type** — results appear once `minChars` characters are entered, `delay` ms after the last keystroke. Paste works too.
- **↓ / ↑** — move through the results
- **Enter** — open the selected result; with nothing selected the surrounding form submits as usual
- **Esc** — close the results
- **Tab / click elsewhere** — close the results

Backend examples
================

`src` just needs to return the [JSON structure](#json-structure) below, so you can use any backend:

- **PHP** — [sayt-json.php](sayt-json.php)
- **Next.js (App Router)** — [examples/nextjs](examples/nextjs)
- **No backend** — pass a function as `src` and filter your data in the browser. The included [index.html](index.html) + [demo-data.js](demo-data.js) do this, which is how the demo runs on static hosting like GitHub Pages:

```javascript
sayt(document.querySelector('.search-box'), {
  src: function (query) {
    // return the same array of sections a backend would
    return [{ section: { title: 'Items', limit: '5' }, data: [/* ... */] }];
  }
});
```

Accessibility
=============

The input is marked up as an ARIA `combobox` and the dropdown as a `listbox`. As results render, each one is exposed as an `option`, and moving through them with the arrow keys keeps `aria-expanded`, `aria-activedescendant`, and `aria-selected` in sync so screen readers announce the open popup and the active result.

Options
=======

| Name | Default | Description |
| ---- | ------- | ----------- |
| src | — | Where results come from. Either a URL string that returns the JSON below (see the example sayt-json.php), or a function `(query) => sections` that returns the array directly — or a Promise resolving to it — for a client-side data source with no backend |
| inputId | `"%-sayt"` | The ID of the results list; `%` is replaced with the ID of the input |
| classPrefix | `"sayt-"` | Prefix for the classes on generated elements, handy for dropping the default CSS and styling from scratch |
| noResultsText | `"No results."` | Text shown when there are no results |
| inputWidth | width of the input | Width (px) of the results list |
| minChars | `2` | Characters required before a search is triggered |
| delay | `150` | Milliseconds to wait after the last keystroke before searching |
| showSectionHeadings | `false` | Show each section's title, great if you have multiple categories |
| showDescription | `true` | Show `description` fields |
| showImages | `true` | Show `image` fields |
| includeCSS | `false` | Inject `sayt.css` from the directory `sayt.js` was loaded from instead of linking it yourself |
| seeAllLink | `false` | Add a "See All Results..." row that submits the surrounding form |


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

`limit` caps how many results from that section are shown; `num` is informational and ignored by the plugin. `title` and `description` are inserted as HTML (so you can, say, wrap matches in `<mark>`), which means your data source must HTML-escape any user-supplied text it echoes back — the bundled examples all do this. `url`, `image` and `onclick` are attribute-escaped for you.

The basics are a repeating set of sections and data as seen above — use any language for your backend (see [Backend examples](#backend-examples) for PHP and Next.js), or skip the backend entirely with a function `src`.
