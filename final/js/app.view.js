export default class AppView {
  loaderCount = 0;

  constructor(diService) {
    this.config = diService.get('config');
  }

  hideLoader() {
    this.loaderCount--;
    if (this.loaderCount === 0) {
      const overlay = document.querySelector(this.config.selectors.loaderOverlay);
      overlay.style.display = 'none';

      const loader = document.querySelector(this.config.selectors.loader);
      loader.style.display = 'none';
    }
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }

  showLoader() {
    if (this.loaderCount === 0) {
      const overlay = document.querySelector(this.config.selectors.loaderOverlay);
      overlay.style.display = 'block';

      const loader = document.querySelector(this.config.selectors.loader);
      loader.style.display = 'block';
    }
    this.loaderCount++;
  }
}