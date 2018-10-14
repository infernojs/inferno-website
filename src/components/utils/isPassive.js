/**
 * Because older browsers (as well as some not-too-old browsers)
 * still assume the third parameter is a Boolean, you need to build
 * your code to handle this scenario intelligently.
 */

var supportsPassive = false;
try {
  /* eslint-disable no-empty */
  var opts = Object.defineProperty({}, 'passive', {
    get: function() {
      return supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch(e) {
}

export default supportsPassive ? { passive: true } : false;
