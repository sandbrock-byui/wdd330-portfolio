export default class NutritionView {
  constructor(config) {
    this.config = config;
    this.rootEl = document.querySelector(config.selectors.workspace);
  }
  
  render() {
    const nutritionEl = document.createElement('div');
    nutritionEl.innerHTML = `
      <h2>Edible Delights Nutrition</h2>
    `;
    this.rootEl.innerHTML = nutritionEl.innerHTML;
    this.rootEl = document.querySelector(this.config.selectors.workspace);
  }
};