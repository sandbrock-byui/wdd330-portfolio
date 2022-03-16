import RecipeListView from './recipelist.view.js';

export default class RecipeListController {
  constructor(config) {
    this.config = config;
    this.view = new RecipeListView(config);
  }
  
  render() {
    this.view.render();
  }
};