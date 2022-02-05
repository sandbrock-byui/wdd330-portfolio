const items = [
  {
    id: '1',
    content: 'Morning prayer',
    completed: true
  },
  {
    id: '2',
    content: 'Todo styles',
    completed: false
  },
  {
    id: '3',
    content: 'Performance review',
    completed: false
  }
];

export default class TodoModel {
  constructor() {
    this.idCounter = 4;
  }

  getTodos() {
    return items;
  }

  addTodo(items, content) {
    const item = {
      id: this.idCounter++,
      content: content,
      completed: false
    };
    items.push(item);
    return item;
  }

  deleteTodo(items, item) {
    const itemIdx = items.findIndex((foundItem) => foundItem.id === item.id);
    if (itemIdx >= 0) {
      items.splice(itemIdx, 1);
    }
  }

  saveTodos(items) {
    this.items = items;
  }
}
