export default class RecipeController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('recipeView');
    this.model = diService.get('recipeModel');
    this.queryParamService = diService.get('queryParamService');
  }

  render() {
    const params = this.queryParamService.getQueryParams();
    const id = params.id;
    const recipe = this.model.getById(id);
    this.view.render(recipe);
  }
};