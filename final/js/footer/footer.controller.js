export default class FooterController {
  constructor(diService) {
    this.config = diService.get('config');
    this.view = diService.get('footerView');
  }

  render() {
    
  }
};