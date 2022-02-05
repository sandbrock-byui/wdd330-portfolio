export default class TodoView {
  constructor(todoArgs) {
    this._addText = document.querySelector(todoArgs.addTextSelector);
    this._addButton = document.querySelector(todoArgs.addBtnSelector);
    this._rootElement = document.querySelector(todoArgs.listSelector);
  }

  renderList(renderListArgs) {
    this._rootListElement = document.createElement('div');
    this._clearList();
    this._createItems(this._rootListElement, renderListArgs);
    this._createSummary(this._rootListElement, renderListArgs);
    this._rootElement.appendChild(this._rootListElement);
  }

  listenAdd(listenAddArgs) {
    if (listenAddArgs.addClicked) {
      this._addButton.addEventListener('click', (event) => {
        event.stopPropagation = true;
        const content = this._addText.value;
        const item = listenAddArgs.addClicked(content);
        const itemEl = this._createItem(listenAddArgs, item);
        this._rootListElement.appendChild(itemEl);
        this._addText.value = '';
      });
    }
  }

  _clearList() {
    this._rootElement.innerHTML = '';
  }

  _createItems(rootListElement, createItemsArgs) {
    createItemsArgs.items.forEach((item) => {
      const itemEl = this._createItem(createItemsArgs, item);
      rootListElement.appendChild(itemEl);
    });
  }

  _createItem(createItemArgs, item) {
    // Create the root element for the todo item
    const itemEl = document.createElement('div');
    itemEl.classList.add('todos--item');

    // Create the label for displaying clickable content
    const label = document.createElement('label');
    itemEl.appendChild(label);
    label.classList.add('todos--item--title');

    // Create the checkbox
    const checkbox = document.createElement('input');
    label.appendChild(checkbox);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = item.completed;
    checkbox.classList.add('todos--item--checkbox');
    if (createItemArgs.completedClicked) {
      checkbox.addEventListener('click', (event) => {
        event.stopPropagation = true;
        event.item = item;
        createItemArgs.completedClicked(event);
        this._updateItem(createItemArgs, itemEl, item);
      });
    }

    // Set the label text
    const labelText = document.createTextNode(item.content);
    if (!item.completed) {
      label.appendChild(labelText);
    } else {
      const strike = document.createElement('strike');
      label.appendChild(strike);
      strike.appendChild(labelText);
    }

    // Create the delete button
    const deleteBtn = document.createElement('button');
    itemEl.appendChild(deleteBtn);
    deleteBtn.classList.add('todos--item--button');
    deleteBtn.innerText = 'X';
    if (createItemArgs.deleteClicked) {
      deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation = true;
        event.item = item;
        createItemArgs.deleteClicked(event);
        this._deleteItem(itemEl);
      });
    }

    return itemEl;
  }

  _createSummary(rootListElement, items) {}

  _updateItem(updateItemArgs, itemEl, item) {
    if (!itemEl || !item) {
      return;
    }
    const newItemEl = this._createItem(updateItemArgs, item);
    itemEl.replaceWith(newItemEl);
  }

  _deleteItem(itemEl) {
    if (!itemEl) {
      return;
    }
    this._rootListElement.removeChild(itemEl);
  }
}
