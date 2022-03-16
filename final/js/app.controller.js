import FooterController from './footer/footer.controller.js';
import NavigationController from './navigation/navigation.controller.js';

export default class App {
  constructor(config) {
    this.config = config;
    this.navigationController = new NavigationController(this.config, {
      onnavigate: this.navigateCallback.bind(this)
    });
    this.footerController = new FooterController(this.config);
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
