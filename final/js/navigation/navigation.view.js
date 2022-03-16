export default class NavigationView {
  constructor(config, callbacks) {
    this.config = config;
    this.callbacks = callbacks;

    this.navigationEl = document.querySelector(config.selectors.navigation);
    if (!this.navigationEl) {
      throw new Error(
        `Unable to locate navigation element using selector ${config.selectors.navigation}`
      );
    }

    this.hamburgerEl = document.querySelector(config.selectors.hamburger);
    if (!this.hamburgerEl) {
      throw new Error(
        `Unable to locate hamburger element using selector ${config.selectors.hamburger}`
      );
    }
    this.connectWindowCallbacks();
    this.connectHamburgerCallback();
  }

  connectHamburgerCallback() {
    this.hamburgerEl.addEventListener(
      'click',
      (e) => {
        this.navigationEl.classList.toggle('responsive');
      },
      false
    );
  }

  connectNavigationCallbacks() {
    // Connect route click handlers
    /*
    const routeEls = document.querySelectorAll('.route');
    routeEls.forEach((routeEl) => {
      routeEl.addEventListener('click', (e) => {
        //e.preventDefault();
        const path = e.target.getAttribute('href');
        if (this.callbacks && this.callbacks.onnavigate) {
          this.callbacks.onnavigate(path);
        }
      });
    });
    */
  }

  connectWindowCallbacks() {
    window.addEventListener('resize', (e) => {
      if (window.innerWidth > 760) {
        this.navigationEl.classList.remove('responsive');
      }
    });

    window.addEventListener('popstate', (e) => {
      if (this.callbacks && this.callbacks.onnavigate) {
        this.callbacks.onnavigate();
      }
    });
  }

  initialize() {
    this.connectNavigationCallbacks();
  }
}
