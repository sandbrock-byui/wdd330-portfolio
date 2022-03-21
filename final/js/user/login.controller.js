export default class LoginController {
  constructor(diService) {
    this.config = diService.get('config');
    this.callbacks = diService.get('appCallbacks');
    this.model = diService.get('userModel');
    this.view = diService.get('loginView');
    
    const loginCallbacks = {
      onlogin: this.loginCallback.bind(this)
    }
    this.view.setCallbacks(loginCallbacks);
    diService.register('loginCallbacks', loginCallbacks);
  }

  async loginCallback(credentials) {
    const response = await this.model.login(credentials);
    if (!response.success) {
      this.view.renderError(response.message);
    } else {
      this.callbacks.onlogin();
    }
  }
  
  render() {
    this.view.render();
  }
};