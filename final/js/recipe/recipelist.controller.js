import RecipeListView from './recipelist.view.js';
import RecipeModel from './recipe.model.js';

export default class RecipeListController {
  constructor(config) {
    this.config = config;
    this.view = new RecipeListView(config);
  }
  
  render() {
    const recipes = RecipeModel.getAllRecipes();
    this.view.render(recipes);
  }
};