export default class NavigationView {
  constructor(diService) {
    this.config = diService.get('config');

    this.navigationEl = document.querySelector(this.config.selectors.navigation);
    if (!this.navigationEl) {
      throw new Error(
        `Unable to locate navigation element using selector ${this.config.selectors.navigation}`
      );
    }

    this.hamburgerEl = document.querySelector(this.config.selectors.hamburger);
    if (!this.hamburgerEl) {
      throw new Error(
        `Unable to locate hamburger element using selector ${this.config.selectors.hamburger}`
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

  highlightActiveRoute() {
    const routes = this.navigationEl.querySelectorAll('.route');
    routes.forEach(route => {
      const path = route.getAttribute('href');
      const parentEl = route.parentElement;
      if (path === window.location.hash) {
        parentEl.classList.add('navigation-active');
      } else {
        parentEl.classList.remove('navigation-active');
      }
    });
  }

  initialize() {
    this.connectNavigationCallbacks();
  }

  login() {
    const needsAuthEls = this.navigationEl.querySelectorAll('.needs-auth');
    needsAuthEls.forEach(el => {
      el.classList.add('needs-auth--authorized');
    });

    const noAuthEls = this.navigationEl.querySelectorAll('.no-auth');
    noAuthEls.forEach(el => {
      el.classList.add('no-auth--authorized');
    });
  }

  logout() {
    const needsAuthEls = this.navigationEl.querySelectorAll('.needs-auth');
    needsAuthEls.forEach(el => {
      el.classList.remove('needs-auth--authorized');
    });

    const noAuthEls = this.navigationEl.querySelectorAll('.no-auth');
    noAuthEls.forEach(el => {
      el.classList.remove('no-auth--authorized');
    });
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }
}
