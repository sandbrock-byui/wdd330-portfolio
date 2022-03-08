import HomeController from '../home/home.controller.js';

export default class NavigationController {
  constructor(appSelector, onnavigate) {
    this.appSelector = appSelector;
    this.onnavigate = onnavigate;

    const homeController = new HomeController(this.appSelector);
    this.routes = [
      { path: '/', controller: homeController },
      { path: '/home', controller: homeController }
    ];
  }

  navigate(path) {
    const route = this.routes.find((r) => r.route === path);
    if (route) {
      this.onnavigate({ controller: route.controller });
    }
  }
}
