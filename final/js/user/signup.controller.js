export default class SignupController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('signupView');
  }
  
  render() {
    this.view.render();
  }
};