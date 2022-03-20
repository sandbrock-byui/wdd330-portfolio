export default class RecipeView {
  constructor(diService) {
    this.config = diService.get('config');
    this.navigationController = diService.get('navigationController');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  connectRecipeDetailListeners() {
    const returnBtn = this.rootEl.querySelector('div.recipe-detail-header input');
    returnBtn.addEventListener('click', this.returnClickCallback.bind(this));
  }

  render(recipe) {
    const recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <div class="recipe-detail-header">
        <h2 class="recipe-detail--title">${recipe.title}</h2>
        <input class="submitBtn recipe-list-item--detail-link" type="submit" value="Return">
      </div>
      <h3 class="recipe-detail--description-header">Description</h3>
      <p class="recipe-detail--description">${recipe.description}</p>
      <h3 class="recipe-detail--ingredients-header">Ingredients</h3>
      <p class="recipe-detail--ingredients">${recipe.ingredients}</p>
      <h3 class="recipe-detail--instructions-header">Instructions</h3>
      <p class="recipe-detail--instructions">${recipe.instructions}</p>
    `;

    this.rootEl.innerHTML = recipeEl.innerHTML;
    this.connectRecipeDetailListeners();
  }

  returnClickCallback(e) {
    e.preventDefault();
    e.stopPropagation();
    this.navigationController.navigate('index.html#recipes');
  }
};
