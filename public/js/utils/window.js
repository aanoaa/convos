var atBottomThreshold = !!('ontouchstart' in window) ? 60 : 30;
var Storage = require('../mixins/storage');
var wasWideScreen = false;
var wrapper;

window.DEBUG = window.DEBUG || true;

var contentWrapper = function() {
  if (!wrapper || !wrapper.parentNode) wrapper = document.querySelector('.mui-app-content-canvas');
  return wrapper || document.body;
};

var isWideScreen = function() {
  return window.innerWidth > 992; // $device-large from sass
};

var isScrolledToBottom = function() {
  return contentWrapper().offsetHeight - atBottomThreshold < window.innerHeight + document.body.scrollTop;
};

window.addEventListener('resize', function(e) {
  if (isWideScreen() == wasWideScreen) return;
  Storage.store('wideScreen', (wasWideScreen = !wasWideScreen));
});

window.addEventListener('scroll', function(e) {
  if (isScrolledToBottom() == wasScrolledToBottom) return;
  Storage.store('scrolledToBottom', (wasScrolledToBottom = !wasScrolledToBottom));
});

wasWideScreen = isWideScreen();
wasScrolledToBottom = isScrolledToBottom();

window.contentWrapper = contentWrapper;
window.isApple = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i);
window.isScrolledToBottom = isScrolledToBottom;
window.isTouchDevice = !!('ontouchstart' in window);
window.isWideScreen = isWideScreen;

window.scrollToBottom = function() {
  document.body.scrollTop = window.innerHeight;
  return this;
};

module.exports = window;
