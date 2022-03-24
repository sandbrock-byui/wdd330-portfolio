export default class RecipeDetailController {
  constructor(diService) {
    this.config = diService.get('config');
    this.model = diService.get('recipeModel');
    this.view = diService.get('recipeDetailView');
    this.queryParamService = diService.get('queryParamService');
  }

  async render() {
    const params = this.queryParamService.getQueryParams();
    const id = params.id;
    if (id) {
      const result = await this.model.getById(id);
      if (result.success) {
        this.view.render(result.data);
      }
    }
  }
};