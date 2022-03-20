export default class ProfileController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('profileView');
  }
  
  render() {
    this.view.render();
  }
};