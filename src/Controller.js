class Controller {
  constructor(model) {
    this.renderers = [];
    this.model = model;
  }

  addRenderer(renderer) {
    this.renderers.push(renderer)
  }

  init() {
    for (let renderer of this.renderers) {
      renderer.onUpdate(renderer.model);

      for (let event in renderer.bindEvents) {
        if (event.startsWith('on')) {
          let actionName = event.slice(2).replace(/^\w/, (v) => v.toLowerCase())
          renderer.bindEvents[event](renderer.model[actionName]);
        }
      }
      renderer.model.addObserver(renderer);
    }
  }
}

export default Controller;