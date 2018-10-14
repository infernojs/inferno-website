/**
 * Here we add a few ES6 polyfills since we dont want to include whole of babel-polyfill
 */
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function includes(str) {
    return this.indexOf(str) !== -1;
  };
}
if (!String.prototype.trimLeft) {
  String.prototype.trimLeft = function trimLeft(str) {
    return remove(this, str ? new RegExp(`/^${str}+/`) : /^\s+/);
  };
}
if (!String.prototype.trimRight) {
  String.prototype.trimRight = function trimRight(str) {
    return remove(this, str ? new RegExp(`/${str}+$/`) : /\s+$/);
  };
}

function remove(str, rx) {
  return str.replace(rx, '');
}
