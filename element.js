function element(base, opts, children) {
  "use strict";
  var classList = [];

  if (typeof base != 'string' && !base.cloneNode) {
    children = base;
    base = null;
  } else if (opts && typeof opts.length == 'number') {
    children = opts;
    opts = null;
  }

  opts = opts || {};
  var elem = null;
  var i;

  if (base.cloneNode) {
    elem = base.cloneNode(!children);
  } else if (typeof base == 'string') {
    var tagName;
    var words = base.match(/(^|[\.\#])[^\.\#]*/g);
    i = 0;
    if (words[0][0] == '.' || words[0][0] == '#') {
      // default to 'div', Jade-style
      tagName = 'div';
    } else {
      tagName = words[0];
      i = 1;
    }
    while (i < words.length) {
      if (words[i][0] == '.') {
        classList.push(words[i].slice(1));
      } else if (words[i][0] == '#') {
        opts.id = words[i].slice(1);
      }
      i++;
    }
    elem = document.createElement(tagName);
  } else if (base) {
    throw new TypeError(
      'base must be a String, something with cloneNode, or falsy');
  }
  if (children) {
    if (typeof children == 'string' ||
      children.length == 1 && typeof children[0] == 'string') {
      if (elem) {
        elem.textContent = children;
      } else {
        elem = document.createTextNode(children);
      }
    } else if (typeof children.length == 'number') {
      var frag = document.createDocumentFragment();
      for (i = 0; i < children.length; i++) {
        if (typeof children[i] == 'string') {
          frag.appendChild(document.createTextNode(children[i]));
        } else {
          frag.appendChild(children[i]);
        }
      }
      if (elem) {
        elem.appendChild(frag);
      } else {
        elem = frag;
      }
    } else {
      if (elem) {
        elem.appendChild(children);
      } else {
        elem = children;
      }
    }
  }

  for (var opt in opts) {
    if (Object.prototype.hasOwnProperty.call(opts, opt)) switch (opt) {
      case 'classList':
        Array.prototype.push.apply(classList, opts.classList);
        break;
      case 'className':
        classList.push(opts.className);
      default:
        elem[opt] = opts[opt];
    }
  }

  elem.className = classList.join(' ');
  return elem;
}

element.svg = function elementSvg(base, opts, children) {
  "use strict";
  base = base || 'svg';
  if (!base.cloneNode) {
    base = document.createElementNS(base, "http://www.w3.org/2000/svg");
  }
  element(base, opts, children);
};

element.text = document.createTextNode;
