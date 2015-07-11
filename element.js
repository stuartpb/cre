function element(base, opts, children) {
  if (opts && typeof opts.length == 'number') {
    children = opts;
    opts = null;
  }
  var elem;
  if (base.cloneNode) {
    elem = base.cloneNode(!children);
  } else {
    elem = document.createElement(base);
  }
  if (children) {
    if (typeof children == 'string') {
      elem.textContent = children;
    } else if (children.length) {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < children.length; i++) {
        frag.appendChild(children[i]);
      }
      elem.appendChild(frag);
    } else if (children.length !== 0) {
      elem.appendChild(children);
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
  base = base || 'svg';
  if (!base.cloneNode) {
    base = document.createElementNS(base, "http://www.w3.org/2000/svg");
  }
  element(base, opts, children);
};

element.text = document.createTextNode;
