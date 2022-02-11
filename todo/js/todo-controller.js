export default class TodoController {
  _items = [];
  _filter = 'all';

  constructor(model, view) {
    this._model = model;
    this._view = view;
  }

  listenAdd() {
    if (!this._items) {
      throw new Error('Call renderList() before listenAdd()');
    }

    this._view.listenAdd({ addClicked: this._addClicked.bind(this) });
  }

  renderList() {
    this._items = this._model.getTodos(this._filter);
    this._view.renderList({
      items: this._items,
      filter: this._filter,
      completedClicked: this._completedClicked.bind(this),
      deleteClicked: this._deleteClicked.bind(this),
      filterClicked: this._filterClicked.bind(this)
    });
  }

  _addClicked(content) {
    const item = this._model.addTodo(this._items, content);
    return {
      item: item,
      items: this._items,
      filter: this._filter,
      completedClicked: this._completedClicked.bind(this),
      deleteClicked: this._deleteClicked.bind(this),
      filterClicked: this._filterClicked.bind(this)
    };
  }

  _completedClicked(event) {
    console.log('event', event);
    event.item.completed = !event.item.completed;
    this._model.updateTodo(event.item);
  }

  _deleteClicked(event) {
    this._model.deleteTodo(this._items, event.item);
  }

  _filterClicked(event) {
    this._filter = event.filter;
    this.renderList();
  }
}
