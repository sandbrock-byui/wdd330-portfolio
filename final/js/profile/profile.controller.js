import ProfileView from './profile.view.js';

export default class ProfileController {
  constructor(config) {
    this.config = config;
    this.view = new ProfileView(config);
  }
  
  render() {
    this.view.render();
  }
};