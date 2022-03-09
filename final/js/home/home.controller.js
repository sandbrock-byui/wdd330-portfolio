import HomeView from './home.view.js';

export default class HomeController {
  constructor(config) {
    this.config = config;
    this.view = new HomeView(config);
  }
  
  render() {
    this.view.render();
  }
};