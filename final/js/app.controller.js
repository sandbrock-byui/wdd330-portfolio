import FooterController from './footer/footer.controller.js';
import NavigationController from './navigation/navigation.controller.js';

export default class App {
  constructor(config) {
    this.config = {
      ...config,
      callbacks: {
        onnavigate: this.navigateCallback.bind(this),
        onlogin: this.loginCallback.bind(this),
        onlogout: this.logoutCallback.bind(this)
      }
    };
    this.navigationController = new NavigationController(this.config);
    this.footerController = new FooterController(this.config);
  }

  loginCallback(e) {
    this.navigationController.login();
  }

  logoutCallback(e) {
    this.navigationController.logout();
  }

  navigateCallback(e) {
    this.workspaceController = e.controller;
    this.workspaceController.render();
  }

  render() {
    this.navigationController.initialize();
    //this.footerController.render();
  }
};
