function element(base, opts, children) {
  "use strict";
  if (typeof base != 'string' && !base.cloneNode) {
    children = base;
    base = null;
  } else if (opts && typeof opts.length == 'number') {
    children = opts;
    opts = null;
  }
  var elem = null;
  if (base.cloneNode) {
    elem = base.cloneNode(!children);
  } else if (base) {
    elem = document.createElement(base);
  }
  if (children) {
    if (typeof children == 'string') {
      if (elem) {
        elem.textContent = children;
      } else {
        elem = document.createTextNode(children);
      }
    } else if (typeof children.length == 'number') {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < children.length; i++) {
        frag.appendChild(children[i]);
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
  if (opts) {
    for (var opt in opts) {
      if (Object.prototype.hasOwnProperty.call(opts, opt)) switch (opt) {
        case 'classList':
          elem.className = opts.classList.join(' ');
          break;
        default:
          elem[opt] = opts[opt];
      }
    }
  }
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
