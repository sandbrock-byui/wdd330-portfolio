export default class EditRecipeView {
  constructor(diService) {
    this.config = diService.get('config');
    this.navigationController = diService.get('navigationController');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  cancelBtnClickCallback(e) {
    e.preventDefault();
    if (this.recipe) {
      this.navigationController.navigate(`index.html?id=${this.recipe._id}#recipe`);
    } else {
      this.navigationController.navigate('index.html#recipes');
    }
  }

  connectFormListeners() {
    const saveBtn = this.rootEl.querySelector('#save-recipe-button');
    saveBtn.addEventListener('click', this.saveBtnClickCallback.bind(this));

    const cancelBtn = this.rootEl.querySelector('#cancel-recipe-button');
    cancelBtn.addEventListener('click', this.cancelBtnClickCallback.bind(this));
  }

  render(recipe) {
    this.recipe = recipe;

    const recipeEl = document.createElement('div');

    if (!recipe || !recipe._id) {
      recipeEl.innerHTML = '<h2>Add Recipe</h2>';
    } else {
      recipeEl.innerHTML = '<h2>Edit Recipe</h2>';
    }

    const title = recipe?.title || '';
    const description = recipe?.description || '';
    const ingredients = recipe?.ingredients || '';
    const instructions = recipe?.instructions || '';

    recipeEl.innerHTML += `
      <form id="recipe-form">
        <fieldset>
          <legend>Recipe</legend>
          <p class="error-message" id="error-message"><p>
          <label class="label-top">Title: <input type="text" name="title" id="title" required value="${title}"></label>
          <label class="label-top">Description: <textarea name="description" id="description" cols="30" rows="4" required>${description}</textarea></label>
          <label class="label-top">Ingredients: <textarea name="ingredients" id="ingredients" cols="30" rows="6" required>${ingredients}</textarea></label>
          <label class="label-top">Instructions: <textarea name="instructions" id="instructions" cols="30" rows="6" required>${instructions}</textarea></label>
        </fieldset>

        <div class="button-group">
          <input class="submitBtn" type="submit" id="save-recipe-button" value="Save">
          <input class="submitBtn" type="submit" id="cancel-recipe-button" value="Cancel">
        </div>
      </form>
    `;

    this.rootEl.innerHTML = recipeEl.innerHTML;
    this.connectFormListeners();
  }

  renderError(message) {
    const errorEl = this.rootEl.querySelector('#error-message');
    errorEl.innerHTML = message;
    errorEl.classList.add('error-message-active');
  }

  saveBtnClickCallback(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const ingredients = document.querySelector('#ingredients').value;
    const instructions = document.querySelector('#instructions').value;

    const recipe = this.recipe || {};
    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;

    this.callbacks.onsave(recipe);
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }
};