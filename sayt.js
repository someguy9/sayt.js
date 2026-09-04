/*
 * sayt.js - dependency-free search-as-you-type
 *
 * https://github.com/someguy9/sayt.js
 */

(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.sayt = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    // Escape a value for a double-quoted HTML attribute (href, src, onclick).
    // Titles and descriptions are deliberately inserted as HTML so a data source
    // can highlight matches etc.; it must escape any user-supplied text itself.
    function attr(value) {
        return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    }

    function sayt(input, options) {
        options = Object.assign({
            src: null,
            inputId: '%-sayt',
            classPrefix: 'sayt-',
            noResultsText: 'No results.',
            inputWidth: null,
            minChars: 2,
            delay: 150,
            showSectionHeadings: false,
            showDescription: true,
            showImages: true,
            includeCSS: false,
            seeAllLink: false
        }, options);

        const cls = (name) => options.classPrefix + name;

        if (options.includeCSS) {
            const script = document.querySelector('script[src*="sayt.js"]');
            if (script) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = new URL('sayt.css', script.src).href;
                document.head.appendChild(link);
            }
        }

        const box = document.createElement('ul');
        box.className = cls('box');
        box.id = options.inputId.replace('%', input.id);
        box.style.display = 'none';
        box.style.position = 'absolute';
        box.setAttribute('role', 'listbox');
        box.setAttribute('aria-label', 'Search results');
        input.insertAdjacentElement('afterend', box);

        // ARIA combobox wiring so screen readers announce the popup and the
        // active option as the user types and arrows through results.
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('role', 'combobox');
        input.setAttribute('aria-autocomplete', 'list');
        input.setAttribute('aria-haspopup', 'listbox');
        input.setAttribute('aria-expanded', 'false');
        input.setAttribute('aria-controls', box.id);

        let prevQuery = '';   // query that produced the current box contents
        let timer = null;     // debounce timer
        let controller = null;
        let seq = 0;          // bumped per search; stale responses are dropped
        let items = [];       // rendered result <li>s
        let index = -1;       // keyboard-selected item

        function isOpen() {
            return box.style.display !== 'none';
        }

        function positionBox() {
            const width = options.inputWidth != null ? options.inputWidth : input.offsetWidth;
            box.style.width = width + 'px';
            box.style.top = (input.offsetTop + input.offsetHeight) + 'px';
            box.style.left = input.offsetLeft + 'px';
        }

        function show() {
            positionBox();
            box.style.display = 'block';
            input.setAttribute('aria-expanded', 'true');
        }

        function hide() {
            box.style.display = 'none';
            input.setAttribute('aria-expanded', 'false');
            select(-1);
        }

        function select(i) {
            index = i;
            items.forEach((item, n) => {
                item.classList.toggle('selected', n === i);
                item.setAttribute('aria-selected', n === i ? 'true' : 'false');
            });
            if (items[i]) {
                input.setAttribute('aria-activedescendant', items[i].id);
            } else {
                input.removeAttribute('aria-activedescendant');
            }
        }

        function renderItem(item) {
            const linked = item.url || item.onclick;
            let html = linked ? '<a' : '<div class="no-link"';
            if (item.url) {
                html += ' href="' + attr(item.url) + '"';
            }
            if (item.onclick) {
                html += ' onclick="' + attr(item.onclick) + '"';
            }
            html += '>';
            if (item.image && options.showImages) {
                html += '<img class="preview" src="' + attr(item.image) + '" alt="">';
            }
            html += '<div class="data">';
            if (item.title) {
                html += '<span class="title">' + item.title + '</span>';
            }
            if (item.description && options.showDescription) {
                html += '<span class="description">' + item.description + '</span>';
            }
            html += '</div>';
            html += linked ? '</a>' : '</div>';
            return '<li class="' + cls('result') + '" role="option">' + html + '</li>';
        }

        function render(data) {
            const sections = data.filter((s) => s.data && s.data.length > 0);
            let html = '';

            if (sections.length === 0) {
                html = '<li class="' + cls('noresults') + '" role="option" aria-disabled="true">' + options.noResultsText + '</li>';
            } else {
                sections.forEach((s) => {
                    const section = s.section || {};
                    if (options.showSectionHeadings && section.title) {
                        html += '<li class="' + cls('heading') + '" role="presentation">' + section.title + '</li>';
                    }
                    html += s.data.slice(0, section.limit || s.data.length).map(renderItem).join('');
                });
                if (options.seeAllLink) {
                    html += '<li class="' + cls('result') + '" role="option">' +
                        '<a href="#" data-sayt-see-all><div class="data"><span class="title">See All Results...</span></div></a></li>';
                }
            }

            box.innerHTML = html;
            items = Array.from(box.querySelectorAll('.' + cls('result')));
            items.forEach((item, n) => {
                item.id = box.id + '-opt-' + n;
                item.setAttribute('aria-selected', 'false');
            });
            index = -1;

            // Don't pop open under a user who has already tabbed away; refocusing
            // the input shows the results instead (see the focus handler).
            if (document.activeElement === input) {
                show();
            }
        }

        // options.src is either a URL (fetched as GET src?query=...) or a
        // function returning the sections array, or a Promise resolving to it.
        function fetchResults(query, signal) {
            if (typeof options.src === 'function') {
                return Promise.resolve().then(() => options.src(query));
            }
            const url = new URL(options.src, window.location.href);
            url.searchParams.set('query', query);
            return fetch(url, { signal }).then((response) => {
                if (!response.ok) {
                    throw new Error('sayt: ' + response.status + ' ' + response.statusText);
                }
                return response.json();
            });
        }

        function cancel() {
            clearTimeout(timer);
            seq++;
            if (controller) {
                controller.abort();
                controller = null;
            }
            input.classList.remove(cls('thinking'));
        }

        function search(query) {
            cancel();
            const mySeq = seq;
            controller = new AbortController();
            input.classList.add(cls('thinking'));

            fetchResults(query, controller.signal)
                .then((data) => {
                    if (mySeq !== seq) {
                        return; // superseded by a newer query
                    }
                    input.classList.remove(cls('thinking'));
                    prevQuery = query;
                    render(data);
                })
                .catch((error) => {
                    if (mySeq !== seq) {
                        return; // aborted or superseded
                    }
                    input.classList.remove(cls('thinking'));
                    console.error('sayt:', error);
                });
        }

        // `input` rather than keyup so paste, cut, IME and autofill all search.
        input.addEventListener('input', () => {
            const query = input.value;
            cancel();
            if (query.length < options.minChars) {
                hide();
            } else {
                timer = setTimeout(() => search(query), options.delay);
            }
        });

        // keydown rather than keyup so preventDefault() can stop the caret
        // jumping and the surrounding form submitting when Enter picks a result.
        input.addEventListener('keydown', (e) => {
            if (!isOpen()) {
                return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (index + 1 < items.length) {
                    select(index + 1);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (index > -1) {
                    select(index - 1);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                hide();
            } else if (e.key === 'Enter' && items[index]) {
                const link = items[index].querySelector('a');
                if (link) {
                    e.preventDefault();
                    link.click();
                }
            }
        });

        // Keep the input focused while clicking inside the box; otherwise blur
        // would hide it before the click lands on a result.
        box.addEventListener('mousedown', (e) => e.preventDefault());

        // Pointing at a row takes over from keyboard selection (the :hover CSS
        // highlights it), so Enter falls through to the form as usual.
        box.addEventListener('mouseover', () => select(-1));

        box.addEventListener('click', (e) => {
            if (e.target.closest('[data-sayt-see-all]')) {
                e.preventDefault();
                if (input.form) {
                    input.form.requestSubmit();
                }
            }
        });

        input.addEventListener('focus', () => {
            if (input.value !== '' && input.value === prevQuery) {
                show();
            }
        });

        input.addEventListener('blur', hide);

        window.addEventListener('resize', () => {
            if (isOpen()) {
                positionBox();
            }
        });
    }

    return sayt;
}));
