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
var CONTACT_SECTION = 4;
var ABOUT_SECTION = 5;

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
    case 'scale':
      origami.anima({scaleX:0.6, scaleY:0.6}, 400);
      origami.anima({scale:"1, 1"}, 400);
      break;
    case 'rotate':
      origami.anima({rotate:45}, 400); // deg is default unit
      origami.anima({rotateX:"0deg"}, 400);
      break;
    case 'skew':
      origami.anima({skewX:20, skewY:20}, 400); // deg is default unit
      origami.anima({skew:"0deg, 0deg"}, 400);
      break;
    case 'transform':
      origami.css("transform-origin","0% 0%");
      origami.anima({rotate:"45deg"}, 400);
      break;
    case 'flip':
      origami.anima3d({rotateX:"100deg", rotateY:"100deg", rotateZ:"100deg"}, 400).anima2d({scale:0.6}, 400);
      origami.anima3d({rotateX:"0deg", rotateY:"0deg", rotateZ:"0deg"}, 400).anima2d({scale:1}, 400);
      break;
    case 'no-retain':
      origami.css("perspective", "100px");
      origami.parent().css("perspective", "100px");
      origami.anima({perspective:"100px", rotateX:"0deg", rotateY:"0deg"});
      origami.anima({perspective:"100px", rotateX:"180deg"}, 400);
      origami.anima({perspective:"100px", rotateY:"180deg"}, 400);
      break;
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

function animate(type) {
  var methods = [];
  if (type === 'oridomi') {
    methods = ['accordion', 'stairs', 'curl', 'reveal', 'foldUp', 'ramp', 'twist', 'fracture'];
  } else {
    methods = ['scale', 'rotate', 'skew', 'transform', 'flip', 'no-retain'];
  }
  var method = methods[Math.abs(Math.floor(Math.random() * methods.length - Math.random()))];
  var angle = Math.floor(Math.random() * 80 * (Math.random() > .5 ? -1 : 1));
  initiateAnimation(method, angle);
}

function startAnimate(type) {
  animate(type);
  setTimeout(function() {
    startAnimate(type);
  }, 3000);
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
        // $('.js-about').typed({
        //   strings: ['Satu Hearty'],
        //   startDelay: 1000,
        //   typeSpeed: 5,
        //   showCursor: false
        // });
        // $('.js-about-sub').typed({
        //   strings: ['Where technology meets love.'],
        //   startDelay: 3000,
        //   typeSpeed: 5,
        //   showCursor: false
        // });
      }
    },
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
      if (slideIndex == 1) {
        $('.js-slide-text').textillate({
          in: {
            effect: 'fadeInUpBig'
          }
        });
      }
    }
  });

  var animationType = '';
  if (navigator.userAgent.indexOf("Chrome") != -1) {
    origami = new OriDomi('.mm', {
      vPanels: 6,
      hPanels: 3,
      ripple: true
    });
    animationType = 'oridomi';
  } else {
    origami = $('.mm');
    animationType = 'anima';
  }

  startAnimate(animationType);

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
