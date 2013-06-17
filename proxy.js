module.exports = function(source, target) {
  target = target || module.exports;

  for (var key in source) {
    if (typeof source[key] === 'function') {
      target[key] = function() {
        return source[key].apply(source, arguments);
      }
    }
  }
}