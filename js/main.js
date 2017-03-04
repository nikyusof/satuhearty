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

var ABOUT_SECTION = 5;
var origami;

/**
 * Origami animation initiation function
 */
function initiateAnimation(method, angle) {
  switch (method) {
    case 'scale':
      origami.anima({scaleX: 0.6, scaleY: 0.6}, 400);
      origami.anima({scale: '1, 1'}, 400);
      break;
    case 'rotate':
      origami.anima({rotate: 45}, 400); // deg is default unit
      origami.anima({rotateX: '0deg'}, 400);
      break;
    case 'skew':
      origami.anima({skewX: 20, skewY: 20}, 400); // deg is default unit
      origami.anima({skew: '0deg, 0deg'}, 400);
      break;
    case 'transform':
      origami.css('transform-origin','0% 0%');
      origami.anima({rotate: '45deg'}, 400);
      break;
    case 'no-retain':
      origami.css('perspective', '100px');
      origami.parent().css('perspective', '100px');
      origami.anima({perspective: '100px', rotateX: '0deg', rotateY: '0deg'});
      origami.anima({perspective: '100px', rotateX: '180deg'}, 400);
      origami.anima({perspective: '100px', rotateY: '180deg'}, 400);
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

/**
 * Continuation function for origami animation
 */
function animate(type) {
  var methods = [];
  if (type === 'oridomi') {
    methods = ['accordion', 'stairs', 'curl', 'reveal', 'foldUp', 'ramp', 'twist', 'fracture'];
  } else {
    methods = ['scale', 'rotate', 'skew', 'transform', 'no-retain'];
  }
  var method = methods[Math.abs(Math.floor(Math.random() * methods.length - Math.random()))];
  var angle = Math.floor(Math.random() * 80 * (Math.random() > .5 ? -1 : 1));
  initiateAnimation(method, angle);
}

/**
 * Function to start animate the work section
 */
function startAnimate(type) {
  animate(type);
  setTimeout(function() {
    startAnimate(type);
  }, 3000);
}

/**
 * Function to start animate the text for main section
 */
function initializeTextillate($element) {
  var transitions = ['flash', 'bounce', 'shake', 'tada', 'swing', 'wobble', 'pulse', 'flip', 'flipInX',
  'flipInY', 'fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInUpBig', 'fadeInDownBig',
  'fadeInLeftBig', 'fadeInRightBig', 'bounceIn', 'bounceInDown', 'bounceInUp', 'bounceInLeft', 'bounceInRight',
  'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight', 'rollIn'];
  var transitionEffects = [true, false];

  var transition = transitions[Math.abs(Math.floor(Math.random() * transitions.length - Math.random()))];
  var text = $element.textillate({
    in: {
      effect: transition,
      sync: transitionEffects[Math.abs(Math.floor(Math.random() * transitions.length - Math.random()))],
      shuffle: transitionEffects[Math.abs(Math.floor(Math.random() * transitions.length - Math.random()))],
      reverse: transitionEffects[Math.abs(Math.floor(Math.random() * transitions.length - Math.random()))]
    }
  });
  text.textillate('start');
}

/**
 * Initialization function
 */
$(document).ready(function() {
  if (window.location.href.indexOf('index.html') > -1) {
    window.location.href = window.location.href.replace('index.html', '');
  }

  var aboutInitialized = false;

  var fullpage = $('#fullpage').fullpage({
    controlArrows: false,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    lockAnchors: true,
    sectionsColor : ['#000', '#000', '#000', '#000', '#000'],
    anchors: ['home', 'info', 'work', 'request', 'about', 'copyright'],
    menu: '.menu',
    afterRender: function () {
      initializeTextillate($('.js-slide-text1'));
      setInterval(function () {
        $.fn.fullpage.moveSlideRight();
      }, 6000);
    },
    onLeave: function (index, nextIndex) {
      if (nextIndex == ABOUT_SECTION && !aboutInitialized) {
        $('.js-about').typed({
          strings: ['Satu Hearty'],
          startDelay: 1000,
          typeSpeed: 9,
          showCursor: false
        });
        $('.js-about-sub').typed({
          strings: ['Where technology meets love.'],
          startDelay: 3000,
          typeSpeed: 2,
          showCursor: false
        });
        aboutInitialized = true;
      }
    },
    onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
      switch (nextSlideIndex) {
        case 0:
          initializeTextillate($('.js-slide-text1'));
          break;
        case 1:
          initializeTextillate($('.js-slide-text2'));
          break;
        case 2:
          initializeTextillate($('.js-slide-text3'));
          break;
        case 3:
          initializeTextillate($('.js-slide-text4'));
          break;
      }
    }
  });

  var animationType = '';
  // If this is desktop chrome, use the origami animation
  if (navigator.userAgent.indexOf('Chrome') != -1) {
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
});
