var atBottomThreshold = !!('ontouchstart' in window) ? 60 : 30;
var Storage = require('../mixins/storage');
var wasWideScreen = false;
var wrapper;

var isWideScreen = function() {
  return window.innerWidth > 992; // $device-large from sass
};

var isScrolledToBottom = function() {
  if (!wrapper || !wrapper.parentNode) return wrapper = document.querySelector('.mui-app-content-canvas');
  return wrapper.offsetHeight - atBottomThreshold < window.innerHeight + document.body.scrollTop;
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
Storage.attr('scrolledToBottom', function() { return wasScrolledToBottom; });
Storage.attr('wideScreen', function() { return wasWideScreen; });

window.isScrolledToBottom = isScrolledToBottom;
window.isWideScreen = isWideScreen;
window.scrollToBottom = function() {
  document.body.scrollTop = window.innerHeight;
  return this;
};

module.exports = window;
