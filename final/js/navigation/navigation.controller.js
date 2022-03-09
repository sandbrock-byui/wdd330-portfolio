import NavigationView from './navigation.view.js';
import HomeController from '../home/home.controller.js';

export default class NavigationController {
  constructor(config, onnavigate) {
    this.config = config;
    this.onnavigate = onnavigate;
    this.view = new NavigationView(config, this.handleRouteRequest);

    const homeController = new HomeController(config);

    this.routes = [
      { path: '/', controller: homeController },
      { path: '/index.html', controller: homeController },
      { path: '/index.html#home', controller: homeController }
    ];
  }

  render() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const route = this.routes.find((r) => {
      const routePath = `${this.config.baseUrl}${r.path}${hash}`;
      return routePath === path;
    });

    this.view.render(path);

    if (route) {
      this.onnavigate({ controller: route.controller });
    }
  }

  handleRouteRequest(path) {
    console.log(`Route requested to ${path}`);
  };
}
