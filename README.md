LazyLoading
===========

A Proof of Concept

**Usage**
Lazy.js will search for a specific data attribute (data-lazy="true") to turn on lazy.js for a wrapper. Everything inside the wrapper will be matched against the criteria you define in data-lazy-elements.

**Example**
```html
<!-- Lazy is on and will search for picture and video elements -->
<div class="main" data-lazy="true" data-lazy-elements="picture,video">
  <picture class="fjs-hidden">
    <source media="" srcset="img/transparent.gif" data-srcset="img/articles/article_1.jpg">
    <img src="img/transparent.gif" data-src="img/articles/article_1_mobile.jpg" alt="Artikel 1">
  </picture>
  <!-- For browers that not support javascript -->
  <noscript>
    <picture>
      <source media="(min-width: 1024px)" srcset="img/articles/article_1.jpg">
      <img src="img/articles/article_1_mobile.jpg" alt="Artikel 1">
    </picture>
  </noscript>
</div>
```
