export default class TodoController {
  _items = [];

  constructor(model, view) {
    this._model = model;
    this._view = view;
  }

  listenAdd() {
    this._view.listenAdd({
      addClicked: this._addClicked.bind(this),
      completedClicked: this._completedClicked.bind(this),
      deleteClicked: this._deleteClicked.bind(this)
    });
  }

  renderList() {
    this._items = this._model.getTodos();
    this._view.renderList({
      items: this._items,
      completedClicked: this._completedClicked.bind(this),
      deleteClicked: this._deleteClicked.bind(this)
    });
  }

  _addClicked(content) {
    const item = this._model.addTodo(this._items, content);
    this._model.saveTodos(this._items);
    return item;
  }

  _completedClicked(event) {
    event.item.completed = !event.item.completed;
    this._model.saveTodos(this._items);
  }

  _deleteClicked(event) {
    this._model.deleteTodo(this._items, event.item);
    this._model.saveTodos(this._items);
  }
}
