(function() {

    'use strict';

    var initial = true,
        ignoreIsVisible = false,
        mapper = {
            picture: _processPicture,
            video: _processVideo,
            div: _processDiv
        };

    function _init() {

        if (window.location.hash && window.location.hash.toLowerCase() === '#nolazy') {

            console.log('Lazy is off! Loading everything normal..');
            ignoreIsVisible = true;
        }

        _findElements();

        window.addEventListener('scroll', _findElements);
        window.addEventListener('resize', _findElements);
    }

    function _findElements() {

        var elements = document.querySelectorAll('[data-lazy="true"]'), i, validElements = [];

        for (i = 0; i < elements.length; i++) {

            validElements.push(elements[i].querySelectorAll(elements[i].getAttribute('data-lazy-elements')));
        }

        _processElements(validElements);

        initial = false;
    }

    function _processElements(elements) {

        var i, n;

        for (i = 0; i < elements.length; i++) {

            for (n = 0; n < elements[i].length; n++) {

                if (elements[i][n].classList.contains('fjs-hidden')) {

                    elements[i][n].classList.remove('fjs-hidden');
                }

                mapper[elements[i][n].tagName.toLowerCase()](elements[i][n]);
            }
        }
    }

    function _processPicture(element) {

        // Check or the element is visible?
        if (_isVisible(element) || ignoreIsVisible) {

            if (element.querySelectorAll('source:not([data-lazy-loaded="true"])').length) {

                var i;

                for (i = 0; i < element.querySelectorAll('source').length; i++) {

                    element.querySelectorAll('source')[i].setAttribute('srcset', element.querySelectorAll('source')[i].getAttribute('data-srcset'));
                    element.querySelectorAll('source')[i].setAttribute('data-lazy-loaded', true);
                }

                if (element.querySelector('img:not([data-lazy-loaded="true"])')) {

                    element.querySelector('img').setAttribute('src', element.querySelector('img').getAttribute('data-src'));
                }

                if (!initial) {

                    element.className = 'fadein fadein-1s';
                }
            }
        }
    }

    function _processVideo(element) {

        // Check or the element is visible?
        if (_isVisible(element) || ignoreIsVisible) {

            if (element.querySelectorAll('source:not([data-lazy-loaded="true"])').length) {

                var i;

                for (i = 0; i < element.querySelectorAll('source').length; i++) {

                    var source = document.createElement('source');
                    source.setAttribute('src', element.querySelectorAll('source')[i].getAttribute('data-src'));
                    source.setAttribute('data-lazy-loaded', true);
                    element.removeChild(element.querySelectorAll('source')[i]);
                    element.appendChild(source);
                    element.play();
                }
            }
        }
    }

    function _processDiv(element) {

        if (_isVisible(element) && !element.getAttribute('data-lazy-loaded')) {

            reqwest({
                url: element.getAttribute('data-src'),
                method: 'get',
                success: function(data) {

                    element.innerHTML = data;
                    element.setAttribute('data-lazy-loaded', true);
                },
                error: function(data) {

                    element.innerHTML = '<p>Error: ' + data;
                }
            });
        }
    }

    function _isVisible(element) {

        var top = element.offsetTop;
        var height = element.offsetHeight;

        while (element.offsetParent) {
            element = element.offsetParent;
            top += element.offsetTop;
        }

        top -= 200;

        return (top < (window.pageYOffset + window.innerHeight) && (top + height) <= (window.pageYOffset + window.innerHeight));
    }

    window.addEventListener('DOMContentLoaded', _init);

})();
