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

var HOME_SECTION = 1;
var INFO_SECTION = 2;
var CONTACT_SECTION = 3;
var ABOUT_SECTION = 4;

var TYPEDARRAY_TEXT_FIELD = 'text';
var TYPEDARRAY_INITIALIZED_FIELD = 'initialized';

var typedArray = [];
var origami;

function initializeTypedArrayEntry(index, text) {
  typedArray[index] = [];
  typedArray[index][TYPEDARRAY_TEXT_FIELD] = text;
  typedArray[index][TYPEDARRAY_INITIALIZED_FIELD] = false;
}

function initializeTypedArray() {
  initializeTypedArrayEntry(HOME_SECTION, ['Hello World. My name is Nik']);
  initializeTypedArrayEntry(INFO_SECTION, ['We create beautiful websites']);
  initializeTypedArrayEntry(CONTACT_SECTION, []);
  initializeTypedArrayEntry(ABOUT_SECTION, []);
}

function initializeTyped($element, textToDisplay) {
  $element.typed({
    strings: textToDisplay,
    showCursor: false
  })
}

function initiateAnimation(method, angle) {
  switch (method) {
    case 'foldUp':
      origami.foldUp();
      break;
    case 'accordion':
      origami.accordion(angle);
      break;
    case 'stairs':
      origami.stairs(angle);
      break;
    case 'curl':
      origami.curl(angle);
      break;
    case 'reveal':
      origami.reveal(angle);
      break;
    case 'ramp':
      origami.ramp(angle);
      break;
    case 'twist':
      origami.twist(angle);
      break;
    case 'fracture':
      origami.fracture(angle);
      break;
  }
}

function animate() {
  var methods = ['accordion', 'stairs', 'curl', 'reveal', 'foldUp', 'ramp', 'twist', 'fracture'];
  var method = methods[Math.abs(Math.floor(Math.random() * methods.length - Math.random()))];
  var angle = Math.floor(Math.random() * 80 * (Math.random() > .5 ? -1 : 1));
  initiateAnimation(method, angle);
}

function startAnimate() {
  animate();
  setTimeout(function() {
    startAnimate();
  }, 2000);
}

/**
 * Initialization function
 */
$(document).ready(function() {
  initializeTypedArray();

  var fullpage = $('#fullpage').fullpage({
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    sectionsColor : ['#000', '#000', '#000', '#000', '#000'],
    anchors: ['home', 'info', 'work', 'request', 'about', 'copyright'],
    menu: '.menu',
    afterRender: function () {
      setInterval(function () {
        $.fn.fullpage.moveSlideRight();
      }, 6000);
    },
    onLeave: function (index, nextIndex, direction) {
      if (nextIndex == ABOUT_SECTION) {
        $('.js-follow-us').textillate();
      }
    }
  });

  origami = new OriDomi('.mm', {
    vPanels: 6,
    hPanels: 3,
    ripple: true
  });

  startAnimate();


  // $('.tlt').typed({
  //   strings: ['Satu Hearty.'],
  //   showCursor: false
  // });

  $('.tlt').textillate();
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
