import AppController from './app.controller.js';
import AppView from './app.view.js';
import ApiService from './services/api.service.js';
import DependencyInjectionService from './services/dependencyinjection.service.js';
import EditRecipeController from './recipe/edit-recipe.controller.js';
import EditRecipeView from './recipe/edit-recipe.view.js';
import LoginController from './user/login.controller.js';
import LoginView from './user/login.view.js';
import NutritionController from './nutrition/nutrition.controller.js';
import NutritionView from './nutrition/nutrition.view.js';
import HomeController from './home/home.controller.js';
import HomeView from './home/home.view.js';
import NavigationController from './navigation/navigation.controller.js';
import NavigationView from './navigation/navigation.view.js';
import ProfileController from './user/profile.controller.js';
import ProfileView from './user/profile.view.js';
import QueryParamService from './services/queryparam.service.js';
import RecipeDetailController from './recipe/recipe-detail.controller.js';
import RecipeDetailView from './recipe/recipe-detail.view.js';
import RecipeListController from './recipe/recipe-list.controller.js';
import RecipeListView from './recipe/recipe-list.view.js';
import RecipeModel from './recipe/recipe.model.js';
import SessionService from './services/session.service.js';
import SignupController from './user/signup.controller.js';
import SignupView from './user/signup.view.js';
import UserModel from './user/user.model.js';

function getBaseUrl() {
  const delimIdx = window.location.pathname.lastIndexOf('/');
  const baseUrl = window.location.pathname.substring(0, delimIdx);
  return baseUrl;
}

// Configure application
const config = {
  baseUrl: getBaseUrl(),
  baseApiUrl: 'https://edible-traditions.herokuapp.com',
  selectors: {
    footer: '#footer',
    hamburger: '.hamburgerButton',
    loader: '#loader',
    loaderOverlay: '#loader-overlay',
    navigation: '#navigation',
    workspace: '#workspace'
  }
};

// Populate dependency injection container
const diService = new DependencyInjectionService();
diService.register('config', config);
diService.register('sessionService', new SessionService(diService));
diService.register('apiService', new ApiService(diService));
diService.register('queryParamService', new QueryParamService());
diService.register('recipeModel', new RecipeModel(diService));
diService.register('userModel', new UserModel(diService));
diService.register('navigationView', new NavigationView(diService));
diService.register('navigationController', new NavigationController(diService));
diService.register('appView', new AppView(diService));
diService.register('appController', new AppController(diService));
diService.register('editRecipeView', new EditRecipeView(diService));
diService.register('editRecipeController', new EditRecipeController(diService));
diService.register('homeView', new HomeView(diService));
diService.register('homeController', new HomeController(diService));
diService.register('nutritionView', new NutritionView(diService));
diService.register('nutritionController', new NutritionController(diService));
diService.register('profileView', new ProfileView(diService));
diService.register('profileController', new ProfileController(diService));
diService.register('recipeDetailView', new RecipeDetailView(diService));
diService.register('recipeDetailController', new RecipeDetailController(diService));
diService.register('recipeListView', new RecipeListView(diService));
diService.register('recipeListController', new RecipeListController(diService));
diService.register('loginView', new LoginView(diService));
diService.register('loginController', new LoginController(diService));
diService.register('signupView', new SignupView(diService));
diService.register('signupController', new SignupController(diService));

// Run application
const app = diService.get('appController');
app.initialize();
