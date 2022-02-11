export default class TodoModel {
  _items = [];

  constructor() {
    this._loadItems();
    this.idCounter = this._items.length + 1;
  }

  getTodos(filter) {
    if (filter === 'all') {
      return this._items.filter((i) => true);
    } else if (filter === 'active') {
      return this._items.filter((i) => !i.completed);
    }
    return this._items.filter((i) => i.completed);
  }

  addTodo(items, content) {
    const item = {
      id: this.idCounter++,
      content: content,
      completed: false
    };
    this._items.push(item);
    this._saveItems();

    items.push(item);

    return item;
  }

  deleteTodo(items, item) {
    // delete from the DB
    let itemIdx = this._items.findIndex(
      (foundItem) => foundItem.id === item.id
    );
    if (itemIdx >= 0) {
      this._items.splice(itemIdx, 1);
      this._saveItems();
    }

    // delete from the clone
    itemIdx = items.findIndex((foundItem) => foundItem.id === item.id);
    if (itemIdx >= 0) {
      items.splice(itemIdx, 1);
    }
  }

  _loadItems() {
    const items = JSON.parse(localStorage.getItem('todo-items'));
    console.log('items', items);
    if (items) {
      this._items = items;
    }
    return items;
  }

  _saveItems() {
    console.log(this._items);
    localStorage.setItem('todo-items', JSON.stringify(this._items));
  }
}
