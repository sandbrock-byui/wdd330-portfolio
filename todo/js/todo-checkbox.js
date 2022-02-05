export default class TodoCheckbox {
  constructor(el, checked) {
    this.el = el;
    this.checked = checked;
  }

  render() {
    
  }

  toggle() {
    this.checked = !this.checked;
    this.render();
  }
}