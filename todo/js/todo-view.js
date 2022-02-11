export default class TodoView {
  constructor(todoArgs) {
    this._addText = document.querySelector(todoArgs.addTextSelector);
    this._addButton = document.querySelector(todoArgs.addBtnSelector);
    this._rootElement = document.querySelector(todoArgs.listSelector);
  }

  renderList(renderListArgs) {
    this._rootListElement = document.createElement('div');
    this._clearList();
    this._createItems(renderListArgs);
    this._createSummary(renderListArgs);
    this._rootElement.appendChild(this._rootListElement);
  }

  listenAdd(listenAddArgs) {
    if (listenAddArgs.addClicked) {
      this._addButton.addEventListener('click', (event) => {
        event.stopPropagation = true;
        const content = this._addText.value;
        const addClickedResult = listenAddArgs.addClicked(content);
        const itemEl = this._createItem(
          addClickedResult,
          addClickedResult.item
        );
        this._rootListElement.insertBefore(
          itemEl,
          this._rootListElement.lastElementChild
        );
        this._addText.value = '';
        this._updateSummary(addClickedResult);
      });
    }
  }

  _clearList() {
    this._rootElement.innerHTML = '';
  }

  _createItems(createItemsArgs) {
    createItemsArgs.items.forEach((item) => {
      const itemEl = this._createItem(createItemsArgs, item);
      this._rootListElement.appendChild(itemEl);
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
        this._updateSummary(createItemArgs);
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
        this._deleteItem(createItemArgs, itemEl);
      });
    }

    return itemEl;
  }

  _createSummary(createSummaryArgs) {
    // Create row item
    const summaryEl = document.createElement('div');
    summaryEl.classList.add('summary--item');

    // Create "tasks left" counter
    const tasksLeftEl = document.createElement('p');
    summaryEl.appendChild(tasksLeftEl);
    tasksLeftEl.classList.add('summary--item--tasks-left');
    tasksLeftEl.innerHTML = `<strong>${
      createSummaryArgs.items.filter((i) => !i.completed).length
    } tasks left</strong>`;

    // Create "All" button
    const allEl = document.createElement('p');
    summaryEl.appendChild(allEl);
    allEl.classList.add('summary--item--button');
    if (createSummaryArgs.filter === 'all') {
      allEl.classList.add('summary--item--button-active');
    }
    allEl.innerText = 'All.';
    allEl.addEventListener('click', (event) => {
      event.filter = 'all';
      createSummaryArgs.filterClicked(event);
    });

    // Create "Active" button
    const activeEl = document.createElement('p');
    summaryEl.appendChild(activeEl);
    activeEl.classList.add('summary--item--button');
    if (createSummaryArgs.filter === 'active') {
      activeEl.classList.add('summary--item--button-active');
    }
    activeEl.innerText = 'Active.';
    activeEl.addEventListener('click', (event) => {
      event.filter = 'active';
      createSummaryArgs.filterClicked(event);
    });

    // Create "Completed" button
    const completedEl = document.createElement('p');
    summaryEl.appendChild(completedEl);
    completedEl.classList.add('summary--item--button');
    if (createSummaryArgs.filter === 'complete') {
      completedEl.classList.add('summary--item--button-active');
    }
    completedEl.innerText = 'Complete';
    completedEl.addEventListener('click', (event) => {
      event.filter = 'complete';
      createSummaryArgs.filterClicked(event);
    });

    this._rootListElement.appendChild(summaryEl);
    return summaryEl;
  }

  _updateItem(updateItemArgs, itemEl, item) {
    if (!itemEl || !item) {
      return;
    }
    const newItemEl = this._createItem(updateItemArgs, item);
    itemEl.replaceWith(newItemEl);
  }

  _updateSummary(updateSummaryArgs) {
    const summaryEl = this._rootListElement.lastElementChild;
    const newSummaryEl = this._createSummary(updateSummaryArgs);
    summaryEl.replaceWith(newSummaryEl);
  }

  _deleteItem(deleteItemArgs, itemEl) {
    if (!itemEl) {
      return;
    }
    this._rootListElement.removeChild(itemEl);
    this._updateSummary(deleteItemArgs);
  }
}
