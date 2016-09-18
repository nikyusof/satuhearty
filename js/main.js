/**
 * Main JS file for the app
 */

/**
 * Google Analytics
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-21308705-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var HOME_SECTION = 0;
var INFO_SECTION = 1;
var CONTACT_SECTION = 2;
var FOURTH_SECTION = 3;

var TYPEDARRAY_TEXT_FIELD = 'text';
var TYPEDARRAY_INITIALIZED_FIELD = 'initialized';

var typedArray = [];

function initializeTypedArrayEntry(index, text) {
  typedArray[index] = [];
  typedArray[index][TYPEDARRAY_TEXT_FIELD] = text;
  typedArray[index][TYPEDARRAY_INITIALIZED_FIELD] = false;
}

function initializeTypedArray() {
  initializeTypedArrayEntry(HOME_SECTION, ['Hello World. My name is Nik']);
  initializeTypedArrayEntry(INFO_SECTION, ['We create beautiful websites']);
  initializeTypedArrayEntry(CONTACT_SECTION, []);
  initializeTypedArrayEntry(FOURTH_SECTION, []);
}

function initializeTyped($element, textToDisplay) {
  $element.typed({
    strings: textToDisplay,
    showCursor: false
  })
}

/**
 * Initialization function
 */
$(document).ready(function() {
  initializeTypedArray();

  var fullpage = $('#fullpage').fullpage({
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    sectionsColor : ['#000', 'rgb(220,79,83)', 'rgb(171, 221, 182)', 'rgb(212, 145, 182)', '#2970bc'],
    anchors: ['slide-one', 'slide-two', 'slide-three', 'slide-four', 'slide-five'],
    menu: '.menu',
    afterRender: function () {
      setInterval(function () {
        $.fn.fullpage.moveSlideRight();
      }, 6000);
    }
  });

  $('.tlt').typed({
    strings: ['Satu Hearty.'],
    showCursor: false
  });

  // var slider = $('.bxslider').bxSlider({
  //   speed: 350,
  //   nextSelector: '#slider-next',
  //   prevSelector: '#slider-prev',
  //   nextText: '',
  //   prevText: '',
  //   pager: false,
  //   onSliderLoad: function(currentIndex) {
  //     initializeTyped($('.js-slide-one'), typedArray[currentIndex][TYPEDARRAY_TEXT_FIELD], currentIndex);
  //     typedArray[currentIndex][TYPEDARRAY_INITIALIZED_FIELD] = true;
  //   },
  //   onSlideAfter: function(e, oldIndex, newIndex) {
  //     var hasInitialized = typedArray[newIndex][TYPEDARRAY_INITIALIZED_FIELD];
  //     if (!hasInitialized) {
  //       var text = typedArray[newIndex][TYPEDARRAY_TEXT_FIELD];
  //       if (newIndex == HOME_SECTION) {
  //         initializeTyped($('.js-slide-one'), text);
  //       } else if (newIndex == INFO_SECTION) {
  //         initializeTyped($('.js-slide-two'), text);
  //       }
  //       typedArray[newIndex][TYPEDARRAY_INITIALIZED_FIELD] = true;
  //     }
  //   }
  // });

  // $('.js-nav').on('click', function(e) {
  //   e.preventDefault();
  //   fullpage.goToSlide(e.currentTarget.dataset.index);
  // });
});

/* Fix the rotation bug on iphoneipad */
// if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  // var viewportmeta = document.querySelector('meta[name="viewport"]');
  // if (viewportmeta) {
  //   viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
  //   document.body.addEventListener('gesturestart', function () {
  //     viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
  //   }, false);
  // }
// }
