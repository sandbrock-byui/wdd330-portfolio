export default class LoginController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('loginView');
  }
  
  render() {
    this.view.render();
  }
};