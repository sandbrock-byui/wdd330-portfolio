export default class ProfileController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('profileView');
    this.model = diService.get('userModel');

    const profileCallbacks = {
      onupdate: this.updateCallback.bind(this)
    }
    this.view.setCallbacks(profileCallbacks);
    diService.register('profileCallbacks', profileCallbacks);
  }
  
  render() {
    this.view.render();
  }

  async updateCallback(credentials) {
    const result = await this.model.update(credentials);
    if (result.success) {
      this.view.renderError('');
      this.view.renderSuccess('Password updated successfully.');
    } else {
      this.view.renderError(result.message);
      this.view.renderSuccess('');
    }
  }
};