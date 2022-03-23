export default class NavigationController {
  constructor(diService) {
    this.diService = diService;
    this.sessionService = diService.get('sessionService');
    this.config = diService.get('config');
    this.view = diService.get('navigationView');
    const navigationCallbacks = {
      onnavigate: this.navigateCallback.bind(this)
    };
    this.view.setCallbacks(navigationCallbacks);
    diService.register('navigationCallbacks', navigationCallbacks);
  }

  async initialize() {
    this.registerRoutes();
    this.view.initialize();
    await this.renderRoute();
  }

  login() {
    this.view.login();
    this.navigate('index.html#home');
  }

  logout() {
    this.sessionService.clear();
    this.view.logout();
    this.navigate('index.html#login');
  }

  async navigateCallback(path) {
    await this.navigate(path);
  }

  async navigate(path) {
    window.history.pushState(null, '', path);
    await this.renderRoute();
  }

  registerRoute(path, controller) {
    if (!path) {
      throw new Error('Path not specified for route ' + path);
    }

    if (!controller) {
      throw new Error('Controller not specified for route ' + path);
    }

    this.routes.push({
      path,
      controller
    });
  }

  registerRoutes() {
    this.routes = [];
    this.registerRoute(
      '/index.html#edit-recipe',
      this.diService.get('editRecipeController')
    );
    this.registerRoute(
      '/index.html#home',
      this.diService.get('homeController')
    );
    this.registerRoute(
      '/index.html#login',
      this.diService.get('loginController')
    );
    this.registerRoute(
      '/index.html#nutrition',
      this.diService.get('nutritionController')
    );
    this.registerRoute(
      '/index.html#profile',
      this.diService.get('profileController')
    );
    this.registerRoute(
      '/index.html#recipe',
      this.diService.get('recipeDetailController')
    );
    this.registerRoute(
      '/index.html#recipes',
      this.diService.get('recipeListController')
    );
    this.registerRoute(
      '/index.html#signup',
      this.diService.get('signupController')
    );
  }

  async renderRoute() {
    if (window.location.hash === '#logout') {
      this.callbacks.onlogout();
      return;
    }

    if (
      !this.sessionService.getLoggedIn() &&
      window.location.hash !== '#login' &&
      window.location.hash !== '#signup'
    ) {
      this.logout();
      return;
    }

    if (this.sessionService.getLoggedIn() && !window.location.hash) {
      this.navigate('#home');
      return;
    }

    const currentPath = `${window.location.pathname}${window.location.hash}`;
    const route = this.routes.find((r) => {
      const routePath = `${this.config.baseUrl}${r.path}`;
      return routePath === currentPath;
    });

    if (!route) {
      throw new Error('Unable to locate route for path ' + currentPath);
    }

    if (!route.controller) {
      throw new Error('Unable to locate controller for path ' + currentPath);
    }

    if (route && this.callbacks && this.callbacks.onnavigate) {
      await this.callbacks.onnavigate({ controller: route.controller });
    }

    this.view.highlightActiveRoute();
  }

  render() {
    this.view.render();
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }
}
