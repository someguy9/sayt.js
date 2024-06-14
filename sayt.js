/*
 * Vanilla JS Search as you Type plugin
 *
 * Website: http://drawne.com
 */

(function() {
    function sayt(element, options) {
        var getInputWidth = element.offsetWidth - 2;
        var resizeTimer;
        
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                getInputWidth = element.offsetWidth - 2;
            }, 200);
        });

        var defaults = {
            inputId: '%-sayt',
            classPrefix: 'sayt-',
            noResultsText: 'No results.',
            inputWidth: getInputWidth,
            minChars: 2,
            showSectionHeadings: false,
            showDescription: true,
            showImages: true,
            includeCSS: false,
            seeAllLink: false
        };

        options = Object.assign(defaults, options);

        if (options.includeCSS) {
            const script = document.querySelector('script[src*="sayt.js"]');
            if (script) {
                const scriptUrl = script.src.substring(0, script.src.lastIndexOf('/') + 1);
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = `${scriptUrl}sayt.css`;
                link.type = 'text/css';
                document.head.appendChild(link);
            }
        }

        options.inputId = options.inputId.replace('%', element.id);

        var prevQuery = '';

        element.setAttribute('autocomplete', 'off');

        var boxObj = document.createElement('ul');
        boxObj.className = options.classPrefix + 'box';
        boxObj.id = options.inputId;
        boxObj.style.display = 'none';
        element.parentNode.insertBefore(boxObj, element.nextSibling);

        var input = element;

        var currentRequest = null;

        input.addEventListener('keyup', function(event) {
            if (![13, 9, 37, 38, 39, 40].includes(event.which)) {
                var query = input.value;
                if (query === "" || query.length < options.minChars) {
                    boxObj.style.display = 'none';
                } else {
                    prevQuery = query;
                    input.classList.add(options.classPrefix + 'thinking');

                    currentRequest = new AbortController();
                    const signal = currentRequest.signal;

                    fetch(options.src + "?query=" + query, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        signal: signal
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {

                        var output = "";

                        var resultsExist = data.some(section => section['data'].length > 0);

                        if (!resultsExist) {
                            boxObj.style.display = 'none';
                        } else {
                            data.forEach(section => {
                                var num = section['section']['num'];
                                if (num !== 0) {
                                    var limit = section['section']['limit'];
                                    var i = 0;

                                    if (options.showSectionHeadings && section['section']['title']) {
                                        output += '<li class="' + options.classPrefix + 'heading">';
                                        output += section['section']['title'];
                                        output += '</li>';
                                    }

                                    section['data'].forEach((item, ii) => {
                                        if (i < limit) {
                                            var haslink = item['url'] || item['onclick'] ? true : false;

                                            var link = haslink ? "<a " : '<div class="no-link">';
                                            if (haslink) {
                                                if (item['url']) {
                                                    link += "href='" + item['url'] + "' ";
                                                }
                                                if (item['onclick']) {
                                                    link += "onclick='" + item['onclick'] + "' ";
                                                }
                                                link += ">";
                                            }

                                            var linkclose = haslink ? "</a>" : "</div>";

                                            output += '<li class="' + options.classPrefix + 'result">' + link;
                                            output += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
                                            if (item['image'] && options.showImages) {
                                                output += '<td width="68"><img src="' + item['image'] + '" class="preview" /></td>';
                                            }
                                            output += '<td>';
                                            output += '<p class="data">';
                                            if (item['title']) {
                                                output += '<span class="title">' + item['title'] + '</span><br />';
                                            }
                                            if (item['description']) {
                                                output += '<span class="description">' + item['description'] + '</span>';
                                            }
                                            output += '</p>';
                                            output += '</td>';
                                            output += '</tr></table>';
                                            output += linkclose;
                                            output += '</li>';
                                        }
                                        i++;
                                    });
                                }
                            });

                            if (options.seeAllLink) {
                                output += '<li class="' + options.classPrefix + 'result"><a href="javascript:void(0);" onclick="this.closest(\'form\').submit();">';
                                output += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tr>';
                                output += '<td>';
                                output += '<p class="data">';
                                output += '<span class="title">See All Results...</span><br />';
                                output += '</p>';
                                output += '</td>';
                                output += '</tr></table>';
                                output += '</a></li>';
                            }

                            boxObj.innerHTML = output;
                            boxObj.style.width = options.inputWidth + 'px';
                            boxObj.style.position = 'absolute';
                            boxObj.style.top = (input.offsetTop + input.offsetHeight) + 'px';
                            boxObj.style.left = input.offsetLeft + 'px';

                            input.classList.remove(options.classPrefix + 'thinking');
                            boxObj.style.display = 'block';

                            var current_index = -1;
                            var $options = boxObj.querySelectorAll('.' + options.classPrefix + 'result');
                            var items_total = $options.length;

                            $options.forEach(function(option, index) {
                                option.addEventListener('mouseover', function() {
                                    $options.forEach(opt => opt.classList.remove('selected'));
                                    option.classList.add('hover', 'selected');
                                    current_index = index;
                                });

                                option.addEventListener('mouseout', function() {
                                    option.classList.remove('hover', 'selected');
                                    current_index = -1;
                                });
                            });

                            input.addEventListener('keyup', function(e) {
                                if (e.which == 40) {
                                    if (current_index + 1 < items_total) {
                                        current_index++;
                                        change_selection();
                                    }
                                    e.preventDefault();
                                } else if (e.which == 38) {
                                    if (current_index > 0) {
                                        current_index--;
                                        change_selection();
                                    }
                                    e.preventDefault();
                                } else if (e.which == 13) {
                                    if (!$options[current_index].classList.contains('hover') && current_index > -1) {
                                        window.location = $options[current_index].querySelector('a').href;
                                        e.preventDefault();
                                    }
                                }
                            });

                            function change_selection() {
                                $options.forEach(opt => opt.classList.remove('selected', 'hover'));
                                $options[current_index].classList.add('selected');
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
                }
            }
        });

        input.addEventListener('focus', function() {
            if (input.value === prevQuery && input.value !== '') {
                boxObj.style.display = 'block';
            }
        });

        input.addEventListener('blur', function() {
            boxObj.style.display = 'none';
        });
    }

    window.sayt = sayt;
})();
