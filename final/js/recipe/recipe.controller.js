import QueryParamService from '../services/queryparam.service.js';
import RecipeModel from './recipe.model.js';
import RecipeView from './recipe.view.js';

export default class RecipeController {
  constructor(config) {
    this.config = config;
    this.view = new RecipeView(config);
  }

  render() {
    const params = QueryParamService.getQueryParams();
    const id = params.id;
    const recipe = RecipeModel.getById(id);
    this.view.render(recipe);
  }
};