// Next.js (App Router) backend example for sayt.js.
//
// Drop this file at `app/api/sayt/route.js` in a Next.js project, then point the
// plugin at it:
//
//     sayt(document.querySelector('.search-box'), { src: '/api/sayt' });
//
// It returns the exact same JSON structure as sayt-json.php, so the front-end
// contract is identical. Swap the `countries` array for your own data source
// (a database query, search index, etc.).

const countries = [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
  "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia",
  "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda",
  "Bhutan", "Bolivia", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria",
  "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica",
  "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia",
  "Ethiopia", "Fiji", "Finland", "France", "Germany", "Ghana", "Greece",
  "Greenland", "Guatemala", "Honduras", "Hong Kong", "Hungary", "Iceland",
  "India", "Indonesia", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon",
  "Liechtenstein", "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Malta",
  "Mexico", "Monaco", "Mongolia", "Morocco", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Nigeria", "Norway", "Oman", "Pakistan", "Panama",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico",
  "Qatar", "Romania", "Russian Federation", "Saudi Arabia", "Senegal",
  "Singapore", "Slovenia", "South Africa", "Spain", "Sri Lanka", "Sweden",
  "Switzerland", "Taiwan, Province of China", "Thailand", "Tunisia", "Turkey",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// sayt renders titles/descriptions via innerHTML, so HTML-escape any
// user-supplied text echoed back into the response.
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  const needle = query.toLowerCase();
  const matches = query
    ? countries
        .filter((country) => country.toLowerCase().includes(needle))
        .slice(0, 3)
        .map((title) => ({ title }))
    : [];

  const safeQuery = escapeHtml(query);
  const urlQuery = encodeURIComponent(query);

  const data = [
    {
      section: { title: "Countries (dynamic)", num: String(matches.length), limit: "3" },
      data: matches,
    },
    {
      section: { title: "Search Engines (semi dynamic)", num: "3", limit: "3" },
      data: [
        {
          title: `Google Search for ${safeQuery}`,
          url: `https://www.google.com/search?q=${urlQuery}`,
          description: "Open a google search for this term",
        },
        {
          title: `Bing Search for ${safeQuery}`,
          url: `https://www.bing.com/search?q=${urlQuery}`,
        },
        {
          title: `Yahoo Search for ${safeQuery} (onclick example)`,
          onclick: 'alert("Example onclick event.")',
        },
      ],
    },
  ];

  return Response.json(data, {
    headers: {
      // Allow cross-origin use (e.g. a demo page on another host). Tighten or
      // drop this if the plugin is served from the same origin as this API.
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
