export default class NavigationView {
  constructor(diService) {
    this.config = diService.get('config');
    this.sessionService = diService.get('sessionService');
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
        console.log('hamburger clicked!');
        this.navigationEl = document.querySelector(this.config.selectors.navigation);
        this.navigationEl.classList.toggle('responsive');
      },
      false
    );
  }

  connectNavigationCallbacks() {
    const routes = this.navigationEl.querySelectorAll('.route');
    routes.forEach(route => {
      route.addEventListener('click', this.navigationClickCallback.bind(this), false);
    });
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
    this.render();
  }

  login() {
    this.render();
  }

  logout() {
    this.render();
  }

  navigationClickCallback(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    this.callbacks.onnavigate(href);
  }

  render() {
    const navEl = document.createElement('div');
    if (this.sessionService.getLoggedIn()) {
      navEl.innerHTML = `
        <li><a href="#home" class="route">Home</a></li>
        <li><a href="#recipes" class="route">Recipes</a></li>
        <li><a href="#profile" class="route">Profile</a></li>
        <li><a href="#logout" class="route">Logout</a></li>
      `;
    } else {
      navEl.innerHTML = `
        <li><a href="#login" class="route">Login</a></li>
        <li><a href="#signup" class="route">Sign Up</a></li>
      `;
    }
    this.navigationEl.innerHTML = navEl.innerHTML;
    this.connectNavigationCallbacks();
  }

  setCallbacks(callbacks) {
    this.callbacks = callbacks;
  }
}
