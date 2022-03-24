export default class RecipeDetailView {
  constructor(diService) {
    this.config = diService.get('config');
    this.navigationController = diService.get('navigationController');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  connectRecipeDetailCallbacks() {
    const editBtn = this.rootEl.querySelector('#edit-recipe-button');
    editBtn.addEventListener('click', this.editClickCallback.bind(this));

    const returnBtn = this.rootEl.querySelector('#return-recipe-button');
    returnBtn.addEventListener('click', this.returnClickCallback.bind(this));
  }

  editClickCallback(e) {
    e.preventDefault();
    this.navigationController.navigate(
      `index.html?id=${this.recipe._id}#edit-recipe`
    );
  }

  getIngredients(recipe) {
    let ingredients = '';
    recipe.ingredients.forEach((ingredient) => {
      ingredients += ingredient + '\n';
    });
    return ingredients;
  }

  render(recipe) {
    this.recipe = recipe;
    const recipeEl = document.createElement('div');
    recipeEl.innerHTML = `
      <div class="recipe-detail-header">
        <h2 class="recipe-detail--title">${recipe.title}</h2>
        <div class="recipe-detail--buttons">
          <input class="submitBtn recipe-list-item--detail-link" id="edit-recipe-button" type="submit" value="Edit">
          <input class="submitBtn recipe-list-item--detail-link" id="return-recipe-button" type="submit" value="Return">
        </div>
      </div>
      <h3 class="recipe-detail--description-header">Description</h3>
      <p class="recipe-detail--description">${recipe.title}</p>
      <h3 class="recipe-detail--ingredients-header">Ingredients</h3>
      <p class="recipe-detail--ingredients">${this.getIngredients(recipe)}</p>
      <h3 class="recipe-detail--instructions-header">Instructions</h3>
      <p class="recipe-detail--instructions">${recipe.instructions}</p>
    `;

    this.rootEl.innerHTML = recipeEl.innerHTML;
    this.connectRecipeDetailCallbacks();
  }

  returnClickCallback(e) {
    e.preventDefault();
    e.stopPropagation();
    this.navigationController.navigate('index.html#recipes');
  }
}
