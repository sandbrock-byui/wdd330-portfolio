import NutritionView from './nutrition.view.js';

export default class NutritionController {
  constructor(config) {
    this.config = config;
    this.view = new NutritionView(config);
  }
  
  render() {
    this.view.render();
  }
};