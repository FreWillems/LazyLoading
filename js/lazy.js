(function() {

    'use strict';

    function _init() {

        //setTimeout(_startLoading, 1000);
    }

    function _startLoading() {

        var lazyElements = document.querySelectorAll('[data-lazy] img[data-src]');
        var i;

        for (i = 0; i < lazyElements.length; i++) {

            if (_isVisible(lazyElements[i])) {

                console.log('Loaded image: ' + lazyElements[i].getAttribute('data-src'));

                lazyElements[i].setAttribute('src', lazyElements[i].getAttribute('data-src'));
                lazyElements[i].removeAttribute('data-src')
            }
        }
    }

    function _preventLoading() {

        var lazyElements = document.querySelectorAll('[data-lazy] img');
        var i;

        for (i = 0; i < lazyElements.length; i++) {

            if (!_isVisible(lazyElements[i])) {

                lazyElements[i].setAttribute('data-src', lazyElements[i].getAttribute('src'));
                lazyElements[i].removeAttribute('src')
            }
        }
    }

    function _isVisible(element) {

        var top = element.offsetTop;
        var height = element.offsetHeight;

        while (element.offsetParent) {
            element = element.offsetParent;
            top += element.offsetTop;
        }

        top -= 300;

        return (top < (window.pageYOffset + window.innerHeight) && (top + height) <= (window.pageYOffset + window.innerHeight));
    }

    window.addEventListener('load', _init);
    window.addEventListener('DOMContentLoaded', _preventLoading);
    window.addEventListener('scroll', _startLoading);

})();
