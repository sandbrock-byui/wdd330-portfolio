export default class RecipeListView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }
  
  render() {
    const recipesEl = document.createElement('div');
    recipesEl.innerHTML = `
      <h2>Edible Delights Recipes</h2>
    `;
    this.rootEl.innerHTML = recipesEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};