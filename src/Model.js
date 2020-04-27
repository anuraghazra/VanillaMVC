
class Model {
  constructor({ state, actions }) {
    this.state = state;
    this.observers = [];

    for (const action in actions) {
      this[action] = actions[action];
    }
  }

  addObserver(o) {
    this.observers.push(o)
  }

  notifyObservers() {
    for (let o of this.observers) {
      if (!o.notify) throw new Error(
        `Observer: ${o.constructor.name} has no notify() method,
        Make sure you have a notify method before adding the observer`
      )
      o.notify(this);
    }
  }
}


export default Model;