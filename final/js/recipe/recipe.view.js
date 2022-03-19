
export default class RecipeView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }

  render(recipe) {
    const recipeEl = document.createElement('div');

    recipeEl.innerHTML = `
      <h2>${recipe.title}</h2>
    `;

    this.rootEl.innerHTML = recipeEl.innerHTML;
  }
};
