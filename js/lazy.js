(function() {

    'use strict';

    function _init() {

        if (window.location.hash && window.location.hash.toLowerCase() === '#lazy-off') {

            console.log('Lazy is off!')
        }
        else {


            _preventLoading();
            window.addEventListener('scroll', _startLoading);
            window.addEventListener('resize', _startLoading);
        }
    }

    function _startLoading() {

        var lazyElements = document.querySelectorAll('[data-lazy] img[data-src]');
        var i;

        for (i = 0; i < lazyElements.length; i++) {

            if (_isVisible(lazyElements[i])) {

                console.log('Loaded image: ' + lazyElements[i].getAttribute('data-src'));

                lazyElements[i].onload = _onImageLoad(lazyElements[i]);
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
                //lazyElements[i].setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
                lazyElements[i].setAttribute('src', 'img/transparent.gif');
            }
        }
    }

    function _onImageLoad(element) {

        element.className = 'fadein fadein-1s';
    }

    function _isVisible(element) {

        var top = element.offsetTop;
        var height = element.offsetHeight;

        while (element.offsetParent) {
            element = element.offsetParent;
            top += element.offsetTop;
        }

        top -= 800;

        return (top < (window.pageYOffset + window.innerHeight) && (top + height) <= (window.pageYOffset + window.innerHeight));
    }

    window.addEventListener('DOMContentLoaded', _init);

})();
