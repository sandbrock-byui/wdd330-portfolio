export default class EditRecipeController {
  constructor(diService) {
    this.config = diService.get('config');
    this.model = diService.get('recipeModel');
    this.view = diService.get('editRecipeView');
    this.queryParamService = diService.get('queryParamService');
  }

  render() {
    const params = this.queryParamService.getQueryParams(); 
    const id = params.id;
    const recipe = this.model.getById(id);
    this.view.render(recipe);
  }
};