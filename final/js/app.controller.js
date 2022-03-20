export default class App {
  constructor(diService) {
    this.config = diService.get('config');
    this.navigationController = diService.get('navigationController');
    const appCallbacks = {
      onnavigate: this.navigateCallback.bind(this),
      onlogin: this.loginCallback.bind(this),
      onlogout: this.logoutCallback.bind(this)
    };
    this.navigationController.setCallbacks(appCallbacks);
    diService.register('appCallbacks', appCallbacks);
    this.footerController = diService.get('footerController');
  }

  initialize() {
    console.log('Initializing main application.');
    this.navigationController.initialize();
    //this.footerController.render();
  }

  loginCallback(e) {
    this.navigationController.login();
  }

  logoutCallback(e) {
    this.navigationController.logout();
  }

  navigateCallback(e) {
    if (!e.controller) {
      throw new Error('Unable to locate controller for selected route.');
    }
    this.workspaceController = e.controller;
    this.workspaceController.render();
  }
};
