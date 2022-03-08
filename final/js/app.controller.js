import FooterController from './footer/footer.controller.js';
import NavigationController from './navigation/navigation.controller.js';

export default class App {
  start(appSelector) {
    this.navigationController = new NavigationController(appSelector, this._handleNavigate);
    this.navigationController.start();
    this.navigationController.navigate(window.location.pathname);

    this.footerController = new FooterController(appSelector);
    this.footerController.start();
  }

  handleNavigate(e) {
    this.workspaceController = e.controller;
    this.workspaceController.start();
  }
};
