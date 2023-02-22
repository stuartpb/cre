export class CreContext {
  constructor(d) {
    this.document = d;

    // following the precedent set by Pug
    this.defaultTagName = this.defaultTagName || 'div';

    const context = CreContext.prototype.call.bind(this);
    context.context = this;

    return context;
  }
  
  call(b, o, c) {
    const [base, opts, children] = this.normalizeArgs(b,o,c);
    const classList = [];
    if (!(base || children)) {
      return this.createElement(this.defaultTagName, opts, classList);
    }
    const elem = this.createElement(base, opts, classList);
    if (elem) this.setProperties(elem, opts, classList);
    let othernode;
    if (children) othernode = this.populate(elem, children);
    return elem || othernode;
  }

  normalizeArgs(b, o, c) {
    let base = b, opts = o, children = c;
    if (b && typeof b != 'string' && !b.cloneNode) {
      children = b;
      base = null;
    } else if (o && typeof o.length == 'number') {
      children = o;
      opts = null;
    }
  
    opts = opts || {};
    return [base, opts, children];
  }

  createElement(base, opts, classList) {
    const ns = opts.namespaceURI || this.namespaceURI;
    if (base && base.cloneNode) {
      return base.cloneNode(!children);
    } else if (typeof base == 'string') {
      const tagName = this.parseSelector(base, opts, classList);
      if (ns) {
        if (opts.is) {
          return this.document.createElementNS(ns, tagName, {is: opts.is});
        } else {
          return this.document.createElementNS(ns, tagName);
        }
      } else {
        if (opts.is) {
          return this.document.createElement(tagName, {is: opts.is});
        } else {
          return this.document.createElement(tagName);
        }
      }
    } else if (base) {
      throw new TypeError(
        'base must be a String, something with cloneNode, or falsy');
    } else return null;
  }

  parseSelector(base, opts, classList) {
    const words = base.match(/([.#]|^)[^.#]+/g);
    let tagName;
    let i = 0;
    
    // empty-string case
    if (words.length == 0) return this.defaultTagName;

    if (words[0][0] == '.' || words[0][0] == '#') {
      tagName = this.defaultTagName;
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
    return tagName;
  }

  populate(elem, children) {
    if (typeof children == 'string' ||
      children.length == 1 && typeof children[0] == 'string') {
      if (elem) {
        elem.textContent = children;
      } else {
        return this.document.createTextNode(children);
      }
    } else if (typeof children.length == 'number') {
      const frag = this.document.createDocumentFragment();
      for (let i = 0; i < children.length; i++) {
        if (typeof children[i] == 'string') {
          frag.appendChild(document.createTextNode(children[i]));
        } else {
          frag.appendChild(children[i]);
        }
      }
      if (elem) {
        elem.appendChild(frag);
      } else {
        return frag;
      }
    } else {
      if (elem) {
        elem.appendChild(children);
      } else {
        return children;
      }
    }
  }

  setProperties(elem, opts, classList) {
    for (const opt in opts) {
      if (Object.prototype.hasOwnProperty.call(opts, opt)) switch (opt) {
        case 'classList':
  
          // If the list is empty
          if (opts.classList.length == 0) {
  
            // Push a sentinel value to mark there was actually an explicitly
            // empty class marker
            classList.push('');
  
          // If the list has items, append the items of the list to this one
          } else {
            Array.prototype.push.apply(classList, opts.classList);
          }
          break;
        case 'className':
          classList.push(opts.className);
          break;
        case 'style':
          for (const rule in opts.style) {
            elem.style[rule] = opts.style[rule];
          }
          break;
        case 'attributes':
          if (typeof opts.attributes.length == 'number') {
            for (let i = 0; i < opts.attributes.length; i++) {
              elem.setAttribute(opts.attributes[i].name,
                opts.attributes[i].value);
            }
          }
          break;
        case 'namespaceURI':
        case 'is': // read-only, used during element creation
          break;
        default:
          elem[opt] = opts[opt];
          break;
      }
    }
  
    if (classList.length > 0) {
      elem.setAttribute('class', classList.join(' '));
    }  
  }
}

export const cre = new CreContext(document);
export default cre;

cre.cre = cre;
cre.html = cre;

cre.svg = new CreContext(document);
cre.svg.context.namespaceURI = 'http://www.w3.org/2000/svg';
cre.svg.context.defaultTagName = 'svg';

cre.text = document.createTextNode.bind(document);
