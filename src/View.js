const noop = () => {};

class View {
  constructor({
    rootId,
    view = noop,
    model,
    bindEvents = {},
    onUpdate = noop,
  } = {}) {
    this.root = this.getElement(rootId);
    this.refs = {};

    this.model = model;
    this.onUpdate = onUpdate.bind(this);

    this.view = view.bind(this)();

    this.root && this.root.append(this.view.dom);

    this.bindEvents = bindEvents;
    for (const e in this.bindEvents) {
      this.bindEvents[e] = this.bindEvents[e].bind(this);
    }
  }

  notify(model) {
    this.onUpdate(model);
  }

  createVDOM(tag, props, ...children) {
    let elm = document.createElement(tag);

    for (const propName in props) {
      if (propName === "ref") {
        this.refs[props[propName]] = elm;
        continue;
      }
      elm[propName] = props[propName];
    }

    if (children) {
      children.forEach((child) => {
        elm.appendChild(child.dom);
      });
    }

    return { dom: elm, tag, props, children };
  }

  getElement(selector) {
    return document.querySelector(selector);
  }
}

export default View;
