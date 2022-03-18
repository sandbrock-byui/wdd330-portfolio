import NavigationView from './navigation.view.js';
import HomeController from '../home/home.controller.js';
import RecipeListController from '../recipe/recipelist.controller.js';
import NutritionController from '../nutrition/nutrition.controller.js';
import ProfileController from '../profile/profile.controller.js';
import LoginController from '../user/login.controller.js';
import SignupController from '../user/signup.controller.js';

export default class NavigationController {
  constructor(config) {
    this.config = config;
    this.callbacks = config.callbacks;
    this.loggedin = false;
    this.view = new NavigationView(config, {
      onnavigate: this.navigateCallback.bind(this)
    });

    const homeController = new HomeController(config);
    const recipeListController = new RecipeListController(config);
    const nutritionController = new NutritionController(config);
    const profileController = new ProfileController(config);
    const loginController = new LoginController(config);
    const signupController = new SignupController(config);

    this.routes = [
      { path: '/index.html#home', controller: homeController },
      { path: '/index.html#recipes', controller: recipeListController },
      { path: '/index.html#nutrition', controller: nutritionController },
      { path: '/index.html#profile', controller: profileController },
      { path: '/index.html#login', controller: recipeListController },
      { path: '/index.html#signup', controller: signupController }
    ];
  }

  initialize() {
    this.view.initialize();
    this.renderRoute();
  }

  login() {
    this.loggedin = true;
    this.view.login();
    window.location.assign('index.html#home');
  }

  logout() {
    this.loggedin = false;
    this.view.logout();
    window.location.assign('index.html#login');
  }

  navigateCallback() {
    this.renderRoute();
  }

  renderRoute() {
    if (window.location.hash === '#logout') {
      this.callbacks.onlogout();
      return;
    }

    if (!this.loggedin && (window.location.hash !== "#login" && window.location.hash !== "#signup")) {
      this.logout();
      return;
    }

    const currentPath = `${window.location.pathname}${window.location.hash}`;
    const route = this.routes.find((r) => {
      const routePath = `${this.config.baseUrl}${r.path}`;
      return routePath === currentPath;
    });

    if (route && this.callbacks && this.callbacks.onnavigate) {
      this.callbacks.onnavigate({ controller: route.controller });
    }
  }
}
