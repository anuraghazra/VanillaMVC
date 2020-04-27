/** @jsx this.createVDOM */
import Controller from './src/Controller'
import Model from './src/Model'
import View from './src/View'

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

let TodosModel = new Model({
  state: {
    todos: [
      { id: 1, name: 'Do work' },
      { id: 2, name: 'Do Nothing' },
      { id: 3, name: 'Do Everything' }
    ]
  },
  actions: {
    addTodo(todoName) {
      let id =
        this.state.todos.length > 1
          ? this.state.todos[this.state.todos.length - 1].id + 1
          : 1;
      this.state.todos.push({
        name: todoName,
        id
      });
      this.notifyObservers()
    },
    removeTodo(todoId) {
      this.state.todos = this.state.todos.filter(todo => todo.id !== todoId);
      this.notifyObservers()
    }
  }
});

let ToggleModel = new Model({
  state: {
    isOpen: false
  },
  actions: {
    toggle() {
      this.state.isOpen = !this.state.isOpen
      this.notifyObservers()
    },
  }
});


// ->>> VIEWS

let todos = new View({
  rootId: '#root',
  model: TodosModel,
  view() {
    return (
      <div>
        <h2 textContent="Todos" />
        <p textContent="Open console!" />
        <form ref="form">
          <input ref="input" type="text" name="todo" placeholder="Add todo" />
          <button ref="button" type="submit" textContent="Add" />
          <ul ref="todoList" />
        </form>
      </div>
    )
  },
  onUpdate({ state }) {
    let { todoList } = this.refs;
    todoList.innerHTML = '';

    if (state.todos.length <= 0) {
      const p = <p textContent="Empty"></p>
      todoList.append(p.dom);
      return;
    }

    state.todos.forEach(todo => {
      let li = this.createVDOM(
        'li',
        { textContent: todo.name, id: todo.id },
        this.createVDOM(
          'button',
          { textContent: 'Delete', className: 'remove' }
        )
      )
      todoList.append(li.dom);
    })
  },
  bindEvents: {
    onAddTodo() {
      this.refs.form.addEventListener('submit', (e) => {
        e.preventDefault();

        let input = this.refs.input;
        if (input.value) {
          this.model.addTodo(input.value)
          input.value = ''
        }
      })
    },
    onRemoveTodo() {
      this.refs.todoList.addEventListener('click', (e) => {
        if (e.target.className !== 'remove') return;

        let todoId = parseInt(e.target.parentElement.id)
        this.model.removeTodo(todoId);
      })
    }
  }
});

const consoleRenderer = new View({
  model: TodosModel,
  onUpdate(model) {
    console.clear();
    console.log('TODOS')
    if (model.state.todos.length < 1) console.log('Empty')
    for (let todo of model.state.todos) {
      console.log(todo)
    }
  }
});

const toggle = new View({
  rootId: "#root",
  model: ToggleModel,
  view() {
    return (
      <div>
        <h2 textContent="Toggle" />
        <label>
          <span textContent="Toggle input"></span>
          <input ref="toggleInput" type="checkbox" />
        </label>
        <div ref="toggleWrapper"></div>
      </div>
    )
  },
  onUpdate(model) {
    let { toggleWrapper } = this.refs;
    toggleWrapper.innerHTML = '';
    let t = this.createVDOM('p', { textContent: model.state.isOpen ? "It's open" : "It's closed" });
    toggleWrapper.append(t.dom);
  },
  bindEvents: {
    onToggle() {
      this.refs.toggleInput.addEventListener('click', (e) => {
        this.model.toggle();
      })
    }
  }
});


const app = new Controller();
app.addRenderer(todos);
app.addRenderer(toggle);
app.addRenderer(consoleRenderer);

app.init();

window.app = app