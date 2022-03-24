export default class RecipeListController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('recipeListView');
    this.model = diService.get('recipeModel');
  }
  
  async render() {
    let result = await this.model.getAll();
    if (result.success) {
      this.view.render(result.data.recipes);
      //this.view.renderError('');
    } else {
      this.view.render([]);
      this.view.renderError(`Error retrieving recipes: ${result.message}`);
    }
  }
};