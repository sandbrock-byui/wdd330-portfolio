export default class NutritionController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('nutritionView');
  }
  
  render() {
    this.view.render();
  }
};