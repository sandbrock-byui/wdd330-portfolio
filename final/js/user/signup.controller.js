import SignupView from './signup.view.js';

export default class SignupController {
  constructor(config) {
    this.config = config;
    this.view = new SignupView(config);
  }
  
  render() {
    this.view.render();
  }
};