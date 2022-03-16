export default class RecipeListView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }
  
  render() {
    const recipesEl = document.createElement('div');
    recipesEl.innerHTML = `
      <h1>Recipes</h1>
      <h2>Edible Delights</h2>
    `;
    this.rootEl.innerHTML = recipesEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};