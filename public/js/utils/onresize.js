var Storage = require('./storage');
var wasWideScreen = false;

var isWideScreen = function() {
  return window.innerWidth > 1024;
};

window.addEventListener('resize', function(e) {
  if (isWideScreen() == wasWideScreen) return;
  Storage.set('wideScreen', (wasWideScreen = !wasWideScreen));
});

wasWideScreen = isWideScreen();
Storage.attr('wideScreen', function() { return wasWideScreen; });
module.exports = { isWideScreen: isWideScreen };
