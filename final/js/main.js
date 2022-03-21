import AppController from './app.controller.js';
import ApiService from './services/api.service.js';
import DependencyInjectionService from './services/dependencyinjection.service.js';
import FooterController from './footer/footer.controller.js';
import FooterView from './footer/footer.view.js';
import LoginController from './user/login.controller.js';
import LoginView from './user/login.view.js';
import NutritionController from './nutrition/nutrition.controller.js';
import NutritionView from './nutrition/nutrition.view.js';
import HomeController from './home/home.controller.js';
import HomeView from './home/home.view.js';
import NavigationController from './navigation/navigation.controller.js';
import NavigationView from './navigation/navigation.view.js';
import ProfileController from './profile/profile.controller.js';
import ProfileView from './profile/profile.view.js';
import QueryParamService from './services/queryparam.service.js';
import RecipeController from './recipe/recipe.controller.js';
import RecipeModel from './recipe/recipe.model.js';
import RecipeView from './recipe/recipe.view.js';
import RecipeListController from './recipe/recipelist.controller.js';
import RecipeListView from './recipe/recipelist.view.js';
import SignupController from './user/signup.controller.js';
import SignupView from './user/signup.view.js';
import UserModel from './user/user.model.js';

// Configure application
const config = {
  baseUrl: '/final',
  baseApiUrl: 'http://localhost:5499',
  selectors: {
    hamburger: '.hamburgerButton',
    navigation: '#navigation',
    workspace: '#workspace', 
    footer: '#footer'
  }
};

// Populate dependency injection container
const diService = new DependencyInjectionService();
diService.register('config', config);
diService.register('apiService', new ApiService(diService));
diService.register('queryParamService', new QueryParamService());
diService.register('recipeModel', new RecipeModel(diService));
diService.register('userModel', new UserModel(diService));
diService.register('navigationView', new NavigationView(diService));
diService.register('navigationController', new NavigationController(diService));
diService.register('footerView', new FooterView(diService));
diService.register('footerController', new FooterController(diService));
diService.register('appController', new AppController(diService));
diService.register('homeView', new HomeView(diService));
diService.register('homeController', new HomeController(diService));
diService.register('nutritionView', new NutritionView(diService));
diService.register('nutritionController', new NutritionController(diService));
diService.register('profileView', new ProfileView(diService));
diService.register('profileController', new ProfileController(diService));
diService.register('recipeView', new RecipeView(diService));
diService.register('recipeController', new RecipeController(diService));
diService.register('recipeListView', new RecipeListView(diService));
diService.register('recipeListController', new RecipeListController(diService));
diService.register('loginView', new LoginView(diService));
diService.register('loginController', new LoginController(diService));
diService.register('signupView', new SignupView(diService));
diService.register('signupController', new SignupController(diService));

// Run application
const app = diService.get('appController');
app.initialize();
