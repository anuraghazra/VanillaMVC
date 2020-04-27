// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(model) {
    _classCallCheck(this, Controller);

    this.renderers = [];
    this.model = model;
  }

  _createClass(Controller, [{
    key: "addRenderer",
    value: function addRenderer(renderer) {
      this.renderers.push(renderer);
    }
  }, {
    key: "init",
    value: function init() {
      var _iterator = _createForOfIteratorHelper(this.renderers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var renderer = _step.value;
          renderer.onUpdate(renderer.model);

          for (var event in renderer.bindEvents) {
            if (event.startsWith('on')) {
              var actionName = event.slice(2).replace(/^\w/, function (v) {
                return v.toLowerCase();
              });
              renderer.bindEvents[event](renderer.model[actionName]);
            }
          }

          renderer.model.addObserver(renderer);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Controller;
}();

var _default = Controller;
exports.default = _default;
},{}],"src/Model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Model = /*#__PURE__*/function () {
  function Model(_ref) {
    var state = _ref.state,
        actions = _ref.actions;

    _classCallCheck(this, Model);

    this.state = state;
    this.observers = [];

    for (var action in actions) {
      this[action] = actions[action];
    }
  }

  _createClass(Model, [{
    key: "addObserver",
    value: function addObserver(o) {
      this.observers.push(o);
    }
  }, {
    key: "notifyObservers",
    value: function notifyObservers() {
      var _iterator = _createForOfIteratorHelper(this.observers),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var o = _step.value;
          if (!o.notify) throw new Error("Observer: ".concat(o.constructor.name, " has no notify() method,\n        Make sure you have a notify method before adding the observer"));
          o.notify(this);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Model;
}();

var _default = Model;
exports.default = _default;
},{}],"src/View.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var noop = function noop() {};

var View = /*#__PURE__*/function () {
  function View() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        rootId = _ref.rootId,
        _ref$view = _ref.view,
        view = _ref$view === void 0 ? noop : _ref$view,
        model = _ref.model,
        _ref$bindEvents = _ref.bindEvents,
        bindEvents = _ref$bindEvents === void 0 ? {} : _ref$bindEvents,
        _ref$onUpdate = _ref.onUpdate,
        onUpdate = _ref$onUpdate === void 0 ? noop : _ref$onUpdate;

    _classCallCheck(this, View);

    this.root = this.getElement(rootId);
    this.refs = {};
    this.model = model;
    this.onUpdate = onUpdate.bind(this);
    this.view = view.bind(this)();
    this.root && this.root.append(this.view.dom);
    this.bindEvents = bindEvents;

    for (var e in this.bindEvents) {
      this.bindEvents[e] = this.bindEvents[e].bind(this);
    }
  }

  _createClass(View, [{
    key: "notify",
    value: function notify(model) {
      this.onUpdate(model);
    }
  }, {
    key: "createVDOM",
    value: function createVDOM(tag, props) {
      var elm = document.createElement(tag);

      for (var propName in props) {
        if (propName === "ref") {
          this.refs[props[propName]] = elm;
          continue;
        }

        elm[propName] = props[propName];
      }

      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      if (children) {
        children.forEach(function (child) {
          elm.appendChild(child.dom);
        });
      }

      return {
        dom: elm,
        tag: tag,
        props: props,
        children: children
      };
    }
  }, {
    key: "getElement",
    value: function getElement(selector) {
      return document.querySelector(selector);
    }
  }]);

  return View;
}();

var _default = View;
exports.default = _default;
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _Controller = _interopRequireDefault(require("./src/Controller"));

var _Model = _interopRequireDefault(require("./src/Model"));

var _View = _interopRequireDefault(require("./src/View"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 
 * Just a simple MVC architecture with the concept of vanillajs 
 * (no magical stuffs)
 * 
 * => Model (have the data) => View (Renders the model) => Controller (Joins both)
 * => View dispatches events (vanillajs events) => model updates the data 
 * 
 */
// ->>> MODELS
var TodosModel = new _Model.default({
  state: {
    todos: [{
      id: 1,
      name: 'Do work'
    }, {
      id: 2,
      name: 'Do Nothing'
    }, {
      id: 3,
      name: 'Do Everything'
    }]
  },
  actions: {
    addTodo: function addTodo(todoName) {
      var id = this.state.todos.length > 1 ? this.state.todos[this.state.todos.length - 1].id + 1 : 1;
      this.state.todos.push({
        name: todoName,
        id: id
      });
      this.notifyObservers();
    },
    removeTodo: function removeTodo(todoId) {
      this.state.todos = this.state.todos.filter(function (todo) {
        return todo.id !== todoId;
      });
      this.notifyObservers();
    }
  }
});
var ToggleModel = new _Model.default({
  state: {
    isOpen: false
  },
  actions: {
    toggle: function toggle() {
      this.state.isOpen = !this.state.isOpen;
      this.notifyObservers();
    }
  }
}); // ->>> VIEWS

var todos = new _View.default({
  rootId: '#root',
  model: TodosModel,
  view: function view() {
    return this.createVDOM("div", null, this.createVDOM("h2", {
      textContent: "Todos"
    }), this.createVDOM("p", {
      textContent: "Open console!"
    }), this.createVDOM("form", {
      ref: "form"
    }, this.createVDOM("input", {
      ref: "input",
      type: "text",
      name: "todo",
      placeholder: "Add todo"
    }), this.createVDOM("button", {
      ref: "button",
      type: "submit",
      textContent: "Add"
    }), this.createVDOM("ul", {
      ref: "todoList"
    })));
  },
  onUpdate: function onUpdate(_ref) {
    var _this = this;

    var state = _ref.state;
    var todoList = this.refs.todoList;
    todoList.innerHTML = '';

    if (state.todos.length <= 0) {
      var p = this.createVDOM("p", {
        textContent: "Empty"
      });
      todoList.append(p.dom);
      return;
    }

    state.todos.forEach(function (todo) {
      var li = _this.createVDOM('li', {
        textContent: todo.name,
        id: todo.id
      }, _this.createVDOM('button', {
        textContent: 'Delete',
        className: 'remove'
      }));

      todoList.append(li.dom);
    });
  },
  bindEvents: {
    onAddTodo: function onAddTodo() {
      var _this2 = this;

      this.refs.form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = _this2.refs.input;

        if (input.value) {
          _this2.model.addTodo(input.value);

          input.value = '';
        }
      });
    },
    onRemoveTodo: function onRemoveTodo() {
      var _this3 = this;

      this.refs.todoList.addEventListener('click', function (e) {
        if (e.target.className !== 'remove') return;
        var todoId = parseInt(e.target.parentElement.id);

        _this3.model.removeTodo(todoId);
      });
    }
  }
});
var consoleRenderer = new _View.default({
  model: TodosModel,
  onUpdate: function onUpdate(model) {
    console.clear();
    console.log('TODOS');
    if (model.state.todos.length < 1) console.log('Empty');

    var _iterator = _createForOfIteratorHelper(model.state.todos),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var todo = _step.value;
        console.log(todo);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
});
var toggle = new _View.default({
  rootId: "#root",
  model: ToggleModel,
  view: function view() {
    return this.createVDOM("div", null, this.createVDOM("h2", {
      textContent: "Toggle"
    }), this.createVDOM("label", null, this.createVDOM("span", {
      textContent: "Toggle input"
    }), this.createVDOM("input", {
      ref: "toggleInput",
      type: "checkbox"
    })), this.createVDOM("div", {
      ref: "toggleWrapper"
    }));
  },
  onUpdate: function onUpdate(model) {
    var toggleWrapper = this.refs.toggleWrapper;
    toggleWrapper.innerHTML = '';
    var t = this.createVDOM('p', {
      textContent: model.state.isOpen ? "It's open" : "It's closed"
    });
    toggleWrapper.append(t.dom);
  },
  bindEvents: {
    onToggle: function onToggle() {
      var _this4 = this;

      this.refs.toggleInput.addEventListener('click', function (e) {
        _this4.model.toggle();
      });
    }
  }
});
var app = new _Controller.default();
app.addRenderer(todos);
app.addRenderer(toggle);
app.addRenderer(consoleRenderer);
app.init();
window.app = app;
},{"./src/Controller":"src/Controller.js","./src/Model":"src/Model.js","./src/View":"src/View.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51521" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map