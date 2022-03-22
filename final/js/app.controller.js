export default class App {
  constructor(diService) {
    this.config = diService.get('config');
    this.navigationController = diService.get('navigationController');
    this.view = diService.get('appView');
    const appCallbacks = {
      onnavigate: this.navigateCallback.bind(this),
      onloadinghide: this.loadingHideCallback.bind(this),
      onloadingshow: this.loadingShowCallback.bind(this),
      onlogin: this.loginCallback.bind(this),
      onlogout: this.logoutCallback.bind(this)
    };
    this.view.setCallbacks(appCallbacks);
    this.navigationController.setCallbacks(appCallbacks);
    diService.register('appCallbacks', appCallbacks);
  }

  initialize() {
    this.navigationController.initialize();
    //this.footerController.render();
  }

  loadingHideCallback() {
    this.view.hideLoader();
  }

  loadingShowCallback() {
    this.view.showLoader();
  }

  loginCallback(e) {
    this.navigationController.login();
  }

  logoutCallback(e) {
    this.navigationController.logout();
  }

  async navigateCallback(e) {
    if (!e.controller) {
      throw new Error('Unable to locate controller for selected route.');
    }
    this.workspaceController = e.controller;
    await this.workspaceController.render();
  }
};
