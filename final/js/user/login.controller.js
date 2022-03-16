import LoginView from './login.view.js';

export default class LoginController {
  constructor(config) {
    this.config = config;
    this.view = new LoginView(config);
  }
  
  render() {
    this.view.render();
  }
};