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

/**
 * Initialization function
 */
$(document).ready(function() {
  var slider = $('.bxslider').bxSlider({
    speed: 350,
    pager: false,
    nextSelector: '#slider-next',
    nextText: '',
    onSlideAfter: function(e, oldIndex, newIndex) {
      if (newIndex == INFO_SECTION) {
        $('.js-second-slide').typed({
          strings: ['Hello World. My name is Nik'],
          typeSpeed: 0
        });
      }
    }
  });

  $('.js-nav').on('click', function(e, h) {
    e.preventDefault();
    slider.goToSlide(e.currentTarget.dataset.index);
  });
});

/* Fix the rotation bug on iphoneipad */
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
    document.body.addEventListener('gesturestart', function () {
      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
  }
}
