export default class RecipeListView {
  constructor(diService) {
    this.config = diService.get('config');
    this.navigationController = diService.get('navigationController');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  addClickCallback(e) {
    console.log('Add recipe');
    this.navigationController.navigate('index.html#edit-recipe')
  }

  connectRecipeCallbacks() {
    const addBtn = this.rootEl.querySelector('.recipe-list--add-button');
    addBtn.addEventListener('click', this.addClickCallback.bind(this), false);

    const headers = this.rootEl.querySelectorAll('.recipe-list-item--header');
    headers.forEach(header => {
      header.addEventListener('click', this.headerClickCallback.bind(this));
    });

    const links = this.rootEl.querySelectorAll('.recipe-list-item--detail-link');
    links.forEach(link => {
      link.addEventListener('click', this.openClickCallback.bind(this), false);
    });
  }

  headerClickCallback(e) {
    let recipeEl;
    if (e.target.nodeName === 'STRONG') {
      recipeEl = e.target.parentElement.parentElement;
    } else {
      recipeEl = e.target.parentElement;      
      
    }

    const detailEl = recipeEl.querySelector('.recipe-list-item--detail');
    if (!recipeEl || !detailEl) {
      return;
    }

    const isSame = this.activeDetailEl && this.activeDetailEl === detailEl;
    
    if (this.activeDetailEl) {
      this.activeDetailEl.classList.remove('recipe-list-item--detail-active');
      this.activeDetailEl = null;
    }

    if (isSame) {
      return;
    }

    detailEl.classList.add('recipe-list-item--detail-active');
    this.activeDetailEl = detailEl;
  }

  openClickCallback(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const id = e.target.getAttribute('data-id');
    const path = `index.html?id=${id}#recipe`;
    this.navigationController.navigate(path);
  }
  
  render(recipes) {
    const recipesEl = document.createElement('div');
    recipesEl.innerHTML = `
      <div class="recipe-list-header">
        <h2>Edible Delights Recipes</h2>
        <input class="submitBtn recipe-list--add-button" type="submit" value="Add">
      </div>
    `;

    recipes.forEach(recipe => {
      recipesEl.innerHTML += `
        <div class="recipe-list-item">
          <div class="recipe-list-item--header">
            <strong>${recipe.title}</strong>
            <input class="submitBtn recipe-list-item--detail-link" type="submit" value="Open" data-id="${recipe.id}">
          </div>
          <div class="recipe-list-item--detail">
            <p class="recipe-list-item--detail--description">${recipe.description}</p>
          </div>
        </div>
      `;
    });

    this.rootEl.innerHTML = recipesEl.innerHTML;
    this.connectRecipeCallbacks();
  }
};