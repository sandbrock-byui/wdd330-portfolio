export default class EditRecipeView {
  constructor(diService) {
    this.config = diService.get('config');
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }

  render(recipe) {
    const recipeEl = document.createElement('div');

    if (!recipe || !recipe._id) {
      recipeEl.innerHTML = '<h2>Add Recipe</h2>';
    } else {
      recipeEl.innerHTML = '<h2>Edit Recipe</h2>';
    }

    recipeEl.innerHTML += `
      <form id="recipe-form">
        <fieldset>
          <legend>Recipe</legend>
          <p class="error-message" id="error-message"><p>
          <label class="label-top">Title: <input type="text" name="title" id="title" required></label>
          <label class="label-top">Description: <textarea name="description" id="description" cols="30" rows="4" required></textarea></label>
          <label class="label-top">Ingredients: <textarea name="ingredients" id="ingredients" cols="30" rows="6" required></textarea></label>
          <label class="label-top">Instructions: <textarea name="instructions" id="instructions" cols="30" rows="6" required></textarea></label>
        </fieldset>

        <div class="button-group">
          <input class="submitBtn" type="submit" value="Save">
          <input class="submitBtn" type="submit" value="Cancel">
        </div>
      </form>
    `;

    this.rootEl.innerHTML = recipeEl.innerHTML;
  }
};