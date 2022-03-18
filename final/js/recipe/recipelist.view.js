export default class RecipeListView {
  config = null;
  activeDetailEl = null;
  activeRecipeEl = null;
  rootEl = null;

  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }

  connectRecipeCallbacks() {
    const headers = this.rootEl.querySelectorAll('.recipe-header');
    headers.forEach(header => {
      header.addEventListener('click', this.headerClickCallback.bind(this));
    });
  }

  headerClickCallback(e) {
    const recipeEl = e.target.parentElement;
    const detailEl = recipeEl.querySelector('.recipe-detail');

    if (this.activeDetailEl) {
      this.activeDetailEl.classList.remove('recipe-detail-active');
    }

    if (recipeEl === this.activeRecipeEl) {
      this.activeRecipeEl = null;
      this.activeDetailEl = null;
      return;
    }

    this.activeRecipeEl = recipeEl;
    this.activeDetailEl = detailEl;

    detailEl.classList.add('recipe-detail-active');
  }
  
  render(recipes) {
    const recipesEl = document.createElement('div');
    recipesEl.innerHTML = `
      <h2>Edible Delights Recipes</h2>
    `;

    recipes.forEach(recipe => {
      recipesEl.innerHTML += `
        <div class="recipe">
          <div class="recipe-header">
            <strong>${recipe.title}</strong>
          </div>
          <div class="recipe-detail">
          </div>
        </div>
      `;
    });

    this.rootEl.innerHTML = recipesEl.innerHTML;
    this.connectRecipeCallbacks();
  }
};