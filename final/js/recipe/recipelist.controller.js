export default class RecipeListController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('recipeListView');
    this.model = diService.get('recipeModel');
  }
  
  render() {
    const recipes = this.model.getAll();
    this.view.render(recipes);
  }
};