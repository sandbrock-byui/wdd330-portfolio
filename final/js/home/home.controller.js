
export default class HomeController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('homeView');
  }
  
  render() {
    this.view.render();
  }
};