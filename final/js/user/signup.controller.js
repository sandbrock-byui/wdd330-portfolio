export default class SignupController {
  constructor(diService) {
    this.config = diService.get('config');
    this.model = diService.get('userModel');
    this.view = diService.get('signupView');

    const signupCallbacks = {
      onsignup: this.signupCallback.bind(this)
    }
    this.view.setCallbacks(signupCallbacks);
    diService.register('signupCallbacks', signupCallbacks);
  }
  
  render() {
    this.view.render();
  }

  async signupCallback(credentials) {
    const result = await this.model.signup(credentials);
    if (result.success) {
      this.view.renderError('');
      this.view.renderSuccess('User created successfully. Login to continue.');
    } else {
      this.view.renderError(result.message);
      this.view.renderSuccess('');
    }
  }
};