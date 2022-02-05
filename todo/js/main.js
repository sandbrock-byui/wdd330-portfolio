import TodoController from './todo-controller.js';
import TodoModel from './todo-model.js';
import TodoView from './todo-view.js';

const model = new TodoModel();
const view = new TodoView({
  addTextSelector: '#addText',
  addBtnSelector: '#addBtn',
  listSelector: '#todos'
});
const controller = new TodoController(model, view);
controller.listenAdd();
controller.renderList();
