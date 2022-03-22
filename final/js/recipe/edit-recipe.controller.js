export default class EditRecipeController {
  constructor(diService) {
    this.config = diService.get('config');
    this.sessionService = diService.get('sessionService');
    this.model = diService.get('recipeModel');
    this.userModel = diService.get('userModel');
    this.view = diService.get('editRecipeView');
    this.queryParamService = diService.get('queryParamService');
    this.navigationController = diService.get('navigationController');

    const editRecipeCallbacks = {
      onsave: this.saveCallback.bind(this)
    }
    this.view.setCallbacks(editRecipeCallbacks);
    diService.register('editRecipeCallbacks', editRecipeCallbacks);
  }

  async render() {
    const params = this.queryParamService.getQueryParams(); 
    const id = params.id;
    let recipe = null;
    if (id) {
      recipe = await this.model.getById(id);
      if (recipe.success) {
        recipe = recipe.data.recipe;
      } else {
        recipe = null;
      }
    }
    this.view.render(recipe);
  }

  async saveCallback(recipe) {
    if (!recipe) {
      throw new Error('Recipe must have a value.');
    }
    
    let result = null;
    if (recipe._id) {
      result = await this.model.update(recipe);
      if (result.success) {
        this.navigationController.navigate(`index.html?id=${recipe._id}#recipe`);
        return;
      }      
    } else {
      recipe.userId = this.sessionService.getUserId();
      result = await this.model.create(recipe);
      if (result.success) {
        const url = `index.html?id=${result.data.recipeId}#recipe`;
        this.navigationController.navigate(url);
        return;
      }
    }

    if (!result.success) {
      this.view.renderError(result.message);
    }
  }
};