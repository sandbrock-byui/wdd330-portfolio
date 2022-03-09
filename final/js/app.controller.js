import FooterController from './footer/footer.controller.js';
import NavigationController from './navigation/navigation.controller.js';

export default class App {
  constructor(config) {
    this.config = config;
    this.navigationController = new NavigationController(this.config, this.handleNavigate);
    this.footerController = new FooterController(this.config);
  }

  render() {
    //this.navigationController.render();
    //this.footerController.render();
  }

  handleNavigate(e) {
    this.workspaceController = e.controller;
    this.workspaceController.render();
  }
};
