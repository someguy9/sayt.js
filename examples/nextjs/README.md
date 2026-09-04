# sayt.js — Next.js backend example

A minimal [Next.js](https://nextjs.org) **App Router** route handler that serves
the JSON `sayt.js` expects. It mirrors [`sayt-json.php`](../../sayt-json.php), so
the front-end usage is unchanged — only the data source differs.

## Files

- [`app/api/sayt/route.js`](app/api/sayt/route.js) — the API route. Handles
  `GET /api/sayt?query=...` and returns the sections/data array.

## Use it in a Next.js project

1. Copy `app/api/sayt/route.js` into your project at the same path
   (`app/api/sayt/route.js`).
2. Point the plugin at the route:

   ```html
   <input class="search-box" />
   <script src="/sayt.js"></script>
   <script>
     sayt(document.querySelector('.search-box'), {
       src: '/api/sayt',
       showSectionHeadings: true,
       includeCSS: true
     });
   </script>
   ```

3. Replace the in-file `countries` array with your real data source — a database
   query, a search index (Postgres `ILIKE`, Elasticsearch, etc.), or any
   service that can filter by the `query` string.

## Notes

- **Same contract as the PHP example.** The response shape is identical, so
  everything documented in the main [README](../../README.md#json-structure)
  applies.
- **Escaping.** `sayt.js` renders titles and descriptions with `innerHTML`, so
  the route HTML-escapes any user-supplied text it echoes back (the query) and
  URL-encodes it inside links. Do the same for any user data you return.
- **CORS.** The route sends `Access-Control-Allow-Origin: *` so a demo page on a
  different host can call it. If your page and API share an origin, you can
  remove those headers.
- **Pages Router?** If your project uses the Pages Router instead, put the same
  logic in `pages/api/sayt.js` and respond with
  `res.status(200).json(data)`.
