export default class RecipeListView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }

  connectRecipeCallbacks() {
    const headers = this.rootEl.querySelectorAll('.recipe-header');
    headers.forEach(header => {
      header.addEventListener('click', this.headerClickCallback.bind(this));
    });

    const links = this.rootEl.querySelectorAll('.recipe-detail-link');
    links.forEach(link => {
      link.addEventListener('click', this.openClickCallback.bind(this), false);
    });
  }

  headerClickCallback(e) {
    const recipeEl = e.target.parentElement;
    const detailEl = recipeEl.querySelector('.recipe-detail');
    const isSame = this.activeDetailEl && this.activeDetailEl === detailEl;
    
    if (this.activeDetailEl) {
      this.activeDetailEl.classList.remove('recipe-detail-active');
      this.activeDetailEl = null;
    }

    if (isSame) {
      return;
    }

    detailEl.classList.add('recipe-detail-active');
    this.activeDetailEl = detailEl;
  }

  openClickCallback(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const id = e.target.getAttribute('data-id');
    const path = `index.html?id=${id}#recipe`
    window.location.assign(path);
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
            <input class="submitBtn recipe-detail-link" type="submit" value="Open" data-id="${recipe.id}">
            <!--<a class="recipe-detail-link submitBtn" href="#recipe-detail?id=${recipe.id}">Open</a>-->
          </div>
          <div class="recipe-detail">
            <p class="recipe-detail--description">${recipe.description}</p>
          </div>
        </div>
      `;
    });

    this.rootEl.innerHTML = recipesEl.innerHTML;
    this.connectRecipeCallbacks();
  }
};