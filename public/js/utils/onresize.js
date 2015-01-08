var Storage = require('../mixins/storage');
var wasWideScreen = false;

var isWideScreen = function() {
  return window.innerWidth > 992; // $device-large from sass
};

window.addEventListener('resize', function(e) {
  if (isWideScreen() == wasWideScreen) return;
  Storage.store('wideScreen', (wasWideScreen = !wasWideScreen));
});

wasWideScreen = isWideScreen();
Storage.attr('wideScreen', function() { return wasWideScreen; });
module.exports = { isWideScreen: isWideScreen };
